import "server-only";

import { cache } from "react";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import {
	ALL_PUBLISHED_SERVICES_QUERY,
	PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY,
} from "@/lib/sanity/queries";

export type ServiceListItem = {
	title: string;
	slug: string;
	summary: string;
	/** Legacy UI field (kept for compatibility). Populated from `domain`. */
	category?: string;
};

export type ServiceDetail = ServiceListItem & {
	/** Plain-text body, derived from Sanity `body` blocks for legacy UI. */
	description?: string;
	offerings?: string[];
	outcomes?: string[];
	/** Optional derived sections from the Service body. */
	approach?: string;
	expectations?: string;
	additionalCapabilities?: string;
	/** Optional: future expansion for cross-linking related insights. */
	relatedInsights?: RelatedInsightListItem[];
	/** Optional: future expansion for hierarchy. */
	parentService?: ServiceListItem;
	/** Optional: future expansion for hierarchy. */
	subServices?: ServiceListItem[];
	/** Optional: future expansion for structured overview blocks. */
	overviewSections?: OverviewSection[];
};

export type RelatedInsightListItem = {
	title: string;
	slug: string;
	summary: string;
	category?: string;
	date?: string;
};

export type OverviewSection = {
	_key?: string;
	title?: string;
	body?: PortableTextBlock[];
} & Record<string, unknown>;

type PortableTextChild = {
	_type?: string;
	text?: string;
};

type PortableTextBlock = {
	_type?: string;
	style?: string;
	listItem?: string;
	children?: PortableTextChild[];
};

type PublishedServiceRecord = {
	title?: string;
	slug?: string;
	summary?: string;
	body?: PortableTextBlock[];
	domain?: string;
	relatedInsights?: PublishedRelatedInsightRecord[];
	parentService?: PublishedServiceSummaryRecord | null;
	subServices?: PublishedServiceSummaryRecord[];
	overviewSections?: OverviewSection[];
};

type PublishedServiceSummaryRecord = {
	title?: string;
	slug?: string;
	summary?: string;
	domain?: string;
};

type PublishedRelatedInsightRecord = {
	title?: string;
	slug?: string;
	excerpt?: string;
	publishDate?: string;
	themeTitle?: string;
};

function mapServiceSummary(record: PublishedServiceSummaryRecord | null | undefined): ServiceListItem | null {
	if (!record?.slug) return null;
	return {
		title: record.title ?? "",
		slug: record.slug ?? "",
		summary: record.summary ?? "",
		category: record.domain ?? "",
	};
}

function mapRelatedInsights(records: PublishedRelatedInsightRecord[] | undefined): RelatedInsightListItem[] | undefined {
	if (!Array.isArray(records)) return undefined;
	const items = records
		.filter((item) => Boolean(item?.slug))
		.map((item) => ({
			title: item.title ?? "",
			slug: item.slug ?? "",
			summary: item.excerpt ?? "",
			category: item.themeTitle ?? "",
			date: item.publishDate ?? "",
		}));

	return items.length > 0 ? items : undefined;
}

function mapOverviewSections(value: unknown): OverviewSection[] | undefined {
	if (!Array.isArray(value)) return undefined;
	const items = value.filter((item) => Boolean(item && typeof item === "object"));
	return items.length > 0 ? (items as OverviewSection[]) : undefined;
}

function portableTextToPlainText(blocks: PortableTextBlock[] | undefined): string {
	if (!Array.isArray(blocks)) return "";

	const lines: string[] = [];
	for (const block of blocks) {
		if (!block || block._type !== "block" || !Array.isArray(block.children)) continue;
		const line = block.children
			.map((child) => (typeof child?.text === "string" ? child.text : ""))
			.join("")
			.trim();
		if (line) lines.push(line);
	}

	return lines.join("\n\n");
}

function portableTextBlockToText(block: PortableTextBlock): string {
	if (!block || block._type !== "block" || !Array.isArray(block.children)) return "";
	return block.children
		.map((child) => (typeof child?.text === "string" ? child.text : ""))
		.join("")
		.trim();
}

function parseServiceBody(blocks: PortableTextBlock[] | undefined): {
	description: string;
	offerings: string[];
	outcomes: string[];
	approach?: string;
	expectations?: string;
	additionalCapabilities?: string;
} {
	if (!Array.isArray(blocks)) {
		return { description: "", offerings: [], outcomes: [] };
	}

	const descriptionParts: string[] = [];
	const offerings: string[] = [];
	const outcomes: string[] = [];
	const approachParts: string[] = [];
	const expectationsParts: string[] = [];
	const additionalCapabilitiesParts: string[] = [];

	let section:
		| "description"
		| "offerings"
		| "outcomes"
		| "approach"
		| "expectations"
		| "additional"
		| "other" = "description";

	for (const block of blocks) {
		if (!block || block._type !== "block") continue;
		const text = portableTextBlockToText(block);
		if (!text) continue;

		const isHeading = block.style === "h2" || block.style === "h3";
		if (isHeading) {
			const normalized = text.toLowerCase();
			if (normalized.includes("offering")) section = "offerings";
			else if (normalized.includes("outcome")) section = "outcomes";
			else if (normalized.includes("approach")) section = "approach";
			else if (normalized.includes("expect")) section = "expectations";
			else if (normalized.includes("capabil") || normalized.includes("additional")) section = "additional";
			else section = "other";
			continue;
		}

		const isBullet = block.listItem === "bullet";
		if (isBullet) {
			if (section === "outcomes") outcomes.push(text);
			else if (section === "offerings") offerings.push(text);
			else if (section === "description" || section === "other") offerings.push(text);
			else if (section === "approach") approachParts.push(text);
			else if (section === "expectations") expectationsParts.push(text);
			else if (section === "additional") additionalCapabilitiesParts.push(text);
			continue;
		}

		if (section === "approach") approachParts.push(text);
		else if (section === "expectations") expectationsParts.push(text);
		else if (section === "additional") additionalCapabilitiesParts.push(text);
		else descriptionParts.push(text);
	}

	const approach = approachParts.join(" ").trim();
	const expectations = expectationsParts.join(" ").trim();
	const additionalCapabilities = additionalCapabilitiesParts.join(" ").trim();

	return {
		description: descriptionParts.join(" ").trim(),
		offerings,
		outcomes,
		approach: approach || undefined,
		expectations: expectations || undefined,
		additionalCapabilities: additionalCapabilities || undefined,
	};
}

export const getAllServices = cache(async (): Promise<ServiceListItem[]> => {
	if (!sanityClient) return [];

	try {
		const result = await sanityFetch<PublishedServiceRecord[]>(ALL_PUBLISHED_SERVICES_QUERY, {}, {
			revalidate: 600,
			tags: ["sanity:services"],
		});

		const items = Array.isArray(result)
			? result
					.filter((item) => Boolean(item?.slug))
					.map((item) => ({
						title: item.title ?? "",
						slug: item.slug ?? "",
						summary: item.summary ?? "",
						category: item.domain ?? "",
					}))
			: [];

		if (process.env.SANITY_DEBUG === "true") {
			console.log("Sanity getAllServices result", { count: items.length, sample: items[0] });
		}

		return items;
	} catch (error) {
		console.error("Sanity getAllServices failed", { error });
		return [];
	}
});

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceDetail | null> => {
	if (!slug) return null;
	if (!sanityClient) return null;

	try {
		const result = await sanityFetch<PublishedServiceRecord | null>(
			PUBLISHED_SERVICE_BY_SLUG_EXPANDED_QUERY,
			{ slug },
			{
				revalidate: 600,
				tags: ["sanity:services", `sanity:service:${slug}`],
			}
		);

		if (process.env.SANITY_DEBUG === "true") {
			console.log("Sanity getServiceBySlug result", { slug, found: Boolean(result) });
		}

		if (!result || !result.slug) return null;

		const parsedBody = parseServiceBody(result.body);
		const description = parsedBody.description || portableTextToPlainText(result.body);

		const parentService = mapServiceSummary(result.parentService) ?? undefined;
		const subServices = Array.isArray(result.subServices)
			? result.subServices
					.map((item) => mapServiceSummary(item))
					.filter((item): item is ServiceListItem => Boolean(item))
			: [];
		const normalizedSubServices = subServices;

		return {
			title: result.title ?? "",
			slug: result.slug ?? "",
			summary: result.summary ?? "",
			category: result.domain ?? "",
			description,
			offerings: parsedBody.offerings,
			outcomes: parsedBody.outcomes,
			approach: parsedBody.approach,
			expectations: parsedBody.expectations,
			additionalCapabilities: parsedBody.additionalCapabilities,
			relatedInsights: mapRelatedInsights(result.relatedInsights) ?? [],
			parentService,
			subServices: normalizedSubServices,
			overviewSections: mapOverviewSections(result.overviewSections),
		};
	} catch (error) {
		console.error("Sanity getServiceBySlug failed", { slug, error });
		return null;
	}
});

const FEATURED_SERVICES_COUNT = 3;

export const getFeaturedServices = cache(async (): Promise<ServiceListItem[]> => {
	const items = await getAllServices();
	return items.slice(0, FEATURED_SERVICES_COUNT);
});
