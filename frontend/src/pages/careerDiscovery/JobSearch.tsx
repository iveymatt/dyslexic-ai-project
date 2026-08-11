import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserProfile, JobFilters } from '../../types/career';
import { jobs } from '../../data/careerDiscovery/jobs';
import { CareerCard } from '../../components/CareerCard';
import { applyJobFilters } from '../../utils/careerHelpers';
import { Search, Filter, Eye, X, Sparkles } from 'lucide-react';

// Enhanced jobs with full neurodivergent features
const ENHANCED_JOB_IDS = ['software-tester', 'graphic-designer', 'data-entry-specialist'];

export function JobSearch() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: '',
    cognitiveFit: 'all',
    aiRisk: 'all',
    sensoryDemands: 'all',
    socialDemands: 'all',
    salaryRange: { min: 20000, max: 150000 },
    sortBy: 'best-match',
  });

  useEffect(() => {
    const saved = localStorage.getItem('careerDiscoveryProfile');
    if (saved) {
      try {
        setUserProfile(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load profile:', e);
      }
    }
  }, []);

  const isDemo = userProfile?.isDemo || false;

  const handleExitDemo = () => {
    if (confirm('Exit demo mode and create your own profile?')) {
      localStorage.removeItem('careerDiscoveryProfile');
      window.location.reload();
    }
  };

  const filteredJobs = applyJobFilters(jobs, filters, userProfile);

  // Separate enhanced jobs from regular jobs for demo mode
  const enhancedJobs = isDemo
    ? filteredJobs.filter(job => ENHANCED_JOB_IDS.includes(job.id))
    : [];
  const regularJobs = isDemo
    ? filteredJobs.filter(job => !ENHANCED_JOB_IDS.includes(job.id))
    : filteredJobs;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Career Search</h1>
            <p className="text-gray-400">{filteredJobs.length} jobs matched to your profile</p>
          </div>
          <button onClick={() => navigate('/career-discovery')} className="btn-secondary">
            ← Back
          </button>
        </div>

        {/* Demo Mode Banner */}
        {isDemo && (
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-xl p-6 mb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <Eye size={32} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-green-300">You're in Demo Mode!</h2>
                    <span className="text-xs bg-green-600 px-2 py-1 rounded-full font-semibold">DEMO</span>
                  </div>
                  <p className="text-gray-300 mb-3">
                    Viewing careers matched to a sample profile: <strong>22-year-old with autism</strong>, strengths in pattern recognition, attention to detail, and visual thinking.
                  </p>
                  <p className="text-sm text-green-200">
                    ✨ <strong>3 careers below</strong> have full neurodivergent features: Soft Skills tips, AI assistive tools, workplace accommodations, and future AI impact analysis.
                  </p>
                </div>
              </div>
              <button
                onClick={handleExitDemo}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-all flex-shrink-0"
              >
                <X size={18} />
                <span className="text-sm">Exit Demo</span>
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-cyan-400" />
            <h2 className="text-lg font-semibold">Filters & Search</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs by title, industry, skills..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sort by</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as JobFilters['sortBy'] })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="best-match">Best Match</option>
                <option value="lowest-ai-risk">Lowest AI-Risk</option>
                <option value="highest-salary">Highest Salary</option>
                <option value="fastest-to-learn">Entry Level</option>
              </select>
            </div>

            {/* AI Risk */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">AI-Risk</label>
              <select
                value={filters.aiRisk}
                onChange={(e) => setFilters({ ...filters, aiRisk: e.target.value as JobFilters['aiRisk'] })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="all">All Levels</option>
                <option value="low">Low Risk Only</option>
                <option value="medium">Medium Risk</option>
              </select>
            </div>

            {/* Social Demands */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Social Level</label>
              <select
                value={filters.socialDemands}
                onChange={(e) => setFilters({ ...filters, socialDemands: e.target.value as JobFilters['socialDemands'] })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="all">All Levels</option>
                <option value="minimal">Minimal</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Jobs Section (Demo Mode Only) */}
        {isDemo && enhancedJobs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={24} className="text-yellow-400" />
              <h2 className="text-2xl font-bold text-yellow-300">
                ✨ Fully Enhanced Careers (Try These First!)
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              These 3 careers have comprehensive neurodivergent features including soft skills breakdowns,
              AI assistive tools, workplace accommodations, and future AI impact analysis.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {enhancedJobs.map((job) => (
                <div key={job.id} className="relative">
                  <div className="absolute -top-3 -right-3 z-10 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ENHANCED ⭐
                  </div>
                  <CareerCard
                    job={job}
                    userProfile={userProfile}
                    onDetailsClick={() => navigate(`/career-discovery/jobs/${job.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Jobs Section (or all jobs if not demo) */}
        {isDemo && regularJobs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-400 mb-6">Other Career Matches</h2>
            <div className="grid md:grid-cols-2 gap-6 opacity-70">
              {regularJobs.map((job) => (
                <CareerCard
                  key={job.id}
                  job={job}
                  userProfile={userProfile}
                  onDetailsClick={() => navigate(`/career-discovery/jobs/${job.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {!isDemo && (
          <div className="grid md:grid-cols-2 gap-6">
            {regularJobs.map((job) => (
              <CareerCard
                key={job.id}
                job={job}
                userProfile={userProfile}
                onDetailsClick={() => navigate(`/career-discovery/jobs/${job.id}`)}
              />
            ))}
          </div>
        )}

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No jobs match your filters. Try adjusting them!</p>
          </div>
        )}
      </div>
    </div>
  );
}
