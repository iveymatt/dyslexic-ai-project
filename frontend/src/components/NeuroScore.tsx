import { Brain, Lightbulb, List, MessageSquare, Target } from 'lucide-react';
import type { NeurodivergentScore } from '../types/leaderboard';
import { getScoreColor, getScoreBgColor } from '../types/leaderboard';

interface NeuroScoreProps {
  score: NeurodivergentScore;
  showDetails?: boolean;
}

export function NeuroScore({ score, showDetails = false }: NeuroScoreProps) {
  const dimensions = [
    {
      key: 'lateralThinking' as const,
      label: 'Lateral Thinking',
      icon: Lightbulb,
      description: 'Non-linear exploration & creative connections',
    },
    {
      key: 'linearThinking' as const,
      label: 'Linear Thinking',
      icon: List,
      description: 'Structured organization & clear steps',
    },
    {
      key: 'languageAdaptability' as const,
      label: 'Language Adapt',
      icon: MessageSquare,
      description: 'Simplifies complex ideas & adjusts reading level',
    },
    {
      key: 'neurodivergentAwareness' as const,
      label: 'Neurodiv Awareness',
      icon: Brain,
      description: 'Understands neurodivergent strengths & challenges',
    },
  ];

  if (!showDetails) {
    // Compact badge view
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-earth-200">
        <Brain size={16} className={getScoreColor(score.overall)} />
        <span className="text-sm font-medium text-earth-600">
          Neurodivergent Support: <span className={getScoreColor(score.overall)}>{score.overall.toFixed(1)}/10</span>
        </span>
      </div>
    );
  }

  // Detailed breakdown view
  return (
    <div className="bg-white rounded-xl p-6 border border-earth-200">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Brain className="text-cyan-500" size={24} />
        Neurodivergent Thinking Support
      </h3>

      <div className="space-y-4">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          const value = score[dim.key];
          const percentage = (value / 10) * 100;

          return (
            <div key={dim.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-earth-500" />
                  <span className="text-sm font-medium text-earth-600">{dim.label}</span>
                </div>
                <span className={`text-sm font-bold ${getScoreColor(value)}`}>
                  {value}/10
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-earth-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${getScoreBgColor(value)} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {showDetails && (
                <p className="text-xs text-earth-400 mt-1">{dim.description}</p>
              )}
            </div>
          );
        })}

        {/* Overall score */}
        <div className="pt-4 mt-4 border-t border-earth-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={20} className="text-cyan-500" />
              <span className="text-base font-bold text-earth-800">OVERALL</span>
            </div>
            <span className={`text-xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall.toFixed(1)}/10
            </span>
          </div>

          {/* Overall progress bar */}
          <div className="w-full bg-earth-100 rounded-full h-3 overflow-hidden mt-2">
            <div
              className={`h-full ${getScoreBgColor(score.overall)} transition-all duration-500`}
              style={{ width: `${(score.overall / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact table cell version
export function NeuroScoreCell({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 bg-earth-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getScoreBgColor(score)} transition-all`}
          style={{ width: `${(score / 10) * 100}%` }}
        />
      </div>
      <span className={`text-sm font-bold ${getScoreColor(score)}`}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}
