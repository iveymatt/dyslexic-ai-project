
import type { Job, UserProfile } from '../types/career';
import {
  calculateCognitiveFit,
  formatSalary,
  getAIRiskLabel,
  getAIRiskColor,
  getCognitiveFitLabel,
  getCognitiveFitColor,
} from '../utils/careerHelpers';
import { Bookmark, ExternalLink } from 'lucide-react';

interface CareerCardProps {
  job: Job;
  userProfile: UserProfile | null;
  onDetailsClick: () => void;
  onSave?: () => void;
  isSaved?: boolean;
}

export function CareerCard({ job, userProfile, onDetailsClick, onSave, isSaved }: CareerCardProps) {
  const cognitiveFit = userProfile && userProfile.profileCompleted
    ? calculateCognitiveFit(userProfile, job)
    : null;

  const cognitiveBarCount = cognitiveFit ? Math.round(cognitiveFit) : 0;
  const aiRiskBarCount = job.aiRiskScore;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
          <p className="text-gray-400 text-sm">
            {job.industry} | {job.level.charAt(0).toUpperCase() + job.level.slice(1)} level
          </p>
        </div>
        {onSave && (
          <button
            onClick={onSave}
            className={`p-2 rounded-lg transition-colors ${
              isSaved ? 'bg-primary-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            aria-label={isSaved ? 'Saved' : 'Save job'}
          >
            <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      {/* Scores */}
      {cognitiveFit !== null && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-400">Cognitive Fit:</span>
            <span className={`text-sm font-semibold ${getCognitiveFitColor(cognitiveFit)}`}>
              {getCognitiveFitLabel(cognitiveFit)}
            </span>
          </div>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-sm ${
                  i < cognitiveBarCount ? 'bg-primary-600' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-400">AI-Risk:</span>
          <span className={`text-sm font-semibold ${getAIRiskColor(job.aiRiskScore)}`}>
            {getAIRiskLabel(job.aiRiskScore)}
          </span>
        </div>
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-sm ${
                i < aiRiskBarCount
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

      {/* Salary */}
      <div className="mb-4">
        <span className="text-gray-400 text-sm">Salary: </span>
        <span className="text-white font-semibold">{formatSalary(job.salary.min, job.salary.max)}</span>
      </div>

      {/* Sensory & Social */}
      <div className="flex gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-400">Sensory: </span>
          <span className="text-white capitalize">{job.sensoryDemands.noise} noise</span>
        </div>
        <div>
          <span className="text-gray-400">Social: </span>
          <span className="text-white capitalize">{job.socialDemands}</span>
        </div>
      </div>

      {/* Why it matches (if profile exists) */}
      {cognitiveFit !== null && cognitiveFit >= 6 && (
        <div className="bg-primary-900/20 border border-primary-800/30 rounded-lg p-3 mb-4">
          <p className="text-sm font-semibold text-primary-300 mb-2">Why it matches YOU:</p>
          <ul className="space-y-1 text-sm text-gray-300">
            {job.cognitiveProfile.strengths.slice(0, 3).map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary-400 flex-shrink-0">•</span>
                <span>Values {strength.replace(/-/g, ' ')} (your strength!)</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Training & Growth */}
      <div className="mb-4 text-sm">
        <p className="text-gray-400 mb-1">Training needed:</p>
        <p className="text-white">{job.skillsNeeded.slice(0, 3).join(', ')}</p>
      </div>

      <div className="mb-4 text-sm">
        <p className="text-gray-400 mb-1">Growth path:</p>
        <p className="text-white">{job.growthPath.join(' → ')}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onDetailsClick}
          className="flex-1 btn-primary text-sm py-2 inline-flex items-center justify-center gap-2"
        >
          Learn More
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}
