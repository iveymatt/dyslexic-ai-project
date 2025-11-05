import React, { useState, useRef, useEffect } from 'react';
import { chatAPI, ChatMessage } from '../services/librechat';
import { ModelSelector } from './ModelSelector';

export const EnhancedChatArea: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [streamingResponse, setStreamingResponse] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check LibreChat connection on mount
  useEffect(() => {
    checkConnection();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingResponse]);

  const checkConnection = async () => {
    const isConnected = await chatAPI.testConnection();
    setConnectionStatus(isConnected ? 'connected' : 'error');
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingResponse('');

    try {
      const response = await chatAPI.sendMessage(
        userMessage.content,
        selectedModel,
        (text) => {
          // Handle streaming updates
          setStreamingResponse(text);
        }
      );

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        model: selectedModel,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamingResponse('');
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingResponse('');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([]);
    chatAPI.resetConversation();
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting for dyslexia-friendly display
    return content
      .split('\n')
      .map((line, i) => (
        <p key={i} style={{ margin: '8px 0' }}>
          {line || '\u00A0'}
        </p>
      ));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'OpenDyslexic, Arial, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: '#f0f7ff',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>Dyslexic AI Assistant</h1>

        {/* Connection Status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '15px',
        }}>
          <span>Status:</span>
          <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: connectionStatus === 'connected' ? '#4CAF50' :
                           connectionStatus === 'error' ? '#f44336' : '#ff9800',
            color: 'white',
            fontSize: '12px',
          }}>
            {connectionStatus === 'connected' ? '✓ Connected' :
             connectionStatus === 'error' ? '✗ Disconnected' : 'Checking...'}
          </span>
          {connectionStatus === 'error' && (
            <button onClick={checkConnection} style={{
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer',
            }}>
              Retry
            </button>
          )}
        </div>

        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          disabled={isLoading}
        />

        <button
          onClick={handleClearConversation}
          disabled={isLoading || messages.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            opacity: (isLoading || messages.length === 0) ? 0.5 : 1,
          }}
        >
          Clear Conversation
        </button>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '20px',
        lineHeight: '1.8',
        letterSpacing: '0.05em',
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#666',
            padding: '40px',
          }}>
            <h2>Welcome! 👋</h2>
            <p>I'm your dyslexia-friendly AI assistant.</p>
            <p>I'll help you with clear, simple explanations.</p>
            <p>Just type your question below to get started!</p>
          </div>
        )}

        {messages.map((message, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: '16px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: message.role === 'user' ? '#e3f2fd' : '#f5f5f5',
              borderLeft: `4px solid ${message.role === 'user' ? '#2196F3' : '#4CAF50'}`,
            }}
          >
            <div style={{
              fontWeight: 'bold',
              marginBottom: '8px',
              color: message.role === 'user' ? '#1976D2' : '#388E3C',
            }}>
              {message.role === 'user' ? 'You' : `AI (${message.model || 'Assistant'})`}
              <span style={{
                marginLeft: '10px',
                fontSize: '12px',
                fontWeight: 'normal',
                color: '#666',
              }}>
                {message.timestamp?.toLocaleTimeString()}
              </span>
            </div>
            <div style={{ color: '#333' }}>
              {formatMessage(message.content)}
            </div>
          </div>
        ))}

        {/* Streaming Response */}
        {isLoading && streamingResponse && (
          <div style={{
            marginBottom: '16px',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            borderLeft: '4px solid #4CAF50',
            opacity: 0.8,
          }}>
            <div style={{
              fontWeight: 'bold',
              marginBottom: '8px',
              color: '#388E3C',
            }}>
              AI ({selectedModel}) - Typing...
            </div>
            <div style={{ color: '#333' }}>
              {formatMessage(streamingResponse)}
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && !streamingResponse && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#666',
          }}>
            <div>🤔 AI is thinking...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
      }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here... (Press Enter to send)"
          disabled={isLoading || connectionStatus === 'error'}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontFamily: 'inherit',
            lineHeight: '1.5',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading || connectionStatus === 'error'}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            opacity: (!input.trim() || isLoading || connectionStatus === 'error') ? 0.5 : 1,
          }}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default EnhancedChatArea;
