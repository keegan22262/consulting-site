
import "server-only";
import { sanityClient } from "@/lib/sanity/client";

export type SanityFetchOptions = {
  /**
   * Optionally override the default revalidation interval (in seconds).
   */
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
};

/**
 * Centralized fetch wrapper for Sanity queries with ISR support.
 *
 * NOTE: `@sanity/client` ultimately uses `fetch()` under the hood. Passing `next` options
 * here allows Next.js App Router to cache and revalidate responses.
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options?: SanityFetchOptions
): Promise<T> {
  // sanityClient is always defined
  // Default to ISR with 5-minute revalidation unless overridden.
  const revalidate = typeof options?.revalidate === "number" ? options.revalidate : 300;
  const fetchOptions = { next: { revalidate } };

  // We intentionally keep the wrapper thin; callers handle "not found" semantics.
  return sanityClient.fetch<T>(query, (params ?? {}) as Record<string, unknown>, fetchOptions as Record<string, unknown>);
}
