import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
	SEARCH_PUBLISHED_INSIGHTS_QUERY,
	SEARCH_PUBLISHED_SERVICES_QUERY,
} from "@/lib/sanity/queries";
import type { InsightListItem } from "@/lib/sanity/insights";
import type { ServiceListItem } from "@/lib/sanity/services";

export type SearchServicesOptions = {
	domain?: string;
};

export type SearchInsightsOptions = {
	theme?: string;
};

type PublishedServiceSearchRecord = {
	title?: string;
	slug?: string;
	summary?: string;
	domain?: string;
};

type PublishedInsightSearchRecord = {
	title?: string;
	slug?: string;
	excerpt?: string;
	publishDate?: string;
	themeTitle?: string;
};

function normalizeTerm(term: string): string {
	return (term || "").trim();
}

function normalizeOptionalFilter(value: string | undefined): string | undefined {
	const normalized = (value || "").trim();
	return normalized.length > 0 ? normalized : undefined;
}

/**
 * Search published services by text (title + summary), optionally filtered by domain.
 * Returns an empty array when the term is empty or no matches exist.
 */
export async function searchServices(
	term: string,
	options?: SearchServicesOptions
): Promise<ServiceListItem[]> {
	const normalizedTerm = normalizeTerm(term);
	if (!normalizedTerm) return [];
	if (!sanityClient) return [];

	const domain = normalizeOptionalFilter(options?.domain);
	const params: Record<string, unknown> = { term: normalizedTerm };
	if (domain) params.domain = domain;

	try {
		const result = await sanityFetch<PublishedServiceSearchRecord[]>(
			SEARCH_PUBLISHED_SERVICES_QUERY,
			params,
			{
				revalidate: 300,
				tags: ["sanity:services", "sanity:search:services"],
			}
		);

		return Array.isArray(result)
			? result
					.filter((item) => Boolean(item?.slug))
					.map((item) => ({
						title: item.title ?? "",
						slug: item.slug ?? "",
						summary: item.summary ?? "",
						category: item.domain ?? "",
					}))
			: [];
	} catch (error) {
		console.error("Sanity searchServices failed", { term: normalizedTerm, domain, error });
		return [];
	}
}

/**
 * Search published insights by text (title + excerpt), optionally filtered by theme.
 * Returns an empty array when the term is empty or no matches exist.
 */
export async function searchInsights(
	term: string,
	options?: SearchInsightsOptions
): Promise<InsightListItem[]> {
	const normalizedTerm = normalizeTerm(term);
	if (!normalizedTerm) return [];
	if (!sanityClient) return [];

	const theme = normalizeOptionalFilter(options?.theme);
	const params: Record<string, unknown> = { term: normalizedTerm };
	if (theme) params.theme = theme;

	try {
		const result = await sanityFetch<PublishedInsightSearchRecord[]>(
			SEARCH_PUBLISHED_INSIGHTS_QUERY,
			params,
			{
				revalidate: 300,
				tags: ["sanity:insights", "sanity:search:insights"],
			}
		);

		return Array.isArray(result)
			? result
					.filter((item) => Boolean(item?.slug))
					.map((item) => ({
						title: item.title ?? "",
						slug: item.slug ?? "",
						summary: item.excerpt ?? "",
						category: item.themeTitle ?? "",
						date: item.publishDate ?? "",
					}))
			: [];
	} catch (error) {
		console.error("Sanity searchInsights failed", { term: normalizedTerm, theme, error });
		return [];
	}
}
