"use client";

import { useEffect, useState } from "react";

export type InsightItem = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  industry?: string;
};

type InsightsResponse = {
  success?: boolean;
  data?: InsightItem[];
  error?: string;
};

export function useInsights() {
  const [data, setData] = useState<InsightItem[] | null>(null);
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
        if (!payload?.success) {
          setData(null);
          setError(payload?.error ?? "Failed to load insights");
          return;
        }

        setData(Array.isArray(payload.data) ? payload.data : null);
        setError(null);
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;
        setData(null);
        setError(caught instanceof Error ? caught.message : "Failed to load insights");
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, isLoading, error };
}
