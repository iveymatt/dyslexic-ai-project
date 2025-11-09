/**
 * Model Adapter Registry
 * Central export point for all model adapters
 */

import { ModelAdapter } from "../schema/types";
import { LocalAdapter, LOCAL_PRESETS } from "./local";
import { OpenAIAdapter, OPENAI_PRESETS, createOpenAIAdapter } from "./openai";
import { AnthropicAdapter, ANTHROPIC_PRESETS, createAnthropicAdapter } from "./anthropic";
import { GoogleAdapter, GOOGLE_PRESETS, createGoogleAdapter } from "./google";

/**
 * Export all adapters
 */
export { LocalAdapter, OpenAIAdapter, AnthropicAdapter, GoogleAdapter };

/**
 * Export all presets
 */
export const ADAPTER_PRESETS = {
  local: LOCAL_PRESETS,
  openai: OPENAI_PRESETS,
  anthropic: ANTHROPIC_PRESETS,
  google: GOOGLE_PRESETS,
};

/**
 * Adapter factory - creates adapter from model ID string
 */
export function createAdapter(modelId: string): ModelAdapter {
  // Parse model ID format: "provider:model-name"
  // Examples: "openai:gpt-4", "anthropic:claude-3-sonnet", "local:helpful-v1"

  const parts = modelId.split(":");
  if (parts.length !== 2) {
    throw new Error(
      `Invalid model ID format: "${modelId}". Expected format: "provider:model-name"`
    );
  }

  const [provider, model] = parts;

  switch (provider.toLowerCase()) {
    case "local":
      return createLocalAdapter(model);

    case "openai":
      return createOpenAIAdapter(model);

    case "anthropic":
      return createAnthropicAdapter(model);

    case "google":
      return createGoogleAdapter(model);

    default:
      throw new Error(`Unknown provider: "${provider}". Supported: local, openai, anthropic, google`);
  }
}

/**
 * Create local adapter from model name
 */
function createLocalAdapter(modelName: string): LocalAdapter {
  switch (modelName.toLowerCase()) {
    case "helpful-v1":
    case "helpful":
      return LOCAL_PRESETS.helpful();

    case "terse-v1":
    case "terse":
      return LOCAL_PRESETS.terse();

    case "verbose-v1":
    case "verbose":
      return LOCAL_PRESETS.verbose();

    case "error-prone-v1":
    case "error-prone":
      return LOCAL_PRESETS.errorProne();

    default:
      // Default to helpful
      return LOCAL_PRESETS.helpful(`local:${modelName}`);
  }
}

/**
 * Get all available model IDs
 */
export function getAvailableModels(): string[] {
  return [
    // Local presets
    "local:helpful-v1",
    "local:terse-v1",
    "local:verbose-v1",
    "local:error-prone-v1",

    // OpenAI models (require API key)
    "openai:gpt-4",
    "openai:gpt-4-turbo-preview",
    "openai:gpt-3.5-turbo",

    // Anthropic models (require API key)
    "anthropic:claude-3-opus-20240229",
    "anthropic:claude-3-sonnet-20240229",
    "anthropic:claude-3-5-sonnet-20240620",
    "anthropic:claude-3-haiku-20240307",
    "anthropic:claude-2.1",

    // Google models (require API key)
    "google:gemini-pro",
    "google:gemini-1.5-pro",
    "google:gemini-1.5-flash",
  ];
}

/**
 * Check if model requires API key
 */
export function requiresApiKey(modelId: string): boolean {
  const provider = modelId.split(":")[0];
  return provider !== "local";
}

/**
 * Get provider name from model ID
 */
export function getProvider(modelId: string): string {
  const parts = modelId.split(":");
  return parts[0] || "unknown";
}

/**
 * Get model name from model ID
 */
export function getModelName(modelId: string): string {
  const parts = modelId.split(":");
  return parts[1] || modelId;
}

/**
 * Validate model ID format
 */
export function isValidModelId(modelId: string): boolean {
  try {
    const parts = modelId.split(":");
    if (parts.length !== 2) return false;

    const provider = parts[0];
    const validProviders = ["local", "openai", "anthropic", "google"];

    return validProviders.includes(provider.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * Get human-readable model name
 */
export function getDisplayName(modelId: string): string {
  const nameMap: Record<string, string> = {
    "local:helpful-v1": "Local Mock (Helpful)",
    "local:terse-v1": "Local Mock (Terse)",
    "local:verbose-v1": "Local Mock (Verbose)",
    "local:error-prone-v1": "Local Mock (Error-Prone)",

    "openai:gpt-4": "GPT-4",
    "openai:gpt-4-turbo-preview": "GPT-4 Turbo",
    "openai:gpt-3.5-turbo": "GPT-3.5 Turbo",

    "anthropic:claude-3-opus-20240229": "Claude 3 Opus",
    "anthropic:claude-3-sonnet-20240229": "Claude 3 Sonnet",
    "anthropic:claude-3-5-sonnet-20240620": "Claude 3.5 Sonnet",
    "anthropic:claude-3-haiku-20240307": "Claude 3 Haiku",
    "anthropic:claude-2.1": "Claude 2.1",

    "google:gemini-pro": "Gemini Pro",
    "google:gemini-1.5-pro": "Gemini 1.5 Pro",
    "google:gemini-1.5-flash": "Gemini 1.5 Flash",
    "google:gemini-pro-vision": "Gemini Pro Vision",
  };

  return nameMap[modelId] || modelId;
}
