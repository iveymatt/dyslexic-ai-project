// ============================================
// Claude AI Service — Real Agent Conversations
// ============================================
// Connects your AI agents to Anthropic's Claude API.
// Uses a proxy endpoint to keep API keys server-side.
// Falls back to mock responses if not configured.
// Includes client-side rate limiting as a safety net.

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  response: string;
  model?: string;
  tokensUsed?: number;
}

// API endpoint — set this to your backend proxy
const CLAUDE_API_ENDPOINT = import.meta.env.VITE_CLAUDE_API_ENDPOINT || '';
const CLAUDE_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || '';
const IS_DEV = import.meta.env.DEV;

// Only allow direct API key in development builds
export const isClaudeConfigured = !!(CLAUDE_API_ENDPOINT || (IS_DEV && CLAUDE_API_KEY));

// ============================================
// Client-side rate limiting (safety net)
// ============================================
const CLIENT_RATE_LIMIT = 30; // max messages per window
const CLIENT_RATE_WINDOW = 3600000; // 1 hour in ms
const messageTimestamps: number[] = [];

function checkClientRateLimit(): boolean {
  const now = Date.now();
  // Remove timestamps older than the window
  while (messageTimestamps.length > 0 && messageTimestamps[0] < now - CLIENT_RATE_WINDOW) {
    messageTimestamps.shift();
  }
  if (messageTimestamps.length >= CLIENT_RATE_LIMIT) {
    return false;
  }
  messageTimestamps.push(now);
  return true;
}

// ============================================
// Conversation windowing — keep API costs down
// ============================================
const MAX_CONVERSATION_MESSAGES = 20; // send last N messages to Claude

function windowMessages(messages: ClaudeMessage[]): ClaudeMessage[] {
  if (messages.length <= MAX_CONVERSATION_MESSAGES) return messages;

  // Keep the first message (for context) + last N-1 messages
  return [
    messages[0],
    ...messages.slice(-(MAX_CONVERSATION_MESSAGES - 1)),
  ];
}

/**
 * Send a message to Claude with a specific agent's system prompt.
 * Enriches the prompt with user context (persona, career profile, etc.)
 */
export async function sendAgentMessage(
  systemPrompt: string,
  messages: ClaudeMessage[],
  options?: {
    userContext?: string;
    maxTokens?: number;
    temperature?: number;
    model?: string;
  }
): Promise<ClaudeResponse> {

  // Client-side rate limit check
  if (!checkClientRateLimit()) {
    throw new Error('You are sending messages too quickly. Please wait a moment before trying again.');
  }

  const fullSystemPrompt = options?.userContext
    ? `${systemPrompt}\n\n---\n\nUSER CONTEXT:\n${options.userContext}`
    : systemPrompt;

  // Apply conversation windowing
  const windowedMessages = windowMessages(messages);

  // Option 1: Use proxy endpoint (recommended for production)
  if (CLAUDE_API_ENDPOINT) {
    return sendViaProxy(fullSystemPrompt, windowedMessages, options);
  }

  // Option 2: Direct API call (development only — blocked in production builds)
  if (IS_DEV && CLAUDE_API_KEY) {
    console.warn('⚠️ Using direct Anthropic API key. This is for local development only.');
    return sendDirectToAnthropic(fullSystemPrompt, windowedMessages, options);
  }

  // Option 3: Mock response (no API configured)
  return generateSmartMockResponse(messages[messages.length - 1]?.content || '', systemPrompt);
}

/**
 * Send through your backend proxy (keeps API key server-side).
 * Sends the user's Supabase auth token for rate limiting.
 */
async function sendViaProxy(
  systemPrompt: string,
  messages: ClaudeMessage[],
  options?: { maxTokens?: number; temperature?: number; model?: string }
): Promise<ClaudeResponse> {
  // Get auth token if available (for server-side rate limiting)
  let authToken = '';
  try {
    const { supabase } = await import('../lib/supabase');
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      authToken = data.session?.access_token || '';
    }
  } catch {
    // No auth available — proxy will reject or apply anonymous limits
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(CLAUDE_API_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      system: systemPrompt,
      messages,
      max_tokens: options?.maxTokens || 2048,
      temperature: options?.temperature || 0.7,
      model: options?.model || 'claude-sonnet-4-6',
    }),
  });

  if (response.status === 429) {
    throw new Error('You have reached your message limit for this hour. Please try again later.');
  }

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API proxy error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return {
    response: data.response || data.content?.[0]?.text || '',
    model: data.model,
    tokensUsed: data.usage?.output_tokens,
  };
}

/**
 * Direct call to Anthropic API (development only — exposes key in browser).
 * Only available in dev builds (import.meta.env.DEV === true).
 * In production, use the proxy.
 */
async function sendDirectToAnthropic(
  systemPrompt: string,
  messages: ClaudeMessage[],
  options?: { maxTokens?: number; temperature?: number; model?: string }
): Promise<ClaudeResponse> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: options?.model || 'claude-sonnet-4-6',
      max_tokens: options?.maxTokens || 2048,
      temperature: options?.temperature || 0.7,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(`Claude API error (${response.status}): ${errData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return {
    response: data.content?.[0]?.text || '',
    model: data.model,
    tokensUsed: data.usage?.output_tokens,
  };
}

/**
 * Smart mock response based on system prompt context.
 * Used when no API key is configured.
 */
function generateSmartMockResponse(userMessage: string, systemPrompt: string): Promise<ClaudeResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      let response = '';

      if (systemPrompt.includes('Task Breakdown')) {
        response = `Here's how I'd break that down for you:\n\n**Step 1** (10 min): Start with the smallest piece — just open the document/tool you need.\n\n**Step 2** (15 min): Write down what "done" looks like for this task.\n\n**Step 3** (15 min): Do the first action. Just one.\n\n**Step 4**: Take a break if you need it. Seriously.\n\n**Step 5** (15 min): Do the next action.\n\nWant me to get more specific about "${userMessage}"?`;
      } else if (systemPrompt.includes('Career') || systemPrompt.includes('career')) {
        response = `Great question about "${userMessage}".\n\nBased on your strengths in pattern recognition and creative problem-solving, here are some directions worth exploring:\n\n**Option 1**: Roles that value big-picture thinking (product management, UX research, strategy consulting)\n\n**Option 2**: Creative-technical hybrids (data visualisation, design engineering, content strategy)\n\n**Option 3**: Independent/flexible roles (freelance consulting, startup founder, project-based work)\n\nWant me to dig deeper into any of these? I can also look at automation risk and salary data.`;
      } else if (systemPrompt.includes('Energy') || systemPrompt.includes('energy')) {
        response = `Let me help you think about your energy patterns.\n\nA few questions to start:\n\n1. **When do you feel most focused?** (morning, afternoon, evening, late night)\n\n2. **What drains you fastest?** (social interaction, screen time, decision-making, noise)\n\n3. **What recharges you?** (solitude, nature, specific activities)\n\nOnce I understand your patterns, I can help you structure your day around your natural energy cycles instead of fighting them.`;
      } else {
        response = `I hear you on "${userMessage}".\n\nLet me think about this with you. A few things stand out:\n\n**First**, your instinct here is probably right — neurodivergent thinkers often see patterns others miss.\n\n**Second**, let's break this into smaller pieces so it doesn't feel overwhelming.\n\n**Third**, I want to make sure we're building on your strengths, not working against how your brain processes things.\n\nWhat part of this feels most important to tackle first?`;
      }

      resolve({
        response,
        model: 'mock-response',
        tokensUsed: 0,
      });
    }, 800 + Math.random() * 700);
  });
}

/**
 * Build user context string from career profile data.
 * This gets injected into every agent conversation so Claude
 * already knows who it's talking to.
 */
export function buildUserContext(profile: Record<string, unknown> | null): string {
  if (!profile) return '';

  const parts: string[] = [];

  const name = profile.name as string;
  if (name) parts.push(`Name: ${name}`);

  const nd = profile.neurodivergence as string[];
  if (nd?.length) parts.push(`Neurodivergence: ${nd.join(', ')}`);

  const strengths = profile.strengths as string[];
  if (strengths?.length) parts.push(`Strengths: ${strengths.join(', ')}`);

  const challenges = profile.challenges as string[];
  if (challenges?.length) parts.push(`Challenges: ${challenges.join(', ')}`);

  const interests = profile.careerInterests as string[];
  if (interests?.length) parts.push(`Career interests: ${interests.join(', ')}`);

  return parts.join('\n');
}
