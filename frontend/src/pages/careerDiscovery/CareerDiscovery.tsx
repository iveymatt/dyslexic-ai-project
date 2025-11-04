import { useState, useEffect } from 'react';
import type { UserProfile } from '../../types/career';
import { CognitiveProfile } from '../../components/CognitiveProfile';
import { Briefcase, BookOpen, Lightbulb, ArrowRight, Star, Users, Zap, Clipboard } from 'lucide-react';
import {
  calculateLifeSkillsProgress,
  calculateAILiteracyProgress,
} from '../../utils/careerHelpers';
import { jobs } from '../../data/careerDiscovery/jobs';

interface CareerDiscoveryProps {
  onBack: () => void;
  onStartProfile: () => void;
  onQuickStart: () => void;
  onViewJobs: () => void;
  onViewLifeSkills: () => void;
  onViewAILiteracy: () => void;
}

export function CareerDiscovery({
  onBack,
  onStartProfile,
  onQuickStart,
  onViewJobs,
  onViewLifeSkills,
  onViewAILiteracy,
}: CareerDiscoveryProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Load user profile from localStorage
    const saved = localStorage.getItem('careerDiscoveryProfile');
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }
  }, []);

  const hasProfile = userProfile && userProfile.profileCompleted;

  const lifeSkillsProgress = hasProfile
    ? calculateLifeSkillsProgress(userProfile.lifeSkillsProgress)
    : 0;

  const aiLiteracyProgress = hasProfile
    ? calculateAILiteracyProgress(userProfile.aiLiteracyProgress)
    : 0;

  const matchedJobsCount = jobs.length;

  // First time user - no profile
  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Career Discovery</h1>
            <button onClick={onBack} className="btn-secondary">
              ← Back
            </button>
          </div>

          {/* Welcome Section */}
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
              <Briefcase size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Find Your Career Path</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover careers that match how YOUR brain works. Get personalized job recommendations
              based on your neurodivergent strengths, challenges, and interests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4 max-w-3xl mx-auto">
              <button
                onClick={onQuickStart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-5 px-8 rounded-lg shadow-lg transition-all flex items-center justify-center gap-3"
              >
                <Zap size={24} />
                <div className="text-left">
                  <div className="text-lg">Quick Start</div>
                  <div className="text-xs opacity-90">Already know your needs?</div>
                </div>
              </button>

              <button
                onClick={onStartProfile}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-5 px-8 rounded-lg shadow-lg transition-all flex items-center justify-center gap-3"
              >
                <Clipboard size={24} />
                <div className="text-left">
                  <div className="text-lg">Full Assessment</div>
                  <div className="text-xs opacity-90">7 steps, personalized matches</div>
                </div>
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-12">
              Not sure which to choose? Quick Start gets you exploring careers in 2 minutes.
              Full Assessment gives the most personalized matches.
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Briefcase className="text-blue-400 mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">Career Matching</h3>
                <p className="text-gray-400 text-sm">
                  30+ careers matched to neurodivergent strengths. See cognitive fit scores,
                  AI-risk ratings, and sensory demands.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <BookOpen className="text-green-400 mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">Life Skills Coach</h3>
                <p className="text-gray-400 text-sm">
                  Learn time management, money skills, interviews, emotional regulation, and social
                  skills.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Lightbulb className="text-yellow-400 mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">AI Literacy Training</h3>
                <p className="text-gray-400 text-sm">
                  Master AI tools for job search, learning, and daily life. 10 modules from beginner
                  to advanced.
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-primary-900/30 to-accent-900/30 rounded-xl p-8 border border-primary-700/30 mt-12">
              <div className="flex items-center gap-2 justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-lg italic text-gray-300 mb-4">
                "I have autism and ADHD. I never knew what career would work for me. This tool showed
                me jobs that actually fit how my brain works. I found a job I love!"
              </p>
              <p className="text-sm text-gray-500">- Alex, 23, Software Tester</p>
            </div>

            {/* FAQ */}
            <div className="mt-16 text-left max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold mb-2">What is this?</h4>
                  <p className="text-gray-400 text-sm">
                    A career development platform designed specifically for neurodivergent people
                    (autism, ADHD, dyslexia, etc.). We match you with jobs based on cognitive fit,
                    not just skills.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold mb-2">How does it work?</h4>
                  <p className="text-gray-400 text-sm">
                    You fill out a profile about your neurodivergence, strengths, challenges, and
                    interests. Our algorithm matches you with careers that fit YOUR brain.
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-semibold mb-2">Is it for me?</h4>
                  <p className="text-gray-400 text-sm">
                    Yes! If you're neurodivergent (18-30 years old) and looking for career direction,
                    this is for you. No prior work experience needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Has profile - show dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Career Discovery</h1>
            <p className="text-gray-400">Welcome back, {userProfile.name || 'there'}!</p>
          </div>
          <button onClick={onBack} className="btn-secondary">
            ← Back
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-6 border border-blue-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="text-blue-400" size={24} />
              <h3 className="text-lg font-semibold">Jobs Matched</h3>
            </div>
            <p className="text-3xl font-bold">{matchedJobsCount}</p>
            <p className="text-sm text-gray-400 mt-1">careers matched to your profile</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-6 border border-green-700/50">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-green-400" size={24} />
              <h3 className="text-lg font-semibold">Life Skills</h3>
            </div>
            <p className="text-3xl font-bold">{lifeSkillsProgress}%</p>
            <p className="text-sm text-gray-400 mt-1">overall progress</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 rounded-xl p-6 border border-yellow-700/50">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold">AI Literacy</h3>
            </div>
            <p className="text-3xl font-bold">{aiLiteracyProgress}%</p>
            <p className="text-sm text-gray-400 mt-1">modules completed</p>
          </div>
        </div>

        {/* Cognitive Profile */}
        <div className="mb-8">
          <CognitiveProfile profile={userProfile} onEdit={onStartProfile} />
          <div className="mt-4 flex gap-3 justify-end">
            <button
              onClick={() => {
                if (confirm('Start fresh with a new profile? This will replace your current profile.')) {
                  localStorage.removeItem('careerDiscoveryProfile');
                  window.location.reload();
                }
              }}
              className="text-sm px-4 py-2 rounded-lg border border-gray-600 hover:border-red-500 hover:text-red-400 transition-all"
            >
              Start Fresh
            </button>
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Career Matches */}
          <button
            onClick={onViewJobs}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="text-blue-400" size={24} />
                  <h3 className="text-xl font-bold">Career Matches</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Browse {matchedJobsCount} jobs matched to your cognitive profile
                </p>
              </div>
              <ArrowRight
                size={24}
                className="text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
              <p className="text-sm text-blue-200">
                Top match: Software Tester (9.2/10 cognitive fit)
              </p>
            </div>
          </button>

          {/* Life Skills */}
          <button
            onClick={onViewLifeSkills}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="text-green-400" size={24} />
                  <h3 className="text-xl font-bold">Life Skills Coach</h3>
                </div>
                <p className="text-gray-400 text-sm">Time, money, interviews, emotions, social skills</p>
              </div>
              <ArrowRight
                size={24}
                className="text-gray-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
              <p className="text-sm text-green-200">5 modules • {lifeSkillsProgress}% complete</p>
            </div>
          </button>

          {/* AI Literacy */}
          <button
            onClick={onViewAILiteracy}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="text-yellow-400" size={24} />
                  <h3 className="text-xl font-bold">AI Literacy Training</h3>
                </div>
                <p className="text-gray-400 text-sm">Master AI tools for work and life</p>
              </div>
              <ArrowRight
                size={24}
                className="text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all"
              />
            </div>
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
              <p className="text-sm text-yellow-200">
                10 modules • {aiLiteracyProgress}% complete
              </p>
            </div>
          </button>

          {/* Community (Future) */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-gray-500" size={24} />
                  <h3 className="text-xl font-bold text-gray-500">Community</h3>
                </div>
                <p className="text-gray-500 text-sm">Connect with other neurodivergent job seekers</p>
              </div>
            </div>
            <div className="bg-gray-700/20 border border-gray-600/30 rounded-lg p-3">
              <p className="text-sm text-gray-500">Coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
