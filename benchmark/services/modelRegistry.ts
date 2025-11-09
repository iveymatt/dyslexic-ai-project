/**
 * Model Registry Service
 * Manages model configurations, metadata, and capabilities
 */

/**
 * Model metadata
 */
export interface ModelMetadata {
  modelId: string;
  displayName: string;
  provider: "openai" | "anthropic" | "google" | "local";
  family: string; // e.g., "gpt-4", "claude-3", "gemini"
  version: string;
  capabilities: {
    maxTokens: number;
    supportsVision: boolean;
    supportsFunctionCalling: boolean;
    contextWindow: number;
  };
  pricing: {
    inputPer1M: number; // USD per 1M input tokens
    outputPer1M: number; // USD per 1M output tokens
  };
  releaseDate?: string;
  notes?: string;
  tags: string[];
}

/**
 * Registry of all supported models
 */
export const MODEL_REGISTRY: ModelMetadata[] = [
  // Local/Mock Models
  {
    modelId: "local:helpful-v1",
    displayName: "Local Mock (Helpful)",
    provider: "local",
    family: "mock",
    version: "v1",
    capabilities: {
      maxTokens: 4096,
      supportsVision: false,
      supportsFunctionCalling: false,
      contextWindow: 8192,
    },
    pricing: {
      inputPer1M: 0.001,
      outputPer1M: 0.001,
    },
    notes: "Mock adapter for testing - generates helpful, well-structured responses",
    tags: ["test", "mock", "helpful"],
  },
  {
    modelId: "local:terse-v1",
    displayName: "Local Mock (Terse)",
    provider: "local",
    family: "mock",
    version: "v1",
    capabilities: {
      maxTokens: 4096,
      supportsVision: false,
      supportsFunctionCalling: false,
      contextWindow: 8192,
    },
    pricing: {
      inputPer1M: 0.001,
      outputPer1M: 0.001,
    },
    notes: "Mock adapter - generates terse, minimal responses (low readability)",
    tags: ["test", "mock", "terse"],
  },

  // OpenAI Models
  {
    modelId: "openai:gpt-4",
    displayName: "GPT-4",
    provider: "openai",
    family: "gpt-4",
    version: "gpt-4",
    capabilities: {
      maxTokens: 8192,
      supportsVision: false,
      supportsFunctionCalling: true,
      contextWindow: 8192,
    },
    pricing: {
      inputPer1M: 30.0,
      outputPer1M: 60.0,
    },
    releaseDate: "2023-03-14",
    tags: ["production", "high-quality", "expensive"],
  },
  {
    modelId: "openai:gpt-4-turbo-preview",
    displayName: "GPT-4 Turbo",
    provider: "openai",
    family: "gpt-4",
    version: "turbo",
    capabilities: {
      maxTokens: 4096,
      supportsVision: true,
      supportsFunctionCalling: true,
      contextWindow: 128000,
    },
    pricing: {
      inputPer1M: 10.0,
      outputPer1M: 30.0,
    },
    releaseDate: "2023-11-06",
    tags: ["production", "high-quality", "long-context"],
  },
  {
    modelId: "openai:gpt-3.5-turbo",
    displayName: "GPT-3.5 Turbo",
    provider: "openai",
    family: "gpt-3.5",
    version: "turbo",
    capabilities: {
      maxTokens: 4096,
      supportsVision: false,
      supportsFunctionCalling: true,
      contextWindow: 16385,
    },
    pricing: {
      inputPer1M: 0.5,
      outputPer1M: 1.5,
    },
    releaseDate: "2023-03-01",
    tags: ["production", "cost-effective", "fast"],
  },

  // Anthropic Models
  {
    modelId: "anthropic:claude-3-opus-20240229",
    displayName: "Claude 3 Opus",
    provider: "anthropic",
    family: "claude-3",
    version: "opus",
    capabilities: {
      maxTokens: 4096,
      supportsVision: true,
      supportsFunctionCalling: true,
      contextWindow: 200000,
    },
    pricing: {
      inputPer1M: 15.0,
      outputPer1M: 75.0,
    },
    releaseDate: "2024-02-29",
    tags: ["production", "high-quality", "long-context"],
  },
  {
    modelId: "anthropic:claude-3-sonnet-20240229",
    displayName: "Claude 3 Sonnet",
    provider: "anthropic",
    family: "claude-3",
    version: "sonnet",
    capabilities: {
      maxTokens: 4096,
      supportsVision: true,
      supportsFunctionCalling: true,
      contextWindow: 200000,
    },
    pricing: {
      inputPer1M: 3.0,
      outputPer1M: 15.0,
    },
    releaseDate: "2024-02-29",
    tags: ["production", "balanced", "long-context"],
  },
  {
    modelId: "anthropic:claude-3-5-sonnet-20240620",
    displayName: "Claude 3.5 Sonnet",
    provider: "anthropic",
    family: "claude-3",
    version: "sonnet-3.5",
    capabilities: {
      maxTokens: 4096,
      supportsVision: true,
      supportsFunctionCalling: true,
      contextWindow: 200000,
    },
    pricing: {
      inputPer1M: 3.0,
      outputPer1M: 15.0,
    },
    releaseDate: "2024-06-20",
    tags: ["production", "latest", "long-context"],
  },
  {
    modelId: "anthropic:claude-3-haiku-20240307",
    displayName: "Claude 3 Haiku",
    provider: "anthropic",
    family: "claude-3",
    version: "haiku",
    capabilities: {
      maxTokens: 4096,
      supportsVision: true,
      supportsFunctionCalling: true,
      contextWindow: 200000,
    },
    pricing: {
      inputPer1M: 0.25,
      outputPer1M: 1.25,
    },
    releaseDate: "2024-03-07",
    tags: ["production", "cost-effective", "fast"],
  },

  // Google Models
  {
    modelId: "google:gemini-pro",
    displayName: "Gemini Pro",
    provider: "google",
    family: "gemini",
    version: "1.0-pro",
    capabilities: {
      maxTokens: 2048,
      supportsVision: false,
      supportsFunctionCalling: true,
      contextWindow: 32000,
    },
    pricing: {
      inputPer1M: 0.5,
      outputPer1M: 1.5,
    },
    releaseDate: "2023-12-13",
    tags: ["production", "cost-effective"],
  },
  {
    modelId: "google:gemini-1.5-pro",
    displayName: "Gemini 1.5 Pro",
    provider: "google",
    family: "gemini",
    version: "1.5-pro",
    capabilities: {
      maxTokens: 8192,
      supportsVision: true,
      supportsFunctionCalling: true,
      contextWindow: 1000000,
    },
    pricing: {
      inputPer1M: 1.25,
      outputPer1M: 5.0,
    },
    releaseDate: "2024-05-14",
    tags: ["production", "long-context", "vision"],
  },
  {
    modelId: "google:gemini-1.5-flash",
    displayName: "Gemini 1.5 Flash",
    provider: "google",
    family: "gemini",
    version: "1.5-flash",
    capabilities: {
      maxTokens: 8192,
      supportsVision: true,
      supportsFunctionCalling: true,
      contextWindow: 1000000,
    },
    pricing: {
      inputPer1M: 0.075,
      outputPer1M: 0.3,
    },
    releaseDate: "2024-05-14",
    tags: ["production", "cost-effective", "fast"],
  },
];

/**
 * Get model metadata by ID
 */
export function getModelMetadata(modelId: string): ModelMetadata | undefined {
  return MODEL_REGISTRY.find((m) => m.modelId === modelId);
}

/**
 * Get all models by provider
 */
export function getModelsByProvider(
  provider: "openai" | "anthropic" | "google" | "local"
): ModelMetadata[] {
  return MODEL_REGISTRY.filter((m) => m.provider === provider);
}

/**
 * Get all models by family
 */
export function getModelsByFamily(family: string): ModelMetadata[] {
  return MODEL_REGISTRY.filter((m) => m.family === family);
}

/**
 * Get all models with a specific tag
 */
export function getModelsByTag(tag: string): ModelMetadata[] {
  return MODEL_REGISTRY.filter((m) => m.tags.includes(tag));
}

/**
 * Get cost-effective models (sorted by price)
 */
export function getCostEffectiveModels(): ModelMetadata[] {
  return [...MODEL_REGISTRY]
    .filter((m) => m.provider !== "local")
    .sort((a, b) => {
      const avgCostA = (a.pricing.inputPer1M + a.pricing.outputPer1M) / 2;
      const avgCostB = (b.pricing.inputPer1M + b.pricing.outputPer1M) / 2;
      return avgCostA - avgCostB;
    });
}

/**
 * Get models with vision support
 */
export function getVisionModels(): ModelMetadata[] {
  return MODEL_REGISTRY.filter((m) => m.capabilities.supportsVision);
}

/**
 * Get models with long context (>50k tokens)
 */
export function getLongContextModels(): ModelMetadata[] {
  return MODEL_REGISTRY.filter((m) => m.capabilities.contextWindow > 50000);
}

/**
 * Get all model IDs
 */
export function getAllModelIds(): string[] {
  return MODEL_REGISTRY.map((m) => m.modelId);
}

/**
 * Check if model ID is valid
 */
export function isValidModel(modelId: string): boolean {
  return MODEL_REGISTRY.some((m) => m.modelId === modelId);
}
