import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserId } from "@/lib/auth";
import { computeProgress, type ProgressMap } from "@/lib/roadmap";

type Params = { params: Promise<{ id: string }> };

async function resolve(req: NextRequest, params: Params["params"]) {
  const { id } = await params;
  if (!id || !ObjectId.isValid(id)) {
    return { error: NextResponse.json({ error: "Invalid id" }, { status: 400 }) };
  }
  const userId = await getUserId(req);
  if (!userId || !ObjectId.isValid(userId)) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!process.env.MONGODB_URI) {
    return {
      error: NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      ),
    };
  }
  const client = await connectToDatabase();
  const filter = { _id: new ObjectId(id), userId: new ObjectId(userId) };
  return {
    error: null,
    collection: client.db().collection("roadmaps"),
    filter,
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const ctx = await resolve(req, params);
    if (ctx.error) return ctx.error;
    const doc = await ctx.collection.findOne(ctx.filter);
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      roadmap: { ...doc, _id: String(doc._id), userId: String(doc.userId) },
    });
  } catch (err) {
    console.error("GET /api/roadmap/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/** Persist resource completion state for a roadmap. */
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const ctx = await resolve(req, params);
    if (ctx.error) return ctx.error;

    const body = await req.json();
    const progress: ProgressMap = {};
    if (body?.progress && typeof body.progress === "object") {
      for (const [key, value] of Object.entries(body.progress)) {
        if (/^\d+-\d+-\d+$/.test(key) && value === true) progress[key] = true;
      }
    }

    const doc = await ctx.collection.findOne(ctx.filter, {
      projection: { categories: 1 },
    });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { percent } = computeProgress(
      { title: "", categories: doc.categories ?? [] },
      progress,
    );
    await ctx.collection.updateOne(ctx.filter, {
      $set: { progress, progressPercent: percent, updatedAt: new Date() },
    });
    return NextResponse.json({ success: true, progressPercent: percent });
  } catch (err) {
    console.error("PATCH /api/roadmap/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const ctx = await resolve(req, params);
    if (ctx.error) return ctx.error;
    const result = await ctx.collection.deleteOne(ctx.filter);
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/roadmap/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
