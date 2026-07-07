import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { isNextDynamicServerUsageError } from "@/lib/sanity/nextErrors";
import {
	SERVICES_LISTING_QUERY,
	PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY,
} from "@/lib/sanity/queries";

export type ServiceListItem = {
	id?: string;
	title: string;
	slug: string;
	summary?: string;
	description?: string;
	category?: string;
	engagementType?: string;
	timeHorizon?: string;
	operationalScope?: string;
	icon?: unknown;
	image?: string;
};

export type ServiceDetail = ServiceListItem & {
	targetClients?: string;
	focusAreas?: string[];
	approach?: string;
	order?: number;
	/** Optional: future expansion for cross-linking related insights. */
	relatedInsights?: RelatedInsightListItem[];
	engagementType?: string;
	timeHorizon?: string;
	operationalScope?: string;
};

export type RelatedInsightListItem = {
	title: string;
	slug: string;
	summary: string;
	category?: string;
	date?: string;
};

type PublishedServiceRecord = {
	_id: string;
	title?: string;
	slug?: string;
	category?: string;
	description?: string;
	summary?: string;
	icon?: unknown;
	image?: string;
	targetClients?: string;
	focusAreas?: string[];
	approach?: string;
	order?: number;
	[key: string]: unknown;
};

export const getAllServices = async (): Promise<ServiceListItem[]> => {
	// sanityClient is always defined

	try {
		const result = await sanityFetch<PublishedServiceRecord[]>(SERVICES_LISTING_QUERY, {}, {});

		const items = Array.isArray(result)
			? result
					.filter((item) => Boolean(item?.slug))
					.map((item) => ({
						title: item.title ?? "",
						slug: item.slug ?? "",
						summary: item.description ?? "",
						description: item.description ?? "",
						category: item.category ?? "",
						icon: item.icon,
						image: item.image ?? "",
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
	// sanityClient is always defined

	try {
		const result = await sanityFetch<PublishedServiceRecord | null>(
			PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY,
			{ slug },
			{}
		);

		if (!result || !result.slug) return null;

		return {
			id: result._id,
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
