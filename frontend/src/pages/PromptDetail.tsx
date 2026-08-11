import { ArrowLeft, Copy, MessageCircle, Star, ThumbsUp, Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { prompts } from '../data/prompts';
import { copyToClipboard, getRelatedPrompts } from '../utils/promptHelpers';
import { PromptCard } from '../components/PromptCard';
import { USER_TYPE_COLORS, MODE_COLORS, MODE_LABELS, USER_TYPE_LABELS } from '../types/prompts';
import { useApp } from '../context/AppContext';

export function PromptDetail() {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const { setPendingPrompt } = useApp();
  const prompt = prompts.find(p => p.id === promptId);
  const [copied, setCopied] = useState(false);
  const [upvoted, setUpvoted] = useState(false);

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Prompt not found</p>
          <button onClick={() => navigate('/prompts')} className="text-cyan-500 hover:text-cyan-400 font-medium">
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  const relatedPrompts = getRelatedPrompts(prompt, prompts);

  const handleCopy = async () => {
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUseInChat = () => {
    setPendingPrompt(prompt.prompt);
    navigate('/chat');
  };

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    // In a real app, this would call an API
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/prompts/${prompt.id}`;
    await copyToClipboard(url);
    // Show share notification
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/prompts')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Library
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {prompt.emoji && <span className="text-4xl">{prompt.emoji}</span>}
                <h1 className="text-3xl font-bold">{prompt.title}</h1>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`${USER_TYPE_COLORS[prompt.userType]} text-white text-sm font-medium px-3 py-1 rounded`}>
                  {USER_TYPE_LABELS[prompt.userType]}
                </span>
                <span className={`${MODE_COLORS[prompt.bestMode]} text-white text-sm font-medium px-3 py-1 rounded`}>
                  Best Mode: {MODE_LABELS[prompt.bestMode]}
                </span>
                {prompt.verified && (
                  <span className="bg-green-900/30 border border-green-700/50 text-green-400 text-sm font-medium px-3 py-1 rounded flex items-center gap-1">
                    ✓ Community Verified
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
                aria-label="Share"
                title="Share"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Description */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">When to use this</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {prompt.description}
          </p>
        </section>

        {/* The Prompt */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">The Prompt</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors border border-gray-700"
              >
                {copied ? (
                  <>
                    <CheckCircle size={18} className="text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleUseInChat}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
              >
                <MessageCircle size={18} />
                Use in Chat
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-200 leading-relaxed">
              {prompt.prompt}
            </pre>
          </div>
        </section>

        {/* Tags */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-blue-900/30 border border-blue-700/50 text-blue-300 rounded-lg text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Best Mode Explanation */}
        <section className="mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-700/30">
          <h2 className="text-xl font-bold mb-3">Best Mode: {MODE_LABELS[prompt.bestMode]}</h2>
          <p className="text-gray-300">
            {prompt.bestMode === 'socratic' && (
              "This prompt works best in SOCRATIC mode because it encourages exploration, asks questions, and helps you think through the problem together."
            )}
            {prompt.bestMode === 'strategic' && (
              "This prompt works best in STRATEGIC mode because it's direct, action-oriented, and gives you clear steps to follow."
            )}
            {prompt.bestMode === 'both' && (
              "This prompt works well in BOTH modes. Use SOCRATIC if you want to explore and think it through, or STRATEGIC if you want direct answers."
            )}
          </p>
        </section>

        {/* Example Use Case */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Real Example</h2>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-300 leading-relaxed">
              {prompt.exampleUseCase}
            </p>
          </div>
        </section>

        {/* Community Engagement */}
        <section className="mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-6 text-gray-300">
                <span className="flex items-center gap-2 text-lg">
                  <Star size={20} className="text-yellow-500" />
                  <span className="font-bold">{prompt.rating + (upvoted ? 1 : 0)}</span>
                  <span className="text-gray-400">helpful</span>
                </span>
                <span className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  {prompt.commentCount} comments
                </span>
                <span className="text-gray-400">
                  Used {prompt.usedCount} times
                </span>
              </div>

              <button
                onClick={handleUpvote}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  upvoted
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <ThumbsUp size={18} />
                {upvoted ? 'Helpful!' : 'Mark as Helpful'}
              </button>
            </div>

            <p className="text-sm text-gray-400">
              <strong className="text-green-400">{prompt.rating}</strong> people found this prompt helpful for their neurodivergent brain.
            </p>
          </div>
        </section>

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPrompts.slice(0, 4).map(relatedPrompt => (
                <PromptCard
                  key={relatedPrompt.id}
                  prompt={relatedPrompt}
                  onClick={() => navigate(`/prompts/${relatedPrompt.id}`)}
                  onCopy={() => copyToClipboard(relatedPrompt.prompt)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
