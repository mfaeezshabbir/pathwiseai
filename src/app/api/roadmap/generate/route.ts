import { NextRequest, NextResponse } from "next/server";
import { generateRoadmap } from "@/ai/flows/generate-roadmap";
import { getUserId } from "@/lib/auth";
import { aiErrorResponse, hasAIKey } from "@/lib/ai-errors";

// Roadmap generation can take a while for large skills
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasAIKey()) return aiErrorResponse(new Error("missing api key"));
  try {
    const body = await req.json();
    if (typeof body?.desiredSkill !== "string" || !body.desiredSkill.trim()) {
      return NextResponse.json({ error: "Missing skill" }, { status: 400 });
    }
    const roadmap = await generateRoadmap({
      desiredSkill: body.desiredSkill.trim().slice(0, 120),
      knowledgeLevel: String(body.knowledgeLevel ?? "beginner"),
      availableTime: String(body.availableTime ?? "4-6 hours"),
      learningStyle: body.learningStyle ? String(body.learningStyle) : undefined,
      specificGoals: body.specificGoals
        ? String(body.specificGoals).slice(0, 500)
        : undefined,
    });
    return NextResponse.json(roadmap);
  } catch (err) {
    console.error("/api/roadmap/generate error:", err);
    return aiErrorResponse(err);
  }
}
