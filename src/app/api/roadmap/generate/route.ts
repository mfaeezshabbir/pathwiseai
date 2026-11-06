import { NextRequest, NextResponse } from "next/server";
import { generateRoadmap } from "@/lib/ai/generate";
import { RoadmapInputSchema } from "@/lib/ai/schemas";
import { aiErrorResponse, hasAIKey } from "@/lib/ai-errors";
import { getUserId } from "@/lib/auth";

// Roadmap generation can take a while for large skills
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAIKey()) return aiErrorResponse();

  const parsed = RoadmapInputSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a skill to learn (2-120 characters)." },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(await generateRoadmap(parsed.data));
  } catch (err) {
    console.error("/api/roadmap/generate error:", err);
    return aiErrorResponse(err);
  }
}
