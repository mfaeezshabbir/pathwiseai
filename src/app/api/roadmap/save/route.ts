import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const { userId, roadmap } = await req.json();
  if (!userId || !roadmap) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  await client.connect();
  const db = client.db();
  const result = await db
    .collection("roadmaps")
    .insertOne({ userId: new ObjectId(userId), ...roadmap });
  return NextResponse.json({ success: true, roadmapId: result.insertedId });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  await client.connect();
  const db = client.db();
  const roadmaps = await db
    .collection("roadmaps")
    .find({ userId: new ObjectId(userId) })
    .toArray();
  return NextResponse.json({ roadmaps });
}
