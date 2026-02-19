import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Brain, BookOpen, MessageCircle, Eye, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import type { CognitivePartnerProfile, AssessmentFormData } from '../types/cognitiveProfile';
import { createEmptyProfile } from '../types/cognitiveProfile';

export function CognitivePartnerAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AssessmentFormData>(createEmptyProfile());

  const totalSteps = 6;

  const updateFormData = (updates: Partial<AssessmentFormData>) => {
    setFormData(prev => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete assessment
      const completeProfile: CognitivePartnerProfile = {
        ...(formData as CognitivePartnerProfile),
        completedAssessment: true,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem('cognitivePartnerProfile', JSON.stringify(completeProfile));
      navigate('/chat');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step 1: Personal Info
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <User size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Let's Get Started!</h2>
        <p className="text-earth-500">Tell us a bit about yourself</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">What's your name? *</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => updateFormData({ name: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-earth-200 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Pronouns (optional)</label>
        <input
          type="text"
          value={formData.pronouns || ''}
          onChange={(e) => updateFormData({ pronouns: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-earth-200 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="e.g., she/her, they/them, he/him"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">How should I address you? *</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'first-name', label: 'First Name' },
            { value: 'nickname', label: 'Nickname' },
            { value: 'formal', label: 'Formal' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({ preferredAddress: option.value as any })}
              className={`p-3 rounded-lg border transition-all ${
                formData.preferredAddress === option.value
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {formData.preferredAddress === 'nickname' && (
        <div>
          <label className="block text-sm font-medium mb-2">Your nickname</label>
          <input
            type="text"
            value={formData.nickname || ''}
            onChange={(e) => updateFormData({ nickname: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-earth-200 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="What should I call you?"
          />
        </div>
      )}
    </div>
  );

  // Step 2: Neurodivergent Identity
  const renderStep2 = () => {
    const conditions = ['Autism', 'ADHD', 'Dyslexia', 'Dyscalculia', 'Dysgraphia', 'Other'];
    const commonStrengths = ['Pattern recognition', 'Creative thinking', 'Hyperfocus', 'Visual thinking', 'Detail-oriented', 'Big-picture thinking'];
    const commonChallenges = ['Executive function', 'Social interaction', 'Sensory processing', 'Time management', 'Working memory', 'Verbal communication'];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <Brain size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Your Neurodivergent Identity</h2>
          <p className="text-earth-500">Help us understand how your brain works</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Do you identify with any of these? (select all that apply)</label>
          <div className="grid grid-cols-2 gap-3">
            {conditions.map((condition) => (
              <button
                key={condition}
                onClick={() => {
                  const current = formData.neurodivergentConditions || [];
                  const updated = current.includes(condition)
                    ? current.filter(c => c !== condition)
                    : [...current, condition];
                  updateFormData({ neurodivergentConditions: updated });
                }}
                className={`p-3 rounded-lg border transition-all text-left ${
                  formData.neurodivergentConditions?.includes(condition)
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-white border-earth-200 hover:border-earth-300'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">What are your cognitive strengths? (select all that apply)</label>
          <div className="grid grid-cols-2 gap-3">
            {commonStrengths.map((strength) => (
              <button
                key={strength}
                onClick={() => {
                  const current = formData.strengths || [];
                  const updated = current.includes(strength)
                    ? current.filter(s => s !== strength)
                    : [...current, strength];
                  updateFormData({ strengths: updated });
                }}
                className={`p-3 rounded-lg border transition-all text-left text-sm ${
                  formData.strengths?.includes(strength)
                    ? 'bg-green-600 border-green-500 text-white'
                    : 'bg-white border-earth-200 hover:border-earth-300'
                }`}
              >
                {strength}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">What challenges do you face? (select all that apply)</label>
          <div className="grid grid-cols-2 gap-3">
            {commonChallenges.map((challenge) => (
              <button
                key={challenge}
                onClick={() => {
                  const current = formData.challenges || [];
                  const updated = current.includes(challenge)
                    ? current.filter(c => c !== challenge)
                    : [...current, challenge];
                  updateFormData({ challenges: updated });
                }}
                className={`p-3 rounded-lg border transition-all text-left text-sm ${
                  formData.challenges?.includes(challenge)
                    ? 'bg-orange-600 border-orange-500 text-white'
                    : 'bg-white border-earth-200 hover:border-earth-300'
                }`}
              >
                {challenge}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Step 3: Learning Preferences
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
          <BookOpen size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2">How You Learn Best</h2>
        <p className="text-earth-500">Rate how much each learning style helps you (1-5)</p>
      </div>

      <div className="space-y-4">
        {[
          { key: 'visual', label: 'Visual (images, diagrams, colors)', icon: '👁️' },
          { key: 'auditory', label: 'Auditory (listening, discussions)', icon: '👂' },
          { key: 'kinesthetic', label: 'Kinesthetic (hands-on, movement)', icon: '✋' },
          { key: 'readingWriting', label: 'Reading/Writing (text, notes)', icon: '📝' },
        ].map(({ key, label, icon }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-2">
              <span className="mr-2">{icon}</span>
              {label}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => updateFormData({
                    learningStyle: { ...formData.learningStyle!, [key]: value }
                  })}
                  className={`flex-1 py-3 rounded-lg border transition-all ${
                    formData.learningStyle?.[key as keyof typeof formData.learningStyle] === value
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-white border-earth-200 hover:border-earth-300'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Primary learning style</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'visual', label: 'Visual' },
            { value: 'auditory', label: 'Auditory' },
            { value: 'kinesthetic', label: 'Kinesthetic' },
            { value: 'reading-writing', label: 'Reading/Writing' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                learningStyle: { ...formData.learningStyle!, primary: option.value as any }
              })}
              className={`p-3 rounded-lg border transition-all ${
                formData.learningStyle?.primary === option.value
                  ? 'bg-green-600 border-green-500 text-white'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 4: Communication Preferences
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-600 rounded-full mb-4">
          <MessageCircle size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Communication Style</h2>
        <p className="text-earth-500">How should I communicate with you?</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tone</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'formal', label: 'Formal', desc: 'Professional' },
            { value: 'friendly', label: 'Friendly', desc: 'Warm & supportive' },
            { value: 'casual', label: 'Casual', desc: 'Relaxed' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                communication: { ...formData.communication!, tone: option.value as any }
              })}
              className={`p-3 rounded-lg border transition-all ${
                formData.communication?.tone === option.value
                  ? 'bg-pink-600 border-pink-500 text-white'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs opacity-75">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Detail Level</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'concise', label: 'Concise', desc: 'Brief answers' },
            { value: 'moderate', label: 'Moderate', desc: 'Balanced' },
            { value: 'detailed', label: 'Detailed', desc: 'Thorough' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                communication: { ...formData.communication!, detailLevel: option.value as any }
              })}
              className={`p-3 rounded-lg border transition-all ${
                formData.communication?.detailLevel === option.value
                  ? 'bg-pink-600 border-pink-500 text-white'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs opacity-75">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Response Structure</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'lists', label: 'Lists', desc: 'Bullet points' },
            { value: 'paragraphs', label: 'Paragraphs', desc: 'Full text' },
            { value: 'mixed', label: 'Mixed', desc: 'Both' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                communication: { ...formData.communication!, structure: option.value as any }
              })}
              className={`p-3 rounded-lg border transition-all ${
                formData.communication?.structure === option.value
                  ? 'bg-pink-600 border-pink-500 text-white'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs opacity-75">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-earth-200 cursor-pointer hover:border-earth-300">
          <span>Use Emojis</span>
          <input
            type="checkbox"
            checked={formData.communication?.useEmojis || false}
            onChange={(e) => updateFormData({
              communication: { ...formData.communication!, useEmojis: e.target.checked }
            })}
            className="w-5 h-5"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-earth-200 cursor-pointer hover:border-earth-300">
          <span>Avoid Jargon</span>
          <input
            type="checkbox"
            checked={formData.communication?.avoidJargon !== false}
            onChange={(e) => updateFormData({
              communication: { ...formData.communication!, avoidJargon: e.target.checked }
            })}
            className="w-5 h-5"
          />
        </label>
      </div>
    </div>
  );

  // Step 5: Accessibility Preferences
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 rounded-full mb-4">
          <Eye size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Accessibility Settings</h2>
        <p className="text-earth-500">Customize your visual and audio experience</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Font Size</label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
            { value: 'extra-large', label: 'Extra Large' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                accessibility: { ...formData.accessibility!, fontSize: option.value as any }
              })}
              className={`p-3 rounded-lg border transition-all ${
                formData.accessibility?.fontSize === option.value
                  ? 'bg-yellow-600 border-yellow-500 text-white'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Font Family</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'opendyslexic', label: 'OpenDyslexic', desc: 'Dyslexia-friendly' },
            { value: 'comic-sans', label: 'Comic Sans', desc: 'Easy to read' },
            { value: 'arial', label: 'Arial', desc: 'Clean & clear' },
            { value: 'system', label: 'System Default', desc: 'Your device font' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                accessibility: { ...formData.accessibility!, fontFamily: option.value as any }
              })}
              className={`p-3 rounded-lg border transition-all text-left ${
                formData.accessibility?.fontFamily === option.value
                  ? 'bg-yellow-600 border-yellow-500 text-white'
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs opacity-75">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Spacing</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-earth-500 mb-2">Line Spacing</div>
            <div className="flex gap-2">
              {[
                { value: 'normal', label: 'Normal' },
                { value: 'relaxed', label: 'Relaxed' },
                { value: 'loose', label: 'Loose' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFormData({
                    accessibility: { ...formData.accessibility!, lineSpacing: option.value as any }
                  })}
                  className={`flex-1 p-2 rounded-lg border transition-all text-sm ${
                    formData.accessibility?.lineSpacing === option.value
                      ? 'bg-yellow-600 border-yellow-500 text-white'
                      : 'bg-white border-earth-200 hover:border-earth-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-earth-500 mb-2">Letter Spacing</div>
            <div className="flex gap-2">
              {[
                { value: 'normal', label: 'Normal' },
                { value: 'wide', label: 'Wide' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFormData({
                    accessibility: { ...formData.accessibility!, letterSpacing: option.value as any }
                  })}
                  className={`flex-1 p-2 rounded-lg border transition-all text-sm ${
                    formData.accessibility?.letterSpacing === option.value
                      ? 'bg-yellow-600 border-yellow-500 text-white'
                      : 'bg-white border-earth-200 hover:border-earth-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-earth-200 cursor-pointer hover:border-earth-300">
          <span>Text-to-Speech</span>
          <input
            type="checkbox"
            checked={formData.accessibility?.textToSpeech || false}
            onChange={(e) => updateFormData({
              accessibility: { ...formData.accessibility!, textToSpeech: e.target.checked }
            })}
            className="w-5 h-5"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-earth-200 cursor-pointer hover:border-earth-300">
          <span>Voice Input</span>
          <input
            type="checkbox"
            checked={formData.accessibility?.voiceInput || false}
            onChange={(e) => updateFormData({
              accessibility: { ...formData.accessibility!, voiceInput: e.target.checked }
            })}
            className="w-5 h-5"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-white rounded-lg border border-earth-200 cursor-pointer hover:border-earth-300">
          <span>Reduced Motion</span>
          <input
            type="checkbox"
            checked={formData.accessibility?.reducedMotion || false}
            onChange={(e) => updateFormData({
              accessibility: { ...formData.accessibility!, reducedMotion: e.target.checked }
            })}
            className="w-5 h-5"
          />
        </label>
      </div>
    </div>
  );

  // Step 6: Thinking Preferences
  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 rounded-full mb-4">
          <Sparkles size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Your Thinking Style</h2>
        <p className="text-earth-500">Which modes resonate with you?</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Select your preferred thinking modes (at least one)</label>
        <div className="space-y-3">
          {[
            { value: 'socratic', label: 'Socratic', desc: 'Explore together, ask questions, think it through', color: 'accent' },
            { value: 'strategic', label: 'Strategic', desc: 'Get direct answers, actionable steps, clear guidance', color: 'primary' },
            { value: 'skeptic', label: 'Skeptic', desc: 'Challenge ideas, find blind spots, stress-test thinking', color: 'orange' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                const current = formData.thinkingStyle?.preferredModes || [];
                const updated = current.includes(option.value)
                  ? current.filter(m => m !== option.value)
                  : [...current, option.value];
                updateFormData({
                  thinkingStyle: { ...formData.thinkingStyle!, preferredModes: updated }
                });
              }}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                formData.thinkingStyle?.preferredModes?.includes(option.value)
                  ? `bg-${option.color}-600 border-${option.color}-500 text-white`
                  : 'bg-white border-earth-200 hover:border-earth-300'
              }`}
            >
              <div className="font-bold mb-1">{option.label}</div>
              <div className="text-sm opacity-90">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Default mode when you start chatting</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'socratic', label: 'Socratic' },
            { value: 'strategic', label: 'Strategic' },
            { value: 'skeptic', label: 'Skeptic' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => updateFormData({
                thinkingStyle: { ...formData.thinkingStyle!, defaultMode: option.value as any }
              })}
              disabled={!formData.thinkingStyle?.preferredModes?.includes(option.value)}
              className={`p-3 rounded-lg border transition-all ${
                formData.thinkingStyle?.defaultMode === option.value
                  ? 'bg-cyan-600 border-cyan-500 text-white'
                  : formData.thinkingStyle?.preferredModes?.includes(option.value)
                  ? 'bg-white border-earth-200 hover:border-earth-300'
                  : 'bg-earth-50 border-earth-200 text-earth-400 cursor-not-allowed'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
        <p className="text-sm text-blue-200">
          <strong>Note:</strong> You can switch between modes anytime while chatting! This just sets your starting preference.
        </p>
      </div>
    </div>
  );

  const steps = [
    renderStep1,
    renderStep2,
    renderStep3,
    renderStep4,
    renderStep5,
    renderStep6,
  ];

  const isStepValid = () => {
    if (currentStep === 0) {
      return formData.name && formData.name.trim().length > 0;
    }
    if (currentStep === 5) {
      return formData.thinkingStyle?.preferredModes && formData.thinkingStyle.preferredModes.length > 0;
    }
    return true;
  };

  return (
    <div className="min-h-screen text-earth-800 p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <button
              onClick={() => navigate('/chat')}
              className="text-sm text-earth-500 hover:text-white transition-colors"
            >
              Skip for now →
            </button>
          </div>
          <div className="w-full bg-earth-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-earth-200 p-8 mb-6">
          {steps[currentStep]()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'bg-earth-100 text-earth-400 cursor-not-allowed'
                : 'bg-earth-100 text-earth-800 hover:bg-earth-200'
            }`}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              !isStepValid()
                ? 'bg-earth-100 text-earth-400 cursor-not-allowed'
                : currentStep === totalSteps - 1
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
            }`}
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <Check size={20} />
                Complete Assessment
              </>
            ) : (
              <>
                Next
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
