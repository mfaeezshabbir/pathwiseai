import { NextRequest, NextResponse } from "next/server";
import { generateProjectIdeas } from "@/ai/flows/generate-project-ideas";
import { getUserId } from "@/lib/auth";
import { aiErrorResponse, hasAIKey } from "@/lib/ai-errors";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAIKey()) return aiErrorResponse(new Error("missing api key"));
  try {
    const body = await req.json();
    const result = await generateProjectIdeas({
      skills: Array.isArray(body?.skills) ? body.skills.map(String) : [],
      roadmapName: String(body?.roadmapName ?? ""),
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/ai/project-ideas error:", err);
    return aiErrorResponse(err);
  }
}
