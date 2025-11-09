/**
 * OpenAI Model Adapter
 * Supports GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
 */

import { ModelAdapter, ModelResponse, ModelConfig } from "../schema/types";

/**
 * OpenAI adapter configuration
 */
export interface OpenAIAdapterConfig extends ModelConfig {
  modelId: string; // e.g., "gpt-4", "gpt-4-turbo-preview", "gpt-3.5-turbo"
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  baseUrl?: string; // Optional: for Azure OpenAI or custom endpoints
}

/**
 * OpenAI API response type
 */
interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * OpenAI adapter implementation
 */
export class OpenAIAdapter implements ModelAdapter {
  private config: OpenAIAdapterConfig;
  private baseUrl: string;

  constructor(config: OpenAIAdapterConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || "https://api.openai.com/v1";

    if (!config.apiKey) {
      throw new Error("OpenAI API key is required");
    }
  }

  async generateResponse(prompt: string): Promise<ModelResponse> {
    const startTime = Date.now();

    try {
      const response = await this.callOpenAI(prompt);

      const latencyMs = Date.now() - startTime;
      const text = response.choices[0]?.message?.content || "";
      const tokensUsed = response.usage.total_tokens;
      const costUsd = this.calculateCost(
        response.usage.prompt_tokens,
        response.usage.completion_tokens
      );

      return {
        text,
        tokensUsed,
        costUsd,
        latencyMs,
        modelId: this.config.modelId,
        finishReason: response.choices[0]?.finish_reason || "unknown",
        metadata: {
          promptTokens: response.usage.prompt_tokens,
          completionTokens: response.usage.completion_tokens,
          openaiId: response.id,
        },
      };
    } catch (error) {
      throw new Error(
        `OpenAI API call failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Call OpenAI Chat Completions API
   */
  private async callOpenAI(prompt: string): Promise<OpenAIResponse> {
    const url = `${this.baseUrl}/chat/completions`;

    const requestBody = {
      model: this.config.modelId,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: this.config.temperature ?? 0.7,
      max_tokens: this.config.maxTokens ?? 2000,
      top_p: this.config.topP ?? 1.0,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data as OpenAIResponse;
  }

  /**
   * Calculate cost based on OpenAI pricing
   * Pricing as of January 2025 (approximate)
   */
  private calculateCost(promptTokens: number, completionTokens: number): number {
    // Pricing per 1M tokens (USD)
    const pricing: Record<string, { input: number; output: number }> = {
      "gpt-4": { input: 30.0, output: 60.0 },
      "gpt-4-turbo": { input: 10.0, output: 30.0 },
      "gpt-4-turbo-preview": { input: 10.0, output: 30.0 },
      "gpt-4-0125-preview": { input: 10.0, output: 30.0 },
      "gpt-4-1106-preview": { input: 10.0, output: 30.0 },
      "gpt-3.5-turbo": { input: 0.5, output: 1.5 },
      "gpt-3.5-turbo-0125": { input: 0.5, output: 1.5 },
      "gpt-3.5-turbo-1106": { input: 1.0, output: 2.0 },
    };

    // Default to GPT-4 pricing if model not found
    const modelPricing = pricing[this.config.modelId] || pricing["gpt-4"];

    const promptCost = (promptTokens / 1_000_000) * modelPricing.input;
    const completionCost = (completionTokens / 1_000_000) * modelPricing.output;

    return promptCost + completionCost;
  }

  /**
   * Get model configuration
   */
  getConfig(): ModelConfig {
    return this.config;
  }

  /**
   * Check if adapter is ready (test API key)
   */
  async isReady(): Promise<boolean> {
    try {
      // Test with minimal request
      await this.callOpenAI("test");
      return true;
    } catch (error) {
      console.error("[OpenAI Adapter] Readiness check failed:", error);
      return false;
    }
  }
}

/**
 * Create OpenAI adapter from environment variables
 */
export function createOpenAIAdapter(
  modelId: string = "gpt-4",
  overrides?: Partial<OpenAIAdapterConfig>
): OpenAIAdapter {
  const apiKey = process.env.OPENAI_API_KEY || "";

  if (!apiKey && !overrides?.apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable is required. Set it in your .env file."
    );
  }

  return new OpenAIAdapter({
    modelId,
    apiKey,
    ...overrides,
  });
}

/**
 * Preset OpenAI adapters
 */
export const OPENAI_PRESETS = {
  gpt4: () => createOpenAIAdapter("gpt-4"),
  gpt4Turbo: () => createOpenAIAdapter("gpt-4-turbo-preview"),
  gpt35Turbo: () => createOpenAIAdapter("gpt-3.5-turbo"),
};
