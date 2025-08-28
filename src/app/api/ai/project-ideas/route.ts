import { NextResponse } from "next/server";
import { generateProjectIdeas } from "@/ai/flows/generate-project-ideas";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await generateProjectIdeas(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("/api/ai/project-ideas error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
