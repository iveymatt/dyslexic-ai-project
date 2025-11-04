import { useState, useEffect } from 'react';
import type { UserProfile } from '../../types/career';
import { lifeSkillsModules } from '../../data/careerDiscovery/lifeSkills';
import { SkillsModuleCard, LessonCard, LessonContent } from '../../components/SkillsModule';
import { BookOpen, Heart } from 'lucide-react';

interface LifeSkillsCoachProps {
  onBack: () => void;
}

export function LifeSkillsCoach({ onBack }: LifeSkillsCoachProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('careerDiscoveryProfile');
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setUserProfile(profile);
        // Load completed lessons from profile
        const completed = new Set<string>();
        Object.keys(profile.lifeSkillsProgress || {}).forEach((moduleId) => {
          const progress = profile.lifeSkillsProgress[moduleId];
          for (let i = 0; i < progress; i++) {
            completed.add(`${moduleId}-${i}`);
          }
        });
        setCompletedLessons(completed);
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }
  }, []);

  const handleLessonComplete = () => {
    if (!selectedModule || selectedLesson === null || !userProfile) return;

    const lessonKey = `${selectedModule}-${selectedLesson}`;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonKey);
    setCompletedLessons(newCompleted);

    // Update profile
    const module = lifeSkillsModules.find((m) => m.id === selectedModule);
    if (module) {
      const completedCount = Array.from(newCompleted).filter((key) => key.startsWith(selectedModule)).length;
      const updated = {
        ...userProfile,
        lifeSkillsProgress: {
          ...userProfile.lifeSkillsProgress,
          [selectedModule]: Math.round((completedCount / module.lessons.length) * 100),
        },
      };
      localStorage.setItem('careerDiscoveryProfile', JSON.stringify(updated));
      setUserProfile(updated);
    }

    // Go back to lessons list
    setSelectedLesson(null);
  };

  // Viewing specific lesson
  if (selectedModule && selectedLesson !== null) {
    const module = lifeSkillsModules.find((m) => m.id === selectedModule);
    if (module && module.lessons[selectedLesson]) {
      return (
        <div className="min-h-screen bg-gray-900 text-white">
          <div className="container mx-auto px-6 py-8">
            <LessonContent
              lesson={module.lessons[selectedLesson]}
              lessonNumber={selectedLesson + 1}
              onComplete={handleLessonComplete}
              onBack={() => setSelectedLesson(null)}
            />
          </div>
        </div>
      );
    }
  }

  // Viewing module lessons
  if (selectedModule) {
    const module = lifeSkillsModules.find((m) => m.id === selectedModule);
    if (module) {
      return (
        <div className="min-h-screen bg-gray-900 text-white">
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{module.icon}</span>
                    <h1 className="text-3xl font-bold">{module.title}</h1>
                  </div>
                  <p className="text-gray-400">{module.description}</p>
                </div>
                <button onClick={() => setSelectedModule(null)} className="btn-secondary">
                  ← Back
                </button>
              </div>

              {/* Affirmation */}
              <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl p-6 border border-pink-700/30 mb-8">
                <div className="flex items-start gap-3">
                  <Heart className="text-pink-400 flex-shrink-0 mt-1" size={24} />
                  <p className="text-lg text-pink-100">{module.affirmation}</p>
                </div>
              </div>

              {/* Lessons */}
              <div className="space-y-4">
                {module.lessons.map((lesson, idx) => {
                  const isCompleted = completedLessons.has(`${module.id}-${idx}`);
                  return (
                    <LessonCard
                      key={idx}
                      lesson={lesson}
                      lessonNumber={idx + 1}
                      isCompleted={isCompleted}
                      onClick={() => setSelectedLesson(idx)}
                    />
                  );
                })}
              </div>

              {/* Practice Activity */}
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-bold mb-3">Final Practice Activity</h3>
                <p className="text-gray-300">{module.practiceActivity}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // Main modules view
  const getModuleProgress = (moduleId: string) => {
    const module = lifeSkillsModules.find((m) => m.id === moduleId);
    if (!module) return { completed: 0, total: 0 };
    const completed = Array.from(completedLessons).filter((key) => key.startsWith(moduleId)).length;
    return { completed, total: module.lessons.length };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="text-green-400" size={32} />
                <h1 className="text-4xl font-bold">Life Skills Coach</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Master the skills you need for adult life. Built for neurodivergent brains.
              </p>
            </div>
            <button onClick={onBack} className="btn-secondary">
              ← Back
            </button>
          </div>

          {/* Intro */}
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-700/30 mb-8">
            <h2 className="text-2xl font-bold mb-4">5 Core Program Themes</h2>
            <p className="text-gray-300 mb-4">
              These themes connect across Career Matching, Life Skills, and AI Literacy. Master these areas to build a sustainable career and independent life.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 flex-shrink-0">🧠</span>
                <span><strong>Capacity & Executive Function:</strong> Planning, task initiation, flexibility, sustained attention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 flex-shrink-0">📅</span>
                <span><strong>Organizing Systems:</strong> Calendars, notes, deadlines that move from school to work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0">❤️</span>
                <span><strong>Sensory & Emotional Regulation:</strong> Prevent burnout, manage sensory challenges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-400 flex-shrink-0">🛡️</span>
                <span><strong>Masking & Camouflaging:</strong> Unmask safely, reduce cognitive load</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 flex-shrink-0">💬</span>
                <span><strong>Communication & Self-Advocacy:</strong> Scripts, confidence, professional communication</span>
              </li>
            </ul>
          </div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {lifeSkillsModules.map((module) => {
              const progress = getModuleProgress(module.id);
              return (
                <SkillsModuleCard
                  key={module.id}
                  icon={module.icon}
                  title={module.title}
                  description={module.description}
                  progress={progress.completed}
                  total={progress.total}
                  color={module.color}
                  onClick={() => setSelectedModule(module.id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
