
import type { Lesson } from '../types/career';
import { Clock, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { TeachableMomentCard } from './career/TeachableMomentCard';

interface SkillsModuleCardProps {
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  color?: string;
  onClick: () => void;
}

export function SkillsModuleCard({
  icon,
  title,
  description,
  progress,
  total,
  color = 'primary',
  onClick,
}: SkillsModuleCardProps) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;
  const isComplete = progress === total && total > 0;

  // Map theme colors to Tailwind classes
  const colorMap: Record<string, { border: string; hover: string; text: string; gradient: string }> = {
    purple: {
      border: 'border-purple-700/50',
      hover: 'hover:border-purple-500',
      text: 'text-purple-400',
      gradient: 'from-purple-600 to-purple-700',
    },
    blue: {
      border: 'border-blue-700/50',
      hover: 'hover:border-blue-500',
      text: 'text-blue-400',
      gradient: 'from-blue-600 to-blue-700',
    },
    green: {
      border: 'border-green-700/50',
      hover: 'hover:border-green-500',
      text: 'text-green-400',
      gradient: 'from-green-600 to-green-700',
    },
    pink: {
      border: 'border-pink-700/50',
      hover: 'hover:border-pink-500',
      text: 'text-pink-400',
      gradient: 'from-pink-600 to-pink-700',
    },
    cyan: {
      border: 'border-cyan-700/50',
      hover: 'hover:border-cyan-500',
      text: 'text-cyan-400',
      gradient: 'from-cyan-600 to-cyan-700',
    },
    primary: {
      border: 'border-earth-200',
      hover: 'hover:border-cyan-500',
      text: 'text-cyan-500',
      gradient: 'from-cyan-500 to-magenta-500',
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <button
      onClick={onClick}
      className={`w-full bg-white rounded-xl p-6 border ${colors.border} ${colors.hover} transition-all text-left group`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold text-earth-800 mb-2 group-hover:${colors.text} transition-colors`}>
            {title}
          </h3>
          <p className="text-earth-500 text-sm mb-4">{description}</p>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-earth-400">Progress</span>
              <span className={`text-xs ${colors.text} font-semibold`}>{percentage}%</span>
            </div>
            <div className="w-full bg-earth-100 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${colors.gradient} h-full rounded-full transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-earth-400">
              {progress} / {total} lessons
            </span>
            {isComplete ? (
              <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                <CheckCircle size={16} />
                Complete!
              </span>
            ) : (
              <span className={`${colors.text} text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all`}>
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
          : 'bg-white border-earth-200 hover:border-cyan-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle size={24} className="text-green-400" />
          ) : (
            <Circle size={24} className="text-earth-400" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs text-earth-400 uppercase">Lesson {lessonNumber}</span>
              <h4 className="text-lg font-semibold text-earth-800">{lesson.title}</h4>
            </div>
            <div className="flex items-center gap-1 text-earth-500 text-sm">
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
  userProfile?: {
    leaderboardScore?: number;
    strengths?: string[];
    challenges?: string[];
  };
}

export function LessonContent({ lesson, lessonNumber, onComplete, onBack, userProfile }: LessonContentProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <span className="text-sm text-earth-400 uppercase">Lesson {lessonNumber}</span>
        <h1 className="text-3xl font-bold text-earth-800 mb-2">{lesson.title}</h1>
        <div className="flex items-center gap-2 text-earth-500">
          <Clock size={16} />
          <span>{lesson.duration} minutes</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-8 mb-6 border border-earth-200">
        <div className="prose max-w-none">
          {lesson.content.split('\n\n').map((paragraph, idx) => {
            // Check if it's a list item
            if (paragraph.trim().startsWith('-')) {
              const items = paragraph.split('\n').filter((line) => line.trim());
              return (
                <ul key={idx} className="space-y-2 my-4 list-disc list-inside">
                  {items.map((item, i) => (
                    <li key={i} className="text-earth-600">
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
                <p key={idx} className="text-earth-600 mb-4 leading-relaxed">
                  {parts.map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="text-earth-800 font-semibold">
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
              <p key={idx} className="text-earth-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Exercise */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-3">💪 Your Exercise</h3>
        <p className="text-earth-600">{lesson.exercise}</p>
      </div>

      {/* Teachable Moment */}
      {lesson.teachableMoment && (
        <TeachableMomentCard teachableMoment={lesson.teachableMoment} userProfile={userProfile} />
      )}

      {/* Actions */}
      <div className="flex gap-4 mt-8">
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
