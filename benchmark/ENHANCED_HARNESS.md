# Dyslexic AI Benchmark - Enhanced Internal Harness

**Status:** Phase 1 Foundation Complete ✅

This document describes the comprehensive internal evaluation harness for the Dyslexic AI Benchmark, featuring multi-dimensional scoring (DAS, CPS, DAL, Overall) and role-based public scorecards.

## Overview

The enhanced benchmark system evaluates AI models across four scoring dimensions:

1. **DAS** (Dyslexic Accessibility Score, 0-100) - How well models support dyslexic users
2. **CPS** (Cognitive Partner Score, 0-100) - How well models act as thinking partners
3. **DAL** (Dyslexic AI Lens, 0-100) - Proprietary composite for dyslexic-specific quality
4. **Overall** - Composite score: `0.4*DAS + 0.4*CPS + 0.2*DAL`
5. **Operational Index** - Normalized latency and cost metrics (tracked separately)

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    INTERNAL HARNESS                          │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │ Test Suites  │ -> │   Metrics    │ -> │ Aggregation  │ │
│  │              │    │              │    │              │ │
│  │ - DAS Tests  │    │ - 20+ funcs  │    │ - DAS/CPS    │ │
│  │ - CPS Tests  │    │ - Deterministic│  │ - DAL/Overall│ │
│  │ - DAL Tests  │    │ - Lightweight│    │ - Badges     │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│                                                              │
│                           ↓                                  │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │  Redaction   │ -> │ Public JSON  │ -> │ Role Cards   │ │
│  │              │    │              │    │              │ │
│  │ - Strip PII  │    │ - Snapshots  │    │ - Educator   │ │
│  │ - Anonymize  │    │ - CSV Export │    │ - Coach      │ │
│  │ - Minimize   │    │ - Versioned  │    │ - Learner    │ │
│  └──────────────┘    └──────────────┘    │ - Developer  │ │
│                                          └──────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## What's Built (Phase 1)

### ✅ Core Infrastructure

1. **Enhanced Database Schema** (`schema/prisma.schema`)
   - Models, Runs, Tasks, Scores, Artifacts
   - Snapshots, Research Correlations
   - SQLite primary, Supabase-ready

2. **Type System** (`schema/types.ts`)
   - DASScore, CPSScore, DALScore, OverallScore
   - ModelAdapter interface
   - TaskDefinition, SuiteDefinition
   - PublicSnapshot, RoleScorecard
   - Complete type safety

3. **Comprehensive Metrics** (`runners/metrics.ts`)
   - 15+ deterministic metric functions
   - DAS metrics: readability, format obedience, hallucination penalty
   - CPS metrics: Socratic depth, strategic structuring, decision support
   - DAL metrics: L2L index, voice loop score, consistency
   - Operational: latency/cost normalization

4. **Score Aggregation** (`runners/scoreAggregation.ts`)
   - Aggregates metrics into DAS/CPS/DAL/Overall
   - Weighted scoring per rubric v0.3
   - Badge assignment (8 badges)
   - Metric-to-dimension mapping

5. **External Benchmark Mappings** (`benchmarks/external.json`)
   - WCAG 2.2 compliance mapping
   - WAI-ARIA semantics
   - PlainLanguage.gov guidelines
   - BDA Style Guide
   - ISO/IEC 30071-1
   - Microsoft Inclusive Design

### ✅ Phase 2: Model Adapters & Runner (COMPLETE)

6. **Model Adapters** (`adapters/`)
   - OpenAI adapter with GPT-4, GPT-4 Turbo, GPT-3.5 support
   - Anthropic adapter with Claude 3 Opus, Sonnet, Haiku support
   - Google adapter with Gemini Pro, 1.5 Pro, 1.5 Flash support
   - Local/mock adapter with 4 behavior presets (helpful, terse, verbose, error-prone)
   - Adapter registry with factory pattern

7. **Model Registry** (`services/modelRegistry.ts`)
   - Comprehensive model metadata for all supported models
   - Capabilities tracking (vision, function calling, context window)
   - Pricing information per model
   - Query functions by provider, family, tag

8. **Cost Table Service** (`services/costTable.ts`)
   - Accurate cost calculation for all models
   - Cost estimation and comparison utilities
   - Bulk cost calculation
   - Benchmark suite cost estimation

9. **Evaluation Suite Runner** (`runners/executeSuite.ts`)
   - Execute complete test suites with any adapter
   - Rate limiting and retry logic
   - Fixture loading support
   - Comparison mode (multiple models on same suite)
   - Cost and token tracking

### ✅ Phase 3: Test Suites & Fixtures (COMPLETE)

10. **DAS Readability Suite** (`suites/DAS_v1_readability.json`)
    - 12 comprehensive readability and structure tests
    - Tests plain language, formatting, organization, consistency
    - Includes L2L (loose-to-linear) transformation tasks

11. **DAS Voice Suite** (`suites/DAS_v1_voice.json`)
    - 10 voice workflow quality tests
    - Tests conversational flow, clarifying questions, multi-turn dialogue
    - Error recovery and correction handling

12. **CPS Socratic Suite** (`suites/CPS_v1_socratic.json`)
    - 12 Socratic thinking partnership tests
    - Tests depth of questioning, decision support, reframing
    - Strategic structuring and values elicitation

13. **DAL Processing Suite** (`suites/DAL_v1_processing.json`)
    - 12 cognitive load and processing ease tests
    - Tests L2L transformation, sequential memory, chunking
    - Voice-first workflows and working memory support

14. **Test Fixtures** (`suites/fixtures/`)
    - ramble01.txt - Stream-of-consciousness student notes
    - ramble02.txt - Unstructured meeting notes
    - email_outline_ref.json - Email formatting reference

15. **Suite Runner CLI** (`cli/runSuite.ts`)
    - Run individual suites on any model
    - Compare multiple models side-by-side
    - Cost estimation before running
    - List available suites and models

## What's Next (Phase 4-5)

### 📋 Phase 4: Public Layer

- [ ] `runners/redaction.ts` - PII stripping, anonymization
- [ ] `services/publishSnapshot.ts` - Generate public JSON/CSV
- [ ] `services/externalBenchmarks.ts` - Load & annotate mappings
- [ ] Role scorecard generation (educator, coach, learner, developer)
- [ ] `/public/benchmarks/` - Generated snapshots
- [ ] `/public/scorecards/` - Role-specific cards

### 📋 Phase 5: CLI & UI

- [ ] `cli/runSuite.ts` - CLI for running benchmarks
- [ ] `cli/publish.ts` - CLI for publishing snapshots
- [ ] Frontend hooks:
  - `useBenchmarkRuns.ts`
  - `usePublicSnapshot.ts`
  - `useRoleScorecards.ts`
- [ ] UI Components (matching existing dark theme):
  - `ModelLeaderboard.tsx`
  - `ScoreBreakdownCard.tsx`
  - `SnapshotChangelog.tsx`
  - `RoleScorecardGrid.tsx`

## Scoring Formulas

### DAS (0-100)
```
DAS =
  Readability & Structure (25) +
  Instruction Following (20) +
  Hallucination Resistance (15) +
  Voice Workflow Quality (20) +
  Error Recovery (10) +
  Accessibility Features (10)
```

### CPS (0-100)
```
CPS =
  Socratic Depth (25) +
  Strategic Structuring (25) +
  Adaptability to Style (20) +
  Decision Support (20) +
  Consistency (10)
```

### DAL (0-100)
```
DAL =
  Language Processing Ease (25%) +
  Sequential Memory Support (25%) +
  Lateral→Linear Support (20%) +
  Voice-First Interaction (20%) +
  Cognitive Fatigue Reduction (10%)
```

### Overall (0-100)
```
Overall = 0.4*DAS + 0.4*CPS + 0.2*DAL
```

Operational Index tracked separately (not in composite).

## Badge System

Badges automatically assigned based on scores:

| Badge | Criteria | Description |
|-------|----------|-------------|
| Voice-First | DAS.voice ≥ 80 | Excellent voice interaction |
| Easy to Read | DAS.readability ≥ 80 | High readability with structure |
| Thinking Partner | CPS.socratic ≥ 80 | Strong Socratic questioning |
| Strategic | CPS.structuring ≥ 80 | Planning & prioritization |
| Reliable | CPS.consistency ≥ 80 | Consistent outputs |
| Cost-Effective | Operational.cost ≥ 70 | Good price/performance |
| Fast | Operational.latency ≥ 70 | Low latency |
| Dyslexic-Optimized | DAL ≥ 85 | Comprehensive support |

## External Standards Integration

The system maps internal metrics to:

- **WCAG 2.2** - Web accessibility compliance
- **WAI-ARIA** - Semantic HTML standards
- **PlainLanguage.gov** - Federal readability guidelines
- **BDA Style Guide** - Dyslexia-specific recommendations
- **ISO 30071-1** - Accessibility management
- **Microsoft Inclusive Design** - Persona-based design

See `benchmarks/external.json` for complete mappings.

## Role-Based Scorecards

Public scorecards tailored to four user roles:

### Educator
- **Emphasis**: DAS + DAL
- **Features**: Multi-format readiness, captions, alt-text
- **Standards**: WCAG compliance, BDA Style Guide

### Coach/Consultant
- **Emphasis**: CPS + DAL
- **Features**: Meeting-ready outputs, client communication clarity
- **Standards**: Microsoft Inclusive Design

### Learner/Professional
- **Emphasis**: Readability, Voice-First, Cognitive Fatigue
- **Features**: Easy to understand, voice interaction, low complexity
- **Standards**: PlainLanguage.gov, BDA Style Guide

### Developer
- **Emphasis**: API integration, semantics
- **Features**: WAI-ARIA support, WCAG compliance, automation
- **Standards**: WCAG 2.2, WAI-ARIA, ISO 30071-1

## Privacy & Redaction

All public snapshots undergo strict redaction:

- ❌ Strip: Prompts, fixture text, user-origin text >100 chars, audio URIs
- ✅ Keep: Metrics, scores, normalized badges, short notes
- 🔒 Enforce: No PII, GDPR-style minimization

## Research Correlations

The system tracks anonymized correlations for research:

- Model family characteristics
- Tokenizer/context effects
- Dyslexic error tolerance
- Hallucination under noisy inputs
- Comprehension accuracy vs error-laden prompts

Data stored in `research_correlations` table and `/data/research/correlations.json`.

## Database Schema

```
Models → Runs → Scores
                  ↓
              Artifacts

Runs → Snapshots (public)

Models → ResearchCorrelations
```

**Supports**: SQLite (default) and Supabase (with env var)

## Quick Start (When Complete)

```bash
# Install dependencies
pnpm install

# Run database migrations
pnpm prisma migrate dev

# Run a benchmark suite
pnpm benchmark:run --suite DAS_v1_readability --eval v0.3 --models "local:mock-1"

# Publish public snapshots
pnpm benchmark:publish --eval v0.3 --roles "educator,coach,learner,developer"

# View results in UI
pnpm dev
# Navigate to /benchmark page
```

## File Structure

```
benchmark/
├── schema/
│   ├── prisma.schema        ✅ Database schema
│   ├── types.ts            ✅ TypeScript interfaces
│   └── db.ts               🚧 Database adapter
├── adapters/
│   ├── openai.ts           ✅ OpenAI adapter
│   ├── anthropic.ts        ✅ Anthropic adapter
│   ├── google.ts           ✅ Google adapter
│   ├── local.ts            ✅ Local/mock adapter
│   └── index.ts            ✅ Adapter registry
├── runners/
│   ├── metrics.ts          ✅ 15+ metric functions
│   ├── scoreAggregation.ts ✅ DAS/CPS/DAL/Overall
│   ├── executeSuite.ts     ✅ Main runner
│   └── redaction.ts        🚧 Privacy layer
├── services/
│   ├── modelRegistry.ts    ✅ Model config
│   ├── costTable.ts        ✅ Pricing data
│   ├── publishSnapshot.ts  🚧 Public JSON/CSV
│   ├── stability.ts        🚧 Consistency tests
│   └── externalBenchmarks.ts 🚧 Standards mapping
├── suites/
│   ├── DAS_v1_readability.json ✅ Test suite (12 tasks)
│   ├── DAS_v1_voice.json      ✅ Test suite (10 tasks)
│   ├── CPS_v1_socratic.json   ✅ Test suite (12 tasks)
│   ├── DAL_v1_processing.json ✅ Test suite (12 tasks)
│   └── fixtures/              ✅ Test data (3 fixtures)
│       ├── ramble01.txt       ✅ Student notes
│       ├── ramble02.txt       ✅ Meeting notes
│       └── email_outline_ref.json ✅ Email reference
├── cli/
│   ├── runSuite.ts         ✅ CLI runner
│   └── publish.ts          🚧 CLI publisher
└── rubrics/
    ├── eval_v0_3.weights.json 🚧 Rubric weights
    └── README.md             🚧 Change log

benchmarks/
└── external.json           ✅ Standards mapping

frontend/
└── hooks/
    ├── useBenchmarkRuns.ts   🚧 React hook
    ├── usePublicSnapshot.ts  🚧 React hook
    └── useRoleScorecards.ts  🚧 React hook
```

Legend: ✅ Complete | 🚧 To Do

## Technical Notes

- **Language**: TypeScript, strict mode, no `any`
- **Runtime**: Node 18+
- **Database**: Prisma (SQLite primary, Supabase fallback)
- **Lint**: ESLint + Prettier
- **Tests**: Unit tests for all metrics (deterministic)

## Acceptance Criteria

- [x] Metrics: deterministic unit tests
- [ ] Runner: executes demo tasks against local adapter
- [ ] Redaction: ensures no prompts/fixtures leak
- [ ] Publisher: validates presence of role scorecards
- [ ] Frontend: leaderboard displays all 4 scores
- [ ] CLI: runs suites and publishes snapshots

## Next Steps

1. **Implement Model Adapters** - OpenAI, Anthropic, Google, Local
2. **Create Test Suites** - DAS, CPS tasks with fixtures
3. **Build Evaluation Runner** - Execute suites, save results
4. **Add Public Layer** - Redaction, snapshots, role cards
5. **Create UI Components** - Match existing dark theme design
6. **Write CLI Tools** - `runSuite.ts`, `publish.ts`
7. **Add Unit Tests** - Test all metrics and aggregations
8. **Documentation** - Usage guides, rubric changelog

## Contributing

When adding new metrics:
1. Implement in `runners/metrics.ts`
2. Add to `runMetrics()` switch
3. Map to dimension in `scoreAggregation.ts`
4. Add unit test
5. Document in this README

When adding new suites:
1. Create JSON in `suites/`
2. Add fixtures in `suites/fixtures/`
3. Update `eval_version`
4. Document rubric changes

## License

Part of the Dyslexic AI project - By neurodivergent people, for neurodivergent people.
