// Cognitive Partner Profile Type Definitions

export interface CognitivePartnerProfile {
  // Personal Identity
  id: string;
  name: string;
  pronouns?: string;
  preferredAddress: 'first-name' | 'nickname' | 'formal';
  nickname?: string;

  // Neurodivergent Identity
  neurodivergentConditions: string[];
  strengths: string[];
  challenges: string[];

  // Learning Preferences
  learningStyle: {
    visual: number; // 1-5 scale
    auditory: number;
    kinesthetic: number;
    readingWriting: number;
    primary: 'visual' | 'auditory' | 'kinesthetic' | 'reading-writing';
  };

  // Communication Preferences
  communication: {
    tone: 'formal' | 'casual' | 'friendly';
    detailLevel: 'concise' | 'moderate' | 'detailed';
    structure: 'lists' | 'paragraphs' | 'mixed';
    useEmojis: boolean;
    responseLength: 'short' | 'medium' | 'long';
    avoidJargon: boolean;
  };

  // Accessibility Preferences
  accessibility: {
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    fontFamily: 'opendyslexic' | 'arial' | 'comic-sans' | 'system';
    lineSpacing: 'normal' | 'relaxed' | 'loose';
    letterSpacing: 'normal' | 'wide';
    colorScheme: 'default' | 'high-contrast' | 'dark' | 'cream';
    textToSpeech: boolean;
    voiceInput: boolean;
    reducedMotion: boolean;
  };

  // Thinking Preferences
  thinkingStyle: {
    preferredModes: string[]; // socratic, strategic, skeptic
    defaultMode: 'socratic' | 'strategic' | 'skeptic';
  };

  // Metadata
  createdAt: string;
  updatedAt: string;
  completedAssessment: boolean;
}

// Assessment form data (for building profile)
export interface AssessmentFormData extends Partial<CognitivePartnerProfile> {
  currentStep?: number;
}

// Helper functions
export function createEmptyProfile(): CognitivePartnerProfile {
  return {
    id: crypto.randomUUID(),
    name: '',
    preferredAddress: 'first-name',
    neurodivergentConditions: [],
    strengths: [],
    challenges: [],
    learningStyle: {
      visual: 3,
      auditory: 3,
      kinesthetic: 3,
      readingWriting: 3,
      primary: 'visual',
    },
    communication: {
      tone: 'friendly',
      detailLevel: 'moderate',
      structure: 'mixed',
      useEmojis: false,
      responseLength: 'medium',
      avoidJargon: true,
    },
    accessibility: {
      fontSize: 'medium',
      fontFamily: 'system',
      lineSpacing: 'normal',
      letterSpacing: 'normal',
      colorScheme: 'default',
      textToSpeech: false,
      voiceInput: false,
      reducedMotion: false,
    },
    thinkingStyle: {
      preferredModes: ['socratic'],
      defaultMode: 'socratic',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAssessment: false,
  };
}

export function getDisplayName(profile: CognitivePartnerProfile): string {
  if (profile.preferredAddress === 'nickname' && profile.nickname) {
    return profile.nickname;
  }
  if (profile.preferredAddress === 'formal') {
    return `Mr./Ms. ${profile.name.split(' ').pop()}`;
  }
  return profile.name.split(' ')[0]; // first name
}
