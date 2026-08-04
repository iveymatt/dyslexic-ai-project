import {
  Lightbulb,
  Zap,
  AlertTriangle,
  Sparkles,
  Target,
  Type,
  List,
  Brain,
} from 'lucide-react';

const modes = [
  {
    name: 'SOCRATIC',
    icon: Lightbulb,
    tagline: 'Explore together. Ask questions. Think it through.',
    description: 'Perfect for when you need to think through problems, explore ideas, or understand something deeply. The AI asks questions back, follows tangents, makes creative connections.',
    subAgents: [
      { icon: Sparkles, name: 'Think Out Loud', desc: 'Explore ideas through dialogue & creative connections' },
      { icon: Target, name: 'Executive Strategist', desc: 'ADHD-aware planning, decision-making & prioritization' },
    ],
    useWhen: 'Stuck on a problem, making decisions, learning concepts, brainstorming',
    gradient: 'from-cyan-500 to-cyan-600',
    taglineColor: 'text-cyan-100',
    descColor: 'text-cyan-100',
    cardBorder: 'border-cyan-300/30',
    footerBg: 'bg-cyan-800/20',
  },
  {
    name: 'STRATEGIC',
    icon: Zap,
    tagline: 'Get direct answers. Clear info. Done.',
    description: 'Perfect for when you need quick answers, actionable steps, or direct information. No fluff. Just clear, organized, practical help.',
    subAgents: [
      { icon: Type, name: 'Writing Clarity', desc: 'Direct, actionable writing feedback & editing' },
      { icon: List, name: 'Task Breakdown', desc: 'Break overwhelming projects into achievable steps' },
      { icon: Brain, name: 'Research Digest', desc: 'Summarize & organize complex information' },
    ],
    useWhen: 'Need quick answers, want specific steps, improving writing, researching',
    gradient: 'from-magenta-500 to-magenta-600',
    taglineColor: 'text-magenta-100',
    descColor: 'text-magenta-100',
    cardBorder: 'border-magenta-300/30',
    footerBg: 'bg-magenta-800/20',
  },
  {
    name: 'SKEPTIC',
    icon: AlertTriangle,
    tagline: 'Challenge ideas. Find blind spots. Make it stronger.',
    description: 'Perfect for stress-testing ideas, finding what you\'re missing, and playing devil\'s advocate. The AI challenges assumptions and reveals weaknesses to make your thinking bulletproof.',
    subAgents: [
      { icon: Target, name: 'Reality Check', desc: 'Stress-test ideas & surface hidden assumptions' },
      { icon: AlertTriangle, name: 'Risk Assessor', desc: 'Identify risks, edge cases & what could go wrong' },
      { icon: Brain, name: 'Assumption Challenger', desc: 'Question beliefs & uncover what you\'re taking for granted' },
    ],
    useWhen: 'Testing ideas, making important decisions, planning projects, avoiding mistakes',
    gradient: 'from-earth-500 to-earth-600',
    taglineColor: 'text-white',
    descColor: 'text-white',
    cardBorder: 'border-orange-300/30',
    footerBg: 'bg-orange-50/80',
  },
];

export function ThinkingModes() {
  return (
    <section id="thinking-modes" className="container mx-auto px-6 py-20 md:py-24 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mb-4">Three Thinking Modes</h2>
      <p className="text-center text-earth-500 mb-12 max-w-3xl mx-auto text-lg">
        Neurodivergent brains need different modes: explore ideas freely, get direct answers, AND challenge assumptions.
        We support all three ways of thinking.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {modes.map(mode => {
          const ModeIcon = mode.icon;
          return (
            <div
              key={mode.name}
              className={`bg-gradient-to-br ${mode.gradient} p-8 rounded-2xl text-earth-800 shadow-2xl transition-all hover:scale-[1.02] hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3 mb-4">
                <ModeIcon size={40} className="text-yellow-300" />
                <h3 className="text-3xl font-bold">{mode.name}</h3>
              </div>
              <p className={`text-xl mb-6 ${mode.taglineColor} font-semibold`}>{mode.tagline}</p>
              <p className={`${mode.descColor} mb-6`}>{mode.description}</p>
              <div className="space-y-3">
                {mode.subAgents.map(agent => {
                  const AgentIcon = agent.icon;
                  return (
                    <div key={agent.name} className={`bg-white/20 rounded-lg p-4 border ${mode.cardBorder}`}>
                      <h4 className="font-semibold mb-1 flex items-center gap-2">
                        <AgentIcon size={16} />
                        {agent.name}
                      </h4>
                      <p className={`text-sm ${mode.descColor}`}>{agent.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className={`mt-6 ${mode.footerBg} rounded-lg p-4 border ${mode.cardBorder}`}>
                <p className={`text-sm ${mode.descColor}`}>
                  <strong>Use when:</strong> {mode.useWhen}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
