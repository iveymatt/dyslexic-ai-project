import { BookOpen, Users } from 'lucide-react';

function PromptPreviewCard({
  emoji,
  title,
  examples,
  color,
}: {
  emoji: string;
  title: string;
  examples: string[];
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'border-blue-200 hover:border-blue-600',
    green: 'border-green-200 hover:border-green-600',
    purple: 'border-purple-200 hover:border-purple-600',
    orange: 'border-orange-200 hover:border-orange-600',
    pink: 'border-pink-700/50 hover:border-pink-600',
    teal: 'border-teal-700/50 hover:border-teal-600',
  };

  return (
    <div className={`bg-white rounded-xl p-6 border ${colorClasses[color] || ''} transition-all hover:scale-[1.02] hover:-translate-y-1`}>
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {examples.map((example, i) => (
          <li key={i} className="text-sm text-earth-500 flex items-start gap-2">
            <span className="text-cyan-500 mt-0.5">&rarr;</span>
            <span>{example}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PromptLibraryPreview() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-24 bg-earth-50 rounded-3xl my-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <BookOpen size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Prompt Library: Your Secret Weapon</h2>
          <p className="text-xl text-earth-600 max-w-3xl mx-auto">
            30+ battle-tested prompts organized by who you are and what you need. No more blank screen paralysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <PromptPreviewCard
            emoji="&#x1F393;"
            title="For Students"
            examples={['Explain this concept simply', 'Create a study guide I can use', 'Break down this confusing assignment']}
            color="blue"
          />
          <PromptPreviewCard
            emoji="&#x1F4BC;"
            title="For Professionals"
            examples={['Help me write this email professionally', 'Break this project into steps', 'How do I ask for accommodations?']}
            color="green"
          />
          <PromptPreviewCard
            emoji="&#x1F680;"
            title="For Entrepreneurs"
            examples={['Help me plan my business idea', 'How do I stay organized?', 'Understand this financial thing']}
            color="purple"
          />
          <PromptPreviewCard
            emoji="&#x1F469;&#x200D;&#x1F3EB;"
            title="For Teachers"
            examples={['Teach [subject] to dyslexic students', 'Create accessible lesson materials', 'Recognize dyslexic strengths']}
            color="orange"
          />
          <PromptPreviewCard
            emoji="&#x1F468;&#x200D;&#x1F469;&#x200D;&#x1F467;"
            title="For Parents"
            examples={['Explain dyslexia to me', 'Help my child with homework', "Build my child's confidence"]}
            color="pink"
          />
          <PromptPreviewCard
            emoji="&#x1F3AF;"
            title="For Coaches"
            examples={['Coach dyslexic people effectively', 'Understand neurodivergent thinking', 'Celebrate neurodivergent strengths']}
            color="teal"
          />
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <div className="flex items-start gap-4">
            <Users size={32} className="text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Community-Powered</h3>
              <p className="text-earth-600 mb-4">
                Every prompt is created by neurodivergent people who actually use them. Real problems. Real solutions.
                Rated, verified, and constantly improving.
              </p>
              <p className="text-sm text-earth-500">
                Each prompt includes: when to use it, the full prompt text, real example use case, best mode
                (Socratic/Strategic), and related prompts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
