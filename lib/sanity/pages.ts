import "server-only";

import { cache } from "react";

import { sanityFetch } from "@/lib/sanity/fetch";
import { PUBLISHED_PAGE_BY_SLUG_QUERY } from "@/lib/sanity/queries";

type PortableTextBlock = Record<string, unknown>;

export type PublishedPage = {
	title: string;
	body: PortableTextBlock[];
};

export const getPublishedPageBySlug = cache(async (slug: string): Promise<PublishedPage | null> => {
	const normalizedSlug = slug?.trim();
	if (!normalizedSlug) return null;

	try {
		const result = await sanityFetch<PublishedPage | null>(
			PUBLISHED_PAGE_BY_SLUG_QUERY,
			{ slug: normalizedSlug },
			{
				revalidate: 1800,
				tags: ["sanity:pages", `sanity:page:${normalizedSlug}`],
			}
		);

		if (!result?.title) return null;
		if (!Array.isArray(result.body)) return null;

		return result;
	} catch (error) {
		console.error("Sanity getPageBySlug failed", { slug: normalizedSlug, error });
		return null;
	}
});

// Backward-compatible alias (older imports may still reference this name).
export const getPageBySlug = getPublishedPageBySlug;
