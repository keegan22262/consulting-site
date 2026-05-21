import pool from "@/lib/db";
import { success, error } from "@/lib/server/apiResponse";

export const runtime = "nodejs";

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return error("Service unavailable.", 503);
  }

  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, message, created_at, status FROM contact_submissions ORDER BY created_at DESC"
    );

    return success(result.rows);
  } catch {
    return error("Internal server error.", 500);
  }
}
