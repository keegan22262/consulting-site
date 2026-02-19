import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { isNextDynamicServerUsageError } from "@/lib/sanity/nextErrors";
import {
	PUBLISHED_INSIGHT_THEMES_QUERY,
	PUBLISHED_SERVICE_CATEGORIES_QUERY,
} from "@/lib/sanity/queries";

export type InsightThemeOption = {
	title: string;
	slug: string;
};

type InsightThemeRecord = {
	title?: string;
	slug?: string;
};

function normalizeString(value: unknown): string {
	return typeof value === "string" ? value.trim() : "";
}

export async function getPublishedServiceCategories(): Promise<string[]> {
	if (!sanityClient) return [];

	try {
		const result = await sanityFetch<unknown>(PUBLISHED_SERVICE_CATEGORIES_QUERY, {}, {
			revalidate: 3600,
			tags: ["sanity:services", "sanity:filters:categories"],
		});

		const categories = Array.isArray(result)
			? result.map((value) => normalizeString(value)).filter(Boolean)
			: [];

		return categories.sort((a, b) => a.localeCompare(b));
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getPublishedServiceCategories failed", { error });
		}
		return [];
	}
}

export async function getPublishedInsightThemes(): Promise<InsightThemeOption[]> {
	if (!sanityClient) return [];

	try {
		const result = await sanityFetch<InsightThemeRecord[]>(
			PUBLISHED_INSIGHT_THEMES_QUERY,
			{},
			{
				revalidate: 3600,
				tags: ["sanity:insights", "sanity:filters:themes"],
			}
		);

		return Array.isArray(result)
			? result
					.map((record) => {
						const title = normalizeString(record?.title);
						const slug = normalizeString(record?.slug);
						return title && slug ? { title, slug } : null;
					})
					.filter((item): item is InsightThemeOption => Boolean(item))
			: [];
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getPublishedInsightThemes failed", { error });
		}
		return [];
	}
}
