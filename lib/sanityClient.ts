import "server-only";

import { createClient } from "@sanity/client";
import type { FilteredResponseQueryOptions, QueryParams, SanityClient } from "@sanity/client";

// Server-only Sanity client
//
// Usage rules:
// - Do not import this module from Client Components (files with "use client").
// - Safe to import from Server Components, Route Handlers, and server utilities.
// - Environment variables are read at runtime on the server via process.env.
// - Missing SANITY_* variables MUST NOT crash the app at module load.
//   We only throw when a Sanity query is executed.

type SanityConfig = {
	projectId: string;
	dataset: string;
	apiVersion: string;
};

function getSanityConfig(): SanityConfig | null {
	const projectId = process.env.SANITY_PROJECT_ID;
	const dataset = process.env.SANITY_DATASET;
	const apiVersion = process.env.SANITY_API_VERSION;

	if (!projectId || !dataset || !apiVersion) return null;
	return { projectId, dataset, apiVersion };
}

// We expose a single configured client instance when the environment is configured.
// If not configured, the client is null and sanityFetch() will throw when called.
export const sanityClient: SanityClient | null = (() => {
	const config = getSanityConfig();
	if (!config) return null;

	if (process.env.SANITY_DEBUG === "true") {
		console.log("Sanity config", { projectId: config.projectId, dataset: config.dataset });
	}

	return createClient({
		projectId: config.projectId,
		dataset: config.dataset,
		apiVersion: config.apiVersion,
		useCdn: true,
	});
})();

export async function sanityFetch<T>(
	query: string,
	params: QueryParams = {},
	options?: FilteredResponseQueryOptions
): Promise<T> {
	if (!sanityClient) {
		const missing = [
			!process.env.SANITY_PROJECT_ID ? "SANITY_PROJECT_ID" : null,
			!process.env.SANITY_DATASET ? "SANITY_DATASET" : null,
			!process.env.SANITY_API_VERSION ? "SANITY_API_VERSION" : null,
		].filter(Boolean);

		throw new Error(
			`Sanity client is not configured. Missing environment variables: ${missing.join(
				", "
			)}.`
		);
	}

	return sanityClient.fetch<T>(query, params, options);
}
