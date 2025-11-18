# Quick Update for Existing 5 Tools

Add these fields to each existing tool. Insert them right after the `weaknesses` array.

## 1. Claude (Anthropic)

```typescript
dyslexicFriendlyFeatures: [
  'Clear, conversational language',
  'Asks clarifying questions first',
  'Can simplify complex topics on request',
  'Patient, non-judgmental tone',
  'Good at structured explanations',
],
bestUseCases: [
  'Learning complex concepts step-by-step',
  'Socratic-style exploration',
  'Breaking down large projects',
  'Writing and editing assistance',
  'Coding help with explanations',
],
```

## 2. ChatGPT (OpenAI)

```typescript
dyslexicFriendlyFeatures: [
  'Voice mode for hands-free interaction',
  'Can simplify language when prompted',
  'Image analysis to help with visual learning',
  'Fast responses',
  'Structured formatting with bullets and headers',
],
bestUseCases: [
  'Quick answers and summaries',
  'Voice conversations',
  'Image analysis and description',
  'Code generation',
  'Task list creation',
],
```

## 3. Perplexity AI

```typescript
dyslexicFriendlyFeatures: [
  'Citations reduce need to verify info',
  'Clean, organized output format',
  'Bullet points and structured summaries',
  'Real-time information',
],
bestUseCases: [
  'Research with sources',
  'Fact-checking',
  'Academic work',
  'Finding recent information',
  'Comparing multiple sources',
],
```

## 4. Gemini (Google)

```typescript
dyslexicFriendlyFeatures: [
  'Voice input available',
  'Google Workspace integration',
  'Multimodal (text and images)',
  'Fast response times',
],
bestUseCases: [
  'Google Workspace users',
  'Quick factual queries',
  'Gmail and Docs integration',
  'Image analysis',
  'Google search enhancement',
],
```

## 5. Microsoft Copilot

```typescript
dyslexicFriendlyFeatures: [
  'Voice input available',
  'Immersive Reader integration (Edge)',
  'Office integration for familiar tools',
  'Windows dictation support',
],
bestUseCases: [
  'Microsoft Office users',
  'Workplace productivity',
  'Professional documentation',
  'Email writing',
  'Excel and PowerPoint assistance',
],
```

## Where to Add These

In `frontend/src/data/aiTools.ts`, find each tool and add the two arrays right after `weaknesses`:

```typescript
weaknesses: [
  'Existing weakness 1',
  'Existing weakness 2',
],
// 👇 ADD THESE TWO ARRAYS HERE
dyslexicFriendlyFeatures: [
  ...
],
bestUseCases: [
  ...
],
features: {  // This already exists
  ...
}
```

## Quick Find & Replace Locations

- **Claude**: Line ~166 (after `weaknesses: [...]`)
- **ChatGPT**: Line ~256 (after `weaknesses: [...]`)
- **Perplexity**: Line ~348 (after `weaknesses: [...]`)
- **Gemini**: Line ~440 (after `weaknesses: [...]`)
- **Copilot**: Line ~531 (after `weaknesses: [...]`)

## Done!

Once you add these to all 5 tools, the leaderboard will work with the new enhanced schema!
