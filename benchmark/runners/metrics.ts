/**
 * Comprehensive metrics implementation for benchmark scoring
 * All functions are deterministic and dependency-light
 */

import { MetricResult, TaskReference } from "../schema/types";

// ============================================================================
// DAS METRICS
// ============================================================================

/**
 * Readability Index (Flesch-like proxy)
 * Returns 0-100, higher is more readable
 */
export function readabilityIndex(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease formula
  const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  // Normalize to 0-100, clamped
  return Math.max(0, Math.min(100, score));
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  const vowels = 'aeiouy';
  let count = 0;
  let previousWasVowel = false;

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      count++;
    }
    previousWasVowel = isVowel;
  }

  // Silent e
  if (word.endsWith('e')) {
    count--;
  }

  return Math.max(1, count);
}

/**
 * Format Obedience Score (0-1)
 * Checks if output follows specified formatting rules
 */
export function formatObedience(text: string, rules: string[]): number {
  let score = 0;
  const totalRules = rules.length;

  if (totalRules === 0) return 1;

  for (const rule of rules) {
    switch (rule.toLowerCase()) {
      case "bullets":
        // Check for bullet points (•, -, *, or numbered lists)
        if (/^[\s]*[•\-\*\d]+[\.\)]\s/m.test(text)) score++;
        break;

      case "numbered":
        // Check for numbered lists (1. 2. 3. etc.)
        if (/^\s*\d+[\.\)]\s/m.test(text)) score++;
        break;

      case "bold":
        // Check for bold text (**text** or __text__)
        if (/(\*\*|__).+?\1/.test(text)) score++;
        break;

      case "headers":
        // Check for markdown headers (# ## ###)
        if (/^#+\s/m.test(text)) score++;
        break;

      case "7+-2":
        // Check for 5-9 items (Miller's Law)
        const items = text.split(/\n/).filter(line => /^[\s]*[•\-\*\d]+/.test(line));
        if (items.length >= 5 && items.length <= 9) score++;
        break;

      case "short_paragraphs":
        // Check that paragraphs are under 100 words
        const paragraphs = text.split(/\n\n+/);
        const allShort = paragraphs.every(p => p.split(/\s+/).length <= 100);
        if (allShort) score++;
        break;

      default:
        // Unknown rule, skip
        break;
    }
  }

  return score / totalRules;
}

/**
 * Hallucination Penalty (0-1)
 * Higher score = fewer hallucinations
 * Checks keyword/fact overlap and contradictions
 */
export function hallucinationPenalty(text: string, reference: TaskReference): number {
  if (!reference.keyPoints || reference.keyPoints.length === 0) return 1;

  const textLower = text.toLowerCase();
  let matchCount = 0;
  let contradictionCount = 0;

  // Check key point coverage
  for (const keyPoint of reference.keyPoints) {
    const keywords = keyPoint.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const matches = keywords.filter(kw => textLower.includes(kw));
    if (matches.length / keywords.length > 0.5) {
      matchCount++;
    }
  }

  // Check for contradictions (basic heuristic)
  const negationPatterns = /\b(not|no|never|neither|none|don't|doesn't|didn't)\b/gi;
  const negations = (text.match(negationPatterns) || []).length;
  if (negations > reference.keyPoints.length * 0.5) {
    contradictionCount++;
  }

  const coverage = matchCount / reference.keyPoints.length;
  const contradictionPenalty = contradictionCount * 0.2;

  return Math.max(0, Math.min(1, coverage - contradictionPenalty));
}

/**
 * L2L Index (Lateral to Linear) - 0-100
 * Measures how well unstructured ideas are converted to structured output
 */
export function l2lIndex(sourceNotes: string, outputText: string): number {
  // Idea preservation score (0-50)
  const sourceWords = new Set(sourceNotes.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  const outputWords = new Set(outputText.toLowerCase().split(/\s+/).filter(w => w.length > 3));

  const intersection = [...sourceWords].filter(w => outputWords.has(w));
  const preservation = Math.min(50, (intersection.length / sourceWords.size) * 50);

  // Structural upgrade score (0-50)
  let structuralScore = 0;

  // Check for numbered lists
  if (/^\s*\d+[\.\)]\s/m.test(outputText)) structuralScore += 15;

  // Check for headers
  if (/^#+\s/m.test(outputText)) structuralScore += 10;

  // Check for clear sections
  const sections = outputText.split(/\n\n+/);
  if (sections.length >= 3) structuralScore += 10;

  // Check for bold labels
  if (/(\*\*|__).+?\1/.test(outputText)) structuralScore += 10;

  // Check for short sentences (avg < 20 words)
  const sentences = outputText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = outputText.split(/\s+/).length / sentences.length;
  if (avgWordsPerSentence < 20) structuralScore += 5;

  return Math.min(100, preservation + structuralScore);
}

// ============================================================================
// CPS METRICS
// ============================================================================

/**
 * Socratic Depth (0-100)
 * Measures quality and variety of probing questions
 */
export function socraticDepth(text: string): number {
  const questionMarks = (text.match(/\?/g) || []).length;
  if (questionMarks === 0) return 0;

  let score = 0;

  // Count questions (max 25 points)
  score += Math.min(25, questionMarks * 5);

  // Check for question variety (25 points)
  const questionStarters = [
    /\bwhat\b/i, /\bwhy\b/i, /\bhow\b/i, /\bwhen\b/i, /\bwhere\b/i,
    /\bwhich\b/i, /\bwho\b/i, /\bcould\b/i, /\bwould\b/i, /\bshould\b/i
  ];
  const varietyCount = questionStarters.filter(pattern => pattern.test(text)).length;
  score += Math.min(25, varietyCount * 2.5);

  // Check for open-ended questions (25 points)
  const openEnded = /what if|how might|why do you think|tell me about|what would happen/gi;
  const openEndedCount = (text.match(openEnded) || []).length;
  score += Math.min(25, openEndedCount * 5);

  // Check for assumption-surfacing (25 points)
  const assumptions = /assume|assumption|belief|perspective|view|consider|think about/gi;
  const assumptionCount = (text.match(assumptions) || []).length;
  score += Math.min(25, assumptionCount * 3);

  return Math.min(100, score);
}

/**
 * Strategic Structuring (0-100)
 * Measures presence of plans, backlogs, priorities
 */
export function strategicStructuring(text: string): number {
  let score = 0;

  // Check for numbered steps/plans (30 points)
  const numberedSteps = (text.match(/^\s*\d+[\.\)]\s/gm) || []).length;
  score += Math.min(30, numberedSteps * 3);

  // Check for priority indicators (25 points)
  const priorities = /priority|urgent|important|critical|high|medium|low|first|next|then|finally/gi;
  const priorityCount = (text.match(priorities) || []).length;
  score += Math.min(25, priorityCount * 2.5);

  // Check for timeline/duration mentions (20 points)
  const timeline = /\d+\s*(minute|hour|day|week|month)|deadline|by \w+day|schedule/gi;
  const timelineCount = (text.match(timeline) || []).length;
  score += Math.min(20, timelineCount * 4);

  // Check for actionable items (25 points)
  const actions = /action|task|step|goal|objective|deliverable|outcome|result/gi;
  const actionCount = (text.match(actions) || []).length;
  score += Math.min(25, actionCount * 2.5);

  return Math.min(100, score);
}

/**
 * Decision Support (0-100)
 * Measures options, trade-offs, next action, confidence
 */
export function decisionSupport(text: string): number {
  let score = 0;

  // Check for options (25 points)
  const options = /option|choice|alternative|approach|path|route|way forward/gi;
  const optionCount = (text.match(options) || []).length;
  score += Math.min(25, optionCount * 5);

  // Check for trade-offs (30 points)
  const tradeoffs = /pro|con|advantage|disadvantage|benefit|cost|risk|upside|downside|trade-?off/gi;
  const tradeoffCount = (text.match(tradeoffs) || []).length;
  score += Math.min(30, tradeoffCount * 5);

  // Check for recommendations (25 points)
  const recommendations = /recommend|suggest|advise|propose|consider|best|ideal|optimal/gi;
  const recommendCount = (text.match(recommendations) || []).length;
  score += Math.min(25, recommendCount * 5);

  // Check for confidence indicators (20 points)
  const confidence = /confident|likely|probably|possibly|uncertain|confident|sure|believe/gi;
  const confidenceCount = (text.match(confidence) || []).length;
  score += Math.min(20, confidenceCount * 4);

  return Math.min(100, score);
}

/**
 * Adaptability to Style (0-100)
 * Measures how well output matches requested tone/voice
 */
export function adaptabilityStyle(requestedStyle: string, output: string): number {
  const styleLower = requestedStyle.toLowerCase();
  const outputLower = output.toLowerCase();
  let score = 50; // Start neutral

  // Formal style
  if (styleLower.includes("formal") || styleLower.includes("professional")) {
    const formalMarkers = /\b(furthermore|however|therefore|nevertheless|consequently)\b/gi;
    const casualMarkers = /\b(yeah|nah|gonna|wanna|kinda|sorta|hey|cool|awesome)\b/gi;

    const formalCount = (outputLower.match(formalMarkers) || []).length;
    const casualCount = (outputLower.match(casualMarkers) || []).length;

    score += Math.min(30, formalCount * 10) - Math.min(30, casualCount * 10);
  }

  // Casual style
  if (styleLower.includes("casual") || styleLower.includes("friendly")) {
    const casualMarkers = /\b(hey|hi|yeah|cool|awesome|great|nice|fun)\b/gi;
    const stiffMarkers = /\b(furthermore|notwithstanding|heretofore|aforementioned)\b/gi;

    const casualCount = (outputLower.match(casualMarkers) || []).length;
    const stiffCount = (outputLower.match(stiffMarkers) || []).length;

    score += Math.min(30, casualCount * 10) - Math.min(30, stiffCount * 10);
  }

  // Brief/concise
  if (styleLower.includes("brief") || styleLower.includes("concise")) {
    const wordCount = output.split(/\s+/).length;
    if (wordCount < 150) score += 20;
    else if (wordCount > 300) score -= 20;
  }

  return Math.max(0, Math.min(100, score));
}

// ============================================================================
// DAL METRICS (Proprietary)
// ============================================================================

/**
 * Voice Loop Score (0-100)
 * Combines ASR WER and TTS pacing quality
 */
export function voiceLoopScore(asrWer: number, ttsPacingScore: number): number {
  // ASR Word Error Rate (lower is better)
  // Normalize: 0% WER = 50 points, 10% WER = 30 points, 20%+ WER = 0 points
  const asrScore = Math.max(0, 50 - (asrWer * 250));

  // TTS Pacing Score (0-100, higher is better)
  // Normalize to 0-50 range
  const ttsScore = ttsPacingScore * 0.5;

  return Math.min(100, asrScore + ttsScore);
}

/**
 * Consistency Score (0-100)
 * Measures variance across multiple runs with same seed
 */
export function consistency(outputs: string[]): number {
  if (outputs.length < 2) return 100;

  // Calculate Levenshtein distance between all pairs
  const distances: number[] = [];
  for (let i = 0; i < outputs.length; i++) {
    for (let j = i + 1; j < outputs.length; j++) {
      distances.push(levenshteinDistance(outputs[i], outputs[j]));
    }
  }

  // Average distance
  const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;

  // Normalize by average output length
  const avgLength = outputs.reduce((sum, out) => sum + out.length, 0) / outputs.length;
  const normalizedDistance = avgDistance / avgLength;

  // Convert to consistency score (lower distance = higher consistency)
  return Math.max(0, Math.min(100, (1 - normalizedDistance) * 100));
}

function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[len1][len2];
}

// ============================================================================
// OPERATIONAL METRICS
// ============================================================================

/**
 * Operational Index (0-100)
 * Normalized latency and cost
 */
export function operationalIndex(latencyMs: number, costUsd: number, cohort: { latencies: number[], costs: number[] }): number {
  const latencyScore = normalize(latencyMs, cohort.latencies, false); // lower is better
  const costScore = normalize(costUsd, cohort.costs, false); // lower is better

  return (latencyScore + costScore) / 2;
}

/**
 * Normalize value within cohort
 * @param higherIsBetter - if true, higher values get higher scores
 */
export function normalize(value: number, cohort: number[], higherIsBetter: boolean = true): number {
  if (cohort.length === 0) return 50;

  const min = Math.min(...cohort);
  const max = Math.max(...cohort);

  if (max === min) return 50;

  const normalized = (value - min) / (max - min);

  return higherIsBetter ? normalized * 100 : (1 - normalized) * 100;
}

// ============================================================================
// METRIC RUNNER
// ============================================================================

/**
 * Run all specified metrics on text output
 */
export function runMetrics(
  output: string,
  reference: TaskReference,
  metrics: string[],
  additionalData?: Record<string, any>
): MetricResult[] {
  const results: MetricResult[] = [];

  for (const metric of metrics) {
    let value = 0;
    let details: Record<string, any> = {};

    switch (metric) {
      case "readability_index":
        value = readabilityIndex(output);
        break;

      case "format_obedience":
        value = formatObedience(output, reference.formatRules || []) * 100;
        break;

      case "hallucination_penalty":
        value = hallucinationPenalty(output, reference) * 100;
        break;

      case "l2l_index":
        value = l2lIndex(additionalData?.sourceNotes || "", output);
        break;

      case "socratic_depth":
        value = socraticDepth(output);
        break;

      case "strategic_structuring":
        value = strategicStructuring(output);
        break;

      case "decision_support":
        value = decisionSupport(output);
        break;

      case "adaptability_style":
        value = adaptabilityStyle(additionalData?.requestedStyle || "", output);
        break;

      case "voice_loop_score":
        value = voiceLoopScore(additionalData?.asrWer || 0, additionalData?.ttsPacingScore || 0);
        break;

      default:
        console.warn(`Unknown metric: ${metric}`);
        continue;
    }

    results.push({ metric, value, details });
  }

  return results;
}
