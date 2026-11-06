import { NextRequest, NextResponse } from "next/server";
import { generateProjectIdeas } from "@/lib/ai/generate";
import { ProjectIdeasInputSchema } from "@/lib/ai/schemas";
import { aiErrorResponse, hasAIKey } from "@/lib/ai-errors";
import { getUserId } from "@/lib/auth";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAIKey()) return aiErrorResponse();

  const parsed = ProjectIdeasInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    return NextResponse.json(await generateProjectIdeas(parsed.data));
  } catch (err) {
    console.error("/api/ai/project-ideas error:", err);
    return aiErrorResponse(err);
  }
}
