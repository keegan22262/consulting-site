"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type {
	UnifiedSearchGroupedResults,
	UnifiedSearchResult,
	UnifiedSearchResultType,
} from "@/lib/search/types";

export type UseUnifiedSearchOptions = {
	limit?: number;
	enabled?: boolean;
};

type UseUnifiedSearchState = {
	results: UnifiedSearchResult[];
	isLoading: boolean;
	error: string | null;
};

function normalizeQuery(value: string): string {
	return (value || "").trim();
}

function normalizeLimit(value: number | undefined): number {
	if (typeof value !== "number" || !Number.isFinite(value)) return 20;
	return Math.max(1, Math.min(50, Math.floor(value)));
}

function emptyGrouped(): UnifiedSearchGroupedResults {
	return { pages: [], services: [], insights: [] };
}

function groupResults(results: UnifiedSearchResult[]): UnifiedSearchGroupedResults {
	const grouped = emptyGrouped();
	for (const item of results) {
		switch (item.type) {
			case "page":
				grouped.pages.push(item);
				break;
			case "service":
				grouped.services.push(item);
				break;
			case "insight":
				grouped.insights.push(item);
				break;
		}
	}
	return grouped;
}

function isValidType(value: unknown): value is UnifiedSearchResultType {
	return value === "page" || value === "service" || value === "insight";
}

function normalizeResults(value: unknown): UnifiedSearchResult[] {
	if (!Array.isArray(value)) return [];

	const normalized: UnifiedSearchResult[] = [];
	for (const record of value) {
		if (!record || typeof record !== "object") continue;
		const item = record as Record<string, unknown>;
		if (!isValidType(item.type)) continue;

		const title = typeof item.title === "string" ? item.title : "";
		const slug = typeof item.slug === "string" ? item.slug : "";
		const excerpt = typeof item.excerpt === "string" ? item.excerpt : "";
		if (!title || !slug) continue;

		normalized.push({ type: item.type, title, slug, excerpt });
	}

	return normalized;
}

export function useUnifiedSearch(query: string, options?: UseUnifiedSearchOptions) {
	const enabled = options?.enabled ?? true;
	const normalizedQuery = normalizeQuery(query);
	const limit = normalizeLimit(options?.limit);

	const [{ results, isLoading, error }, setState] = useState<UseUnifiedSearchState>({
		results: [],
		isLoading: false,
		error: null,
	});

	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		if (!enabled) return;

		abortRef.current?.abort();
		abortRef.current = null;

		if (!normalizedQuery) {
			setState({ results: [], isLoading: false, error: null });
			return;
		}

		const controller = new AbortController();
		abortRef.current = controller;

		setState((previous) => ({ ...previous, isLoading: true, error: null, results: [] }));

		const url = `/api/search?q=${encodeURIComponent(normalizedQuery)}&limit=${limit}`;

		(async () => {
			try {
				const response = await fetch(url, {
					method: "GET",
					signal: controller.signal,
					headers: {
						Accept: "application/json",
					},
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error(`Request failed (${response.status})`);
				}

				const json = (await response.json()) as unknown;
				if (!json || typeof json !== "object") {
					throw new Error("Invalid response");
				}

				const payload = json as Record<string, unknown>;
				const nextResults = normalizeResults(payload.results);

				setState({ results: nextResults, isLoading: false, error: null });
			} catch (caught) {
				if ((caught as Error)?.name === "AbortError") return;
				if (controller.signal.aborted) return;

				const message = caught instanceof Error ? caught.message : "Search failed";
				setState({ results: [], isLoading: false, error: message });
			}
		})();

		return () => {
			controller.abort();
		};
	}, [enabled, normalizedQuery, limit]);

	const grouped = useMemo(() => groupResults(results), [results]);
	const hasQuery = normalizedQuery.length > 0;
	const hasResults = results.length > 0;

	return {
		query,
		normalizedQuery,
		limit,
		hasQuery,
		isLoading,
		error,
		results,
		grouped,
		hasResults,
		isEmpty: hasQuery && !isLoading && !error && !hasResults,
	};
}
