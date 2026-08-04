import { useEffect, useRef, useState } from 'react';
import { Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MessageBubble } from './MessageBubble';
import { QuickActions } from './QuickActions';
import { InputBar } from './InputBar';
import { modes, getSubAgentConfig } from '../config/modes';
import { generateMockResponse } from '../utils/mockResponses';
import { sendAgentMessage, buildUserContext, isClaudeConfigured, type ClaudeMessage } from '../services/claudeService';

export function ChatArea() {
  const { currentChat, addMessage, currentMode, currentSubAgent, pendingPrompt, setPendingPrompt } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content,
      mode: currentMode,
      subAgent: currentSubAgent,
    });

    setIsProcessing(true);

    try {
      // Get the system prompt for the current mode/sub-agent
      const subAgentConfig = getSubAgentConfig(currentMode, currentSubAgent);
      const systemPrompt = subAgentConfig?.systemPrompt || modes[currentMode]?.description || '';

      if (isClaudeConfigured && systemPrompt) {
        // REAL MODE: Send to Claude API
        const chatHistory: ClaudeMessage[] = (currentChat?.messages || [])
          .filter(m => m.role === 'user' || m.role === 'assistant')
          .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
        chatHistory.push({ role: 'user', content });

        // Load career profile for context
        const profileStr = localStorage.getItem('career-profile');
        const profile = profileStr ? JSON.parse(profileStr) : null;
        const userContext = buildUserContext(profile);

        const result = await sendAgentMessage(systemPrompt, chatHistory, { userContext });

        addMessage({
          role: 'assistant',
          content: result.response,
          mode: currentMode,
          subAgent: currentSubAgent,
        });
      } else {
        // DEMO MODE: Use mock responses
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
        const response = generateMockResponse(content, currentMode, currentSubAgent);

        addMessage({
          role: 'assistant',
          content: response,
          mode: currentMode,
          subAgent: currentSubAgent,
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to mock on error
      const response = generateMockResponse(content, currentMode, currentSubAgent);
      addMessage({
        role: 'assistant',
        content: response,
        mode: currentMode,
        subAgent: currentSubAgent,
      });
    }

    setIsProcessing(false);
  };

  const handleQuickAction = async (_action: string, content: string) => {
    await handleSendMessage(content);
  };

  const currentModeConfig = modes[currentMode];
  const currentSubAgentConfig = getSubAgentConfig(currentMode, currentSubAgent);
  const lastMessage = currentChat?.messages[currentChat.messages.length - 1] || null;

  return (
    <div className="flex-1 flex flex-col h-full" style={{ background: 'var(--bg-primary)' }}>
      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto"
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
      >
        {!currentChat || currentChat.messages.length === 0 ? (
          // Welcome Screen
          <div className="h-full flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-3xl text-center w-full">
              <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 ${currentModeConfig.color} rounded-full mb-4 sm:mb-6`}>
                <Brain size={28} className="text-white sm:hidden" />
                <Brain size={32} className="text-white hidden sm:block" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-serif" style={{ color: 'var(--text-primary)' }}>
                {currentModeConfig.name} Mode
              </h2>
              <h3 className="text-lg sm:text-xl text-cyan-500 mb-3 sm:mb-4">
                {currentSubAgentConfig?.name}
              </h3>
              <p className="text-base sm:text-lg mb-6 sm:mb-8" style={{ color: 'var(--text-secondary)' }}>
                {currentModeConfig.tagline}
              </p>

              {/* Example Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 sm:mt-8">
                {currentModeConfig.examplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-left p-4 rounded-lg card cursor-pointer"
                  >
                    <p style={{ color: 'var(--text-secondary)' }}>{prompt}</p>
                  </button>
                ))}
              </div>

              {/* Info */}
              <div className="mt-12 p-6 rounded-lg card">
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>About This Mode</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {currentModeConfig.description}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
                  <strong>Current Assistant:</strong> {currentSubAgentConfig?.name} - {currentSubAgentConfig?.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <div className="max-w-4xl mx-auto px-3 py-4 sm:p-6 w-full">
            {/* Mode/Sub-agent indicator */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-color)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                {currentModeConfig.name} &bull; {currentSubAgentConfig?.name}
              </span>
            </div>

            {currentChat.messages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className="flex justify-start mb-6" aria-label="Assistant is thinking">
                <div className="rounded-xl px-5 py-4 card">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {currentChat && currentChat.messages.length > 0 && (
        <QuickActions lastMessage={lastMessage} onAction={handleQuickAction} />
      )}

      {/* Input Bar */}
      <InputBar onSend={(msg) => { setPendingPrompt(null); handleSendMessage(msg); }} disabled={isProcessing} initialText={pendingPrompt} />
    </div>
  );
}
