"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { tutorReply } from "@/lib/ai/generate";
import type { ChatTurn, TutorReply } from "@/lib/ai/schemas";
import { classifyAIError, hasAIKey } from "@/lib/ai-errors";

const MAX_TURNS = 12;
const MAX_CHARS = 4000;

/**
 * Ask the tutor. Errors come back as a normal reply because Server Action
 * errors are masked in production builds.
 */
export async function askTutor(history: ChatTurn[]): Promise<TutorReply> {
  if (!(await getServerSession(authOptions))) {
    return { answer: "Please sign in to use the assistant.", suggestions: [] };
  }
  if (!hasAIKey()) {
    return { answer: classifyAIError().error, suggestions: [] };
  }

  const turns = history
    .filter((t) => (t.role === "user" || t.role === "assistant") && t.content?.trim())
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, content: String(t.content).slice(0, MAX_CHARS) }));
  if (turns.at(-1)?.role !== "user") {
    return { answer: "Ask me a question to get started.", suggestions: [] };
  }

  try {
    return await tutorReply(turns);
  } catch (err) {
    console.error("askTutor error:", err);
    return { answer: classifyAIError(err).error, suggestions: [] };
  }
}
