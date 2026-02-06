import "server-only";

import { sanityClient } from "@/lib/sanity/client";

export type SanityFetchOptions = {
	/**
	 * Reserved for future use.
	 *
	 * This project intentionally disables Next.js fetch caching for Sanity queries
	 * to keep local and Vercel behavior aligned (always runtime/published content).
	 */
	revalidate?: number;
	tags?: string[];
	cache?: RequestCache;
};

/**
 * Fetch wrapper that enables production-safe Next.js caching/revalidation.
 *
 * NOTE: `@sanity/client` ultimately uses `fetch()` under the hood. Passing `cache/next`
 * options here allows Next.js App Router to cache and revalidate responses.
 */
export async function sanityFetch<T>(
	query: string,
	params?: Record<string, unknown>,
	options?: SanityFetchOptions
): Promise<T> {
	if (!sanityClient) {
		// Keep build/runtime safe when Sanity isn't configured.
		return null as unknown as T;
	}

	// Production alignment: always fetch Sanity content at runtime.
	// This prevents ISR/build-time caching from freezing CMS content on Vercel.
	const fetchOptions = { cache: "no-store" as const };

	// We intentionally keep the wrapper thin; callers handle "not found" semantics.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return sanityClient.fetch<T>(query, (params ?? {}) as any, fetchOptions as any);
}
