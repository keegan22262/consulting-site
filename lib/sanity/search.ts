import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { isNextDynamicServerUsageError } from "@/lib/sanity/nextErrors";
import {
	SEARCH_PUBLISHED_INSIGHTS_QUERY,
	SEARCH_PUBLISHED_SERVICES_QUERY,
	UNIFIED_SEARCH_QUERY,
} from "@/lib/sanity/queries";
import type { UnifiedSearchResult, UnifiedSearchResultType } from "@/lib/search/types";
import type { InsightListItem } from "@/lib/sanity/insights";
import type { ServiceListItem } from "@/lib/sanity/services";

export type SearchServicesOptions = {
	category?: string;
};

export type SearchInsightsOptions = {
	theme?: string;
};

export type UnifiedSearchOptions = {
	limit?: number;
};

export type { UnifiedSearchResult, UnifiedSearchResultType };

type PublishedServiceSearchRecord = {
	title?: string;
	slug?: string;
	summary?: string;
	category?: string;
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

function normalizeLimit(limit: number | undefined): number {
	if (typeof limit !== "number" || !Number.isFinite(limit)) return 20;
	return Math.max(1, Math.min(50, Math.floor(limit)));
}

function normalizeExcerpt(value: unknown): string {
	if (typeof value !== "string") return "";
	const trimmed = value.replace(/\s+/g, " ").trim();
	if (!trimmed) return "";
	return trimmed.length > 220 ? `${trimmed.slice(0, 220).trim()}…` : trimmed;
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

	const category = normalizeOptionalFilter(options?.category);
	const params: Record<string, unknown> = { term: normalizedTerm };
	if (category) params.category = category;

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
							category: item.category ?? "",
						}))
			: [];
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity searchServices failed", { term: normalizedTerm, category, error });
		}
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
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity searchInsights failed", { term: normalizedTerm, theme, error });
		}
		return [];
	}
}

type UnifiedSearchRecord = {
	type?: string;
	title?: string;
	slug?: string;
	excerpt?: string;
};

/**
 * Unified search across Pages, Services, and Insights.
 *
 * - Accepts a search string
 * - Matches against title/summary/excerpt and portable-text body
 * - Returns minimal fields for performance and easy extension
 */
export async function searchAll(
	term: string,
	options?: UnifiedSearchOptions
): Promise<UnifiedSearchResult[]> {
	const normalizedTerm = normalizeTerm(term);
	if (!normalizedTerm) return [];
	if (!sanityClient) return [];

	const limit = normalizeLimit(options?.limit);

	try {
		const result = await sanityFetch<UnifiedSearchRecord[]>(
			UNIFIED_SEARCH_QUERY,
			{ term: normalizedTerm, limit },
			{
				revalidate: 300,
				tags: ["sanity:search:unified"],
			}
		);

		if (!Array.isArray(result)) return [];

		return result
			.filter((item) => Boolean(item?.slug) && Boolean(item?.title) && Boolean(item?.type))
			.map((item) => ({
				type: item.type as UnifiedSearchResultType,
				title: item.title ?? "",
				slug: item.slug ?? "",
				excerpt: normalizeExcerpt(item.excerpt),
			}));
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity searchAll failed", { term: normalizedTerm, limit, error });
		}
		return [];
	}
}
