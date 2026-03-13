"use client";

import { useEffect, useState } from "react";

type InsightApiItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
};

type InsightsResponse = {
  success?: boolean;
  data?: InsightApiItem[];
  error?: string;
};

type FeaturedInsightLike = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
};

export function useFeaturedInsights<T extends FeaturedInsightLike>(fallback: T[]) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch("/api/insights", {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const payload = (await response.json()) as InsightsResponse;
        if (!payload?.success || !Array.isArray(payload.data)) {
          setData(null);
          setError(payload?.error ?? "Failed to load featured insights");
          return;
        }

        const bySlug = new Map(fallback.map((item) => [item.slug, item]));
        const merged = payload.data
          .map((apiItem) => {
            const base = bySlug.get(apiItem.slug);
            if (!base) return null;
            return {
              ...base,
              category: apiItem.category ?? base.category,
              title: apiItem.title ?? base.title,
              excerpt: apiItem.excerpt ?? base.excerpt,
            } as T;
          })
          .filter((item): item is T => item !== null);

        setData(merged.length > 0 ? merged : null);
        setError(null);
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;
        setData(null);
        setError(caught instanceof Error ? caught.message : "Failed to load featured insights");
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [fallback]);

  return { data, isLoading, error };
}
