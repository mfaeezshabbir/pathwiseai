import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/mongodb";

async function withDb<T>(fn: (db: any) => Promise<T>) {
  const client = await connectToDatabase();
  const db = client.db();
  return await fn(db);
}

export async function POST(req: NextRequest) {
  const { userId, projectIdeas, moduleTitle, skills } = await req.json();
  if (!userId || !projectIdeas || !moduleTitle) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    const result = await withDb(async (db) =>
      db.collection("projectIdeas").insertOne({
        userId: new ObjectId(userId),
        projectIdeas,
        moduleTitle,
        skills,
        createdAt: new Date(),
      }),
    );
    return NextResponse.json({
      success: true,
      projectIdeasId: result.insertedId,
    });
  } catch (err: any) {
    console.error("/api/project/save POST error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  try {
    const ideas = await withDb(async (db) =>
      db
        .collection("projectIdeas")
        .find({ userId: new ObjectId(userId) })
        .toArray(),
    );
    return NextResponse.json({ ideas });
  } catch (err: any) {
    console.error("/api/project/save GET error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
