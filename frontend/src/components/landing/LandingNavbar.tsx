import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function LandingNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === '/' || location.pathname === '/landing';

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (isLandingPage) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // If not on landing page, navigate to landing with hash
    navigate(`/#${sectionId}`);
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold">LM Lab</span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium hover:text-cyan-500 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('thinking-modes')}
              className="text-sm font-medium hover:text-cyan-500 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium hover:text-cyan-500 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Pricing
            </button>
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/chat')}
                className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold"
              >
                Go to App
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-lg text-sm font-medium hover:text-cyan-500 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-earth-100 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-4 space-y-3" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left py-2 text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('thinking-modes')}
              className="block w-full text-left py-2 text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left py-2 text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Pricing
            </button>
            <div className="pt-3 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
              {isAuthenticated ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate('/chat'); }}
                  className="w-full btn-primary py-2 rounded-lg text-sm font-semibold"
                >
                  Go to App
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                    className="w-full py-2 rounded-lg text-sm font-medium btn-secondary"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}
                    className="w-full btn-primary py-2 rounded-lg text-sm font-semibold"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
