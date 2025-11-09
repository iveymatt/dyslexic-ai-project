#!/usr/bin/env node
/**
 * CLI tool to run benchmark test suites
 */

import { Command } from "commander";
import { executeSuite, executeSuiteComparison, estimateSuiteCost } from "../runners/executeSuite";
import { getAvailableModels, getDisplayName } from "../adapters";
import { formatCost, formatTokens } from "../services/costTable";

const program = new Command();

program
  .name("benchmark-suite")
  .description("Run dyslexic AI benchmark test suites")
  .version("1.0.0");

/**
 * Run a single suite on a single model
 */
program
  .command("run")
  .description("Run a benchmark suite on a model")
  .requiredOption("-s, --suite <suiteId>", "Suite ID (e.g., DAS_v1_readability)")
  .requiredOption("-m, --model <modelId>", "Model ID (e.g., local:helpful-v1)")
  .option("-e, --eval-version <version>", "Evaluation version", "v0.3")
  .option("-o, --output <dir>", "Output directory for results", "./benchmark/results")
  .option("-r, --rate-limit <rpm>", "Rate limit (requests per minute)", "10")
  .option("-t, --timeout <ms>", "Timeout per request (ms)", "60000")
  .option("--retries <count>", "Number of retries per request", "2")
  .action(async (options) => {
    console.log(`\n🚀 Running benchmark suite: ${options.suite}`);
    console.log(`📦 Model: ${getDisplayName(options.model)} (${options.model})`);
    console.log(`📊 Eval version: ${options.evalVersion}\n`);

    try {
      const result = await executeSuite({
        modelId: options.model,
        suiteId: options.suite,
        evalVersion: options.evalVersion,
        outputDir: options.output,
        rateLimitPerMin: parseInt(options.rateLimit),
        timeoutMs: parseInt(options.timeout),
        retries: parseInt(options.retries),
      });

      console.log("\n✅ Suite execution complete!\n");
      console.log("📊 Summary:");
      console.log(`   Total tasks: ${result.summary.totalTasks}`);
      console.log(`   Successful: ${result.summary.successfulTasks} ✅`);
      console.log(`   Failed: ${result.summary.failedTasks} ❌`);
      console.log(`   Success rate: ${((result.summary.successfulTasks / result.summary.totalTasks) * 100).toFixed(1)}%`);
      console.log(`   Total cost: ${formatCost(result.summary.totalCost)}`);
      console.log(`   Total tokens: ${formatTokens(result.summary.totalTokens)}`);
      console.log(`   Avg latency: ${result.summary.avgLatencyMs.toFixed(0)}ms`);
      console.log(`   Duration: ${(result.durationMs / 1000).toFixed(1)}s\n`);

      if (options.output) {
        console.log(`💾 Results saved to: ${options.output}/\n`);
      }
    } catch (error) {
      console.error("\n❌ Suite execution failed:", error);
      process.exit(1);
    }
  });

/**
 * Compare multiple models on the same suite
 */
program
  .command("compare")
  .description("Compare multiple models on the same suite")
  .requiredOption("-s, --suite <suiteId>", "Suite ID (e.g., DAS_v1_readability)")
  .requiredOption(
    "-m, --models <modelIds>",
    "Comma-separated model IDs (e.g., local:helpful-v1,local:terse-v1)"
  )
  .option("-e, --eval-version <version>", "Evaluation version", "v0.3")
  .option("-o, --output <dir>", "Output directory for results", "./benchmark/results")
  .option("-r, --rate-limit <rpm>", "Rate limit (requests per minute)", "10")
  .option("-t, --timeout <ms>", "Timeout per request (ms)", "60000")
  .action(async (options) => {
    const modelIds = options.models.split(",").map((m: string) => m.trim());

    console.log(`\n🚀 Running comparison on suite: ${options.suite}`);
    console.log(`📦 Models (${modelIds.length}):`);
    modelIds.forEach((id: string) => console.log(`   - ${getDisplayName(id)} (${id})`));
    console.log(`📊 Eval version: ${options.evalVersion}\n`);

    try {
      const results = await executeSuiteComparison(options.suite, modelIds, options.evalVersion, {
        outputDir: options.output,
        rateLimitPerMin: parseInt(options.rateLimit),
        timeoutMs: parseInt(options.timeout),
      });

      console.log("\n✅ Comparison complete!\n");
      console.log("📊 Results Summary:\n");

      // Display comparison table
      console.log("┌─────────────────────────────┬───────────┬──────────┬───────────┬──────────┐");
      console.log("│ Model                       │ Success   │ Latency  │ Cost      │ Tokens   │");
      console.log("├─────────────────────────────┼───────────┼──────────┼───────────┼──────────┤");

      for (const result of results) {
        const modelName = getDisplayName(result.modelId).padEnd(27);
        const successRate = `${((result.summary.successfulTasks / result.summary.totalTasks) * 100).toFixed(0)}%`.padStart(7);
        const latency = `${result.summary.avgLatencyMs.toFixed(0)}ms`.padStart(7);
        const cost = formatCost(result.summary.totalCost).padStart(9);
        const tokens = formatTokens(result.summary.totalTokens).padStart(8);

        console.log(
          `│ ${modelName} │ ${successRate} │ ${latency} │ ${cost} │ ${tokens} │`
        );
      }

      console.log("└─────────────────────────────┴───────────┴──────────┴───────────┴──────────┘\n");

      if (options.output) {
        console.log(`💾 Results saved to: ${options.output}/\n`);
      }
    } catch (error) {
      console.error("\n❌ Comparison failed:", error);
      process.exit(1);
    }
  });

/**
 * Estimate cost before running
 */
program
  .command("estimate")
  .description("Estimate cost of running a suite")
  .requiredOption("-s, --suite <suiteId>", "Suite ID (e.g., DAS_v1_readability)")
  .requiredOption("-m, --model <modelId>", "Model ID (e.g., openai:gpt-4)")
  .action(async (options) => {
    console.log(`\n💰 Estimating cost for suite: ${options.suite}`);
    console.log(`📦 Model: ${getDisplayName(options.model)} (${options.model})\n`);

    try {
      const estimate = await estimateSuiteCost(options.suite, options.model);

      console.log("📊 Cost Estimate:");
      console.log(`   Tasks: ${estimate.numTasks}`);
      console.log(`   Estimated tokens: ${formatTokens(estimate.estimatedTokens)}`);
      console.log(`   Estimated cost: ${formatCost(estimate.estimatedCost)}\n`);

      console.log(
        "💡 Note: This is a rough estimate. Actual cost may vary based on response length.\n"
      );
    } catch (error) {
      console.error("\n❌ Estimation failed:", error);
      process.exit(1);
    }
  });

/**
 * List available suites
 */
program
  .command("list-suites")
  .description("List available test suites")
  .action(() => {
    console.log("\n📋 Available Test Suites:\n");

    const suites = [
      {
        id: "DAS_v1_readability",
        name: "DAS v1: Readability & Structure",
        tasks: 12,
        category: "DAS",
      },
      {
        id: "DAS_v1_voice",
        name: "DAS v1: Voice Workflow Quality",
        tasks: 10,
        category: "DAS",
      },
      {
        id: "CPS_v1_socratic",
        name: "CPS v1: Socratic Thinking Partnership",
        tasks: 12,
        category: "CPS",
      },
      {
        id: "DAL_v1_processing",
        name: "DAL v1: Processing Ease & Cognitive Load",
        tasks: 12,
        category: "DAL",
      },
    ];

    suites.forEach((suite) => {
      console.log(`  ${suite.category} | ${suite.id}`);
      console.log(`    ${suite.name}`);
      console.log(`    Tasks: ${suite.tasks}\n`);
    });
  });

/**
 * List available models
 */
program
  .command("list-models")
  .description("List available models")
  .action(() => {
    console.log("\n📦 Available Models:\n");

    const models = getAvailableModels();

    console.log("Local/Mock Models (no API key required):");
    models
      .filter((m) => m.startsWith("local:"))
      .forEach((m) => console.log(`  - ${m} (${getDisplayName(m)})`));

    console.log("\nOpenAI Models (requires OPENAI_API_KEY):");
    models
      .filter((m) => m.startsWith("openai:"))
      .forEach((m) => console.log(`  - ${m} (${getDisplayName(m)})`));

    console.log("\nAnthropic Models (requires ANTHROPIC_API_KEY):");
    models
      .filter((m) => m.startsWith("anthropic:"))
      .forEach((m) => console.log(`  - ${m} (${getDisplayName(m)})`));

    console.log("\nGoogle Models (requires GOOGLE_API_KEY):");
    models
      .filter((m) => m.startsWith("google:"))
      .forEach((m) => console.log(`  - ${m} (${getDisplayName(m)})`));

    console.log();
  });

program.parse();
