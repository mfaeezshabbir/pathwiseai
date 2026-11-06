import "server-only";

import { createGoogle } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import type { LanguageModel } from "ai";

/**
 * Model selection, driven by env:
 *
 *   AI_PROVIDER=google (default)   -> Gemini via GEMINI_API_KEY
 *   AI_PROVIDER=openai-compatible  -> any OpenAI-compatible API
 *                                     (OpenCode Zen, OpenRouter, Ollama, ...)
 *                                     via AI_BASE_URL + AI_API_KEY
 *   AI_MODEL                        -> model id for the chosen provider
 */
type Provider = "google" | "openai-compatible";

const DEFAULT_GOOGLE_MODEL = "gemini-2.5-flash";

function provider(): Provider {
  return process.env.AI_PROVIDER === "openai-compatible"
    ? "openai-compatible"
    : "google";
}

function googleKey() {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_API_KEY
  );
}

/** True when the selected provider has the settings it needs. */
export function isAIConfigured() {
  if (provider() === "openai-compatible") {
    return Boolean(process.env.AI_BASE_URL && process.env.AI_MODEL);
  }
  return Boolean(googleKey());
}

let cached: LanguageModel | null = null;

export function getModel(): LanguageModel {
  if (cached) return cached;

  if (provider() === "openai-compatible") {
    cached = createOpenAICompatible({
      name: "custom",
      baseURL: process.env.AI_BASE_URL!,
      apiKey: process.env.AI_API_KEY,
      supportsStructuredOutputs: true,
    }).chatModel(process.env.AI_MODEL!);
    return cached;
  }

  // Accept the old Genkit-style id ("googleai/gemini-...") for compatibility
  const modelId = (process.env.AI_MODEL || process.env.GENKIT_MODEL || DEFAULT_GOOGLE_MODEL)
    .replace(/^googleai\//, "");
  cached = createGoogle({ apiKey: googleKey() })(modelId);
  return cached;
}
