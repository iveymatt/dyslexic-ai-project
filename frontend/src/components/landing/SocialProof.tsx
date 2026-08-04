import { BookOpen, Trophy, Briefcase, Brain } from 'lucide-react';

const stats = [
  { icon: BookOpen, label: '30+ AI Prompts', color: 'text-green-500' },
  { icon: Trophy, label: '40+ AI Tools Tested', color: 'text-blue-500' },
  { icon: Briefcase, label: '30+ Career Matches', color: 'text-orange-500' },
  { icon: Brain, label: 'Built by ND People', color: 'text-purple-500' },
];

export function SocialProof() {
  return (
    <section className="border-y" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center justify-center gap-2">
              <Icon size={20} className={color} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
