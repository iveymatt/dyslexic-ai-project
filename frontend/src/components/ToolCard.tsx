import { Brain, ExternalLink, Star, Zap, ArrowRight } from 'lucide-react';
import type { AITool } from '../types/leaderboard';
import { getScoreColor } from '../types/leaderboard';

interface ToolCardProps {
  tool: AITool;
  onClick: () => void;
  rank?: number;
}

export function ToolCard({ tool, onClick, rank }: ToolCardProps) {
  // Get category badge color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      chat: 'bg-purple-900/30 border-purple-700/50 text-purple-400',
      code: 'bg-blue-900/30 border-blue-700/50 text-blue-400',
      accessibility: 'bg-green-900/30 border-green-700/50 text-green-400',
      productivity: 'bg-orange-900/30 border-orange-700/50 text-orange-400',
      learning: 'bg-pink-900/30 border-pink-700/50 text-pink-400',
    };
    return colors[category] || 'bg-earth-50 border-earth-200/50 text-earth-500';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-5 border border-earth-200 hover:border-cyan-600 transition-all cursor-pointer group h-full flex flex-col"
    >
      {/* Header with rank and name */}
      <div className="flex items-start gap-3 mb-3">
        {rank && (
          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0 ${
            rank === 1 ? 'bg-yellow-600 text-white' :
            rank === 2 ? 'bg-gray-400 text-white' :
            rank === 3 ? 'bg-orange-600 text-white' :
            'bg-earth-100 text-earth-600'
          }`}>
            {rank}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-earth-800 mb-2 group-hover:text-cyan-500 transition-colors line-clamp-1">
            {tool.name}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`border text-xs font-medium px-2 py-1 rounded ${getCategoryColor(tool.category)}`}>
              {tool.category}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(tool.type)}`}>
              {tool.type}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-earth-600 text-sm mb-3 line-clamp-2 flex-grow">
        {tool.description}
      </p>

      {/* Scores - Compact */}
      <div className="grid grid-cols-3 gap-2 mb-3 bg-earth-50 rounded-lg p-3 border border-earth-200/50">
        <div className="text-center">
          <div className="text-xs text-earth-500 mb-1">Overall</div>
          <div className={`text-lg font-bold ${getScoreColor(tool.overallScore)}`}>
            {tool.overallScore.toFixed(1)}
          </div>
        </div>
        <div className="text-center border-l border-r border-earth-200/50">
          <div className="text-xs text-earth-500 mb-1 flex items-center justify-center gap-1">
            <Brain size={12} />
            Neuro
          </div>
          <div className={`text-lg font-bold ${getScoreColor(tool.neurodivergentAssessment.scores.overall)}`}>
            {tool.neurodivergentAssessment.scores.overall.toFixed(1)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-earth-500 mb-1 flex items-center justify-center gap-1">
            <Zap size={12} />
            Features
          </div>
          <div className={`text-lg font-bold ${getScoreColor(tool.featuresScore)}`}>
            {tool.featuresScore.toFixed(1)}
          </div>
        </div>
      </div>

      {/* Perfect For tags */}
      <div className="mb-3">
        <div className="text-xs text-earth-500 mb-2 font-medium">Perfect for:</div>
        <div className="flex flex-wrap gap-1">
          {tool.neurodivergentAssessment.perfectFor.slice(0, 2).map((item, index) => (
            <span
              key={index}
              className="text-xs bg-blue-900/40 border border-blue-700/30 px-2 py-1 rounded text-blue-200 line-clamp-1"
            >
              {item}
            </span>
          ))}
          {tool.neurodivergentAssessment.perfectFor.length > 2 && (
            <span className="text-xs text-earth-400 px-2 py-1">
              +{tool.neurodivergentAssessment.perfectFor.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer with pricing and action */}
      <div className="flex items-center justify-between pt-3 border-t border-earth-200 mt-auto">
        {/* Pricing */}
        <div className="text-sm">
          {tool.pricing.free ? (
            <span className="text-green-400 font-medium flex items-center gap-1">
              <Star size={14} className="fill-current" />
              Free
            </span>
          ) : (
            <span className="text-earth-500">{tool.pricing.priceRange?.split(',')[0]}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {tool.website !== '#' && (
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-earth-500 hover:text-cyan-500 hover:bg-earth-100 rounded-lg transition-colors"
              aria-label="Visit website"
              title="Visit Site"
            >
              <ExternalLink size={16} />
            </a>
          )}
          <button
            className="flex items-center gap-1 text-sm text-cyan-500 hover:text-cyan-500 font-medium transition-colors"
            aria-label="View details"
          >
            Details
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
