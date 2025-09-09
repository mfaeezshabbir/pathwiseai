import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  { params }: { params?: { id?: string } },
) {
  try {
    const id = params?.id;
    // basic guard against undefined/invalid id (ObjectId 24-hex chars)
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid or missing id" },
        { status: 400 },
      );
    }

    // Only call getToken when the request includes authorization headers/cookies.
    const hasAuthHeader =
      typeof req.headers?.get === "function" &&
      (req.headers.get("authorization") || req.headers.get("cookie"));
    if (!hasAuthHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let token;
    try {
      token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    } catch (err) {
      console.error("/api/roadmap/[id] getToken error:", err);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const tokenId = (token as any)?.id ?? (token as any)?.sub;
    if (!token || !tokenId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("Missing MONGODB_URI");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db();
      const roadmap = await db
        .collection("roadmaps")
        .findOne({ _id: new ObjectId(id) });

      if (!roadmap) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      const ownerId = (roadmap as any).userId?.toString?.() || null;
      if (ownerId !== String(tokenId)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      // convert _id to string for client
      (roadmap as any)._id = String((roadmap as any)._id);
      return NextResponse.json({ roadmap });
    } finally {
      await client.close().catch(() => {});
    }
  } catch (err: any) {
    console.error("/api/roadmap/[id] error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
