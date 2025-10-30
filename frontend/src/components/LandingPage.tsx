import React from 'react';
import { Brain, Volume2, Type, MessageSquare, Mic, Network, CheckSquare, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mb-8">
          <Brain size={40} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          Cognitive Partner
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          The first AI chat assistant designed specifically for dyslexic and neurodivergent thinkers
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Clean interface. Clear typography. Built-in accessibility. Your brain, amplified.
        </p>
        <button
          onClick={onGetStarted}
          className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          Start Chatting
          <ArrowRight size={20} />
        </button>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Built for How You Think</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Volume2 size={32} />}
            title="Text-to-Speech"
            description="Every message can be read aloud with adjustable speed. No extra clicks required."
          />
          <FeatureCard
            icon={<Type size={32} />}
            title="Dyslexic-Friendly Fonts"
            description="Choose from OpenDyslexic, Comic Sans, Verdana, and more. Adjust size and spacing instantly."
          />
          <FeatureCard
            icon={<Mic size={32} />}
            title="Voice Input"
            description="Speak your thoughts instead of typing. Perfect for when words flow better out loud."
          />
          <FeatureCard
            icon={<MessageSquare size={32} />}
            title="Simplify Responses"
            description="Any AI response can be instantly rewritten in simpler, clearer language."
          />
          <FeatureCard
            icon={<Network size={32} />}
            title="Mind Maps"
            description="Turn complex text into visual mind maps that show how ideas connect."
          />
          <FeatureCard
            icon={<CheckSquare size={32} />}
            title="Task Extraction"
            description="Automatically pull out action items and to-dos from any conversation."
          />
        </div>
      </section>

      {/* Agents Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-6">Your Personal AI Team</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Switch between specialized agents designed for different thinking tasks
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AgentCard
            name="Study Buddy"
            description="Learn through questions and analogies"
            color="bg-blue-600"
          />
          <AgentCard
            name="Writing Helper"
            description="Improve clarity without losing your voice"
            color="bg-purple-600"
          />
          <AgentCard
            name="Task Master"
            description="Break big projects into small steps"
            color="bg-green-600"
          />
          <AgentCard
            name="Executive Coach"
            description="Time management and focus strategies"
            color="bg-orange-600"
          />
          <AgentCard
            name="Research Partner"
            description="Summarize and organize information"
            color="bg-teal-600"
          />
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-800/50 rounded-3xl my-16">
        <h2 className="text-3xl font-bold text-center mb-6">Accessibility First, Always</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-300">
          <p className="flex items-start gap-3">
            <span className="text-accent-500 flex-shrink-0">✓</span>
            <span><strong>Generous spacing:</strong> No cramped text. Everything breathes.</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-accent-500 flex-shrink-0">✓</span>
            <span><strong>High contrast:</strong> WCAG AAA compliant. Easy on the eyes.</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-accent-500 flex-shrink-0">✓</span>
            <span><strong>Large text default:</strong> 16px minimum, scales up to 24px.</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-accent-500 flex-shrink-0">✓</span>
            <span><strong>Clear labels:</strong> Every button has both icon and text.</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-accent-500 flex-shrink-0">✓</span>
            <span><strong>Dark mode default:</strong> Reduces eye strain for long sessions.</span>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Think Better?</h2>
        <p className="text-xl text-gray-400 mb-8">
          No signup required. Start chatting in seconds.
        </p>
        <button
          onClick={onGetStarted}
          className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          Launch Cognitive Partner
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-800 text-center text-gray-500">
        <p>Built with ❤️ for dyslexic and neurodivergent thinkers</p>
        <p className="mt-2 text-sm">Open source • Privacy-focused • Community-driven</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-primary-500 transition-colors">
      <div className="text-primary-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function AgentCard({ name, description, color }: { name: string; description: string; color: string }) {
  return (
    <div className={`${color} p-6 rounded-xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  );
}
