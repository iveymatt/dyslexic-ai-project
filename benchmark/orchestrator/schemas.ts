/**
 * TypeScript schemas for Dyslexic AI Benchmark Orchestrator
 * All agent outputs MUST be valid JSON matching these schemas
 */

// ============================================================================
// ENUMS
// ============================================================================

export enum Category {
  LLM = "LLM",
  Frontend = "Frontend",
  App = "App",
  Other = "Other",
}

export enum BadgeType {
  PlainLanguageDefault = "plain_language_default",
  VoiceFirst = "voice_first",
  ReaderView = "reader_view",
  PrivacyGuard = "privacy_guard",
  CostClear = "cost_clear",
  GreenDisclosure = "green_disclosure",
  AgentReady = "agent_ready",
}

export enum WatcherTrigger {
  RSS = "rss",
  GitHub = "github",
  Status = "status",
  Manual = "manual",
}

// ============================================================================
// TOOL SCHEMAS
// ============================================================================

export interface ToolInfo {
  toolId: string;
  name: string;
  vendor: string;
  category: Category;
  site?: string;
  tags: string[];
}

export interface ToolVersionInfo {
  version: string;
  releasedAt?: string; // ISO8601
  notes?: string;
}

// ============================================================================
// TEST & PLATFORM CHECK SPECS
// ============================================================================

export interface TestSpec {
  testId: string; // e.g., "test_lateral"
  dimensionKey: string; // e.g., "lateral_thinking"
  prompt: string;
  maxPoints: number;
  rubric: string;
}

export interface PlatformCheckSpec {
  checkId: string; // e.g., "wcag_contrast"
  dimensionKey: string; // e.g., "core_accessibility"
  command: string; // e.g., "playwright:contrast_audit"
  maxPoints: number;
  rubric: string;
}

// ============================================================================
// WATCHER AGENT
// ============================================================================

export interface WatcherEvent {
  toolId: string;
  versionHint: string;
  trigger: WatcherTrigger;
  evidence: string[]; // URLs or file paths
  action: "enqueue_run";
}

// ============================================================================
// RUNNER AGENT
// ============================================================================

export interface RunnerConfig {
  rateLimitPerMin: number;
  timeoutMs: number;
}

export interface RunRequest {
  tool: ToolInfo;
  version: ToolVersionInfo;
  tests: TestSpec[];
  platformChecks: PlatformCheckSpec[];
  evidenceDir: string; // e.g., "/evidence/<run_id>/"
  runId: string; // uuid-like
  runnerConfig: RunnerConfig;
}

export interface RunItemInput {
  prompt?: string;
  command?: string;
}

export interface RunItemOutput {
  text?: string;
  blobUri?: string;
}

export interface RunItem {
  type: "test" | "platform_check";
  id: string; // testId or checkId
  input: RunItemInput;
  output: RunItemOutput;
  latencyMs?: number;
  tokensUsed?: number;
  costEstimateUsd?: number;
  evidence: string[]; // URIs to evidence files
}

export interface RunResult {
  runId: string;
  toolId: string;
  toolVersion: string;
  startedAt: string; // ISO8601
  finishedAt: string; // ISO8601
  items: RunItem[];
}

// ============================================================================
// JUDGE AGENT
// ============================================================================

export interface JudgeItemEvidence {
  outputText?: string;
  evidenceUris: string[];
  metadata?: Record<string, unknown>;
}

export interface JudgeItem {
  dimensionKey: string;
  id: string; // testId or checkId
  maxPoints: number;
  rubric: string;
  evidence: JudgeItemEvidence;
}

export interface JudgeRequest {
  runId: string;
  toolId: string;
  toolVersion: string;
  items: JudgeItem[];
  numRaters: number; // typically 3
}

export interface RaterScore {
  score: number;
  notes: string;
  evidenceFlags: string[]; // e.g., ["chunking", "plain_language"]
}

export interface JudgeFinalScore {
  rawScore: number; // mean of rater scores
  agreement: number; // 0..1, agreement metric (e.g., from stddev)
}

export interface ScoredItem {
  id: string;
  dimensionKey: string;
  scores: RaterScore[]; // one per rater
  final: JudgeFinalScore;
}

export interface JudgeResult {
  runId: string;
  toolId: string;
  toolVersion: string;
  scored: ScoredItem[];
  coverage: {
    tested: number;
    total: number;
  };
}

// ============================================================================
// PUBLISHER AGENT
// ============================================================================

export interface DimensionScore {
  dimensionKey: string;
  raw: number;
}

export interface PreviousScore {
  das?: number;
  dimensionScores?: DimensionScore[];
}

export interface PublishInput {
  toolId: string;
  toolVersion: string;
  dimensionScores: DimensionScore[];
  confidence: number; // 0..1
  evidenceIndex: Array<{
    id: string;
    uris: string[];
  }>;
  previous?: PreviousScore;
}

export interface DimensionBreakdown {
  dimensionKey: string;
  raw: number;
  normalized: number; // raw / max
  weight: number;
}

export interface AggregateResult {
  toolId: string;
  toolVersion: string;
  das: number; // 0-100
  confidence: number; // 0..1
  dimensionBreakdown: DimensionBreakdown[];
  badges: BadgeType[];
}

export interface PublishOutput {
  aggregate: AggregateResult;
  diffSummary: string;
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export enum ErrorStage {
  WATCHER = "WATCHER",
  RUNNER = "RUNNER",
  JUDGE = "JUDGE",
  PUBLISHER = "PUBLISHER",
  COORDINATOR = "COORDINATOR",
}

export interface OrchestrationError {
  error: {
    stage: ErrorStage;
    message: string;
    recoverable: boolean;
    details?: Record<string, unknown>;
  };
}

// ============================================================================
// ORCHESTRATION FLOW
// ============================================================================

export interface OrchestrationState {
  runId: string;
  stage: "watcher" | "runner" | "judge" | "publisher" | "completed" | "failed";
  watcherEvent?: WatcherEvent;
  runRequest?: RunRequest;
  runResult?: RunResult;
  judgeRequest?: JudgeRequest;
  judgeResult?: JudgeResult;
  publishInput?: PublishInput;
  publishOutput?: PublishOutput;
  error?: OrchestrationError;
  startedAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Type guard for validating WatcherEvent
 */
export function isWatcherEvent(obj: unknown): obj is WatcherEvent {
  const e = obj as WatcherEvent;
  return (
    typeof e.toolId === "string" &&
    typeof e.versionHint === "string" &&
    Object.values(WatcherTrigger).includes(e.trigger) &&
    Array.isArray(e.evidence) &&
    e.action === "enqueue_run"
  );
}

/**
 * Type guard for validating RunResult
 */
export function isRunResult(obj: unknown): obj is RunResult {
  const r = obj as RunResult;
  return (
    typeof r.runId === "string" &&
    typeof r.toolId === "string" &&
    typeof r.toolVersion === "string" &&
    typeof r.startedAt === "string" &&
    typeof r.finishedAt === "string" &&
    Array.isArray(r.items)
  );
}

/**
 * Type guard for validating JudgeResult
 */
export function isJudgeResult(obj: unknown): obj is JudgeResult {
  const j = obj as JudgeResult;
  return (
    typeof j.runId === "string" &&
    typeof j.toolId === "string" &&
    typeof j.toolVersion === "string" &&
    Array.isArray(j.scored) &&
    typeof j.coverage === "object" &&
    typeof j.coverage.tested === "number" &&
    typeof j.coverage.total === "number"
  );
}

/**
 * Type guard for validating PublishOutput
 */
export function isPublishOutput(obj: unknown): obj is PublishOutput {
  const p = obj as PublishOutput;
  return (
    typeof p.aggregate === "object" &&
    typeof p.aggregate.das === "number" &&
    typeof p.aggregate.confidence === "number" &&
    Array.isArray(p.aggregate.badges) &&
    typeof p.diffSummary === "string"
  );
}
