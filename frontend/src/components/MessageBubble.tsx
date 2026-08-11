import { useState } from 'react';
import { Volume2, VolumeX, Copy, Check } from 'lucide-react';
import type { Message } from '../types';
import { useApp } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { accessibilitySettings } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message.content);
    utterance.rate = accessibilitySettings.ttsSpeed;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div
        className={`max-w-[80%] rounded-xl px-5 py-4 ${
          isUser
            ? 'text-white'
            : ''
        }`}
        style={isUser
          ? { background: 'linear-gradient(135deg, #00CBFF, #00a3cc)' }
          : { background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-subtle)' }
        }
      >
        {/* Message Content */}
        <div className="prose max-w-none" style={{ color: 'inherit' }}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {/* Actions (only for assistant messages) */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <button
              onClick={handleSpeak}
              className="btn-icon"
              aria-label={isSpeaking ? 'Stop speaking' : 'Read aloud'}
              title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              onClick={handleCopy}
              className="btn-icon"
              aria-label="Copy message"
              title="Copy message"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>

            <span className="text-xs ml-auto" style={{ color: 'var(--text-secondary)', opacity: 0.7 }}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}

        {/* Timestamp for user messages */}
        {isUser && (
          <div className="text-xs mt-2 text-right" style={{ opacity: 0.8 }}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
}
