import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }
  await client.connect();
  const db = client.db();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const roadmaps = await db
    .collection("roadmaps")
    .find({ userId: user._id })
    .toArray();
  // You may want to add more fields as needed
  const userProfile = {
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl || "https://placehold.co/100x100.png",
    roadmaps,
    skills: user.skills || [],
    rank: user.rank || "Learner",
    activity: user.activity || [],
    projects: user.projects || [],
    achievements: user.achievements || [],
  };
  return NextResponse.json({ userProfile });
}
