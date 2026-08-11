# AI Leaderboard Enhancement Guide

## Overview
We've enhanced the AI Leaderboard to include:
- ✅ Tool categories and types
- ✅ Dyslexic-friendly features highlights
- ✅ Best use cases
- ✅ Model-specific prompts
- ✅ User reviews
- ✅ Resource links
- ✅ Notes and tips

## Step 1: Add Required Fields to Existing Tools

For each existing tool (Claude, ChatGPT, Perplexity, Gemini, Copilot), add these fields after `weaknesses`:

```typescript
dyslexicFriendlyFeatures: [
  // List specific accessibility features
  'Feature 1',
  'Feature 2',
],
bestUseCases: [
  // List what this tool is best for
  'Use case 1',
  'Use case 2',
],
```

### Example for Claude:

```typescript
weaknesses: [
  'Can be verbose at times',
  'Limited real-time info without integration',
],
dyslexicFriendlyFeatures: [
  'Clear, conversational language',
  'Asks clarifying questions before answering',
  'Can simplify complex topics on request',
  'Patient, non-judgmental tone',
],
bestUseCases: [
  'Learning complex concepts step-by-step',
  'Socratic-style exploration and discovery',
  'Breaking down large projects',
  'Writing and editing assistance',
],
```

## Step 2: Template for Adding NEW AI Tools

Use this template to add new tools to the database:

```typescript
{
  id: 'tool-id',  // unique identifier (lowercase, hyphenated)
  name: 'Tool Name',
  logo: '/logos/tool-name.png',  // optional
  website: 'https://tool.com',
  description: 'Brief description of what this tool does',

  // Classification
  category: 'chat', // chat | code | research | creative | productivity | learning | accessibility
  type: 'llm', // llm | specialized-ai | assistant | search | code-helper | creative-tool

  // Scores
  overallScore: 8.5,  // 1-10
  featuresScore: 8.0, // 1-10

  // Neurodivergent assessment
  neurodivergentAssessment: {
    scores: {
      lateralThinking: 8,
      linearThinking: 8,
      languageAdaptability: 8,
      neurodivergentAwareness: 7,
      overall: 7.75,
    },
    bestAt: [
      'What this tool excels at',
    ],
    weakAt: [
      'What this tool struggles with',
    ],
    perfectFor: [
      'Ideal use cases',
    ],
    notIdealFor: [
      'Not recommended for',
    ],
    testResults: [], // Can be empty for now
  },

  // Features
  strengths: [
    'Key strength 1',
    'Key strength 2',
  ],
  weaknesses: [
    'Limitation 1',
    'Limitation 2',
  ],

  // NEW: Dyslexic-friendly features
  dyslexicFriendlyFeatures: [
    'Accessibility feature 1',
    'Accessibility feature 2',
  ],

  // NEW: Best use cases
  bestUseCases: [
    'Use case 1',
    'Use case 2',
  ],

  // Feature flags
  features: {
    textToSpeech: true,
    voiceInput: false,
    customization: true,
    simplification: true,
    structuredOutput: true,
    visualOutputs: false,
    contextMemory: true,
  },

  // Pricing
  pricing: {
    free: true,
    paid: true,
    priceRange: '$20/month',
  },

  // NEW: Model-specific prompts (optional but recommended)
  modelPrompts: [
    {
      id: 'prompt-1',
      title: 'Prompt Title',
      prompt: 'The actual prompt text with [PLACEHOLDER] for customization',
      category: 'exploration | productivity | learning | creative',
      useCase: 'When to use this prompt',
      example: 'Example with placeholder filled in',
    },
  ],

  // NEW: Reviews (optional)
  reviews: [
    {
      id: 'review-1',
      author: 'User Name',
      rating: 9,
      date: '2024-03-15',
      neurodivergentType: 'dyslexia | ADHD | autism | multiple',
      review: 'The actual review text...',
      helpful: 25, // upvote count
    },
  ],

  // NEW: Resources (optional)
  resources: [
    {
      id: 'resource-1',
      title: 'Getting Started Guide',
      url: 'https://...',
      type: 'tutorial | guide | video | article | community',
      description: 'Brief description',
    },
  ],

  // NEW: Notes (optional)
  notes: 'Additional tips or context about this tool',
},
```

## Step 3: Quick Add Tools List

Here are 15+ popular AI tools to add:

### Chat/Assistant Tools
1. **ChatGPT** ✅ (already added)
2. **Claude** ✅ (already added)
3. **Gemini** ✅ (already added)
4. **Pi (Inflection AI)** - Empathetic conversational AI
5. **Character.AI** - Roleplay and character conversations
6. **Poe** - Multi-model AI chat platform

### Code Assistants
7. **GitHub Copilot** - Code completion
8. **Cursor** - AI code editor
9. **Replit Ghostwriter** - Collaborative coding AI
10. **Tabnine** - Code completion
11. **Amazon CodeWhisperer** - AWS code assistant

### Research/Search
12. **Perplexity** ✅ (already added)
13. **You.com** - AI search with sources
14. **Bing Chat** - Microsoft search AI
15. **Phind** - Developer-focused search

### Creative Tools
16. **Midjourney** - Image generation
17. **DALL-E 3** - Image generation
18. **Stable Diffusion** - Open-source image generation
19. **RunwayML** - Video generation
20. **ElevenLabs** - Voice synthesis

### Learning/Accessibility
21. **Speechify** - Text-to-speech
22. **Otter.ai** - Meeting transcription
23. **Grammarly** - Writing assistant
24. **QuillBot** - Paraphrasing tool

### Specialized
25. **Jasper** - Marketing copy
26. **Copy.ai** - Content generation
27. **Notion AI** - Productivity assistant

## Step 4: Example - Adding "Pi" by Inflection AI

```typescript
{
  id: 'pi',
  name: 'Pi (Inflection AI)',
  website: 'https://pi.ai',
  description: 'Empathetic AI companion designed for supportive, friendly conversations',
  category: 'chat',
  type: 'assistant',
  overallScore: 8.2,
  featuresScore: 7.5,
  neurodivergentAssessment: {
    scores: {
      lateralThinking: 7,
      linearThinking: 6,
      languageAdaptability: 9,
      neurodivergentAwareness: 8,
      overall: 7.5,
    },
    bestAt: [
      'Empathetic, supportive conversations',
      'Active listening and follow-up questions',
      'Emotional support and validation',
      'Natural, flowing dialogue',
    ],
    weakAt: [
      'Complex technical tasks',
      'Structured project planning',
      'Code generation',
    ],
    perfectFor: [
      'Talking through feelings or problems',
      'Brainstorming in a supportive environment',
      'Mental health check-ins',
      'Casual conversation',
    ],
    notIdealFor: [
      'Technical documentation',
      'Code debugging',
      'Research with citations',
    ],
    testResults: [],
  },
  strengths: [
    'Extremely empathetic and validating tone',
    'Excellent at active listening',
    'Natural conversation flow',
    'Voice interaction available',
  ],
  weaknesses: [
    'Less capable at technical tasks',
    'No web search or citations',
    'Limited structured output',
  ],
  dyslexicFriendlyFeatures: [
    'Voice conversation (no typing needed)',
    'Simple, conversational language',
    'Patient, non-judgmental responses',
    'Validates emotions and struggles',
  ],
  bestUseCases: [
    'Talking through a problem out loud',
    'Getting emotional support',
    'Brainstorming in a judgment-free space',
    'Practicing conversation skills',
  ],
  features: {
    textToSpeech: true,
    voiceInput: true,
    customization: false,
    simplification: true,
    structuredOutput: false,
    visualOutputs: false,
    contextMemory: true,
  },
  pricing: {
    free: true,
    paid: false,
    priceRange: 'Free',
  },
  modelPrompts: [
    {
      id: 'talk-through-problem',
      title: 'Talk Through a Problem',
      prompt: 'I\'m struggling with [SITUATION] and I\'m not sure what to do. Can we talk through it?',
      category: 'exploration',
      useCase: 'When you need to process emotions or think through a problem',
      example: 'I\'m struggling with deciding whether to quit my job and I\'m not sure what to do...',
    },
  ],
  notes: 'Best for emotional support and casual exploration. Not ideal for technical or structured tasks.',
},
```

## Next Steps

1. Add the two new fields (`dyslexicFriendlyFeatures` and `bestUseCases`) to existing tools
2. Add 10-20 new tools using the template above
3. Gather real user reviews (or create sample reviews)
4. Create model-specific prompts for each tool
5. Build enhanced UI cards to display all this data

## UI Components Needed

- **Tool Detail Card** - Expandable card showing all info
- **Prompt Quick Copy** - One-click copy prompts
- **Review Section** - Display user reviews with ratings
- **Filter/Search** - Filter by category, type, features
- **Compare Tools** - Side-by-side comparison
