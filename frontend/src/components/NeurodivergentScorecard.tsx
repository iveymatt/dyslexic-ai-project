import { Brain, Check, X, Target, AlertCircle, Lightbulb, List, MessageSquare } from 'lucide-react';
import type { NeurodivergentAssessment } from '../types/leaderboard';
import { getScoreColor, getScoreBgColor } from '../types/leaderboard';

interface NeurodivergentScorecardProps {
  assessment: NeurodivergentAssessment;
  toolName: string;
}

export function NeurodivergentScorecard({ assessment, toolName }: NeurodivergentScorecardProps) {
  const { scores, bestAt, weakAt, perfectFor, notIdealFor } = assessment;

  const dimensions = [
    {
      key: 'lateralThinking' as const,
      label: 'Lateral Thinking',
      icon: Lightbulb,
      description: 'Can handle non-linear exploration',
    },
    {
      key: 'linearThinking' as const,
      label: 'Linear Thinking',
      icon: List,
      description: 'Can organize and structure',
    },
    {
      key: 'languageAdaptability' as const,
      label: 'Language Adapt',
      icon: MessageSquare,
      description: 'Adjusts to language processing needs',
    },
    {
      key: 'neurodivergentAwareness' as const,
      label: 'Neurodiv Awareness',
      icon: Brain,
      description: 'Understands neurodivergent brains',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900/30 to-blue-900/30 rounded-xl p-6 border border-primary-700/50">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-primary-400" size={28} />
          <h2 className="text-2xl font-bold text-white">Neurodivergent Thinking Support</h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          How well does <span className="font-semibold text-white">{toolName}</span> support
          dyslexic and neurodivergent thinking? We measure 4 dimensions:
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-6">Score Breakdown</h3>

        <div className="space-y-5">
          {dimensions.map((dim) => {
            const Icon = dim.icon;
            const value = scores[dim.key];
            const barCount = Math.round(value); // Number of filled bars out of 10

            return (
              <div key={dim.key}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={18} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-200">{dim.label}</span>
                    </div>
                    <p className="text-xs text-gray-500">{dim.description}</p>
                  </div>
                  <span className={`text-base font-bold ${getScoreColor(value)} ml-4`}>
                    {value}/10
                  </span>
                </div>

                {/* Visual bar representation (like the user requested: ████████░░) */}
                <div className="flex items-center gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-sm ${
                        i < barCount ? getScoreBgColor(value) : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Divider */}
          <div className="border-t border-gray-600 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target size={22} className="text-primary-400" />
                <span className="text-lg font-bold text-white">OVERALL</span>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(scores.overall)}`}>
                {scores.overall.toFixed(2)}/10
              </span>
            </div>

            <div className="flex items-center gap-1 mt-3">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3 flex-1 rounded-sm ${
                    i < Math.round(scores.overall) ? getScoreBgColor(scores.overall) : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Best At / Weak At */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Best At */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Check className="text-green-500" size={20} />
            <h3 className="text-base font-bold text-white">Best At</h3>
          </div>
          <ul className="space-y-2">
            {bestAt.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weak At */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-orange-500" size={20} />
            <h3 className="text-base font-bold text-white">Weak At</h3>
          </div>
          <ul className="space-y-2">
            {weakAt.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-orange-500 mt-0.5">⚠</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Perfect For / Not Ideal For */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Perfect For */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-blue-500" size={20} />
            <h3 className="text-base font-bold text-white">Perfect For</h3>
          </div>
          <ul className="space-y-2">
            {perfectFor.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-blue-500 mt-0.5">🎯</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Ideal For */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <X className="text-red-500" size={20} />
            <h3 className="text-base font-bold text-white">Not Ideal For</h3>
          </div>
          <ul className="space-y-2">
            {notIdealFor.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-red-500 mt-0.5">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-700/30">
        <div className="flex items-start gap-3">
          <Brain className="text-blue-400 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Summary</h3>
            <p className="text-gray-300 leading-relaxed">
              <span className="font-semibold text-white">{toolName}</span> scores{' '}
              <span className={`font-bold ${getScoreColor(scores.overall)}`}>
                {scores.overall.toFixed(1)}/10
              </span>{' '}
              for neurodivergent thinking support.{' '}
              {scores.overall >= 9 ? (
                <>
                  <span className="text-green-400 font-semibold">Excellent</span> - This tool deeply
                  understands and supports neurodivergent thinking patterns.
                </>
              ) : scores.overall >= 7 ? (
                <>
                  <span className="text-blue-400 font-semibold">Good</span> - This tool provides
                  solid support for neurodivergent thinkers with some areas for improvement.
                </>
              ) : scores.overall >= 5 ? (
                <>
                  <span className="text-yellow-400 font-semibold">Okay</span> - This tool has basic
                  neurodivergent support but may require extra effort to work effectively.
                </>
              ) : (
                <>
                  <span className="text-orange-400 font-semibold">Limited</span> - This tool wasn't
                  designed with neurodivergent users in mind.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
