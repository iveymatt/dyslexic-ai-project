import { useState } from 'react';
import { MessageCircle, Sparkles, X, Send, Lightbulb, Brain, TrendingUp } from 'lucide-react';

interface AICoachProps {
  context: 'teachable-moment' | 'lesson' | 'job-search' | 'general';
  scenario?: string;
  relatedPrompts?: string[];
  userProfile?: {
    leaderboardScore?: number;
    strengths?: string[];
    challenges?: string[];
  };
}

export function AICoach({ context, scenario, relatedPrompts, userProfile }: AICoachProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');

  const getContextualPrompt = () => {
    const strengths = userProfile?.strengths?.join(', ') || 'your unique strengths';
    const challenges = userProfile?.challenges?.join(', ') || 'areas you\'re working on';

    switch (context) {
      case 'teachable-moment':
        return `You're an AI coach helping an autistic young adult practice a real-world scenario. The scenario is: "${scenario}". Provide empathetic, concrete guidance. Reference their strengths: ${strengths}. Be specific and actionable.`;
      case 'lesson':
        return `You're an AI coach helping with a life skills lesson. The user is learning: "${scenario}". Provide clear, step-by-step guidance. Consider their challenges: ${challenges}.`;
      case 'job-search':
        return `You're an AI career coach for neurodivergent job seekers. Help with: "${scenario}". Focus on their strengths and accommodations they might need.`;
      default:
        return `You're a supportive AI coach for neurodivergent individuals. Provide clear, practical guidance.`;
    }
  };

  const getSuggestedQuestions = () => {
    if (context === 'teachable-moment') {
      return [
        "What if I freeze and can't respond in the moment?",
        "Can you help me practice what to say?",
        "What are the warning signs I should watch for?",
        "How do I know if this is the right response for me?"
      ];
    }
    return [
      "Can you give me an example?",
      "What if I make a mistake?",
      "How do I practice this skill?",
      "What tools can help me?"
    ];
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: input }];

    // Simulate AI response (in production, this would call your AI API)
    const contextPrompt = getContextualPrompt();
    const aiResponse = `[AI Coach Response based on: ${contextPrompt}]\n\nI understand you're asking: "${input}"\n\nLet me help you with that. Based on your neurodivergent profile, here's my guidance...`;

    setMessages([...newMessages, { role: 'assistant', content: aiResponse }]);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-50 flex items-center gap-3"
      >
        <Sparkles size={24} />
        <span className="font-semibold pr-2">Ask AI Coach</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white border-2 border-purple-500 rounded-2xl shadow-2xl z-50 flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={24} className="text-white" />
          <div>
            <h3 className="font-bold text-white">AI Coach</h3>
            <p className="text-xs text-purple-100">Your neurodivergent-friendly guide</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded p-1">
          <X size={20} />
        </button>
      </div>

      {/* User Profile Badge */}
      {userProfile?.leaderboardScore && (
        <div className="bg-purple-900/30 border-b border-purple-700/30 p-3 flex items-center gap-2">
          <Brain size={16} className="text-purple-400" />
          <span className="text-sm text-purple-300">
            Your AI Thinking Score: <strong>{userProfile.leaderboardScore}/100</strong>
          </span>
        </div>
      )}

      {/* Related Prompts */}
      {relatedPrompts && relatedPrompts.length > 0 && (
        <div className="bg-blue-900/20 border-b border-blue-700/30 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={14} className="text-blue-400" />
            <span className="text-xs text-blue-300 font-semibold">Related Prompts:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(`Use the "${prompt}" prompt to help me with this`)}
                className="text-xs bg-blue-800/50 hover:bg-blue-700/50 text-blue-200 px-2 py-1 rounded border border-blue-600/50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle size={48} className="text-earth-400 mx-auto mb-4" />
            <p className="text-earth-500 text-sm mb-4">
              I'm here to help you practice and learn! Ask me anything about this scenario.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-earth-400 font-semibold mb-2">Quick Questions:</p>
              {getSuggestedQuestions().map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="block w-full text-left text-sm text-purple-300 hover:text-purple-200 hover:bg-purple-900/30 p-2 rounded border border-purple-700/30"
                >
                  💬 {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-earth-100 text-earth-700 border border-earth-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="border-t border-earth-200 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-earth-100 border border-earth-200 rounded-lg px-3 py-2 text-earth-800 text-sm focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-purple-600 hover:bg-purple-500 disabled:bg-earth-200 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-earth-400 mt-2 flex items-center gap-1">
          <TrendingUp size={12} />
          Powered by your AI thinking profile
        </p>
      </div>
    </div>
  );
}
