// Career Discovery Type Definitions

export type NeurodivergenceType =
  | 'autism'
  | 'adhd'
  | 'dyslexia'
  | 'dyscalculia'
  | 'anxiety'
  | 'depression'
  | 'other';

export type StrengthType =
  | 'creative-thinking'
  | 'problem-solving'
  | 'detailed-work'
  | 'hyperfocus'
  | 'pattern-recognition'
  | 'pattern-creation'
  | 'big-picture'
  | 'technical-coding'
  | 'writing-language'
  | 'visual-spatial'
  | 'teaching-explaining'
  | 'organizing-systematizing'
  | 'other';

export type ChallengeType =
  | 'social-interaction'
  | 'executive-function'
  | 'time-management'
  | 'sensory-sensitivity'
  | 'emotional-regulation'
  | 'transitions-changes'
  | 'reading-writing'
  | 'math-numbers'
  | 'multitasking'
  | 'unwritten-rules'
  | 'public-speaking'
  | 'other';

export type SensoryPreference =
  | 'quiet-preferred'
  | 'some-noise-ok'
  | 'flexible-with-breaks'
  | 'other';

export type EducationLevel =
  | 'high-school'
  | 'some-college'
  | 'college-degree'
  | 'trade-school'
  | 'self-taught'
  | 'other';

export type CareerInterestType =
  | 'technology'
  | 'creative'
  | 'animals'
  | 'helping-people'
  | 'outdoors'
  | 'building-making'
  | 'teaching-training'
  | 'research-learning'
  | 'business-entrepreneurship'
  | 'not-sure'
  | 'other';

export type JobPriority =
  | 'flexibility'
  | 'stability'
  | 'good-pay'
  | 'helping-others'
  | 'creative-freedom'
  | 'low-stress'
  | 'using-interests'
  | 'other';

export interface UserProfile {
  id: string;
  name?: string;
  age?: number;
  location?: string;

  neurodivergence: NeurodivergenceType[];
  diagnosisDetails?: string;

  strengths: StrengthType[];
  specialInterests?: string;

  challenges: ChallengeType[];
  sensoryPreference: SensoryPreference;

  hasWorked: boolean;
  workExperience?: string;
  education: EducationLevel;
  skills?: string;

  careerInterests: CareerInterestType[];
  jobPriorities: JobPriority[];

  savedJobs: string[];

  lifeSkillsProgress: {
    [moduleId: string]: number; // percentage complete
  };

  aiLiteracyProgress: {
    [moduleId: string]: boolean; // completed or not
  };

  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean; // Flag to indicate this is a demo profile
}

export interface SensoryDemands {
  noise: 'low' | 'medium' | 'high';
  noiseDetails?: string; // e.g., "Quiet office with occasional meetings"
  lights: 'standard' | 'bright' | 'dim';
  lightingDetails?: string; // e.g., "Adjustable desk lamps available"
  openPlan: boolean;
  openPlanDetails?: string; // e.g., "Cubicles with 5ft walls, quiet zones available"
  remote: boolean;
  remoteDetails?: string; // e.g., "Full remote or hybrid 2 days/week"
  sensoryBreaks?: boolean; // Can take sensory breaks
  sensoryAccommodations?: string[]; // e.g., ["Noise-canceling headphones OK", "Sunglasses allowed"]
}

export interface SocialDemandDetails {
  level: 'minimal' | 'moderate' | 'high';
  teamSize?: number; // How many people on immediate team
  dailyInteractions?: string; // e.g., "5-10 slack messages, 1 brief standup"
  clientFacing?: boolean; // Direct client interaction required?
  presentationsRequired?: boolean; // Do you need to present?
  phoneCallsRequired?: boolean; // Phone calls expected?
  writtenVsVerbal?: 'mostly-written' | 'balanced' | 'mostly-verbal';
  socialAccommodations?: string[]; // e.g., ["Email preferred over calls", "Meeting agendas sent ahead"]
}

export interface SoftSkill {
  name: string; // e.g., "Active Listening"
  importance: 'critical' | 'helpful' | 'optional'; // How important for this job
  neurodivergentTips?: string; // Tips for neurodivergent people
  canBeSupported?: boolean; // Can AI/accommodations help with this?
  supportTools?: string[]; // Tools that help, e.g., ["AI note-taker for meetings"]
}

export interface AIAssistiveTool {
  name: string; // e.g., "Grammarly"
  category: 'writing' | 'organization' | 'communication' | 'time-management' | 'sensory' | 'learning' | 'task-automation';
  description: string; // How it helps
  costLevel: 'free' | 'low' | 'medium' | 'expensive'; // $ indicator
  neurodivergentBenefit: string; // Specific benefit for ND people
  helpsWithChallenges?: ChallengeType[]; // Which ND challenges it addresses
}

export interface Accommodation {
  type: 'sensory' | 'social' | 'time' | 'communication' | 'workspace' | 'tech';
  name: string; // e.g., "Flexible start times"
  description: string; // What it is
  likelihood: 'common' | 'negotiable' | 'rare'; // How easy to get
  howToRequest?: string; // Tips for requesting this
}

export interface FutureAIImpact {
  automationRisk: number; // 1-10, what parts AI might automate
  augmentationOpportunity: number; // 1-10, how much AI can help you do the job BETTER
  emergingTools: string[]; // New AI tools coming for this field
  futureSkillsNeeded: string[]; // Skills to learn now to stay relevant
  neurodivergentAdvantage?: string; // How ND thinking may be MORE valuable as AI advances
}

export interface CognitiveProfile {
  strengths: StrengthType[];
  challenges: ChallengeType[];
  score: number; // 1-10 cognitive fit score
}

export interface Job {
  id: string;
  title: string;
  industry: string;
  level: 'entry' | 'mid' | 'senior';
  salary: {
    min: number;
    max: number;
  };
  description: string;

  cognitiveProfile: CognitiveProfile;
  aiRiskScore: number; // 1-10, 1=safe, 10=high risk

  typicalDay: string;
  skillsNeeded: string[];

  // ENHANCED: More detailed sensory/social info
  sensoryDemands: SensoryDemands;
  socialDemands: 'minimal' | 'moderate' | 'high';
  socialDemandDetails?: SocialDemandDetails; // NEW: Detailed social breakdown

  hoursPerWeek: number;
  schedule: string;

  growthPath: string[];
  certifications: string[];

  similar: string[];

  gettingStarted: string[];

  tags: string[];

  // NEW: Neurodivergent-focused enhancements
  softSkills?: SoftSkill[]; // Soft skills with ND-friendly tips
  aiAssistiveTools?: AIAssistiveTool[]; // AI tools that help ND people in this job
  accommodations?: Accommodation[]; // Workplace accommodations
  futureAIImpact?: FutureAIImpact; // How AI will change this job (risk + opportunity)
}

export interface TeachableMoment {
  scenario: string; // Real-world situation description
  whatToNotice: string; // What to pay attention to
  howToRespond: string; // Practical action steps
  whyItMatters: string; // Connection to independence/work
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // minutes
  content: string;
  exercise: string;
  teachableMoment?: TeachableMoment; // Real-world scenario for practice
  coreTheme?: 'executive-function' | 'organizing-systems' | 'sensory-emotional' | 'masking' | 'communication'; // Which core theme this connects to
}

export interface LifeSkillsModule {
  id: string;
  title: string;
  icon: string;
  description: string;
  color?: string; // Theme color: purple, blue, green, pink, cyan
  lessons: Lesson[];
  skillsYouGain: string[];
  practiceActivity: string;
  affirmation: string;
  coreThemes?: string[]; // Which of the 5 core themes this module addresses
}

export interface AILiteracyModule {
  id: string;
  title: string;
  moduleNumber: number;
  duration: number; // minutes
  content: string;
  exercise: string;
  samplePrompt: string;
}

// AI Agents & Workflows Types
export interface AIAgent {
  id: string;
  name: string;
  emoji: string;
  category: 'executive-function' | 'organizing-systems' | 'sensory-emotional' | 'masking' | 'communication';
  description: string; // Short 1-sentence description
  longDescription: string; // Detailed explanation
  useCases: string[]; // Real-world examples of when to use
  systemPrompt: string; // The actual agent instructions
  voicePromptTemplate?: string; // How to use with voice-to-text
  typedPromptTemplate?: string; // How to use when typing
  exampleInput?: string; // Example of what user might say
  exampleOutput?: string; // Example of what agent produces
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string; // "5-10 minutes per use"
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime: string;
  agentToUse?: string | null; // Agent ID to use in this step
  promptToUse?: string | null; // Prompt ID to use in this step
  instructions: string[]; // Step-by-step instructions
  energyLevel: 'low' | 'medium' | 'high'; // How much energy this step requires
  sensoryConsiderations?: string; // Sensory challenges to watch for
  breakAfter: boolean; // Should user take break after this step?
}

export interface AIWorkflow {
  id: string;
  name: string;
  emoji: string;
  category: 'executive-function' | 'organizing-systems' | 'sensory-emotional' | 'masking' | 'communication';
  description: string; // Short description
  longDescription: string; // Detailed explanation
  steps: WorkflowStep[]; // Array of steps in order
  totalEstimatedTime: string; // "10-15 hours spread over 5-7 days"
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[]; // What you need before starting
  successMetrics: string[]; // How to know if workflow was successful
  commonChallenges: {
    challenge: string;
    solution: string;
  }[];
  tags: string[];
}

export interface JobFilters {
  searchQuery: string;
  cognitiveFit: 'all' | '6+' | '8+';
  aiRisk: 'all' | 'low' | 'medium';
  sensoryDemands: 'all' | 'low' | 'medium' | 'high';
  socialDemands: 'all' | 'minimal' | 'moderate' | 'high';
  salaryRange: {
    min: number;
    max: number;
  };
  sortBy: 'best-match' | 'lowest-ai-risk' | 'highest-salary' | 'fastest-to-learn';
}
