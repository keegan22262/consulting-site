"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { UnifiedSearchResult } from "@/lib/search/types";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

type SearchState = {
  query: string;
  results: UnifiedSearchResult[];
  loading: boolean;
};

function isUnifiedSearchResult(value: unknown): value is UnifiedSearchResult {
  if (!value || typeof value !== "object") return false;
  const record = value as UnifiedSearchResult;
  return (
    (record.type === "page" || record.type === "service" || record.type === "insight") &&
    typeof record.title === "string" &&
    typeof record.slug === "string" &&
    typeof record.excerpt === "string"
  );
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SearchState>({
    query: "",
    results: [],
    loading: false,
  });
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        "input, button, a, [tabindex]:not([tabindex='-1'])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keydown", handleTab);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keydown", handleTab);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setState({ query: "", results: [], loading: false });
      setInputFocused(false);
    }
  }, [open]);

  const runSearch = useCallback(async (query: string, controller: AbortController) => {
    if (query.length < 3) {
      setState((prev) => ({ ...prev, results: [], loading: false }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query }),
        signal: controller.signal,
      });

      if (!response.ok) {
        setState((prev) => ({ ...prev, results: [], loading: false }));
        return;
      }

      const data = await response.json();
      const items = Array.isArray(data?.data) ? data.data.filter(isUnifiedSearchResult) : [];
      setState((prev) => ({ ...prev, results: items, loading: false }));
    } catch (error) {
      if ((error as Error)?.name === "AbortError") return;
      setState((prev) => ({ ...prev, results: [], loading: false }));
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const handle = window.setTimeout(() => {
      void runSearch(state.query, controller);
    }, 180);
    return () => {
      controller.abort();
      window.clearTimeout(handle);
    };
  }, [open, runSearch, state.query]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-60 flex items-start justify-center bg-[rgba(10,10,10,0.5)]"
      onClick={onClose}
    >
      <div
        className="mt-24 w-full max-w-[640px] rounded-card bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center gap-3 px-5 py-4 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            inputFocused ? "border-b border-[var(--a700)]" : "border-b border-neutral-200"
          }`}
        >
          <SearchIcon className="text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={state.query}
            placeholder="Search insights, services, industries..."
            aria-label="Search insights, services, industries"
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onChange={(e) => setState((prev) => ({ ...prev, query: e.target.value }))}
            className="w-full border-0 bg-transparent text-[0.9375rem] text-neutral-900 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-neutral-400 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-neutral-700"
          >
            <CloseIcon />
          </button>
        </div>

        {state.results.length > 0 && (
          <div className="max-h-[360px] overflow-y-auto px-5 py-4 text-[0.75rem] text-neutral-500">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-[var(--a700)]">
                Knowledge Results
              </span>
              <span className="text-[0.6875rem] text-neutral-400">
                {state.results.length} found
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {state.results.map((result) => (
                <a
                  key={`${result.type}-${result.slug}`}
                  href={`/${result.type === "page" ? "" : `${result.type}s/`}${result.slug}`}
                  className="flex items-center gap-3 rounded-card px-3 py-2 text-[0.75rem] text-neutral-700 transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50"
                  onClick={onClose}
                >
                  <span
                    className={`shrink-0 rounded-[2px] px-2 py-1 text-[0.5625rem] font-semibold uppercase tracking-[0.04em] ${
                      result.type === "insight"
                        ? "bg-[var(--a50)] text-[var(--a700)]"
                        : result.type === "service"
                          ? "bg-neutral-100 text-neutral-600"
                          : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {result.type === "page" ? "Page" : result.type}
                  </span>
                  <span className="truncate">{result.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {state.results.length === 0 && (
          <div className="px-5 py-6 text-[0.75rem] text-neutral-500">
            {state.loading ? (
              <p>Searching...</p>
            ) : (
              <>
                <p className="mb-2">Search across the RSL knowledge network.</p>
                <p className="text-[0.6875rem] text-neutral-400">
                  Try: AI, digital transformation, financial services, energy, governance...
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className ?? ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6l12 12" />
      <path d="M6 18L18 6" />
    </svg>
  );
}
