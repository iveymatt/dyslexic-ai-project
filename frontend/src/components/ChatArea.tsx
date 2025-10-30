import { useEffect, useRef, useState } from 'react';
import { Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MessageBubble } from './MessageBubble';
import { QuickActions } from './QuickActions';
import { InputBar } from './InputBar';
import { agents } from '../config/agents';
import { generateMockResponse } from '../utils/mockResponses';

export function ChatArea() {
  const { currentChat, addMessage, currentAgentMode } = useApp();
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
      agentMode: currentAgentMode,
    });

    // Simulate AI processing
    setIsProcessing(true);

    // Wait a bit to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate mock response based on agent mode
    const response = generateMockResponse(content, currentAgentMode);

    // Add assistant message
    addMessage({
      role: 'assistant',
      content: response,
      agentMode: currentAgentMode,
    });

    setIsProcessing(false);
  };

  const handleQuickAction = async (_action: string, content: string) => {
    await handleSendMessage(content);
  };

  const currentAgent = agents[currentAgentMode];
  const lastMessage = currentChat?.messages[currentChat.messages.length - 1] || null;

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        {!currentChat || currentChat.messages.length === 0 ? (
          // Welcome Screen
          <div className="h-full flex items-center justify-center p-8">
            <div className="max-w-3xl text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${currentAgent.color} rounded-full mb-6`}>
                <Brain size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Welcome to {currentAgent.name}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {currentAgent.description}
              </p>

              {/* Example Prompts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                {currentAgent.examplePrompts.map((prompt, idx) => (
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
                <h3 className="font-semibold mb-2 text-white">Getting Started</h3>
                <p className="text-sm text-gray-400">
                  Type your message below or use voice input. I'm here to help you think, learn, and create in a way that works for your brain.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <div className="max-w-4xl mx-auto p-6 w-full">
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
