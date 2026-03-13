import { error, success } from "@/lib/server/apiResponse";
import { getPublishedPageBySlug } from "@/lib/sanity/pages";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    if (!slug) return error("Missing page slug", 400);

    const page = await getPublishedPageBySlug(slug);
    return success(page);
  } catch {
    return error("Failed to fetch page", 500);
  }
}
