"use client";

import React, { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "@/lib/breakpoints";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = ["Services", "Industries", "Insights", "About"] as const;

const NAV_HREFS: Record<string, string> = {
  Services: "/services",
  Industries: "/industries",
  Insights: "/insights",
  About: "/about",
};

const HERO_SELECTOR = "[data-homepage-hero]";

export default function SiteHeader() {
  const pathname = usePathname();
  const bp = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(false);
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
    const onScroll = () => {
      setNavCollapsed(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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

  const isMobileViewport = hasMounted && (bp === "mobile" || bp === "tablet");
  const drawerOpenSafe = isMobileViewport || navCollapsed ? drawerOpen : false;

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

  const dynamicLabel = "Schedule an Introduction";
  const dynamicTo = "/contact";
  const hamburgerClassName =
    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-neutral-900 shadow-lg ring-1 ring-black/10 transition-transform duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.03]";

  const navTextClass = isSolid ? "text-[#052659]" : "text-blue-light";

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isSolid ? "bg-[--color-paper] shadow-sm" : "bg-transparent"
        }`}
        style={{
          borderBottom: isSolid ? "1px solid rgba(2,16,36,.08)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex h-[clamp(64px,56px+2.222vw,88px)] w-full max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Rill Singh Limited"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--a700]"
          >
            <Image
              src={
                isSolid
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

          {!isMobileViewport ? (
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
                  {NAV_LINKS.map((link) => {
                    const href = NAV_HREFS[link];
                    const isActive = link === activePage;
                    return (
                      <Link
                        key={link}
                        href={href}
                        className={`inline-flex items-center border-b pb-1 text-[0.75rem] transition-colors duration-150 ${
                          isActive
                            ? "border-[#B08858] text-[#B08858]"
                            : `border-transparent ${navTextClass} hover:border-[#B08858] hover:text-[#B08858]`
                        }`}
                      >
                        {link}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href={dynamicTo}
                  className={`rounded-card border px-4 py-3 text-[0.75rem] font-semibold transition-colors duration-120 ${
                    isSolid
                      ? "border-transparent bg-terracotta text-navy-darkest hover:bg-terracotta-hover"
                      : "border-white/90 bg-transparent text-white hover:bg-white/12"
                  }`}
                >
                  {dynamicLabel}
                </Link>
              </div>
            )
          ) : (
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className={hamburgerClassName}
            >
              <MenuIcon />
            </button>
          )}
        </div>
      </nav>

      {(isMobileViewport || navCollapsed) && (
        <MobileDrawer open={drawerOpenSafe} onClose={() => setDrawerOpen(false)} activePage={activePage} />
      )}
    </>
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
    onClose();
    // Restore focus to hamburger button
    if (hamburgerButtonRef.current) {
      hamburgerButtonRef.current.focus();
    }
    document.body.style.overflow = "";
  };

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
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const isActive = link === activePage;
              return (
                <Link
                  key={link}
                  href={NAV_HREFS[link]}
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
        </div>

        <div className="border-t border-neutral-200 px-6 py-5">
          <Link
            href="/contact"
            onClick={handleClose}
            className="block rounded-card bg-terracotta px-6 py-3 text-center text-[0.9375rem] font-semibold text-white hover:bg-terracotta-hover"
          >
            Schedule an Introduction
          </Link>
        </div>
      </div>
    </>
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
