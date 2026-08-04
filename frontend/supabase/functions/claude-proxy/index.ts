// ============================================
// Claude Proxy — Supabase Edge Function
// ============================================
// Keeps API keys server-side. Rate-limits per user.
// Deploy: supabase functions deploy claude-proxy

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Rate limits per hour
const RATE_LIMITS: Record<string, number> = {
  free: 20,
  pro: 200,
  team: 500,
};

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory rate limit store (resets on cold start — fine for Edge Functions)
const rateLimitStore = new Map<string, RateLimitEntry>();

function checkRateLimit(userId: string, plan: string): { allowed: boolean; remaining: number } {
  const limit = RATE_LIMITS[plan] || RATE_LIMITS.free;
  const now = Date.now();
  const entry = rateLimitStore.get(userId);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(userId, { count: 1, resetAt: now + 3600000 });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user from Supabase auth
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user plan for rate limiting
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('plan')
      .eq('user_id', user.id)
      .single();

    const plan = profile?.plan || 'free';

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(user.id, plan);
    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded. Please wait before sending more messages.',
          retryAfter: 3600,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          },
        }
      );
    }

    // Parse request body
    const body = await req.json();
    const { system, messages, max_tokens = 2048, temperature = 0.7, model = 'claude-sonnet-4-6' } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Forward to Anthropic
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens,
        temperature,
        system,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!anthropicResponse.ok) {
      const errData = await anthropicResponse.json().catch(() => ({}));
      return new Response(
        JSON.stringify({ error: errData.error?.message || `Anthropic API error: ${anthropicResponse.status}` }),
        {
          status: anthropicResponse.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await anthropicResponse.json();

    // Return response with rate limit headers
    return new Response(
      JSON.stringify({
        response: data.content?.[0]?.text || '',
        model: data.model,
        usage: data.usage,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  } catch (error) {
    console.error('Claude proxy error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
