import { useState } from 'react';
import type { UserProfile, NeurodivergenceType, StrengthType, ChallengeType, SensoryPreference, EducationLevel, CareerInterestType, JobPriority } from '../../types/career';
import { ArrowRight, Save } from 'lucide-react';

interface ProfileBuilderProps {
  onComplete: (profile: UserProfile) => void;
  onBack: () => void;
}

export function ProfileBuilder({ onComplete, onBack }: ProfileBuilderProps) {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    neurodivergence: [],
    strengths: [],
    challenges: [],
    careerInterests: [],
    jobPriorities: [],
    sensoryPreference: 'quiet-preferred',
    education: 'high-school',
    hasWorked: false,
    savedJobs: [],
    lifeSkillsProgress: {},
    aiLiteracyProgress: {},
  });

  const handleNext = () => {
    if (step < 7) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handleComplete = () => {
    const now = new Date().toISOString();
    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      neurodivergence: profileData.neurodivergence as NeurodivergenceType[],
      strengths: profileData.strengths as StrengthType[],
      challenges: profileData.challenges as ChallengeType[],
      sensoryPreference: profileData.sensoryPreference as SensoryPreference,
      hasWorked: profileData.hasWorked ?? false,
      education: profileData.education as EducationLevel,
      careerInterests: profileData.careerInterests as CareerInterestType[],
      jobPriorities: profileData.jobPriorities as JobPriority[],
      savedJobs: [],
      lifeSkillsProgress: {},
      aiLiteracyProgress: {},
      profileCompleted: true,
      createdAt: now,
      updatedAt: now,
      ...profileData,
    };

    // Save to localStorage
    localStorage.setItem('careerDiscoveryProfile', JSON.stringify(profile));
    onComplete(profile);
  };

  const toggleArrayItem = <T,>(field: keyof UserProfile, value: T) => {
    const current = (profileData[field] as T[]) || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setProfileData({ ...profileData, [field]: updated });
  };

  // Step 1: Basic Info
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Build Your Profile</h1>
            <p className="text-gray-400 mb-8">Step 1 of 7: Basic Info</p>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name (Optional)</label>
                <input
                  type="text"
                  value={profileData.name || ''}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  placeholder="What should we call you?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Age</label>
                <input
                  type="number"
                  min="16"
                  max="30"
                  value={profileData.age || ''}
                  onChange={(e) => setProfileData({ ...profileData, age: parseInt(e.target.value) })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  placeholder="18-30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={profileData.location || ''}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  placeholder="City, State"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button onClick={handleNext} className="btn-primary flex-1">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Neurodivergence
  if (step === 2) {
    const neurodivergenceOptions: NeurodivergenceType[] = [
      'autism',
      'adhd',
      'dyslexia',
      'dyscalculia',
      'anxiety',
      'depression',
      'other',
    ];

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Neurodivergence</h1>
            <p className="text-gray-400 mb-8">Step 2 of 7: Tell us about your brain</p>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <p className="text-gray-300 mb-6">Select all that apply (you can choose multiple):</p>

              <div className="space-y-3 mb-6">
                {neurodivergenceOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleArrayItem('neurodivergence', option)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      (profileData.neurodivergence || []).includes(option)
                        ? 'bg-primary-600 border-primary-500 text-white'
                        : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <span className="capitalize">{option}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={handleNext} disabled={(profileData.neurodivergence || []).length === 0} className="btn-primary flex-1">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Strengths
  if (step === 3) {
    const strengthOptions: StrengthType[] = [
      'creative-thinking',
      'problem-solving',
      'detailed-work',
      'hyperfocus',
      'pattern-recognition',
      'pattern-creation',
      'big-picture',
      'technical-coding',
      'writing-language',
      'visual-spatial',
      'teaching-explaining',
      'organizing-systematizing',
    ];

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Your Strengths</h1>
            <p className="text-gray-400 mb-8">Step 3 of 7: What are you naturally good at? (Select 3-5)</p>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {strengthOptions.map((option) => {
                  const label = option.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  return (
                    <button
                      key={option}
                      onClick={() => toggleArrayItem('strengths', option)}
                      className={`text-left px-4 py-3 rounded-lg border transition-all ${
                        (profileData.strengths || []).includes(option)
                          ? 'bg-green-600 border-green-500 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={handleNext} disabled={(profileData.strengths || []).length === 0} className="btn-primary flex-1">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Challenges
  if (step === 4) {
    const challengeOptions: ChallengeType[] = [
      'social-interaction',
      'executive-function',
      'time-management',
      'sensory-sensitivity',
      'emotional-regulation',
      'transitions-changes',
      'reading-writing',
      'math-numbers',
      'multitasking',
      'unwritten-rules',
      'public-speaking',
    ];

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">What's Harder for You</h1>
            <p className="text-gray-400 mb-8">Step 4 of 7: Select 2-4 challenges</p>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {challengeOptions.map((option) => {
                  const label = option.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  return (
                    <button
                      key={option}
                      onClick={() => toggleArrayItem('challenges', option)}
                      className={`text-left px-4 py-3 rounded-lg border transition-all ${
                        (profileData.challenges || []).includes(option)
                          ? 'bg-orange-600 border-orange-500 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={handleNext} disabled={(profileData.challenges || []).length === 0} className="btn-primary flex-1">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 5: Work Experience (simplified)
  if (step === 5) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Work & Education</h1>
            <p className="text-gray-400 mb-8">Step 5 of 7</p>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Have you worked before?</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setProfileData({ ...profileData, hasWorked: true })}
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      profileData.hasWorked
                        ? 'bg-primary-600 border-primary-500'
                        : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setProfileData({ ...profileData, hasWorked: false })}
                    className={`flex-1 px-4 py-3 rounded-lg border ${
                      !profileData.hasWorked
                        ? 'bg-primary-600 border-primary-500'
                        : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Education Level</label>
                <select
                  value={profileData.education}
                  onChange={(e) => setProfileData({ ...profileData, education: e.target.value as EducationLevel })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                >
                  <option value="high-school">High School</option>
                  <option value="some-college">Some College</option>
                  <option value="college-degree">College Degree</option>
                  <option value="trade-school">Trade School</option>
                  <option value="self-taught">Self-Taught</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={handleNext} className="btn-primary flex-1">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 6: Career Interests
  if (step === 6) {
    const interestOptions: CareerInterestType[] = [
      'technology',
      'creative',
      'animals',
      'helping-people',
      'outdoors',
      'building-making',
      'teaching-training',
      'research-learning',
      'business-entrepreneurship',
      'not-sure',
    ];

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Career Interests</h1>
            <p className="text-gray-400 mb-8">Step 6 of 7: What kinds of work interest you?</p>

            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {interestOptions.map((option) => {
                  const label = option.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  return (
                    <button
                      key={option}
                      onClick={() => toggleArrayItem('careerInterests', option)}
                      className={`text-left px-4 py-3 rounded-lg border transition-all ${
                        (profileData.careerInterests || []).includes(option)
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={handleNext} disabled={(profileData.careerInterests || []).length === 0} className="btn-primary flex-1">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 7: Review & Complete
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Review Your Profile</h1>
          <p className="text-gray-400 mb-8">Step 7 of 7: Looks good?</p>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Neurodivergence</h3>
              <p className="text-gray-400 capitalize">
                {(profileData.neurodivergence || []).join(', ')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Strengths</h3>
              <p className="text-gray-400">{(profileData.strengths || []).length} selected</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Challenges</h3>
              <p className="text-gray-400">{(profileData.challenges || []).length} selected</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Career Interests</h3>
              <p className="text-gray-400">{(profileData.careerInterests || []).length} selected</p>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={handleBack} className="btn-secondary flex-1">
                Back
              </button>
              <button onClick={handleComplete} className="btn-primary flex-1">
                <Save size={18} />
                Complete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
