/**
 * Evaluation Suite Runner
 * Executes test suites using model adapters and collects results
 */

import { ModelAdapter } from "../schema/types";
import { TaskDefinition, SuiteDefinition, TaskResult, SuiteResult } from "../schema/types";
import { createAdapter } from "../adapters";
import { calculateCost } from "../services/costTable";
import * as fs from "fs/promises";
import * as path from "path";

/**
 * Suite execution configuration
 */
export interface ExecutionConfig {
  modelId: string;
  suiteId: string;
  evalVersion: string; // e.g., "v0.3"
  rateLimitPerMin?: number;
  timeoutMs?: number;
  retries?: number;
  outputDir?: string;
}

/**
 * Execute a complete test suite
 */
export async function executeSuite(config: ExecutionConfig): Promise<SuiteResult> {
  console.log(`[RUNNER] Starting suite execution: ${config.suiteId} on ${config.modelId}`);

  const startTime = Date.now();

  // Create adapter for the model
  const adapter = createAdapter(config.modelId);

  // Check if adapter is ready
  const ready = await adapter.isReady();
  if (!ready) {
    throw new Error(`Model adapter not ready: ${config.modelId}. Check API keys.`);
  }

  // Load suite definition
  const suite = await loadSuite(config.suiteId);

  if (!suite) {
    throw new Error(`Suite not found: ${config.suiteId}`);
  }

  console.log(`[RUNNER] Loaded suite: ${suite.name} (${suite.tasks.length} tasks)`);

  // Execute all tasks
  const taskResults: TaskResult[] = [];
  let totalCost = 0;

  for (let i = 0; i < suite.tasks.length; i++) {
    const task = suite.tasks[i];

    console.log(
      `[RUNNER] Executing task ${i + 1}/${suite.tasks.length}: ${task.taskId} (${task.dimensionKey})`
    );

    try {
      const result = await executeTask(task, adapter, config);
      taskResults.push(result);
      totalCost += result.costUsd || 0;

      // Rate limiting
      if (config.rateLimitPerMin && i < suite.tasks.length - 1) {
        const delayMs = (60 / config.rateLimitPerMin) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      console.error(`[RUNNER] Task ${task.taskId} failed:`, error);

      // Add failed result
      taskResults.push({
        taskId: task.taskId,
        dimensionKey: task.dimensionKey,
        prompt: task.prompt,
        response: `ERROR: ${error instanceof Error ? error.message : String(error)}`,
        latencyMs: 0,
        tokensUsed: 0,
        costUsd: 0,
        success: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const endTime = Date.now();

  // Create suite result
  const result: SuiteResult = {
    suiteId: config.suiteId,
    modelId: config.modelId,
    evalVersion: config.evalVersion,
    executedAt: new Date().toISOString(),
    durationMs: endTime - startTime,
    taskResults,
    summary: {
      totalTasks: suite.tasks.length,
      successfulTasks: taskResults.filter((r) => r.success !== false).length,
      failedTasks: taskResults.filter((r) => r.success === false).length,
      totalCost: totalCost,
      totalTokens: taskResults.reduce((sum, r) => sum + (r.tokensUsed || 0), 0),
      avgLatencyMs:
        taskResults.reduce((sum, r) => sum + (r.latencyMs || 0), 0) / taskResults.length,
    },
  };

  // Save results if output directory specified
  if (config.outputDir) {
    await saveResults(result, config.outputDir);
  }

  console.log(`[RUNNER] Suite complete: ${result.summary.successfulTasks}/${result.summary.totalTasks} tasks succeeded`);
  console.log(`[RUNNER] Total cost: $${totalCost.toFixed(4)}`);

  return result;
}

/**
 * Execute a single task
 */
async function executeTask(
  task: TaskDefinition,
  adapter: ModelAdapter,
  config: ExecutionConfig
): Promise<TaskResult> {
  const startTime = Date.now();

  // Load fixture if specified
  let prompt = task.prompt;
  if (task.fixtureUri) {
    const fixtureContent = await loadFixture(task.fixtureUri);
    prompt = prompt.replace("{{fixture}}", fixtureContent);
  }

  // Generate response with timeout
  const timeoutMs = config.timeoutMs || 60000;
  const retries = config.retries || 0;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await Promise.race([
        adapter.generateResponse(prompt),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), timeoutMs)
        ),
      ]);

      const latencyMs = Date.now() - startTime;

      return {
        taskId: task.taskId,
        dimensionKey: task.dimensionKey,
        prompt,
        response: response.text,
        latencyMs,
        tokensUsed: response.tokensUsed,
        costUsd: response.costUsd,
        success: true,
        metadata: response.metadata,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`[RUNNER] Task ${task.taskId} attempt ${attempt + 1} failed:`, lastError.message);

      if (attempt < retries) {
        // Exponential backoff
        const backoffMs = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
      }
    }
  }

  // All retries failed
  throw lastError || new Error("Unknown error");
}

/**
 * Load suite definition from file
 */
async function loadSuite(suiteId: string): Promise<SuiteDefinition | null> {
  try {
    // Try loading from benchmark/suites/
    const suitePath = path.join(
      process.cwd(),
      "benchmark",
      "suites",
      `${suiteId}.json`
    );

    const content = await fs.readFile(suitePath, "utf-8");
    return JSON.parse(content) as SuiteDefinition;
  } catch (error) {
    console.error(`[RUNNER] Failed to load suite ${suiteId}:`, error);
    return null;
  }
}

/**
 * Load fixture content
 */
async function loadFixture(fixtureUri: string): Promise<string> {
  try {
    // Handle relative paths
    const fixturePath = fixtureUri.startsWith("/")
      ? fixtureUri
      : path.join(process.cwd(), "benchmark", "suites", "fixtures", fixtureUri);

    return await fs.readFile(fixturePath, "utf-8");
  } catch (error) {
    console.error(`[RUNNER] Failed to load fixture ${fixtureUri}:`, error);
    throw new Error(`Failed to load fixture: ${fixtureUri}`);
  }
}

/**
 * Save suite results to disk
 */
async function saveResults(result: SuiteResult, outputDir: string): Promise<void> {
  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    // Save full result as JSON
    const resultPath = path.join(
      outputDir,
      `${result.suiteId}_${result.modelId.replace(/:/g, "_")}_${Date.now()}.json`
    );

    await fs.writeFile(resultPath, JSON.stringify(result, null, 2), "utf-8");

    console.log(`[RUNNER] Results saved to ${resultPath}`);
  } catch (error) {
    console.error("[RUNNER] Failed to save results:", error);
  }
}

/**
 * Execute multiple models on the same suite (comparison mode)
 */
export async function executeSuiteComparison(
  suiteId: string,
  modelIds: string[],
  evalVersion: string,
  options?: {
    rateLimitPerMin?: number;
    timeoutMs?: number;
    outputDir?: string;
  }
): Promise<SuiteResult[]> {
  console.log(`[RUNNER] Comparison mode: ${modelIds.length} models on ${suiteId}`);

  const results: SuiteResult[] = [];

  for (const modelId of modelIds) {
    console.log(`\n[RUNNER] === Running ${modelId} ===`);

    try {
      const result = await executeSuite({
        modelId,
        suiteId,
        evalVersion,
        ...options,
      });

      results.push(result);
    } catch (error) {
      console.error(`[RUNNER] Model ${modelId} failed:`, error);
    }
  }

  // Save comparison summary
  if (options?.outputDir) {
    await saveComparisonSummary(results, suiteId, options.outputDir);
  }

  return results;
}

/**
 * Save comparison summary
 */
async function saveComparisonSummary(
  results: SuiteResult[],
  suiteId: string,
  outputDir: string
): Promise<void> {
  const summary = {
    suiteId,
    comparedAt: new Date().toISOString(),
    models: results.map((r) => ({
      modelId: r.modelId,
      successRate: (r.summary.successfulTasks / r.summary.totalTasks) * 100,
      avgLatencyMs: r.summary.avgLatencyMs,
      totalCost: r.summary.totalCost,
      totalTokens: r.summary.totalTokens,
    })),
  };

  const summaryPath = path.join(
    outputDir,
    `comparison_${suiteId}_${Date.now()}.json`
  );

  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), "utf-8");

  console.log(`[RUNNER] Comparison summary saved to ${summaryPath}`);
}

/**
 * Estimate suite execution cost (before running)
 */
export async function estimateSuiteCost(
  suiteId: string,
  modelId: string
): Promise<{
  estimatedCost: number;
  estimatedTokens: number;
  numTasks: number;
}> {
  const suite = await loadSuite(suiteId);

  if (!suite) {
    throw new Error(`Suite not found: ${suiteId}`);
  }

  let totalTokens = 0;
  let totalCost = 0;

  for (const task of suite.tasks) {
    // Estimate tokens (rough)
    const promptTokens = Math.ceil(task.prompt.length / 4);
    const responseTokens = 500; // Average response length
    totalTokens += promptTokens + responseTokens;

    // Calculate cost
    const cost = calculateCost(modelId, promptTokens, responseTokens);
    totalCost += cost.totalCost;
  }

  return {
    estimatedCost: totalCost,
    estimatedTokens: totalTokens,
    numTasks: suite.tasks.length,
  };
}
