import {
  BookOpen,
  Trophy,
  MessageSquare,
  Briefcase,
  Bot,
} from 'lucide-react';

const tools = [
  {
    icon: BookOpen,
    title: 'Prompt Library',
    description: '30+ ready-to-use AI prompts created by neurodivergent people for neurodivergent people.',
    features: [
      'Organized by who you are (student, professional, parent, etc.)',
      'Real example use cases from real people',
      'One click to copy, one click to use',
      'Community-rated and verified',
    ],
    testimonial: '"Finally, prompts that actually work for ADHD brains. No more staring at a blank screen."',
    gradient: 'from-green-50 to-green-100',
    border: 'border-green-200 hover:border-green-600',
    iconBg: 'bg-green-600',
    checkColor: 'text-green-400',
    quoteBg: 'bg-green-50/80 border-green-200',
    quoteText: 'text-green-700',
  },
  {
    icon: Trophy,
    title: 'AI Tool Leaderboard',
    description: 'Which AI tools actually support neurodivergent thinking? We tested them. Here\'s the data.',
    features: [
      '4 dimensions: lateral thinking, linear thinking, language, awareness',
      'Real test results with actual AI responses',
      'Compare 40+ AI tools across 5 categories',
      'Filter by your thinking style & view as cards or list',
    ],
    testimonial: '"The only benchmark that measures if AI tools actually \'get\' how dyslexic brains work."',
    gradient: 'from-blue-50 to-purple-50',
    border: 'border-blue-200 hover:border-blue-600',
    iconBg: 'bg-blue-600',
    checkColor: 'text-blue-400',
    quoteBg: 'bg-blue-50/80 border-blue-200',
    quoteText: 'text-blue-700',
  },
  {
    icon: MessageSquare,
    title: 'Accessible AI Chat',
    description: 'Three thinking modes (Socratic, Strategic & Skeptic), built-in accessibility, designed for dyslexic brains.',
    features: [
      'Text-to-speech & voice input built-in',
      'Dyslexic-friendly fonts & spacing',
      'Simplify responses instantly',
      'Explore, Execute, or Challenge ideas',
    ],
    testimonial: '"First AI chat that doesn\'t make me feel stupid. It adapts to how MY brain works."',
    gradient: 'from-purple-50 to-pink-50',
    border: 'border-purple-200 hover:border-purple-600',
    iconBg: 'bg-purple-600',
    checkColor: 'text-purple-400',
    quoteBg: 'bg-purple-50/80 border-purple-700/30',
    quoteText: 'text-purple-700',
  },
  {
    icon: Briefcase,
    title: 'Career Discovery',
    description: 'Find careers that match how YOUR brain works. Learn life skills. Master AI tools. Built for neurodivergent young adults.',
    features: [
      '30+ careers matched to your cognitive profile',
      'Life skills coach organized by 5 core themes',
      'AI literacy training (10 modules, hands-on practice)',
      '10 AI agents & 3 workflows for career transition',
    ],
    testimonial: '"I have autism and ADHD. I never knew what career would work for me. This showed me jobs that actually fit my brain."',
    gradient: 'from-orange-50 to-orange-100',
    border: 'border-orange-200 hover:border-orange-600',
    iconBg: 'bg-orange-500',
    checkColor: 'text-orange-400',
    quoteBg: 'bg-orange-50/80 border-orange-200',
    quoteText: 'text-orange-700',
  },
  {
    icon: Bot,
    title: 'AI Agents & Workflows',
    description: 'Pre-built AI assistants and step-by-step workflows for career transition challenges.',
    features: [
      '10 ready-to-use AI agents (task breakdown, interview prep, scripts)',
      '3 multi-step workflows (job apps, first day, accommodations)',
      'Voice-to-text optimized prompts with examples',
      'Organized by 5 core themes (executive function, emotional regulation, etc.)',
    ],
    testimonial: '"The Social Script Generator saved me. I finally have words for difficult conversations at work."',
    gradient: 'from-cyan-50 to-teal-50',
    border: 'border-cyan-200 hover:border-cyan-600',
    iconBg: 'bg-cyan-600',
    checkColor: 'text-cyan-400',
    quoteBg: 'bg-cyan-50/80 border-cyan-700/30',
    quoteText: 'text-cyan-700',
  },
];

export function ToolsShowcase() {
  return (
    <section id="features" className="container mx-auto px-6 py-20 md:py-24 scroll-mt-20">
      <h2 className="text-4xl font-bold text-center mb-4">Five Tools. One Platform.</h2>
      <p className="text-center text-earth-500 mb-12 text-lg max-w-3xl mx-auto">
        We built the platform we wished existed. Here's what makes Cognitive Partner different.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              className={`bg-gradient-to-br ${tool.gradient} p-8 rounded-2xl border ${tool.border} transition-all hover:scale-[1.02] hover:-translate-y-1`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${tool.iconBg} rounded-full mb-6`}>
                <Icon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{tool.title}</h3>
              <p className="text-earth-600 mb-6 text-lg">{tool.description}</p>
              <ul className="space-y-3 text-earth-600 mb-6">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`${tool.checkColor} flex-shrink-0 mt-1`}>&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className={`${tool.quoteBg} rounded-lg p-4 border`}>
                <p className={`text-sm ${tool.quoteText} italic`}>{tool.testimonial}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
