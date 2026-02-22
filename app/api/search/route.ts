import { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { searchAll } from "@/lib/sanity/search";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip, 10, 5 * 60 * 1000)) {
      return Response.json(
        { success: false, error: "Too many requests." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const query = (body?.q ?? "").trim();

    if (!query || query.length < 2 || query.length > 100) {
      return Response.json(
        { success: false, error: "Invalid search query." },
        { status: 400 }
      );
    }

    const results = await searchAll(query);

    return Response.json({ success: true, results });
  } catch {
    return Response.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
