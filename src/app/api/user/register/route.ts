import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import connectToDatabase from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const client = await connectToDatabase();
    const db = client.db();
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    const hashed = await hash(password, 10);
    const result = await db
      .collection("users")
      .insertOne({ name, email, password: hashed });
    return NextResponse.json({ success: true, userId: result.insertedId });
  } catch (err: any) {
    console.error("/api/user/register error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
