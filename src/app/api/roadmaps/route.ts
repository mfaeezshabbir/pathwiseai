import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("roadmaps");
  const userId = session.user.id ? new ObjectId(session.user.id) : undefined;
  const roadmaps = await collection.find({ userId }).toArray();
  return NextResponse.json(roadmaps);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("roadmaps");
  const userId = session.user.id ? new ObjectId(session.user.id) : undefined;
  const { title, description, steps } = await req.json();
  const roadmap = {
    userId,
    title,
    description,
    steps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await collection.insertOne(roadmap);
  return NextResponse.json(
    { ...roadmap, _id: result.insertedId },
    { status: 201 },
  );
}
