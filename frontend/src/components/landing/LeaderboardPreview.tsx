import React from 'react';
import { Trophy, Brain, Lightbulb, List, MessageSquare, Star } from 'lucide-react';

function ScoreDimension({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-earth-800 mb-1">{title}</h4>
        <p className="text-sm text-earth-500">{description}</p>
      </div>
    </div>
  );
}

function LeaderboardRank({ rank, name, score, color }: { rank: number; name: string; score: number; color: string }) {
  const colorClasses: Record<string, string> = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    yellow: 'text-yellow-500',
    orange: 'text-orange-500',
  };

  const medalEmoji = rank === 1 ? '\u{1F947}' : rank === 2 ? '\u{1F948}' : rank === 3 ? '\u{1F949}' : '';

  return (
    <div className="flex items-center justify-between p-4 bg-earth-50 rounded-lg border border-earth-200">
      <div className="flex items-center gap-3">
        <span className="text-2xl w-8 text-center">{medalEmoji || `${rank}.`}</span>
        <span className="font-semibold text-earth-800">{name}</span>
      </div>
      <span className={`text-lg font-bold ${colorClasses[color] || ''}`}>{score.toFixed(2)}/10</span>
    </div>
  );
}

export function LeaderboardPreviewSection() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Trophy size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">AI Tool Leaderboard</h2>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            The only benchmark that measures if AI tools actually understand neurodivergent thinking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 border border-earth-200">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Brain className="text-cyan-500" />
              What We Test
            </h3>
            <div className="space-y-4">
              <ScoreDimension icon={<Lightbulb size={20} className="text-yellow-500" />} title="Lateral Thinking Support" description="Can it handle non-linear exploration & creative connections?" />
              <ScoreDimension icon={<List size={20} className="text-blue-500" />} title="Linear Thinking Support" description="Can it organize & structure information clearly?" />
              <ScoreDimension icon={<MessageSquare size={20} className="text-green-500" />} title="Language Adaptability" description="Does it adjust to dyslexic language processing needs?" />
              <ScoreDimension icon={<Brain size={20} className="text-purple-500" />} title="Neurodivergent Awareness" description="Does it understand & celebrate ND strengths?" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 border border-earth-200">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-yellow-500" />
              Top Performers
            </h3>
            <div className="space-y-4">
              <LeaderboardRank rank={1} name="Cognitive Partner" score={9.75} color="green" />
              <LeaderboardRank rank={2} name="Claude (Anthropic)" score={8.75} color="blue" />
              <LeaderboardRank rank={3} name="ChatGPT (OpenAI)" score={8.0} color="blue" />
              <LeaderboardRank rank={4} name="Perplexity AI" score={7.0} color="yellow" />
              <LeaderboardRank rank={5} name="Gemini (Google)" score={7.0} color="yellow" />
              <LeaderboardRank rank={6} name="Microsoft Copilot" score={6.5} color="orange" />
            </div>
            <div className="mt-6 pt-6 border-t border-earth-200">
              <p className="text-sm text-earth-500">
                Each tool tested with 4 questions across all dimensions. Full test results, AI responses, and scoring
                reasoning available in the leaderboard.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold mb-4">Why This Matters</h3>
          <p className="text-earth-600 text-lg mb-4">
            <strong className="text-blue-600">Dyslexia is a language-processing difference.</strong> LLMs are language models.
          </p>
          <p className="text-earth-600">
            We asked: Which AI tools adapt to BOTH lateral thinking (how neurodivergent brains naturally work) AND
            linear thinking (structured support when needed)? Which ones truly "get" us? Now you have the data.
          </p>
        </div>
      </div>
    </section>
  );
}
