// Neurodivergent Thinking Assessment Types

export interface NeurodivergentScore {
  lateralThinking: number;        // 1-10: Can handle non-linear exploration
  linearThinking: number;         // 1-10: Can organize and structure
  languageAdaptability: number;   // 1-10: Adjusts to language processing needs
  neurodivergentAwareness: number; // 1-10: Understands neurodivergent brains
  overall: number;                // Average of above
}

export interface TestQuestion {
  id: string;
  dimension: keyof Omit<NeurodivergentScore, 'overall'>;
  prompt: string;
  scoringCriteria: {
    excellent: string[];    // 9-10
    good: string[];         // 7-8
    okay: string[];         // 5-6
    poor: string[];         // 3-4
    veryPoor: string[];     // 1-2
  };
}

export interface AITool {
  id: string;
  name: string;
  logo?: string;
  website: string;
  description: string;

  // Overall scores
  overallScore: number;
  featuresScore: number;
  neurodivergentScore: NeurodivergentScore;

  // Detailed breakdown
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  notIdealFor: string[];

  // Features
  features: {
    textToSpeech: boolean;
    voiceInput: boolean;
    customization: boolean;
    simplification: boolean;
    structuredOutput: boolean;
    visualOutputs: boolean;
    contextMemory: boolean;
  };

  // Pricing
  pricing: {
    free: boolean;
    paid: boolean;
    priceRange?: string;
  };
}

export type ScoreLevel = 'excellent' | 'good' | 'okay' | 'poor' | 'very-poor';

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 9) return 'excellent';
  if (score >= 7) return 'good';
  if (score >= 5) return 'okay';
  if (score >= 3) return 'poor';
  return 'very-poor';
}

export function getScoreColor(score: number): string {
  if (score >= 9) return 'text-green-500';
  if (score >= 7) return 'text-blue-500';
  if (score >= 5) return 'text-yellow-500';
  if (score >= 3) return 'text-orange-500';
  return 'text-red-500';
}

export function getScoreBgColor(score: number): string {
  if (score >= 9) return 'bg-green-600';
  if (score >= 7) return 'bg-blue-600';
  if (score >= 5) return 'bg-yellow-600';
  if (score >= 3) return 'bg-orange-600';
  return 'bg-red-600';
}
