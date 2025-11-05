# Dyslexic AI Benchmark v2.0

Production-ready benchmark system for evaluating AI tools through a neurodivergent-first lens.

## Overview

The Dyslexic AI Benchmark is the **ONLY** AI benchmark that measures how well tools support neurodivergent thinking. It goes beyond traditional metrics (speed, accuracy) to evaluate 13 dimensions of neurodivergent accessibility.

### What Makes This Different

- **Neurodivergent-First**: Designed by and for neurodivergent people
- **Evidence-Based**: All scores backed by captured artifacts
- **Multi-Rater**: 3 independent LLM judges for objectivity
- **Transparent**: Complete rubrics, evidence, and methodology
- **Continuous**: Automated detection of tool updates
- **Comprehensive**: 4 core dimensions + 9 supplementary dimensions

## Architecture

```
WATCHER → RUNNER → JUDGE → PUBLISHER
   ↓         ↓        ↓         ↓
Detect   Execute   Score    Compute
Updates   Tests   w/ 3      DAS +
                 Raters    Badges
```

### The 4 Agents

1. **WATCHER**: Detects tool updates via RSS, GitHub, status pages, manual triggers
2. **RUNNER**: Executes tests and platform checks, captures evidence
3. **JUDGE**: Multi-rater LLM scoring with agreement metrics
4. **PUBLISHER**: Computes DAS, assigns badges, generates diffs

## Scoring System

### Core Score (User-Facing)
Average of 4 core dimensions (1-10 each):
- Lateral Thinking
- Linear Thinking
- Language Adaptability
- Neurodivergent Awareness

### DAS - Dyslexic Accessibility Score
Comprehensive 0-100 score from 13 weighted dimensions:
- 4 Core Dimensions (48% total weight)
- Core Accessibility - WCAG/EN 301549 (12%)
- Modality & I/O (8%)
- Cognitive Load (6%)
- Personalization (5%)
- Privacy & Data (5%)
- Cost Transparency (4%)
- Sustainability (2%)
- Update Velocity (2%)
- Agentic Support (2%)

### Badges
7 badges highlight tool strengths:
- 🗣️ Plain Language Default
- 🎤 Voice First
- 📖 Reader View
- 🔒 Privacy Guard
- 💰 Cost Clear
- 🌱 Green Disclosure
- 🤖 Agent Ready

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/iveymatt/dyslexic-ai-project.git
cd dyslexic-ai-project

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
nano .env

# Initialize database
npm run db:push

# Validate configuration
npm run benchmark:validate
```

## Usage

### Quick Start

```bash
# Run benchmark for Claude Sonnet 4.0
npm run benchmark:run -- \
  --tool-id claude_sonnet \
  --version 4.0

# Or use the full command
npm run benchmark -- run \
  --tool-id claude_sonnet \
  --version 4.0 \
  --evidence "https://anthropic.com/changelog" \
  --raters 3
```

### CLI Commands

```bash
# Run full benchmark
npm run benchmark -- run \
  --tool-id <toolId> \
  --version <version> \
  [--evidence <url>] \
  [--raters <number>] \
  [--rate-limit <number>] \
  [--timeout <ms>]

# Add manual trigger signal (requires 2 signals)
npm run benchmark -- trigger \
  --tool-id <toolId> \
  --version <version> \
  --evidence <url>

# List all dimensions
npm run benchmark -- dimensions

# List MVP tests (core 4)
npm run benchmark -- tests

# List platform checks (supplementary)
npm run benchmark -- checks

# Validate configuration
npm run benchmark -- validate
```

### Example Output

```
============================================================
BENCHMARK COMPLETE
============================================================
DAS Score: 87.3/100
Confidence: 89.2%
Badges: plain_language_default, voice_first, privacy_guard

Dimension Breakdown:
  lateral_thinking: 8.7 (86.7%)
  linear_thinking: 9.0 (90.0%)
  language_adaptability: 9.2 (92.0%)
  neurodivergent_awareness: 8.5 (85.0%)
  core_accessibility: 18.0 (90.0%)
  ...

DAS improved from 84.2 to 87.3 (+3.1). New 'voice_first' badge earned.
============================================================
```

## Configuration

### Environment Variables

See `.env.example` for all options. Key variables:

```bash
# Database (required)
DATABASE_URL="postgresql://user:password@localhost:5432/dyslexic_ai_benchmark"

# Storage (required)
STORAGE_BASE="./benchmark/storage"

# LLM API Keys for JUDGE (required)
ANTHROPIC_API_KEY="sk-ant-..."
OPENAI_API_KEY="sk-..."
GOOGLE_AI_API_KEY="..."

# LLM API Keys for RUNNER (required for tested tools)
CLAUDE_API_KEY="sk-ant-..."
OPENAI_API_KEY="sk-..."
# ... more as needed

# Optional
DASHBOARD_API="http://localhost:3000/api/benchmark"
GITHUB_TOKEN="ghp_..."
```

### Customizing Tests

Edit `benchmark/orchestrator/config.ts` to:
- Add/remove dimensions
- Adjust weights (must sum to 1.0)
- Modify MVP test prompts
- Add platform checks
- Customize badge criteria

## MVP Tests

4 core tests evaluate neurodivergent dimensions:

### 1. Lateral Thinking Test
**Prompt**: "I want to build something but I'm not sure what yet. I like coding and music. What questions should I ask myself?"

**Rubric**: Asks clarifying questions, explores tangents, creative connections, avoids premature structure.

### 2. Linear Thinking Test
**Prompt**: "Help me break down starting a personal website into steps. I get overwhelmed easily."

**Rubric**: Numbered steps, small chunks, realistic time estimates, scan-friendly formatting.

### 3. Language Adaptability Test
**Prompt**: "Explain neural networks to someone with dyslexia who's never heard of it before."

**Rubric**: Plain language, short paragraphs, zero jargon, concrete examples, chunking.

### 4. Neurodivergent Awareness Test
**Prompt**: "I have dyslexia and ADHD. I need help organizing my work."

**Rubric**: Affirming tone, celebrates ND strengths, specific ND strategies, avoids ableism.

## Platform Checks

29 automated checks for supplementary dimensions:
- 5 WCAG checks (contrast, keyboard nav, ARIA, screen reader, zoom)
- 4 modality checks (voice I/O, touch, alternative input)
- 3 cognitive load checks (reader mode, chunking, distraction-free)
- 3 personalization checks (fonts, themes, persistence)
- 3 privacy checks (opt-out, transparency, GDPR)
- 2 cost checks (pricing clarity, usage tracking)
- 2 sustainability checks (carbon disclosure, green hosting)
- 2 update checks (release cadence, changelog)
- 3 agentic checks (API, automation, tool integration)

## Data Storage

All data persisted to PostgreSQL via Prisma:

```
Tool → ToolVersion → Run → RunItem
                           ↓
                       JudgeResult
                           ↓
                       Aggregate (DAS, badges)
```

Evidence artifacts stored on disk:
```
benchmark/storage/
  evidence/
    <run_id>/
      test_lateral_prompt.txt
      test_lateral_response.json
      playwright_wcag_contrast.png
      ...
  states/
    <run_id>.json
```

## Database Management

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio (GUI)
npm run db:studio

# Reset database (DANGER: deletes all data)
npm run db:reset
```

## Development

```bash
# Watch mode (auto-restart on changes)
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Extending the System

### Adding a New Dimension

1. Edit `benchmark/orchestrator/config.ts`
2. Add to `DIMENSIONS` array:
   ```typescript
   {
     key: "my_dimension",
     name: "My Dimension",
     description: "What this measures",
     maxPoints: 10,
     weight: 0.05, // Adjust weights to sum to 1.0
   }
   ```
3. Add tests or checks for the dimension
4. Update Prisma schema if needed
5. Run `npm run benchmark:validate`

### Adding a New Test

1. Edit `benchmark/orchestrator/config.ts`
2. Add to `MVP_TESTS` array:
   ```typescript
   {
     testId: "test_my_test",
     dimensionKey: "my_dimension",
     prompt: "Your test prompt...",
     maxPoints: 10,
     rubric: "Scoring criteria...",
   }
   ```

### Adding a New Platform Check

1. Edit `benchmark/orchestrator/config.ts`
2. Add to `PLATFORM_CHECKS` array:
   ```typescript
   {
     checkId: "my_check",
     dimensionKey: "my_dimension",
     command: "playwright:my_check",
     maxPoints: 5,
     rubric: "Scoring criteria...",
   }
   ```
3. Implement check in `benchmark/agents/runner/index.ts`

### Adding a New Badge

1. Edit `benchmark/orchestrator/schemas.ts`
2. Add to `BadgeType` enum:
   ```typescript
   MyBadge = "my_badge",
   ```
3. Edit `benchmark/orchestrator/config.ts`
4. Add to `BADGE_CRITERIA` array:
   ```typescript
   {
     badge: BadgeType.MyBadge,
     name: "My Badge",
     description: "What this badge means",
     condition: (scores, flags) =>
       (scores.get("my_dimension") ?? 0) >= 8,
   }
   ```

## Integrating with Frontend

The benchmark generates `PublishOutput` that can be consumed by the React frontend:

```typescript
// In frontend/src/data/aiTools.ts
import { PublishOutput } from '../../../benchmark/orchestrator/schemas';

// Convert PublishOutput to AITool
function publishOutputToAITool(output: PublishOutput): AITool {
  const { aggregate } = output;

  return {
    name: aggregate.toolId,
    dasScore: aggregate.das,
    confidence: aggregate.confidence,
    badges: aggregate.badges,
    scores: {
      lateralThinking: getDimensionScore(aggregate, 'lateral_thinking'),
      linearThinking: getDimensionScore(aggregate, 'linear_thinking'),
      languageAdaptability: getDimensionScore(aggregate, 'language_adaptability'),
      neurodivergentAwareness: getDimensionScore(aggregate, 'neurodivergent_awareness'),
      // ... supplementary dimensions
    },
    overallScore: calculateCoreScore(aggregate),
    // ... rest of AITool fields
  };
}
```

## Troubleshooting

### "Missing API keys"
- Check `.env` file has all required keys
- Ensure `.env` is in project root
- Don't commit `.env` to git (use `.env.example`)

### "Database connection failed"
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Run `npm run db:push` to initialize schema

### "Rate limit exceeded"
- Adjust `RUNNER_RATE_LIMIT_PER_MIN` in `.env`
- Add delays between test runs
- Use `--rate-limit` CLI option

### "Evidence directory not found"
- Check `STORAGE_BASE` in `.env`
- Ensure directory is writable
- Create manually: `mkdir -p benchmark/storage/evidence`

### "JUDGE scores invalid"
- Increase `JUDGE_NUM_RATERS` for better agreement
- Check LLM API keys are valid
- Review judge prompts in `benchmark/agents/judge/index.ts`

## Contributing

We welcome contributions! Please:
1. Read `docs/benchmark-architecture.md`
2. Follow neurodivergent-first principles
3. Add tests for new features
4. Update documentation
5. Open a PR with clear description

## License

MIT License - see LICENSE file

## Support

- GitHub Issues: https://github.com/iveymatt/dyslexic-ai-project/issues
- Documentation: `docs/benchmark-architecture.md`
- Email: support@dyslexicai.org

## Acknowledgments

Built with ❤️ by neurodivergent people, for neurodivergent people.

Special thanks to the neurodivergent community for feedback and testing.
