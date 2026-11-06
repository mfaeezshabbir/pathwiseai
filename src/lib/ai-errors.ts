import "server-only";

import { NextResponse } from "next/server";
import { APICallError, NoObjectGeneratedError } from "ai";
import { isAIConfigured } from "@/lib/ai/model";

export type AIErrorCode =
  | "AI_NOT_CONFIGURED"
  | "AI_RATE_LIMITED"
  | "AI_UNAVAILABLE"
  | "AI_FAILED";

export type AIErrorBody = { error: string; code: AIErrorCode };

export { isAIConfigured as hasAIKey };

const messages: Record<AIErrorCode, { status: number; error: string }> = {
  AI_NOT_CONFIGURED: {
    status: 503,
    error:
      "AI generation isn't set up yet. Add a valid GEMINI_API_KEY (or AI_PROVIDER settings) to .env and restart the server.",
  },
  AI_RATE_LIMITED: {
    status: 429,
    error:
      "The AI is getting too many requests right now. Wait a minute and try again.",
  },
  AI_UNAVAILABLE: {
    status: 503,
    error: "The AI service is temporarily unavailable. Please try again shortly.",
  },
  AI_FAILED: {
    status: 500,
    error:
      "The AI couldn't produce a usable result. Try again, or rephrase your request.",
  },
};

function codeFor(err: unknown): AIErrorCode {
  if (!isAIConfigured()) return "AI_NOT_CONFIGURED";
  if (NoObjectGeneratedError.isInstance(err)) return "AI_FAILED";
  if (APICallError.isInstance(err)) {
    const status = err.statusCode ?? 0;
    if (status === 400 && /api key/i.test(err.message)) return "AI_NOT_CONFIGURED";
    if (status === 401 || status === 403) return "AI_NOT_CONFIGURED";
    if (status === 429) return "AI_RATE_LIMITED";
    if (status >= 500 || status === 0) return "AI_UNAVAILABLE";
    return "AI_FAILED";
  }
  const text = String((err as { message?: string })?.message ?? err);
  if (/fetch failed|ECONN|ETIMEDOUT|timeout/i.test(text)) return "AI_UNAVAILABLE";
  return "AI_FAILED";
}

/** Classify an AI failure into a message a user can act on. */
export function classifyAIError(err?: unknown): AIErrorBody & { status: number } {
  const code = codeFor(err);
  return { code, ...messages[code] };
}

export function aiErrorResponse(err?: unknown) {
  const { status, ...body } = classifyAIError(err);
  return NextResponse.json(body, { status });
}
