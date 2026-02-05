import "server-only";

import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";

type PortableTextBlock = { _type: string } & Record<string, unknown>;

type HowWeWorkRecord = {
	title?: unknown;
	intro?: unknown;
	principles?: unknown;
};

export type HowWeWorkPrinciple = {
	title: string;
	description: string;
};

export type HowWeWork = {
	title: string;
	intro: PortableTextBlock[];
	principles: HowWeWorkPrinciple[];
};

const HOW_WE_WORK_QUERY = `
*[_type == "howWeWork"][0]{
  title,
  intro,
  "principles": coalesce(principles, [])[]{
    title,
    description
  }
}
`;

function normalizeString(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function normalizePortableText(value: unknown): PortableTextBlock[] {
	return Array.isArray(value) ? (value as PortableTextBlock[]) : [];
}

function normalizePrinciples(value: unknown): HowWeWorkPrinciple[] {
	if (!Array.isArray(value)) return [];

	const principles: HowWeWorkPrinciple[] = [];
	for (const item of value) {
		if (!item || typeof item !== "object") continue;
		const record = item as Record<string, unknown>;
		const title = normalizeString(record.title);
		if (!title) continue;
		principles.push({
			title,
			description: normalizeString(record.description),
		});
	}
	return principles;
}

/**
 * Fetches the first document of type `howWeWork`.
 * Returns null when the document does not exist or Sanity is not configured.
 */
export const getHowWeWork = cache(async (): Promise<HowWeWork | null> => {
	if (!sanityClient) return null;

	const result = await sanityFetch<HowWeWorkRecord | null>(HOW_WE_WORK_QUERY, undefined, {
		revalidate: 3600,
		tags: ["sanity:howWeWork"],
	});

	if (!result) return null;

	const title = normalizeString(result.title);
	if (!title) return null;

	return {
		title,
		intro: normalizePortableText(result.intro),
		principles: normalizePrinciples(result.principles),
	};
});
