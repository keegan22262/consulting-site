import "server-only";

import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";

type SanityConfig = {
	projectId: string;
	dataset: string;
	apiVersion: string;
};

function readEnv(name: string): string {
	return (process.env[name] || "").trim();
}

function getSanityConfig(): SanityConfig | null {
	const projectId = readEnv("SANITY_PROJECT_ID");
	const dataset = readEnv("SANITY_DATASET");
	const apiVersion = readEnv("SANITY_API_VERSION");

	if (!projectId || !dataset || !apiVersion) return null;
	return { projectId, dataset, apiVersion };
}

let hasWarned = false;

function warnIfMissingConfig() {
	if (hasWarned) return;

	const missing = [
		!readEnv("SANITY_PROJECT_ID") ? "SANITY_PROJECT_ID" : null,
		!readEnv("SANITY_DATASET") ? "SANITY_DATASET" : null,
		!readEnv("SANITY_API_VERSION") ? "SANITY_API_VERSION" : null,
	].filter(Boolean);

	if (missing.length === 0) return;
	hasWarned = true;
	console.warn(
		`Sanity client is not configured (missing env vars: ${missing.join(", ")}). Sanity queries will be skipped.`
	);
}

/**
 * Server-only Sanity client for the Next.js App Router frontend.
 *
 * - Reads configuration from server environment variables.
 * - Does not include queries or any browser-safe exposure.
 * - If env vars are missing, the client is null and fetch-layer code must handle fallback.
 */
export const sanityClient: SanityClient | null = (() => {
	const config = getSanityConfig();
	if (!config) {
		warnIfMissingConfig();
		return null;
	}

	return createClient({
		projectId: config.projectId,
		dataset: config.dataset,
		apiVersion: config.apiVersion,
		useCdn: process.env.NODE_ENV === "production",
	});
})();
