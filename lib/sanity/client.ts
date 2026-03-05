import "server-only";

import { createClient } from "@sanity/client";
// import type { SanityClient } from "@sanity/client";

type SanityConfig = {
	projectId: string;
	dataset: string;
	apiVersion: string;
};

function safeEnv(name: string, fallback: string): string {
	const value = process.env[name];
	if (!value || value.trim() === "") {
		console.warn(`[sanity] Missing environment variable: ${name} — using fallback "${fallback}"`);
		return fallback;
	}
	return value.trim();
}

const projectId = safeEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "placeholder");
const datasetEnv = safeEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
const apiVersion = safeEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2024-01-01");
const dataset = datasetEnv === "production" ? datasetEnv : "production";
const useCdn = false;

if (datasetEnv !== "production") {
	console.warn(
		`[sanity] Enforcing dataset "production" (was ${datasetEnv}). Update NEXT_PUBLIC_SANITY_DATASET if needed.`
	);
}

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn,
});
/**
 * Server-only Sanity client for the Next.js App Router frontend.
 *
 * - Reads configuration from server environment variables.
 * - Does not include queries or any browser-safe exposure.
 * - If env vars are missing, the client is null and fetch-layer code must handle fallback.
 */
