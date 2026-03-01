import "server-only";

import { sanityClient } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/fetch";
import { isNextDynamicServerUsageError } from "@/lib/sanity/nextErrors";
import { PUBLISHED_HOME_PAGE_QUERY, PUBLISHED_PAGE_BY_SLUG_QUERY } from "@/lib/sanity/queries";

type PortableTextBlock = { _type: string } & Record<string, unknown>;

export type PublishedPage = {
	title: string;
	body: PortableTextBlock[];
};

export type HomePageCTA = {
	label?: string;
	href?: string;
};

export type HomePageSectionIntro = {
	sectionId: string;
	title?: string;
	intro?: string;
	linkLabel?: string;
	linkHref?: string;
};

export type PublishedHomePage = {
	title?: string;
	heroTitle?: string;
	heroSubtitle?: string;
	servicesIntro?: string;
	insightsIntro?: string;
	ctaText?: string;
	companyDescription?: PortableTextBlock[];
	operatingApproach?: PortableTextBlock[];
	problems?: { title: string; description: string }[];
	differentiation?: { label: string; explanation: string }[];
	capabilitiesIntro?: string;
	capabilityClusters?: string[];
	audiences?: { name?: string; qualifier?: string }[];
	workingProcess?: PortableTextBlock[];
	heroCTA?: HomePageCTA;
	sectionIntros?: HomePageSectionIntro[];
};

export const getPublishedPageBySlug = async (slug: string): Promise<PublishedPage | null> => {
	const normalizedSlug = slug?.trim();
	if (!normalizedSlug) return null;
	// sanityClient is always defined

	try {
		const result = await sanityFetch<PublishedPage | null>(
			PUBLISHED_PAGE_BY_SLUG_QUERY,
			{ slug: normalizedSlug },
			{
				revalidate: 1800,
				tags: ["sanity:pages", `sanity:page:${normalizedSlug}`],
			}
		);

		if (!result?.title) return null;
		if (!Array.isArray(result.body)) return null;

		return result;
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getPageBySlug failed", { slug: normalizedSlug, error });
		}
		return null;
	}
};

function normalizeString(value: unknown): string | undefined {
	if (typeof value !== "string") return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
}

function normalizePortableText(value: unknown): PortableTextBlock[] | undefined {
	if (!Array.isArray(value)) return undefined;
	return value.length > 0 ? (value as PortableTextBlock[]) : undefined;
}

function normalizeStringArray(value: unknown): string[] | undefined {
	if (!Array.isArray(value)) return undefined;
	const items = value
		.map((item) => (typeof item === "string" ? item.trim() : ""))
		.filter((item) => item.length > 0);
	return items.length > 0 ? items : undefined;
}

function normalizeProblems(value: unknown): { title: string; description: string }[] | undefined {
	if (!Array.isArray(value)) return undefined;
	const items: { title: string; description: string }[] = [];
	for (const record of value) {
		if (!record || typeof record !== "object") continue;
		const anyRecord = record as Record<string, unknown>;
		const title = normalizeString(anyRecord.title) ?? "";
		const description = normalizeString(anyRecord.description) ?? "";
		if (!title || !description) continue;
		items.push({ title, description });
	}
	return items.length > 0 ? items : undefined;
}

function normalizeDifferentiation(value: unknown): { label: string; explanation: string }[] | undefined {
	if (!Array.isArray(value)) return undefined;
	const items: { label: string; explanation: string }[] = [];
	for (const record of value) {
		if (!record || typeof record !== "object") continue;
		const anyRecord = record as Record<string, unknown>;
		const label = normalizeString(anyRecord.label) ?? "";
		const explanation = normalizeString(anyRecord.explanation) ?? "";
		if (!label || !explanation) continue;
		items.push({ label, explanation });
	}
	return items.length > 0 ? items : undefined;
}

function normalizeAudiences(value: unknown): { name?: string; qualifier?: string }[] | undefined {
	if (!Array.isArray(value)) return undefined;
	const items: { name?: string; qualifier?: string }[] = [];
	for (const record of value) {
		if (!record || typeof record !== "object") continue;
		const anyRecord = record as Record<string, unknown>;
		const name = normalizeString(anyRecord.name);
		const qualifier = normalizeString(anyRecord.qualifier);
		if (!name && !qualifier) continue;
		items.push({ name, qualifier });
	}
	return items.length > 0 ? items : undefined;
}

function normalizeSectionIntros(value: unknown): HomePageSectionIntro[] {
	if (!Array.isArray(value)) return [];

	const intros: HomePageSectionIntro[] = [];
	for (const record of value) {
		if (!record || typeof record !== "object") continue;
		const anyRecord = record as Record<string, unknown>;
		const sectionId = normalizeString(anyRecord.sectionId);
		if (!sectionId) continue;
		intros.push({
			sectionId,
			title: normalizeString(anyRecord.title),
			intro: normalizeString(anyRecord.intro),
			linkLabel: normalizeString(anyRecord.linkLabel),
			linkHref: normalizeString(anyRecord.linkHref),
		});
	}
	return intros;
}

export const getPublishedHomePage = async (): Promise<PublishedHomePage | null> => {
	// sanityClient is always defined

	try {
		const result = await sanityFetch<Record<string, unknown> | null>(
			PUBLISHED_HOME_PAGE_QUERY,
			{},
			{
				revalidate: 300,
				tags: ["sanity:pages", "sanity:page:home"],
			}
		);

		if (!result || typeof result !== "object") return null;

		const heroCTA = result.heroCTA && typeof result.heroCTA === "object"
			? {
				label: normalizeString((result.heroCTA as Record<string, unknown>).label),
				href: normalizeString((result.heroCTA as Record<string, unknown>).href),
			}
			: undefined;

		return {
			title: normalizeString(result.title),
			heroTitle: normalizeString(result.heroTitle),
			heroSubtitle: normalizeString(result.heroSubtitle),
			servicesIntro: normalizeString(result.servicesIntro),
			insightsIntro: normalizeString(result.insightsIntro),
			ctaText: normalizeString(result.ctaText),
			companyDescription: normalizePortableText(result.companyDescription),
			operatingApproach: normalizePortableText(result.operatingApproach),
			problems: normalizeProblems(result.problems),
			differentiation: normalizeDifferentiation(result.differentiation),
			capabilitiesIntro: normalizeString(result.capabilitiesIntro),
			capabilityClusters: normalizeStringArray(result.capabilityClusters),
			audiences: normalizeAudiences(result.audiences),
			workingProcess: normalizePortableText(result.workingProcess),
			heroCTA,
			sectionIntros: normalizeSectionIntros(result.sectionIntros),
		};
	} catch (error) {
		if (!isNextDynamicServerUsageError(error)) {
			console.error("Sanity getPublishedHomePage failed", { error });
		}
		return null;
	}
};

// Backward-compatible alias (older imports may still reference this name).
export const getPageBySlug = getPublishedPageBySlug;
