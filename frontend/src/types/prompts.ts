// Prompt Library Types

export type UserType = 'student' | 'professional' | 'entrepreneur' | 'teacher' | 'parent' | 'coach';
export type BestMode = 'socratic' | 'strategic' | 'both';
export type SortOption = 'popular' | 'newest' | 'most-used' | 'trending';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  userType: UserType;
  bestMode: BestMode;
  tags: string[];
  exampleUseCase: string;
  relatedPromptIds: string[];
  rating: number; // upvotes
  usedCount: number; // how many times used
  commentCount: number;
  dateAdded: string; // ISO date string
  submittedBy: string;
  verified: boolean;
  emoji?: string; // optional icon for the prompt
}

export interface PromptFilters {
  userType: UserType | 'all';
  searchQuery: string;
  selectedTags: string[];
  sortBy: SortOption;
}

export const USER_TYPE_LABELS: Record<UserType | 'all', string> = {
  all: 'All Users',
  student: 'Students',
  professional: 'Professionals',
  entrepreneur: 'Entrepreneurs',
  teacher: 'Teachers/Educators',
  parent: 'Parents',
  coach: 'Coaches/Mentors/Advocates',
};

export const USER_TYPE_COLORS: Record<UserType, string> = {
  student: 'bg-blue-600',
  professional: 'bg-green-600',
  entrepreneur: 'bg-purple-600',
  teacher: 'bg-orange-600',
  parent: 'bg-pink-600',
  coach: 'bg-teal-600',
};

export const MODE_LABELS: Record<BestMode, string> = {
  socratic: 'Socratic',
  strategic: 'Strategic',
  both: 'Both Modes',
};

export const MODE_COLORS: Record<BestMode, string> = {
  socratic: 'bg-blue-600',
  strategic: 'bg-green-600',
  both: 'bg-purple-600',
};
