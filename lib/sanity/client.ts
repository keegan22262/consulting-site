import "server-only";

import { createClient } from "@sanity/client";
// import type { SanityClient } from "@sanity/client";

type SanityConfig = {
	projectId: string;
	dataset: string;
	apiVersion: string;
};



let hasWarned = false;




function requiredEnv(name: string): string {
	const value = process.env[name];
	if (!value || value.trim() === "") {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value.trim();
}

const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
});
/**
 * Server-only Sanity client for the Next.js App Router frontend.
 *
 * - Reads configuration from server environment variables.
 * - Does not include queries or any browser-safe exposure.
 * - If env vars are missing, the client is null and fetch-layer code must handle fallback.
 */
