// ============================================
// Data Service — Supabase with localStorage fallback
// ============================================
// Every function works in both modes:
// - With Supabase: persists to real database
// - Without Supabase: falls back to localStorage (demo mode)

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserProfile } from '../types/career';

// ==========================================
// CAREER PROFILES
// ==========================================

export async function saveCareerProfile(userId: string, profile: UserProfile): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('career_profiles')
      .upsert({
        user_id: userId,
        basic_info: {
          name: profile.name,
          age: profile.age,
          location: profile.location,
        },
        neurodivergence_types: profile.neurodivergence,
        strengths: profile.strengths,
        challenges: profile.challenges,
        sensory_preference: profile.sensoryPreference,
        education_level: profile.education,
        has_work_experience: profile.hasWorked,
        career_interests: profile.careerInterests,
        job_priorities: profile.jobPriorities,
        full_profile: profile,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error saving career profile:', error);
      // Fall back to localStorage
      localStorage.setItem('career-profile', JSON.stringify(profile));
      return false;
    }
    return true;
  } else {
    localStorage.setItem('career-profile', JSON.stringify(profile));
    return true;
  }
}

export async function loadCareerProfile(userId: string): Promise<UserProfile | null> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('career_profiles')
      .select('full_profile')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      // Fall back to localStorage
      const local = localStorage.getItem('career-profile');
      return local ? JSON.parse(local) : null;
    }

    return data.full_profile as UserProfile;
  } else {
    const local = localStorage.getItem('career-profile');
    return local ? JSON.parse(local) : null;
  }
}

// ==========================================
// SAVED JOBS
// ==========================================

export async function saveJob(userId: string, jobId: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('saved_jobs')
      .upsert({ user_id: userId, job_id: jobId });

    if (error) {
      console.error('Error saving job:', error);
      fallbackSaveJob(jobId);
      return false;
    }
    return true;
  } else {
    fallbackSaveJob(jobId);
    return true;
  }
}

export async function unsaveJob(userId: string, jobId: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq('user_id', userId)
      .eq('job_id', jobId);

    if (error) {
      console.error('Error unsaving job:', error);
      fallbackUnsaveJob(jobId);
      return false;
    }
    return true;
  } else {
    fallbackUnsaveJob(jobId);
    return true;
  }
}

export async function getSavedJobs(userId: string): Promise<string[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .eq('user_id', userId);

    if (error || !data) {
      return fallbackGetSavedJobs();
    }

    return data.map(row => row.job_id);
  } else {
    return fallbackGetSavedJobs();
  }
}

function fallbackSaveJob(jobId: string) {
  const saved = JSON.parse(localStorage.getItem('saved-jobs') || '[]');
  if (!saved.includes(jobId)) saved.push(jobId);
  localStorage.setItem('saved-jobs', JSON.stringify(saved));
}

function fallbackUnsaveJob(jobId: string) {
  const saved = JSON.parse(localStorage.getItem('saved-jobs') || '[]');
  localStorage.setItem('saved-jobs', JSON.stringify(saved.filter((id: string) => id !== jobId)));
}

function fallbackGetSavedJobs(): string[] {
  return JSON.parse(localStorage.getItem('saved-jobs') || '[]');
}

// ==========================================
// PROGRESS TRACKING
// ==========================================

export async function saveProgress(
  userId: string,
  type: 'life_skills' | 'ai_literacy',
  moduleId: string,
  value: number | boolean
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    // First get current progress
    const { data: current } = await supabase
      .from('user_progress')
      .select(type === 'life_skills' ? 'life_skills_progress' : 'ai_literacy_progress')
      .eq('user_id', userId)
      .single();

    const fieldName = type === 'life_skills' ? 'life_skills_progress' : 'ai_literacy_progress';
    const currentData = current as Record<string, unknown> | null;
    const currentProgress = (currentData?.[fieldName] as Record<string, unknown>) || {};

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        [fieldName]: { ...currentProgress, [moduleId]: value },
        last_active: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error saving progress:', error);
      fallbackSaveProgress(type, moduleId, value);
      return false;
    }
    return true;
  } else {
    fallbackSaveProgress(type, moduleId, value);
    return true;
  }
}

export async function loadProgress(
  userId: string
): Promise<{ lifeSkills: Record<string, number>; aiLiteracy: Record<string, boolean> }> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('life_skills_progress, ai_literacy_progress')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return fallbackLoadProgress();
    }

    return {
      lifeSkills: data.life_skills_progress || {},
      aiLiteracy: data.ai_literacy_progress || {},
    };
  } else {
    return fallbackLoadProgress();
  }
}

function fallbackSaveProgress(type: string, moduleId: string, value: number | boolean) {
  const key = type === 'life_skills' ? 'life-skills-progress' : 'ai-literacy-progress';
  const current = JSON.parse(localStorage.getItem(key) || '{}');
  current[moduleId] = value;
  localStorage.setItem(key, JSON.stringify(current));
}

function fallbackLoadProgress() {
  return {
    lifeSkills: JSON.parse(localStorage.getItem('life-skills-progress') || '{}'),
    aiLiteracy: JSON.parse(localStorage.getItem('ai-literacy-progress') || '{}'),
  };
}

// ==========================================
// USER SUBSCRIPTION (Stripe sync)
// ==========================================

export async function updateSubscription(
  userId: string,
  plan: 'free' | 'pro' | 'team',
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        plan,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        subscription_status: plan === 'free' ? 'inactive' : 'active',
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating subscription:', error);
      return false;
    }
    return true;
  }
  return false;
}
