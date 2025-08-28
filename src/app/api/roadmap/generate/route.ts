import { NextResponse } from "next/server";
import { generateRoadmap } from "@/ai/flows/generate-roadmap";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const roadmap = await generateRoadmap(body);
    return NextResponse.json(roadmap);
  } catch (err: any) {
    console.error("/api/roadmap/generate error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
