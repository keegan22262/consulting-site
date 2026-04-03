"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "@/lib/breakpoints";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchOverlay from "@/components-v2/layout/SearchOverlay";

const NAV_LINKS_DESKTOP = ["Industries", "Services", "Insights", "Coverage", "About", "Careers", "Contact"] as const;
const NAV_LINKS_MOBILE = ["Industries", "Services", "About", "Insights", "Coverage", "Careers", "Contact"] as const;

const NAV_HREFS: Record<string, string> = {
  Industries: "/industries",
  Services: "/services",
  Insights: "/insights",
  Coverage: "/coverage",
  About: "/about",
  Careers: "/careers",
  Contact: "/contact",
};

const NAV_SUB_SERVICES = [
  { label: "Strategy & Corporate Transformation", href: "/services/strategy" },
  { label: "Digital & AI Transformation", href: "/services/digital" },
  { label: "Financial Advisory, Audit & Risk", href: "/services/financial" },
  { label: "People & Organization", href: "/services/people" },
  { label: "Sustainability & ESG", href: "/services/sustainability" },
  { label: "Public Sector Advisory", href: "/services/public-sector" },
  { label: "Digital Communication", href: "/services/communication" },
  { label: "Tax & Asset Management", href: "/services/tax" },
  { label: "Legal & Regulatory", href: "/services/legal" },
  { label: "SME Development", href: "/services/sme" },
] as const;

const NAV_SUB_INDUSTRIES = [
  { label: "Financial Services", href: "/industries/financial-services" },
  { label: "Technology, Media & Telecommunications", href: "/industries/technology-digital" },
  { label: "Energy & Natural Resources", href: "/industries/energy-resources" },
  { label: "Healthcare & Life Sciences", href: "/industries/healthcare-life-sciences" },
  { label: "Public Sector & Government", href: "/industries/public-sector-government" },
  { label: "Industrials & Manufacturing", href: "/industries/industrials-manufacturing" },
  { label: "Consumer & Retail", href: "/industries/consumer-retail" },
  { label: "Transportation & Logistics", href: "/industries/transport-logistics" },
  { label: "Real Estate & Infrastructure", href: "/industries/real-estate-infrastructure" },
  { label: "Private Capital", href: "/industries/private-capital" },
  { label: "Education & Social Impact", href: "/industries/education" },
] as const;

// Add MEGA_NAV_LINKS definition
const MEGA_NAV_LINKS = new Set(["Industries", "Services", "Insights"]);

const MEGA_INDUSTRIES = {
  items: NAV_SUB_INDUSTRIES,
  relatedServices: [
    { label: "Strategy & Corporate Transformation", href: "/services/strategy" },
    { label: "Digital & AI Transformation", href: "/services/digital" },
    { label: "Financial Advisory, Audit & Risk", href: "/services/financial" },
  ],
  relatedInsights: [
    { label: "AI Readiness in Banking", href: "/insights/ai-readiness-assessment" },
    { label: "Corridor-Led Development", href: "/insights/corridor-led-development" },
    { label: "Renewable Energy Transition", href: "/insights/renewable-energy-transition" },
  ],
} as const;

const MEGA_SERVICES = {
  items: NAV_SUB_SERVICES,
  relatedIndustries: [
    { label: "Financial Services", href: "/industries/financial-services" },
    { label: "Energy & Natural Resources", href: "/industries/energy-resources" },
    { label: "Technology, Media & Telecom", href: "/industries/technology-digital" },
  ],
  relatedInsights: [
    { label: "Scaling Advisory-Led Growth", href: "/insights/scaling-advisory-led-growth" },
    { label: "Capital Structure Optimization", href: "/insights/capital-structure-optimization" },
    { label: "Digital Government Transformation", href: "/insights/renewable-energy-transition" },
  ],
} as const;

const MEGA_INSIGHTS = {
  categories: [
    { label: "Latest Thinking", href: "/insights" },
    { label: "Industry Insights", href: "/insights" },
    { label: "Research Reports", href: "/insights" },
    { label: "Transformation Perspectives", href: "/insights" },
  ],
  featured: [
    {
      title: "AI Readiness Assessment for African Enterprises",
      category: "Technology",
      href: "/insights/ai-readiness-assessment",
    },
    {
      title: "Corridor-Led Development: Unlocking Continental Trade Routes",
      category: "Infrastructure",
      href: "/insights/corridor-led-development",
    },
    {
      title: "Renewable Energy Transition and Institutional Readiness",
      category: "Public Policy",
      href: "/insights/renewable-energy-transition",
    },
  ],
} as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile" || bp === "tablet";
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [megaPanel, setMegaPanel] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activePage = NAV_LINKS_DESKTOP.find((label) => {
    const href = NAV_HREFS[label];
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setNavCollapsed(scrollY > 0);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolledPast(docHeight > 0 && scrollY / docHeight > 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const drawerOpenSafe = isMobile || navCollapsed ? drawerOpen : false;

  useEffect(() => {
    if (drawerOpenSafe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpenSafe]);

  useEffect(() => {
    const onScroll = () => {
      if (megaPanel) setMegaPanel(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [megaPanel]);

  const isInsightsPage = activePage === "Insights";
  const dynamicLabel = "Schedule an Introduction";
  const dynamicTo = "/contact";
  const hamburgerClassName =
    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg ring-1 ring-black/10 transition-transform duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03]";

  const handleLinkEnter = (link: string) => {
    setHoveredLink(link);
    if (MEGA_NAV_LINKS.has(link)) {
      if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
      setMegaPanel(link);
    }
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => {
      setMegaPanel(null);
    }, 150);
  };

  const handleMegaPanelEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
  };

  const handleMegaPanelLeave = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    megaTimeoutRef.current = setTimeout(() => {
      setMegaPanel(null);
      setHoveredLink(null);
    }, 100);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-300"
        style={{ boxShadow: "none", borderBottom: "none" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--a700]"
          >
            Rill Singh Limited
          </Link>

          {!isMobile ? (
            navCollapsed ? (
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className={hamburgerClassName}
              >
                <MenuIcon />
              </button>
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-6">
                  {NAV_LINKS_DESKTOP.map((link) => {
                    const href = NAV_HREFS[link] || "#";
                    const isActive = link === activePage;
                    const isHovered = hoveredLink === link;
                    const hasMega = MEGA_NAV_LINKS.has(link);
                    return (
                      <Link
                        key={link}
                        href={href}
                        onMouseEnter={() => handleLinkEnter(link)}
                        onMouseLeave={handleLinkLeave}
                        className={`inline-flex items-center gap-1 border-b pb-1 text-[0.75rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                          isActive
                            ? "border-[--a700] text-white"
                            : isHovered
                              ? "border-neutral-500 text-white"
                              : "border-transparent text-white/80"
                        }`}
                      >
                        {link}
                        {hasMega && <ChevronDownIcon />}
                      </Link>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search"
                    className="inline-flex items-center justify-center text-white/80"
                  >
                    <SearchIcon />
                  </button>
                  <Link
                    href={dynamicTo}
                    className="rounded-card bg-[--a700] px-4 py-3 text-[0.75rem] font-semibold text-white transition-colors duration-120 hover:bg-[--a800]"
                  >
                    {dynamicLabel}
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="inline-flex items-center justify-center text-white/80"
              >
                <SearchIcon />
              </button>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className={hamburgerClassName}
              >
                <MenuIcon />
              </button>
            </div>
          )}
        </div>
      </nav>

      {!isMobile && megaPanel && (
        <MegaNavPanel
          activePanel={megaPanel}
          onMouseEnter={handleMegaPanelEnter}
          onMouseLeave={handleMegaPanelLeave}
        />
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {(isMobile || navCollapsed) && (
        <MobileDrawer
          open={drawerOpenSafe}
          onClose={() => setDrawerOpen(false)}
          activePage={activePage}
        />
      )}
    </>
  );
}

function MegaNavPanel({
  activePanel,
  onMouseEnter,
  onMouseLeave,
}: {
  activePanel: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const content =
    activePanel === "Industries" ? (
      <MegaIndustriesContent />
    ) : activePanel === "Services" ? (
      <MegaServicesContent />
    ) : (
      <MegaInsightsContent />
    );

  return (
    <div
      className="fixed inset-x-0 top-16 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">{content}</div>
    </div>
  );
}

function MegaIndustriesContent() {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div>
        <MegaSectionLabel label="Industries" href="/industries" />
        <div className="mt-4 flex flex-col">
          {MEGA_INDUSTRIES.items.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
      <div>
        <MegaSectionLabel label="Relevant Services" href="/services" />
        <div className="mt-4 flex flex-col">
          {MEGA_INDUSTRIES.relatedServices.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/services" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all services -&gt;
        </Link>
      </div>
      <div>
        <MegaSectionLabel label="Related Insights" href="/insights" />
        <div className="mt-4 flex flex-col">
          {MEGA_INDUSTRIES.relatedInsights.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/insights" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all insights -&gt;
        </Link>
      </div>
    </div>
  );
}

function MegaServicesContent() {
  return (
    <div className="grid grid-cols-3 gap-10">
      <div>
        <MegaSectionLabel label="Services" href="/services" />
        <div className="mt-4 flex flex-col">
          {MEGA_SERVICES.items.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
      <div>
        <MegaSectionLabel label="Relevant Industries" href="/industries" />
        <div className="mt-4 flex flex-col">
          {MEGA_SERVICES.relatedIndustries.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/industries" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all industries -&gt;
        </Link>
      </div>
      <div>
        <MegaSectionLabel label="Related Insights" href="/insights" />
        <div className="mt-4 flex flex-col">
          {MEGA_SERVICES.relatedInsights.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <Link href="/insights" className="mt-4 inline-block text-[0.75rem] font-semibold text-[--a700]">
          View all insights -&gt;
        </Link>
      </div>
    </div>
  );
}

function MegaInsightsContent() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-12">
      <div>
        <MegaSectionLabel label="Insights Categories" href="/insights" />
        <div className="mt-4 flex flex-col">
          {MEGA_INSIGHTS.categories.map((item) => (
            <MegaNavItem key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
      </div>
      <div>
        <MegaSectionLabel label="Featured Insights" href="/insights" />
        <div className="mt-4 grid grid-cols-3 gap-6">
          {MEGA_INSIGHTS.featured.map((insight) => (
            <MegaInsightCard key={insight.title} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MegaSectionLabel({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block border-b border-neutral-200 pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[--a700]"
    >
      {label}
    </Link>
  );
}

function MegaNavItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="block py-2 text-[0.75rem] text-neutral-700 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[--a700]"
    >
      {label}
    </Link>
  );
}

function MegaInsightCard({
  insight,
}: {
  insight: { title: string; category: string; href: string };
}) {
  return (
    <Link
      href={insight.href}
      className="group block rounded-card border border-neutral-200 px-4 py-4 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-neutral-300"
    >
      <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.04em] text-[--a700]">
        {insight.category}
      </span>
      <span className="mt-2 block text-[0.75rem] font-medium leading-[1.4] text-neutral-900 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-[--a700]">
        {insight.title}
      </span>
      <span className="mt-3 inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[--a700]">
        Read -&gt;
      </span>
    </Link>
  );
}

function MobileDrawer({
  open,
  onClose,
  activePage,
}: {
  open: boolean;
  onClose: () => void;
  activePage?: string;
}) {
  const [subMenu, setSubMenu] = useState<"Services" | "Industries" | "Insights" | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and ESC
  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
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

  const handleClose = () => {
    setSubMenu(null);
    onClose();
    // Restore focus to hamburger button
    if (hamburgerButtonRef.current) {
      hamburgerButtonRef.current.focus();
    }
    document.body.style.overflow = "";
  };

  const subItems =
    subMenu === "Services"
      ? NAV_SUB_SERVICES
      : subMenu === "Industries"
        ? NAV_SUB_INDUSTRIES
        : subMenu === "Insights"
          ? MEGA_INSIGHTS.categories
          : [];

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-[rgba(10,10,10,0.4)] transition-opacity duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Navigation menu"
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-90 flex-col bg-white transition-opacity duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-neutral-900">
            Menu
          </span>
          <button type="button" onClick={handleClose} aria-label="Close menu" className="text-neutral-900">
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {subMenu === null ? (
            <div className="flex flex-col">
              {NAV_LINKS_MOBILE.map((link) => {
                const hasSubMenu = link === "Services" || link === "Industries" || link === "Insights";
                const isActive = link === activePage;
                if (hasSubMenu) {
                  return (
                    <button
                      key={link}
                      type="button"
                      onClick={() => setSubMenu(link)}
                      className={`flex w-full items-center justify-between px-6 py-4 text-left text-[0.9375rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50 ${
                        isActive ? "font-semibold text-[--a700]" : "text-neutral-900"
                      }`}
                    >
                      {link}
                      <ChevronRightIcon />
                    </button>
                  );
                }
                return (
                  <Link
                    key={link}
                    href={NAV_HREFS[link] || "#"}
                    onClick={handleClose}
                    className={`block px-6 py-4 text-[0.9375rem] transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50 ${
                      isActive ? "font-semibold text-[--a700]" : "text-neutral-900"
                    }`}
                  >
                    {link}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setSubMenu(null)}
                className="flex items-center gap-2 px-6 pb-4 pt-3 text-[0.75rem] font-semibold uppercase tracking-[0.04em] text-[--a700]"
              >
                <ChevronLeftIcon />
                Back
              </button>
              <div className="border-b border-neutral-200 px-6 pb-4 text-[0.9375rem] font-semibold text-neutral-900">
                {subMenu}
              </div>
              <Link
                href={NAV_HREFS[subMenu] || "#"}
                onClick={handleClose}
                className="block px-6 pb-3 pt-4 text-[0.75rem] font-semibold text-[--a700]"
              >
                View all {subMenu.toLowerCase()} -&gt;
              </Link>
              {subItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleClose}
                  className="block px-6 py-3 text-[0.9375rem] text-neutral-700 transition-colors duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-neutral-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 px-6 py-5">
          <Link
            href="/contact"
            onClick={handleClose}
            className="block rounded-card bg-[--a700] px-6 py-3 text-center text-[0.9375rem] font-semibold text-white"
          >
            Schedule an Introduction
          </Link>
        </div>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
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

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}