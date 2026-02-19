import { Menu, Settings, Brain, Trophy, BookOpen, Briefcase, Bot, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { modes, getSubAgentsForMode } from '../config/modes';
import type { ThinkingMode, SubAgent } from '../types';

interface HeaderProps {
  onShowLeaderboard?: () => void;
  onShowPromptLibrary?: () => void;
  onShowCareerDiscovery?: () => void;
  onShowAIAgentsWorkflows?: () => void;
  onShowProfile?: () => void;
  hasProfile?: boolean;
}

export function Header({ onShowLeaderboard, onShowPromptLibrary, onShowCareerDiscovery, onShowAIAgentsWorkflows, onShowProfile, hasProfile }: HeaderProps) {
  const {
    sidebarOpen,
    setSidebarOpen,
    accessibilityPanelOpen,
    setAccessibilityPanelOpen,
    currentMode,
    setCurrentMode,
    currentSubAgent,
    setCurrentSubAgent,
  } = useApp();

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

  return (
    <header className="px-4 py-3" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
      {/* Top Row - Logo + Settings */}
      <div className="flex items-center justify-between mb-3">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-icon"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <Brain className="text-cyan-500" size={24} />
            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Cognitive Partner</h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {onShowCareerDiscovery && (
            <button
              onClick={onShowCareerDiscovery}
              className="flex items-center gap-2 px-3 py-2 bg-earth-500 hover:bg-earth-400 text-white rounded-lg font-medium transition-colors"
              aria-label="View Career Discovery"
            >
              <Briefcase size={18} />
              <span className="hidden sm:inline">Career Discovery</span>
            </button>
          )}
          {onShowPromptLibrary && (
            <button
              onClick={onShowPromptLibrary}
              className="flex items-center gap-2 px-3 py-2 bg-neon-600 hover:bg-neon-500 text-earth-900 rounded-lg font-medium transition-colors"
              aria-label="View Prompt Library"
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Prompts</span>
            </button>
          )}
          {onShowAIAgentsWorkflows && (
            <button
              onClick={onShowAIAgentsWorkflows}
              className="flex items-center gap-2 px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-earth-900 rounded-lg font-medium transition-colors"
              aria-label="View AI Agents & Workflows"
            >
              <Bot size={18} />
              <span className="hidden sm:inline">AI Agents</span>
            </button>
          )}
          {onShowLeaderboard && (
            <button
              onClick={onShowLeaderboard}
              className="flex items-center gap-2 px-3 py-2 bg-magenta-500 hover:bg-magenta-400 text-white rounded-lg font-medium transition-colors"
              aria-label="View AI Leaderboard"
            >
              <Trophy size={18} />
              <span className="hidden sm:inline">AI Leaderboard</span>
            </button>
          )}
          {onShowProfile && (
            <button
              onClick={onShowProfile}
              className={`btn-icon relative ${hasProfile ? 'bg-cyan-500 hover:bg-cyan-400 text-earth-900' : ''}`}
              aria-label="View Cognitive Profile"
              title={hasProfile ? 'View your profile' : 'Create profile'}
            >
              <User size={20} />
              {hasProfile && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-500 border-2 rounded-full" style={{ borderColor: 'var(--bg-secondary)' }} />
              )}
            </button>
          )}
          <button
            onClick={() => setAccessibilityPanelOpen(!accessibilityPanelOpen)}
            className="btn-icon"
            aria-label="Toggle accessibility settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex flex-col gap-3">
        {/* Mode Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Thinking Mode:</span>
          <div className="flex gap-2">
            {Object.values(modes).map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentMode === mode.id
                    ? `${mode.color} text-white shadow-lg`
                    : ''
                }`}
                aria-label={`Switch to ${mode.name} mode`}
              >
                {mode.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Description + Sub-agent Selector */}
        <div className="flex items-center justify-between">
          <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>{currentModeConfig.description}</p>

          {/* Sub-agent Radio Buttons */}
          <div className="flex items-center gap-2">
            {subAgents.map((subAgent) => (
              <button
                key={subAgent.id}
                onClick={() => setCurrentSubAgent(subAgent.id as SubAgent)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentSubAgent === subAgent.id
                    ? 'font-semibold'
                    : ''
                }`}
                aria-label={`Switch to ${subAgent.name}`}
                title={subAgent.description}
              >
                {subAgent.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
