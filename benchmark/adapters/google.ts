/**
 * Google Gemini Model Adapter
 * Supports Gemini Pro, Gemini Pro Vision, Gemini Ultra
 */

import { ModelAdapter, ModelResponse, ModelConfig } from "../schema/types";

/**
 * Google Gemini adapter configuration
 */
export interface GoogleAdapterConfig extends ModelConfig {
  modelId: string; // e.g., "gemini-pro", "gemini-pro-vision", "gemini-ultra"
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  baseUrl?: string;
}

/**
 * Google Gemini API response type
 */
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    safetyRatings?: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

/**
 * Google Gemini adapter implementation
 */
export class GoogleAdapter implements ModelAdapter {
  private config: GoogleAdapterConfig;
  private baseUrl: string;

  constructor(config: GoogleAdapterConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || "https://generativelanguage.googleapis.com/v1beta";

    if (!config.apiKey) {
      throw new Error("Google API key is required");
    }
  }

  async generateResponse(prompt: string): Promise<ModelResponse> {
    const startTime = Date.now();

    try {
      const response = await this.callGemini(prompt);

      const latencyMs = Date.now() - startTime;
      const text = response.candidates[0]?.content?.parts[0]?.text || "";
      const tokensUsed = response.usageMetadata?.totalTokenCount || this.estimateTokens(prompt, text);
      const costUsd = this.calculateCost(
        response.usageMetadata?.promptTokenCount || Math.ceil(prompt.length / 4),
        response.usageMetadata?.candidatesTokenCount || Math.ceil(text.length / 4)
      );

      return {
        text,
        tokensUsed,
        costUsd,
        latencyMs,
        modelId: this.config.modelId,
        finishReason: response.candidates[0]?.finishReason || "unknown",
        metadata: {
          promptTokens: response.usageMetadata?.promptTokenCount,
          completionTokens: response.usageMetadata?.candidatesTokenCount,
          safetyRatings: response.candidates[0]?.safetyRatings,
        },
      };
    } catch (error) {
      throw new Error(
        `Google Gemini API call failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Call Google Gemini API
   */
  private async callGemini(prompt: string): Promise<GeminiResponse> {
    const url = `${this.baseUrl}/models/${this.config.modelId}:generateContent?key=${this.config.apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: this.config.temperature ?? 0.7,
        maxOutputTokens: this.config.maxTokens ?? 2000,
        topP: this.config.topP ?? 1.0,
        topK: this.config.topK ?? 40,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return data as GeminiResponse;
  }

  /**
   * Estimate tokens (fallback if usage metadata not provided)
   */
  private estimateTokens(prompt: string, response: string): number {
    // Rough estimate: ~4 characters per token
    return Math.ceil((prompt.length + response.length) / 4);
  }

  /**
   * Calculate cost based on Google Gemini pricing
   * Pricing as of January 2025 (approximate)
   */
  private calculateCost(inputTokens: number, outputTokens: number): number {
    // Pricing per 1M tokens (USD)
    const pricing: Record<string, { input: number; output: number }> = {
      "gemini-pro": { input: 0.5, output: 1.5 },
      "gemini-1.0-pro": { input: 0.5, output: 1.5 },
      "gemini-pro-vision": { input: 0.5, output: 1.5 },
      "gemini-1.5-pro": { input: 1.25, output: 5.0 },
      "gemini-1.5-flash": { input: 0.075, output: 0.3 },
      "gemini-ultra": { input: 10.0, output: 30.0 }, // Estimated, not publicly available yet
    };

    // Default to gemini-pro pricing if model not found
    const modelPricing = pricing[this.config.modelId] || pricing["gemini-pro"];

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
      await this.callGemini("test");
      return true;
    } catch (error) {
      console.error("[Google Adapter] Readiness check failed:", error);
      return false;
    }
  }
}

/**
 * Create Google adapter from environment variables
 */
export function createGoogleAdapter(
  modelId: string = "gemini-pro",
  overrides?: Partial<GoogleAdapterConfig>
): GoogleAdapter {
  const apiKey = process.env.GOOGLE_API_KEY || "";

  if (!apiKey && !overrides?.apiKey) {
    throw new Error(
      "GOOGLE_API_KEY environment variable is required. Set it in your .env file."
    );
  }

  return new GoogleAdapter({
    modelId,
    apiKey,
    ...overrides,
  });
}

/**
 * Preset Google adapters
 */
export const GOOGLE_PRESETS = {
  geminiPro: () => createGoogleAdapter("gemini-pro"),
  gemini15Pro: () => createGoogleAdapter("gemini-1.5-pro"),
  gemini15Flash: () => createGoogleAdapter("gemini-1.5-flash"),
  geminiProVision: () => createGoogleAdapter("gemini-pro-vision"),
};
