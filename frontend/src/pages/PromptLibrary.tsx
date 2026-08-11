import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle } from 'lucide-react';
import { prompts, getAllTags } from '../data/prompts';
import { PromptCard } from '../components/PromptCard';
import { PromptFiltersComponent } from '../components/PromptFilters';
import { applyFilters, copyToClipboard } from '../utils/promptHelpers';
import type { PromptFilters } from '../types/prompts';

export function PromptLibrary() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<PromptFilters>({
    userType: 'all',
    searchQuery: '',
    selectedTags: [],
    sortBy: 'popular',
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<Set<string>>(new Set());

  const availableTags = getAllTags();
  const filteredPrompts = applyFilters(prompts, filters);

  const handleCopyPrompt = async (promptText: string, promptId: string) => {
    const success = await copyToClipboard(promptText);
    if (success) {
      setCopiedId(promptId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSavePrompt = (promptId: string) => {
    const newSaved = new Set(savedPrompts);
    if (newSaved.has(promptId)) {
      newSaved.delete(promptId);
    } else {
      newSaved.add(promptId);
    }
    setSavedPrompts(newSaved);
  };

  const handlePromptClick = (promptId: string) => {
    navigate(`/prompts/${promptId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Chat
          </button>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Prompt Library</h1>
              <p className="text-gray-400 text-lg">
                Ready-to-use prompts optimized for neurodivergent thinkers
              </p>
            </div>

            <button
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
              onClick={() => {/* TODO: Open submit form */}}
            >
              <Plus size={20} />
              Submit Prompt
            </button>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 text-sm text-gray-300">
            <strong className="text-blue-400">Community-powered:</strong> These prompts are collected from real neurodivergent people asking real questions. Browse by user type, copy what works, and share what helps you.
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8">
          <PromptFiltersComponent
            filters={filters}
            availableTags={availableTags}
            resultCount={filteredPrompts.length}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-4">No prompts match your filters</p>
            <button
              onClick={() => setFilters({
                userType: 'all',
                searchQuery: '',
                selectedTags: [],
                sortBy: 'popular',
              })}
              className="text-cyan-500 hover:text-cyan-400 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map(prompt => (
              <div key={prompt.id} className="relative">
                <PromptCard
                  prompt={prompt}
                  onClick={() => handlePromptClick(prompt.id)}
                  onCopy={() => handleCopyPrompt(prompt.prompt, prompt.id)}
                  onSave={() => handleSavePrompt(prompt.id)}
                />

                {/* Copied notification */}
                {copiedId === prompt.id && (
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 shadow-lg animate-fade-in">
                    <CheckCircle size={14} />
                    Copied!
                  </div>
                )}

                {/* Saved indicator */}
                {savedPrompts.has(prompt.id) && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Saved
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
