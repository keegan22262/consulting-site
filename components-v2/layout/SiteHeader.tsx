"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "@/lib/breakpoints";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLUSTERS, SERVICES, CLUSTER_IMAGES } from "@/src/sections/services/data";
import { INDUSTRIES, INDUSTRY_IMAGES } from "@/src/sections/industries/data";
import { TOPIC_FILTERS, INSIGHTS_DATA } from "@/src/sections/insights/data";

const NAV_LINKS = ["Services", "Industries", "Insights", "About"] as const;

const NAV_HREFS: Record<string, string> = {
  Services: "/services",
  Industries: "/industries",
  Insights: "/insights",
  About: "/about",
};

const HERO_SELECTOR = "[data-homepage-hero]";

type CategoryKey = "services" | "industries" | "insights" | "about";

type ChildItem = {
  id: string;
  label: string;
  href: string;
  image?: string;
  blurb?: string;
  groupLabel?: string;
  featuredHeadline?: string;
};

const SERVICE_CHILDREN: ChildItem[] = SERVICES.map((s) => ({
  id: s.slug,
  label: s.title,
  href: `/services/${s.slug}`,
  image: CLUSTER_IMAGES[s.cluster],
  blurb: s.approach,
  groupLabel: CLUSTERS.find((c) => c.id === s.cluster)?.label,
}));

const INDUSTRY_CHILDREN: ChildItem[] = INDUSTRIES.map((i) => ({
  id: i.id,
  label: i.title,
  href: `/industries/${i.id}`,
  image: INDUSTRY_IMAGES[i.id],
  blurb: i.description,
}));

const INSIGHT_TOPIC_LABEL_OVERRIDES: Record<string, string> = {
  Infrastructure: "Infrastructure & Supply Chains",
};

const INSIGHT_TOPICS_EXCLUDED_FROM_NAV = new Set(["All Insights", "Supply Chains"]);

const INSIGHT_CHILDREN: ChildItem[] = TOPIC_FILTERS.filter(
  (topic) => !INSIGHT_TOPICS_EXCLUDED_FROM_NAV.has(topic.label),
).map((topic) => {
  const representative = INSIGHTS_DATA.find((insight) => topic.categories.includes(insight.category));
  return {
    id: topic.label,
    label: INSIGHT_TOPIC_LABEL_OVERRIDES[topic.label] ?? topic.label,
    href: `/insights?filter=${encodeURIComponent(topic.label)}`,
    image: representative?.image,
    blurb: representative?.whatItMeans,
    featuredHeadline: representative?.headline,
  };
});

const ABOUT_CHILDREN: ChildItem[] = [
  { id: "about", label: "About", href: "/about" },
  { id: "careers", label: "Careers", href: "/careers" },
  { id: "contact", label: "Contact", href: "/contact" },
  { id: "coverage", label: "Coverage", href: "/coverage" },
];

const CATEGORY_CHILDREN: Record<CategoryKey, ChildItem[]> = {
  services: SERVICE_CHILDREN,
  industries: INDUSTRY_CHILDREN,
  insights: INSIGHT_CHILDREN,
  about: ABOUT_CHILDREN,
};

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  services: "Services",
  industries: "Industries",
  insights: "Insights",
  about: "About",
};

const CATEGORY_HREFS: Record<CategoryKey, string> = {
  services: "/services",
  industries: "/industries",
  insights: "/insights",
  about: "/about",
};

const CATEGORY_DESCRIPTIONS: Partial<Record<CategoryKey, string>> = {
  services: "Ten disciplines, grouped under four ways we help institutions execute.",
  industries: "Sector-specific advisory across the eleven industries we serve.",
  insights: "Research and perspective across the trends shaping African markets.",
};

export default function SiteHeader() {
  const pathname = usePathname();
  const bp = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isSolid, setIsSolid] = useState(true);

  const isHomepage = pathname === "/";

  const activePage = NAV_LINKS.find((label) => {
    const href = NAV_HREFS[label];
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!isHomepage) {
      setIsSolid(true);
      return;
    }
    const onScroll = () => {
      const heroEl = document.querySelector(HERO_SELECTOR);
      const heroHeight = heroEl?.getBoundingClientRect().height ?? 640;
      setIsSolid(window.scrollY > heroHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomepage]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isMobileViewport = hasMounted && (bp === "mobile" || bp === "tablet");

  const hamburgerClassName =
    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-navy-darkest shadow-lg ring-1 ring-black/10 transition-transform duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03]";

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          (!isHomepage && isSolid) || menuOpen ? "bg-[var(--color-paper)] shadow-sm" : "bg-transparent"
        }`}
        style={{
          borderBottom: (!isHomepage && isSolid) || menuOpen ? "1px solid rgba(2,16,36,.08)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex h-[clamp(64px,56px+2.222vw,88px)] w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Rill Singh Limited"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--a700]"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={
                isSolid || menuOpen
                  ? "/images/logo/Lockup_Horizontal_White.png"
                  : "/images/logo/Lockup_Horizontal_Navy.png"
              }
              alt="Rill Singh Limited"
              width={1800}
              height={560}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-mega-menu"
            className={hamburgerClassName}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <MegaMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activePage={activePage}
        isMobileViewport={isMobileViewport}
      />
    </>
  );
}

function MegaMenu({
  open,
  onClose,
  activePage,
  isMobileViewport,
}: {
  open: boolean;
  onClose: () => void;
  activePage?: string;
  isMobileViewport: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("services");
  const [activeChildId, setActiveChildId] = useState<string>(SERVICE_CHILDREN[0]?.id ?? "");
  const [mobileOpenCategory, setMobileOpenCategory] = useState<CategoryKey | null>(null);

  useEffect(() => {
    if (open) {
      const initial: CategoryKey =
        activePage === "Industries"
          ? "industries"
          : activePage === "Insights"
          ? "insights"
          : activePage === "About"
          ? "about"
          : "services";
      setActiveCategory(initial);
      setActiveChildId(CATEGORY_CHILDREN[initial][0]?.id ?? "");
      setMobileOpenCategory(null);
    }
  }, [open, activePage]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "button, a, [tabindex]:not([tabindex='-1'])",
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
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const activeChild = CATEGORY_CHILDREN[activeCategory].find((c) => c.id === activeChildId);
  const showPreview = activeCategory !== "about";

  return (
    <div
      id="site-mega-menu"
      ref={panelRef}
      role="dialog"
      aria-modal={open ? "true" : undefined}
      aria-label="Site navigation menu"
      className={`fixed inset-0 z-40 flex flex-col bg-[var(--color-paper)] transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="h-[clamp(64px,56px+2.222vw,88px)] flex-none" aria-hidden="true" />

      {isMobileViewport ? (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col divide-y divide-navy-darkest/10">
            {(["services", "industries", "insights"] as CategoryKey[]).map((key) => (
              <div key={key} className="py-2">
                <button
                  type="button"
                  onClick={() => setMobileOpenCategory((c) => (c === key ? null : key))}
                  aria-expanded={mobileOpenCategory === key}
                  className="flex w-full items-center justify-between py-3 text-left font-[var(--font-heading)] text-[1.15rem] font-semibold text-navy-darkest"
                >
                  {CATEGORY_LABELS[key]}
                  <span aria-hidden="true">{mobileOpenCategory === key ? "−" : "+"}</span>
                </button>
                {mobileOpenCategory === key && (
                  <div className="flex flex-col gap-1 pb-4 pl-2">
                    {CATEGORY_CHILDREN[key].map((child) => (
                      <Link
                        key={child.id}
                        href={child.href}
                        onClick={onClose}
                        className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#37424F] transition-colors hover:bg-navy-darkest/5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="py-2">
              <button
                type="button"
                onClick={() => setMobileOpenCategory((c) => (c === "about" ? null : "about"))}
                aria-expanded={mobileOpenCategory === "about"}
                className="flex w-full items-center justify-between py-3 text-left font-[var(--font-heading)] text-[1.15rem] font-semibold text-navy-darkest"
              >
                About
                <span aria-hidden="true">{mobileOpenCategory === "about" ? "−" : "+"}</span>
              </button>
              {mobileOpenCategory === "about" && (
                <div className="flex flex-col gap-1 pb-4 pl-2">
                  {ABOUT_CHILDREN.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href}
                      onClick={onClose}
                      className="rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#37424F] transition-colors hover:bg-navy-darkest/5"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-navy-darkest/10 pt-6">
            <Link
              href="/contact"
              onClick={onClose}
              className="block rounded-full bg-olive px-6 py-4 text-center text-[14px] font-bold text-navy-darkest transition-colors hover:bg-olive-hover"
            >
              Schedule an Introduction
            </Link>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-7xl flex-1 overflow-hidden px-6 py-8 lg:px-8">
          <div className="flex w-[240px] flex-none flex-col gap-1 border-r border-navy-darkest/10 pr-8">
            {(["services", "industries", "insights"] as CategoryKey[]).map((key) => (
              <Link
                key={key}
                href={CATEGORY_HREFS[key]}
                onClick={onClose}
                onMouseEnter={() => {
                  setActiveCategory(key);
                  setActiveChildId(CATEGORY_CHILDREN[key][0]?.id ?? "");
                }}
                onFocus={() => {
                  setActiveCategory(key);
                  setActiveChildId(CATEGORY_CHILDREN[key][0]?.id ?? "");
                }}
                className={`block rounded-xl px-4 py-3 text-left font-[var(--font-heading)] text-[1.05rem] font-semibold transition-colors ${
                  activeCategory === key
                    ? "bg-white text-navy-darkest shadow-sm"
                    : "text-[#37424F] hover:bg-white/60"
                }`}
              >
                {CATEGORY_LABELS[key]}
              </Link>
            ))}

            <Link
              href="/about"
              onClick={onClose}
              onMouseEnter={() => setActiveCategory("about")}
              onFocus={() => setActiveCategory("about")}
              className={`block rounded-xl px-4 py-3 text-left font-[var(--font-heading)] text-[1.05rem] font-semibold transition-colors ${
                activeCategory === "about"
                  ? "bg-white text-navy-darkest shadow-sm"
                  : "text-[#37424F] hover:bg-white/60"
              }`}
            >
              About
            </Link>

            <div className="mt-auto pt-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-full bg-olive px-6 py-3.5 text-[13px] font-bold text-navy-darkest transition-colors hover:bg-olive-hover"
              >
                Schedule an Introduction
              </Link>
            </div>
          </div>

          <div
            className={`flex-1 overflow-y-auto pl-8 ${showPreview ? "border-r border-navy-darkest/10 pr-8" : ""}`}
          >
            <div className="mb-6">
              <h3 className="font-[var(--font-heading)] text-[1.3rem] font-semibold leading-[1.2] text-navy-darkest">
                {CATEGORY_LABELS[activeCategory]}
              </h3>
              {CATEGORY_DESCRIPTIONS[activeCategory] && (
                <p className="mt-1.5 max-w-[38ch] text-[14px] leading-[1.5] text-[#37424F]">
                  {CATEGORY_DESCRIPTIONS[activeCategory]}
                </p>
              )}
            </div>

            {activeCategory === "services" && (
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                {CLUSTERS.map((cluster) => (
                  <div key={cluster.id}>
                    <div className="mb-2 text-[12px] font-bold uppercase tracking-[.1em] text-sage">
                      {cluster.label}
                    </div>
                    <div className="flex flex-col">
                      {SERVICE_CHILDREN.filter((c) => c.groupLabel === cluster.label).map((child) => (
                        <Link
                          key={child.id}
                          href={child.href}
                          onClick={onClose}
                          onMouseEnter={() => setActiveChildId(child.id)}
                          onFocus={() => setActiveChildId(child.id)}
                          className={`group flex items-center justify-between gap-2 rounded-lg border-l-[3px] px-3.5 py-2.5 text-[14px] transition-colors ${
                            activeChildId === child.id
                              ? "border-sage bg-sage/30 text-navy-darkest"
                              : "border-transparent text-[#37424F] hover:border-sage hover:bg-sage/20 hover:text-navy-darkest"
                          }`}
                        >
                          <span>{child.label}</span>
                          <span
                            aria-hidden="true"
                            className={`text-[12px] transition-opacity ${
                              activeChildId === child.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === "industries" && (
              <div className="grid grid-cols-2 gap-x-10 gap-y-1">
                {INDUSTRY_CHILDREN.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    onClick={onClose}
                    onMouseEnter={() => setActiveChildId(child.id)}
                    onFocus={() => setActiveChildId(child.id)}
                    className={`group flex items-center justify-between gap-2 rounded-lg border-l-[3px] px-3.5 py-2.5 text-[14px] transition-colors ${
                      activeChildId === child.id
                        ? "border-sage bg-sage/30 text-navy-darkest"
                        : "border-transparent text-[#37424F] hover:border-sage hover:bg-sage/20 hover:text-navy-darkest"
                    }`}
                  >
                    <span>{child.label}</span>
                    <span
                      aria-hidden="true"
                      className={`text-[12px] transition-opacity ${
                        activeChildId === child.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {activeCategory === "insights" && (
              <div className="grid grid-cols-2 gap-x-10 gap-y-1">
                {INSIGHT_CHILDREN.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    onClick={onClose}
                    onMouseEnter={() => setActiveChildId(child.id)}
                    onFocus={() => setActiveChildId(child.id)}
                    className={`group flex items-center justify-between gap-2 rounded-lg border-l-[3px] px-3.5 py-2.5 text-[14px] transition-colors ${
                      activeChildId === child.id
                        ? "border-sage bg-sage/30 text-navy-darkest"
                        : "border-transparent text-[#37424F] hover:border-sage hover:bg-sage/20 hover:text-navy-darkest"
                    }`}
                  >
                    <span>{child.label}</span>
                    <span
                      aria-hidden="true"
                      className={`text-[12px] transition-opacity ${
                        activeChildId === child.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {activeCategory === "about" && (
              <div className="flex flex-col gap-1">
                {ABOUT_CHILDREN.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    onClick={onClose}
                    className="group flex items-center justify-between gap-2 rounded-lg border-l-[3px] border-transparent px-3.5 py-2.5 text-[14px] font-medium text-[#37424F] transition-colors hover:border-sage hover:bg-sage/20 hover:text-navy-darkest"
                  >
                    <span>{child.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-[12px] opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {showPreview && activeChild && (
            <div className="relative ml-8 w-[320px] flex-none overflow-hidden rounded-3xl bg-navy-darkest">
              {activeChild.image ? (
                <img
                  src={encodeURI(activeChild.image)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(2,16,36,.92) 0%, rgba(2,16,36,.5) 40%, rgba(2,16,36,.05) 70%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6">
                <h4 className="font-[var(--font-heading)] text-[1.3rem] font-semibold leading-[1.2] text-white">
                  {activeChild.label}
                </h4>
                {activeChild.featuredHeadline && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[.1em] text-blue-mid">
                      Featured insight
                    </span>
                    <p className="text-[13px] font-semibold leading-[1.4] text-white line-clamp-2">
                      {activeChild.featuredHeadline}
                    </p>
                  </div>
                )}
                {activeChild.blurb && (
                  <p className="text-[12px] leading-[1.45] text-[#C3D0DF] line-clamp-2">{activeChild.blurb}</p>
                )}
                <Link
                  href={activeChild.href}
                  onClick={onClose}
                  className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-olive px-4 py-2 text-[12px] font-bold text-navy-darkest transition-colors hover:bg-olive-hover"
                >
                  Explore <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 6l12 12" />
      <path d="M6 18L18 6" />
    </svg>
  );
}
