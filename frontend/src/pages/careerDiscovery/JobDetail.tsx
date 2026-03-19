import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { ArrowLeft, Bookmark, Lightbulb, TrendingUp } from 'lucide-react';
import {
  SoftSkillsSection,
  AIAssistiveToolsSection,
  AccommodationsSection,
  FutureAIImpactSection,
  EnhancedSensorySection,
} from '../../components/career/NeurodivergentJobFeatures';

export function JobDetail() {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <div className="text-center">
          <p className="text-xl mb-4" style={{ color: 'var(--text-secondary)' }}>Job not found</p>
          <button onClick={() => navigate('/career-discovery/jobs')} className="btn-primary">
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
    if (!userProfile || !jobId) return;
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
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="container mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/career-discovery/jobs')} className="btn-secondary">
            <ArrowLeft size={18} />
            Back to Jobs
          </button>
          {userProfile && (
            <button
              onClick={handleSave}
              className={`btn-secondary inline-flex items-center gap-2 ${isSaved ? 'bg-cyan-100 border-cyan-400 text-cyan-800' : ''}`}
            >
              <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Saved' : 'Save Job'}
            </button>
          )}
        </div>

        {/* Job Header */}
        <div className="rounded-2xl p-8 mb-8 border-2" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-strong)' }}>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            <span>{job.industry}</span>
            <span>•</span>
            <span className="capitalize">{job.level} level</span>
            <span>•</span>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{formatSalary(job.salary.min, job.salary.max)}</span>
          </div>

          {/* Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            {cognitiveFit !== null && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Cognitive Fit:</span>
                  <span className={`font-semibold ${getCognitiveFitColor(cognitiveFit)}`}>
                    {cognitiveFit}/10 — {getCognitiveFitLabel(cognitiveFit)}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 flex-1 rounded-sm ${i < Math.round(cognitiveFit) ? 'bg-cyan-500' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>AI-Risk:</span>
                <span className={`font-semibold ${getAIRiskColor(job.aiRiskScore)}`}>
                  {job.aiRiskScore}/10 — {getAIRiskLabel(job.aiRiskScore)}
                </span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 flex-1 rounded-sm ${
                      i < job.aiRiskScore
                        ? job.aiRiskScore <= 3 ? 'bg-green-500'
                        : job.aiRiskScore <= 6 ? 'bg-yellow-500'
                        : 'bg-orange-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why This Matches You */}
        {cognitiveFit !== null && cognitiveFit >= 6 && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-green-900">Why This Matches YOU</h2>
            </div>
            <ul className="space-y-2">
              {job.cognitiveProfile.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-green-800">
                  <span className="text-green-600 flex-shrink-0 font-bold">✓</span>
                  <span>This job values {strength.replace(/-/g, ' ')} — one of your key strengths!</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What You'd Do */}
        <div className="rounded-xl p-6 border-2 mb-8" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>What You'd Do</h2>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{job.description}</p>

          <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Typical Day:</h3>
          <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{job.typicalDay}</p>

          <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Skills Needed:</h3>
          <div className="flex flex-wrap gap-2">
            {job.skillsNeeded.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-full text-blue-800 text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* The Numbers */}
        <div className="rounded-xl p-6 border-2 mb-8" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>The Numbers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Salary Range', value: formatSalary(job.salary.min, job.salary.max) },
              { label: 'Typical Schedule', value: job.schedule },
              { label: 'Hours per Week', value: `${job.hoursPerWeek} hours` },
              { label: 'Remote Options', value: job.sensoryDemands.remote ? 'Yes ✓' : 'Limited' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
                <p className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Sensory & Social Details */}
        <div className="mb-8">
          <EnhancedSensorySection sensory={job.sensoryDemands} socialDetails={job.socialDemandDetails} />
        </div>

        {job.softSkills && job.softSkills.length > 0 && (
          <div className="mb-8">
            <SoftSkillsSection skills={job.softSkills} userChallenges={userProfile?.challenges} />
          </div>
        )}

        {job.aiAssistiveTools && job.aiAssistiveTools.length > 0 && (
          <div className="mb-8">
            <AIAssistiveToolsSection tools={job.aiAssistiveTools} userChallenges={userProfile?.challenges} />
          </div>
        )}

        {job.accommodations && job.accommodations.length > 0 && (
          <div className="mb-8">
            <AccommodationsSection accommodations={job.accommodations} />
          </div>
        )}

        {job.futureAIImpact && (
          <div className="mb-8">
            <FutureAIImpactSection impact={job.futureAIImpact} aiRiskScore={job.aiRiskScore} />
          </div>
        )}

        {/* How to Get Started */}
        <div className="bg-cyan-50 border-2 border-cyan-300 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-cyan-700" size={24} />
            <h2 className="text-2xl font-bold text-cyan-900">How to Get Started</h2>
          </div>
          <ol className="space-y-3">
            {job.gettingStarted.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <span className="text-cyan-900 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Career Growth Path */}
        <div className="rounded-xl p-6 border-2 mb-8" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Career Growth Path</h2>
          <div className="flex flex-wrap items-center gap-2">
            {job.growthPath.map((level, idx) => (
              <React.Fragment key={idx}>
                <span className="px-4 py-2 bg-green-100 border-2 border-green-300 rounded-lg text-green-800 font-medium">
                  {level}
                </span>
                {idx < job.growthPath.length - 1 && (
                  <span className="text-gray-400 font-bold text-lg">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Similar Jobs */}
        {job.similar.length > 0 && (
          <div className="rounded-xl p-6 border-2" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>You Might Also Like</h2>
            <div className="flex flex-wrap gap-3">
              {job.similar.map((similarJob, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg font-medium hover:border-cyan-500 hover:bg-cyan-50 cursor-pointer transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
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
