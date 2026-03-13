"use client";

import { useEffect, useState } from "react";

type UseServicesResult<T> = {
  data: T[] | null;
  isLoading: boolean;
  error: string | null;
};

type ServicesResponse<T> = {
  success?: boolean;
  data?: T[];
  error?: string;
};

export function useServices<T = unknown>(): UseServicesResult<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch("/api/services", {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const payload = (await response.json()) as ServicesResponse<T>;

        if (!payload?.success) {
          setData(null);
          setError(payload?.error ?? "Failed to load services");
          return;
        }

        setData(Array.isArray(payload.data) ? payload.data : null);
        setError(null);
      } catch (caught) {
        if ((caught as Error)?.name === "AbortError") return;
        setData(null);
        setError(caught instanceof Error ? caught.message : "Failed to load services");
      } finally {
        setIsLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return { data, isLoading, error };
}
