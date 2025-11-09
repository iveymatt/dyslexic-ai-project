/**
 * Anthropic Claude Model Adapter
 * Supports Claude 3 Opus, Sonnet, Haiku, and Claude 2.1
 */

import { ModelAdapter, ModelResponse, ModelConfig } from "../schema/types";

/**
 * Anthropic adapter configuration
 */
export interface AnthropicAdapterConfig extends ModelConfig {
  modelId: string; // e.g., "claude-3-opus-20240229", "claude-3-sonnet-20240229"
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  baseUrl?: string;
}

/**
 * Anthropic API response type
 */
interface AnthropicResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Anthropic adapter implementation
 */
export class AnthropicAdapter implements ModelAdapter {
  private config: AnthropicAdapterConfig;
  private baseUrl: string;

  constructor(config: AnthropicAdapterConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || "https://api.anthropic.com/v1";

    if (!config.apiKey) {
      throw new Error("Anthropic API key is required");
    }
  }

  async generateResponse(prompt: string): Promise<ModelResponse> {
    const startTime = Date.now();

    try {
      const response = await this.callAnthropic(prompt);

      const latencyMs = Date.now() - startTime;
      const text = response.content[0]?.text || "";
      const tokensUsed = response.usage.input_tokens + response.usage.output_tokens;
      const costUsd = this.calculateCost(
        response.usage.input_tokens,
        response.usage.output_tokens
      );

      return {
        text,
        tokensUsed,
        costUsd,
        latencyMs,
        modelId: this.config.modelId,
        finishReason: response.stop_reason,
        metadata: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
          anthropicId: response.id,
        },
      };
    } catch (error) {
      throw new Error(
        `Anthropic API call failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Call Anthropic Messages API
   */
  private async callAnthropic(prompt: string): Promise<AnthropicResponse> {
    const url = `${this.baseUrl}/messages`;

    const requestBody = {
      model: this.config.modelId,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: this.config.maxTokens ?? 2000,
      temperature: this.config.temperature ?? 0.7,
      top_p: this.config.topP ?? 1.0,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.config.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anthropic API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data as AnthropicResponse;
  }

  /**
   * Calculate cost based on Anthropic pricing
   * Pricing as of January 2025 (approximate)
   */
  private calculateCost(inputTokens: number, outputTokens: number): number {
    // Pricing per 1M tokens (USD)
    const pricing: Record<string, { input: number; output: number }> = {
      "claude-3-opus-20240229": { input: 15.0, output: 75.0 },
      "claude-3-sonnet-20240229": { input: 3.0, output: 15.0 },
      "claude-3-haiku-20240307": { input: 0.25, output: 1.25 },
      "claude-2.1": { input: 8.0, output: 24.0 },
      "claude-2.0": { input: 8.0, output: 24.0 },
      // Claude 3.5 Sonnet (newer model)
      "claude-3-5-sonnet-20240620": { input: 3.0, output: 15.0 },
    };

    // Default to Claude 3 Opus pricing if model not found
    const modelPricing = pricing[this.config.modelId] || pricing["claude-3-opus-20240229"];

    const inputCost = (inputTokens / 1_000_000) * modelPricing.input;
    const outputCost = (outputTokens / 1_000_000) * modelPricing.output;

    return inputCost + outputCost;
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
      await this.callAnthropic("test");
      return true;
    } catch (error) {
      console.error("[Anthropic Adapter] Readiness check failed:", error);
      return false;
    }
  }
}

/**
 * Create Anthropic adapter from environment variables
 */
export function createAnthropicAdapter(
  modelId: string = "claude-3-sonnet-20240229",
  overrides?: Partial<AnthropicAdapterConfig>
): AnthropicAdapter {
  const apiKey = process.env.ANTHROPIC_API_KEY || "";

  if (!apiKey && !overrides?.apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY environment variable is required. Set it in your .env file."
    );
  }

  return new AnthropicAdapter({
    modelId,
    apiKey,
    ...overrides,
  });
}

/**
 * Preset Anthropic adapters
 */
export const ANTHROPIC_PRESETS = {
  opus: () => createAnthropicAdapter("claude-3-opus-20240229"),
  sonnet: () => createAnthropicAdapter("claude-3-sonnet-20240229"),
  sonnet35: () => createAnthropicAdapter("claude-3-5-sonnet-20240620"),
  haiku: () => createAnthropicAdapter("claude-3-haiku-20240307"),
  claude21: () => createAnthropicAdapter("claude-2.1"),
};
