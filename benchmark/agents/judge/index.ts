/**
 * JUDGE Agent
 * Scores test outputs using multi-rater LLM evaluation
 * Uses 3 independent raters and computes agreement metrics
 */

import {
  JudgeRequest,
  JudgeResult,
  ScoredItem,
  RaterScore,
  JudgeFinalScore,
  OrchestrationError,
  ErrorStage,
} from "../../orchestrator/schemas";

/**
 * Main JUDGE agent function
 * Coordinates multi-rater scoring of test outputs
 */
export async function judgeResults(
  request: JudgeRequest
): Promise<JudgeResult | OrchestrationError> {
  try {
    // Validate request
    const validationError = validateJudgeRequest(request);
    if (validationError) {
      return createError(validationError, false);
    }

    const scored: ScoredItem[] = [];

    // Score each item with N raters
    for (const item of request.items) {
      const raterScores: RaterScore[] = [];

      // Get scores from N independent raters
      for (let raterIndex = 0; raterIndex < request.numRaters; raterIndex++) {
        const score = await rateItem(item, raterIndex);
        raterScores.push(score);
      }

      // Compute final score and agreement
      const final = computeFinalScore(raterScores);

      scored.push({
        id: item.id,
        dimensionKey: item.dimensionKey,
        scores: raterScores,
        final,
      });
    }

    // Calculate coverage
    const coverage = {
      tested: scored.length,
      total: request.items.length,
    };

    const result: JudgeResult = {
      runId: request.runId,
      toolId: request.toolId,
      toolVersion: request.toolVersion,
      scored,
      coverage,
    };

    return result;
  } catch (error) {
    return createError(
      `Judge failed: ${error instanceof Error ? error.message : String(error)}`,
      false,
      { error }
    );
  }
}

/**
 * Rate a single item with one LLM rater
 * This uses a strict JSON prompt to ensure consistent output
 */
async function rateItem(
  item: JudgeRequest["items"][0],
  raterIndex: number
): Promise<RaterScore> {
  const prompt = buildRatingPrompt(item);

  // TODO: Replace with actual LLM call
  // For now, this is a placeholder that shows the expected structure
  const llmResponse = await callLLMRater(prompt, raterIndex);

  // Parse and validate LLM response
  try {
    const parsed = JSON.parse(llmResponse);

    if (
      typeof parsed.score !== "number" ||
      typeof parsed.notes !== "string" ||
      !Array.isArray(parsed.evidence_flags)
    ) {
      throw new Error("Invalid LLM response format");
    }

    // Validate score is within range
    if (parsed.score < 0 || parsed.score > item.maxPoints) {
      console.warn(
        `Rater ${raterIndex} gave score ${parsed.score} outside range [0, ${item.maxPoints}]. Clamping.`
      );
      parsed.score = Math.max(0, Math.min(item.maxPoints, parsed.score));
    }

    return {
      score: parsed.score,
      notes: parsed.notes,
      evidenceFlags: parsed.evidence_flags,
    };
  } catch (error) {
    // Fallback if LLM doesn't return valid JSON
    console.error(`Rater ${raterIndex} returned invalid JSON:`, llmResponse);
    return {
      score: 0,
      notes: "Failed to parse rater response",
      evidenceFlags: [],
    };
  }
}

/**
 * Build rating prompt for LLM
 * Uses strict instructions to return JSON only
 */
function buildRatingPrompt(item: JudgeRequest["items"][0]): string {
  const outputText = item.evidence.outputText || "(no text output)";
  const evidenceUris = item.evidence.evidenceUris.join(", ") || "(no evidence files)";

  return `You are a judge for the Dyslexic AI Benchmark. Your task is to score the following output against neurodivergent-first criteria.

DIMENSION: ${item.dimensionKey}
MAX POINTS: ${item.maxPoints}

RUBRIC:
${item.rubric}

OUTPUT TO SCORE:
${outputText}

EVIDENCE FILES:
${evidenceUris}

INSTRUCTIONS:
1. Read the output carefully through a neurodivergent lens
2. Apply the rubric strictly
3. Look for evidence flags (e.g., "chunking", "plain_language", "questions_first", "affirming_tone")
4. Return ONLY valid JSON with this exact structure:

{
  "score": <number between 0 and ${item.maxPoints}>,
  "notes": "<brief explanation of score in 1-2 sentences>",
  "evidence_flags": ["flag1", "flag2", ...]
}

NEURODIVERGENT-FIRST LENS:
- Prefer plain language, short paragraphs, chunking, visual hierarchy
- Value questions over answers, exploration over structure
- Celebrate neurodivergent strengths (divergent thinking, pattern recognition, hyperfocus)
- Penalize ableist language, walls of text, forced linearity, jargon density
- Affirming tone > deficit framing

Return ONLY the JSON object. No additional commentary.`;
}

/**
 * Call LLM rater (placeholder)
 * TODO: Implement actual LLM calls to Claude, GPT-4, Gemini
 */
async function callLLMRater(prompt: string, raterIndex: number): Promise<string> {
  // This is a placeholder. In production, this would call:
  // - Rater 0: Claude 3.7 Sonnet
  // - Rater 1: GPT-4 Turbo
  // - Rater 2: Gemini Pro

  // For now, return mock response
  console.warn(`[MOCK] Rater ${raterIndex} would evaluate with LLM. Using mock score.`);

  // Generate a mock score that varies slightly between raters
  const baseScore = 7 + Math.random() * 2; // 7-9 range
  const score = Math.round(baseScore * 10) / 10;

  return JSON.stringify({
    score,
    notes: "Mock evaluation. Replace with actual LLM call.",
    evidence_flags: ["chunking", "plain_language"],
  });
}

/**
 * Compute final score and agreement from multiple rater scores
 */
function computeFinalScore(raterScores: RaterScore[]): JudgeFinalScore {
  if (raterScores.length === 0) {
    return { rawScore: 0, agreement: 0 };
  }

  // Calculate mean score
  const scores = raterScores.map((rs) => rs.score);
  const rawScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;

  // Calculate agreement using coefficient of variation (inverse)
  // Lower CV = higher agreement
  const mean = rawScore;
  const variance =
    scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  let agreement: number;
  if (mean === 0) {
    // If mean is 0, agreement is perfect if all scores are 0
    agreement = scores.every((s) => s === 0) ? 1.0 : 0.0;
  } else {
    const cv = stdDev / mean; // Coefficient of variation
    // Convert CV to agreement score (0..1)
    // CV of 0 = perfect agreement (1.0)
    // CV of 0.5 or higher = poor agreement (approaches 0)
    agreement = Math.max(0, 1 - cv * 2);
  }

  return {
    rawScore: Math.round(rawScore * 10) / 10,
    agreement: Math.round(agreement * 100) / 100,
  };
}

/**
 * Calculate average agreement across all scored items
 */
export function calculateAverageAgreement(scored: ScoredItem[]): number {
  if (scored.length === 0) return 0;

  const totalAgreement = scored.reduce((sum, item) => sum + item.final.agreement, 0);
  return totalAgreement / scored.length;
}

/**
 * Validate JudgeRequest
 */
function validateJudgeRequest(request: JudgeRequest): string | null {
  if (!request.runId) return "runId is required";
  if (!request.toolId) return "toolId is required";
  if (!request.toolVersion) return "toolVersion is required";
  if (!Array.isArray(request.items)) return "items must be an array";
  if (request.items.length === 0) return "items cannot be empty";
  if (!request.numRaters || request.numRaters < 1) return "numRaters must be >= 1";

  // Validate each item
  for (const item of request.items) {
    if (!item.id) return "Each item must have an id";
    if (!item.dimensionKey) return "Each item must have a dimensionKey";
    if (typeof item.maxPoints !== "number" || item.maxPoints <= 0) {
      return "Each item must have a positive maxPoints";
    }
    if (!item.rubric) return "Each item must have a rubric";
    if (!item.evidence || !Array.isArray(item.evidence.evidenceUris)) {
      return "Each item must have evidence with evidenceUris array";
    }
  }

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
      stage: ErrorStage.JUDGE,
      message,
      recoverable,
      details,
    },
  };
}

/**
 * Extract all unique evidence flags from scored items
 */
export function extractAllEvidenceFlags(scored: ScoredItem[]): Set<string> {
  const allFlags = new Set<string>();

  for (const item of scored) {
    for (const raterScore of item.scores) {
      for (const flag of raterScore.evidenceFlags) {
        allFlags.add(flag);
      }
    }
  }

  return allFlags;
}

/**
 * Check if agreement is acceptable (>= 0.7)
 */
export function hasAcceptableAgreement(scored: ScoredItem[]): boolean {
  const avgAgreement = calculateAverageAgreement(scored);
  return avgAgreement >= 0.7;
}
