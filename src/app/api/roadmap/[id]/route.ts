import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const parts = pathname.split("/");
    const id = parts[parts.length - 1];
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    // Validate session
    let token;
    try {
      token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    } catch (err) {
      console.error("/api/roadmap/[id] getToken error:", err);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await client.connect();
    const db = client.db();
    const roadmap = await db
      .collection("roadmaps")
      .findOne({ _id: new ObjectId(id) });
    if (!roadmap)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Ensure ownership
    const ownerId = (roadmap as any).userId?.toString?.() || null;
    if (ownerId !== String(token.id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // convert _id to string for client
    (roadmap as any)._id = String((roadmap as any)._id);
    return NextResponse.json({ roadmap });
  } catch (err: any) {
    console.error("/api/roadmap/[id] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
