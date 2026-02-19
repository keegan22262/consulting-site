import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { isNextDynamicServerUsageError } from "@/lib/sanity/nextErrors";
import {
	ALL_PUBLISHED_SERVICES_QUERY,
	PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY,
} from "@/lib/sanity/queries";

export type ServiceListItem = {
	id?: string;
	title: string;
	slug: string;
	summary: string;
	category?: string;
};

export type ServiceDetail = ServiceListItem & {
	targetClients?: string;
	focusAreas?: string[];
	approach?: string;
	order?: number;
	/** Optional: future expansion for cross-linking related insights. */
	relatedInsights?: RelatedInsightListItem[];
};

export type RelatedInsightListItem = {
	title: string;
	slug: string;
	summary: string;
	category?: string;
	date?: string;
};

type PublishedServiceRecord = {
	id?: string;
	title?: string;
	slug?: string;
	category?: string;
	summary?: string;
	targetClients?: string;
	focusAreas?: string[];
	approach?: string;
	order?: number;
};

export const getAllServices = async (): Promise<ServiceListItem[]> => {
	if (!sanityClient) return [];

	try {
		const result = await sanityFetch<PublishedServiceRecord[]>(ALL_PUBLISHED_SERVICES_QUERY, {}, {});

		const items = Array.isArray(result)
			? result
					.filter((item) => Boolean(item?.slug))
					.map((item) => ({
						id: item.id,
						title: item.title ?? "",
						slug: item.slug ?? "",
						summary: item.summary ?? "",
						category: item.category ?? "",
					}))
			: [];

		return items;
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getAllServices failed", { error });
		}
		return [];
	}
};

export const getServiceBySlug = async (slug: string): Promise<ServiceDetail | null> => {
	if (!slug) return null;
	if (!sanityClient) return null;

	try {
		const result = await sanityFetch<PublishedServiceRecord | null>(
			PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY,
			{ slug },
			{}
		);

		if (!result || !result.slug) return null;

		return {
			id: result.id,
			title: result.title ?? "",
			slug: result.slug ?? "",
			summary: result.summary ?? "",
			category: result.category ?? "",
			targetClients: result.targetClients ?? undefined,
			focusAreas: Array.isArray(result.focusAreas) && result.focusAreas.length > 0
				? result.focusAreas
				: undefined,
			approach: result.approach ?? undefined,
			order: result.order ?? undefined,
		};
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getServiceBySlug failed", { slug, error });
		}
		return null;
	}
};

const FEATURED_SERVICES_COUNT = 3;

export const getFeaturedServices = async (): Promise<ServiceListItem[]> => {
	const items = await getAllServices();
	return items.slice(0, FEATURED_SERVICES_COUNT);
};
