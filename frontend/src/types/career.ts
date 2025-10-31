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
}

export interface SensoryDemands {
  noise: 'low' | 'medium' | 'high';
  lights: 'standard' | 'bright' | 'dim';
  openPlan: boolean;
  remote: boolean;
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

  sensoryDemands: SensoryDemands;
  socialDemands: 'minimal' | 'moderate' | 'high';

  hoursPerWeek: number;
  schedule: string;

  growthPath: string[];
  certifications: string[];

  similar: string[];

  gettingStarted: string[];

  tags: string[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // minutes
  content: string;
  exercise: string;
}

export interface LifeSkillsModule {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  skillsYouGain: string[];
  practiceActivity: string;
  affirmation: string;
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
