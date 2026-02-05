import { searchAll } from "@/lib/sanity/search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSingle(value: string | null): string {
	return (value ?? "").trim();
}

function parseLimit(value: string | null): number {
	if (!value) return 20;
	const parsed = Number(value);
	if (!Number.isFinite(parsed)) return 20;
	return Math.max(1, Math.min(50, Math.floor(parsed)));
}

export async function GET(request: Request): Promise<Response> {
	try {
		const url = new URL(request.url);
		const q = getSingle(url.searchParams.get("q"));
		const limit = parseLimit(url.searchParams.get("limit"));

		if (!q) {
			return Response.json({ query: q, results: [] }, { status: 200 });
		}

		const results = await searchAll(q, { limit });
		return Response.json({ query: q, results }, { status: 200 });
	} catch (error) {
		console.error("GET /api/search failed", { error });
		return Response.json(
			{ query: "", results: [], error: "Internal server error" },
			{ status: 500 }
		);
	}
}
