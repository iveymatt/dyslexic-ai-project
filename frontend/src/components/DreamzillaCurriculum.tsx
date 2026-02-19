import { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  Users,
  FileText,
  Award,
  Target,
  TrendingUp,
  Clock,
  Download,
  Upload,
  MessageCircle,
  BarChart
} from 'lucide-react';

// Type definitions
interface Week {
  id: number;
  title: string;
  theme: string;
  description: string;
  sessions: Session[];
  deliverables: string[];
}

interface Session {
  id: number;
  title: string;
  duration: string;
  type: 'lecture' | 'workshop' | 'discussion' | 'practice';
  topics: string[];
  worksheet?: string;
}

interface StudentProgress {
  studentId: string;
  studentName: string;
  weekProgress: Record<number, number>; // week id -> completion percentage
  worksheetsCompleted: number[];
  sustainabilityScore: number;
  lastActive: string;
}

interface Cohort {
  id: string;
  name: string;
  startDate: string;
  facilitator: string;
  students: StudentProgress[];
  currentWeek: number;
}

type ViewMode = 'student' | 'facilitator' | 'admin';

// Mock curriculum data
const CURRICULUM: Week[] = [
  {
    id: 1,
    title: 'Week 1: Foundation & Self-Discovery',
    theme: 'Understanding Your Neurodivergent Strengths',
    description: 'Build awareness of cognitive patterns, strengths, and workplace needs',
    sessions: [
      {
        id: 1,
        title: 'Welcome & Program Overview',
        duration: '90 min',
        type: 'lecture',
        topics: ['Program goals', 'Community building', 'What to expect'],
        worksheet: 'Personal Goals Worksheet'
      },
      {
        id: 2,
        title: 'Cognitive Profile Mapping',
        duration: '120 min',
        type: 'workshop',
        topics: ['Strengths inventory', 'Challenge identification', 'Sensory preferences'],
        worksheet: 'Cognitive Profile Map'
      },
      {
        id: 3,
        title: 'Workplace Accommodations 101',
        duration: '90 min',
        type: 'discussion',
        topics: ['ADA rights', 'Common accommodations', 'Disclosure strategies']
      }
    ],
    deliverables: ['Completed Cognitive Profile', 'Personal Goals Document', 'Week 1 Reflection']
  },
  {
    id: 2,
    title: 'Week 2: Executive Function & Organization',
    theme: 'Building Systems That Work for Your Brain',
    description: 'Practical strategies for planning, task initiation, and time management',
    sessions: [
      {
        id: 4,
        title: 'Executive Function Deep Dive',
        duration: '90 min',
        type: 'lecture',
        topics: ['Working memory', 'Task initiation', 'Cognitive flexibility'],
        worksheet: 'EF Challenges Assessment'
      },
      {
        id: 5,
        title: 'Time Management Workshop',
        duration: '120 min',
        type: 'workshop',
        topics: ['Time blocking', 'Calendar systems', 'Digital tools', 'Visual schedules'],
        worksheet: 'Weekly Schedule Builder'
      },
      {
        id: 6,
        title: 'Task Management Systems',
        duration: '90 min',
        type: 'practice',
        topics: ['Breaking down projects', 'Priority frameworks', 'Reminder strategies']
      }
    ],
    deliverables: ['Personal Time Management System', 'Task Management Template', 'Week 2 Reflection']
  },
  {
    id: 3,
    title: 'Week 3: Communication & Self-Advocacy',
    theme: 'Finding Your Voice in Professional Settings',
    description: 'Scripts, strategies, and confidence for workplace communication',
    sessions: [
      {
        id: 7,
        title: 'Professional Communication Styles',
        duration: '90 min',
        type: 'lecture',
        topics: ['Direct vs indirect', 'Written vs verbal', 'Email etiquette'],
        worksheet: 'Communication Preferences'
      },
      {
        id: 8,
        title: 'Self-Advocacy Scripts',
        duration: '120 min',
        type: 'workshop',
        topics: ['Requesting accommodations', 'Feedback conversations', 'Boundary setting'],
        worksheet: 'Script Builder'
      },
      {
        id: 9,
        title: 'Role-Play Practice',
        duration: '90 min',
        type: 'practice',
        topics: ['Interview scenarios', 'Conflict resolution', 'Performance reviews']
      }
    ],
    deliverables: ['Personal Communication Guide', 'Self-Advocacy Scripts', 'Week 3 Reflection']
  },
  {
    id: 4,
    title: 'Week 4: Sensory & Emotional Regulation',
    theme: 'Managing Energy and Preventing Burnout',
    description: 'Strategies for sensory processing and emotional wellness at work',
    sessions: [
      {
        id: 10,
        title: 'Sensory Processing at Work',
        duration: '90 min',
        type: 'lecture',
        topics: ['Sensory profiles', 'Workplace triggers', 'Environmental modifications'],
        worksheet: 'Sensory Needs Inventory'
      },
      {
        id: 11,
        title: 'Regulation Toolkit Workshop',
        duration: '120 min',
        type: 'workshop',
        topics: ['Breathing techniques', 'Movement breaks', 'Sensory tools', 'Energy management'],
        worksheet: 'Personal Regulation Plan'
      },
      {
        id: 12,
        title: 'Burnout Prevention',
        duration: '90 min',
        type: 'discussion',
        topics: ['Warning signs', 'Recovery strategies', 'Sustainable routines']
      }
    ],
    deliverables: ['Sensory Toolkit', 'Energy Management Plan', 'Week 4 Reflection']
  },
  {
    id: 5,
    title: 'Week 5: Masking & Authenticity',
    theme: 'Unmasking Safely in Professional Contexts',
    description: 'Reduce cognitive load while maintaining professional presence',
    sessions: [
      {
        id: 13,
        title: 'Understanding Masking',
        duration: '90 min',
        type: 'lecture',
        topics: ['What is masking', 'Costs of masking', 'Cultural context'],
        worksheet: 'Masking Assessment'
      },
      {
        id: 14,
        title: 'Authentic Professional Identity',
        duration: '120 min',
        type: 'workshop',
        topics: ['Values alignment', 'Selective disclosure', 'Building confidence'],
        worksheet: 'Authenticity Action Plan'
      },
      {
        id: 15,
        title: 'Community Circle',
        duration: '90 min',
        type: 'discussion',
        topics: ['Shared experiences', 'Support strategies', 'Celebrating neurodivergence']
      }
    ],
    deliverables: ['Masking Reduction Strategy', 'Professional Identity Statement', 'Week 5 Reflection']
  },
  {
    id: 6,
    title: 'Week 6: Career Planning & Next Steps',
    theme: 'Creating Your Sustainable Career Path',
    description: 'Integrate learnings into actionable career development plan',
    sessions: [
      {
        id: 16,
        title: 'Career Matching Review',
        duration: '90 min',
        type: 'lecture',
        topics: ['Cognitive fit', 'Job analysis', 'Industry research'],
        worksheet: 'Career Exploration Guide'
      },
      {
        id: 17,
        title: 'Building Your Action Plan',
        duration: '120 min',
        type: 'workshop',
        topics: ['Goal setting', 'Timeline creation', 'Resource mapping', 'Support network'],
        worksheet: 'Career Action Plan'
      },
      {
        id: 18,
        title: 'Program Celebration & Graduation',
        duration: '90 min',
        type: 'discussion',
        topics: ['Sharing wins', 'Ongoing support', 'Alumni network']
      }
    ],
    deliverables: ['Final Career Action Plan', 'Sustainability Commitment', 'Program Portfolio']
  }
];

const MOCK_COHORT: Cohort = {
  id: 'cohort-2025-01',
  name: 'January 2025 Cohort',
  startDate: '2025-01-15',
  facilitator: 'Dr. Sarah Martinez',
  currentWeek: 3,
  students: [
    {
      studentId: 's1',
      studentName: 'Alex Chen',
      weekProgress: { 1: 100, 2: 100, 3: 60, 4: 0, 5: 0, 6: 0 },
      worksheetsCompleted: [1, 2, 4, 5, 7],
      sustainabilityScore: 78,
      lastActive: '2 hours ago'
    },
    {
      studentId: 's2',
      studentName: 'Jordan Taylor',
      weekProgress: { 1: 100, 2: 90, 3: 30, 4: 0, 5: 0, 6: 0 },
      worksheetsCompleted: [1, 2, 4, 7],
      sustainabilityScore: 72,
      lastActive: '1 day ago'
    },
    {
      studentId: 's3',
      studentName: 'Sam Rivera',
      weekProgress: { 1: 100, 2: 100, 3: 80, 4: 0, 5: 0, 6: 0 },
      worksheetsCompleted: [1, 2, 4, 5, 7, 8],
      sustainabilityScore: 85,
      lastActive: '30 minutes ago'
    }
  ]
};

export function DreamzillaCurriculum() {
  const [viewMode, setViewMode] = useState<ViewMode>('student');
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // Student View
  const renderStudentView = () => {
    const currentStudent = MOCK_COHORT.students[0]; // Mock current user
    const week = CURRICULUM[selectedWeek - 1];

    return (
      <div className="space-y-6">
        {/* Progress Overview */}
        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-700/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Welcome back, {currentStudent.studentName}!</h3>
              <p className="text-earth-600">Current Week: Week {MOCK_COHORT.currentWeek} - {CURRICULUM[MOCK_COHORT.currentWeek - 1].theme}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">{currentStudent.sustainabilityScore}</div>
              <div className="text-sm text-earth-500">Sustainability Score</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-earth-500">
              <span>Overall Progress</span>
              <span>{Math.round((currentStudent.worksheetsCompleted.length / 18) * 100)}%</span>
            </div>
            <div className="w-full bg-earth-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${(currentStudent.worksheetsCompleted.length / 18) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="grid grid-cols-6 gap-2">
          {CURRICULUM.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWeek(w.id)}
              className={`p-3 rounded-lg border transition-all text-center ${
                selectedWeek === w.id
                  ? 'bg-blue-600 border-blue-500'
                  : currentStudent.weekProgress[w.id] === 100
                  ? 'bg-green-900/30 border-green-700/50 hover:border-green-600'
                  : currentStudent.weekProgress[w.id] > 0
                  ? 'bg-yellow-900/30 border-yellow-700/50 hover:border-yellow-600'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              <div className="font-bold text-sm">Week {w.id}</div>
              {currentStudent.weekProgress[w.id] === 100 && (
                <CheckCircle size={16} className="text-green-400 mx-auto mt-1" />
              )}
              {currentStudent.weekProgress[w.id] > 0 && currentStudent.weekProgress[w.id] < 100 && (
                <Clock size={16} className="text-yellow-400 mx-auto mt-1" />
              )}
            </button>
          ))}
        </div>

        {/* Selected Week Content */}
        <div className="bg-white rounded-xl p-6 border border-earth-200">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-blue-400" size={24} />
              <h3 className="text-2xl font-bold">{week.title}</h3>
            </div>
            <p className="text-xl text-blue-300 font-semibold mb-2">{week.theme}</p>
            <p className="text-earth-500">{week.description}</p>
          </div>

          {/* Sessions */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-lg">Sessions</h4>
            {week.sessions.map((session) => (
              <div key={session.id} className="bg-earth-50 rounded-lg p-4 border border-earth-200/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold">{session.title}</h5>
                      <span className={`text-xs px-2 py-1 rounded ${
                        session.type === 'lecture' ? 'bg-blue-900/40 text-blue-300' :
                        session.type === 'workshop' ? 'bg-purple-900/40 text-purple-300' :
                        session.type === 'discussion' ? 'bg-green-900/40 text-green-300' :
                        'bg-orange-900/40 text-orange-300'
                      }`}>
                        {session.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-earth-500 mb-2">
                      <Clock size={14} />
                      {session.duration}
                    </div>
                  </div>
                </div>
                <ul className="text-sm text-earth-500 space-y-1 mb-3">
                  {session.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full" />
                      {topic}
                    </li>
                  ))}
                </ul>
                {session.worksheet && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileText size={14} className="text-yellow-400" />
                    <span className="text-yellow-300">{session.worksheet}</span>
                    <button className="ml-auto text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Deliverables */}
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="text-yellow-400" size={20} />
              Week Deliverables
            </h4>
            <ul className="space-y-2">
              {week.deliverables.map((deliverable, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={14} className="text-yellow-400" />
                  <span className="text-earth-600">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Facilitator View
  const renderFacilitatorView = () => {
    return (
      <div className="space-y-6">
        {/* Cohort Overview */}
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 border border-purple-700/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{MOCK_COHORT.name}</h3>
              <p className="text-earth-600">Facilitator: {MOCK_COHORT.facilitator}</p>
              <p className="text-earth-500 text-sm">Started: {MOCK_COHORT.startDate} • Current Week: {MOCK_COHORT.currentWeek}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">{MOCK_COHORT.students.length}</div>
              <div className="text-sm text-earth-500">Students</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.round(MOCK_COHORT.students.reduce((sum, s) => sum + (s.weekProgress[MOCK_COHORT.currentWeek] || 0), 0) / MOCK_COHORT.students.length)}%
              </div>
              <div className="text-xs text-earth-500 mt-1">Avg Current Week Progress</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {Math.round(MOCK_COHORT.students.reduce((sum, s) => sum + s.sustainabilityScore, 0) / MOCK_COHORT.students.length)}
              </div>
              <div className="text-xs text-earth-500 mt-1">Avg Sustainability Score</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {MOCK_COHORT.students.filter(s => s.lastActive.includes('hour') || s.lastActive.includes('minute')).length}
              </div>
              <div className="text-xs text-earth-500 mt-1">Active Today</div>
            </div>
          </div>
        </div>

        {/* Student Progress Table */}
        <div className="bg-white rounded-xl border border-earth-200 overflow-hidden">
          <div className="p-4 border-b border-earth-200 flex items-center justify-between">
            <h3 className="font-semibold text-lg">Student Progress</h3>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <Download size={14} />
              Export Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-earth-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-earth-500">Student</th>
                  <th className="text-center p-4 text-sm font-medium text-earth-500">Week 1</th>
                  <th className="text-center p-4 text-sm font-medium text-earth-500">Week 2</th>
                  <th className="text-center p-4 text-sm font-medium text-earth-500">Week 3</th>
                  <th className="text-center p-4 text-sm font-medium text-earth-500">Sustainability</th>
                  <th className="text-center p-4 text-sm font-medium text-earth-500">Last Active</th>
                  <th className="text-center p-4 text-sm font-medium text-earth-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COHORT.students.map((student) => (
                  <tr key={student.studentId} className="border-t border-earth-200 hover:bg-earth-100/30">
                    <td className="p-4">
                      <div className="font-medium">{student.studentName}</div>
                      <div className="text-xs text-earth-500">{student.worksheetsCompleted.length} worksheets completed</div>
                    </td>
                    {[1, 2, 3].map((week) => (
                      <td key={week} className="p-4 text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold ${
                          student.weekProgress[week] === 100 ? 'bg-green-600 text-white' :
                          student.weekProgress[week] >= 60 ? 'bg-yellow-600 text-white' :
                          student.weekProgress[week] > 0 ? 'bg-orange-600 text-white' :
                          'bg-earth-100 text-earth-500'
                        }`}>
                          {student.weekProgress[week] || 0}%
                        </div>
                      </td>
                    ))}
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp size={16} className={
                          student.sustainabilityScore >= 80 ? 'text-green-400' :
                          student.sustainabilityScore >= 60 ? 'text-yellow-400' :
                          'text-orange-400'
                        } />
                        <span className="font-bold">{student.sustainabilityScore}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm text-earth-500">{student.lastActive}</td>
                    <td className="p-4 text-center">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Week-by-Week Curriculum */}
        <div className="bg-white rounded-xl p-6 border border-earth-200">
          <h3 className="font-semibold text-lg mb-4">Curriculum Overview</h3>
          <div className="space-y-3">
            {CURRICULUM.map((week) => (
              <div key={week.id} className="bg-earth-50 rounded-lg p-4 border border-earth-200/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{week.title}</h4>
                    <p className="text-sm text-blue-300 mb-2">{week.theme}</p>
                    <div className="flex items-center gap-4 text-xs text-earth-500">
                      <span>{week.sessions.length} sessions</span>
                      <span>{week.deliverables.length} deliverables</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-medium ${
                    week.id < MOCK_COHORT.currentWeek ? 'bg-green-900/40 text-green-300' :
                    week.id === MOCK_COHORT.currentWeek ? 'bg-blue-900/40 text-blue-300' :
                    'bg-earth-100 text-earth-500'
                  }`}>
                    {week.id < MOCK_COHORT.currentWeek ? 'Completed' :
                     week.id === MOCK_COHORT.currentWeek ? 'Current' :
                     'Upcoming'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Admin View
  const renderAdminView = () => {
    return (
      <div className="space-y-6">
        {/* Platform Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-5 border border-blue-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-blue-400" size={20} />
              <h4 className="font-semibold">Total Students</h4>
            </div>
            <p className="text-3xl font-bold">24</p>
            <p className="text-xs text-earth-500 mt-1">Across 3 cohorts</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-5 border border-green-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-green-400" size={20} />
              <h4 className="font-semibold">Completions</h4>
            </div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-xs text-earth-500 mt-1">50% completion rate</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-5 border border-purple-700/50">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="text-purple-400" size={20} />
              <h4 className="font-semibold">Avg Engagement</h4>
            </div>
            <p className="text-3xl font-bold">87%</p>
            <p className="text-xs text-earth-500 mt-1">Weekly activity rate</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 rounded-xl p-5 border border-yellow-700/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-yellow-400" size={20} />
              <h4 className="font-semibold">Avg Sustainability</h4>
            </div>
            <p className="text-3xl font-bold">76</p>
            <p className="text-xs text-earth-500 mt-1">Across all students</p>
          </div>
        </div>

        {/* Active Cohorts */}
        <div className="bg-white rounded-xl p-6 border border-earth-200">
          <h3 className="font-semibold text-lg mb-4">Active Cohorts</h3>
          <div className="space-y-4">
            {[MOCK_COHORT,
              { ...MOCK_COHORT, id: 'cohort-2024-12', name: 'December 2024 Cohort', currentWeek: 6, students: [{ ...MOCK_COHORT.students[0], studentName: 'Previous Student' }] },
              { ...MOCK_COHORT, id: 'cohort-2024-11', name: 'November 2024 Cohort', currentWeek: 6, students: [] }
            ].map((cohort) => (
              <div key={cohort.id} className="bg-earth-50 rounded-lg p-4 border border-earth-200/50">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold mb-1">{cohort.name}</h4>
                    <p className="text-sm text-earth-500">Facilitator: {cohort.facilitator}</p>
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-medium ${
                    cohort.currentWeek === 6 ? 'bg-green-900/40 text-green-300' : 'bg-blue-900/40 text-blue-300'
                  }`}>
                    {cohort.currentWeek === 6 ? 'Completed' : `Week ${cohort.currentWeek}`}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-earth-500 text-xs mb-1">Students</div>
                    <div className="font-semibold">{cohort.students.length}</div>
                  </div>
                  <div>
                    <div className="text-earth-500 text-xs mb-1">Start Date</div>
                    <div className="font-semibold">{cohort.startDate}</div>
                  </div>
                  <div>
                    <div className="text-earth-500 text-xs mb-1">Progress</div>
                    <div className="font-semibold">{Math.round((cohort.currentWeek / 6) * 100)}%</div>
                  </div>
                  <div className="text-right">
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Manage →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl p-6 border border-earth-200">
          <h3 className="font-semibold text-lg mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-700/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-sm">All systems operational</span>
              </div>
              <span className="text-xs text-earth-500">Last checked: 2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg border border-earth-200/30">
              <div className="flex items-center gap-2">
                <Upload className="text-blue-400" size={20} />
                <span className="text-sm">24 worksheets submitted this week</span>
              </div>
              <button className="text-xs text-blue-400 hover:text-blue-300">View →</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-earth-50 rounded-lg border border-earth-200/30">
              <div className="flex items-center gap-2">
                <MessageCircle className="text-purple-400" size={20} />
                <span className="text-sm">12 pending facilitator messages</span>
              </div>
              <button className="text-xs text-blue-400 hover:text-blue-300">Review →</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-earth-800 p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Dreamzilla Curriculum</h1>
              <p className="text-earth-500">6-Week Neurodivergent Workforce Readiness Program</p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setViewMode('student')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'student'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-earth-500 hover:bg-earth-100'
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => setViewMode('facilitator')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'facilitator'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-earth-500 hover:bg-earth-100'
              }`}
            >
              Facilitator View
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'admin'
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-earth-500 hover:bg-earth-100'
              }`}
            >
              Admin View
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'student' && renderStudentView()}
        {viewMode === 'facilitator' && renderFacilitatorView()}
        {viewMode === 'admin' && renderAdminView()}
      </div>
    </div>
  );
}
