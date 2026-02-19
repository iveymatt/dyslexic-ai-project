import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const breadcrumbNameMap: Record<string, string> = {
  'career-discovery': 'Career Discovery',
  'profile-builder': 'Profile Builder',
  'quick-start': 'Quick Start',
  'jobs': 'Jobs',
  'life-skills': 'Life Skills',
  'ai-literacy': 'AI Literacy',
  'curriculum': 'Curriculum',
  'prompts': 'Prompts',
  'ai-agents': 'AI Agents',
  'leaderboard': 'Leaderboard',
  'chat': 'Chat',
  'assessment': 'Assessment',
  'profile': 'Profile',
};

export function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs for top-level routes
  if (pathnames.length <= 1) return null;

  return (
    <nav
      aria-label="breadcrumb"
      className="px-4 py-2 overflow-x-auto"
      style={{ background: 'var(--bg-accent)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      <ol className="flex items-center gap-2 text-sm whitespace-nowrap">
        {pathnames.map((segment, index) => {
          const path = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const name = breadcrumbNameMap[segment] || segment;

          return (
            <li key={path} className="flex items-center gap-2">
              {index > 0 && <ChevronRight size={14} className="text-earth-400" />}
              {isLast ? (
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{name}</span>
              ) : (
                <Link
                  to={path}
                  className="text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
