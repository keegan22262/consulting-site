import { success, error } from "@/lib/server/apiResponse";
import { sanityClient } from "@/lib/sanity/client";
import { industriesQuery } from "@/lib/sanity/queries";

export const runtime = "nodejs";

type IndustryRecord = {
  title?: string;
  slug?: string;
  summary?: string;
};

export async function GET() {
  try {
    const raw = await sanityClient.fetch<IndustryRecord[]>(industriesQuery);
    const data = (raw ?? [])
      .filter((item): item is IndustryRecord & { slug: string; title: string } =>
        Boolean(item.slug && item.title)
      )
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        description: item.summary ?? "",
      }));

    return success(data);
  } catch {
    return error("Failed to fetch industries", 500);
  }
}
