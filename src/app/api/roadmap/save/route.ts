import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const uri = process.env.MONGODB_URI!;
  if (!uri) {
    return NextResponse.json({ error: "MONGODB_URI not set" }, { status: 500 });
  }
  const client = new MongoClient(uri);

  const body = await req.json();
  const { roadmap, moduleProjects } = body;
  if (!roadmap) {
    return NextResponse.json({ error: "Missing roadmap" }, { status: 400 });
  }

  // Validate session via next-auth JWT
  // Avoid calling getToken when request headers are absent (Next's page-data collection can call routes without headers)
  const hasAuthHeader =
    typeof (req as any).headers?.get === "function" &&
    ((req as any).headers.get("authorization") ||
      (req as any).headers.get("cookie"));
  if (!hasAuthHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let token;
  try {
    token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  } catch (err) {
    console.error("/api/roadmap/save getToken error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
  const uri = process.env.MONGODB_URI!;
  if (!uri) {
    return NextResponse.json({ error: "MONGODB_URI not set" }, { status: 500 });
  }
  const client = new MongoClient(uri);

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
