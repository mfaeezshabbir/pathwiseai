import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const { userId, projectIdeas, moduleTitle, skills } = await req.json();
  if (!userId || !projectIdeas || !moduleTitle) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  await client.connect();
  const db = client.db();
  const result = await db
    .collection("projectIdeas")
    .insertOne({
      userId: new ObjectId(userId),
      projectIdeas,
      moduleTitle,
      skills,
      createdAt: new Date(),
    });
  return NextResponse.json({
    success: true,
    projectIdeasId: result.insertedId,
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  await client.connect();
  const db = client.db();
  const ideas = await db
    .collection("projectIdeas")
    .find({ userId: new ObjectId(userId) })
    .toArray();
  return NextResponse.json({ ideas });
}
