/**
 * Orchestration Coordinator
 * Manages the workflow: WATCHER → RUNNER → JUDGE → PUBLISHER
 */

import { randomUUID } from "crypto";
import * as path from "path";
import {
  WatcherEvent,
  RunRequest,
  RunResult,
  JudgeRequest,
  JudgeResult,
  PublishInput,
  PublishOutput,
  OrchestrationState,
  OrchestrationError,
  ErrorStage,
  ToolInfo,
  ToolVersionInfo,
} from "./schemas";
import { MVP_TESTS, PLATFORM_CHECKS } from "./config";
import { runBenchmark } from "../agents/runner";
import { judgeResults, calculateAverageAgreement, extractAllEvidenceFlags } from "../agents/judge";
import { publishResults, calculateCoreScore } from "../agents/publisher";
import { calculateConfidence } from "./config";

/**
 * Orchestration configuration
 */
export interface OrchestratorConfig {
  storageBase: string; // Base directory for evidence storage
  numRaters: number; // Number of LLM raters for JUDGE (default: 3)
  rateLimitPerMin: number; // Rate limit for RUNNER
  timeoutMs: number; // Timeout for each test
  dashboardApiUrl?: string; // Optional: POST results to dashboard API
}

/**
 * Main orchestration function
 * Executes full workflow from WatcherEvent to PublishOutput
 */
export async function orchestrate(
  event: WatcherEvent,
  config: OrchestratorConfig
): Promise<OrchestrationState> {
  const runId = randomUUID();
  const startedAt = new Date().toISOString();

  const state: OrchestrationState = {
    runId,
    stage: "watcher",
    watcherEvent: event,
    startedAt,
    updatedAt: startedAt,
  };

  try {
    console.log(`[ORCHESTRATOR] Starting orchestration for ${event.toolId} v${event.versionHint}`);
    console.log(`[ORCHESTRATOR] Run ID: ${runId}`);

    // Stage 1: WATCHER (already completed, event provided)
    state.stage = "runner";
    state.updatedAt = new Date().toISOString();

    // Convert WatcherEvent to RunRequest
    const runRequest = createRunRequest(event, runId, config);
    state.runRequest = runRequest;

    // Stage 2: RUNNER
    console.log("[ORCHESTRATOR] Stage: RUNNER");
    const runResult = await runBenchmark(runRequest);

    if ("error" in runResult) {
      state.stage = "failed";
      state.error = runResult;
      state.updatedAt = new Date().toISOString();
      return state;
    }

    state.runResult = runResult;
    state.stage = "judge";
    state.updatedAt = new Date().toISOString();

    // Stage 3: JUDGE
    console.log("[ORCHESTRATOR] Stage: JUDGE");
    const judgeRequest = createJudgeRequest(runResult, config.numRaters);
    state.judgeRequest = judgeRequest;

    const judgeResult = await judgeResults(judgeRequest);

    if ("error" in judgeResult) {
      state.stage = "failed";
      state.error = judgeResult;
      state.updatedAt = new Date().toISOString();
      return state;
    }

    state.judgeResult = judgeResult;
    state.stage = "publisher";
    state.updatedAt = new Date().toISOString();

    // Stage 4: PUBLISHER
    console.log("[ORCHESTRATOR] Stage: PUBLISHER");
    const publishInput = await createPublishInput(judgeResult, runRequest.evidenceDir);
    state.publishInput = publishInput;

    const publishOutput = await publishResults(publishInput);

    if ("error" in publishOutput) {
      state.stage = "failed";
      state.error = publishOutput;
      state.updatedAt = new Date().toISOString();
      return state;
    }

    state.publishOutput = publishOutput;
    state.stage = "completed";
    state.updatedAt = new Date().toISOString();

    console.log("[ORCHESTRATOR] Orchestration completed successfully");
    console.log(`[ORCHESTRATOR] DAS: ${publishOutput.aggregate.das}`);
    console.log(`[ORCHESTRATOR] Confidence: ${publishOutput.aggregate.confidence}`);
    console.log(`[ORCHESTRATOR] Badges: ${publishOutput.aggregate.badges.join(", ")}`);

    // Optional: Post to dashboard API
    if (config.dashboardApiUrl) {
      await postToDashboard(publishOutput, config.dashboardApiUrl);
    }

    return state;
  } catch (error) {
    const orchError: OrchestrationError = {
      error: {
        stage: ErrorStage.COORDINATOR,
        message: `Orchestration failed: ${error instanceof Error ? error.message : String(error)}`,
        recoverable: false,
        details: { error, state },
      },
    };

    state.stage = "failed";
    state.error = orchError;
    state.updatedAt = new Date().toISOString();

    console.error("[ORCHESTRATOR] Orchestration failed:", orchError);
    return state;
  }
}

/**
 * Create RunRequest from WatcherEvent
 */
function createRunRequest(
  event: WatcherEvent,
  runId: string,
  config: OrchestratorConfig
): RunRequest {
  // TODO: Fetch tool info from database or config
  // For now, create basic tool info
  const tool: ToolInfo = {
    toolId: event.toolId,
    name: event.toolId, // TODO: Proper name mapping
    vendor: "Unknown", // TODO: Proper vendor mapping
    category: "LLM" as any, // TODO: Proper category mapping
    site: event.evidence[0], // Use first evidence URL as site
    tags: [],
  };

  const version: ToolVersionInfo = {
    version: event.versionHint,
  };

  const evidenceDir = path.join(config.storageBase, "evidence", runId);

  return {
    tool,
    version,
    tests: MVP_TESTS,
    platformChecks: PLATFORM_CHECKS,
    evidenceDir,
    runId,
    runnerConfig: {
      rateLimitPerMin: config.rateLimitPerMin,
      timeoutMs: config.timeoutMs,
    },
  };
}

/**
 * Create JudgeRequest from RunResult
 */
function createJudgeRequest(runResult: RunResult, numRaters: number): JudgeRequest {
  return {
    runId: runResult.runId,
    toolId: runResult.toolId,
    toolVersion: runResult.toolVersion,
    items: runResult.items.map((item) => ({
      dimensionKey: getDimensionKeyForItem(item.id),
      id: item.id,
      maxPoints: getMaxPointsForItem(item.id),
      rubric: getRubricForItem(item.id),
      evidence: {
        outputText: item.output.text,
        evidenceUris: item.evidence,
        metadata: {
          latencyMs: item.latencyMs,
          tokensUsed: item.tokensUsed,
          costUsd: item.costEstimateUsd,
        },
      },
    })),
    numRaters,
  };
}

/**
 * Create PublishInput from JudgeResult
 */
async function createPublishInput(
  judgeResult: JudgeResult,
  evidenceDir: string
): Promise<PublishInput> {
  // Aggregate scores by dimension
  const dimensionScoreMap = new Map<string, { sum: number; count: number }>();

  for (const scored of judgeResult.scored) {
    const existing = dimensionScoreMap.get(scored.dimensionKey) || { sum: 0, count: 0 };
    existing.sum += scored.final.rawScore;
    existing.count += 1;
    dimensionScoreMap.set(scored.dimensionKey, existing);
  }

  const dimensionScores = Array.from(dimensionScoreMap.entries()).map(([key, value]) => ({
    dimensionKey: key,
    raw: value.sum / value.count, // Average if multiple items per dimension
  }));

  // Calculate confidence
  const avgAgreement = calculateAverageAgreement(judgeResult.scored);
  const coverage = judgeResult.coverage.tested / judgeResult.coverage.total;
  const confidence = calculateConfidence(avgAgreement, coverage);

  // Extract evidence flags
  const evidenceFlags = extractAllEvidenceFlags(judgeResult.scored);

  // Create evidence index
  const evidenceIndex = judgeResult.scored.map((scored) => ({
    id: scored.id,
    uris: judgeResult.scored
      .find((s) => s.id === scored.id)
      ?.scores.flatMap((s) => s.evidenceFlags) || [],
  }));

  // TODO: Fetch previous scores from database
  const previous = undefined;

  return {
    toolId: judgeResult.toolId,
    toolVersion: judgeResult.toolVersion,
    dimensionScores,
    confidence,
    evidenceIndex,
    previous,
  };
}

/**
 * Get dimension key for an item ID
 */
function getDimensionKeyForItem(itemId: string): string {
  // Check MVP tests
  const test = MVP_TESTS.find((t) => t.testId === itemId);
  if (test) return test.dimensionKey;

  // Check platform checks
  const check = PLATFORM_CHECKS.find((c) => c.checkId === itemId);
  if (check) return check.dimensionKey;

  throw new Error(`Unknown item ID: ${itemId}`);
}

/**
 * Get max points for an item ID
 */
function getMaxPointsForItem(itemId: string): number {
  const test = MVP_TESTS.find((t) => t.testId === itemId);
  if (test) return test.maxPoints;

  const check = PLATFORM_CHECKS.find((c) => c.checkId === itemId);
  if (check) return check.maxPoints;

  throw new Error(`Unknown item ID: ${itemId}`);
}

/**
 * Get rubric for an item ID
 */
function getRubricForItem(itemId: string): string {
  const test = MVP_TESTS.find((t) => t.testId === itemId);
  if (test) return test.rubric;

  const check = PLATFORM_CHECKS.find((c) => c.checkId === itemId);
  if (check) return check.rubric;

  throw new Error(`Unknown item ID: ${itemId}`);
}

/**
 * Post results to dashboard API
 */
async function postToDashboard(
  publishOutput: PublishOutput,
  dashboardApiUrl: string
): Promise<void> {
  try {
    console.log(`[ORCHESTRATOR] Posting results to dashboard: ${dashboardApiUrl}`);

    // TODO: Implement actual HTTP POST
    // For now, just log
    console.log("[ORCHESTRATOR] Dashboard post (mock):", {
      url: dashboardApiUrl,
      payload: publishOutput,
    });
  } catch (error) {
    console.error("[ORCHESTRATOR] Failed to post to dashboard:", error);
    // Don't fail orchestration if dashboard post fails
  }
}

/**
 * Save orchestration state to disk
 */
export async function saveOrchestrationState(
  state: OrchestrationState,
  storageBase: string
): Promise<void> {
  const fs = await import("fs/promises");
  const stateDir = path.join(storageBase, "states");
  await fs.mkdir(stateDir, { recursive: true });

  const statePath = path.join(stateDir, `${state.runId}.json`);
  await fs.writeFile(statePath, JSON.stringify(state, null, 2), "utf-8");

  console.log(`[ORCHESTRATOR] State saved to ${statePath}`);
}

/**
 * Load orchestration state from disk
 */
export async function loadOrchestrationState(
  runId: string,
  storageBase: string
): Promise<OrchestrationState | null> {
  try {
    const fs = await import("fs/promises");
    const statePath = path.join(storageBase, "states", `${runId}.json`);
    const content = await fs.readFile(statePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}
