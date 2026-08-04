import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Brain, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LandingNavbar } from '../components/landing/LandingNavbar';

const DEMO_EMAIL = 'demo@lmlab.ai';
const DEMO_PASSWORD = 'demo123';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  const from = (location.state as any)?.from?.pathname || '/chat';
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleDemoLogin = async () => {
    setError('');
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setIsSubmitting(true);

    const result = await login(DEMO_EMAIL, DEMO_PASSWORD);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Demo login failed.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <LandingNavbar />

      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-magenta-500 rounded-full mb-4">
              <Brain size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Sign in to your Cognitive Partner account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div id="login-error" role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="you@example.com"
                  required
                  autoFocus
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button
                type="button"
                onClick={async () => {
                  if (!email) { setError('Enter your email first, then click Forgot password.'); return; }
                  const result = await resetPassword(email);
                  if (result.success) { setError(''); alert('Password reset email sent! Check your inbox.'); }
                  else { setError(result.error || 'Could not send reset email.'); }
                }}
                className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                'Signing in...'
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo Account */}
          <div className="mt-4 p-4 rounded-xl border-2 border-dashed border-cyan-500/30 bg-cyan-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-cyan-500" />
              <span className="text-sm font-semibold text-cyan-500">Try the Demo</span>
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
              Explore the full app with a pre-configured Pro account. No signup needed.
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30 hover:border-cyan-500 hover:from-cyan-500/20 hover:to-magenta-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Sign In as Demo User'}
              {!isSubmitting && <ArrowRight size={16} />}
            </button>
            <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
              demo@lmlab.ai &bull; Pro plan
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1" style={{ borderTop: '1px solid var(--border-color)' }} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>or continue with</span>
            <div className="flex-1" style={{ borderTop: '1px solid var(--border-color)' }} />
          </div>

          {/* Social login placeholders */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border opacity-50 cursor-not-allowed"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}
              title="Coming soon"
            >
              <span className="text-lg">G</span>
              <span className="text-sm">Google</span>
            </button>
            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border opacity-50 cursor-not-allowed"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}
              title="Coming soon"
            >
              <span className="text-lg"></span>
              <span className="text-sm">Apple</span>
            </button>
          </div>
          <p className="text-center text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
            Social login coming soon
          </p>

          {/* Sign up link */}
          <p className="text-center mt-8" style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
