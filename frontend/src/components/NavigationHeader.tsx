import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Brain, Menu, User, Settings, ChevronDown, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavigationHeaderProps {
  onOpenAIModePanel: () => void;
  hasProfile: boolean;
}

export function NavigationHeader({ onOpenAIModePanel, hasProfile }: NavigationHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentMode, accessibilityPanelOpen, setAccessibilityPanelOpen } = useApp();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-cyan-500 text-earth-900 font-semibold'
        : 'hover:bg-earth-100 [data-theme=dark]:hover:bg-earth-800'
    }`;

  return (
    <header className="px-4 py-3" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
      <nav className="flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-earth-600 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Brain className="text-cyan-500" size={28} />
          <h1 className="text-lg font-semibold hidden sm:inline">Cognitive Partner</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/chat" className={navLinkClass}>
            Chat
          </NavLink>
          <NavLink to="/prompts" className={navLinkClass}>
            Prompts
          </NavLink>
          <NavLink to="/leaderboard" className={navLinkClass}>
            Leaderboard
          </NavLink>
          <NavLink to="/career-discovery" className={navLinkClass}>
            Career
          </NavLink>
          <NavLink to="/ai-agents" className={navLinkClass}>
            AI Agents
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* AI Mode Trigger */}
          <button
            onClick={onOpenAIModePanel}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-color)' }}
            aria-label="Open AI mode panel"
          >
            <span className="text-sm capitalize">{currentMode}</span>
            <ChevronDown size={16} />
          </button>

          {/* Profile */}
          {hasProfile && (
            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-lg transition-colors relative"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="View profile"
            >
              <User size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-500 border-2 rounded-full" style={{ borderColor: 'var(--bg-secondary)' }} />
            </button>
          )}

          {/* Settings */}
          <button
            onClick={() => setAccessibilityPanelOpen(!accessibilityPanelOpen)}
            className="btn-icon"
            aria-label="Toggle settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" style={{ background: 'var(--bg-primary)' }}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <Brain className="text-cyan-500" size={28} />
                <h1 className="text-lg font-semibold">Cognitive Partner</h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-earth-600 p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1 flex flex-col gap-2 p-4">
              <NavLink
                to="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-lg ${
                    isActive ? 'bg-cyan-500 text-earth-900 font-semibold' : ''
                  }`
                }
              >
                Chat
              </NavLink>
              <NavLink
                to="/prompts"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-lg ${
                    isActive ? 'bg-cyan-500 text-earth-900 font-semibold' : ''
                  }`
                }
              >
                Prompts
              </NavLink>
              <NavLink
                to="/leaderboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-lg ${
                    isActive ? 'bg-cyan-500 text-earth-900 font-semibold' : ''
                  }`
                }
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/career-discovery"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-lg ${
                    isActive ? 'bg-cyan-500 text-earth-900 font-semibold' : ''
                  }`
                }
              >
                Career
              </NavLink>
              <NavLink
                to="/ai-agents"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-lg ${
                    isActive ? 'bg-cyan-500 text-earth-900 font-semibold' : ''
                  }`
                }
              >
                AI Agents
              </NavLink>

              {/* AI Mode Button for Mobile */}
              <button
                onClick={() => {
                  onOpenAIModePanel();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-lg transition-colors text-left"
                style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-color)' }}
              >
                <span className="text-sm">AI Mode: <span className="capitalize">{currentMode}</span></span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
