"use client";


import React, { useState, useEffect, type JSX } from "react";
import SearchOverlay from "@/components-v2/layout/SearchOverlay";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <header className={`sticky top-0 z-50 bg-white h-20 transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}> 
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="font-bold text-lg tracking-tight text-gray-900">Rill Singh Limited</div>
          {/* Desktop Navigation + CTA + Search */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <nav className="flex items-center space-x-8">
              <button
                type="button"
                className={`transition-colors ${isActive("/services") ? "text-accent-primary font-medium" : "text-text-secondary hover:text-accent-primary"}`}
                onClick={() => setSubMenu(subMenu === "services" ? null : "services")}
              >
                Services
              </button>
              <button
                type="button"
                className={`transition-colors ${isActive("/industries") ? "text-accent-primary font-medium" : "text-text-secondary hover:text-accent-primary"}`}
                onClick={() => setSubMenu(subMenu === "industries" ? null : "industries")}
              >
                Industries
              </button>
              <Link href="/insights" className={`transition-colors ${isActive("/insights") ? "text-accent-primary font-medium" : "text-text-secondary hover:text-accent-primary"}`}>Insights</Link>
              <Link href="/about" className={`transition-colors ${isActive("/about") ? "text-accent-primary font-medium" : "text-text-secondary hover:text-accent-primary"}`}>About</Link>
            </nav>
            <button
              type="button"
              className="ml-4 px-4 py-2 rounded-card bg-white border border-accentSemantic-primary text-accentSemantic-primary font-semibold hover:bg-accentSemantic-primary hover:text-white transition-colors"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              Search
            </button>
            <Link
              href={ctaSwitched ? "/contact" : "/services"}
              className="ml-2 px-5 py-2 rounded-card bg-accentSemantic-primary text-white font-semibold hover:bg-accentSemantic-hover transition-colors"
            >
              {ctaSwitched ? "Schedule an Introduction" : "See How We Deliver"}
            </Link>
          </div>
          {/* Desktop Submenus */}
          {subMenu === "services" && (
            <div
              className={`hidden md:block absolute top-20 left-0 w-full bg-white shadow-lg z-40 transition-fast ease-standard transform
                ${subMenu === "services" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
              style={{ transitionDuration: "120ms" }}
            >
              <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold mb-2">Services</div>
                  <ul className="space-y-2">
                    <li><Link href="/services/strategy" className="text-text-secondary hover:text-accent-primary transition-colors">Strategy</Link></li>
                    <li><Link href="/services/advisory" className="text-text-secondary hover:text-accent-primary transition-colors">Advisory</Link></li>
                    <li><Link href="/services/operations" className="text-text-secondary hover:text-accent-primary transition-colors">Operations</Link></li>
                    <li><Link href="/services/transformation" className="text-text-secondary hover:text-accent-primary transition-colors">Transformation</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {subMenu === "industries" && (
            <div
              className={`hidden md:block absolute top-20 left-0 w-full bg-white shadow-lg z-40 transition-fast ease-standard transform
                ${subMenu === "industries" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
              style={{ transitionDuration: "120ms" }}
            >
              <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 gap-8">
                <div>
                  <div className="font-semibold mb-2">Industries</div>
                  <ul className="space-y-2">
                    <li><Link href="/industries/finance" className="text-text-secondary hover:text-accent-primary transition-colors">Finance</Link></li>
                    <li><Link href="/industries/healthcare" className="text-text-secondary hover:text-accent-primary transition-colors">Healthcare</Link></li>
                    <li><Link href="/industries/technology" className="text-text-secondary hover:text-accent-primary transition-colors">Technology</Link></li>
                    <li><Link href="/industries/retail" className="text-text-secondary hover:text-accent-primary transition-colors">Retail</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          {/* Search Overlay */}
          <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-700 hover:text-blue-600 text-base font-medium"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>
      {/* Drawer Panel */}
      {drawerOpen && (
        <div
          className={`fixed inset-0 z-50 flex justify-end transition-fast ease-standard ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ transitionDuration: "120ms" }}
        >
          <div
            className={`bg-white w-64 h-full shadow-lg transform transition-fast ease-standard ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
            style={{ transitionDuration: "120ms" }}
          >
            <div className="flex flex-col h-full p-6">
              <button
                type="button"
                className="self-end mb-8 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                Close
              </button>
              <nav className="flex flex-col space-y-6 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
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