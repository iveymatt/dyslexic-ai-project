import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';

interface InputBarProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  initialText?: string | null;
}

export function InputBar({ onSend, disabled = false, initialText }: InputBarProps) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setMessage(prev => prev + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Pre-fill textarea when navigating from prompt library
  useEffect(() => {
    if (initialText) {
      setMessage(initialText);
      // Focus the textarea so user can review and send
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          // Place cursor at end of text
          textareaRef.current.selectionStart = initialText.length;
          textareaRef.current.selectionEnd = initialText.length;
        }
      }, 150);
    }
  }, [initialText]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="p-4" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto flex items-end gap-3">
        {/* Voice Input Button */}
        <button
          type="button"
          onClick={toggleListening}
          disabled={disabled}
          className={`btn-icon flex-shrink-0 ${
            isListening ? 'bg-red-600 hover:bg-red-700 text-white' : ''
          }`}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          title={isListening ? 'Stop voice input' : 'Start voice input'}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? 'Listening...' : 'Type your message... (Shift+Enter for new line)'}
          disabled={disabled}
          className="flex-1 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
          style={{ background: 'var(--bg-accent)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', minHeight: '50px', maxHeight: '200px' }}
          rows={1}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="btn-primary flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {disabled ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </div>

      {/* Status indicators */}
      {isListening && (
        <div className="max-w-4xl mx-auto mt-2 text-center">
          <span className="text-xs text-red-400 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Recording...
          </span>
        </div>
      )}
    </form>
  );
}
