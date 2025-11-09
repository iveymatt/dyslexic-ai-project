/**
 * Score Aggregation
 * Combines metrics into DAS, CPS, DAL, and Overall scores
 */

import {
  DASScore,
  CPSScore,
  DALScore,
  OperationalIndex,
  OverallScore,
  MetricResult,
  DEFAULT_RUBRIC_WEIGHTS,
} from "../schema/types";

// ============================================================================
// DAS AGGREGATION
// ============================================================================

export function aggregateDAS(metrics: Map<string, number>): DASScore {
  const weights = DEFAULT_RUBRIC_WEIGHTS.das;

  return {
    overall: calculateWeightedSum([
      { value: metrics.get("das.readability_structure") || 0, weight: weights.readabilityStructure },
      { value: metrics.get("das.instruction_following") || 0, weight: weights.instructionFollowing },
      { value: metrics.get("das.hallucination_resistance") || 0, weight: weights.hallucinationResistance },
      { value: metrics.get("das.voice_workflow_quality") || 0, weight: weights.voiceWorkflowQuality },
      { value: metrics.get("das.error_recovery") || 0, weight: weights.errorRecoveryClarifying },
      { value: metrics.get("das.accessibility_features") || 0, weight: weights.accessibilityFeatures },
    ]),
    readabilityStructure: metrics.get("das.readability_structure") || 0,
    instructionFollowing: metrics.get("das.instruction_following") || 0,
    hallucinationResistance: metrics.get("das.hallucination_resistance") || 0,
    voiceWorkflowQuality: metrics.get("das.voice_workflow_quality") || 0,
    errorRecoveryClarifying: metrics.get("das.error_recovery") || 0,
    accessibilityFeatures: metrics.get("das.accessibility_features") || 0,
  };
}

// ============================================================================
// CPS AGGREGATION
// ============================================================================

export function aggregateCPS(metrics: Map<string, number>): CPSScore {
  const weights = DEFAULT_RUBRIC_WEIGHTS.cps;

  return {
    overall: calculateWeightedSum([
      { value: metrics.get("cps.socratic_depth") || 0, weight: weights.socraticDepth },
      { value: metrics.get("cps.strategic_structuring") || 0, weight: weights.strategicStructuring },
      { value: metrics.get("cps.adaptability_style") || 0, weight: weights.adaptabilityToStyle },
      { value: metrics.get("cps.decision_support") || 0, weight: weights.decisionSupport },
      { value: metrics.get("cps.consistency") || 0, weight: weights.consistencyDeterminism },
    ]),
    socraticDepth: metrics.get("cps.socratic_depth") || 0,
    strategicStructuring: metrics.get("cps.strategic_structuring") || 0,
    adaptabilityToStyle: metrics.get("cps.adaptability_style") || 0,
    decisionSupport: metrics.get("cps.decision_support") || 0,
    consistencyDeterminism: metrics.get("cps.consistency") || 0,
  };
}

// ============================================================================
// DAL AGGREGATION (Proprietary)
// ============================================================================

export function aggregateDAL(metrics: Map<string, number>): DALScore {
  // DAL is computed from specific metrics with equal weights
  const languageProcessingEase = metrics.get("dal.language_processing_ease") || 0;
  const sequentialMemorySupport = metrics.get("dal.sequential_memory_support") || 0;
  const lateralToLinearSupport = metrics.get("dal.l2l_index") || 0;
  const voiceFirstInteraction = metrics.get("dal.voice_loop_score") || 0;
  const cognitiveFatigueReduction = metrics.get("dal.cognitive_fatigue") || 0;

  const overall = (
    languageProcessingEase * 0.25 +
    sequentialMemorySupport * 0.25 +
    lateralToLinearSupport * 0.20 +
    voiceFirstInteraction * 0.20 +
    cognitiveFatigueReduction * 0.10
  );

  return {
    overall,
    languageProcessingEase,
    sequentialMemorySupport,
    lateralToLinearSupport,
    voiceFirstInteraction,
    cognitiveFatigueReduction,
  };
}

// ============================================================================
// OPERATIONAL INDEX
// ============================================================================

export function aggregateOperational(
  latencyMs: number,
  costUsd: number,
  cohort: { latencies: number[], costs: number[] }
): OperationalIndex {
  // Normalize latency (lower is better)
  const latencyScore = normalize(latencyMs, cohort.latencies, false);

  // Normalize cost (lower is better)
  const costScore = normalize(costUsd, cohort.costs, false);

  return {
    overall: (latencyScore + costScore) / 2,
    latencyScore,
    costScore,
  };
}

// ============================================================================
// OVERALL SCORE
// ============================================================================

export function aggregateOverall(
  das: DASScore,
  cps: CPSScore,
  dal: DALScore,
  operational: OperationalIndex
): OverallScore {
  const weights = DEFAULT_RUBRIC_WEIGHTS.overall;

  const value = (
    das.overall * weights.dasWeight +
    cps.overall * weights.cpsWeight +
    dal.overall * weights.dalWeight
  );

  return {
    value,
    das,
    cps,
    dal,
    operational, // included but not in composite
  };
}

// ============================================================================
// METRIC TO DIMENSION MAPPING
// ============================================================================

/**
 * Maps raw metric results to structured dimension scores
 */
export function mapMetricsToDimensions(metrics: MetricResult[]): Map<string, number> {
  const dimensionMap = new Map<string, number>();

  for (const metric of metrics) {
    const { metric: name, value } = metric;

    // Map readability metrics to DAS.readability_structure
    if (name === "readability_index" || name === "format_obedience") {
      const current = dimensionMap.get("das.readability_structure") || 0;
      dimensionMap.set("das.readability_structure", current + value / 2); // average of 2
    }

    // Map instruction following
    if (name === "format_obedience") {
      dimensionMap.set("das.instruction_following", value);
    }

    // Map hallucination resistance
    if (name === "hallucination_penalty") {
      dimensionMap.set("das.hallucination_resistance", value);
    }

    // Map voice metrics
    if (name === "voice_loop_score") {
      dimensionMap.set("das.voice_workflow_quality", value);
      dimensionMap.set("dal.voice_loop_score", value);
    }

    // Map L2L
    if (name === "l2l_index") {
      dimensionMap.set("dal.l2l_index", value);
    }

    // Map CPS metrics
    if (name === "socratic_depth") {
      dimensionMap.set("cps.socratic_depth", value);
    }

    if (name === "strategic_structuring") {
      dimensionMap.set("cps.strategic_structuring", value);
    }

    if (name === "adaptability_style") {
      dimensionMap.set("cps.adaptability_style", value);
    }

    if (name === "decision_support") {
      dimensionMap.set("cps.decision_support", value);
    }

    if (name === "consistency") {
      dimensionMap.set("cps.consistency", value);
    }
  }

  // Compute derived DAL metrics
  computeDALDerivedMetrics(dimensionMap);

  return dimensionMap;
}

/**
 * Compute DAL metrics from other metrics
 */
function computeDALDerivedMetrics(dimensionMap: Map<string, number>): void {
  // Language Processing Ease (from hallucination resistance under dyslexic errors)
  const hallucinationResistance = dimensionMap.get("das.hallucination_resistance") || 0;
  dimensionMap.set("dal.language_processing_ease", hallucinationResistance);

  // Sequential Memory Support (from format obedience + structure)
  const formatObedience = dimensionMap.get("das.instruction_following") || 0;
  const readability = dimensionMap.get("das.readability_structure") || 0;
  dimensionMap.set("dal.sequential_memory_support", (formatObedience + readability) / 2);

  // Cognitive Fatigue Reduction (from readability)
  dimensionMap.set("dal.cognitive_fatigue", readability);
}

// ============================================================================
// HELPERS
// ============================================================================

function calculateWeightedSum(items: Array<{ value: number, weight: number }>): number {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight === 0) return 0;

  const weightedSum = items.reduce((sum, item) => sum + (item.value * item.weight), 0);
  return weightedSum / totalWeight * 100; // Scale to 0-100
}

function normalize(value: number, cohort: number[], higherIsBetter: boolean = true): number {
  if (cohort.length === 0) return 50;

  const min = Math.min(...cohort);
  const max = Math.max(...cohort);

  if (max === min) return 50;

  const normalized = (value - min) / (max - min);

  return higherIsBetter ? normalized * 100 : (1 - normalized) * 100;
}

// ============================================================================
// BADGE ASSIGNMENT
// ============================================================================

export interface Badge {
  key: string;
  label: string;
  description: string;
}

/**
 * Assign badges based on scores
 */
export function assignBadges(overall: OverallScore): Badge[] {
  const badges: Badge[] = [];

  // Voice-First badge
  if (overall.das.voiceWorkflowQuality >= 80) {
    badges.push({
      key: "voice_first",
      label: "Voice-First",
      description: "Excellent voice interaction support for dyslexic users",
    });
  }

  // Easy to Read badge
  if (overall.das.readabilityStructure >= 80) {
    badges.push({
      key: "easy_to_read",
      label: "Easy to Read",
      description: "High readability with clear structure",
    });
  }

  // Thinking Partner badge
  if (overall.cps.socraticDepth >= 80) {
    badges.push({
      key: "thinking_partner",
      label: "Thinking Partner",
      description: "Excellent Socratic questioning and thinking support",
    });
  }

  // Strategic badge
  if (overall.cps.strategicStructuring >= 80) {
    badges.push({
      key: "strategic",
      label: "Strategic",
      description: "Strong at planning, prioritization, and organization",
    });
  }

  // Reliable badge
  if (overall.cps.consistencyDeterminism >= 80) {
    badges.push({
      key: "reliable",
      label: "Reliable",
      description: "Consistent outputs across multiple runs",
    });
  }

  // Cost-Effective badge
  if (overall.operational.costScore >= 70) {
    badges.push({
      key: "cost_effective",
      label: "Cost-Effective",
      description: "Good performance at lower cost",
    });
  }

  // Fast badge
  if (overall.operational.latencyScore >= 70) {
    badges.push({
      key: "fast",
      label: "Fast",
      description: "Low latency responses",
    });
  }

  // Dyslexic-Optimized badge (comprehensive)
  if (overall.dal.overall >= 85) {
    badges.push({
      key: "dyslexic_optimized",
      label: "Dyslexic-Optimized",
      description: "Comprehensive support for dyslexic thinking patterns",
    });
  }

  return badges;
}
