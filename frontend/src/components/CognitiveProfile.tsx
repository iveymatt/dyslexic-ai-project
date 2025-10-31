
import type { UserProfile } from '../types/career';
import { getStrengthLabel, getChallengeLabel, getCareerInterestLabel } from '../utils/careerHelpers';
import { Brain, Sparkles, AlertCircle, Heart, Edit } from 'lucide-react';

interface CognitiveProfileProps {
  profile: UserProfile;
  onEdit?: () => void;
}

export function CognitiveProfile({ profile, onEdit }: CognitiveProfileProps) {
  return (
    <div className="bg-gradient-to-br from-primary-900/30 to-accent-900/30 rounded-2xl p-6 border border-primary-700/30">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="text-primary-400" size={28} />
            <h2 className="text-2xl font-bold text-white">Your Cognitive Profile</h2>
          </div>
          {profile.name && (
            <p className="text-gray-300">
              {profile.name}, {profile.age && `${profile.age} years old`}
            </p>
          )}
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="btn-secondary text-sm inline-flex items-center gap-2"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Neurodivergence */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Neurodivergence</h3>
        <div className="flex flex-wrap gap-2">
          {profile.neurodivergence.map((nd) => (
            <span
              key={nd}
              className="px-3 py-1 bg-purple-900/40 border border-purple-700/50 rounded-full text-purple-200 text-sm capitalize"
            >
              {nd}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-yellow-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Your Strengths</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {profile.strengths.map((strength) => (
            <div
              key={strength}
              className="bg-green-900/20 border border-green-700/30 rounded-lg px-3 py-2 text-sm text-green-200"
            >
              ✓ {getStrengthLabel(strength)}
            </div>
          ))}
        </div>
        {profile.specialInterests && (
          <div className="mt-3 bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
            <p className="text-sm text-gray-400 mb-1">Special Interests:</p>
            <p className="text-white">{profile.specialInterests}</p>
          </div>
        )}
      </div>

      {/* Challenges */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="text-orange-400" size={20} />
          <h3 className="text-lg font-semibold text-white">What's Harder for You</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          {profile.challenges.map((challenge) => (
            <div
              key={challenge}
              className="bg-orange-900/20 border border-orange-700/30 rounded-lg px-3 py-2 text-sm text-orange-200"
            >
              • {getChallengeLabel(challenge)}
            </div>
          ))}
        </div>
        <div className="mt-3 bg-gray-800/50 border border-gray-700 rounded-lg p-3">
          <p className="text-sm text-gray-400 mb-1">Sensory Preference:</p>
          <p className="text-white capitalize">{profile.sensoryPreference.replace(/-/g, ' ')}</p>
        </div>
      </div>

      {/* Career Interests */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="text-pink-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Career Interests</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.careerInterests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 bg-pink-900/40 border border-pink-700/50 rounded-full text-pink-200 text-sm"
            >
              {getCareerInterestLabel(interest)}
            </span>
          ))}
        </div>
        {profile.jobPriorities && profile.jobPriorities.length > 0 && (
          <div className="mt-3 bg-gray-800/50 border border-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-400 mb-2">What's most important in a job:</p>
            <div className="flex flex-wrap gap-2">
              {profile.jobPriorities.map((priority, idx) => (
                <span key={idx} className="text-sm text-gray-300 capitalize">
                  {idx + 1}. {priority.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
