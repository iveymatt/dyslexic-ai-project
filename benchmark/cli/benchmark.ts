#!/usr/bin/env node
/**
 * CLI for Dyslexic AI Benchmark
 * Usage: npm run benchmark -- <command> [options]
 */

import { Command } from "commander";
import * as dotenv from "dotenv";
import { WatcherEvent, WatcherTrigger } from "../orchestrator/schemas";
import { orchestrate, saveOrchestrationState, OrchestratorConfig } from "../orchestrator/coordinator";
import { triggerManual } from "../agents/watcher";
import * as path from "path";

// Load environment variables
dotenv.config();

const program = new Command();

program
  .name("benchmark")
  .description("Dyslexic AI Benchmark orchestrator CLI")
  .version("2.0.0");

/**
 * Command: Run benchmark for a tool
 */
program
  .command("run")
  .description("Run benchmark for a tool")
  .requiredOption("-t, --tool-id <toolId>", "Tool ID (e.g., claude_sonnet)")
  .requiredOption("-v, --version <version>", "Version to benchmark (e.g., 4.0)")
  .option("-e, --evidence <url>", "Evidence URL (for manual trigger)", "manual_trigger")
  .option("--raters <number>", "Number of LLM raters", "3")
  .option("--rate-limit <number>", "Rate limit per minute", "30")
  .option("--timeout <number>", "Timeout in ms", "60000")
  .action(async (options) => {
    try {
      console.log("=".repeat(60));
      console.log("Dyslexic AI Benchmark v2.0");
      console.log("=".repeat(60));
      console.log(`Tool: ${options.toolId}`);
      console.log(`Version: ${options.version}`);
      console.log("=".repeat(60));

      // Create WatcherEvent (manual trigger)
      const event: WatcherEvent = {
        toolId: options.toolId,
        versionHint: options.version,
        trigger: WatcherTrigger.Manual,
        evidence: [options.evidence],
        action: "enqueue_run",
      };

      // Create orchestrator config
      const config: OrchestratorConfig = {
        storageBase: process.env.STORAGE_BASE || path.join(process.cwd(), "benchmark", "storage"),
        numRaters: parseInt(options.raters, 10),
        rateLimitPerMin: parseInt(options.rateLimit, 10),
        timeoutMs: parseInt(options.timeout, 10),
        dashboardApiUrl: process.env.DASHBOARD_API,
      };

      console.log("\nStarting orchestration...\n");

      // Run orchestration
      const state = await orchestrate(event, config);

      // Save state
      await saveOrchestrationState(state, config.storageBase);

      // Display results
      if (state.stage === "completed" && state.publishOutput) {
        const output = state.publishOutput;
        console.log("\n" + "=".repeat(60));
        console.log("BENCHMARK COMPLETE");
        console.log("=".repeat(60));
        console.log(`DAS Score: ${output.aggregate.das}/100`);
        console.log(`Confidence: ${(output.aggregate.confidence * 100).toFixed(1)}%`);
        console.log(`Badges: ${output.aggregate.badges.join(", ") || "None"}`);
        console.log("\nDimension Breakdown:");
        for (const dim of output.aggregate.dimensionBreakdown) {
          const percent = (dim.normalized * 100).toFixed(1);
          console.log(`  ${dim.dimensionKey}: ${dim.raw.toFixed(1)} (${percent}%)`);
        }
        console.log("\n" + output.diffSummary);
        console.log("=".repeat(60));
        process.exit(0);
      } else if (state.error) {
        console.error("\n" + "=".repeat(60));
        console.error("BENCHMARK FAILED");
        console.error("=".repeat(60));
        console.error(`Stage: ${state.error.error.stage}`);
        console.error(`Message: ${state.error.error.message}`);
        console.error(`Recoverable: ${state.error.error.recoverable}`);
        console.error("=".repeat(60));
        process.exit(1);
      }
    } catch (error) {
      console.error("\nFatal error:", error);
      process.exit(1);
    }
  });

/**
 * Command: Trigger manual benchmark (adds signal)
 */
program
  .command("trigger")
  .description("Trigger a manual benchmark (requires 2 independent signals)")
  .requiredOption("-t, --tool-id <toolId>", "Tool ID")
  .requiredOption("-v, --version <version>", "Version")
  .requiredOption("-e, --evidence <url>", "Evidence URL")
  .action((options) => {
    console.log("Adding manual signal...");

    const result = triggerManual(options.toolId, options.version, options.evidence);

    if ("error" in result) {
      if (result.error.recoverable) {
        console.log(result.error.message);
        console.log("Add another independent signal to trigger benchmark.");
      } else {
        console.error("Error:", result.error.message);
        process.exit(1);
      }
    } else {
      console.log("Signal threshold met! Benchmark triggered.");
      console.log("Event:", result);
    }
  });

/**
 * Command: List dimensions
 */
program
  .command("dimensions")
  .description("List all scoring dimensions")
  .action(async () => {
    const { DIMENSIONS } = await import("../orchestrator/config");

    console.log("\nDyslexic AI Benchmark Dimensions");
    console.log("=".repeat(60));

    let totalWeight = 0;
    for (const dim of DIMENSIONS) {
      console.log(`\n${dim.name} (${dim.key})`);
      console.log(`  Max Points: ${dim.maxPoints}`);
      console.log(`  Weight: ${(dim.weight * 100).toFixed(1)}%`);
      console.log(`  Description: ${dim.description}`);
      totalWeight += dim.weight;
    }

    console.log("\n" + "=".repeat(60));
    console.log(`Total Weight: ${(totalWeight * 100).toFixed(1)}%`);
    console.log("=".repeat(60));
  });

/**
 * Command: List tests
 */
program
  .command("tests")
  .description("List all MVP tests")
  .action(async () => {
    const { MVP_TESTS } = await import("../orchestrator/config");

    console.log("\nMVP Tests (Core 4 Dimensions)");
    console.log("=".repeat(60));

    for (const test of MVP_TESTS) {
      console.log(`\n${test.testId} (${test.dimensionKey})`);
      console.log(`  Max Points: ${test.maxPoints}`);
      console.log(`  Prompt: ${test.prompt.substring(0, 80)}...`);
      console.log(`  Rubric: ${test.rubric.substring(0, 80)}...`);
    }

    console.log("\n" + "=".repeat(60));
  });

/**
 * Command: List platform checks
 */
program
  .command("checks")
  .description("List all platform checks")
  .action(async () => {
    const { PLATFORM_CHECKS } = await import("../orchestrator/config");

    console.log("\nPlatform Checks (Supplementary Dimensions)");
    console.log("=".repeat(60));

    const byDimension = new Map<string, typeof PLATFORM_CHECKS>();
    for (const check of PLATFORM_CHECKS) {
      const existing = byDimension.get(check.dimensionKey) || [];
      existing.push(check);
      byDimension.set(check.dimensionKey, existing);
    }

    for (const [dimension, checks] of byDimension.entries()) {
      console.log(`\n${dimension} (${checks.length} checks):`);
      for (const check of checks) {
        console.log(`  - ${check.checkId}: ${check.command} (${check.maxPoints} pts)`);
      }
    }

    console.log("\n" + "=".repeat(60));
  });

/**
 * Command: Validate configuration
 */
program
  .command("validate")
  .description("Validate benchmark configuration")
  .action(async () => {
    const { validateDimensionWeights, DIMENSIONS, MVP_TESTS, PLATFORM_CHECKS, BADGE_CRITERIA } =
      await import("../orchestrator/config");

    console.log("\nValidating Benchmark Configuration");
    console.log("=".repeat(60));

    // Check dimension weights
    const weightsValid = validateDimensionWeights();
    console.log(`\n✓ Dimension weights sum to 1.0: ${weightsValid ? "PASS" : "FAIL"}`);

    if (!weightsValid) {
      const sum = DIMENSIONS.reduce((acc, d) => acc + d.weight, 0);
      console.error(`  Actual sum: ${sum.toFixed(4)}`);
    }

    // Count tests and checks
    console.log(`\n✓ MVP Tests: ${MVP_TESTS.length}`);
    console.log(`✓ Platform Checks: ${PLATFORM_CHECKS.length}`);
    console.log(`✓ Total Items: ${MVP_TESTS.length + PLATFORM_CHECKS.length}`);

    // Count badges
    console.log(`\n✓ Badge Criteria: ${BADGE_CRITERIA.length}`);

    // Check environment variables
    console.log("\nEnvironment Variables:");
    console.log(`  DATABASE_URL: ${process.env.DATABASE_URL ? "SET" : "NOT SET"}`);
    console.log(`  STORAGE_BASE: ${process.env.STORAGE_BASE || "(using default)"}`);
    console.log(`  DASHBOARD_API: ${process.env.DASHBOARD_API || "NOT SET"}`);

    console.log("\n" + "=".repeat(60));
    console.log("Configuration validation complete!");
    console.log("=".repeat(60));
  });

// Parse arguments
program.parse();
