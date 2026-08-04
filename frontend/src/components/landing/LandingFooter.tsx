import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

export function LandingFooter() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold">LM Lab</span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              The complete AI platform for dyslexic and neurodivergent thinkers. Built with heart by people who think differently.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Features', action: () => scrollToSection('features') },
                { label: 'Pricing', action: () => scrollToSection('pricing') },
                { label: 'AI Leaderboard', action: () => navigate('/leaderboard') },
                { label: 'Prompt Library', action: () => navigate('/prompts') },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-sm hover:text-cyan-500 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Resources
            </h4>
            <ul className="space-y-3">
              {['Documentation', 'Blog', 'Community', 'Accessibility'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => alert(`${item} page coming soon!`)}
                    className="text-sm hover:text-cyan-500 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Company
            </h4>
            <ul className="space-y-3">
              {['About', 'Contact', 'Privacy Policy', 'Terms of Service'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => alert(`${item} page coming soon!`)}
                    className="text-sm hover:text-cyan-500 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Built with &#x2764;&#xFE0F; by neurodivergent people, for neurodivergent people
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span>&#x1F512; Privacy-focused</span>
            <span>&bull;</span>
            <span>&#x1F4BE; Open source</span>
            <span>&bull;</span>
            <span>&#x1F30D; Community-driven</span>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} LM Lab AI. No tracking. No data collection. Just tools that work for your brain.
        </p>
      </div>
    </footer>
  );
}
