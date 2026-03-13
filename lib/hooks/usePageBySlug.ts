"use client";

import { useEffect, useState } from "react";

type PagePayload = {
  title?: string;
  body?: unknown[];
};

type PageResponse = {
  success?: boolean;
  data?: PagePayload | null;
  error?: string;
};

export function usePageBySlug(slug: string) {
  const [data, setData] = useState<PagePayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(`/api/pages/${encodeURIComponent(slug)}`, {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const payload = (await response.json()) as PageResponse;
        if (!payload?.success) {
          setData(null);
          setError(payload?.error ?? "Failed to load page");
          return;
        }

        setData(payload.data ?? null);
        setError(null);
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;
        setData(null);
        setError(caught instanceof Error ? caught.message : "Failed to load page");
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, [slug]);

  return { data, isLoading, error };
}
