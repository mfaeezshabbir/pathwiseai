import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/mongodb";
import { getUserId } from "@/lib/auth";

async function getContext(req: NextRequest) {
  if (!process.env.MONGODB_URI) {
    return {
      error: NextResponse.json(
        { error: "MONGODB_URI not configured" },
        { status: 500 },
      ),
    };
  }
  const userId = await getUserId(req);
  if (!userId || !ObjectId.isValid(userId)) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  const client = await connectToDatabase();
  return { error: null, db: client.db(), userId: new ObjectId(userId) };
}

export async function GET(req: NextRequest) {
  try {
    const ctx = await getContext(req);
    if (ctx.error) return ctx.error;
    const { db, userId } = ctx;

    const user = await db
      .collection("users")
      .findOne({ _id: userId }, { projection: { password: 0 } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const [roadmaps, projectIdeas] = await Promise.all([
      db
        .collection("roadmaps")
        .find({ userId })
        .sort({ updatedAt: -1, createdAt: -1 })
        .toArray(),
      db
        .collection("projectIdeas")
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray(),
    ]);

    const userProfile = {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl ?? null,
      createdAt: user.createdAt ?? null,
      roadmaps: roadmaps.map((r) => ({ ...r, _id: String(r._id) })),
      skills: user.skills || [],
      projects: user.projects || [],
      projectIdeas: projectIdeas.map((p) => ({ ...p, _id: String(p._id) })),
    };
    return NextResponse.json({ userProfile });
  } catch (err) {
    console.error("/api/user/profile GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/** Update editable profile fields (currently just the display name). */
export async function PATCH(req: NextRequest) {
  try {
    const ctx = await getContext(req);
    if (ctx.error) return ctx.error;
    const { name } = await req.json();
    const trimmed = typeof name === "string" ? name.trim() : "";
    if (trimmed.length < 2 || trimmed.length > 80) {
      return NextResponse.json(
        { error: "Name must be between 2 and 80 characters" },
        { status: 400 },
      );
    }
    await ctx.db
      .collection("users")
      .updateOne({ _id: ctx.userId }, { $set: { name: trimmed } });
    return NextResponse.json({ success: true, name: trimmed });
  } catch (err) {
    console.error("/api/user/profile PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
