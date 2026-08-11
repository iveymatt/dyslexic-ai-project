import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { modes, getSubAgentsForMode } from '../config/modes';
import type { ThinkingMode, SubAgent } from '../types';

interface AIModeControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIModeControlPanel({ isOpen, onClose }: AIModeControlPanelProps) {
  const { currentMode, currentSubAgent, setCurrentMode, setCurrentSubAgent } = useApp();
  const panelRef = useRef<HTMLDivElement>(null);

  const handleModeChange = (mode: ThinkingMode) => {
    setCurrentMode(mode);
    // Set default sub-agent for the new mode
    const subAgents = getSubAgentsForMode(mode);
    if (subAgents.length > 0) {
      setCurrentSubAgent(subAgents[0].id);
    }
  };

  const currentModeConfig = modes[currentMode];
  const subAgents = getSubAgentsForMode(currentMode);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="relative">
      <div
        ref={panelRef}
        className="absolute top-2 right-4 w-96 rounded-xl p-6 z-50"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-deep)' }}
      >
        <h3 className="text-lg font-semibold mb-4">AI Thinking Mode</h3>

        {/* Mode Selection */}
        <div className="space-y-3 mb-6">
          {Object.values(modes).map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                currentMode === mode.id
                  ? `${mode.color} text-white shadow-lg`
                  : ''
              }`}
              aria-label={`Switch to ${mode.name} mode`}
            >
              <div className="font-semibold">{mode.name}</div>
              <div className="text-sm opacity-80 mt-1">{mode.description}</div>
            </button>
          ))}
        </div>

        {/* Sub-agent Selection */}
        {subAgents.length > 0 && (
          <div>
            <h4 className="font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Sub-agent:</h4>
            <div className="space-y-2">
              {subAgents.map((agent) => (
                <label
                  key={agent.id}
                  className="flex items-start gap-3 cursor-pointer p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    checked={currentSubAgent === agent.id}
                    onChange={() => setCurrentSubAgent(agent.id as SubAgent)}
                    className="w-4 h-4 mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>{agent.name}</div>
                    {agent.description && (
                      <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{agent.description}</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Current Mode Description */}
        <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{currentModeConfig.description}</p>
        </div>
      </div>
    </div>
  );
}
