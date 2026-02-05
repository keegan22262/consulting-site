"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navigation = {
  brand: { label: "Firm Name", href: "/" },
  primary: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  more: {
    label: "More",
    items: [
      { label: "Insights", href: "/insights" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Search", href: "/search" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ] satisfies NavItem[],
  },
  search: {
    label: "Search",
    placeholder: "Search",
  },
} as const;

export default function Header() {
  const router = useRouter();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const menuId = useId();
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchDialogId = useId();
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isSearchOpen) return;
    searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isSearchOpen]);

  function closeSearch() {
    setIsSearchOpen(false);
    searchButtonRef.current?.focus();
  }

  return (
    <header>
      <nav aria-label="Primary">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <div className="shrink-0">
            <Link href={navigation.brand.href}>{navigation.brand.label}</Link>
          </div>

          <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
            {navigation.primary.map((item) => (
              <li key={item.href} className="whitespace-nowrap">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}

          <li className="whitespace-nowrap">
            <button
              ref={searchButtonRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isSearchOpen}
              aria-controls={searchDialogId}
              className="inline-flex items-center justify-center"
              onClick={() => {
                setIsMoreOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <span className="sr-only">{navigation.search.label}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-slate-700"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </li>

          <li className="relative whitespace-nowrap">
            <div
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
              onFocus={() => setIsMoreOpen(true)}
              onBlur={(event) => {
                const nextFocused = event.relatedTarget as Node | null;
                if (!event.currentTarget.contains(nextFocused)) {
                  setIsMoreOpen(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key !== "Escape") return;
                setIsMoreOpen(false);
                moreButtonRef.current?.focus();
              }}
            >
              <button
                ref={moreButtonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={isMoreOpen}
                aria-controls={menuId}
                className="inline-flex items-center"
              >
                {navigation.more.label}
              </button>

              {isMoreOpen ? (
                <ul
                  id={menuId}
                  role="menu"
                  className="absolute right-0 z-50 mt-2 min-w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-sm"
                >
                  {navigation.more.items.map((item) => (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </li>
          </ul>
        </div>
      </nav>

      {isSearchOpen ? (
        <div
          id={searchDialogId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${searchDialogId}-title`}
          className="fixed inset-0 z-60"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeSearch();

            if (event.key !== "Tab") return;
            const panel = searchPanelRef.current;
            if (!panel) return;

            const focusable = Array.from(
              panel.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
              )
            ).filter((element) => element.offsetParent !== null);

            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (!event.shiftKey && active === last) {
              event.preventDefault();
              first.focus();
            } else if (event.shiftKey && (active === first || !active || !panel.contains(active))) {
              event.preventDefault();
              last.focus();
            }
          }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/30"
            onClick={closeSearch}
            aria-label="Close search"
          />
          <div
            ref={searchPanelRef}
            className="relative mx-auto mt-24 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={`${searchDialogId}-title`} className="text-base font-semibold tracking-tight">
                {navigation.search.label}
              </h2>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                onClick={closeSearch}
              >
                Close
              </button>
            </div>

            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const term = searchQuery.trim();
                if (!term) {
                  closeSearch();
                  return;
                }
                closeSearch();
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
            >
              <label className="block text-sm font-medium text-slate-800" htmlFor={`${searchDialogId}-input`}>
                Query
              </label>
              <input
                ref={searchInputRef}
                id={`${searchDialogId}-input`}
                type="search"
                name="q"
                autoComplete="off"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={navigation.search.placeholder}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  onClick={closeSearch}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg border border-slate-800 bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </header>
  );
}
