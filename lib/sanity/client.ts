import "server-only";

import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION;

/**
 * Server-only Sanity client for the Next.js App Router frontend.
 *
 * - Reads configuration from server environment variables.
 * - Does not include queries or any browser-safe exposure.
 * - If env vars are missing, the client is still constructed but will fail when used.
 *   (Keep fetch-layer code responsible for validating config and handling fallback.)
 */
export const sanityClient = createClient({
	projectId: projectId || "",
	dataset: dataset || "",
	apiVersion: apiVersion || "",
	useCdn: process.env.NODE_ENV === "production",
});
