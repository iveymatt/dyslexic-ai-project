/**
 * PUBLISHER Agent
 * Computes DAS score, assigns badges, generates diff summaries, and publishes results
 */

import {
  PublishInput,
  PublishOutput,
  DimensionBreakdown,
  BadgeType,
  OrchestrationError,
  ErrorStage,
} from "../../orchestrator/schemas";
import {
  DIMENSIONS,
  BADGE_CRITERIA,
  calculateDAS,
} from "../../orchestrator/config";

/**
 * Main PUBLISHER agent function
 * Transforms judge results into final DAS score with badges
 */
export async function publishResults(
  input: PublishInput
): Promise<PublishOutput | OrchestrationError> {
  try {
    // Validate input
    if (!input.toolId || !input.toolVersion) {
      return createError("Missing required fields: toolId or toolVersion", false);
    }

    if (input.confidence < 0 || input.confidence > 1) {
      return createError("Confidence must be between 0 and 1", false);
    }

    // Step 1: Create dimension breakdown with normalization
    const dimensionBreakdown = createDimensionBreakdown(input.dimensionScores);

    // Step 2: Calculate DAS
    const dimensionScoreMap = new Map(
      input.dimensionScores.map((ds) => [ds.dimensionKey, ds.raw])
    );
    const das = calculateDAS(dimensionScoreMap);

    // Step 3: Assign badges
    const evidenceFlags = extractEvidenceFlags(input.evidenceIndex);
    const badges = assignBadges(dimensionScoreMap, evidenceFlags);

    // Step 4: Generate diff summary
    const diffSummary = generateDiffSummary(
      das,
      badges,
      input.previous
    );

    // Step 5: Return PublishOutput
    const output: PublishOutput = {
      aggregate: {
        toolId: input.toolId,
        toolVersion: input.toolVersion,
        das,
        confidence: input.confidence,
        dimensionBreakdown,
        badges,
      },
      diffSummary,
    };

    return output;
  } catch (error) {
    return createError(
      `Publisher failed: ${error instanceof Error ? error.message : String(error)}`,
      false,
      { error }
    );
  }
}

/**
 * Create dimension breakdown with normalization
 */
function createDimensionBreakdown(
  dimensionScores: { dimensionKey: string; raw: number }[]
): DimensionBreakdown[] {
  return dimensionScores.map((ds) => {
    const dimension = DIMENSIONS.find((d) => d.key === ds.dimensionKey);
    if (!dimension) {
      throw new Error(`Unknown dimension: ${ds.dimensionKey}`);
    }

    return {
      dimensionKey: ds.dimensionKey,
      raw: ds.raw,
      normalized: ds.raw / dimension.maxPoints,
      weight: dimension.weight,
    };
  });
}

/**
 * Extract evidence flags from evidence index
 */
function extractEvidenceFlags(
  evidenceIndex: Array<{ id: string; uris: string[] }>
): Set<string> {
  const flags = new Set<string>();

  // Extract flags from evidence URIs
  // Evidence URIs may contain flags like: "/evidence/run123/lateral_chunking_plain_language.json"
  for (const evidence of evidenceIndex) {
    for (const uri of evidence.uris) {
      const filename = uri.split("/").pop() || "";
      const parts = filename.replace(".json", "").replace(".png", "").split("_");

      // Common evidence flags
      const knownFlags = [
        "chunking",
        "plain_language",
        "voice_tts_stt",
        "reader_mode",
        "questions_first",
        "creative_connections",
        "no_assumptions",
        "affirming_tone",
        "nd_strategies",
      ];

      for (const flag of knownFlags) {
        if (parts.includes(flag) || filename.includes(flag)) {
          flags.add(flag);
        }
      }
    }
  }

  return flags;
}

/**
 * Assign badges based on dimension scores and evidence flags
 */
function assignBadges(
  dimensionScores: Map<string, number>,
  evidenceFlags: Set<string>
): BadgeType[] {
  const badges: BadgeType[] = [];

  for (const criteria of BADGE_CRITERIA) {
    if (criteria.condition(dimensionScores, evidenceFlags)) {
      badges.push(criteria.badge);
    }
  }

  return badges;
}

/**
 * Generate human-readable diff summary
 */
function generateDiffSummary(
  newDAS: number,
  newBadges: BadgeType[],
  previous?: { das?: number; dimensionScores?: { dimensionKey: string; raw: number }[] }
): string {
  if (!previous || previous.das === undefined) {
    return `Initial benchmark: DAS ${newDAS}. Earned ${newBadges.length} badge${newBadges.length === 1 ? "" : "s"}.`;
  }

  const dasDiff = newDAS - previous.das;
  const dasDiffFormatted = dasDiff >= 0 ? `+${dasDiff.toFixed(1)}` : dasDiff.toFixed(1);

  let summary = `DAS ${previous.das} → ${newDAS} (${dasDiffFormatted})`;

  // Badge changes
  const previousBadgeCount = 0; // We don't have previous badges in the input schema
  const newBadgeCount = newBadges.length;

  if (newBadgeCount > previousBadgeCount) {
    const earnedBadges = newBadges.slice(previousBadgeCount);
    summary += `. Earned new badge${earnedBadges.length === 1 ? "" : "s"}: ${earnedBadges.join(", ")}`;
  } else if (newBadgeCount < previousBadgeCount) {
    summary += `. Lost ${previousBadgeCount - newBadgeCount} badge${previousBadgeCount - newBadgeCount === 1 ? "" : "s"}`;
  }

  // Dimension improvements
  if (previous.dimensionScores) {
    const previousScoreMap = new Map(
      previous.dimensionScores.map((ds) => [ds.dimensionKey, ds.raw])
    );

    const improvements: string[] = [];
    const regressions: string[] = [];

    for (const dimension of DIMENSIONS) {
      const prevScore = previousScoreMap.get(dimension.key) ?? 0;
      const newScore = 0; // We need current scores from dimensionScores map
      const diff = newScore - prevScore;

      if (Math.abs(diff) >= 1) {
        const dimensionName = dimension.name;
        if (diff > 0) {
          improvements.push(`${dimensionName} +${diff.toFixed(1)}`);
        } else {
          regressions.push(`${dimensionName} ${diff.toFixed(1)}`);
        }
      }
    }

    if (improvements.length > 0) {
      summary += `. Improved: ${improvements.slice(0, 3).join(", ")}`;
    }
    if (regressions.length > 0) {
      summary += `. Regressed: ${regressions.slice(0, 3).join(", ")}`;
    }
  }

  return summary + ".";
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
      stage: ErrorStage.PUBLISHER,
      message,
      recoverable,
      details,
    },
  };
}

/**
 * Validate PublishInput
 */
export function validatePublishInput(input: PublishInput): string | null {
  if (!input.toolId) return "toolId is required";
  if (!input.toolVersion) return "toolVersion is required";
  if (!Array.isArray(input.dimensionScores)) return "dimensionScores must be an array";
  if (typeof input.confidence !== "number") return "confidence must be a number";
  if (input.confidence < 0 || input.confidence > 1) return "confidence must be between 0 and 1";
  if (!Array.isArray(input.evidenceIndex)) return "evidenceIndex must be an array";

  // Validate each dimension score
  for (const ds of input.dimensionScores) {
    if (!ds.dimensionKey || typeof ds.raw !== "number") {
      return "Each dimension score must have dimensionKey (string) and raw (number)";
    }

    const dimension = DIMENSIONS.find((d) => d.key === ds.dimensionKey);
    if (!dimension) {
      return `Unknown dimension: ${ds.dimensionKey}`;
    }

    if (ds.raw < 0 || ds.raw > dimension.maxPoints) {
      return `Score for ${ds.dimensionKey} must be between 0 and ${dimension.maxPoints}`;
    }
  }

  return null;
}

/**
 * Calculate Core Score (average of 4 core dimensions) for backward compatibility
 */
export function calculateCoreScore(dimensionScores: Map<string, number>): number {
  const coreDimensions = [
    "lateral_thinking",
    "linear_thinking",
    "language_adaptability",
    "neurodivergent_awareness",
  ];

  let sum = 0;
  let count = 0;

  for (const key of coreDimensions) {
    const score = dimensionScores.get(key);
    if (score !== undefined) {
      sum += score;
      count++;
    }
  }

  return count > 0 ? Math.round((sum / count) * 10) / 10 : 0;
}
