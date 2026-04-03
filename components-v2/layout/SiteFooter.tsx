import Link from "next/link";

const COLUMN_1_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
] as const;

const COLUMN_2_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export default function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#021024" }}>
      {/* Separator line from CTA section above */}
      <div
        className="mx-auto w-full max-w-[1280px] px-6 lg:px-8"
        style={{ borderTop: "1px solid rgba(125,160,202,0.15)" }}
      >
        {/* ═══ TOP ROW ═══ */}
        <div
          className="flex flex-col lg:flex-row gap-8 lg:gap-0"
          style={{ paddingTop: "48px" }}
        >
          {/* Left 55% — Brand */}
          <div className="lg:w-[55%]">
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "22px",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              Rill Singh Limited
            </span>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "#7DA0CA",
                lineHeight: 1.6,
                maxWidth: "400px",
              }}
            >
              Pan-African institutional advisory. Precision-led consulting for growth,
              transformation, and execution.
            </p>
          </div>

          {/* Right 45% — Quick links in 2 columns */}
          <div className="lg:w-[45%] flex gap-16">
            <div className="flex flex-col gap-3">
              {COLUMN_1_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-300 hover:text-white"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {COLUMN_2_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-300 hover:text-white"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ MIDDLE ROW ═══ */}
        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid rgba(125,160,202,0.1)",
            padding: "20px 0",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "#7DA0CA",
                }}
              >
                Follow us
              </span>
              <Link
                href="https://www.linkedin.com/company/rill-singh-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 hover:opacity-80"
              >
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "#7DA0CA",
              }}
            >
              Nairobi, Kenya
            </span>
          </div>
        </div>

        {/* ═══ BOTTOM ROW ═══ */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ paddingBottom: "32px" }}
        >
          <div className="flex items-center gap-1">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-1">
                {i > 0 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }} aria-hidden="true">·</span>
                )}
                <Link
                  href={link.href}
                  className="transition-colors duration-300 hover:text-white"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            &copy; {new Date().getFullYear()} Rill Singh Limited
          </span>
        </div>
      </div>
    </footer>
  );
}
