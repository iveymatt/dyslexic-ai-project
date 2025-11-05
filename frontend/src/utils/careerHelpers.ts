import type {
  Job,
  JobFilters,
  UserProfile,
  StrengthType,
  ChallengeType,
  CareerInterestType,
} from '../types/career';

// Calculate cognitive fit score between user profile and job
export function calculateCognitiveFit(userProfile: UserProfile, job: Job): number {
  let score = 0;
  let totalWeight = 0;

  // Strength matching (40% weight)
  const strengthWeight = 0.4;
  const strengthMatches = userProfile.strengths.filter((strength) =>
    job.cognitiveProfile.strengths.includes(strength)
  ).length;
  const strengthScore = (strengthMatches / Math.max(userProfile.strengths.length, 1)) * 10;
  score += strengthScore * strengthWeight;
  totalWeight += strengthWeight;

  // Challenge avoidance (30% weight)
  const challengeWeight = 0.3;
  const challengeConflicts = userProfile.challenges.filter((challenge) =>
    job.cognitiveProfile.challenges.includes(challenge)
  ).length;
  const challengeScore = ((userProfile.challenges.length - challengeConflicts) / Math.max(userProfile.challenges.length, 1)) * 10;
  score += challengeScore * challengeWeight;
  totalWeight += challengeWeight;

  // Interest matching (30% weight)
  const interestWeight = 0.3;
  const interestMatches = userProfile.careerInterests.filter((interest) =>
    job.tags.some((tag) => tag.includes(interest))
  ).length;
  const interestScore = (interestMatches / Math.max(userProfile.careerInterests.length, 1)) * 10;
  score += interestScore * interestWeight;
  totalWeight += interestWeight;

  return Math.round((score / totalWeight) * 10) / 10;
}

// Calculate sensory match between user and job
export function calculateSensoryMatch(userProfile: UserProfile, job: Job): number {
  let score = 10;

  if (userProfile.sensoryPreference === 'quiet-preferred') {
    if (job.sensoryDemands.noise === 'high') score -= 4;
    if (job.sensoryDemands.noise === 'medium') score -= 2;
    if (job.sensoryDemands.openPlan) score -= 2;
  } else if (userProfile.sensoryPreference === 'some-noise-ok') {
    if (job.sensoryDemands.noise === 'high') score -= 2;
  }

  return Math.max(0, Math.min(10, score));
}

// Calculate social match between user and job
export function calculateSocialMatch(userProfile: UserProfile, job: Job): number {
  const hasSocialChallenge = userProfile.challenges.includes('social-interaction');

  if (hasSocialChallenge) {
    if (job.socialDemands === 'high') return 3;
    if (job.socialDemands === 'moderate') return 6;
    if (job.socialDemands === 'minimal') return 10;
  }

  return 8; // Neutral score if no social challenges
}

// Calculate final match score
export function calculateFinalMatchScore(userProfile: UserProfile, job: Job): number {
  const cognitiveFit = calculateCognitiveFit(userProfile, job);
  const aiRiskInverse = 10 - job.aiRiskScore;
  const sensoryMatch = calculateSensoryMatch(userProfile, job);
  const socialMatch = calculateSocialMatch(userProfile, job);

  const finalScore =
    cognitiveFit * 0.4 +
    aiRiskInverse * 0.2 +
    sensoryMatch * 0.2 +
    socialMatch * 0.2;

  return Math.round(finalScore * 10) / 10;
}

// Get jobs matched to user profile
export function getMatchedJobs(jobs: Job[], userProfile: UserProfile | null): Job[] {
  if (!userProfile || !userProfile.profileCompleted) {
    return jobs;
  }

  const scoredJobs = jobs.map((job) => ({
    ...job,
    matchScore: calculateFinalMatchScore(userProfile, job),
    cognitiveFitScore: calculateCognitiveFit(userProfile, job),
  }));

  return scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
}

// Search jobs by query
export function searchJobs(jobs: Job[], query: string): Job[] {
  const lowerQuery = query.toLowerCase();

  return jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(lowerQuery) ||
      job.industry.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery) ||
      job.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      job.skillsNeeded.some((skill) => skill.toLowerCase().includes(lowerQuery))
    );
  });
}

// Filter jobs by criteria
export function filterJobs(jobs: Job[], filters: JobFilters, userProfile: UserProfile | null): Job[] {
  let filtered = [...jobs];

  // Search query
  if (filters.searchQuery.trim()) {
    filtered = searchJobs(filtered, filters.searchQuery);
  }

  // Cognitive fit filter (requires user profile)
  if (userProfile && userProfile.profileCompleted) {
    if (filters.cognitiveFit === '8+') {
      filtered = filtered.filter((job) => calculateCognitiveFit(userProfile, job) >= 8);
    } else if (filters.cognitiveFit === '6+') {
      filtered = filtered.filter((job) => calculateCognitiveFit(userProfile, job) >= 6);
    }
  }

  // AI risk filter
  if (filters.aiRisk === 'low') {
    filtered = filtered.filter((job) => job.aiRiskScore <= 3);
  } else if (filters.aiRisk === 'medium') {
    filtered = filtered.filter((job) => job.aiRiskScore >= 4 && job.aiRiskScore <= 6);
  }

  // Sensory demands filter
  if (filters.sensoryDemands !== 'all') {
    filtered = filtered.filter((job) => job.sensoryDemands.noise === filters.sensoryDemands);
  }

  // Social demands filter
  if (filters.socialDemands !== 'all') {
    filtered = filtered.filter((job) => job.socialDemands === filters.socialDemands);
  }

  // Salary range filter
  filtered = filtered.filter(
    (job) =>
      job.salary.max >= filters.salaryRange.min &&
      job.salary.min <= filters.salaryRange.max
  );

  return filtered;
}

// Sort jobs
export function sortJobs(
  jobs: Job[],
  sortBy: JobFilters['sortBy'],
  userProfile: UserProfile | null
): Job[] {
  const sorted = [...jobs];

  switch (sortBy) {
    case 'best-match':
      if (userProfile && userProfile.profileCompleted) {
        return sorted.sort(
          (a, b) =>
            calculateFinalMatchScore(userProfile, b) -
            calculateFinalMatchScore(userProfile, a)
        );
      }
      return sorted;

    case 'lowest-ai-risk':
      return sorted.sort((a, b) => a.aiRiskScore - b.aiRiskScore);

    case 'highest-salary':
      return sorted.sort((a, b) => b.salary.max - a.salary.max);

    case 'fastest-to-learn':
      return sorted.filter((job) => job.level === 'entry');

    default:
      return sorted;
  }
}

// Apply all filters and sorting
export function applyJobFilters(
  jobs: Job[],
  filters: JobFilters,
  userProfile: UserProfile | null
): Job[] {
  const filtered = filterJobs(jobs, filters, userProfile);
  const sorted = sortJobs(filtered, filters.sortBy, userProfile);
  return sorted;
}

// Get AI risk label
export function getAIRiskLabel(score: number): string {
  if (score <= 3) return 'Very Safe';
  if (score <= 6) return 'Medium Risk';
  return 'High Risk';
}

// Get AI risk color
export function getAIRiskColor(score: number): string {
  if (score <= 3) return 'text-green-500';
  if (score <= 6) return 'text-yellow-500';
  return 'text-orange-500';
}

// Get cognitive fit label
export function getCognitiveFitLabel(score: number): string {
  if (score >= 8) return 'Excellent match!';
  if (score >= 6) return 'Good match';
  if (score >= 4) return 'Okay match';
  return 'May be challenging';
}

// Get cognitive fit color
export function getCognitiveFitColor(score: number): string {
  if (score >= 8) return 'text-green-500';
  if (score >= 6) return 'text-blue-500';
  if (score >= 4) return 'text-yellow-500';
  return 'text-orange-500';
}

// Format salary range
export function formatSalary(min: number, max: number): string {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}k`;
    }
    return `$${num}`;
  };

  return `${formatNumber(min)} - ${formatNumber(max)}`;
}

// Get strength label
export function getStrengthLabel(strength: StrengthType): string {
  const labels: Record<StrengthType, string> = {
    'creative-thinking': 'Creative/Artistic Thinking',
    'problem-solving': 'Problem-Solving/Logic',
    'detailed-work': 'Detailed/Meticulous Work',
    hyperfocus: 'Hyperfocus/Deep Concentration',
    'pattern-recognition': 'Pattern Recognition',
    'pattern-creation': 'Pattern Creation',
    'big-picture': 'Big-Picture Thinking',
    'technical-coding': 'Technical/Coding',
    'writing-language': 'Writing/Language',
    'visual-spatial': 'Visual/Spatial',
    'teaching-explaining': 'Teaching/Explaining',
    'organizing-systematizing': 'Organizing/Systematizing',
    other: 'Other',
  };
  return labels[strength] || strength;
}

// Get challenge label
export function getChallengeLabel(challenge: ChallengeType): string {
  const labels: Record<ChallengeType, string> = {
    'social-interaction': 'Social Interaction/Small Talk',
    'executive-function': 'Executive Function (Planning, Organizing)',
    'time-management': 'Time Management',
    'sensory-sensitivity': 'Sensory Sensitivity (Sounds, Lights, Smells)',
    'emotional-regulation': 'Emotional Regulation',
    'transitions-changes': 'Transitions/Changes',
    'reading-writing': 'Reading/Writing',
    'math-numbers': 'Math/Numbers',
    multitasking: 'Multitasking',
    'unwritten-rules': 'Following Unwritten Rules',
    'public-speaking': 'Public Speaking',
    other: 'Other',
  };
  return labels[challenge] || challenge;
}

// Get career interest label
export function getCareerInterestLabel(interest: CareerInterestType): string {
  const labels: Record<CareerInterestType, string> = {
    technology: 'Computers/Technology',
    creative: 'Creative (Art, Music, Design)',
    animals: 'Working with Animals',
    'helping-people': 'Helping People',
    outdoors: 'Outdoors/Nature',
    'building-making': 'Building/Making Things',
    'teaching-training': 'Teaching/Training',
    'research-learning': 'Research/Learning',
    'business-entrepreneurship': 'Business/Entrepreneurship',
    'not-sure': 'Not Sure - Surprise Me',
    other: 'Other',
  };
  return labels[interest] || interest;
}

// Calculate life skills progress
export function calculateLifeSkillsProgress(lifeSkillsProgress: Record<string, number>): number {
  const values = Object.values(lifeSkillsProgress);
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / values.length);
}

// Calculate AI literacy progress
export function calculateAILiteracyProgress(aiLiteracyProgress: Record<string, boolean>): number {
  const values = Object.values(aiLiteracyProgress);
  if (values.length === 0) return 0;
  const completed = values.filter((val) => val).length;
  return Math.round((completed / values.length) * 100);
}
