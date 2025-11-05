/**
 * Configuration for Dyslexic AI Benchmark
 * Defines dimensions, weights, MVP tests, and platform checks
 */

import { TestSpec, PlatformCheckSpec, BadgeType } from "./schemas";

// ============================================================================
// DIMENSIONS
// ============================================================================

export interface DimensionConfig {
  key: string;
  name: string;
  description: string;
  maxPoints: number;
  weight: number; // 0..1, must sum to 1.0
}

/**
 * All 13 dimensions for DAS calculation
 * Weight distribution:
 * - Core 4 dimensions: 48% (12% each)
 * - Core Accessibility: 12%
 * - Modality & I/O: 8%
 * - Cognitive Load: 6%
 * - Personalization: 5%
 * - Privacy/Data: 5%
 * - Cost Transparency: 4%
 * - Sustainability: 2%
 * - Update Velocity: 2%
 * - Agentic Support: 2%
 * Total: 100%
 */
export const DIMENSIONS: DimensionConfig[] = [
  // Core 4 dimensions (neurodivergent-first)
  {
    key: "lateral_thinking",
    name: "Lateral Thinking",
    description: "Non-linear exploration, creative connections, questions-first approach",
    maxPoints: 10,
    weight: 0.12,
  },
  {
    key: "linear_thinking",
    name: "Linear Thinking",
    description: "Structured breakdown, step-by-step guidance, clear organization",
    maxPoints: 10,
    weight: 0.12,
  },
  {
    key: "language_adaptability",
    name: "Language Adaptability",
    description: "Plain language, reading level adjustment, minimal jargon",
    maxPoints: 10,
    weight: 0.12,
  },
  {
    key: "neurodivergent_awareness",
    name: "Neurodivergent Awareness",
    description: "Affirming tone, celebrates ND strengths, practical EF strategies",
    maxPoints: 10,
    weight: 0.12,
  },

  // Supplementary dimensions
  {
    key: "core_accessibility",
    name: "Core Accessibility",
    description: "WCAG 2.1 AAA compliance, EN 301549, keyboard nav, contrast, focus indicators",
    maxPoints: 20,
    weight: 0.12,
  },
  {
    key: "modality_io",
    name: "Modality & I/O",
    description: "Voice input/output, touch, keyboard, alternative input methods",
    maxPoints: 10,
    weight: 0.08,
  },
  {
    key: "cognitive_load",
    name: "Cognitive Load",
    description: "Chunking, reader mode, distraction reduction, progressive disclosure",
    maxPoints: 8,
    weight: 0.06,
  },
  {
    key: "personalization",
    name: "Personalization",
    description: "Customizable UI, font/spacing, color schemes, saved preferences",
    maxPoints: 6,
    weight: 0.05,
  },
  {
    key: "privacy_data",
    name: "Privacy & Data",
    description: "Training opt-out by default, transparent data usage, GDPR compliance",
    maxPoints: 6,
    weight: 0.05,
  },
  {
    key: "cost_transparency",
    name: "Cost Transparency",
    description: "Clear per-unit pricing, no hidden fees, usage tracking",
    maxPoints: 4,
    weight: 0.04,
  },
  {
    key: "sustainability",
    name: "Sustainability",
    description: "Carbon footprint disclosure, energy efficiency, green hosting",
    maxPoints: 3,
    weight: 0.02,
  },
  {
    key: "update_velocity",
    name: "Update Velocity",
    description: "Release cadence, changelog clarity, backward compatibility",
    maxPoints: 3,
    weight: 0.02,
  },
  {
    key: "agentic_support",
    name: "Agentic Support",
    description: "API availability, automation-friendly, MCP/tool integration",
    maxPoints: 4,
    weight: 0.02,
  },
];

/**
 * Get dimension config by key
 */
export function getDimension(key: string): DimensionConfig | undefined {
  return DIMENSIONS.find((d) => d.key === key);
}

/**
 * Validate that weights sum to 1.0
 */
export function validateDimensionWeights(): boolean {
  const sum = DIMENSIONS.reduce((acc, d) => acc + d.weight, 0);
  return Math.abs(sum - 1.0) < 0.001; // Allow for floating point precision
}

// ============================================================================
// MVP TESTS (Core 4 dimensions)
// ============================================================================

/**
 * 4 MVP tests that evaluate the core neurodivergent dimensions
 * These tests use the existing prompts from the leaderboard
 */
export const MVP_TESTS: TestSpec[] = [
  {
    testId: "test_lateral",
    dimensionKey: "lateral_thinking",
    prompt:
      "I want to build something but I'm not sure what yet. I like coding and music. What questions should I ask myself to figure out what to build?",
    maxPoints: 10,
    rubric:
      "Score based on: (1) Asks clarifying questions rather than giving answers, (2) Explores tangents and connections between interests, (3) Encourages creative exploration, (4) Avoids premature structure or constraints, (5) Values divergent thinking. Deduct points for: jumping to solutions, rigid frameworks, linear thinking.",
  },
  {
    testId: "test_linear",
    dimensionKey: "linear_thinking",
    prompt:
      "Help me break down starting a personal website into steps. I get overwhelmed easily. Make it as simple as possible with time estimates.",
    maxPoints: 10,
    rubric:
      "Score based on: (1) Numbered sequential steps, (2) Small, manageable chunks, (3) Realistic time estimates, (4) Clear prioritization, (5) Scan-friendly formatting with visual hierarchy. Deduct points for: walls of text, missing time estimates, overwhelming detail, lack of structure.",
  },
  {
    testId: "test_language",
    dimensionKey: "language_adaptability",
    prompt:
      "Explain neural networks to someone with dyslexia who's never heard of it before. Use simple words. Keep it short.",
    maxPoints: 10,
    rubric:
      "Score based on: (1) Plain language with short common words, (2) Short paragraphs (2-3 sentences max), (3) Zero unnecessary jargon, (4) Concrete examples or analogies, (5) Chunked formatting with breathing room. Deduct points for: technical terms, dense paragraphs, abstract concepts, academic tone.",
  },
  {
    testId: "test_awareness",
    dimensionKey: "neurodivergent_awareness",
    prompt:
      "I have dyslexia and ADHD. I need help organizing my work. What strategies work best for brains like mine?",
    maxPoints: 10,
    rubric:
      "Score based on: (1) Affirming, strengths-based tone (NOT deficit framing), (2) Celebrates neurodivergent strengths, (3) Specific ND strategies (body doubling, chunking, visual cues), (4) Avoids ableist language, (5) Practical executive function tactics. Deduct points for: ableist terms, neurotypical-only advice, vague platitudes, deficit framing.",
  },
];

// ============================================================================
// PLATFORM CHECKS (Supplementary dimensions)
// ============================================================================

/**
 * Platform checks for accessibility, UI, and non-LLM dimensions
 * These are executed via Playwright, API calls, or static analysis
 */
export const PLATFORM_CHECKS: PlatformCheckSpec[] = [
  // Core Accessibility (20 points total)
  {
    checkId: "wcag_contrast",
    dimensionKey: "core_accessibility",
    command: "playwright:contrast_audit",
    maxPoints: 4,
    rubric: "Check color contrast ratios meet WCAG AAA (7:1 for normal text, 4.5:1 for large). Deduct 1 point per major violation.",
  },
  {
    checkId: "wcag_keyboard_nav",
    dimensionKey: "core_accessibility",
    command: "playwright:keyboard_nav_audit",
    maxPoints: 4,
    rubric: "Test keyboard navigation, tab order, focus indicators, no tab traps. Deduct 1 point per major issue.",
  },
  {
    checkId: "wcag_aria",
    dimensionKey: "core_accessibility",
    command: "playwright:aria_audit",
    maxPoints: 4,
    rubric: "Check ARIA labels, roles, live regions, semantic HTML. Deduct 1 point per major issue.",
  },
  {
    checkId: "wcag_screen_reader",
    dimensionKey: "core_accessibility",
    command: "playwright:screen_reader_test",
    maxPoints: 4,
    rubric: "Test with screen reader (NVDA/JAWS simulation). Check content announcement, navigation, form labels.",
  },
  {
    checkId: "wcag_magnification",
    dimensionKey: "core_accessibility",
    command: "playwright:zoom_test",
    maxPoints: 4,
    rubric: "Test at 200% zoom. Check no horizontal scroll, no cut-off content, readable text.",
  },

  // Modality & I/O (10 points total)
  {
    checkId: "voice_input",
    dimensionKey: "modality_io",
    command: "api:check_voice_input",
    maxPoints: 3,
    rubric: "Check if voice input is available (STT). Award 3 if native, 2 if third-party, 0 if none.",
  },
  {
    checkId: "voice_output",
    dimensionKey: "modality_io",
    command: "api:check_voice_output",
    maxPoints: 3,
    rubric: "Check if voice output is available (TTS). Award 3 if native, 2 if third-party, 0 if none.",
  },
  {
    checkId: "touch_support",
    dimensionKey: "modality_io",
    command: "playwright:touch_test",
    maxPoints: 2,
    rubric: "Check mobile responsiveness, touch targets (min 44x44px), no hover-only interactions.",
  },
  {
    checkId: "alternative_input",
    dimensionKey: "modality_io",
    command: "api:check_alternative_input",
    maxPoints: 2,
    rubric: "Check for alternative input methods (switch control, eye tracking, voice commands).",
  },

  // Cognitive Load (8 points total)
  {
    checkId: "reader_mode",
    dimensionKey: "cognitive_load",
    command: "playwright:reader_mode_check",
    maxPoints: 3,
    rubric: "Check if reader/focus mode available. Award 3 if native, 2 if partial, 0 if none.",
  },
  {
    checkId: "chunking",
    dimensionKey: "cognitive_load",
    command: "playwright:content_density_analysis",
    maxPoints: 3,
    rubric: "Analyze content density. Award points for short paragraphs, spacing, visual breaks.",
  },
  {
    checkId: "distraction_free",
    dimensionKey: "cognitive_load",
    command: "playwright:distraction_audit",
    maxPoints: 2,
    rubric: "Check for auto-play videos, popups, animations, excessive notifications.",
  },

  // Personalization (6 points total)
  {
    checkId: "font_customization",
    dimensionKey: "personalization",
    command: "api:check_font_options",
    maxPoints: 2,
    rubric: "Check if font family, size, spacing customizable. Award 2 if all, 1 if partial.",
  },
  {
    checkId: "color_schemes",
    dimensionKey: "personalization",
    command: "api:check_themes",
    maxPoints: 2,
    rubric: "Check for light/dark/custom themes. Award 2 if multiple, 1 if light/dark only.",
  },
  {
    checkId: "saved_preferences",
    dimensionKey: "personalization",
    command: "api:check_persistence",
    maxPoints: 2,
    rubric: "Check if preferences persist across sessions. Award 2 if all, 1 if partial.",
  },

  // Privacy & Data (6 points total)
  {
    checkId: "training_opt_out",
    dimensionKey: "privacy_data",
    command: "policy:parse_training_policy",
    maxPoints: 3,
    rubric: "Check if training opt-out by default or easily accessible. Award 3 if default, 2 if easy, 0 if hard.",
  },
  {
    checkId: "data_transparency",
    dimensionKey: "privacy_data",
    command: "policy:parse_data_usage",
    maxPoints: 2,
    rubric: "Check transparency of data usage in privacy policy. Award 2 if clear, 1 if vague, 0 if missing.",
  },
  {
    checkId: "gdpr_compliance",
    dimensionKey: "privacy_data",
    command: "policy:check_gdpr",
    maxPoints: 1,
    rubric: "Check GDPR compliance statements. Award 1 if present and clear.",
  },

  // Cost Transparency (4 points total)
  {
    checkId: "pricing_clarity",
    dimensionKey: "cost_transparency",
    command: "scraper:parse_pricing",
    maxPoints: 3,
    rubric: "Check pricing page for per-unit costs, clear tiers, no hidden fees. Award 3 if excellent, 2 if good, 1 if vague.",
  },
  {
    checkId: "usage_tracking",
    dimensionKey: "cost_transparency",
    command: "api:check_usage_dashboard",
    maxPoints: 1,
    rubric: "Check if usage tracking/dashboard available. Award 1 if present.",
  },

  // Sustainability (3 points total)
  {
    checkId: "carbon_disclosure",
    dimensionKey: "sustainability",
    command: "scraper:check_carbon_info",
    maxPoints: 2,
    rubric: "Check for carbon footprint or energy efficiency disclosure. Award 2 if quantified, 1 if mentioned.",
  },
  {
    checkId: "green_hosting",
    dimensionKey: "sustainability",
    command: "api:check_hosting_provider",
    maxPoints: 1,
    rubric: "Check if hosted on green/renewable infrastructure. Award 1 if yes.",
  },

  // Update Velocity (3 points total)
  {
    checkId: "release_cadence",
    dimensionKey: "update_velocity",
    command: "github:analyze_releases",
    maxPoints: 2,
    rubric: "Analyze release frequency. Award 2 if frequent (monthly), 1 if moderate (quarterly), 0 if rare.",
  },
  {
    checkId: "changelog_clarity",
    dimensionKey: "update_velocity",
    command: "scraper:parse_changelog",
    maxPoints: 1,
    rubric: "Check changelog clarity. Award 1 if clear and accessible, 0 if missing or vague.",
  },

  // Agentic Support (4 points total)
  {
    checkId: "api_availability",
    dimensionKey: "agentic_support",
    command: "api:check_api_docs",
    maxPoints: 2,
    rubric: "Check if public API available and documented. Award 2 if yes, 0 if no.",
  },
  {
    checkId: "automation_friendly",
    dimensionKey: "agentic_support",
    command: "api:check_automation",
    maxPoints: 1,
    rubric: "Check for webhooks, CLI, SDKs. Award 1 if present.",
  },
  {
    checkId: "tool_integration",
    dimensionKey: "agentic_support",
    command: "api:check_mcp_support",
    maxPoints: 1,
    rubric: "Check for MCP, plugin system, or tool integration. Award 1 if present.",
  },
];

// ============================================================================
// BADGE CRITERIA
// ============================================================================

export interface BadgeCriteria {
  badge: BadgeType;
  name: string;
  description: string;
  condition: (
    dimensionScores: Map<string, number>,
    evidenceFlags: Set<string>
  ) => boolean;
}

/**
 * Badge assignment logic
 */
export const BADGE_CRITERIA: BadgeCriteria[] = [
  {
    badge: BadgeType.PlainLanguageDefault,
    name: "Plain Language Default",
    description: "Uses plain language and chunked formatting by default",
    condition: (scores, flags) =>
      (scores.get("language_adaptability") ?? 0) >= 8 &&
      flags.has("chunking"),
  },
  {
    badge: BadgeType.VoiceFirst,
    name: "Voice First",
    description: "Strong voice input/output support",
    condition: (scores, flags) =>
      (scores.get("modality_io") ?? 0) >= 8 &&
      flags.has("voice_tts_stt"),
  },
  {
    badge: BadgeType.ReaderView,
    name: "Reader View",
    description: "Offers distraction-free reader mode",
    condition: (scores, flags) =>
      (scores.get("cognitive_load") ?? 0) >= 6 &&
      flags.has("reader_mode"),
  },
  {
    badge: BadgeType.PrivacyGuard,
    name: "Privacy Guard",
    description: "Strong privacy defaults and transparency",
    condition: (scores, flags) =>
      (scores.get("privacy_data") ?? 0) >= 5,
  },
  {
    badge: BadgeType.CostClear,
    name: "Cost Clear",
    description: "Transparent pricing with no hidden fees",
    condition: (scores, flags) =>
      (scores.get("cost_transparency") ?? 0) >= 3,
  },
  {
    badge: BadgeType.GreenDisclosure,
    name: "Green Disclosure",
    description: "Discloses environmental impact",
    condition: (scores, flags) =>
      (scores.get("sustainability") ?? 0) >= 2,
  },
  {
    badge: BadgeType.AgentReady,
    name: "Agent Ready",
    description: "API and automation support for agents",
    condition: (scores, flags) =>
      (scores.get("agentic_support") ?? 0) >= 3,
  },
];

// ============================================================================
// DAS FORMULA
// ============================================================================

/**
 * Calculate DAS (Dyslexic Accessibility Score) from dimension scores
 *
 * Formula:
 * For each dimension i: normalized_i = raw_i / max_i
 * DAS = round(100 * Σ(weight_i * normalized_i), 1)
 *
 * @param dimensionScores Map of dimension key to raw score
 * @returns DAS score (0-100)
 */
export function calculateDAS(dimensionScores: Map<string, number>): number {
  let weightedSum = 0;

  for (const dimension of DIMENSIONS) {
    const rawScore = dimensionScores.get(dimension.key) ?? 0;
    const normalized = rawScore / dimension.maxPoints;
    weightedSum += dimension.weight * normalized;
  }

  return Math.round(weightedSum * 100 * 10) / 10; // Round to 1 decimal place
}

/**
 * Calculate confidence score based on judge agreement and test coverage
 *
 * @param avgAgreement Average agreement across all scored items (0..1)
 * @param coverage Test coverage (tested/total)
 * @returns Confidence score (0..1)
 */
export function calculateConfidence(
  avgAgreement: number,
  coverage: number
): number {
  // Confidence is geometric mean of agreement and coverage
  return Math.sqrt(avgAgreement * coverage);
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export const BenchmarkConfig = {
  DIMENSIONS,
  MVP_TESTS,
  PLATFORM_CHECKS,
  BADGE_CRITERIA,
  getDimension,
  validateDimensionWeights,
  calculateDAS,
  calculateConfidence,
};
