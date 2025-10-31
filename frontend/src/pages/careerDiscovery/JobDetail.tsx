import React, { useState, useEffect } from 'react';
import type { UserProfile } from '../../types/career';
import { jobs } from '../../data/careerDiscovery/jobs';
import {
  calculateCognitiveFit,
  formatSalary,
  getAIRiskLabel,
  getAIRiskColor,
  getCognitiveFitLabel,
  getCognitiveFitColor,
} from '../../utils/careerHelpers';
import { ArrowLeft, Bookmark, Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';

interface JobDetailProps {
  jobId: string;
  onBack: () => void;
}

export function JobDetail({ jobId, onBack }: JobDetailProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const job = jobs.find((j) => j.id === jobId);

  useEffect(() => {
    const saved = localStorage.getItem('careerDiscoveryProfile');
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setUserProfile(profile);
        setIsSaved(profile.savedJobs?.includes(jobId) || false);
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }
  }, [jobId]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400 mb-4">Job not found</p>
          <button onClick={onBack} className="btn-primary">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const cognitiveFit = userProfile && userProfile.profileCompleted
    ? calculateCognitiveFit(userProfile, job)
    : null;

  const handleSave = () => {
    if (!userProfile) return;
    const updated = {
      ...userProfile,
      savedJobs: isSaved
        ? userProfile.savedJobs.filter((id: string) => id !== jobId)
        : [...userProfile.savedJobs, jobId],
    };
    localStorage.setItem('careerDiscoveryProfile', JSON.stringify(updated));
    setUserProfile(updated);
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="btn-secondary">
            <ArrowLeft size={18} />
            Back to Jobs
          </button>
          {userProfile && (
            <button
              onClick={handleSave}
              className={`btn-secondary inline-flex items-center gap-2 ${
                isSaved ? 'bg-primary-600 border-primary-500' : ''
              }`}
            >
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Saved' : 'Save Job'}
            </button>
          )}
        </div>

        {/* Job Header */}
        <div className="bg-gradient-to-br from-primary-900/30 to-accent-900/30 rounded-2xl p-8 border border-primary-700/30 mb-8">
          <h1 className="text-4xl font-bold mb-3">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-lg text-gray-300 mb-6">
            <span>{job.industry}</span>
            <span>•</span>
            <span className="capitalize">{job.level} level</span>
            <span>•</span>
            <span className="font-semibold text-white">{formatSalary(job.salary.min, job.salary.max)}</span>
          </div>

          {/* Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            {cognitiveFit !== null && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Cognitive Fit:</span>
                  <span className={`font-semibold ${getCognitiveFitColor(cognitiveFit)}`}>
                    {cognitiveFit}/10 - {getCognitiveFitLabel(cognitiveFit)}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 flex-1 rounded-sm ${
                        i < Math.round(cognitiveFit) ? 'bg-primary-600' : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">AI-Risk:</span>
                <span className={`font-semibold ${getAIRiskColor(job.aiRiskScore)}`}>
                  {job.aiRiskScore}/10 - {getAIRiskLabel(job.aiRiskScore)}
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 flex-1 rounded-sm ${
                      i < job.aiRiskScore
                        ? job.aiRiskScore <= 3
                          ? 'bg-green-600'
                          : job.aiRiskScore <= 6
                          ? 'bg-yellow-600'
                          : 'bg-orange-600'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why This Matches You */}
        {cognitiveFit !== null && cognitiveFit >= 6 && (
          <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-green-400" size={24} />
              <h2 className="text-2xl font-bold">Why This Matches YOU</h2>
            </div>
            <ul className="space-y-2">
              {job.cognitiveProfile.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>This job values {strength.replace(/-/g, ' ')} — one of your key strengths!</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What You'd Do */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-4">What You'd Do</h2>
          <p className="text-gray-300 mb-6">{job.description}</p>

          <h3 className="text-lg font-semibold mb-3">Typical Day:</h3>
          <p className="text-gray-300 mb-6">{job.typicalDay}</p>

          <h3 className="text-lg font-semibold mb-3">Skills Needed:</h3>
          <div className="flex flex-wrap gap-2">
            {job.skillsNeeded.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-900/30 border border-blue-700/50 rounded-full text-blue-200 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* The Numbers */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-4">The Numbers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 mb-1">Salary Range</p>
              <p className="text-xl font-semibold">{formatSalary(job.salary.min, job.salary.max)}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Typical Schedule</p>
              <p className="text-xl font-semibold">{job.schedule}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Hours per Week</p>
              <p className="text-xl font-semibold">{job.hoursPerWeek} hours</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Remote Options</p>
              <p className="text-xl font-semibold">{job.sensoryDemands.remote ? 'Yes ✓' : 'Limited'}</p>
            </div>
          </div>
        </div>

        {/* Sensory & Social */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-orange-400" size={24} />
            <h2 className="text-2xl font-bold">Sensory & Social Demands</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 mb-2">Office Environment</p>
              <p className="text-white capitalize">
                {job.sensoryDemands.noise} noise • {job.sensoryDemands.lights} lighting
              </p>
              <p className="text-white">
                {job.sensoryDemands.openPlan ? 'Open plan office' : 'Private/quiet space'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Social Interaction</p>
              <p className="text-white capitalize">{job.socialDemands} social demands</p>
            </div>
          </div>
        </div>

        {/* How to Get Started */}
        <div className="bg-primary-900/20 border border-primary-700/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-primary-400" size={24} />
            <h2 className="text-2xl font-bold">How to Get Started</h2>
          </div>
          <ol className="space-y-3">
            {job.gettingStarted.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <span className="text-gray-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Growth Path */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold mb-4">Career Growth Path</h2>
          <div className="flex flex-wrap items-center gap-2">
            {job.growthPath.map((level, idx) => (
              <React.Fragment key={idx}>
                <span className="px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-lg text-green-200">
                  {level}
                </span>
                {idx < job.growthPath.length - 1 && (
                  <span className="text-gray-600">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Similar Jobs */}
        {job.similar.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
            <div className="flex flex-wrap gap-3">
              {job.similar.map((similarJob, idx) => (
                <span key={idx} className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:border-primary-500 cursor-pointer transition-colors">
                  {similarJob}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
