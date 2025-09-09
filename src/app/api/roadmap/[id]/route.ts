import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract id safely
    const id: string | null = typeof body?.id === "string" ? body.id : null;

    // Guard against undefined or invalid ObjectId
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid or missing id" },
        { status: 400 },
      );
    }

    // Ensure we have auth headers before calling getToken
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
      console.error("/api/roadmap/save getToken error:", err);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenId = (token as any)?.id ?? (token as any)?.sub;
    if (!token || !tokenId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uri = process.env.MONGODB_URI;
    if (!uri || typeof uri !== "string" || !uri.startsWith("mongodb")) {
      console.error("Missing or invalid MONGODB_URI");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db();

      // Example: update or insert roadmap document
      const result = await db
        .collection("roadmaps")
        .updateOne(
          { _id: new ObjectId(id), userId: String(tokenId) },
          { $set: { ...body, updatedAt: new Date() } },
          { upsert: true },
        );

      return NextResponse.json({ success: true, result });
    } finally {
      await client.close().catch(() => {});
    }
  } catch (err: any) {
    console.error("/api/roadmap/save error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
