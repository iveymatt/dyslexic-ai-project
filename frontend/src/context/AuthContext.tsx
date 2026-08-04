import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, displayName: string, plan?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'cognitive-partner-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isDemoMode = !isSupabaseConfigured;

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          loadUserProfile(session.user.id, session.user.email || '');
        } else {
          setIsLoading(false);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            await loadUserProfile(session.user.id, session.user.email || '');
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );

      return () => subscription.unsubscribe();
    } else {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        try { setUser(JSON.parse(savedUser)); }
        catch { localStorage.removeItem(STORAGE_KEY); }
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  async function loadUserProfile(userId: string, email: string) {
    if (!supabase) return;
    try {
      const { data: profile } = await supabase
        .from('user_profiles').select('*').eq('user_id', userId).single();

      setUser({
        id: userId,
        email: profile?.email || email,
        displayName: profile?.display_name || email.split('@')[0],
        plan: (profile?.plan as User['plan']) || 'free',
        createdAt: profile?.created_at || new Date().toISOString(),
        stripeCustomerId: profile?.stripe_customer_id || undefined,
      });
    } catch {
      setUser({ id: userId, email, displayName: email.split('@')[0], plan: 'free', createdAt: new Date().toISOString() });
    }
    setIsLoading(false);
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) return { success: false, error: 'Email and password are required.' };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      if (data.user) { await loadUserProfile(data.user.id, data.user.email || email); return { success: true }; }
      return { success: false, error: 'Login failed. Please try again.' };
    } else {
      await new Promise(resolve => setTimeout(resolve, 300));
      if (password.length < 6) return { success: false, error: 'Invalid email or password.' };
      const isDemo = email === 'demo@lmlab.ai';
      setUser({
        id: isDemo ? 'user-demo' : `user-${Date.now()}`,
        email,
        displayName: isDemo ? 'Demo User' : email.split('@')[0],
        plan: isDemo ? 'pro' : 'free',
        createdAt: new Date().toISOString(),
      });
      return { success: true };
    }
  };

  const signup = async (email: string, password: string, displayName: string, plan?: string): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password || !displayName) return { success: false, error: 'All fields are required.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    if (!email.includes('@')) return { success: false, error: 'Please enter a valid email address.' };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { display_name: displayName } },
      });
      if (error) return { success: false, error: error.message };
      if (data.user) {
        if (plan && plan !== 'free') {
          await supabase.from('user_profiles').update({ plan, display_name: displayName }).eq('user_id', data.user.id);
        }
        await loadUserProfile(data.user.id, data.user.email || email);
        return { success: true };
      }
      if (data.session === null) return { success: true, error: 'Check your email for a confirmation link!' };
      return { success: false, error: 'Signup failed. Please try again.' };
    } else {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUser({ id: `user-${Date.now()}`, email, displayName, plan: (plan as User['plan']) || 'free', createdAt: new Date().toISOString() });
      return { success: true };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      if (isSupabaseConfigured && supabase) {
        supabase.from('user_profiles')
          .update({ display_name: updated.displayName, plan: updated.plan })
          .eq('user_id', updated.id)
          .then(({ error }) => { if (error) console.error('Profile sync error:', error); });
      }
      return updated;
    });
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login?reset=true`,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
    return { success: false, error: 'Password reset requires a backend connection.' };
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout, updateUser, resetPassword, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
