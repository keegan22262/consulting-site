// PROTECTED ROUTE - requires ADMIN_SECRET header.
export const runtime = "nodejs";

export async function GET() {
  return new Response(null, { status: 404 });
}
