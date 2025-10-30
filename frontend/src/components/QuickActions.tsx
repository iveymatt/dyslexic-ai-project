import { useState } from 'react';
import { Sparkles, Network, CheckSquare, Lightbulb } from 'lucide-react';
import type { Message } from '../types';

interface QuickActionsProps {
  lastMessage: Message | null;
  onAction: (action: string, content: string) => void;
}

export function QuickActions({ lastMessage, onAction }: QuickActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  if (!lastMessage || lastMessage.role !== 'assistant') return null;

  const actions = [
    {
      id: 'simplify',
      label: 'Simplify This',
      icon: Sparkles,
      color: 'bg-purple-600 hover:bg-purple-700',
      prompt: `Please rewrite this in simpler language, using shorter sentences and everyday words:\n\n${lastMessage.content}`,
    },
    {
      id: 'mindmap',
      label: 'Make Mind Map',
      icon: Network,
      color: 'bg-teal-600 hover:bg-teal-700',
      prompt: `Create a simple text-based mind map from this response. Use indentation and bullet points to show relationships:\n\n${lastMessage.content}`,
    },
    {
      id: 'tasks',
      label: 'Extract Tasks',
      icon: CheckSquare,
      color: 'bg-green-600 hover:bg-green-700',
      prompt: `Extract all action items and tasks from this response as a simple checklist:\n\n${lastMessage.content}`,
    },
    {
      id: 'followup',
      label: 'Ask Follow-Up',
      icon: Lightbulb,
      color: 'bg-orange-600 hover:bg-orange-700',
      prompt: `Suggest 3 good follow-up questions I could ask about this topic:\n\n${lastMessage.content}`,
    },
  ];

  const handleAction = async (action: typeof actions[0]) => {
    setLoading(action.id);
    await onAction(action.id, action.prompt);
    setLoading(null);
  };

  return (
    <div className="border-t border-gray-700 bg-gray-800/50 px-4 py-3">
      <div className="flex flex-wrap gap-2 justify-center">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              disabled={loading !== null}
              className={`${action.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Icon size={16} />
              <span>{loading === action.id ? 'Processing...' : action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
