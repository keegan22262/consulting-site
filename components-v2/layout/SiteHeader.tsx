"use client";

import React, { useState, useEffect, useRef, type JSX } from "react";
import SearchOverlay from "@/components-v2/layout/SearchOverlay";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/coverage", label: "Coverage" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showFullNav, setShowFullNav] = useState(true);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const navLinkClass = (path: string) =>
    `text-sm font-medium tracking-wide transition-colors duration-200 ${
      isActive(path) ? "text-white" : "text-white/85 hover:text-white"
    }`;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY <= 12) {
        setShowFullNav(true);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY > lastScrollY.current + 4) {
        setShowFullNav(false);
      } else if (currentY < lastScrollY.current - 4) {
        setShowFullNav(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showDesktopNav = showFullNav;
  const showDesktopActions = showFullNav;
  const showHamburger = !showFullNav;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-transparent" />
        <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:h-18 lg:h-22 lg:px-8">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.14em] text-white uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
          >
            RILL SINGH LIMITED
          </Link>

          <nav
            className={`hidden items-center gap-8 transition-all duration-200 md:flex ${
              showDesktopNav ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div
              className={`hidden items-center gap-3 transition-all duration-200 md:flex ${
                showDesktopActions ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/5 text-white transition hover:bg-white/15"
              >
                <SearchIcon />
              </button>
              <Link
                href="/how-we-work"
                className="inline-flex h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-[#0C1C2E] transition hover:bg-[#EEF3F8]"
              >
                See How We Deliver
              </Link>
            </div>

            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/5 text-white transition hover:bg-white/15 md:hidden ${
                showHamburger ? "md:inline-flex" : "md:hidden"
              }`}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <span className="sr-only">Open menu</span>
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="mt-1.5 block h-0.5 w-5 rounded-full bg-current" />
              <span className="mt-1.5 block h-0.5 w-5 rounded-full bg-current" />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className={`absolute inset-0 bg-[rgba(10,10,10,0.4)] transition-opacity duration-200 ease ${
              drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className={`relative bg-white w-[320px] max-w-full h-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] transform transition-transform duration-250 ease-out ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full p-8 gap-8">
              <button
                type="button"
                className="self-end text-sm font-medium text-neutral-800 transition hover:text-accent-700"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
              <nav className="flex flex-col gap-6 text-h3 text-neutral-800">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-accent-700 transition-colors"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}