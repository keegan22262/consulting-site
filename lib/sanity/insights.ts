import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { isNextDynamicServerUsageError } from "@/lib/sanity/nextErrors";
import {
	INSIGHTS_LISTING_QUERY,
	LATEST_PUBLISHED_INSIGHTS_QUERY,
	PUBLISHED_INSIGHT_BY_SLUG_EXPANDED_QUERY,
} from "@/lib/sanity/queries";

export type InsightListItem = {
	title: string;
	slug: string;
	category?: string;
	summary?: string;
	excerpt?: string;
	date?: string;
	publishedAt?: string;
	mainImage?: string;
	documentType?: string;
	domain?: string;
	readingTime?: string;
	sourceUrl?: string;
};

type PortableTextBlock = Record<string, unknown>;

export type RelatedService = {
	title: string;
	slug: string;
	summary?: string;
	category?: string;
};

export type InsightDetail = {
	title: string;
	category?: string;
	date?: string;
	content?: PortableTextBlock[];
	relatedServices?: RelatedService[];
};

type PublishedInsightRecord = {
	title?: string;
	slug?: string;
	excerpt?: string;
	body?: PortableTextBlock[];
	publishDate?: string;
	themeTitle?: string;
	publishedAt?: string;
	category?: string;
	mainImage?: string;
	readingTime?: string;
	sourceUrl?: string;
	relatedServices?: PublishedRelatedServiceRecord[];
};

type PublishedRelatedServiceRecord = {
	title?: string;
	slug?: string;
	summary?: string;
	domain?: string;
	status?: string;
};

function mapRelatedServices(records: PublishedRelatedServiceRecord[] | undefined): RelatedService[] | undefined {
	if (!Array.isArray(records)) return undefined;
	const items = records
		.filter((item) => Boolean(item?.slug))
		.map((item) => ({
			title: item.title ?? "",
			slug: item.slug ?? "",
			summary: item.summary ?? "",
			category: item.domain ?? "",
		}));

	return items.length > 0 ? items : undefined;
}

export const getAllInsights = async (): Promise<InsightListItem[]> => {
	// sanityClient is always defined

	try {
		const result = await sanityFetch<PublishedInsightRecord[]>(INSIGHTS_LISTING_QUERY, {}, {});

		return Array.isArray(result)
			? result
					.filter((item) => Boolean(item?.slug))
					.map((item) => ({
						title: item.title ?? "",
						slug: item.slug ?? "",
						summary: item.excerpt ?? "",
						excerpt: item.excerpt ?? "",
						category: item.category ?? "",
						date: item.publishedAt ?? "",
						publishedAt: item.publishedAt ?? "",
						mainImage: item.mainImage ?? "",
						readingTime: item.readingTime ?? "",
						sourceUrl: item.sourceUrl ?? "",
					}))
			: [];
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getAllInsights failed", { error });
		}
		return [];
	}
};

export const getLatestInsights = async (limit: number): Promise<InsightListItem[]> => {
	const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.min(50, Math.floor(limit))) : 0;
	if (safeLimit === 0) return [];
	// sanityClient is always defined

	try {
		const result = await sanityFetch<PublishedInsightRecord[]>(
			LATEST_PUBLISHED_INSIGHTS_QUERY,
			{ limit: safeLimit },
			{}
		);

		return Array.isArray(result)
			? result
					.filter((item) => Boolean(item?.slug))
					.map((item) => ({
						title: item.title ?? "",
						slug: item.slug ?? "",
						summary: item.excerpt ?? "",
						category: item.category ?? item.themeTitle ?? "",
						date: item.publishedAt ?? item.publishDate ?? "",
					}))
			: [];
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getLatestInsights failed", { limit: safeLimit, error });
		}
		return [];
	}
};

export const getInsightBySlug = async (slug: string): Promise<InsightDetail | null> => {
	if (!slug) return null;
	// sanityClient is always defined

	try {
		const result = await sanityFetch<PublishedInsightRecord | null>(
			PUBLISHED_INSIGHT_BY_SLUG_EXPANDED_QUERY,
			{ slug },
			{}
		);

		if (!result?.title || !result.slug) return null;

		return {
			title: result.title,
			category: result.themeTitle,
			date: result.publishDate,
			content: result.body,
			relatedServices: mapRelatedServices(result.relatedServices) ?? [],
		};
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getInsightBySlug failed", { slug, error });
		}
		return null;
	}
};
