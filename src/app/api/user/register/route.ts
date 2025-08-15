import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  await client.connect();
  const db = client.db();
  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  const hashed = await hash(password, 10);
  const result = await db
    .collection("users")
    .insertOne({ name, email, password: hashed });
  return NextResponse.json({ success: true, userId: result.insertedId });
}
