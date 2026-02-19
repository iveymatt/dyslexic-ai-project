import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProfile } from '../../types/career';
import { aiLiteracyModules } from '../../data/careerDiscovery/aiLiteracy';
import { Lightbulb, Award, Clock } from 'lucide-react';

export function AILiteracy() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('careerDiscoveryProfile');
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setUserProfile(profile);
        // Load completed modules from profile
        const completed = new Set<string>(
          Object.keys(profile.aiLiteracyProgress || {}).filter((id) => profile.aiLiteracyProgress[id])
        );
        setCompletedModules(completed);
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }
  }, []);

  const handleModuleComplete = () => {
    if (selectedModule === null || !userProfile) return;

    const moduleId = aiLiteracyModules[selectedModule].id;
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    setCompletedModules(newCompleted);

    // Update profile
    const updated = {
      ...userProfile,
      aiLiteracyProgress: {
        ...userProfile.aiLiteracyProgress,
        [moduleId]: true,
      },
    };
    localStorage.setItem('careerDiscoveryProfile', JSON.stringify(updated));
    setUserProfile(updated);

    // Go back to modules list
    setSelectedModule(null);
  };

  // Viewing specific module
  if (selectedModule !== null) {
    const module = aiLiteracyModules[selectedModule];
    const isCompleted = completedModules.has(module.id);

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <span className="text-sm text-gray-500 uppercase">Module {module.moduleNumber} of 10</span>
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={16} />
                <span>{module.duration} minutes</span>
              </div>
            </div>

            {/* Content */}
            <div className="bg-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
              <div className="prose prose-invert max-w-none">
                {module.content.split('\n\n').map((paragraph, idx) => {
                  // Check if it's a list item
                  if (paragraph.trim().startsWith('-')) {
                    const items = paragraph.split('\n').filter((line) => line.trim());
                    return (
                      <ul key={idx} className="space-y-2 my-4 list-disc list-inside">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-300">
                            {item.replace(/^-\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Bold text
                  if (paragraph.includes('**')) {
                    const parts = paragraph.split('**');
                    return (
                      <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                        {parts.map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i} className="text-white font-semibold">
                              {part}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    );
                  }
                  return (
                    <p key={idx} className="text-gray-300 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Exercise */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">💪 Your Exercise</h3>
              <p className="text-gray-300">{module.exercise}</p>
            </div>

            {/* Sample Prompt */}
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-300 mb-3">🤖 Sample Prompt to Try</h3>
              <code className="block bg-gray-900 rounded-lg p-4 text-green-200 text-sm font-mono overflow-x-auto">
                {module.samplePrompt}
              </code>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button onClick={() => setSelectedModule(null)} className="btn-secondary flex-1">
                Back to Modules
              </button>
              <button
                onClick={handleModuleComplete}
                className="btn-primary flex-1"
                disabled={isCompleted}
              >
                {isCompleted ? '✓ Completed' : 'Mark Complete & Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main modules view
  const completedCount = completedModules.size;
  const totalModules = aiLiteracyModules.length;
  const percentage = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="text-yellow-400" size={32} />
                <h1 className="text-4xl font-bold">AI Literacy Course</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Master AI tools for job search, learning, and daily life
              </p>
            </div>
            <button onClick={() => navigate('/career-discovery')} className="btn-secondary">
              ← Back
            </button>
          </div>

          {/* Progress */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-8 border border-yellow-700/30 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Progress</h2>
                <p className="text-gray-300">
                  {completedCount} of {totalModules} modules completed
                </p>
              </div>
              {percentage === 100 && (
                <div className="flex items-center gap-2 text-green-400">
                  <Award size={32} />
                  <span className="text-xl font-bold">AI Literate!</span>
                </div>
              )}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-600 to-orange-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Intro */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 flex-shrink-0">✓</span>
                <span className="text-gray-300">What AI is and how it works</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 flex-shrink-0">✓</span>
                <span className="text-gray-300">How to write effective prompts</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 flex-shrink-0">✓</span>
                <span className="text-gray-300">Using AI for job search & career</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 flex-shrink-0">✓</span>
                <span className="text-gray-300">AI as your personal tutor</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 flex-shrink-0">✓</span>
                <span className="text-gray-300">AI for daily life tasks</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 flex-shrink-0">✓</span>
                <span className="text-gray-300">AI safety and ethics</span>
              </div>
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiLiteracyModules.map((module, idx) => {
              const isCompleted = completedModules.has(module.id);
              return (
                <button
                  key={module.id}
                  onClick={() => setSelectedModule(idx)}
                  className={`text-left rounded-xl p-6 border transition-all ${
                    isCompleted
                      ? 'bg-green-900/20 border-green-700/30 hover:border-green-600'
                      : 'bg-gray-800 border-gray-700 hover:border-yellow-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-sm font-semibold uppercase ${
                      isCompleted ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      Module {module.moduleNumber}
                    </span>
                    {isCompleted && (
                      <span className="text-green-400 font-bold">✓</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{module.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock size={14} />
                    <span>{module.duration} min</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Final Message */}
          {percentage === 100 && (
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-700/30 mt-8 text-center">
              <Award size={48} className="text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
              <p className="text-xl text-gray-300 mb-4">
                You've completed the AI Literacy course. You now understand how to use AI effectively for work, learning, and life.
              </p>
              <p className="text-gray-400">
                Keep practicing, stay curious, and remember: AI is a tool. YOU are the human with judgment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
