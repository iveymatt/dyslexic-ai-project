
import { Check } from 'lucide-react';

interface ProgressTrackerProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressTracker({
  current,
  total,
  label,
  showPercentage = true,
  size = 'md',
}: ProgressTrackerProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  const heightClass = size === 'sm' ? 'h-2' : size === 'md' ? 'h-3' : 'h-4';
  const textSizeClass = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className={`text-gray-400 ${textSizeClass}`}>{label}</span>}
          {showPercentage && (
            <span className={`text-primary-400 font-semibold ${textSizeClass}`}>
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full ${heightClass} overflow-hidden`}>
        <div
          className="bg-gradient-to-r from-primary-600 to-accent-600 h-full transition-all duration-500 ease-out flex items-center justify-end pr-1"
          style={{ width: `${percentage}%` }}
        >
          {percentage === 100 && size !== 'sm' && (
            <Check size={size === 'lg' ? 16 : 12} className="text-white" />
          )}
        </div>
      </div>
      {total > 0 && (
        <div className={`flex items-center justify-between mt-1 ${textSizeClass}`}>
          <span className="text-gray-500">
            {current} / {total} {current === 1 ? 'completed' : 'completed'}
          </span>
          {current === total && current > 0 && (
            <span className="text-green-400 font-semibold">Complete! 🎉</span>
          )}
        </div>
      )}
    </div>
  );
}

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-primary-500 transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
      {label && <span className="mt-2 text-sm text-gray-400">{label}</span>}
    </div>
  );
}
