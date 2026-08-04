// ============================================
// Analytics Service — Lightweight Usage Tracking
// ============================================
// Tracks user engagement events for product insights.
// Works offline-first: queues events in memory, flushes
// to Supabase when available, falls back to localStorage.

export interface AnalyticsEvent {
  event: string;
  category: 'navigation' | 'chat' | 'career' | 'onboarding' | 'subscription' | 'accessibility' | 'engagement';
  properties?: Record<string, string | number | boolean>;
  timestamp: string;
  sessionId: string;
  userId?: string;
}

// Session ID — unique per browser tab session
const SESSION_ID = crypto.randomUUID();

// In-memory event queue
let eventQueue: AnalyticsEvent[] = [];
const FLUSH_INTERVAL = 30_000; // 30 seconds
const MAX_QUEUE_SIZE = 100;
const LOCAL_STORAGE_KEY = 'cp_analytics_queue';

// Supabase endpoint (set via env)
const ANALYTICS_ENDPOINT = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/analytics_events`
  : null;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Track an analytics event.
 * This is the main function you call from anywhere in the app.
 */
export function track(
  event: string,
  category: AnalyticsEvent['category'],
  properties?: Record<string, string | number | boolean>
) {
  const analyticsEvent: AnalyticsEvent = {
    event,
    category,
    properties,
    timestamp: new Date().toISOString(),
    sessionId: SESSION_ID,
    userId: getCurrentUserId(),
  };

  eventQueue.push(analyticsEvent);

  // Flush if queue is getting large
  if (eventQueue.length >= MAX_QUEUE_SIZE) {
    flush();
  }
}

/**
 * Common pre-built tracking helpers
 */
export const analytics = {
  // Navigation
  pageView: (page: string) => track('page_view', 'navigation', { page }),

  // Chat
  messageSent: (mode: string, subAgent?: string) =>
    track('message_sent', 'chat', { mode, subAgent: subAgent || 'default' }),
  chatCreated: () => track('chat_created', 'chat'),
  voiceInputUsed: () => track('voice_input', 'chat'),
  quickActionUsed: (action: string) => track('quick_action', 'chat', { action }),

  // Career
  careerProfileStarted: () => track('profile_started', 'career'),
  careerProfileCompleted: () => track('profile_completed', 'career'),
  jobSearchPerformed: (query: string) => track('job_search', 'career', { query }),
  agentChatStarted: (agentName: string) => track('agent_chat_started', 'career', { agentName }),

  // Onboarding
  assessmentStarted: () => track('assessment_started', 'onboarding'),
  assessmentCompleted: (score?: number) => track('assessment_completed', 'onboarding', { score: score || 0 }),
  onboardingStepCompleted: (step: string) => track('onboarding_step', 'onboarding', { step }),

  // Subscription
  pricingViewed: () => track('pricing_viewed', 'subscription'),
  checkoutStarted: (plan: string) => track('checkout_started', 'subscription', { plan }),
  subscriptionActivated: (plan: string) => track('subscription_activated', 'subscription', { plan }),

  // Accessibility
  themeChanged: (theme: string) => track('theme_changed', 'accessibility', { theme }),
  fontChanged: (font: string) => track('font_changed', 'accessibility', { font }),
  spacingChanged: (spacing: string) => track('spacing_changed', 'accessibility', { spacing }),

  // Engagement
  sessionStarted: () => track('session_started', 'engagement'),
  featureDiscovered: (feature: string) => track('feature_discovered', 'engagement', { feature }),
  errorEncountered: (errorType: string, message: string) =>
    track('error', 'engagement', { errorType, message: message.slice(0, 200) }),
};

/**
 * Get current user ID from Supabase auth (if available)
 */
function getCurrentUserId(): string | undefined {
  try {
    const sessionStr = localStorage.getItem('supabase.auth.token');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      return session?.currentSession?.user?.id;
    }
  } catch {
    // Not logged in or no Supabase — that's fine
  }
  return undefined;
}

/**
 * Flush event queue to Supabase or localStorage
 */
async function flush() {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  if (ANALYTICS_ENDPOINT && SUPABASE_ANON_KEY) {
    try {
      const response = await fetch(ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(eventsToSend),
      });

      if (!response.ok) {
        // If Supabase insert fails, save to localStorage as fallback
        saveToLocalStorage(eventsToSend);
      }
    } catch {
      // Network error — save locally for retry
      saveToLocalStorage(eventsToSend);
    }
  } else {
    // No Supabase configured — save to localStorage
    saveToLocalStorage(eventsToSend);
  }
}

/**
 * Save events to localStorage as fallback
 */
function saveToLocalStorage(events: AnalyticsEvent[]) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    // Keep at most 500 events in localStorage
    const combined = [...existing, ...events].slice(-500);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(combined));
  } catch {
    // localStorage full or unavailable — silently drop
  }
}

/**
 * Retry sending any events stuck in localStorage
 */
async function retryLocalStorageEvents() {
  if (!ANALYTICS_ENDPOINT || !SUPABASE_ANON_KEY) return;

  try {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    if (stored.length === 0) return;

    const response = await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(stored),
    });

    if (response.ok) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch {
    // Will retry on next interval
  }
}

/**
 * Initialize the analytics service.
 * Call once when the app boots (e.g., in main.tsx).
 */
export function initAnalytics() {
  // Track session start
  analytics.sessionStarted();

  // Set up periodic flush
  setInterval(flush, FLUSH_INTERVAL);

  // Retry any stuck localStorage events
  retryLocalStorageEvents();

  // Flush on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      flush();
    });

    // Also use sendBeacon for more reliable unload tracking
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        if (navigator.sendBeacon && ANALYTICS_ENDPOINT && SUPABASE_ANON_KEY) {
          const blob = new Blob([JSON.stringify(eventQueue)], { type: 'application/json' });
          navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
          eventQueue = [];
        } else {
          flush();
        }
      }
    });
  }
}
