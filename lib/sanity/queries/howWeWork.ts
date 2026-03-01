import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";

type HowWeWorkRecord = {
	intro?: unknown;
	steps?: unknown;
	deliveryModel?: unknown;
	partnerships?: unknown;
};

export type HowWeWorkStep = {
	title: string;
	description: string;
};

export type HowWeWork = {
	intro: string;
	steps: HowWeWorkStep[];
	deliveryModel: string;
	partnerships: string;
};

const HOW_WE_WORK_QUERY = `
*[_type == "howWeWork"][0]{
  intro,
  "steps": coalesce(steps, [])[]{
    title,
    description
  },
  deliveryModel,
  partnerships
}
`;

function normalizeString(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

function normalizeSteps(value: unknown): HowWeWorkStep[] {
	if (!Array.isArray(value)) return [];

	const steps: HowWeWorkStep[] = [];
	for (const item of value) {
		if (!item || typeof item !== "object") continue;
		const record = item as Record<string, unknown>;
		const title = normalizeString(record.title);
		if (!title) continue;
		steps.push({
			title,
			description: normalizeString(record.description),
		});
	}
	return steps;
}

/**
 * Fetches the first document of type `howWeWork`.
 * Returns null when the document does not exist or Sanity is not configured.
 */
export const getHowWeWork = async (): Promise<HowWeWork | null> => {
	// sanityClient is always defined

	const result = await sanityFetch<HowWeWorkRecord | null>(HOW_WE_WORK_QUERY, undefined, {});

	if (!result) return null;

	const intro = normalizeString(result.intro);
	if (!intro) return null;

	return {
		intro,
		steps: normalizeSteps(result.steps),
		deliveryModel: normalizeString(result.deliveryModel),
		partnerships: normalizeString(result.partnerships),
	};
};
