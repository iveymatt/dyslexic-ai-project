import { Search, TrendingUp, Clock, Star, Flame } from 'lucide-react';
import type { PromptFilters, UserType, SortOption } from '../types/prompts';
import { USER_TYPE_LABELS } from '../types/prompts';

interface PromptFiltersProps {
  filters: PromptFilters;
  availableTags: string[];
  resultCount: number;
  onFiltersChange: (filters: PromptFilters) => void;
}

export function PromptFiltersComponent({
  filters,
  availableTags,
  resultCount,
  onFiltersChange,
}: PromptFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      userType: e.target.value as UserType | 'all',
    });
  };

  const handleSortChange = (sortBy: SortOption) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const handleTagClick = (tag: string) => {
    const isSelected = filters.selectedTags.includes(tag);
    const newTags = isSelected
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];

    onFiltersChange({
      ...filters,
      selectedTags: newTags,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      userType: 'all',
      searchQuery: '',
      selectedTags: [],
      sortBy: 'popular',
    });
  };

  const hasActiveFilters = filters.userType !== 'all' || filters.searchQuery || filters.selectedTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Search and User Type */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-500" size={20} />
          <input
            type="text"
            placeholder="Search prompts..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 bg-white border border-earth-200 rounded-lg text-earth-800 placeholder-gray-400 focus:outline-none focus:border-cyan-600 transition-colors"
          />
        </div>

        {/* User Type Filter */}
        <select
          value={filters.userType}
          onChange={handleUserTypeChange}
          className="px-4 py-3 bg-white border border-earth-200 rounded-lg text-earth-800 focus:outline-none focus:border-cyan-600 transition-colors cursor-pointer"
        >
          {Object.entries(USER_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Options */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-earth-500 font-medium">Sort by:</span>
        <button
          onClick={() => handleSortChange('popular')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters.sortBy === 'popular'
              ? 'bg-cyan-600 text-white'
              : 'bg-white text-earth-600 hover:bg-earth-100'
          }`}
        >
          <Star size={14} />
          Most Popular
        </button>
        <button
          onClick={() => handleSortChange('newest')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters.sortBy === 'newest'
              ? 'bg-cyan-600 text-white'
              : 'bg-white text-earth-600 hover:bg-earth-100'
          }`}
        >
          <Clock size={14} />
          Newest
        </button>
        <button
          onClick={() => handleSortChange('most-used')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters.sortBy === 'most-used'
              ? 'bg-cyan-600 text-white'
              : 'bg-white text-earth-600 hover:bg-earth-100'
          }`}
        >
          <TrendingUp size={14} />
          Most Used
        </button>
        <button
          onClick={() => handleSortChange('trending')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filters.sortBy === 'trending'
              ? 'bg-cyan-600 text-white'
              : 'bg-white text-earth-600 hover:bg-earth-100'
          }`}
        >
          <Flame size={14} />
          Trending
        </button>
      </div>

      {/* Tags */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-earth-500 font-medium">Filter by tags:</span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-cyan-500 hover:text-cyan-500 font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => {
            const isSelected = filters.selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-earth-600 hover:bg-earth-100 border border-earth-200'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <div className="text-sm text-earth-500">
        Showing {resultCount} {resultCount === 1 ? 'prompt' : 'prompts'}
      </div>
    </div>
  );
}
