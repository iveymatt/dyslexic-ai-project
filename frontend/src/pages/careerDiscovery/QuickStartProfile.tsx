import { useState } from 'react';
import type { UserProfile, NeurodivergenceType, StrengthType, ChallengeType } from '../../types/career';
import { ArrowRight, Sparkles, Zap, AlertCircle } from 'lucide-react';

interface QuickStartProfileProps {
  onComplete: (profile: UserProfile) => void;
  onSwitchToFullAssessment: () => void;
  onBack: () => void;
}

export default function QuickStartProfile({ onComplete, onSwitchToFullAssessment, onBack }: QuickStartProfileProps) {
  const [selectedNeurodivergence, setSelectedNeurodivergence] = useState<NeurodivergenceType[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<StrengthType[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<ChallengeType[]>([]);

  const neurodivergenceOptions: { value: NeurodivergenceType; label: string; emoji: string }[] = [
    { value: 'autism', label: 'Autism', emoji: '🧩' },
    { value: 'adhd', label: 'ADHD', emoji: '⚡' },
    { value: 'dyslexia', label: 'Dyslexia', emoji: '📖' },
    { value: 'dyscalculia', label: 'Dyscalculia', emoji: '🔢' },
    { value: 'anxiety', label: 'Anxiety', emoji: '😰' },
    { value: 'depression', label: 'Depression', emoji: '🌧️' },
    { value: 'other', label: 'Other', emoji: '💭' },
  ];

  const strengthOptions: { value: StrengthType; label: string }[] = [
    { value: 'creative-thinking', label: 'Creative Thinking' },
    { value: 'problem-solving', label: 'Problem Solving' },
    { value: 'detailed-work', label: 'Detailed Work' },
    { value: 'hyperfocus', label: 'Hyperfocus' },
    { value: 'pattern-recognition', label: 'Pattern Recognition' },
    { value: 'big-picture', label: 'Big Picture Thinking' },
    { value: 'technical-coding', label: 'Technical/Coding' },
    { value: 'visual-spatial', label: 'Visual-Spatial Skills' },
    { value: 'teaching-explaining', label: 'Teaching/Explaining' },
  ];

  const challengeOptions: { value: ChallengeType; label: string }[] = [
    { value: 'social-interaction', label: 'Social Interaction' },
    { value: 'executive-function', label: 'Executive Function' },
    { value: 'time-management', label: 'Time Management' },
    { value: 'sensory-sensitivity', label: 'Sensory Sensitivity' },
    { value: 'emotional-regulation', label: 'Emotional Regulation' },
    { value: 'transitions-changes', label: 'Transitions/Changes' },
    { value: 'multitasking', label: 'Multitasking' },
    { value: 'public-speaking', label: 'Public Speaking' },
  ];

  const toggleNeurodivergence = (value: NeurodivergenceType) => {
    setSelectedNeurodivergence(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleStrength = (value: StrengthType) => {
    setSelectedStrengths(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const toggleChallenge = (value: ChallengeType) => {
    setSelectedChallenges(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleQuickStart = () => {
    if (selectedNeurodivergence.length === 0) {
      alert('Please select at least one neurodivergence type to get personalized matches.');
      return;
    }

    // Create a minimal profile with sensible defaults
    const quickProfile: UserProfile = {
      id: `profile-${Date.now()}`,
      neurodivergence: selectedNeurodivergence,
      strengths: selectedStrengths.length > 0 ? selectedStrengths : ['problem-solving', 'detailed-work', 'creative-thinking'],
      challenges: selectedChallenges.length > 0 ? selectedChallenges : ['time-management'],
      sensoryPreference: 'flexible-with-breaks', // Default
      hasWorked: false, // Default
      education: 'high-school', // Default
      careerInterests: ['not-sure'], // Default
      jobPriorities: ['flexibility', 'low-stress', 'stability'],
      savedJobs: [],
      lifeSkillsProgress: {},
      aiLiteracyProgress: {},
      profileCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onComplete(quickProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="text-purple-300 hover:text-purple-200 mb-4 flex items-center gap-2"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Zap size={40} className="text-yellow-400" />
            <h1 className="text-4xl font-bold">Quick Start</h1>
          </div>

          <p className="text-xl text-gray-300 mb-4">
            Already know your needs? Let's get you matched with careers right away!
          </p>

          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
            <p className="text-blue-200">
              💡 <strong>Tip:</strong> You can always edit your profile later or take the{' '}
              <button
                onClick={onSwitchToFullAssessment}
                className="underline hover:text-blue-100"
              >
                full assessment
              </button>
              {' '}for more personalized matches.
            </p>
          </div>
        </div>

        {/* Step 1: Neurodivergence (Required) */}
        <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-purple-500/30">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                What describes you? <span className="text-red-400">*</span>
              </h2>
              <p className="text-gray-300">Select all that apply. This helps us find jobs that work with YOUR brain.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {neurodivergenceOptions.map(option => (
              <button
                key={option.value}
                onClick={() => toggleNeurodivergence(option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedNeurodivergence.includes(option.value)
                    ? 'bg-purple-600 border-purple-400 shadow-lg'
                    : 'bg-gray-700 border-gray-600 hover:border-purple-500'
                }`}
              >
                <div className="text-3xl mb-2">{option.emoji}</div>
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Strengths (Optional) */}
        <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-green-500/30">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                What are you good at? <span className="text-gray-400 text-sm">(Optional)</span>
              </h2>
              <p className="text-gray-300">Pick 2-4 things you excel at. We'll use sensible defaults if you skip this.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {strengthOptions.map(option => (
              <button
                key={option.value}
                onClick={() => toggleStrength(option.value)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedStrengths.includes(option.value)
                    ? 'bg-green-600 border-green-400 shadow-lg'
                    : 'bg-gray-700 border-gray-600 hover:border-green-500'
                }`}
              >
                <div className="font-semibold text-sm">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Challenges (Optional) */}
        <div className="bg-gray-800/50 rounded-lg p-6 mb-6 border border-orange-500/30">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">
                What's challenging for you? <span className="text-gray-400 text-sm">(Optional)</span>
              </h2>
              <p className="text-gray-300">Pick 2-4 things that are hard for you. We'll avoid jobs that require these.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {challengeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => toggleChallenge(option.value)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedChallenges.includes(option.value)
                    ? 'bg-orange-600 border-orange-400 shadow-lg'
                    : 'bg-gray-700 border-gray-600 hover:border-orange-500'
                }`}
              >
                <div className="font-semibold text-sm">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleQuickStart}
            disabled={selectedNeurodivergence.length === 0}
            className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              selectedNeurodivergence.length === 0
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg'
            }`}
          >
            Show Me Careers <ArrowRight />
          </button>

          <button
            onClick={onSwitchToFullAssessment}
            className="px-6 py-4 rounded-lg font-semibold border-2 border-purple-500 hover:bg-purple-500/20 transition-all"
          >
            Take Full Assessment
          </button>
        </div>

        {selectedNeurodivergence.length === 0 && (
          <p className="text-center text-red-400 mt-4">
            ⚠️ Please select at least one option in "What describes you?" to continue
          </p>
        )}
      </div>
    </div>
  );
}
