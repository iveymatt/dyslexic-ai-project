import { Star, MessageSquare, Copy, ArrowRight, Bookmark } from 'lucide-react';
import type { Prompt } from '../types/prompts';
import { USER_TYPE_COLORS, MODE_COLORS, MODE_LABELS, USER_TYPE_LABELS } from '../types/prompts';

interface PromptCardProps {
  prompt: Prompt;
  onClick: () => void;
  onCopy?: () => void;
  onSave?: () => void;
}

export function PromptCard({ prompt, onClick, onCopy, onSave }: PromptCardProps) {
  const handleCopyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCopy) onCopy();
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) onSave();
  };

  // Get preview of prompt text (first 80 characters)
  const promptPreview = prompt.prompt.length > 80
    ? prompt.prompt.substring(0, 80) + '...'
    : prompt.prompt;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-5 border border-earth-200 hover:border-cyan-600 transition-all cursor-pointer group"
    >
      {/* Header with emoji and title */}
      <div className="flex items-start gap-3 mb-3">
        {prompt.emoji && (
          <span className="text-3xl" aria-hidden="true">
            {prompt.emoji}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-earth-800 mb-2 group-hover:text-cyan-500 transition-colors">
            {prompt.title}
          </h3>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`${USER_TYPE_COLORS[prompt.userType]} text-white text-xs font-medium px-2 py-1 rounded`}>
              {USER_TYPE_LABELS[prompt.userType]}
            </span>
            <span className={`${MODE_COLORS[prompt.bestMode]} text-white text-xs font-medium px-2 py-1 rounded`}>
              {MODE_LABELS[prompt.bestMode]}
            </span>
            {prompt.verified && (
              <span className="bg-green-900/30 border border-green-700/50 text-green-400 text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                ✓ Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-earth-600 text-sm mb-3 line-clamp-2">
        {prompt.description}
      </p>

      {/* Prompt preview */}
      <div className="bg-earth-50 rounded-lg p-3 mb-3 border border-earth-200/50">
        <p className="text-earth-500 text-xs font-mono line-clamp-2">
          {promptPreview}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {prompt.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            {tag}
          </span>
        ))}
        {prompt.tags.length > 3 && (
          <span className="text-xs text-earth-400">
            +{prompt.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Footer with stats and actions */}
      <div className="flex items-center justify-between pt-3 border-t border-earth-200">
        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-earth-500">
          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            {prompt.rating}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} />
            {prompt.commentCount}
          </span>
          <span className="text-xs">
            {prompt.usedCount} uses
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {onSave && (
            <button
              onClick={handleSaveClick}
              className="p-2 text-earth-500 hover:text-cyan-500 hover:bg-earth-100 rounded-lg transition-colors"
              aria-label="Save prompt"
              title="Save"
            >
              <Bookmark size={16} />
            </button>
          )}
          {onCopy && (
            <button
              onClick={handleCopyClick}
              className="p-2 text-earth-500 hover:text-cyan-500 hover:bg-earth-100 rounded-lg transition-colors"
              aria-label="Copy prompt"
              title="Copy"
            >
              <Copy size={16} />
            </button>
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
