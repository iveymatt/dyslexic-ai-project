import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Brain, Menu, User, Settings, ChevronDown, X, LogOut, PanelLeftOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

interface NavigationHeaderProps {
  onOpenAIModePanel: () => void;
  hasProfile: boolean;
}

export function NavigationHeader({ onOpenAIModePanel, hasProfile }: NavigationHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentMode, accessibilityPanelOpen, setAccessibilityPanelOpen, sidebarOpen, setSidebarOpen } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const isChatPage = pathname === '/chat';

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-cyan-500 text-earth-900 font-semibold'
        : 'hover:bg-earth-100 [data-theme=dark]:hover:bg-earth-800'
    }`;

  return (
    <header className="px-3 py-2 sm:px-4 sm:py-3 safe-area-top" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
      <nav className="flex items-center justify-between gap-2">
        {/* Left cluster: menu toggle + optional sidebar toggle + logo */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          {/* Mobile navigation menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: 'var(--text-secondary)' }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Sidebar toggle — only on chat page, mobile */}
          {isChatPage && (
            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle chat history"
              style={{ color: 'var(--text-secondary)' }}
            >
              <PanelLeftOpen size={20} />
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <Brain className="text-cyan-500 flex-shrink-0" size={26} />
            <h1 className="text-base sm:text-lg font-semibold hidden sm:inline truncate">Cognitive Partner</h1>
          </div>
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

          {/* Profile / User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-earth-100"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="User menu"
            >
              {user ? (
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User size={20} />
              )}
              {hasProfile && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-500 border-2 rounded-full" style={{ borderColor: 'var(--bg-secondary)' }} />
              )}
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-xl border shadow-lg py-2 z-50"
                style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
              >
                {user && (
                  <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="font-semibold text-sm">{user.displayName}</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-cyan-500/10 text-cyan-500 font-medium capitalize">
                      {user.plan} plan
                    </span>
                  </div>
                )}
                {hasProfile && (
                  <button
                    onClick={() => { setUserMenuOpen(false); navigate('/profile'); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-earth-100 flex items-center gap-2"
                  >
                    <User size={16} />
                    Cognitive Profile
                  </button>
                )}
                <button
                  onClick={() => { setUserMenuOpen(false); setAccessibilityPanelOpen(!accessibilityPanelOpen); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-earth-100 flex items-center gap-2"
                >
                  <Settings size={16} />
                  Settings
                </button>
                {user && (
                  <button
                    onClick={() => { setUserMenuOpen(false); logout(); navigate('/'); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-earth-100 flex items-center gap-2 text-red-500"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                )}
              </div>
            )}
          </div>

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
