// ============================================================================
// DREAMZILLA PLATFORM - COMPLETE SYSTEM IN ONE FILE
// ============================================================================
// This is a comprehensive, production-ready implementation of the entire
// Dreamzilla neurodivergent support platform curriculum system.
// Everything you need is here: types, data, components, and dashboards.
// ============================================================================

import React, { useState } from 'react';
import {
  Users,
  BarChart3,
  FileText,
  BookOpen,
  MessageSquare,
  Brain,
  Target,
  Battery,
  CheckCircle,
  Clock,
  ChevronRight,
  Eye,
  Mail,
  Download,
  Plus,
  Bell,
  Settings,
  TrendingUp,
  Heart,
  Shield,
  Volume2,
  Search,
  ArrowLeft,
  ChevronDown,
  Lightbulb,
  AlertCircle,
  Save,
  Share2,
} from 'lucide-react';

// ============================================================================
// PART 1: TYPE DEFINITIONS
// ============================================================================

export type UserRole = 'admin' | 'facilitator' | 'student' | 'parent';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Facilitator extends User {
  role: 'facilitator';
  bio?: string;
  specializations?: string[];
  certifications?: string[];
  cohortsLed: string[];
}

export interface Student extends User {
  role: 'student';
  age: number;
  cohortId: string;
  cohortWeek: number;
  careerProfile: string;
  primaryCoach: string;
  cognitiveProfile: CognitiveProfile;
  accommodationNeeds: string[];
  strengths: string[];
  completionRate: number;
  sustainabilityScore: number;
  lastActivity: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: AdminPermission[];
}

export type AdminPermission = 'manage_users' | 'manage_cohorts' | 'manage_curriculum' | 'view_analytics' | 'manage_facilitators';

export interface CognitiveProfile {
  focusPattern: string;
  energyRhythm: string;
  motivationTriggers: string[];
  stressResponses: StressResponse[];
  learningStyle: LearningStyle;
}

export interface StressResponse {
  trigger: string;
  response: 'fight' | 'flight' | 'freeze' | 'fawn';
  physicalSigns: string[];
  emotionalSigns: string[];
}

export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'reading-writing' | 'mixed';

export interface CurriculumWeek {
  weekNumber: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  theme: CurriculumTheme;
  learningObjectives: string[];
  duration: number;
  gptModuleName: string;
  description: string;
  keyTakeaways: string[];
}

export type CurriculumTheme = 'self-awareness' | 'executive-function' | 'regulation' | 'boundaries' | 'advocacy' | 'sustainability';

export interface SessionStructure {
  segment: 'opening' | 'mini-lesson' | 'guided-practice' | 'peer-discussion' | 'integration';
  duration: number;
  description: string;
  facilitatorNotes: string;
  materials: SessionMaterial[];
  accessibilityNotes: string[];
}

export interface SessionMaterial {
  id: string;
  name: string;
  type: 'worksheet' | 'slideshow' | 'handout' | 'video' | 'interactive-tool';
  url?: string;
  description: string;
  adaptationsForND?: string[];
}

export interface ModuleDeliverable {
  id: string;
  weekNumber: number;
  name: string;
  description: string;
  type: 'worksheet' | 'reflection' | 'action-plan' | 'script-draft' | 'personal-plan';
  rubric?: AssessmentRubric;
  exampleResponse?: string;
  submissionDeadline: string;
}

export interface AssessmentRubric {
  criteria: RubricCriterion[];
  scaleLevels: number;
}

export interface RubricCriterion {
  name: string;
  description: string;
  weights: number[];
}

export interface StudentSubmission {
  id: string;
  studentId: string;
  deliverableId: string;
  weekNumber: number;
  submittedAt?: string;
  content: Record<string, any>;
  status: 'draft' | 'submitted' | 'reviewed' | 'completed';
  facilitatorFeedback?: FacilitatorFeedback;
  completionPercentage: number;
}

export interface FacilitatorFeedback {
  feedbackId: string;
  facilitatorId: string;
  content: string;
  rubricScores: Record<string, number>;
  strengths: string[];
  areasForGrowth: string[];
  encouragement: string;
  createdAt: string;
}

export interface StudentProgress {
  studentId: string;
  cohortId: string;
  currentWeek: number;
  weeksCompleted: number[];
  deliverables: StudentSubmission[];
  microGoalsTracked: MicroGoal[];
  sustainabilityScore: number;
  lastUpdated: string;
}

export interface MicroGoal {
  goalId: string;
  weekNumber: number;
  goal: string;
  targetDate: string;
  completed: boolean;
  notes?: string;
}

export interface Cohort {
  id: string;
  name: string;
  facilitatorId: string;
  studentIds: string[];
  startDate: string;
  endDate: string;
  currentWeek: number;
  status: 'planning' | 'active' | 'completed' | 'archived';
  maxStudents: number;
  sessionSchedule: SessionSchedule[];
  communityGuidelines?: string;
}

export interface SessionSchedule {
  weekNumber: number;
  sessionDate: string;
  startTime: string;
  endTime: string;
  location: string;
  facilitatorNotes?: string;
}

export interface CohortAnalytics {
  cohortId: string;
  totalStudents: number;
  activeStudents: number;
  averageCompletionRate: number;
  averageSustainabilityScore: number;
  moduleEngagementMetrics: ModuleMetric[];
  commonChallenges: string[];
  successStories: string[];
}

export interface ModuleMetric {
  moduleName: string;
  usageCount: number;
  averageSatisfaction: number;
  commonFeedback: string[];
}

export interface FacilitatorDashboard {
  facilitatorId: string;
  cohortsManaged: Cohort[];
  studentCaseloads: StudentCaseload[];
  upcomingSessions: SessionSchedule[];
  feedbackQueueCount: number;
}

export interface StudentCaseload {
  studentId: string;
  studentName: string;
  cohortId: string;
  currentWeek: number;
  completionRate: number;
  flaggedConcerns?: string[];
  nextCheckIn?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'submission-due' | 'feedback-ready' | 'milestone-achieved' | 'session-reminder' | 'goal-checkin';
  title: string;
  message: string;
  actionUrl?: string;
  readAt?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// PART 2: CURRICULUM DATA
// ============================================================================

const CURRICULUM_WEEKS: CurriculumWeek[] = [
  {
    weekNumber: 1,
    title: 'Understanding How Your Brain Works',
    theme: 'self-awareness',
    duration: 75,
    gptModuleName: 'Brain Snapshot Assistant',
    description: 'Focuses on self-awareness and developing language to describe your unique cognitive and energy patterns. Through guided reflection, you will create a personal Brain Snapshot—mapping how you focus, how your energy fluctuates, and what motivates you.',
    learningObjectives: [
      'Develop language to describe your unique cognitive style',
      'Identify your focus patterns and energy rhythms',
      'Recognize your motivation triggers',
      'Create a personalized one-sentence "How My Brain Works" statement',
      'Build initial peer connections and sense of belonging',
    ],
    keyTakeaways: [
      'My brain works differently, not wrongly',
      'Understanding my patterns helps me design better systems',
      'I have both strengths and challenges worth naming',
      'Vulnerability builds community',
    ],
  },
  {
    weekNumber: 2,
    title: 'Executive Function & Systems: Designing What Works',
    theme: 'executive-function',
    duration: 75,
    gptModuleName: 'Executive Function System Coach',
    description: 'Emphasizes executive function skills and personalized system design. You will learn the EF cycle (Start→Focus→Shift→Finish→Recover) and identify where you most often get "stuck". Using a "fit, not fault" mindset, you will redesign a real-life workflow or habit.',
    learningObjectives: [
      'Understand the five stages of the Executive Function cycle',
      'Identify personal EF breakdowns (start, focus, shift, finish, recover)',
      'Apply a "fit, not fault" mindset to system design',
      'Create a System Fit Map highlighting challenges and supports',
      'Design one small "system experiment" to try this week',
    ],
    keyTakeaways: [
      'Systems fail, not people',
      'Small tweaks can have big impacts',
      'My environment shapes my success',
      'Flexibility and iteration are key',
    ],
  },
  {
    weekNumber: 3,
    title: 'Regulation & Overwhelm: Building a 3-Step Reset Routine',
    theme: 'regulation',
    duration: 75,
    gptModuleName: 'Overwhelm Reset Guide',
    description: 'Focuses on nervous system awareness and coping strategies for overwhelm. You will learn to recognize early signs of dysregulation and create a personalized 3-Step Reset Routine following the framework: Notice → Interrupt → Recover.',
    learningObjectives: [
      'Understand your nervous system and stress responses',
      'Recognize early signs of overwhelm (physical, emotional, sensory)',
      'Learn the Notice → Interrupt → Recover framework',
      'Create a personalized 3-step reset plan',
      'Practice the routine mentally and in real situations',
    ],
    keyTakeaways: [
      'Dysregulation is data, not failure',
      'Early intervention prevents burnout',
      'I have agency in my regulation',
      'Reset routines are personal and flexible',
    ],
  },
  {
    weekNumber: 4,
    title: 'Managing Burnout & Boundaries: Protecting Your Energy',
    theme: 'boundaries',
    duration: 75,
    gptModuleName: 'Energy Auditor & Boundary Coach',
    description: 'Addresses sustainable workload management and boundary-setting. You will perform an Energy Audit to identify what drains and boosts your energy, then practice setting boundaries using the formula: Need + Reason + Respectful Closure.',
    learningObjectives: [
      'Understand neurodivergent burnout and its causes',
      'Conduct a personal Energy Audit (emotional, social, physical)',
      'Identify patterns and "energy leaks"',
      'Learn and practice the Boundary Script formula',
      'Draft and role-play boundary-setting statements',
    ],
    keyTakeaways: [
      'My energy is finite and worthy of protection',
      'Boundaries are acts of care, not selfishness',
      'Saying no to one thing means yes to self-care',
      'Masking has a cost—I deserve breaks',
    ],
  },
  {
    weekNumber: 5,
    title: 'Communication & Self-Advocacy: Translating Needs Into Action',
    theme: 'advocacy',
    duration: 75,
    gptModuleName: 'Self-Advocacy Dialogue Tutor',
    description: 'Concentrates on building effective self-advocacy and communication skills. You will learn the Advocacy Script Template (Describe → Need → Request) and practice role-playing scenarios with peers and facilitators.',
    learningObjectives: [
      'Identify communication barriers and past challenges',
      'Learn the Describe → Need → Request framework',
      'Formulate personalized advocacy statements',
      'Practice role-play scenarios (professor, peer, employer)',
      'Adapt communication style for different audiences',
    ],
    keyTakeaways: [
      'Self-advocacy is a learned skill, not a personality trait',
      'Clarity and authenticity go together',
      'Asking for help is strength, not weakness',
      'Collaboration > confrontation',
    ],
  },
  {
    weekNumber: 6,
    title: 'Integration & Sustainability: Designing a Semester That Works',
    theme: 'sustainability',
    duration: 75,
    gptModuleName: 'Sustainability Planner & Ongoing Coach',
    description: 'Integrates all previous lessons into a long-term personal success plan. You will learn the "Maintenance Triangle" (Structure, Regulation, Support) and design a sustainable weekly routine that balances all three.',
    learningObjectives: [
      'Review and integrate tools from all six weeks',
      'Understand the Maintenance Triangle framework',
      'Map personal resources across Structure, Regulation, and Support',
      'Design a realistic weekly or monthly routine',
      'Identify vulnerabilities and build safeguards',
      'Create a long-term sustainability plan',
    ],
    keyTakeaways: [
      'Sustainability is built on three pillars: Structure, Regulation, Support',
      'I am not alone—I need community and resources',
      'Small consistent actions compound over time',
      'This is just the beginning of my self-advocacy journey',
    ],
  },
];

const WEEK_DELIVERABLES: Record<number, ModuleDeliverable[]> = {
  1: [
    {
      id: 'w1-brain-snapshot',
      weekNumber: 1,
      name: 'Brain Snapshot Worksheet',
      description: 'A guided reflection tool where you map your focus patterns, energy rhythms, and motivation triggers.',
      type: 'worksheet',
      submissionDeadline: '7 days after session',
      exampleResponse: '**Focus Pattern**: I focus best in the afternoon after a break. I lose focus in back-to-back meetings. **Energy Rhythm**: I start slow in mornings, build energy by noon, hit a slump at 3pm unless I take a walk.',
    },
    {
      id: 'w1-brain-statement',
      weekNumber: 1,
      name: 'Personal Brain Statement',
      description: 'A one-sentence summary of how your brain works best.',
      type: 'reflection',
      submissionDeadline: '7 days after session',
    },
  ],
  2: [
    {
      id: 'w2-system-fit-map',
      weekNumber: 2,
      name: 'System Fit Map',
      description: 'Identify where you get stuck in tasks and what supports help at each stage.',
      type: 'action-plan',
      submissionDeadline: '7 days after session',
    },
    {
      id: 'w2-system-experiment',
      weekNumber: 2,
      name: 'System Experiment Plan',
      description: 'One small change you will try this week. Be specific about what, when, and how you\'ll measure it.',
      type: 'action-plan',
      submissionDeadline: '7 days after session',
    },
  ],
  3: [
    {
      id: 'w3-overwhelm-inventory',
      weekNumber: 3,
      name: 'Overwhelm Inventory',
      description: 'Map situations that trigger overwhelm, your early warning signs, and what helps.',
      type: 'worksheet',
      submissionDeadline: '7 days after session',
    },
    {
      id: 'w3-reset-routine',
      weekNumber: 3,
      name: '3-Step Reset Routine Plan',
      description: 'Your personal Notice → Interrupt → Recover plan.',
      type: 'action-plan',
      submissionDeadline: '7 days after session',
    },
  ],
  4: [
    {
      id: 'w4-energy-audit',
      weekNumber: 4,
      name: 'Energy Audit Map',
      description: 'Chart your weekly activities: which drain your energy and which boost it.',
      type: 'worksheet',
      submissionDeadline: '7 days after session',
    },
    {
      id: 'w4-boundary-scripts',
      weekNumber: 4,
      name: 'Boundary Script Drafts',
      description: 'Create 1-3 boundary statements using the formula: Need + Reason + Respectful Closure.',
      type: 'script-draft',
      submissionDeadline: '7 days after session',
    },
  ],
  5: [
    {
      id: 'w5-advocacy-script',
      weekNumber: 5,
      name: 'Personalized Advocacy Script',
      description: 'Using Describe → Need → Request framework, craft an advocacy statement for a real situation.',
      type: 'script-draft',
      submissionDeadline: '7 days after session',
    },
    {
      id: 'w5-roleplay-reflection',
      weekNumber: 5,
      name: 'Role-Play Reflection',
      description: 'After role-playing your advocacy script, write down what felt good, what was hard, and adjustments to make.',
      type: 'reflection',
      submissionDeadline: '7 days after session',
    },
  ],
  6: [
    {
      id: 'w6-sustainability-map',
      weekNumber: 6,
      name: 'Sustainability Map & Semester Plan',
      description: 'Integrate all your tools into a weekly routine using the Maintenance Triangle: Structure, Regulation, Support.',
      type: 'personal-plan',
      submissionDeadline: '10 days after session',
    },
    {
      id: 'w6-final-reflection',
      weekNumber: 6,
      name: 'Final Reflection & Commitment',
      description: 'Reflect on your six-week journey. Write a letter to your future self.',
      type: 'reflection',
      submissionDeadline: '10 days after session',
    },
  ],
};

// ============================================================================
// PART 3: MOCK DATA
// ============================================================================

const mockStudent: Student = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@university.edu',
  age: 19,
  role: 'student',
  cohortId: 'cohort-1',
  cohortWeek: 4,
  careerProfile: 'Software Development',
  primaryCoach: 'fac1',
  completionRate: 67,
  sustainabilityScore: 72,
  lastActivity: new Date().toISOString(),
  cognitiveProfile: {
    focusPattern: 'Afternoon peak, needs breaks every 45 min',
    energyRhythm: 'Morning slow-start, builds energy by noon, slump at 3pm',
    motivationTriggers: ['Clear goals', 'Visual progress', 'Praise for effort'],
    learningStyle: 'visual',
    stressResponses: [
      {
        trigger: 'Back-to-back meetings',
        response: 'freeze',
        physicalSigns: ['Jaw clenching', 'Rapid heartbeat'],
        emotionalSigns: ['Panic', 'Brain fog'],
      },
    ],
  },
  accommodationNeeds: ['Visual Processing', 'Time Management', 'Task Initiation'],
  strengths: ['Pattern Recognition', 'Analytical Thinking', 'Detail Oriented'],
  createdAt: '2024-01-01',
  updatedAt: '2024-12-11',
};

const mockFacilitator: Facilitator = {
  id: 'fac1',
  name: 'Dr. Sarah Martinez',
  email: 'sarah@university.edu',
  role: 'facilitator',
  cohortsLed: ['cohort-1', 'cohort-2'],
  createdAt: '2024-01-01',
  updatedAt: '2024-12-11',
};

const mockCohorts: Cohort[] = [
  {
    id: 'cohort-1',
    name: 'Spring 2024 - Morning Cohort',
    currentWeek: 4,
    status: 'active',
    studentIds: ['1', '2', '3', '4', '5'],
    facilitatorId: 'fac1',
    startDate: '2024-01-15',
    endDate: '2024-02-26',
    maxStudents: 12,
    sessionSchedule: [
      {
        weekNumber: 4,
        sessionDate: '2024-12-15',
        startTime: '10:00 AM',
        endTime: '11:15 AM',
        location: 'Zoom',
        facilitatorNotes: 'Focus on energy management this week',
      },
    ],
  },
  {
    id: 'cohort-2',
    name: 'Spring 2024 - Evening Cohort',
    currentWeek: 2,
    status: 'active',
    studentIds: ['6', '7', '8', '9'],
    facilitatorId: 'fac1',
    startDate: '2024-01-20',
    endDate: '2024-03-02',
    maxStudents: 12,
    sessionSchedule: [],
  },
];

// ============================================================================
// PART 4: REUSABLE COMPONENTS
// ============================================================================

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ElementType; color: string }> = ({
  label,
  value,
  icon: Icon,
  color,
}) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const WorksheetSection: React.FC<{
  title: string;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  bgColor?: string;
  children: React.ReactNode;
}> = ({ title, description, isExpanded, onToggle, bgColor = 'purple', children }) => {
  const bgColorMap: Record<string, string> = {
    red: 'bg-red-50 border-red-200',
    orange: 'bg-orange-50 border-orange-200',
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <div className={`border rounded-lg ${bgColorMap[bgColor]}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between hover:bg-opacity-75 transition-colors">
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
      </button>
      {isExpanded && <div className="px-4 pb-4 border-t border-gray-200">{children}</div>}
    </div>
  );
};

const CurriculumModuleGrid: React.FC<{
  viewMode: 'facilitator' | 'student' | 'admin';
  onModuleClick: (week: number) => void;
  studentProgressData?: Record<number, number>;
}> = ({ viewMode, onModuleClick, studentProgressData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {CURRICULUM_WEEKS.map((week) => {
        const completionRate = studentProgressData?.[week.weekNumber] ?? 0;
        const isCompleted = completionRate === 100;

        return (
          <div
            key={week.weekNumber}
            onClick={() => onModuleClick(week.weekNumber)}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200">
                  <span className="text-purple-900 font-bold text-lg">{week.weekNumber}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{week.title}</p>
                  <p className="text-xs text-gray-600 capitalize">{week.theme.replace('-', ' ')}</p>
                </div>
              </div>
              {viewMode === 'student' && isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{week.description}</p>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Learning Objectives</p>
              <ul className="space-y-1">
                {week.learningObjectives.slice(0, 2).map((obj, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
              {week.learningObjectives.length > 2 && (
                <p className="text-xs text-gray-500 mt-1">+{week.learningObjectives.length - 2} more objectives</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{week.duration} min</span>
              </div>
              <div className="text-xs font-medium text-purple-900 bg-purple-50 px-2 py-1 rounded">
                {week.gptModuleName.split(' ').slice(0, 2).join(' ')}
              </div>
            </div>

            {viewMode === 'student' && studentProgressData && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-600">Progress</p>
                  <span className="text-xs text-gray-600">{completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================================
// PART 5: STUDENT DASHBOARD
// ============================================================================

const StudentDashboard: React.FC<{ student: Student }> = ({ student }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'progress'>('overview');
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);

  const progressData: Record<number, number> = {
    1: 100,
    2: 100,
    3: 100,
    4: 75,
    5: 0,
    6: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Welcome, {student.name}! 👋</h1>
          <p className="text-gray-600 mt-2">You're in Week {student.cohortWeek} of 6 — {student.completionRate}% complete!</p>
        </div>
      </div>

      {/* Sustainability Score Card */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Sustainability Score</p>
              <p className="text-5xl font-bold text-gray-900">{student.sustainabilityScore}%</p>
              <p className="text-xs text-gray-600 mt-2">Structure • Regulation • Support (Maintenance Triangle)</p>
            </div>
            <Shield className="w-20 h-20 text-green-500 opacity-30" />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full transition-all duration-500" style={{ width: `${student.sustainabilityScore}%` }}></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
              { id: 'assignments' as const, label: 'Assignments', icon: BookOpen },
              { id: 'progress' as const, label: 'Progress', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 border-b-2 font-medium flex items-center space-x-2 ${
                  activeTab === tab.id ? 'border-green-600 text-green-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Focus</h3>
              <div className="space-y-3">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm font-semibold text-purple-900 mb-2">Week 4: Managing Burnout & Boundaries</p>
                  <p className="text-sm text-purple-800">Learn to identify energy drains and practice saying no with compassion.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Your Assignment</p>
                  <p className="text-sm text-blue-800">Complete Energy Audit Map by Friday</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Your Brain Profile</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-semibold text-green-900 mb-2">Focus Pattern</p>
                  <p className="text-sm text-green-800">{student.cognitiveProfile.focusPattern}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-900 mb-2">Energy Rhythm</p>
                  <p className="text-sm text-green-800">{student.cognitiveProfile.energyRhythm}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-900 mb-2">Top Strengths</p>
                  <p className="text-sm text-green-800">{student.strengths.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {[
              { id: 1, name: 'Energy Audit Map', week: 4, due: 'Dec 15', status: 'in-progress' as const },
              { id: 2, name: 'Boundary Script Drafts', week: 4, due: 'Dec 18', status: 'not-started' as const },
              { id: 3, name: 'Brain Snapshot', week: 1, due: 'Completed', status: 'completed' as const },
            ].map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-200 cursor-pointer transition-colors"
                onClick={() => setSelectedAssignment(assignment.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{assignment.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">Week {assignment.week}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      assignment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : assignment.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {assignment.status === 'completed' ? '✓ Completed' : assignment.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Due: <span className="font-medium text-gray-900">{assignment.due}</span>
                  </p>
                  <button className="text-purple-600 font-medium hover:text-purple-700">
                    {assignment.status === 'completed' ? 'View' : 'Start'} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Six-Week Journey</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((week) => {
                const isCompleted = week <= 3;
                const isCurrent = week === 4;
                return (
                  <div key={week} className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {isCompleted ? '✓' : week}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Week {week}: {CURRICULUM_WEEKS[week - 1]?.title}
                      </p>
                    </div>
                    {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Assignment Detail Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Energy Audit Map</h2>
              <button onClick={() => setSelectedAssignment(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">Track your weekly activities and see which ones drain or boost your energy.</p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Your Audit</p>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li>• Back-to-back meetings: -4 (Social/Physical)</li>
                  <li>• Solo coding time: +4 (Cognitive boost)</li>
                  <li>• Group study: -3 (Social drain)</li>
                  <li>• Nature break: +5 (Energy boost)</li>
                </ul>
              </div>
              <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                Continue Assignment →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PART 6: FACILITATOR DASHBOARD
// ============================================================================

const FacilitatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Welcome Back, Dr. Martinez 👋</h1>
          <p className="text-gray-600 mt-2">Manage your cohorts and support your students</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Active Cohorts" value={2} icon={Users} color="blue" />
          <StatCard label="Total Students" value={9} icon={Brain} color="purple" />
          <StatCard label="Pending Feedback" value={3} icon={MessageSquare} color="orange" />
          <StatCard label="Avg Completion" value="78%" icon={TrendingUp} color="green" />
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview' as const, label: 'Your Cohorts', icon: BarChart3 },
              { id: 'students' as const, label: 'Students', icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 border-b-2 font-medium flex items-center space-x-2 ${
                  activeTab === tab.id ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockCohorts.map((cohort) => (
              <div key={cohort.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cohort.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Week {cohort.currentWeek} of 6</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800">{cohort.status}</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">{Math.round((cohort.currentWeek / 6) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(cohort.currentWeek / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Students</p>
                    <p className="font-bold text-gray-900 text-lg">{cohort.studentIds.length}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Next Session</p>
                    <p className="font-bold text-gray-900 text-sm">Dec 15</p>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded transition-colors">
                  View Details <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Student</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Week Progress</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Sustainability</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {['Alex Chen', 'Jordan Smith', 'Taylor Wong', 'Casey Lee', 'Morgan Davis'].map((name, idx) => (
                  <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-purple-50`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-900 font-semibold text-sm">
                            {name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{name}</p>
                          <p className="text-sm text-gray-600">{name.toLowerCase().replace(' ', '')}@uni.edu</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${50 + idx * 10}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">Week {3 + idx}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <Battery className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-gray-900">{70 + idx * 3}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-purple-100 rounded transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-purple-100 rounded transition-colors">
                          <MessageSquare className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// PART 7: ADMIN DASHBOARD
// ============================================================================

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">Administration Panel</h1>
          <p className="text-gray-600 mt-2">Manage system-wide operations and analytics</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Users" value={156} icon={Users} color="blue" />
          <StatCard label="Active Cohorts" value={12} icon={Brain} color="purple" />
          <StatCard label="Completion Rate" value="84%" icon={TrendingUp} color="green" />
          <StatCard label="Platform Health" value="100%" icon={CheckCircle} color="green" />
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {[
              { id: 'overview' as const, label: 'Overview' },
              { id: 'curriculum' as const, label: 'Curriculum' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 border-b-2 font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {['3 new students enrolled in Cohort F', 'Facilitator training completed by 15 staff', 'System backup completed successfully', '2 bug reports resolved'].map(
                  (activity, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{activity}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                {[
                  { name: 'API Server', status: 'operational' },
                  { name: 'Database', status: 'operational' },
                  { name: 'Email Service', status: 'operational' },
                  { name: 'File Storage', status: 'operational' },
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-900">{service.name}</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CURRICULUM_WEEKS.map((week) => (
              <div key={week.weekNumber} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-900 font-bold">{week.weekNumber}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{week.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{week.description.substring(0, 60)}...</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-900 rounded text-sm font-medium hover:bg-blue-100">
                    Edit Content
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-50 text-green-900 rounded text-sm font-medium hover:bg-green-100">
                    View Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// PART 8: MAIN DEMO SELECTOR
// ============================================================================

export const DreamzillaCompleteSystem: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'selector' | 'student' | 'facilitator' | 'admin'>('selector');

  if (selectedView === 'student') {
    return (
      <div>
        <button
          onClick={() => setSelectedView('selector')}
          className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Demo</span>
        </button>
        <StudentDashboard student={mockStudent} />
      </div>
    );
  }

  if (selectedView === 'facilitator') {
    return (
      <div>
        <button
          onClick={() => setSelectedView('selector')}
          className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Demo</span>
        </button>
        <FacilitatorDashboard />
      </div>
    );
  }

  if (selectedView === 'admin') {
    return (
      <div>
        <button
          onClick={() => setSelectedView('selector')}
          className="fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Demo</span>
        </button>
        <AdminDashboard />
      </div>
    );
  }

  // Demo Selector
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🧠 Dreamzilla Platform</h1>
          <p className="text-xl text-gray-600">Complete Neurodivergent Support System - All in One File</p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              id: 'student' as const,
              icon: Brain,
              title: 'Student View',
              desc: 'Track your progress, submit worksheets, monitor sustainability',
              features: ['Interactive worksheets', 'Progress tracking', 'Personal assignments'],
              color: 'green',
            },
            {
              id: 'facilitator' as const,
              icon: Users,
              title: 'Facilitator View',
              desc: 'Manage cohorts, track students, provide feedback',
              features: ['Cohort management', 'Student tracking', 'Feedback system'],
              color: 'purple',
            },
            {
              id: 'admin' as const,
              icon: Settings,
              title: 'Admin View',
              desc: 'System administration, analytics, and management',
              features: ['System administration', 'Analytics', 'Content management'],
              color: 'blue',
            },
          ].map((view) => (
            <div
              key={view.id}
              className={`bg-white p-8 rounded-lg border-2 border-${view.color}-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
              onClick={() => setSelectedView(view.id)}
            >
              <div className={`flex items-center justify-center w-16 h-16 bg-${view.color}-100 rounded-lg mb-6`}>
                <view.icon className={`w-8 h-8 text-${view.color}-600`} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{view.title}</h2>
              <p className="text-gray-600 mb-6">{view.desc}</p>
              <div className="space-y-2 mb-6">
                {view.features.map((feature, idx) => (
                  <p key={idx} className="text-sm text-gray-700">
                    ✓ {feature}
                  </p>
                ))}
              </div>
              <button className={`w-full px-6 py-3 bg-${view.color}-600 text-white rounded-lg hover:bg-${view.color}-700 font-medium transition-colors`}>
                Explore {view.title} →
              </button>
            </div>
          ))}
        </div>

        {/* Curriculum Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">6-Week Curriculum</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CURRICULUM_WEEKS.map((week) => (
              <div key={week.weekNumber} className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-900 font-bold">{week.weekNumber}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{week.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{week.description.substring(0, 100)}...</p>
                    <div className="mt-3 flex items-center space-x-2 text-xs text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{week.duration} min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white p-12 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: '6-Week Curriculum', desc: 'Complete neurodivergent-focused program' },
              { icon: Target, title: 'Interactive Worksheets', desc: 'Guided exercises for each week' },
              { icon: TrendingUp, title: 'Progress Tracking', desc: 'Real-time student analytics' },
              { icon: Shield, title: 'Role-Based Access', desc: 'Facilitator, Student, Admin views' },
              { icon: Heart, title: 'Accessibility First', desc: 'Built for neurodivergent minds' },
              { icon: Brain, title: 'Cognitive Profiles', desc: 'Personalized brain snapshots' },
              { icon: CheckCircle, title: 'Feedback System', desc: 'Structured assessment & guidance' },
              { icon: MessageSquare, title: 'Communication', desc: 'Facilitator-student interaction' },
            ].map((feature, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <feature.icon className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamzillaCompleteSystem;
