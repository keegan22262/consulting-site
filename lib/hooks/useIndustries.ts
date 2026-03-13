"use client";

import { useEffect, useState } from "react";

export type IndustryItem = {
  slug: string;
  title: string;
  description: string;
};

type IndustryLike = {
  slug?: string;
  id?: string;
  title?: string;
  description?: string;
};

type IndustriesResponse = {
  success?: boolean;
  data?: IndustryItem[];
  error?: string;
};

export function useIndustries<T extends IndustryLike = IndustryItem>(fallback?: T[]) {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch("/api/industries", {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const payload = (await response.json()) as IndustriesResponse;
        if (!payload?.success) {
          setData(null);
          setError(payload?.error ?? "Failed to load industries");
          return;
        }

        if (Array.isArray(payload.data)) {
          if (!fallback || fallback.length === 0) {
            setData(payload.data as unknown as T[]);
          } else {
            const entries: Array<[string, T]> = fallback
              .map((item) => {
                const key = item.id ?? item.slug;
                return key ? ([key, item] as [string, T]) : null;
              })
              .filter((entry): entry is [string, T] => entry !== null);

            const byKey = new Map(entries);
            const merged = payload.data
              .map((item) => {
                const base = byKey.get(item.slug);
                if (!base) return null;
                return {
                  ...base,
                  title: item.title ?? base.title,
                  description: item.description ?? base.description,
                } as T;
              })
              .filter((item): item is T => item !== null);

            setData(merged.length > 0 ? merged : null);
          }
        } else {
          setData(null);
        }
        setError(null);
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;
        setData(null);
        setError(caught instanceof Error ? caught.message : "Failed to load industries");
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, isLoading, error };
}
