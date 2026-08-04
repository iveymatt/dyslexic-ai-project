// ============================================
// Agent Chat Panel — Live AI Conversations
// ============================================
// Drop-in chat component for any agent.
// Connects to Claude API when configured,
// falls back to smart mock responses.
// Uses CSS custom properties for accessibility compliance.

import { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { sendAgentMessage, buildUserContext, isClaudeConfigured, type ClaudeMessage } from '../../services/claudeService';

interface AgentChatPanelProps {
  agentName: string;
  agentEmoji: string;
  systemPrompt: string;
  placeholderText?: string;
  starterPrompts?: string[];
  userProfile?: Record<string, unknown> | null;
  accentColor?: string;
}

interface ChatMsg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export function AgentChatPanel({
  agentName,
  agentEmoji,
  systemPrompt,
  placeholderText,
  starterPrompts,
  userProfile,
}: AgentChatPanelProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMsg = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for Claude
      const history: ClaudeMessage[] = [
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: content.trim() },
      ];

      const userContext = buildUserContext(userProfile || null);

      const result = await sendAgentMessage(systemPrompt, history, {
        userContext,
        maxTokens: 2048,
        temperature: 0.7,
      });

      const assistantMsg: ChatMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
        model: result.model,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div
      className="rounded-xl flex flex-col"
      style={{
        height: '600px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-color)' }}
      >
        <span className="text-2xl" role="img" aria-label={`${agentName} icon`}>{agentEmoji}</span>
        <div className="flex-1">
          <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{agentName}</h3>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: isClaudeConfigured ? '#059669' : '#d97706' }}
              aria-hidden="true"
            />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {isClaudeConfigured ? 'Connected to Claude' : 'Demo mode'}
            </span>
          </div>
        </div>
        {!isClaudeConfigured && (
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-lg"
            style={{ background: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.2)' }}
          >
            <Sparkles size={12} style={{ color: '#d97706' }} />
            <span className="text-xs" style={{ color: '#d97706' }}>Demo</span>
          </div>
        )}
      </div>

      {/* Messages — aria-live for screen readers */}
      <div
        className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
        role="log"
        aria-live="polite"
        aria-label={`Conversation with ${agentName}`}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-4xl mb-3" role="img" aria-label={`${agentName} icon`}>{agentEmoji}</span>
            <p className="text-sm mb-4 max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Start a conversation with {agentName}. I already know your profile and will adapt to how you think.
            </p>
            {starterPrompts && starterPrompts.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {starterPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="px-3 py-2 text-xs rounded-lg transition-all"
                    style={{
                      background: 'var(--bg-accent)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-subtle)' }}
              >
                <span className="text-sm">{agentEmoji}</span>
              </div>
            )}
            <div
              className="max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { background: 'var(--text-accent)', color: '#fff' }
                : { background: 'var(--bg-accent)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }
              }
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.model && msg.model !== 'mock-response' && (
                <div className="mt-2 text-xs" style={{ opacity: 0.5, color: 'inherit' }}>{msg.model}</div>
              )}
            </div>
            {msg.role === 'user' && (
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--text-accent)' }}
              >
                <User size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3" aria-label="Agent is thinking">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-subtle)' }}
            >
              <span className="text-sm">{agentEmoji}</span>
            </div>
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-2"
              style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-subtle)' }}
            >
              <Loader2 size={14} className="animate-spin" style={{ color: 'var(--text-accent)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Thinking...</span>
            </div>
          </div>
        )}

        {error && (
          <div
            className="flex items-start gap-2 rounded-xl px-4 py-3"
            style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.2)' }}
            role="alert"
          >
            <AlertCircle size={16} style={{ color: '#DC2626' }} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm" style={{ color: '#DC2626' }}>{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-xs mt-1 hover:underline"
                style={{ color: '#DC2626' }}
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div
          className="flex items-end gap-2 rounded-xl px-3 py-2 transition-colors"
          style={{
            background: 'var(--bg-accent)',
            border: '1px solid var(--border-color)',
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText || `Ask ${agentName} anything...`}
            rows={1}
            className="flex-1 bg-transparent text-sm focus:outline-none resize-none py-1"
            style={{
              color: 'var(--text-primary)',
              minHeight: '24px',
              maxHeight: '120px',
            }}
            aria-label={`Message ${agentName}`}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="p-1.5 rounded-lg transition-all disabled:opacity-40"
            style={{
              background: input.trim() && !isLoading ? 'var(--text-accent)' : 'var(--bg-secondary)',
              color: input.trim() && !isLoading ? '#fff' : 'var(--text-secondary)',
            }}
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
