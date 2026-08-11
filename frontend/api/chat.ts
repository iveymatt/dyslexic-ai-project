import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';
import { getSubAgentConfig } from '../src/config/modes';
import type { ThinkingMode, SubAgent } from '../src/types';

// Reads ANTHROPIC_API_KEY from the function's environment — never sent to the client.
const client = new Anthropic();

interface ChatRequestBody {
  message?: string;
  mode?: ThinkingMode;
  subAgent?: SubAgent;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

const FALLBACK_MESSAGE =
  "I wasn't able to respond to that one — mind trying again, or rephrasing it?";

const RATE_LIMIT_MESSAGE =
  "You've sent a lot of messages in a short window — give it a few minutes and try again.";

// Best-effort per-IP rate limit, held in module-level memory. Serverless
// functions can cold-start or run as multiple concurrent instances, so this
// isn't a hard guarantee — but Vercel reuses warm instances for repeated
// traffic from the same client in short bursts, which is exactly the
// runaway-cost pattern this guards against. For a hard guarantee as beta
// traffic grows, move this to Upstash Redis (`@upstash/ratelimit`).
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 30;
const RATE_LIMIT_MAX_TRACKED_IPS = 500; // prune oldest-window entries past this

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return req.socket?.remoteAddress ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (rateLimitStore.size > RATE_LIMIT_MAX_TRACKED_IPS) {
    for (const [key, entry] of rateLimitStore) {
      if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }

  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (isRateLimited(getClientIp(req))) {
    res.status(200).json({ text: RATE_LIMIT_MESSAGE });
    return;
  }

  const { message, mode, subAgent, history } = (req.body ?? {}) as ChatRequestBody;

  const subAgentConfig = mode && subAgent ? getSubAgentConfig(mode, subAgent) : undefined;
  if (!message || !subAgentConfig) {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 2048,
      output_config: { effort: 'medium' },
      system: [
        {
          type: 'text',
          text: subAgentConfig.systemPrompt,
          // Only 10 mode/sub-agent combos exist — this prefix is stable and
          // reused across every user hitting that combo within the TTL.
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        ...(history ?? []).map(m => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: message },
      ],
    });

    if (response.stop_reason === 'refusal') {
      res.status(200).json({ text: FALLBACK_MESSAGE });
      return;
    }

    const textBlock = response.content.find(block => block.type === 'text');
    res.status(200).json({ text: textBlock?.text ?? FALLBACK_MESSAGE });
  } catch (error) {
    console.error('Claude API error:', error);
    res.status(200).json({ text: FALLBACK_MESSAGE });
  }
}
