import { useState } from 'react';
import { Brain, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function AuthPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
    // On success, Supabase redirects the browser to Google — no further action here.
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = mode === 'signup'
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      setError(error.message);
    } else if (mode === 'signup') {
      setMessage('Account created! You can sign in now.');
    }

    setLoading(false);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-full mb-6">
            <Brain size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 font-serif" style={{ color: 'var(--text-primary)' }}>
            {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {mode === 'signin'
              ? 'Sign in to continue with your Cognitive Partner'
              : 'Join Cognitive Partner to get started'}
          </p>
        </div>

        <div className="card rounded-lg p-8">
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/>
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
            </svg>
            {googleLoading ? 'Redirecting…' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={16} />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg"
                style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                <Lock size={16} />
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg"
                style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
              {mode === 'signup' && (
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>At least 6 characters</p>
              )}
            </div>

            {error && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#EF4444' }}>
                {error}
              </div>
            )}
            {message && (
              <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.4)', color: 'var(--text-primary)' }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <button
            onClick={switchMode}
            disabled={loading}
            className="w-full text-center mt-6 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <span className="text-cyan-500 font-medium">{mode === 'signin' ? 'Sign up' : 'Sign in'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
