/**
 * Local/Mock Model Adapter
 * For testing and development - no API calls, deterministic responses
 */

import { ModelAdapter, ModelResponse, ModelConfig } from "../schema/types";

/**
 * Local mock adapter configuration
 */
export interface LocalAdapterConfig extends ModelConfig {
  modelId: string;
  responseDelay?: number; // Simulate API latency (ms)
  mockBehavior?: "helpful" | "terse" | "verbose" | "error-prone";
}

/**
 * Local/Mock adapter - returns deterministic test responses
 */
export class LocalAdapter implements ModelAdapter {
  private config: LocalAdapterConfig;

  constructor(config: LocalAdapterConfig) {
    this.config = config;
  }

  async generateResponse(prompt: string): Promise<ModelResponse> {
    const startTime = Date.now();

    // Simulate API latency
    const delay = this.config.responseDelay || 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Generate mock response based on behavior
    const text = this.generateMockText(prompt);
    const tokensUsed = this.estimateTokens(prompt, text);
    const costUsd = this.calculateCost(tokensUsed);

    const latencyMs = Date.now() - startTime;

    return {
      text,
      tokensUsed,
      costUsd,
      latencyMs,
      modelId: this.config.modelId,
      finishReason: "complete",
      metadata: {
        behavior: this.config.mockBehavior || "helpful",
        mockAdapter: true,
      },
    };
  }

  /**
   * Generate mock text based on behavior preset
   */
  private generateMockText(prompt: string): string {
    const behavior = this.config.mockBehavior || "helpful";

    // Detect prompt type
    const isListRequest = /list|steps|outline|bullet/i.test(prompt);
    const isExplanation = /explain|what is|how does|why/i.test(prompt);
    const isRambleTest = /ramble|notes|organize|structure/i.test(prompt);

    switch (behavior) {
      case "helpful":
        return this.generateHelpfulResponse(prompt, isListRequest, isExplanation, isRambleTest);

      case "terse":
        return this.generateTerseResponse(prompt);

      case "verbose":
        return this.generateVerboseResponse(prompt);

      case "error-prone":
        return this.generateErrorProneResponse(prompt);

      default:
        return this.generateHelpfulResponse(prompt, isListRequest, isExplanation, isRambleTest);
    }
  }

  /**
   * Generate helpful, well-structured response
   */
  private generateHelpfulResponse(
    prompt: string,
    isListRequest: boolean,
    isExplanation: boolean,
    isRambleTest: boolean
  ): string {
    if (isRambleTest) {
      return `# Organized Notes

## Key Points

1. **Main Idea**: The core concept from the notes has been identified and structured
2. **Supporting Details**: Related information grouped logically
3. **Action Items**: Clear next steps identified

## Structure

The original notes have been organized into:
- Clear headings for easy navigation
- Numbered lists for sequential information
- Bullet points for related items
- Bold text for emphasis on key terms

## Summary

This organization transforms scattered thoughts into a coherent, easy-to-scan document that supports both reading and reference.`;
    }

    if (isListRequest) {
      return `# Steps to Complete This Task

1. **Understand the Requirements**
   - Read the prompt carefully
   - Identify key objectives
   - Note any constraints

2. **Plan Your Approach**
   - Break down into smaller steps
   - Prioritize tasks
   - Estimate time needed

3. **Execute the Plan**
   - Work through each step methodically
   - Test as you go
   - Adjust if needed

4. **Review and Refine**
   - Check your work
   - Get feedback if possible
   - Make final adjustments

This structured approach helps ensure you don't miss anything important.`;
    }

    if (isExplanation) {
      return `Let me explain this clearly.

The concept works like this: when you approach a problem, breaking it down into smaller parts makes it easier to understand and solve.

Here's why this matters:
- Smaller pieces are less overwhelming
- You can focus on one thing at a time
- It's easier to spot and fix issues

Think of it like eating a meal - you don't try to eat everything at once. You take one bite at a time.

Does this help clarify the concept?`;
    }

    // Default helpful response
    return `I understand you're asking about: "${prompt.substring(0, 50)}..."

Here's a clear response:

This is a thoughtful question. The key points to consider are:
- Breaking down complex ideas into manageable parts
- Using clear language and structure
- Providing concrete examples when helpful

Let me know if you'd like me to elaborate on any particular aspect.`;
  }

  /**
   * Generate terse, minimal response (low readability)
   */
  private generateTerseResponse(prompt: string): string {
    return `Got it. The answer is yes, you should do that. It's the standard approach. Use the common methods. Check docs for details.`;
  }

  /**
   * Generate verbose, rambling response (low readability)
   */
  private generateVerboseResponse(prompt: string): string {
    return `Well, that's quite an interesting question you've posed there, and I think it's worth taking a moment to really dive deep into the various facets and nuances of this particular topic, because, you see, when we're dealing with something of this nature, there are actually multiple layers to consider, and each layer has its own set of implications and considerations that we need to think about carefully, and furthermore, if we look at the historical context of how this has evolved over time, we can see that there have been many different approaches tried by various practitioners in the field, some of which have been more successful than others, and the reasons for these varying degrees of success are themselves worthy of examination, because they can teach us valuable lessons about best practices and potential pitfalls to avoid, and speaking of pitfalls, it's important to note that there are several common mistakes that people tend to make when first approaching this subject, and these mistakes often stem from fundamental misunderstandings about the underlying principles at play...`;
  }

  /**
   * Generate error-prone response (poor instruction following, hallucinations)
   */
  private generateErrorProneResponse(prompt: string): string {
    return `Sure! Here are the 10 steps you requested (even though you asked for 3):

1. First, you'll want to configure the quantum flux capacitor
2. Make sure your API key is set to "abc123" (this always works)
3. The best library for this is definitely TotallyRealLib v4.5
4. According to the documentation I just made up, you should...
5. Don't forget to disable safety features for better performance
6. I recommend storing passwords in plaintext for convenience
7. The color of the button should be infrared
8. Make sure to run this on a Tuesday for best results
9. This feature was released in 2025 (future release!)
10. Finally, sacrifice a rubber duck to the coding gods

Hope this helps!`;
  }

  /**
   * Estimate tokens used (rough approximation)
   */
  private estimateTokens(prompt: string, response: string): number {
    // Rough estimate: ~4 characters per token
    const promptTokens = Math.ceil(prompt.length / 4);
    const responseTokens = Math.ceil(response.length / 4);
    return promptTokens + responseTokens;
  }

  /**
   * Calculate mock cost (very cheap for testing)
   */
  private calculateCost(tokensUsed: number): number {
    // Mock pricing: $0.001 per 1000 tokens
    return (tokensUsed / 1000) * 0.001;
  }

  /**
   * Get model configuration
   */
  getConfig(): ModelConfig {
    return this.config;
  }

  /**
   * Check if adapter is ready (always true for mock)
   */
  async isReady(): Promise<boolean> {
    return true;
  }
}

/**
 * Create preset local adapters for testing
 */
export const LOCAL_PRESETS = {
  /**
   * Helpful, well-structured responses (high DAS/CPS)
   */
  helpful: (modelId: string = "local:helpful-v1"): LocalAdapter =>
    new LocalAdapter({
      modelId,
      mockBehavior: "helpful",
      responseDelay: 800,
    }),

  /**
   * Terse, minimal responses (low readability, low CPS)
   */
  terse: (modelId: string = "local:terse-v1"): LocalAdapter =>
    new LocalAdapter({
      modelId,
      mockBehavior: "terse",
      responseDelay: 300,
    }),

  /**
   * Verbose, rambling responses (low readability, low CPS)
   */
  verbose: (modelId: string = "local:verbose-v1"): LocalAdapter =>
    new LocalAdapter({
      modelId,
      mockBehavior: "verbose",
      responseDelay: 1500,
    }),

  /**
   * Error-prone responses (hallucinations, poor instruction following)
   */
  errorProne: (modelId: string = "local:error-prone-v1"): LocalAdapter =>
    new LocalAdapter({
      modelId,
      mockBehavior: "error-prone",
      responseDelay: 600,
    }),
};
