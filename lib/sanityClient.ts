import "server-only";

// Compatibility module.
//
// This project uses a single Sanity client configuration exported from:
// - `lib/sanity/client.ts`
// and a single fetch wrapper exported from:
// - `lib/sanity/fetch.ts`
//
// Keep this file as a thin re-export to avoid duplicate Sanity client instances.

export { sanityClient } from "@/lib/sanity/client";
export { sanityFetch } from "@/lib/sanity/fetch";
