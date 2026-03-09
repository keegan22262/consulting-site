"use client";


import React, { useState, useEffect, type JSX } from "react";
import SearchOverlay from "@/components-v2/layout/SearchOverlay";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components-v2/ui/Button";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export default function SiteHeader(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<null | "services" | "industries">(null);
  const [scrolled, setScrolled] = useState(false);
  const [ctaSwitched, setCtaSwitched] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (path: string) =>
    `text-h3 transition-colors duration-200 ${
      isActive(path) ? "text-accent-800 font-semibold" : "text-neutral-800 hover:text-accent-700"
    }`;

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setCtaSwitched(scrollPercent > 0.5);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors transition-shadow duration-200 ${
          scrolled ? "bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]" : "bg-transparent shadow-none"
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-6 lg:px-8 h-[64px] md:h-[72px] lg:h-[88px] flex items-center justify-between">
          <Link href="/" className="font-semibold text-h3 tracking-tight text-neutral-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm">
            Rill Singh Limited
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-10">
              <Button
                variant="text"
                className={navLinkClass("/services")}
                onClick={() => setSubMenu(subMenu === "services" ? null : "services")}
              >
                Services
              </Button>
              <Button
                variant="text"
                className={navLinkClass("/industries")}
                onClick={() => setSubMenu(subMenu === "industries" ? null : "industries")}
              >
                Industries
              </Button>
              <Link href="/insights" className={navLinkClass("/insights")}>
                Insights
              </Link>
              <Link href="/about" className={navLinkClass("/about")}>
                About
              </Link>
            </nav>
            <Button
              variant="secondary"
              className="h-[40px] md:h-[44px] lg:h-[48px]"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              Search
            </Button>
            <Button
              href={ctaSwitched ? "/contact" : "/services"}
              variant="primary"
            >
              {ctaSwitched ? "Schedule an Introduction" : "See How We Deliver"}
            </Button>
          </div>

          <Button
            variant="secondary"
            className="lg:hidden h-10 w-10 px-0"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span className="sr-only">Open menu</span>
            <span className="block h-[2px] w-5 bg-current rounded-full" />
            <span className="block h-[2px] w-5 bg-current rounded-full mt-1.5" />
            <span className="block h-[2px] w-5 bg-current rounded-full mt-1.5" />
          </Button>
        </div>
      </header>

      {subMenu === "services" && (
        <div
          className={`hidden lg:block absolute left-0 w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-40 transition-all duration-[200ms] ease-out md:top-[72px] lg:top-[88px] ${
            subMenu === "services" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6 grid grid-cols-2 gap-8">
            <div>
              <div className="font-semibold text-neutral-900 mb-3">Services</div>
              <ul className="space-y-2 text-neutral-800">
                <li>
                  <Link href="/services/strategy" className="hover:text-accent-700 transition-colors">
                    Strategy
                  </Link>
                </li>
                <li>
                  <Link href="/services/advisory" className="hover:text-accent-700 transition-colors">
                    Advisory
                  </Link>
                </li>
                <li>
                  <Link href="/services/operations" className="hover:text-accent-700 transition-colors">
                    Operations
                  </Link>
                </li>
                <li>
                  <Link href="/services/transformation" className="hover:text-accent-700 transition-colors">
                    Transformation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {subMenu === "industries" && (
        <div
          className={`hidden lg:block absolute left-0 w-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] z-40 transition-all duration-[200ms] ease-out md:top-[72px] lg:top-[88px] ${
            subMenu === "industries" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6 grid grid-cols-2 gap-8">
            <div>
              <div className="font-semibold text-neutral-900 mb-3">Industries</div>
              <ul className="space-y-2 text-neutral-800">
                <li>
                  <Link href="/industries/finance" className="hover:text-accent-700 transition-colors">
                    Finance
                  </Link>
                </li>
                <li>
                  <Link href="/industries/healthcare" className="hover:text-accent-700 transition-colors">
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link href="/industries/technology" className="hover:text-accent-700 transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/industries/retail" className="hover:text-accent-700 transition-colors">
                    Retail
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className={`absolute inset-0 bg-[rgba(10,10,10,0.4)] transition-opacity duration-[200ms] ease ${
              drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className={`relative bg-white w-[320px] max-w-full h-full shadow-[0_1px_2px_rgba(0,0,0,0.05)] transform transition-transform duration-[250ms] ease-out ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full p-8 gap-8">
              <Button
                variant="text"
                className="self-end text-neutral-800 hover:text-accent-700"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                Close
              </Button>
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