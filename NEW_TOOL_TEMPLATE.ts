// Copy this template to add a new AI tool to the leaderboard
// File location: frontend/src/data/aiTools.ts

{
  id: 'tool-id-here',  // Unique ID (lowercase, hyphenated)
  name: 'Tool Name',
  website: 'https://tool-website.com',
  description: 'One sentence describing what this tool does',

  category: 'chat',  // Options: chat | code | research | creative | productivity | learning | accessibility
  type: 'llm',       // Options: llm | specialized-ai | assistant | search | code-helper | creative-tool

  overallScore: 8.0,   // Rate 1-10
  featuresScore: 8.0,  // Rate 1-10

  neurodivergentAssessment: {
    scores: {
      lateralThinking: 8,          // Can it handle creative, non-linear exploration?
      linearThinking: 8,           // Can it organize and structure information?
      languageAdaptability: 8,     // Can it simplify language for dyslexic users?
      neurodivergentAwareness: 7,  // Does it understand neurodivergent needs?
      overall: 7.75,               // Average of above
    },
    bestAt: [
      'What this tool excels at (specific example)',
      'Another strength',
    ],
    weakAt: [
      'What it struggles with',
    ],
    perfectFor: [
      'Ideal use case 1',
      'Ideal use case 2',
    ],
    notIdealFor: [
      'What to avoid using it for',
    ],
    testResults: [],  // Leave empty for now
  },

  strengths: [
    'Key feature or capability 1',
    'Key feature or capability 2',
  ],
  weaknesses: [
    'Limitation 1',
    'Limitation 2',
  ],

  dyslexicFriendlyFeatures: [
    'Text-to-speech available',
    'Voice input supported',
    'Simple, clear language',
    // Add all accessibility features
  ],

  bestUseCases: [
    'Writing emails',
    'Learning new concepts',
    'Brainstorming ideas',
    // Add specific use cases
  ],

  features: {
    textToSpeech: true,
    voiceInput: false,
    customization: true,
    simplification: true,
    structuredOutput: true,
    visualOutputs: false,
    contextMemory: true,
  },

  pricing: {
    free: true,
    paid: true,
    priceRange: '$20/month',
  },

  // OPTIONAL: Add prompts specific to this tool
  modelPrompts: [
    {
      id: 'prompt-example',
      title: 'Example Prompt',
      prompt: 'Your prompt here with [PLACEHOLDER] for user to fill in',
      category: 'exploration',  // exploration | productivity | learning | creative
      useCase: 'When you want to...',
      example: 'Example with placeholder filled: Your prompt here with specific topic',
    },
  ],

  // OPTIONAL: Add user reviews
  reviews: [
    {
      id: 'review-1',
      author: 'Jane D.',
      rating: 9,
      date: '2024-03-15',
      neurodivergentType: 'dyslexia',  // dyslexia | ADHD | autism | multiple
      review: 'This tool really helped me with... [review text]',
      helpful: 15,  // Number of upvotes
    },
  ],

  // OPTIONAL: Add helpful resources
  resources: [
    {
      id: 'resource-1',
      title: 'Getting Started Guide',
      url: 'https://...',
      type: 'guide',  // tutorial | guide | video | article | community
      description: 'Learn how to use this tool effectively',
    },
  ],

  // OPTIONAL: Add notes/tips
  notes: 'Pro tip: This tool works best when...',
},
