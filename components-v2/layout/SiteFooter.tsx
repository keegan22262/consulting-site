import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Coverage", href: "/coverage" },
  { label: "Contact", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="bg-white" style={{ borderTop: "1px solid #E0E0E0" }}>
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-8" style={{ paddingTop: 40, paddingBottom: 32 }}>
        {/* Section 1: Logo + Follow Us */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: "#0A1628", fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Rill Singh Limited
          </span>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-medium uppercase"
              style={{ letterSpacing: "3px", color: "#888" }}
            >
              Follow Us
            </span>
            <Link
              href="https://www.linkedin.com/company/rill-singh-limited"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-[#0A1628]"
              style={{ color: "#888" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* Section 2: Compact Nav Row */}
        <nav className="flex flex-wrap items-center gap-x-1 gap-y-2" style={{ marginTop: 22 }}>
          {NAV_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-xs" style={{ color: "#CCC" }} aria-hidden="true">&middot;</span>
              )}
              <Link
                href={link.href}
                className="text-[13px] font-medium uppercase transition-colors duration-150 hover:text-[#0A1628]"
                style={{ letterSpacing: "2px", color: "#888" }}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Section 3: Legal Links Row */}
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2" style={{ marginTop: 20 }}>
          {LEGAL_LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-xs" style={{ color: "#CCC" }} aria-hidden="true">&middot;</span>
              )}
              <Link
                href={link.href}
                className="text-xs transition-colors duration-150 hover:text-[#0A1628]"
                style={{ color: "#999" }}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        {/* Section 4: Tagline + Copyright */}
        <p className="text-[13px] leading-relaxed" style={{ marginTop: 24, color: "#888" }}>
          Pan-African institutional advisory. Precision-led consulting for growth, transformation, and execution.
        </p>
        <p className="text-xs" style={{ marginTop: 8, color: "#AAA" }}>
          &copy; {new Date().getFullYear()} Rill Singh Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
