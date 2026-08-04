import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function FinalCTA() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section className="container mx-auto px-6 py-20 md:py-24 text-center">
      <h2 className="text-5xl font-bold mb-6">Ready to Think Better?</h2>
      <p className="text-xl text-earth-500 mb-4">
        Join thousands of neurodivergent thinkers who finally found an AI that gets them.
      </p>
      <p className="text-lg text-earth-400 mb-8">
        Start with chat, browse prompts, compare AI tools, discover your career path.
      </p>
      <button
        onClick={() => navigate(isAuthenticated ? '/chat' : '/signup')}
        className="btn-primary text-xl px-10 py-5 inline-flex items-center gap-3 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.05]"
      >
        {isAuthenticated ? 'Go to App' : 'Get Started Free'}
        <ArrowRight size={24} />
      </button>
      <p className="text-xs text-earth-400 mt-6">
        No credit card required &bull; Free plan available forever
      </p>
    </section>
  );
}
