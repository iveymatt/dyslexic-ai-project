// LibreChat API Integration Service
// This service connects the dyslexic AI frontend to LibreChat backend

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  model?: string;
}

export interface ChatResponse {
  response: string;
  conversationId?: string;
  messageId?: string;
  model?: string;
}

export interface ModelOption {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google';
  description: string;
  isAvailable: boolean;
}

class LibreChatAPI {
  private baseURL = 'http://localhost:3080/api';
  private conversationId: string | null = null;
  private abortController: AbortController | null = null;

  // Available models configuration
  getAvailableModels(): ModelOption[] {
    return [
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'OpenAI',
        description: 'Fast and efficient for most tasks',
        isAvailable: true,
      },
      {
        id: 'gpt-4',
        name: 'GPT-4',
        provider: 'OpenAI',
        description: 'Most capable, best for complex tasks',
        isAvailable: true,
      },
      {
        id: 'claude-3-opus-20240229',
        name: 'Claude 3 Opus',
        provider: 'Anthropic',
        description: 'Excellent for analysis and writing',
        isAvailable: true,
      },
      {
        id: 'claude-3-sonnet-20240229',
        name: 'Claude 3 Sonnet',
        provider: 'Anthropic',
        description: 'Balanced performance and speed',
        isAvailable: true,
      },
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        provider: 'Google',
        description: 'Google\'s advanced model',
        isAvailable: true,
      },
    ];
  }

  // Get dyslexia-optimized system prompt
  private getDyslexiaSystemPrompt(): string {
    return `You are an AI assistant specifically designed to help users with dyslexia.

IMPORTANT GUIDELINES:
1. Use clear, simple language - avoid complex vocabulary
2. Break information into small, digestible chunks
3. Use bullet points and numbered lists for clarity
4. Keep sentences short (10-15 words maximum)
5. Provide visual structure with headers and spacing
6. Be patient, supportive, and encouraging
7. Offer to rephrase or explain differently if needed
8. Use examples and analogies to explain concepts
9. Avoid walls of text - use paragraph breaks frequently
10. Highlight key points with **bold** formatting

Remember: The user may have difficulty with reading, spelling, or processing written information. Be their supportive partner in communication.`;
  }

  // Determine API endpoint based on model
  private getEndpointForModel(model: string): string {
    if (model.includes('gpt')) return '/chat/openAI';
    if (model.includes('claude')) return '/chat/anthropic';
    if (model.includes('gemini')) return '/chat/google';
    return '/chat/openAI'; // default fallback
  }

  // Send message to LibreChat
  async sendMessage(
    message: string,
    model: string = 'gpt-3.5-turbo',
    onStream?: (text: string) => void
  ): Promise<ChatResponse> {
    try {
      // Cancel any previous request
      if (this.abortController) {
        this.abortController.abort();
      }
      this.abortController = new AbortController();

      const endpoint = this.getEndpointForModel(model);

      const requestBody = {
        messages: [
          {
            role: 'system',
            content: this.getDyslexiaSystemPrompt()
          },
          {
            role: 'user',
            content: message
          }
        ],
        model: model,
        temperature: 0.7,
        max_tokens: 2000,
        stream: !!onStream,
        conversationId: this.conversationId,
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': onStream ? 'text/event-stream' : 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // Handle streaming response
      if (onStream && response.body) {
        return this.handleStreamResponse(response, onStream);
      }

      // Handle regular response
      const data = await response.json();

      // Store conversation ID for context
      if (data.conversationId) {
        this.conversationId = data.conversationId;
      }

      return {
        response: data.response || data.text || data.reply || data.choices?.[0]?.message?.content || 'No response received',
        conversationId: data.conversationId,
        messageId: data.messageId,
        model: model,
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request was cancelled');
      }
      console.error('LibreChat API Error:', error);
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  // Handle streaming responses
  private async handleStreamResponse(
    response: Response,
    onStream: (text: string) => void
  ): Promise<ChatResponse> {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let conversationId = '';
    let messageId = '';

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.text) {
                fullResponse += data.text;
                onStream(fullResponse);
              }
              if (data.conversationId) {
                conversationId = data.conversationId;
                this.conversationId = conversationId;
              }
              if (data.messageId) {
                messageId = data.messageId;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return {
      response: fullResponse,
      conversationId,
      messageId,
    };
  }

  // Cancel ongoing request
  cancelRequest(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // Reset conversation
  resetConversation(): void {
    this.conversationId = null;
    this.cancelRequest();
  }

  // Test connection to LibreChat
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL.replace('/api', '')}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const chatAPI = new LibreChatAPI();
