import { NextResponse } from "next/server";

export type AIErrorCode =
  | "AI_NOT_CONFIGURED"
  | "AI_RATE_LIMITED"
  | "AI_UNAVAILABLE"
  | "AI_FAILED";

export type AIErrorBody = { error: string; code: AIErrorCode };

export function hasAIKey() {
  return Boolean(
    process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENAI_API_KEY,
  );
}

/** Classify a Genkit/Gemini failure into a message a user can act on. */
export function classifyAIError(err: unknown): AIErrorBody & { status: number } {
  const text = String((err as { message?: string })?.message ?? err).toLowerCase();

  if (!hasAIKey() || /api key|api_key|permission_denied|unauthenticated/.test(text)) {
    return {
      status: 503,
      code: "AI_NOT_CONFIGURED",
      error: "AI generation isn't set up yet. Add a valid GEMINI_API_KEY to .env and restart the server.",
    };
  }
  if (/429|quota|rate limit|resource_exhausted/.test(text)) {
    return {
      status: 429,
      code: "AI_RATE_LIMITED",
      error: "The AI is getting too many requests right now. Wait a minute and try again.",
    };
  }
  if (/503|unavailable|overloaded|timeout|deadline|fetch failed|econn/.test(text)) {
    return {
      status: 503,
      code: "AI_UNAVAILABLE",
      error: "The AI service is temporarily unavailable. Please try again shortly.",
    };
  }
  return {
    status: 500,
    code: "AI_FAILED",
    error: "The AI couldn't produce a usable result. Try again, or rephrase your request.",
  };
}

export function aiErrorResponse(err: unknown) {
  const { status, ...body } = classifyAIError(err);
  return NextResponse.json(body, { status });
}
