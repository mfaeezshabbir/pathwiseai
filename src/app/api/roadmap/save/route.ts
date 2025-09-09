import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { roadmap, moduleProjects } = body;
  if (!roadmap) {
    return NextResponse.json({ error: "Missing roadmap" }, { status: 400 });
  }

  // Validate session via next-auth JWT
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = token.id as string;

  await client.connect();
  const db = client.db();
  // Save roadmap with modules and optionally linked projects per module
  const roadmapDoc = {
    userId: new ObjectId(userId),
    ...roadmap,
    modules: roadmap.modules?.map((mod: any) => ({
      ...mod,
      linkedProjects: moduleProjects?.[mod.title] || [],
    })),
    createdAt: new Date(),
  };
  const result = await db.collection("roadmaps").insertOne(roadmapDoc);
  // Prepare saved roadmap for response (stringify ObjectIds)
  const savedRoadmap = {
    ...roadmapDoc,
    _id: String(result.insertedId),
    userId: String(roadmapDoc.userId),
  };
  return NextResponse.json({ success: true, roadmap: savedRoadmap });
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
