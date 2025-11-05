import { useEffect, useRef, useState } from 'react';
import { Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MessageBubble } from './MessageBubble';
import { QuickActions } from './QuickActions';
import { InputBar } from './InputBar';
import { modes, getSubAgentConfig } from '../config/modes';
import { generateMockResponse } from '../utils/mockResponses';

export function ChatArea() {
  const { currentChat, addMessage, currentMode, currentSubAgent } = useApp();
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

    // Simulate AI processing
    setIsProcessing(true);

    // Wait a bit to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate mock response based on mode and sub-agent
    const response = generateMockResponse(content, currentMode, currentSubAgent);

    // Add assistant message
    addMessage({
      role: 'assistant',
      content: response,
      mode: currentMode,
      subAgent: currentSubAgent,
    });

    setIsProcessing(false);
  };

  const handleQuickAction = async (_action: string, content: string) => {
    await handleSendMessage(content);
  };

  const currentModeConfig = modes[currentMode];
  const currentSubAgentConfig = getSubAgentConfig(currentMode, currentSubAgent);
  const lastMessage = currentChat?.messages[currentChat.messages.length - 1] || null;

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        {!currentChat || currentChat.messages.length === 0 ? (
          // Welcome Screen
          <div className="h-full flex items-center justify-center p-8">
            <div className="max-w-3xl text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${currentModeConfig.color} rounded-full mb-6`}>
                <Brain size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white">
                {currentModeConfig.name} Mode
              </h2>
              <h3 className="text-xl text-primary-400 mb-4">
                {currentSubAgentConfig?.name}
              </h3>
              <p className="text-lg text-gray-400 mb-8">
                {currentModeConfig.tagline}
              </p>

              {/* Example Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                {currentModeConfig.examplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
                  >
                    <p className="text-gray-300">{prompt}</p>
                  </button>
                ))}
              </div>

              {/* Info */}
              <div className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                <h3 className="font-semibold mb-2 text-white">About This Mode</h3>
                <p className="text-sm text-gray-400 mb-3">
                  {currentModeConfig.description}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Current Assistant:</strong> {currentSubAgentConfig?.name} - {currentSubAgentConfig?.description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <div className="max-w-4xl mx-auto p-6 w-full">
            {/* Mode/Sub-agent indicator */}
            <div className={`mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${currentModeConfig.color} bg-opacity-20 border ${currentModeConfig.color.replace('bg-', 'border-')}`}>
              <span className="text-sm font-medium text-gray-300">
                {currentModeConfig.name} • {currentSubAgentConfig?.name}
              </span>
            </div>

            {currentChat.messages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isProcessing && (
              <div className="flex justify-start mb-6">
                <div className="bg-gray-800 text-gray-100 rounded-xl px-5 py-4 border border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-sm text-gray-400">Thinking...</span>
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
      <InputBar onSend={handleSendMessage} disabled={isProcessing} />
    </div>
  );
}
