import { useState } from 'react';
import { ArrowLeft, ExternalLink, Check, X, TrendingUp, Brain, Zap } from 'lucide-react';
import { aiTools } from '../data/aiTools';
import { NeuroScore, NeuroScoreCell } from '../components/NeuroScore';
import type { AITool } from '../types/leaderboard';
import { getScoreColor } from '../types/leaderboard';

interface LeaderboardProps {
  onBack: () => void;
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [sortBy, setSortBy] = useState<'overall' | 'neuro'>('neuro');

  const sortedTools = [...aiTools].sort((a, b) => {
    if (sortBy === 'overall') {
      return b.overallScore - a.overallScore;
    }
    return b.neurodivergentScore.overall - a.neurodivergentScore.overall;
  });

  if (selectedTool) {
    return <ToolDetailView tool={selectedTool} onBack={() => setSelectedTool(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Chat
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-primary-500" size={32} />
            <h1 className="text-3xl font-bold">AI Tool Leaderboard</h1>
          </div>

          <p className="text-gray-400 text-lg max-w-3xl">
            Compare AI tools based on their support for neurodivergent thinking patterns.
            We test for lateral thinking, linear organization, language adaptability, and neurodivergent awareness.
          </p>
        </div>
      </header>

      {/* Sort Toggle */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('neuro')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'neuro'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Brain size={16} />
                Neurodivergent Support
              </span>
            </button>
            <button
              onClick={() => setSortBy('overall')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'overall'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <TrendingUp size={16} />
                Overall Score
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="container mx-auto px-6 pb-12">
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-750 border-b border-gray-700">
                <th className="text-left p-4 font-semibold text-gray-300">Rank</th>
                <th className="text-left p-4 font-semibold text-gray-300">Tool</th>
                <th className="text-left p-4 font-semibold text-gray-300">Overall</th>
                <th className="text-left p-4 font-semibold text-gray-300">
                  <span className="flex items-center gap-2">
                    <Brain size={16} />
                    Neurodivergent Support
                  </span>
                </th>
                <th className="text-left p-4 font-semibold text-gray-300">Best For</th>
                <th className="text-right p-4 font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTools.map((tool, index) => (
                <tr
                  key={tool.id}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer"
                  onClick={() => setSelectedTool(tool)}
                >
                  <td className="p-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      index === 0 ? 'bg-yellow-600 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-white">{tool.name}</div>
                      <div className="text-sm text-gray-400 line-clamp-1">{tool.description}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-lg font-bold ${getScoreColor(tool.overallScore)}`}>
                      {tool.overallScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <NeuroScoreCell score={tool.neurodivergentScore.overall} />
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.bestFor.slice(0, 2).map((item, i) => (
                        <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                          {item}
                        </span>
                      ))}
                      {tool.bestFor.length > 2 && (
                        <span className="text-xs text-gray-500">+{tool.bestFor.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTool(tool);
                      }}
                      className="text-primary-500 hover:text-primary-400 font-medium text-sm"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ToolDetailView({ tool, onBack }: { tool: AITool; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Leaderboard
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
              <p className="text-gray-400 text-lg">{tool.description}</p>
            </div>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              Visit Site
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Neurodivergent Score Breakdown */}
            <NeuroScore score={tool.neurodivergentScore} showDetails={true} />

            {/* Strengths & Weaknesses */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="text-green-500" size={20} />
                Strengths
              </h3>
              <ul className="space-y-2">
                {tool.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <Check size={16} className="text-green-500 flex-shrink-0 mt-1" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <X className="text-orange-500" size={20} />
                Weaknesses
              </h3>
              <ul className="space-y-2">
                {tool.weaknesses.map((weakness, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <X size={16} className="text-orange-500 flex-shrink-0 mt-1" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Best For / Not Ideal For */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-3 text-green-400">✅ Best For:</h3>
              <ul className="space-y-2 mb-6">
                {tool.bestFor.map((item, i) => (
                  <li key={i} className="text-gray-300">• {item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-bold mb-3 text-red-400">❌ Not Ideal For:</h3>
              <ul className="space-y-2">
                {tool.notIdealFor.map((item, i) => (
                  <li key={i} className="text-gray-300">• {item}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(tool.features).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    {value ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <X size={16} className="text-gray-600" />
                    )}
                    <span className={value ? 'text-gray-300' : 'text-gray-600'}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Pricing</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {tool.pricing.free && <Check size={16} className="text-green-500" />}
                  <span className="text-gray-300">Free tier available: {tool.pricing.free ? 'Yes' : 'No'}</span>
                </div>
                {tool.pricing.paid && tool.pricing.priceRange && (
                  <div className="text-gray-300">Paid plan: {tool.pricing.priceRange}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
