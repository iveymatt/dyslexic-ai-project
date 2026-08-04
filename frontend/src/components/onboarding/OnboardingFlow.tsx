// ============================================
// Guided Onboarding Flow
// ============================================
// 4-step onboarding for new users:
// 1. Welcome & introduce the app
// 2. Pick your thinking style preferences
// 3. Try the accessibility settings
// 4. Start your first chat

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, ArrowRight, ArrowLeft, Check, Sparkles,
  Eye, Type, MessageSquare, Rocket
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { analytics } from '../../services/analyticsService';

const ONBOARDING_COMPLETE_KEY = 'cp_onboarding_complete';

export function hasCompletedOnboarding(): boolean {
  return localStorage.getItem(ONBOARDING_COMPLETE_KEY) === 'true';
}

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    thinkingStyle: '',
    fontPreference: 'default',
    spacing: 'comfortable',
    theme: 'light',
  });
  const navigate = useNavigate();
  const { setAccessibilityPanelOpen } = useApp();

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    localStorage.setItem('cp_user_preferences', JSON.stringify(preferences));

    // Apply chosen preferences
    if (preferences.fontPreference === 'dyslexic') {
      document.body.classList.add('dyslexic-mode');
    }
    if (preferences.theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    analytics.onboardingStepCompleted('completed');
    navigate('/chat');
  };

  const nextStep = () => {
    analytics.onboardingStepCompleted(`step_${step + 1}`);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const steps = [
    // Step 1: Welcome
    {
      title: 'Welcome to Cognitive Partner',
      subtitle: 'Your AI thinking companion, built for how your brain works.',
      content: (
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full shadow-lg shadow-cyan-500/25">
            <Brain size={40} className="text-white" />
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              This app is designed from the ground up for dyslexic and neurodivergent thinkers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {[
                { icon: MessageSquare, label: 'AI Chat', desc: 'Talk through ideas with a smart companion' },
                { icon: Sparkles, label: 'Career Tools', desc: 'Find careers that match how you think' },
                { icon: Eye, label: 'Accessibility', desc: 'Fonts, colours, and spacing your way' },
                { icon: Rocket, label: 'AI Agents', desc: 'Specialised helpers for every task' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="p-3 rounded-lg card">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={16} className="text-cyan-500" />
                    <span className="font-semibold text-sm">{label}</span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    // Step 2: Thinking Style
    {
      title: 'How does your brain work best?',
      subtitle: 'Pick the style that feels most like you. This helps us personalise your experience.',
      content: (
        <div className="max-w-md mx-auto space-y-3">
          {[
            { id: 'visual', emoji: '🎨', label: 'Visual Thinker', desc: 'I think in pictures, diagrams, and colours' },
            { id: 'verbal', emoji: '💬', label: 'Verbal Thinker', desc: 'I think by talking things through out loud' },
            { id: 'hands-on', emoji: '🛠️', label: 'Hands-On Thinker', desc: 'I learn by doing and building things' },
            { id: 'big-picture', emoji: '🌍', label: 'Big Picture Thinker', desc: 'I connect ideas across many topics at once' },
            { id: 'not-sure', emoji: '🤔', label: 'Not sure yet', desc: 'I want to explore and figure it out' },
          ].map(style => (
            <button
              key={style.id}
              onClick={() => setPreferences(p => ({ ...p, thinkingStyle: style.id }))}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                preferences.thinkingStyle === style.id
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/10'
                  : 'border-transparent'
              }`}
              style={{
                background: preferences.thinkingStyle === style.id ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                border: preferences.thinkingStyle === style.id ? '2px solid var(--text-accent)' : '2px solid var(--border-color)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" role="img" aria-label={style.label}>{style.emoji}</span>
                <div>
                  <p className="font-semibold">{style.label}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{style.desc}</p>
                </div>
                {preferences.thinkingStyle === style.id && (
                  <Check size={20} className="ml-auto text-cyan-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      ),
    },

    // Step 3: Reading Comfort
    {
      title: 'Make it comfortable to read',
      subtitle: 'Pick the settings that feel easiest on your eyes. You can always change these later.',
      content: (
        <div className="max-w-md mx-auto space-y-6">
          {/* Font choice */}
          <div>
            <label className="block font-semibold mb-3 flex items-center gap-2">
              <Type size={18} className="text-cyan-500" />
              Font Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'default', label: 'Standard', sample: 'Aa Bb Cc' },
                { id: 'dyslexic', label: 'OpenDyslexic', sample: 'Aa Bb Cc' },
                { id: 'mono', label: 'Monospace', sample: 'Aa Bb Cc' },
              ].map(font => (
                <button
                  key={font.id}
                  onClick={() => setPreferences(p => ({ ...p, fontPreference: font.id }))}
                  className={`p-3 rounded-lg text-center transition-all ${
                    preferences.fontPreference === font.id ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  style={{
                    background: preferences.fontPreference === font.id ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    fontFamily: font.id === 'dyslexic' ? "'OpenDyslexic', sans-serif" : font.id === 'mono' ? "'JetBrains Mono', monospace" : 'inherit',
                  }}
                >
                  <p className="text-lg mb-1">{font.sample}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{font.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div>
            <label className="block font-semibold mb-3 flex items-center gap-2">
              <Eye size={18} className="text-cyan-500" />
              Line Spacing
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'compact', label: 'Compact' },
                { id: 'comfortable', label: 'Comfortable' },
                { id: 'relaxed', label: 'Relaxed' },
              ].map(space => (
                <button
                  key={space.id}
                  onClick={() => setPreferences(p => ({ ...p, spacing: space.id }))}
                  className={`p-3 rounded-lg text-center text-sm transition-all ${
                    preferences.spacing === space.id ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  style={{
                    background: preferences.spacing === space.id ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {space.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="block font-semibold mb-3">Theme</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'light', label: 'Light Mode', emoji: '☀️' },
                { id: 'dark', label: 'Dark Mode', emoji: '🌙' },
              ].map(theme => (
                <button
                  key={theme.id}
                  onClick={() => setPreferences(p => ({ ...p, theme: theme.id }))}
                  className={`p-4 rounded-lg text-center transition-all ${
                    preferences.theme === theme.id ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  style={{
                    background: preferences.theme === theme.id ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span className="text-2xl block mb-1">{theme.emoji}</span>
                  <span className="text-sm">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    // Step 4: Ready to go
    {
      title: "You're all set!",
      subtitle: "Let's start your first conversation.",
      content: (
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neon-500 to-cyan-500 rounded-full">
            <Rocket size={40} className="text-white" />
          </div>

          <div className="space-y-3">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Your Cognitive Partner is ready. Here are some things you can try first:
            </p>

            <div className="space-y-2 text-left">
              {[
                'Ask the AI to explain something in simple words',
                'Explore career paths that fit your thinking style',
                'Try the prompt library for ready-made templates',
                'Use voice input if typing feels hard today',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                  <Check size={16} className="text-cyan-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Progress bar */}
      <div className="w-full h-1" style={{ background: 'var(--border-color)' }}>
        <div
          className="h-full bg-cyan-500 transition-all duration-500"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Skip button */}
      <div className="flex justify-end p-4">
        <button
          onClick={completeOnboarding}
          className="text-sm px-4 py-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          Skip for now
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === step ? 'bg-cyan-500 w-8' : i < step ? 'bg-cyan-500/50' : ''
              }`}
              style={i > step ? { background: 'var(--border-color)' } : undefined}
            />
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">{currentStep.title}</h1>
        <p className="text-center mb-8 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
          {currentStep.subtitle}
        </p>

        {/* Step content */}
        <div className="w-full max-w-2xl">
          {currentStep.content}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="p-4 sm:p-6 safe-area-bottom" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <div className="max-w-md mx-auto flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="btn-secondary flex items-center gap-2 px-4 py-3 rounded-xl"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex-1 btn-primary py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isLastStep ? (
              <>
                Start Chatting
                <Rocket size={18} />
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
