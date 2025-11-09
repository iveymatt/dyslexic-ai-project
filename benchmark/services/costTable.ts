/**
 * Cost Table Service
 * Pricing data and cost calculation utilities for all supported models
 */

import { getModelMetadata } from "./modelRegistry";

/**
 * Cost breakdown for a model request
 */
export interface CostBreakdown {
  modelId: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: "USD";
}

/**
 * Calculate cost for a model request
 */
export function calculateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): CostBreakdown {
  const metadata = getModelMetadata(modelId);

  if (!metadata) {
    throw new Error(`Unknown model ID: ${modelId}`);
  }

  const inputCost = (inputTokens / 1_000_000) * metadata.pricing.inputPer1M;
  const outputCost = (outputTokens / 1_000_000) * metadata.pricing.outputPer1M;
  const totalCost = inputCost + outputCost;

  return {
    modelId,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
    inputCost,
    outputCost,
    totalCost,
    currency: "USD",
  };
}

/**
 * Estimate cost for a prompt (before making request)
 */
export function estimateCost(
  modelId: string,
  promptText: string,
  expectedResponseTokens: number = 500
): CostBreakdown {
  // Rough estimate: ~4 characters per token
  const estimatedInputTokens = Math.ceil(promptText.length / 4);

  return calculateCost(modelId, estimatedInputTokens, expectedResponseTokens);
}

/**
 * Compare costs across multiple models for the same request
 */
export function compareCosts(
  modelIds: string[],
  inputTokens: number,
  outputTokens: number
): CostBreakdown[] {
  return modelIds
    .map((modelId) => {
      try {
        return calculateCost(modelId, inputTokens, outputTokens);
      } catch (error) {
        console.error(`Failed to calculate cost for ${modelId}:`, error);
        return null;
      }
    })
    .filter((breakdown): breakdown is CostBreakdown => breakdown !== null)
    .sort((a, b) => a.totalCost - b.totalCost);
}

/**
 * Find most cost-effective model for a given task
 */
export function findCostEffectiveModel(
  modelIds: string[],
  inputTokens: number,
  outputTokens: number
): CostBreakdown | null {
  const comparisons = compareCosts(modelIds, inputTokens, outputTokens);
  return comparisons[0] || null;
}

/**
 * Calculate total cost for multiple requests
 */
export function calculateBulkCost(
  requests: Array<{
    modelId: string;
    inputTokens: number;
    outputTokens: number;
  }>
): {
  breakdowns: CostBreakdown[];
  totalCost: number;
  totalTokens: number;
  byModel: Map<string, { count: number; cost: number; tokens: number }>;
} {
  const breakdowns = requests.map((req) =>
    calculateCost(req.modelId, req.inputTokens, req.outputTokens)
  );

  const totalCost = breakdowns.reduce((sum, b) => sum + b.totalCost, 0);
  const totalTokens = breakdowns.reduce((sum, b) => sum + b.totalTokens, 0);

  // Group by model
  const byModel = new Map<string, { count: number; cost: number; tokens: number }>();

  for (const breakdown of breakdowns) {
    const existing = byModel.get(breakdown.modelId) || { count: 0, cost: 0, tokens: 0 };
    existing.count += 1;
    existing.cost += breakdown.totalCost;
    existing.tokens += breakdown.totalTokens;
    byModel.set(breakdown.modelId, existing);
  }

  return { breakdowns, totalCost, totalTokens, byModel };
}

/**
 * Format cost as human-readable string
 */
export function formatCost(costUsd: number, precision: number = 4): string {
  if (costUsd < 0.0001) {
    return `$${(costUsd * 1000000).toFixed(2)}µ`; // Micro-dollars
  } else if (costUsd < 0.01) {
    return `$${(costUsd * 1000).toFixed(2)}m`; // Milli-dollars
  } else if (costUsd < 1) {
    return `$${costUsd.toFixed(precision)}`;
  } else {
    return `$${costUsd.toFixed(2)}`;
  }
}

/**
 * Format tokens as human-readable string
 */
export function formatTokens(tokens: number): string {
  if (tokens < 1000) {
    return `${tokens}`;
  } else if (tokens < 1_000_000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  } else {
    return `${(tokens / 1_000_000).toFixed(2)}M`;
  }
}

/**
 * Calculate cost per 1K tokens (for comparison)
 */
export function costPer1K(modelId: string): { input: number; output: number; average: number } {
  const metadata = getModelMetadata(modelId);

  if (!metadata) {
    throw new Error(`Unknown model ID: ${modelId}`);
  }

  const input = metadata.pricing.inputPer1M / 1000;
  const output = metadata.pricing.outputPer1M / 1000;
  const average = (input + output) / 2;

  return { input, output, average };
}

/**
 * Estimate benchmark suite cost
 */
export function estimateBenchmarkCost(params: {
  modelId: string;
  numTests: number;
  avgPromptLength: number; // characters
  avgResponseLength: number; // characters
  numRaters?: number; // for JUDGE agent
}): {
  runnerCost: CostBreakdown;
  judgeCost: CostBreakdown;
  totalCost: number;
} {
  const { modelId, numTests, avgPromptLength, avgResponseLength, numRaters = 3 } = params;

  // RUNNER cost (model being tested)
  const runnerInputTokens = Math.ceil(avgPromptLength / 4) * numTests;
  const runnerOutputTokens = Math.ceil(avgResponseLength / 4) * numTests;
  const runnerCost = calculateCost(modelId, runnerInputTokens, runnerOutputTokens);

  // JUDGE cost (3 raters, analyzing responses)
  // Each rater sees: rubric + evidence (response) + generates score
  const judgeInputPerItem = Math.ceil((200 + avgResponseLength) / 4); // rubric ~200 chars
  const judgeOutputPerItem = Math.ceil(100 / 4); // score + reasoning ~100 chars
  const judgeInputTokens = judgeInputPerItem * numTests * numRaters;
  const judgeOutputTokens = judgeOutputPerItem * numTests * numRaters;

  // Use GPT-3.5 Turbo for judges (cost-effective)
  const judgeCost = calculateCost(
    "openai:gpt-3.5-turbo",
    judgeInputTokens,
    judgeOutputTokens
  );

  return {
    runnerCost,
    judgeCost,
    totalCost: runnerCost.totalCost + judgeCost.totalCost,
  };
}

/**
 * Get pricing tier for a model
 */
export function getPricingTier(modelId: string): "free" | "budget" | "standard" | "premium" {
  const metadata = getModelMetadata(modelId);

  if (!metadata) {
    return "standard";
  }

  if (metadata.provider === "local") {
    return "free";
  }

  const avgCost = (metadata.pricing.inputPer1M + metadata.pricing.outputPer1M) / 2;

  if (avgCost < 1.0) {
    return "budget";
  } else if (avgCost < 10.0) {
    return "standard";
  } else {
    return "premium";
  }
}

/**
 * Calculate cost savings compared to baseline
 */
export function calculateSavings(
  baselineModelId: string,
  alternativeModelId: string,
  inputTokens: number,
  outputTokens: number
): {
  baselineCost: number;
  alternativeCost: number;
  savings: number;
  savingsPercent: number;
} {
  const baselineCost = calculateCost(baselineModelId, inputTokens, outputTokens).totalCost;
  const alternativeCost = calculateCost(alternativeModelId, inputTokens, outputTokens).totalCost;
  const savings = baselineCost - alternativeCost;
  const savingsPercent = (savings / baselineCost) * 100;

  return {
    baselineCost,
    alternativeCost,
    savings,
    savingsPercent,
  };
}
