import { useState } from 'react';
import { Menu, Settings, Brain, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { agents } from '../config/agents';
import type { AgentMode } from '../types';

export function Header() {
  const {
    sidebarOpen,
    setSidebarOpen,
    accessibilityPanelOpen,
    setAccessibilityPanelOpen,
    currentAgentMode,
    setCurrentAgentMode,
  } = useApp();

  const [agentSelectorOpen, setAgentSelectorOpen] = useState(false);

  const currentAgent = agents[currentAgentMode];

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
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
          <Brain className="text-primary-500" size={24} />
          <h1 className="text-lg font-semibold text-white">Cognitive Partner</h1>
        </div>
      </div>

      {/* Center - Agent Selector */}
      <div className="relative">
        <button
          onClick={() => setAgentSelectorOpen(!agentSelectorOpen)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${currentAgent.color} text-white hover:opacity-90 transition-opacity`}
          aria-label="Select agent mode"
          aria-expanded={agentSelectorOpen}
        >
          <span className="font-medium">{currentAgent.name}</span>
          <svg
            className={`w-4 h-4 transition-transform ${agentSelectorOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Agent Dropdown */}
        {agentSelectorOpen && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-80 z-50">
            <div className="p-2">
              {Object.values(agents).map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => {
                    setCurrentAgentMode(agent.id as AgentMode);
                    setAgentSelectorOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors ${
                    currentAgentMode === agent.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="font-medium text-white">{agent.name}</div>
                  <div className="text-sm text-gray-400">{agent.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Click outside to close */}
        {agentSelectorOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setAgentSelectorOpen(false)}
          />
        )}
      </div>

      {/* Right side */}
      <button
        onClick={() => setAccessibilityPanelOpen(!accessibilityPanelOpen)}
        className="btn-icon"
        aria-label="Toggle accessibility settings"
      >
        {accessibilityPanelOpen ? <X size={20} /> : <Settings size={20} />}
      </button>
    </header>
  );
}
