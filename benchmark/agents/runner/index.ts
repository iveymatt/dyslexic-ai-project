/**
 * RUNNER Agent
 * Executes tests and platform checks, captures outputs and evidence
 */

import {
  RunRequest,
  RunResult,
  RunItem,
  RunItemInput,
  RunItemOutput,
  OrchestrationError,
  ErrorStage,
} from "../../orchestrator/schemas";
import * as fs from "fs/promises";
import * as path from "path";

/**
 * Main RUNNER agent function
 * Executes all tests and platform checks for a tool
 */
export async function runBenchmark(
  request: RunRequest
): Promise<RunResult | OrchestrationError> {
  try {
    // Validate request
    const validationError = validateRunRequest(request);
    if (validationError) {
      return createError(validationError, false);
    }

    // Create evidence directory
    await ensureEvidenceDir(request.evidenceDir);

    const startedAt = new Date().toISOString();
    const items: RunItem[] = [];

    // Execute all tests
    console.log(`[RUNNER] Executing ${request.tests.length} tests...`);
    for (const test of request.tests) {
      try {
        const item = await executeTest(test, request);
        items.push(item);
      } catch (error) {
        console.error(`[RUNNER] Test ${test.testId} failed:`, error);
        // Add failed item
        items.push({
          type: "test",
          id: test.testId,
          input: { prompt: test.prompt },
          output: { text: `ERROR: ${error instanceof Error ? error.message : String(error)}` },
          evidence: [],
        });
      }
    }

    // Execute all platform checks
    console.log(`[RUNNER] Executing ${request.platformChecks.length} platform checks...`);
    for (const check of request.platformChecks) {
      try {
        const item = await executePlatformCheck(check, request);
        items.push(item);
      } catch (error) {
        console.error(`[RUNNER] Check ${check.checkId} failed:`, error);
        // Add failed item
        items.push({
          type: "platform_check",
          id: check.checkId,
          input: { command: check.command },
          output: { text: `ERROR: ${error instanceof Error ? error.message : String(error)}` },
          evidence: [],
        });
      }
    }

    const finishedAt = new Date().toISOString();

    const result: RunResult = {
      runId: request.runId,
      toolId: request.tool.toolId,
      toolVersion: request.version.version,
      startedAt,
      finishedAt,
      items,
    };

    // Save run result to evidence directory
    await saveRunResult(result, request.evidenceDir);

    console.log(`[RUNNER] Completed. ${items.length} items executed.`);
    return result;
  } catch (error) {
    return createError(
      `Runner failed: ${error instanceof Error ? error.message : String(error)}`,
      false,
      { error }
    );
  }
}

/**
 * Execute a single test (LLM prompt)
 */
async function executeTest(
  test: RunRequest["tests"][0],
  request: RunRequest
): Promise<RunItem> {
  const startTime = Date.now();

  // Call the LLM being tested
  const response = await callToolLLM(
    request.tool,
    request.version.version,
    test.prompt
  );

  const latencyMs = Date.now() - startTime;

  // Save evidence
  const evidenceFiles = await saveTestEvidence(
    test.testId,
    test.prompt,
    response,
    request.evidenceDir
  );

  return {
    type: "test",
    id: test.testId,
    input: { prompt: test.prompt },
    output: { text: response.text },
    latencyMs,
    tokensUsed: response.tokensUsed,
    costEstimateUsd: response.costEstimate,
    evidence: evidenceFiles,
  };
}

/**
 * Execute a platform check (UI/API inspection)
 */
async function executePlatformCheck(
  check: RunRequest["platformChecks"][0],
  request: RunRequest
): Promise<RunItem> {
  const startTime = Date.now();

  // Parse command type
  const [commandType, commandName] = check.command.split(":");

  let output: RunItemOutput;
  let evidenceFiles: string[] = [];

  switch (commandType) {
    case "playwright":
      // Run Playwright automation
      output = await runPlaywrightCheck(
        commandName,
        request.tool.site || "",
        request.evidenceDir
      );
      evidenceFiles = output.blobUri ? [output.blobUri] : [];
      break;

    case "api":
      // Check API/docs
      output = await runAPICheck(commandName, request.tool);
      break;

    case "policy":
      // Parse policy documents
      output = await runPolicyCheck(commandName, request.tool.site || "");
      break;

    case "scraper":
      // Scrape website
      output = await runScraperCheck(commandName, request.tool.site || "");
      break;

    case "github":
      // Check GitHub
      output = await runGitHubCheck(commandName, request.tool);
      break;

    default:
      throw new Error(`Unknown command type: ${commandType}`);
  }

  const latencyMs = Date.now() - startTime;

  // Save evidence
  if (output.text) {
    const evidencePath = await saveCheckEvidence(
      check.checkId,
      check.command,
      output.text,
      request.evidenceDir
    );
    evidenceFiles.push(evidencePath);
  }

  return {
    type: "platform_check",
    id: check.checkId,
    input: { command: check.command },
    output,
    latencyMs,
    evidence: evidenceFiles,
  };
}

/**
 * Call the LLM tool being tested
 * TODO: Implement actual API calls for each tool
 */
async function callToolLLM(
  tool: RunRequest["tool"],
  version: string,
  prompt: string
): Promise<{ text: string; tokensUsed?: number; costEstimate?: number }> {
  console.log(`[RUNNER] Calling ${tool.name} v${version}...`);

  // TODO: Implement actual API calls based on tool.toolId
  // For now, return mock response

  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

  return {
    text: `[MOCK RESPONSE from ${tool.name}]\n\nThis is a placeholder response. In production, this would be the actual output from ${tool.name} API.\n\nPrompt: ${prompt}`,
    tokensUsed: 250,
    costEstimate: 0.005,
  };
}

/**
 * Run Playwright check
 * TODO: Implement actual Playwright automation
 */
async function runPlaywrightCheck(
  checkName: string,
  siteUrl: string,
  evidenceDir: string
): Promise<RunItemOutput> {
  console.log(`[RUNNER] Running Playwright check: ${checkName} on ${siteUrl}`);

  // TODO: Implement Playwright automation
  // For now, return mock result

  const screenshotPath = path.join(evidenceDir, `playwright_${checkName}.png`);

  return {
    text: `[MOCK] Playwright check '${checkName}' completed on ${siteUrl}. In production, this would run actual UI automation.`,
    blobUri: screenshotPath,
  };
}

/**
 * Run API check
 */
async function runAPICheck(
  checkName: string,
  tool: RunRequest["tool"]
): Promise<RunItemOutput> {
  console.log(`[RUNNER] Running API check: ${checkName} for ${tool.name}`);

  // TODO: Implement actual API checks
  // For now, return mock result

  return {
    text: `[MOCK] API check '${checkName}' for ${tool.name}. In production, this would check API docs, endpoints, etc.`,
  };
}

/**
 * Run policy check
 */
async function runPolicyCheck(
  checkName: string,
  siteUrl: string
): Promise<RunItemOutput> {
  console.log(`[RUNNER] Running policy check: ${checkName} on ${siteUrl}`);

  // TODO: Implement policy parsing (fetch privacy policy, parse for specific terms)
  // For now, return mock result

  return {
    text: `[MOCK] Policy check '${checkName}' on ${siteUrl}. In production, this would parse privacy policy documents.`,
  };
}

/**
 * Run scraper check
 */
async function runScraperCheck(
  checkName: string,
  siteUrl: string
): Promise<RunItemOutput> {
  console.log(`[RUNNER] Running scraper check: ${checkName} on ${siteUrl}`);

  // TODO: Implement web scraping (pricing page, changelog, etc.)
  // For now, return mock result

  return {
    text: `[MOCK] Scraper check '${checkName}' on ${siteUrl}. In production, this would scrape specific pages.`,
  };
}

/**
 * Run GitHub check
 */
async function runGitHubCheck(
  checkName: string,
  tool: RunRequest["tool"]
): Promise<RunItemOutput> {
  console.log(`[RUNNER] Running GitHub check: ${checkName} for ${tool.name}`);

  // TODO: Implement GitHub API calls (releases, commits, etc.)
  // For now, return mock result

  return {
    text: `[MOCK] GitHub check '${checkName}' for ${tool.name}. In production, this would analyze releases, commits, etc.`,
  };
}

/**
 * Save test evidence to files
 */
async function saveTestEvidence(
  testId: string,
  prompt: string,
  response: { text: string; tokensUsed?: number; costEstimate?: number },
  evidenceDir: string
): Promise<string[]> {
  const files: string[] = [];

  // Save prompt
  const promptPath = path.join(evidenceDir, `${testId}_prompt.txt`);
  await fs.writeFile(promptPath, prompt, "utf-8");
  files.push(promptPath);

  // Save response
  const responsePath = path.join(evidenceDir, `${testId}_response.json`);
  await fs.writeFile(responsePath, JSON.stringify(response, null, 2), "utf-8");
  files.push(responsePath);

  return files;
}

/**
 * Save check evidence to file
 */
async function saveCheckEvidence(
  checkId: string,
  command: string,
  output: string,
  evidenceDir: string
): Promise<string> {
  const evidencePath = path.join(evidenceDir, `${checkId}_result.json`);
  await fs.writeFile(
    evidencePath,
    JSON.stringify({ checkId, command, output }, null, 2),
    "utf-8"
  );
  return evidencePath;
}

/**
 * Save run result to evidence directory
 */
async function saveRunResult(result: RunResult, evidenceDir: string): Promise<void> {
  const resultPath = path.join(evidenceDir, "run_result.json");
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2), "utf-8");
}

/**
 * Ensure evidence directory exists
 */
async function ensureEvidenceDir(evidenceDir: string): Promise<void> {
  await fs.mkdir(evidenceDir, { recursive: true });
}

/**
 * Validate RunRequest
 */
function validateRunRequest(request: RunRequest): string | null {
  if (!request.runId) return "runId is required";
  if (!request.tool || !request.tool.toolId) return "tool.toolId is required";
  if (!request.version || !request.version.version) return "version.version is required";
  if (!request.evidenceDir) return "evidenceDir is required";
  if (!Array.isArray(request.tests)) return "tests must be an array";
  if (!Array.isArray(request.platformChecks)) return "platformChecks must be an array";
  if (!request.runnerConfig) return "runnerConfig is required";

  return null;
}

/**
 * Create standardized error response
 */
function createError(
  message: string,
  recoverable: boolean,
  details?: Record<string, unknown>
): OrchestrationError {
  return {
    error: {
      stage: ErrorStage.RUNNER,
      message,
      recoverable,
      details,
    },
  };
}
