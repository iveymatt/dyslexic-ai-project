import type { ReactNode } from 'react';
import { Brain } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { AuthPage } from '../pages/AuthPage';

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <Brain className="text-cyan-500 animate-pulse" size={40} />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return <>{children}</>;
}
