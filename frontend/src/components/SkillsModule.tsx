
import type { Lesson } from '../types/career';
import { Clock, CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface SkillsModuleCardProps {
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  onClick: () => void;
}

export function SkillsModuleCard({
  icon,
  title,
  description,
  progress,
  total,
  onClick,
}: SkillsModuleCardProps) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;
  const isComplete = progress === total && total > 0;

  return (
    <button
      onClick={onClick}
      className="w-full bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all text-left group"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs text-primary-400 font-semibold">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-600 to-accent-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {progress} / {total} lessons
            </span>
            {isComplete ? (
              <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                <CheckCircle size={16} />
                Complete!
              </span>
            ) : (
              <span className="text-primary-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Continue
                <ArrowRight size={16} />
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  lessonNumber: number;
  isCompleted: boolean;
  onClick: () => void;
}

export function LessonCard({ lesson, lessonNumber, isCompleted, onClick }: LessonCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl p-4 border transition-all text-left ${
        isCompleted
          ? 'bg-green-900/20 border-green-700/30 hover:border-green-600'
          : 'bg-gray-800 border-gray-700 hover:border-primary-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle size={24} className="text-green-400" />
          ) : (
            <Circle size={24} className="text-gray-600" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs text-gray-500 uppercase">Lesson {lessonNumber}</span>
              <h4 className="text-lg font-semibold text-white">{lesson.title}</h4>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock size={14} />
              <span>{lesson.duration} min</span>
            </div>
          </div>
          {isCompleted && (
            <span className="text-sm text-green-400 font-semibold">✓ Completed</span>
          )}
        </div>
      </div>
    </button>
  );
}

interface LessonContentProps {
  lesson: Lesson;
  lessonNumber: number;
  onComplete: () => void;
  onBack: () => void;
}

export function LessonContent({ lesson, lessonNumber, onComplete, onBack }: LessonContentProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="text-sm text-gray-500 uppercase">Lesson {lessonNumber}</span>
        <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
        <div className="flex items-center gap-2 text-gray-400">
          <Clock size={16} />
          <span>{lesson.duration} minutes</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
        <div className="prose prose-invert max-w-none">
          {lesson.content.split('\n\n').map((paragraph, idx) => {
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
        <p className="text-gray-300">{lesson.exercise}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary flex-1">
          Back to Lessons
        </button>
        <button onClick={onComplete} className="btn-primary flex-1">
          Mark Complete & Continue
        </button>
      </div>
    </div>
  );
}
