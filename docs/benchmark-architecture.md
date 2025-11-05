# Dyslexic AI Benchmark Architecture v2.0

## Executive Summary

This architecture extends the existing 4-dimension leaderboard benchmark into a production-ready, continuously-updated system using a 4-agent orchestrator while preserving the original foundation.

## Design Philosophy

**PRESERVE**: The original 4 core dimensions remain the primary user-facing score
**EXTEND**: Add 9 supplementary dimensions for comprehensive DAS (Dyslexic Accessibility Score)
**AUTOMATE**: Replace manual testing with continuous agent-driven evaluation
**EVIDENCE**: All scores backed by captured evidence and multi-rater agreement

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Existing)                       │
│  Leaderboard │ NeuroScore │ Tool Details │ Methodology     │
└─────────────────────────┬───────────────────────────────────┘
                          │
                    ┌─────▼─────┐
                    │ Dashboard │
                    │    API    │
                    └─────┬─────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│              Benchmark Orchestrator (NEW)                    │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ WATCHER  │→ │  RUNNER  │→ │  JUDGE   │→ │PUBLISHER │  │
│  │          │  │          │  │          │  │          │  │
│  │ Detects  │  │ Executes │  │ Scores   │  │ Computes │  │
│  │ updates  │  │ tests +  │  │ with 3   │  │ DAS +    │  │
│  │          │  │ evidence │  │ raters   │  │ badges   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                              │
└──────────────────────────────┬───────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Evidence Storage   │
                    │  (JSON + Artifacts) │
                    └─────────────────────┘
```

## Dual Scoring System

### Core Score (User-Facing Primary)
**Display**: "Neurodivergent Support Score" (average of 4 dimensions)
- Lateral Thinking (1-10)
- Linear Thinking (1-10)
- Language Adaptability (1-10)
- Neurodivergent Awareness (1-10)

**Purpose**: Simple, understandable ranking for users choosing AI tools

### DAS - Dyslexic Accessibility Score (Comprehensive)
**Display**: Badge-enhanced detail view with 13 dimensions
- 4 Core Dimensions (weighted 12% each = 48% total)
- Core Accessibility WCAG/EN 301549 (20 points, 12% weight)
- Modality & I/O (10 points, 8% weight)
- Cognitive Load (8 points, 6% weight)
- Personalization (6 points, 5% weight)
- Privacy/Data (6 points, 5% weight)
- Cost Transparency (4 points, 4% weight)
- Sustainability (3 points, 2% weight)
- Update Velocity (3 points, 2% weight)
- Agentic Support (4 points, 2% weight)

**Purpose**: Deep analysis for power users, researchers, and certification

## Data Flow

### 1. WATCHER Agent (Passive Monitoring)
```typescript
// Monitors for tool updates
WatcherEvent → {
  tool_id: "claude_sonnet"
  version_hint: "4.0"
  trigger: "rss|github|status|manual"
  evidence: ["url1", "url2"]
  action: "enqueue_run"
}
```

**Triggers**:
- RSS feeds from AI vendors
- GitHub release notifications
- Status page changes
- Manual user submissions

**Rule**: Require 2 independent signals before enqueueing

### 2. RUNNER Agent (Test Execution)
```typescript
// Executes tests and platform checks
RunRequest → RUNNER → RunResult {
  run_id: "uuid"
  tool_id: "claude_sonnet"
  tool_version: "4.0"
  started_at: "2025-11-05T10:00:00Z"
  finished_at: "2025-11-05T10:15:00Z"
  items: [
    {
      type: "test"
      id: "test_lateral"
      input: { prompt: "I want to build something..." }
      output: { text: "Great! Let's explore...", blob_uri: "/evidence/run123/lateral.json" }
      latency_ms: 2340
      tokens_used: 450
      cost_estimate_usd: 0.0023
      evidence: ["/evidence/run123/lateral.json", "/evidence/run123/lateral_screenshot.png"]
    },
    // ... more items
  ]
}
```

**Responsibilities**:
- Execute 4 core MVP tests (existing prompts)
- Execute platform checks (WCAG, keyboard nav, reader mode, etc.)
- Capture output text, screenshots, API responses
- Record latency, tokens, cost estimates
- Save evidence to structured storage

### 3. JUDGE Agent (Multi-Rater Scoring)
```typescript
// Scores with 3 independent raters
JudgeRequest → JUDGE → JudgeResult {
  run_id: "uuid"
  tool_id: "claude_sonnet"
  tool_version: "4.0"
  scored: [
    {
      id: "test_lateral"
      dimension_key: "lateral_thinking"
      scores: [
        { score: 9, notes: "Asks clarifying questions, explores tangents", evidence_flags: ["questions_first", "creative_connections"] },
        { score: 9, notes: "Strong exploration, avoids premature structure", evidence_flags: ["questions_first", "no_assumptions"] },
        { score: 8, notes: "Good questioning, could explore more", evidence_flags: ["questions_first"] }
      ]
      final: { raw_score: 8.67, agreement: 0.92 }  // High agreement
    },
    // ... more scored items
  ]
  coverage: { tested: 17, total: 17 }
}
```

**Process**:
- 3 independent LLM raters (different models or temperature settings)
- Each rater uses identical rubric
- Compute mean score + agreement metric (Krippendorff alpha proxy)
- Flag evidence patterns for badge assignment

### 4. PUBLISHER Agent (DAS Calculation & Badges)
```typescript
// Computes final DAS and assigns badges
PublishInput → PUBLISHER → PublishOutput {
  aggregate: {
    tool_id: "claude_sonnet"
    tool_version: "4.0"
    DAS: 87.3
    confidence: 0.89
    dimension_breakdown: [
      { dimension_key: "lateral_thinking", raw: 8.67, normalized: 0.867, weight: 0.12 },
      { dimension_key: "core_accessibility", raw: 18, normalized: 0.90, weight: 0.12 },
      // ... more dimensions
    ]
    badges: [
      "plain_language_default",
      "voice_first",
      "privacy_guard",
      "cost_clear"
    ]
  }
  diff_summary: "DAS improved from 84.2 to 87.3 (+3.1). New 'voice_first' badge earned."
}
```

**Badge Logic**:
- `plain_language_default`: Language Adaptability ≥ 8/10 AND "chunking" in evidence
- `voice_first`: Modality & I/O ≥ 8/10 AND "voice_tts_stt" in evidence
- `reader_view`: Cognitive Load ≥ 6/8 AND "reader_mode" in evidence
- `privacy_guard`: Privacy/Data ≥ 5/6
- `cost_clear`: Cost Transparency ≥ 3/4
- `green_disclosure`: Sustainability ≥ 2/3
- `agent_ready`: Agentic Support ≥ 3/4

## File Structure

```
dyslexic-ai-project/
├── frontend/                          # Existing React app
│   ├── src/
│   │   ├── data/
│   │   │   └── aiTools.ts            # UPDATED: Add DAS scores, badges
│   │   ├── types/
│   │   │   └── leaderboard.ts        # UPDATED: Add DAS fields
│   │   ├── components/
│   │   │   ├── NeuroScore.tsx        # UPDATED: Show badges
│   │   │   └── BadgeDisplay.tsx      # NEW: Badge visualization
│   │   └── pages/
│   │       └── Leaderboard.tsx       # UPDATED: DAS toggle
│
├── benchmark/                         # NEW: Orchestrator system
│   ├── orchestrator/
│   │   ├── coordinator.ts            # Main orchestration loop
│   │   ├── config.ts                 # Dimensions, weights, test specs
│   │   └── schemas.ts                # All TypeScript schemas
│   │
│   ├── agents/
│   │   ├── watcher/
│   │   │   ├── index.ts              # WATCHER agent
│   │   │   ├── rss-monitor.ts
│   │   │   ├── github-monitor.ts
│   │   │   └── status-monitor.ts
│   │   │
│   │   ├── runner/
│   │   │   ├── index.ts              # RUNNER agent
│   │   │   ├── test-executor.ts      # LLM test execution
│   │   │   ├── platform-checker.ts   # UI/platform checks
│   │   │   └── evidence-capture.ts   # Screenshot, JSON, etc.
│   │   │
│   │   ├── judge/
│   │   │   ├── index.ts              # JUDGE agent
│   │   │   ├── multi-rater.ts        # 3-rater scoring
│   │   │   └── agreement.ts          # Agreement metrics
│   │   │
│   │   └── publisher/
│   │       ├── index.ts              # PUBLISHER agent
│   │       ├── das-calculator.ts     # DAS formula
│   │       ├── badge-assigner.ts     # Badge logic
│   │       └── diff-generator.ts     # Change summaries
│   │
│   ├── tests/
│   │   ├── mvp-tests.ts              # 4 core tests (existing prompts)
│   │   └── platform-checks.ts        # WCAG, keyboard, voice, etc.
│   │
│   ├── storage/
│   │   ├── evidence/                 # Evidence artifacts
│   │   └── results/                  # JSON results
│   │
│   └── cli/
│       └── benchmark.ts              # CLI: npm run benchmark
│
├── docs/
│   ├── benchmark-architecture.md     # This file
│   ├── scoring-methodology.md        # Detailed rubrics
│   └── api-contracts.md              # Schema reference
│
└── package.json                       # Add benchmark scripts
```

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create TypeScript schemas for all data contracts
- [ ] Implement configuration system (dimensions, weights, tests)
- [ ] Create evidence storage structure
- [ ] Build RUNNER agent (basic test execution)
- [ ] Build JUDGE agent (single rater, manual scoring)

### Phase 2: Orchestration (Week 2)
- [ ] Implement orchestration coordinator
- [ ] Add multi-rater support to JUDGE (3 raters)
- [ ] Build PUBLISHER agent (DAS calculation)
- [ ] Integrate with existing leaderboard data
- [ ] Create CLI interface

### Phase 3: Automation (Week 3)
- [ ] Implement WATCHER agent (manual triggers first)
- [ ] Add RSS/GitHub monitoring
- [ ] Implement badge assignment logic
- [ ] Add confidence metrics
- [ ] Create diff summaries

### Phase 4: UI Integration (Week 4)
- [ ] Update leaderboard to show DAS scores
- [ ] Create badge display components
- [ ] Add evidence viewer
- [ ] Implement toggle between Core Score and DAS
- [ ] Update methodology page

### Phase 5: Production Hardening (Week 5)
- [ ] Add comprehensive error handling
- [ ] Implement retry logic with exponential backoff
- [ ] Add rate limiting
- [ ] Create monitoring/logging
- [ ] Write test suite
- [ ] Documentation

## Migration Strategy

### Backward Compatibility
1. Keep existing `aiTools.ts` structure
2. Add optional DAS fields: `dasScore?: number`, `badges?: string[]`, `confidence?: number`
3. Leaderboard defaults to Core Score view
4. DAS view available via toggle

### Data Migration
```typescript
// Before (existing)
{
  name: "Claude",
  scores: {
    lateralThinking: 9,
    linearThinking: 9,
    languageAdaptability: 9,
    neurodivergentAwareness: 8
  },
  overallScore: 8.8
}

// After (extended)
{
  name: "Claude",
  scores: {
    lateralThinking: 9,      // Core dimension
    linearThinking: 9,       // Core dimension
    languageAdaptability: 9, // Core dimension
    neurodivergentAwareness: 8, // Core dimension
    coreAccessibility: 18,   // NEW: WCAG/EN 301549
    modalityIO: 9,           // NEW: Voice, keyboard, etc.
    cognitiveLoad: 7,        // NEW: Chunking, reader mode
    personalization: 5,      // NEW: Customization
    privacyData: 5,          // NEW: Privacy defaults
    costTransparency: 3,     // NEW: Pricing clarity
    sustainability: 2,       // NEW: Green disclosure
    updateVelocity: 3,       // NEW: Release cadence
    agenticSupport: 4        // NEW: API, automation
  },
  overallScore: 8.8,         // Core Score (unchanged)
  dasScore: 87.3,            // NEW: Comprehensive DAS
  confidence: 0.89,          // NEW: Scoring confidence
  badges: [                  // NEW: Earned badges
    "plain_language_default",
    "voice_first",
    "privacy_guard"
  ],
  lastBenchmarked: "2025-11-05T10:00:00Z", // NEW: Timestamp
  evidence: {                // NEW: Evidence index
    runId: "uuid",
    evidenceDir: "/evidence/uuid/"
  }
}
```

## Environment Configuration

```bash
# .env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
DASHBOARD_API=http://localhost:3000/api
STORAGE_BASE=./benchmark/storage
GITHUB_TOKEN=ghp_optional_for_rate_limits

# Orchestrator config
JUDGE_MODEL_PRIMARY=claude-3-7-sonnet-20250219
JUDGE_MODEL_SECONDARY=gpt-4-turbo
JUDGE_MODEL_TERTIARY=gemini-pro
RUNNER_RATE_LIMIT_PER_MIN=30
RUNNER_TIMEOUT_MS=60000
WATCHER_CHECK_INTERVAL_HOURS=6
```

## API Contracts

See `docs/api-contracts.md` for complete schema reference.

## Success Metrics

**Robustness**:
- [ ] All agent outputs validate against schemas
- [ ] 95%+ test success rate
- [ ] <5% variance in multi-rater agreement

**Production Readiness**:
- [ ] Error handling for all failure modes
- [ ] Rate limiting prevents API abuse
- [ ] Evidence stored for every score
- [ ] Automated CI/CD pipeline

**User Value**:
- [ ] Core Score remains simple and understandable
- [ ] DAS provides deep insights for power users
- [ ] Badges highlight key strengths
- [ ] Evidence builds trust

## Open Questions for User

1. **Backend**: Do you want to add a backend (Node.js/Express) or keep frontend-only with localStorage?
2. **Database**: Supabase, Firebase, or JSON file storage for results?
3. **LLM Access**: How will RUNNER access AI tools? (API keys, Playwright for UI, both?)
4. **Deployment**: Where will orchestrator run? (GitHub Actions, cron job, cloud function?)
5. **WATCHER Priority**: Start with manual triggers or implement RSS/GitHub monitoring first?

## Next Steps

Based on your feedback, I'll begin implementation. Recommended starting point:

**Option A (Backend-First)**: Build orchestrator as separate Node.js service
**Option B (Frontend-First)**: Extend existing React app with CLI tool
**Option C (Hybrid)**: CLI tool generates JSON, frontend consumes it

Which approach aligns best with your vision?
