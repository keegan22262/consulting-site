import "server-only";

import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";

type PortableTextBlock = { _type: string } & Record<string, unknown>;

type PrivacyPolicyRecord = {
	title?: unknown;
	lastUpdated?: unknown;
	content?: unknown;
};

export type PrivacyPolicy = {
	title: string;
	lastUpdated: string;
	content: PortableTextBlock[];
};

const PRIVACY_POLICY_QUERY = `
*[_type == "privacyPolicy"][0]{
  title,
  lastUpdated,
  content
}
`;

function normalizeString(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function normalizePortableText(value: unknown): PortableTextBlock[] {
	return Array.isArray(value) ? (value as PortableTextBlock[]) : [];
}

/**
 * Fetches the first document of type `privacyPolicy`.
 * Returns null when the document does not exist or Sanity is not configured.
 */
export const getPrivacyPolicy = cache(async (): Promise<PrivacyPolicy | null> => {
	if (!sanityClient) return null;

	const result = await sanityFetch<PrivacyPolicyRecord | null>(
		PRIVACY_POLICY_QUERY,
		undefined,
		{ revalidate: 3600, tags: ["sanity:legal", "sanity:privacyPolicy"] }
	);

	if (!result) return null;

	const title = normalizeString(result.title);
	const lastUpdated = normalizeString(result.lastUpdated);
	const content = normalizePortableText(result.content);

	if (!title || !lastUpdated || content.length === 0) return null;

	return { title, lastUpdated, content };
});
