import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, X, TrendingUp, Brain, Zap, HelpCircle, Filter, Grid, List } from 'lucide-react';
import { aiTools, filterByThinkingStyle } from '../data/aiTools';
import { NeuroScoreCell } from '../components/NeuroScore';
import { NeurodivergentScorecard } from '../components/NeurodivergentScorecard';
import { ToolCard } from '../components/ToolCard';
import { HowWeScore } from './HowWeScore';
import type { AITool, ThinkingStyle } from '../types/leaderboard';
import { getScoreColor } from '../types/leaderboard';

export function Leaderboard() {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);
  const [sortBy, setSortBy] = useState<'overall' | 'neuro' | 'features'>('neuro');
  const [thinkingStyleFilter, setThinkingStyleFilter] = useState<ThinkingStyle>('all');
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('list');

  // Apply thinking style filter
  const filteredTools = filterByThinkingStyle(aiTools, thinkingStyleFilter);

  // Sort filtered tools
  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'overall') {
      return b.overallScore - a.overallScore;
    } else if (sortBy === 'features') {
      return b.featuresScore - a.featuresScore;
    }
    return b.neurodivergentAssessment.scores.overall - a.neurodivergentAssessment.scores.overall;
  });

  if (showMethodology) {
    return <HowWeScore onBack={() => setShowMethodology(false)} />;
  }

  if (selectedTool) {
    return <ToolDetailView tool={selectedTool} onBack={() => setSelectedTool(null)} onShowMethodology={() => setShowMethodology(true)} />;
  }

  return (
    <div className="min-h-screen bg-earth-50 text-earth-800">
      {/* Header */}
      <header className="border-b border-earth-200 bg-white">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 text-earth-500 hover:text-cyan-500 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Chat
          </button>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="text-cyan-500" size={32} />
              <h1 className="text-3xl font-bold">AI Tool Leaderboard</h1>
            </div>
            <button
              onClick={() => setShowMethodology(true)}
              className="flex items-center gap-2 px-4 py-2 bg-earth-100 hover:bg-earth-200 rounded-lg transition-colors text-sm font-medium"
            >
              <HelpCircle size={16} />
              How We Score
            </button>
          </div>

          <p className="text-earth-500 text-lg max-w-3xl">
            Compare AI tools based on their support for neurodivergent thinking patterns.
            We test for lateral thinking, linear organization, language adaptability, and neurodivergent awareness.
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="container mx-auto px-6 py-6 space-y-4">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-earth-500 font-medium">View:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
                }`}
              >
                <List size={16} />
                List
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  viewMode === 'cards'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
                }`}
              >
                <Grid size={16} />
                Cards
              </button>
            </div>
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-earth-500 font-medium">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('neuro')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'neuro'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
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
                  ? 'bg-cyan-600 text-white'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <TrendingUp size={16} />
                Overall Score
              </span>
            </button>
            <button
              onClick={() => setSortBy('features')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'features'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap size={16} />
                Features
              </span>
            </button>
          </div>
        </div>

        {/* Thinking Style Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-earth-500 font-medium flex items-center gap-2">
            <Filter size={16} />
            Filter by thinking style:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setThinkingStyleFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                thinkingStyleFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
              }`}
            >
              All Tools
            </button>
            <button
              onClick={() => setThinkingStyleFilter('lateral')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                thinkingStyleFilter === 'lateral'
                  ? 'bg-blue-600 text-white'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
              }`}
            >
              Lateral Thinkers
            </button>
            <button
              onClick={() => setThinkingStyleFilter('linear')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                thinkingStyleFilter === 'linear'
                  ? 'bg-blue-600 text-white'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
              }`}
            >
              Linear Thinkers
            </button>
            <button
              onClick={() => setThinkingStyleFilter('balanced')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                thinkingStyleFilter === 'balanced'
                  ? 'bg-blue-600 text-white'
                  : 'bg-earth-100 text-earth-500 hover:bg-earth-200'
              }`}
            >
              Balanced (Both)
            </button>
          </div>
        </div>

        {/* Filter Explanation */}
        {thinkingStyleFilter !== 'all' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-earth-600">
            {thinkingStyleFilter === 'lateral' && (
              <>
                <strong className="text-blue-400">Lateral Thinkers:</strong> Tools that excel at non-linear exploration, creative connections, and adaptable language. Perfect for brainstorming and learning.
              </>
            )}
            {thinkingStyleFilter === 'linear' && (
              <>
                <strong className="text-blue-400">Linear Thinkers:</strong> Tools that provide clear structure, step-by-step organization, and well-organized output. Perfect for task breakdown and planning.
              </>
            )}
            {thinkingStyleFilter === 'balanced' && (
              <>
                <strong className="text-blue-400">Balanced:</strong> Tools that support both lateral exploration AND linear organization. The best of both worlds.
              </>
            )}
          </div>
        )}
      </div>

      {/* Leaderboard Content */}
      <div className="container mx-auto px-6 pb-12">
        {viewMode === 'cards' ? (
          /* Card Grid View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTools.length === 0 ? (
              <div className="col-span-full bg-white rounded-xl border border-earth-200 p-8 text-center text-earth-500">
                No tools match this thinking style filter. Try selecting "All Tools".
              </div>
            ) : (
              sortedTools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onClick={() => setSelectedTool(tool)}
                  rank={index + 1}
                />
              ))
            )}
          </div>
        ) : (
          /* Table List View */
          <div className="bg-white rounded-xl border border-earth-200 overflow-hidden">
            <table className="w-full">
            <thead>
              <tr className="bg-earth-50 border-b border-earth-200">
                <th className="text-left p-4 font-semibold text-earth-600 w-20">Rank</th>
                <th className="text-left p-4 font-semibold text-earth-600">Tool</th>
                <th className="text-left p-4 font-semibold text-earth-600 w-24">Overall</th>
                <th className="text-left p-4 font-semibold text-earth-600 w-32">Features</th>
                <th className="text-left p-4 font-semibold text-earth-600 w-48">
                  <span className="flex items-center gap-2">
                    <Brain size={16} />
                    Neurodiv Support
                  </span>
                </th>
                <th className="text-left p-4 font-semibold text-earth-600">Perfect For</th>
                <th className="text-right p-4 font-semibold text-earth-600 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-earth-500">
                    No tools match this thinking style filter. Try selecting "All Tools".
                  </td>
                </tr>
              ) : (
                sortedTools.map((tool, index) => (
                  <tr
                    key={tool.id}
                    className="border-b border-earth-200 hover:bg-earth-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTool(tool)}
                  >
                    <td className="p-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        index === 0 ? 'bg-yellow-600 text-white' :
                        index === 1 ? 'bg-earth-300 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-earth-100 text-earth-600'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-white">{tool.name}</div>
                        <div className="text-sm text-earth-500 line-clamp-1">{tool.description}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-lg font-bold ${getScoreColor(tool.overallScore)}`}>
                        {tool.overallScore.toFixed(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-base font-semibold ${getScoreColor(tool.featuresScore)}`}>
                        {tool.featuresScore.toFixed(1)}/10
                      </span>
                    </td>
                    <td className="p-4">
                      <NeuroScoreCell score={tool.neurodivergentAssessment.scores.overall} />
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {tool.neurodivergentAssessment.perfectFor.slice(0, 2).map((item, i) => (
                          <span key={i} className="text-xs bg-blue-50 border border-blue-200 px-2 py-1 rounded text-blue-700">
                            {item}
                          </span>
                        ))}
                        {tool.neurodivergentAssessment.perfectFor.length > 2 && (
                          <span className="text-xs text-gray-500">+{tool.neurodivergentAssessment.perfectFor.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTool(tool);
                        }}
                        className="text-cyan-500 hover:text-cyan-400 font-medium text-sm"
                      >
                        Details →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-earth-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span>Excellent (9-10)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>Good (7-8)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
            <span>Okay (5-6)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-600"></div>
            <span>Poor (3-4)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolDetailView({ tool, onBack, onShowMethodology }: { tool: AITool; onBack: () => void; onShowMethodology: () => void }) {
  const [showTestResults, setShowTestResults] = useState(false);

  return (
    <div className="min-h-screen bg-earth-50 text-earth-800">
      {/* Header */}
      <header className="border-b border-earth-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-earth-500 hover:text-cyan-500 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Leaderboard
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{tool.name}</h1>
              <p className="text-earth-500 text-lg">{tool.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onShowMethodology}
                className="btn flex items-center gap-2 bg-earth-100 hover:bg-earth-200"
              >
                <HelpCircle size={16} />
                How We Score
              </button>
              {tool.website !== '#' && (
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  Visit Site
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Score Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-earth-200">
            <div className="text-sm text-earth-500 mb-2">Overall Rating</div>
            <div className={`text-3xl font-bold ${getScoreColor(tool.overallScore)}`}>
              {tool.overallScore.toFixed(1)}/10
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-earth-200">
            <div className="text-sm text-earth-500 mb-2">Features Score</div>
            <div className={`text-3xl font-bold ${getScoreColor(tool.featuresScore)}`}>
              {tool.featuresScore.toFixed(1)}/10
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-earth-200">
            <div className="text-sm text-earth-500 mb-2 flex items-center gap-2">
              <Brain size={16} />
              Neurodivergent Support
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(tool.neurodivergentAssessment.scores.overall)}`}>
              {tool.neurodivergentAssessment.scores.overall.toFixed(2)}/10
            </div>
          </div>
        </div>

        {/* Neurodivergent Scorecard */}
        <div className="mb-8">
          <NeurodivergentScorecard assessment={tool.neurodivergentAssessment} toolName={tool.name} />
        </div>

        {/* Test Results (Collapsible) */}
        <div className="mb-8">
          <button
            onClick={() => setShowTestResults(!showTestResults)}
            className="w-full bg-white hover:bg-earth-50 rounded-xl p-6 border border-earth-200 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">View Test Results</h2>
                <p className="text-earth-500">See the actual AI responses that determined these scores</p>
              </div>
              <span className="text-3xl text-earth-500">{showTestResults ? '−' : '+'}</span>
            </div>
          </button>

          {showTestResults && (
            <div className="mt-4 space-y-6">
              {tool.neurodivergentAssessment.testResults.map((test, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-earth-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Test {index + 1}: {test.dimension.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <p className="text-sm text-earth-500 italic">"{test.prompt}"</p>
                    </div>
                    <span className={`text-xl font-bold ${getScoreColor(test.score)} ml-4`}>
                      {test.score}/10
                    </span>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-earth-500 mb-2">AI Response:</h4>
                    <p className="text-sm text-earth-600 whitespace-pre-line">{test.response}</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">Why this score:</h4>
                    <p className="text-sm text-earth-600">{test.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* General Strengths & Weaknesses */}
            <div className="bg-white rounded-xl p-6 border border-earth-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="text-green-500" size={20} />
                General Strengths
              </h3>
              <ul className="space-y-2">
                {tool.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-earth-600">
                    <Check size={16} className="text-green-500 flex-shrink-0 mt-1" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-earth-200">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <X className="text-orange-500" size={20} />
                General Weaknesses
              </h3>
              <ul className="space-y-2">
                {tool.weaknesses.map((weakness, i) => (
                  <li key={i} className="flex items-start gap-2 text-earth-600">
                    <X size={16} className="text-orange-500 flex-shrink-0 mt-1" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white rounded-xl p-6 border border-earth-200">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(tool.features).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    {value ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <X size={16} className="text-gray-600" />
                    )}
                    <span className={value ? 'text-earth-600' : 'text-gray-600 text-sm'}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 border border-earth-200">
              <h3 className="text-xl font-bold mb-4">Pricing</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {tool.pricing.free ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <X size={16} className="text-gray-600" />
                  )}
                  <span className="text-earth-600">Free tier available</span>
                </div>
                {tool.pricing.paid && tool.pricing.priceRange && (
                  <div className="text-earth-600">
                    <strong>Paid plan:</strong> {tool.pricing.priceRange}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
