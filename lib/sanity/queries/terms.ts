import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";

type PortableTextBlock = { _type: string } & Record<string, unknown>;

type TermsRecord = {
	title?: unknown;
	lastUpdated?: unknown;
	content?: unknown;
};

export type Terms = {
	title: string;
	lastUpdated: string;
	content: PortableTextBlock[];
};

const TERMS_QUERY = `
*[_type == "terms"][0]{
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
 * Fetches the first document of type `terms`.
 * Returns null when the document does not exist or Sanity is not configured.
 */
export const getTerms = async (): Promise<Terms | null> => {
	if (!sanityClient) return null;

	const result = await sanityFetch<TermsRecord | null>(TERMS_QUERY, undefined, {});

	if (!result) return null;

	const title = normalizeString(result.title);
	const lastUpdated = normalizeString(result.lastUpdated);
	const content = normalizePortableText(result.content);

	if (!title || !lastUpdated || content.length === 0) return null;

	return { title, lastUpdated, content };
};
