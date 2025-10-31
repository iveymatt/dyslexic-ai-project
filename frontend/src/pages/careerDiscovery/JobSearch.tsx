import { useState, useEffect } from 'react';
import type { UserProfile, JobFilters } from '../../types/career';
import { jobs } from '../../data/careerDiscovery/jobs';
import { CareerCard } from '../../components/CareerCard';
import { applyJobFilters } from '../../utils/careerHelpers';
import { Search, Filter } from 'lucide-react';

interface JobSearchProps {
  onBack: () => void;
  onJobSelect: (jobId: string) => void;
}

export function JobSearch({ onBack, onJobSelect }: JobSearchProps) {
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

  const filteredJobs = applyJobFilters(jobs, filters, userProfile);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Career Search</h1>
            <p className="text-gray-400">{filteredJobs.length} jobs matched to your profile</p>
          </div>
          <button onClick={onBack} className="btn-secondary">
            ← Back
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-primary-400" />
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

        {/* Job Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <CareerCard
              key={job.id}
              job={job}
              userProfile={userProfile}
              onDetailsClick={() => onJobSelect(job.id)}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No jobs match your filters. Try adjusting them!</p>
          </div>
        )}
      </div>
    </div>
  );
}
