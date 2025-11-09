/**
 * Comprehensive type definitions for Dyslexic AI Benchmark Harness
 */

// ============================================================================
// SCORING SYSTEMS
// ============================================================================

/**
 * DAS (Dyslexic Accessibility Score) - 0-100
 * Measures how well a model supports dyslexic users
 */
export interface DASScore {
  overall: number; // 0-100
  readabilityStructure: number; // 0-25
  instructionFollowing: number; // 0-20
  hallucinationResistance: number; // 0-15
  voiceWorkflowQuality: number; // 0-20
  errorRecoveryClarifying: number; // 0-10
  accessibilityFeatures: number; // 0-10
}

/**
 * CPS (Cognitive Partner Score) - 0-100
 * Measures how well a model acts as a thinking partner
 */
export interface CPSScore {
  overall: number; // 0-100
  socraticDepth: number; // 0-25
  strategicStructuring: number; // 0-25
  adaptabilityToStyle: number; // 0-20
  decisionSupport: number; // 0-20
  consistencyDeterminism: number; // 0-10
}

/**
 * DAL (Dyslexic AI Lens) - 0-100
 * Proprietary composite measuring dyslexic-specific AI quality
 */
export interface DALScore {
  overall: number; // 0-100
  languageProcessingEase: number; // phoneme/homophone/spelling tolerance
  sequentialMemorySupport: number; // chunking, numbering, scaffolding
  lateralToLinearSupport: number; // L2L Index
  voiceFirstInteraction: number; // Voice Loop Score
  cognitiveFatigueReduction: number; // clarity per token
}

/**
 * Operational Index - 0-100
 * Normalized latency and cost metrics
 */
export interface OperationalIndex {
  overall: number; // 0-100
  latencyScore: number; // normalized p50/p95
  costScore: number; // normalized cost per task
}

/**
 * Overall Composite Score
 * Overall = 0.4*DAS + 0.4*CPS + 0.2*DAL
 */
export interface OverallScore {
  value: number; // 0-100
  das: DASScore;
  cps: CPSScore;
  dal: DALScore;
  operational: OperationalIndex;
}

// ============================================================================
// MODEL & ADAPTER INTERFACES
// ============================================================================

export type Modality = "text" | "tts" | "asr";

export interface ModelConfig {
  modelId: string;
  provider: "openai" | "anthropic" | "google" | "local";
  name: string;
  version: string;
  contextTokens: number;
  priceIn: number; // per 1M tokens
  priceOut: number; // per 1M tokens
  modalities: {
    text: boolean;
    tts?: boolean;
    asr?: boolean;
  };
}

export interface CompletionRequest {
  prompt: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
  seed?: number;
}

export interface CompletionResponse {
  text: string;
  tokensIn: number;
  tokensOut: number;
  latencyMs: number;
  costUsd: number;
  audioUri?: string; // for TTS
}

export interface ModelAdapter {
  name: string;
  modalities: ModelConfig["modalities"];
  completeText(input: CompletionRequest): Promise<CompletionResponse>;
}

// ============================================================================
// TEST SUITES & TASKS
// ============================================================================

export interface TaskFixture {
  key: string;
  path: string;
  content?: string;
}

export interface TaskReference {
  keyPoints?: string[];
  formatRules?: string[];
  expectedStructure?: string;
  [key: string]: any;
}

export interface TaskDefinition {
  taskId: string;
  suite: string;
  modality: Modality;
  weight: number;
  inputs: {
    prompt: string;
    fixtureRefs?: string[];
  };
  reference: TaskReference;
  metrics: string[]; // ["readability_index", "format_obedience", ...]
}

export interface SuiteDefinition {
  name: string;
  version: string;
  description: string;
  tasks: TaskDefinition[];
}

// ============================================================================
// METRICS & EVALUATION
// ============================================================================

export interface MetricResult {
  metric: string;
  value: number;
  details?: Record<string, any>;
}

export interface TaskResult {
  taskId: string;
  input: string;
  output: string;
  latencyMs: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  metrics: MetricResult[];
}

export interface RunResult {
  runId: string;
  modelId: string;
  evalVersion: string;
  suite: string;
  startedAt: string;
  finishedAt: string;
  tasks: TaskResult[];
  aggregateScores: {
    das: DASScore;
    cps: CPSScore;
    dal: DALScore;
    overall: OverallScore;
    operational: OperationalIndex;
  };
  p50LatencyMs: number;
  p95LatencyMs: number;
  totalCostUsd: number;
}

// ============================================================================
// PUBLIC SCORECARDS
// ============================================================================

export type UserRole = "educator" | "coach" | "learner" | "developer";

export interface PublicTag {
  key: string;
  label: string;
  description: string;
  score?: number; // optional score if relevant
}

export interface ExternalBenchmarkReference {
  standard: string; // "WCAG 2.2", "WAI-ARIA", "PlainLanguage.gov", etc.
  section?: string;
  compliance: "full" | "partial" | "none";
  notes?: string;
}

export interface PublicSnapshot {
  snapshotId: string;
  evalVersion: string;
  createdAt: string;
  models: Array<{
    modelId: string;
    name: string;
    version: string;
    provider: string;
    scores: {
      das: number;
      cps: number;
      dal: number;
      overall: number;
      operational: number;
    };
    costLatencyBand: "low" | "medium" | "high";
    tags: PublicTag[];
    externalBenchmarks: ExternalBenchmarkReference[];
  }>;
}

export interface RoleScorecard {
  role: UserRole;
  evalVersion: string;
  createdAt: string;
  emphasis: string[]; // which scores matter most for this role
  models: Array<{
    modelId: string;
    name: string;
    version: string;
    provider: string;
    relevanceScore: number; // 0-100 for this role
    topTags: PublicTag[];
    recommendations: string[];
    externalBenchmarks: ExternalBenchmarkReference[];
  }>;
}

// ============================================================================
// RESEARCH & CORRELATION
// ============================================================================

export interface CorrelationFeature {
  feature: string;
  description: string;
  values: Array<{
    modelId: string;
    value: number;
  }>;
  correlation?: number; // correlation coefficient if computed
}

export interface ResearchData {
  evalVersion: string;
  features: CorrelationFeature[];
  anonymized: boolean;
  notes: string;
}

// ============================================================================
// CLI & RUNNER INTERFACES
// ============================================================================

export interface RunConfig {
  suite: string;
  evalVersion: string;
  models: string[]; // "openai:gpt-4o-2025-10", etc.
  seeds?: number[];
  verbose?: boolean;
}

export interface PublishConfig {
  evalVersion: string;
  roles: UserRole[];
  outputDir?: string;
}

// ============================================================================
// RUBRIC & WEIGHTS
// ============================================================================

export interface RubricWeights {
  version: string;
  das: {
    readabilityStructure: number; // 25
    instructionFollowing: number; // 20
    hallucinationResistance: number; // 15
    voiceWorkflowQuality: number; // 20
    errorRecoveryClarifying: number; // 10
    accessibilityFeatures: number; // 10
  };
  cps: {
    socraticDepth: number; // 25
    strategicStructuring: number; // 25
    adaptabilityToStyle: number; // 20
    decisionSupport: number; // 20
    consistencyDeterminism: number; // 10
  };
  overall: {
    dasWeight: number; // 0.4
    cpsWeight: number; // 0.4
    dalWeight: number; // 0.2
  };
}

export const DEFAULT_RUBRIC_WEIGHTS: RubricWeights = {
  version: "v0.3",
  das: {
    readabilityStructure: 25,
    instructionFollowing: 20,
    hallucinationResistance: 15,
    voiceWorkflowQuality: 20,
    errorRecoveryClarifying: 10,
    accessibilityFeatures: 10,
  },
  cps: {
    socraticDepth: 25,
    strategicStructuring: 25,
    adaptabilityToStyle: 20,
    decisionSupport: 20,
    consistencyDeterminism: 10,
  },
  overall: {
    dasWeight: 0.4,
    cpsWeight: 0.4,
    dalWeight: 0.2,
  },
};
