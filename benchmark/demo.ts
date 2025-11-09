/**
 * Demo Script for Phase 2: Model Adapters & Runner
 * Showcases the benchmark system with local mock adapters (no API keys needed)
 */

import { createAdapter, getDisplayName } from "./adapters";
import { calculateCost, formatCost, formatTokens } from "./services/costTable";
import { getModelMetadata } from "./services/modelRegistry";
import { readabilityIndex, hallucinationPenalty, socraticDepth } from "./runners/metrics";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

/**
 * Demo test tasks
 */
const DEMO_TASKS = [
  {
    id: "readability-1",
    prompt: "Explain what photosynthesis is in simple terms. Use clear headings and bullet points.",
    dimension: "Readability & Structure",
  },
  {
    id: "instruction-1",
    prompt: "List exactly 3 ways to reduce stress. Format as a numbered list.",
    dimension: "Instruction Following",
  },
  {
    id: "socratic-1",
    prompt: "I'm struggling to decide between two job offers. Can you help me think through this?",
    dimension: "Socratic Thinking",
  },
];

/**
 * Print header
 */
function printHeader(title: string) {
  console.log("\n" + colors.bright + colors.cyan + "=".repeat(80) + colors.reset);
  console.log(colors.bright + colors.cyan + title.padStart(40 + title.length / 2) + colors.reset);
  console.log(colors.bright + colors.cyan + "=".repeat(80) + colors.reset + "\n");
}

/**
 * Print section
 */
function printSection(title: string) {
  console.log("\n" + colors.bright + colors.magenta + "━".repeat(80) + colors.reset);
  console.log(colors.bright + colors.white + title + colors.reset);
  console.log(colors.bright + colors.magenta + "━".repeat(80) + colors.reset + "\n");
}

/**
 * Print task result
 */
function printTaskResult(
  taskName: string,
  modelName: string,
  response: string,
  latencyMs: number,
  tokensUsed: number,
  costUsd: number
) {
  console.log(colors.bright + colors.yellow + `📋 Task: ${taskName}` + colors.reset);
  console.log(colors.dim + `Model: ${modelName}` + colors.reset);
  console.log(colors.dim + `Latency: ${latencyMs}ms | Tokens: ${formatTokens(tokensUsed)} | Cost: ${formatCost(costUsd)}` + colors.reset);
  console.log("\n" + colors.cyan + "Response:" + colors.reset);
  console.log(colors.dim + "─".repeat(80) + colors.reset);
  console.log(response.substring(0, 400) + (response.length > 400 ? "..." : ""));
  console.log(colors.dim + "─".repeat(80) + colors.reset);
}

/**
 * Print metric score
 */
function printMetric(name: string, score: number, maxScore: number = 100) {
  const percentage = (score / maxScore) * 100;
  const barLength = 30;
  const filledLength = Math.round((percentage / 100) * barLength);
  const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

  let color = colors.red;
  if (percentage >= 80) color = colors.green;
  else if (percentage >= 60) color = colors.yellow;

  console.log(
    colors.white + name.padEnd(25) + colors.reset +
    color + bar + colors.reset +
    colors.bright + ` ${score.toFixed(1)}/${maxScore}` + colors.reset
  );
}

/**
 * Main demo
 */
async function runDemo() {
  printHeader("🚀 Dyslexic AI Benchmark - Phase 2 Demo");

  console.log(colors.white + "This demo showcases the new model adapter and evaluation system." + colors.reset);
  console.log(colors.dim + "Testing 3 different mock adapters with varying behaviors...\n" + colors.reset);

  // Models to test
  const models = [
    { id: "local:helpful-v1", name: "Helpful Model" },
    { id: "local:terse-v1", name: "Terse Model (Low Quality)" },
    { id: "local:error-prone-v1", name: "Error-Prone Model (Hallucinations)" },
  ];

  const results: Array<{
    modelId: string;
    modelName: string;
    totalLatency: number;
    totalTokens: number;
    totalCost: number;
    avgReadability: number;
    avgSocratic: number;
    avgHallucination: number;
  }> = [];

  // Test each model
  for (const model of models) {
    printSection(`Testing: ${model.name} (${model.id})`);

    const adapter = createAdapter(model.id);
    let totalLatency = 0;
    let totalTokens = 0;
    let totalCost = 0;
    const readabilityScores: number[] = [];
    const socraticScores: number[] = [];
    const hallucinationScores: number[] = [];

    // Run each task
    for (const task of DEMO_TASKS) {
      console.log(colors.dim + `\nRunning task: ${task.id}...` + colors.reset);

      const response = await adapter.generateResponse(task.prompt);

      printTaskResult(
        task.dimension,
        model.name,
        response.text,
        response.latencyMs,
        response.tokensUsed,
        response.costUsd
      );

      // Calculate metrics
      const readability = readabilityIndex(response.text);
      const hallucination = hallucinationPenalty(response.text, task.prompt);
      const socratic = socraticDepth(response.text);

      console.log("\n" + colors.bright + colors.cyan + "📊 Metrics:" + colors.reset);
      printMetric("Readability Index", readability, 100);
      printMetric("Hallucination Penalty", 100 - hallucination, 100);
      printMetric("Socratic Depth", socratic, 100);

      // Track totals
      totalLatency += response.latencyMs;
      totalTokens += response.tokensUsed;
      totalCost += response.costUsd;
      readabilityScores.push(readability);
      socraticScores.push(socratic);
      hallucinationScores.push(hallucination);
    }

    // Calculate averages
    const avgReadability = readabilityScores.reduce((a, b) => a + b, 0) / readabilityScores.length;
    const avgSocratic = socraticScores.reduce((a, b) => a + b, 0) / socraticScores.length;
    const avgHallucination = hallucinationScores.reduce((a, b) => a + b, 0) / hallucinationScores.length;

    results.push({
      modelId: model.id,
      modelName: model.name,
      totalLatency,
      totalTokens,
      totalCost,
      avgReadability,
      avgSocratic,
      avgHallucination,
    });
  }

  // Print comparison
  printSection("📊 Model Comparison Summary");

  console.log(colors.bright + colors.white + "\nPerformance Metrics:" + colors.reset);
  console.log(colors.dim + "─".repeat(80) + colors.reset);

  for (const result of results) {
    console.log("\n" + colors.bright + colors.yellow + result.modelName + colors.reset);
    printMetric("  Readability", result.avgReadability, 100);
    printMetric("  Socratic Thinking", result.avgSocratic, 100);
    printMetric("  Accuracy (no halluc.)", 100 - result.avgHallucination, 100);
    console.log(
      colors.dim +
      `  Total Latency: ${result.totalLatency}ms | Tokens: ${formatTokens(result.totalTokens)} | Cost: ${formatCost(result.totalCost)}` +
      colors.reset
    );
  }

  // Print winner
  const winner = results.reduce((best, current) => {
    const bestScore = best.avgReadability + best.avgSocratic - best.avgHallucination;
    const currentScore = current.avgReadability + current.avgSocratic - current.avgHallucination;
    return currentScore > bestScore ? current : best;
  });

  console.log("\n" + colors.bright + colors.green + "🏆 Best Performing Model: " + winner.modelName + colors.reset);
  console.log(colors.dim + "This model had the highest combined score for readability, thinking depth, and accuracy.\n" + colors.reset);

  printHeader("✅ Demo Complete!");

  console.log(colors.white + "What's Available Now:" + colors.reset);
  console.log(colors.green + "  ✅ Model adapters for OpenAI, Anthropic, Google, and Local" + colors.reset);
  console.log(colors.green + "  ✅ Model registry with 14+ production models" + colors.reset);
  console.log(colors.green + "  ✅ Cost calculation and estimation utilities" + colors.reset);
  console.log(colors.green + "  ✅ Comprehensive metrics system (15+ functions)" + colors.reset);
  console.log(colors.green + "  ✅ Evaluation suite runner with comparison mode" + colors.reset);

  console.log("\n" + colors.yellow + "Next Steps (Phase 3):" + colors.reset);
  console.log(colors.dim + "  • Create test suite definitions (JSON)" + colors.reset);
  console.log(colors.dim + "  • Add test fixtures for common scenarios" + colors.reset);
  console.log(colors.dim + "  • Build CLI tools for running benchmarks" + colors.reset);
  console.log(colors.dim + "  • Create web UI for visualizing results\n" + colors.reset);
}

// Run demo
runDemo().catch((error) => {
  console.error(colors.red + "\n❌ Demo failed:" + colors.reset, error);
  process.exit(1);
});
