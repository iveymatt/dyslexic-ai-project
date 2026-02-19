import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Brain, BookOpen, MessageCircle, Eye, Sparkles, Edit2, Check, X } from 'lucide-react';
import type { CognitivePartnerProfile } from '../types/cognitiveProfile';
import { getDisplayName } from '../types/cognitiveProfile';

export function CognitiveProfileViewer() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CognitivePartnerProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cognitivePartnerProfile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load profile:', e);
        navigate('/assessment');
      }
    } else {
      navigate('/assessment');
    }
  }, [navigate]);

  if (!profile) {
    return <div>Loading...</div>;
  }
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<CognitivePartnerProfile>(profile);

  const handleSave = () => {
    const updatedProfile = { ...editedProfile, updatedAt: new Date().toISOString() };
    setProfile(updatedProfile);
    localStorage.setItem('cognitivePartnerProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen text-earth-800 p-6" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Cognitive Partner Profile</h1>
            <p className="text-earth-500">
              {isEditing ? 'Make changes to your preferences' : 'How we customize your experience'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-earth-100 hover:bg-earth-200 rounded-lg transition-colors"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
                >
                  <Check size={16} />
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate('/chat')}
                  className="px-4 py-2 bg-earth-100 hover:bg-earth-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-white rounded-xl border border-earth-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold">Personal Info</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-earth-500 mb-1">Name</div>
                <div className="text-lg">{profile.name}</div>
              </div>
              {profile.pronouns && (
                <div>
                  <div className="text-sm text-earth-500 mb-1">Pronouns</div>
                  <div className="text-lg">{profile.pronouns}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-earth-500 mb-1">How we address you</div>
                <div className="text-lg capitalize">{profile.preferredAddress.replace('-', ' ')}: <strong>{getDisplayName(profile)}</strong></div>
              </div>
            </div>
          </div>

          {/* Neurodivergent Identity */}
          <div className="bg-white rounded-xl border border-earth-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <Brain size={20} />
              </div>
              <h2 className="text-xl font-bold">Neurodivergent Profile</h2>
            </div>
            <div className="space-y-3">
              {profile.neurodivergentConditions.length > 0 && (
                <div>
                  <div className="text-sm text-earth-500 mb-2">Identity</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.neurodivergentConditions.map((condition) => (
                      <span key={condition} className="bg-purple-900/40 border border-purple-700/30 px-3 py-1 rounded-full text-sm">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.strengths.length > 0 && (
                <div>
                  <div className="text-sm text-earth-500 mb-2">Strengths</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.strengths.map((strength) => (
                      <span key={strength} className="bg-green-900/40 border border-green-700/30 px-3 py-1 rounded-full text-sm">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {profile.challenges.length > 0 && (
                <div>
                  <div className="text-sm text-earth-500 mb-2">Challenges</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.challenges.map((challenge) => (
                      <span key={challenge} className="bg-orange-900/40 border border-orange-700/30 px-3 py-1 rounded-full text-sm">
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Learning Style */}
          <div className="bg-white rounded-xl border border-earth-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h2 className="text-xl font-bold">Learning Preferences</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-earth-500 mb-2">Primary Style</div>
                <div className="text-lg capitalize font-semibold">{profile.learningStyle.primary.replace('-', '/')}</div>
              </div>
              <div>
                <div className="text-sm text-earth-500 mb-2">Ratings (1-5)</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Visual:</span>
                    <span className="font-medium">{profile.learningStyle.visual}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auditory:</span>
                    <span className="font-medium">{profile.learningStyle.auditory}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kinesthetic:</span>
                    <span className="font-medium">{profile.learningStyle.kinesthetic}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reading/Writing:</span>
                    <span className="font-medium">{profile.learningStyle.readingWriting}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Style */}
          <div className="bg-white rounded-xl border border-earth-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <h2 className="text-xl font-bold">Communication</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-earth-500">Tone:</span>
                <span className="font-medium capitalize">{profile.communication.tone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Detail Level:</span>
                <span className="font-medium capitalize">{profile.communication.detailLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Structure:</span>
                <span className="font-medium capitalize">{profile.communication.structure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Response Length:</span>
                <span className="font-medium capitalize">{profile.communication.responseLength}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Use Emojis:</span>
                <span className="font-medium">{profile.communication.useEmojis ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Avoid Jargon:</span>
                <span className="font-medium">{profile.communication.avoidJargon ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className="bg-white rounded-xl border border-earth-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                <Eye size={20} />
              </div>
              <h2 className="text-xl font-bold">Accessibility</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-earth-500">Font Size:</span>
                <span className="font-medium capitalize">{profile.accessibility.fontSize.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Font Family:</span>
                <span className="font-medium capitalize">{profile.accessibility.fontFamily}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Line Spacing:</span>
                <span className="font-medium capitalize">{profile.accessibility.lineSpacing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Letter Spacing:</span>
                <span className="font-medium capitalize">{profile.accessibility.letterSpacing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Color Scheme:</span>
                <span className="font-medium capitalize">{profile.accessibility.colorScheme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Text-to-Speech:</span>
                <span className="font-medium">{profile.accessibility.textToSpeech ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Voice Input:</span>
                <span className="font-medium">{profile.accessibility.voiceInput ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-earth-500">Reduced Motion:</span>
                <span className="font-medium">{profile.accessibility.reducedMotion ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Thinking Style */}
          <div className="bg-white rounded-xl border border-earth-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h2 className="text-xl font-bold">Thinking Preferences</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-earth-500 mb-2">Default Mode</div>
                <div className="text-lg capitalize font-semibold">{profile.thinkingStyle.defaultMode}</div>
              </div>
              <div>
                <div className="text-sm text-earth-500 mb-2">Preferred Modes</div>
                <div className="flex flex-wrap gap-2">
                  {profile.thinkingStyle.preferredModes.map((mode) => (
                    <span key={mode} className="bg-cyan-900/40 border border-cyan-700/30 px-3 py-1 rounded-full text-sm capitalize">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How This Affects Your Experience */}
        <div className="mt-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-700/30 p-6">
          <h3 className="text-xl font-bold mb-4">How This Affects Your Experience</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/50 rounded-lg p-4">
              <div className="font-semibold mb-2 text-blue-400">Chat Responses</div>
              <p className="text-earth-600">
                I'll use a {profile.communication.tone} tone, provide {profile.communication.detailLevel} answers in {profile.communication.structure === 'mixed' ? 'both lists and paragraphs' : profile.communication.structure}, and {profile.communication.useEmojis ? 'include' : 'avoid'} emojis.
              </p>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="font-semibold mb-2 text-green-400">Visual Display</div>
              <p className="text-earth-600">
                Text will use {profile.accessibility.fontSize} {profile.accessibility.fontFamily} font with {profile.accessibility.lineSpacing} line spacing and {profile.accessibility.letterSpacing} letter spacing.
              </p>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="font-semibold mb-2 text-purple-400">Default Mode</div>
              <p className="text-earth-600">
                When you start chatting, you'll begin in {profile.thinkingStyle.defaultMode} mode. You can switch anytime!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
