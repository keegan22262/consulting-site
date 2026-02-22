import { searchAll } from "@/lib/sanity/search";
import { success, error } from "@/lib/server/apiResponse";
import { checkRateLimit } from "@/lib/security/rateLimit";
import { NextRequest } from "next/server";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip, 10, 5 * 60 * 1000)) {
      return error("Too many requests.", 429);
    }

    const body = await request.json();
    const query = (body?.q ?? "").trim();

    if (!query || query.length < 2 || query.length > 100) {
      return error("Invalid search query.", 400);
    }

    const results = await searchAll(query);

    return success(results);
  } catch {
    return error("Internal server error.", 500);
  }
}
