import { success, error } from "@/lib/server/apiResponse";
import { getAllInsights } from "@/lib/sanity/insights";

export const runtime = "nodejs";

export async function GET() {
  try {
    const raw = await getAllInsights();
    const data = raw.map((item) => ({
      slug: item.slug,
      category: item.category ?? "Insight",
      title: item.title,
      excerpt: item.summary,
      industry: item.domain,
    }));
    return success(data);
  } catch {
    return error("Failed to fetch insights", 500);
  }
}
