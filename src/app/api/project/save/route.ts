import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/mongodb";
import { getUserId } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId || !ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { projectIdeas, moduleTitle, skills } = await req.json();
  if (!Array.isArray(projectIdeas) || !moduleTitle) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    const client = await connectToDatabase();
    const result = await client
      .db()
      .collection("projectIdeas")
      .insertOne({
        userId: new ObjectId(userId),
        projectIdeas,
        moduleTitle,
        skills: Array.isArray(skills) ? skills : [],
        createdAt: new Date(),
      });
    return NextResponse.json({
      success: true,
      projectIdeasId: result.insertedId,
    });
  } catch (err) {
    console.error("/api/project/save POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
