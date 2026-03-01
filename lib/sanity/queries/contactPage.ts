import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";

type ContactPageRecord = {
	title?: unknown;
	intro?: unknown;
	consultationNote?: unknown;
	contactMethod?: unknown;
};

export type ContactPage = {
	title: string;
	intro: string;
	consultationNote: string;
	contactMethod: string;
};

const CONTACT_PAGE_QUERY = `
*[_type == "contactPage"][0]{
  title,
  intro,
  consultationNote,
  contactMethod
}
`;

function normalizeString(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

/**
 * Fetches the first document of type `contactPage`.
 * Returns null when the document does not exist or Sanity is not configured.
 */
export const getContactPage = async (): Promise<ContactPage | null> => {
	// sanityClient is always defined

	const result = await sanityFetch<ContactPageRecord | null>(CONTACT_PAGE_QUERY, undefined, {});

	if (!result) return null;

	const title = normalizeString(result.title);
	if (!title) return null;

	return {
		title,
		intro: normalizeString(result.intro),
		consultationNote: normalizeString(result.consultationNote),
		contactMethod: normalizeString(result.contactMethod),
	};
};
