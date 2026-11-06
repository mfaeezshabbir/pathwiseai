import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/mongodb";
import { getUserId } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI not set" }, { status: 500 });
  }

  const userId = await getUserId(req);
  if (!userId || !ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { roadmap, preferences } = await req.json();
  if (!roadmap || !Array.isArray(roadmap.categories)) {
    return NextResponse.json({ error: "Missing roadmap" }, { status: 400 });
  }

  try {
    const client = await connectToDatabase();
    const now = new Date();
    const roadmapDoc = {
      ...roadmap,
      userId: new ObjectId(userId),
      preferences: preferences ?? null,
      progress: {},
      progressPercent: 0,
      createdAt: now,
      updatedAt: now,
    };
    const result = await client.db().collection("roadmaps").insertOne(roadmapDoc);
    return NextResponse.json({
      success: true,
      roadmap: {
        ...roadmapDoc,
        _id: String(result.insertedId),
        userId,
      },
    });
  } catch (err) {
    console.error("/api/roadmap/save POST error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

/** List the signed-in user's roadmaps, newest first. */
export async function GET(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: "MONGODB_URI not set" }, { status: 500 });
  }

  const userId = await getUserId(req);
  if (!userId || !ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await connectToDatabase();
    const docs = await client
      .db()
      .collection("roadmaps")
      .find({ userId: new ObjectId(userId) })
      .sort({ updatedAt: -1, createdAt: -1 })
      .toArray();
    const roadmaps = docs.map((d) => ({
      ...d,
      _id: String(d._id),
      userId: String(d.userId),
    }));
    return NextResponse.json({ roadmaps });
  } catch (err) {
    console.error("/api/roadmap/save GET error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
