import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <header id="hero" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-28 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium mb-6 sm:mb-8">
        <Sparkles size={14} />
        Built for neurodivergent thinkers
      </div>

      {/* Brain icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full mb-6 sm:mb-8 shadow-lg shadow-cyan-500/25">
        <Brain size={32} className="text-white sm:hidden" />
        <Brain size={40} className="text-white hidden sm:block" />
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 font-serif gradient-text">
        Cognitive Partner
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 max-w-3xl mx-auto font-semibold" style={{ color: 'var(--text-secondary)' }}>
        The complete AI platform for dyslexic and neurodivergent thinkers
      </p>

      {/* Feature chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 max-w-2xl mx-auto">
        {['AI Chat', 'Prompt Library', 'Tool Comparison', 'Career Discovery', 'AI Agents'].map(feature => (
          <span
            key={feature}
            className="px-3 py-1.5 rounded-full text-sm font-medium border"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            {feature}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="max-w-md mx-auto space-y-3">
        <button
          onClick={() => navigate('/signup')}
          className="w-full btn-primary font-bold py-4 px-8 rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 text-lg"
        >
          Get Started Free
          <ArrowRight size={20} />
        </button>

        <button
          onClick={() => navigate('/assessment')}
          className="w-full font-semibold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 btn-secondary"
        >
          <Brain size={18} />
          Take Cognitive Assessment
        </button>

        <p className="text-sm pt-2" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </header>
  );
}
