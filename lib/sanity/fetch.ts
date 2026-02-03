import "server-only";

import { sanityClient } from "@/lib/sanity/client";

export type SanityFetchOptions = {
	/**
	 * Next.js ISR revalidation window (seconds).
	 * Keep modest for predictable freshness and performance.
	 */
	revalidate?: number;
	/** Optional Next.js cache tags for targeted invalidation later. */
	tags?: string[];
	/** Override default caching behavior (rarely needed). */
	cache?: RequestCache;
};

const DEFAULT_REVALIDATE_SECONDS = 300; // 5 minutes

function normalizeRevalidateSeconds(value: number | undefined): number {
	if (typeof value !== "number" || !Number.isFinite(value)) return DEFAULT_REVALIDATE_SECONDS;
	return Math.max(0, Math.min(3600, Math.floor(value)));
}

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
	const revalidate = normalizeRevalidateSeconds(options?.revalidate);

	// Keep caching predictable:
	// - In production: cache with ISR revalidation (default 5 minutes)
	// - In dev/test: avoid long-lived caches so edits show up immediately
	const isProd = process.env.NODE_ENV === "production";
	const cache: RequestCache =
		options?.cache ?? (isProd ? "force-cache" : "no-store");

	const fetchOptions = {
		cache,
		next: isProd ? { revalidate, tags: options?.tags } : undefined,
	};

	// We intentionally keep the wrapper thin; callers handle "not found" semantics.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return sanityClient.fetch<T>(query, (params ?? {}) as any, fetchOptions as any);
}
