import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Resolve the signed-in user's id from the next-auth JWT cookie.
 * Returns null when there is no valid session.
 */
export async function getUserId(req: NextRequest): Promise<string | null> {
  if (!process.env.NEXTAUTH_SECRET) {
    console.error("Missing NEXTAUTH_SECRET");
    return null;
  }
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const id = (token as { id?: string; sub?: string } | null)?.id ?? token?.sub;
    return id ? String(id) : null;
  } catch (err) {
    console.error("getToken error:", err);
    return null;
  }
}
