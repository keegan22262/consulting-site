import sql from "@/lib/db";
import { success, error } from "@/lib/server/apiResponse";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return error("Service unavailable.", 503);
  }
  try {
    const rows = await sql`SELECT id, name, email, phone, message, created_at, status FROM contact_submissions ORDER BY created_at DESC`;
    return success(rows);
  } catch (e) {
    console.error("DB error:", e);
    return error("Internal server error.", 500);
  }
}
