import Image from "next/image";
import Link from "next/link";

const SITEMAP_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
] as const;

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "Coverage", href: "/coverage" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

const groupLabelClass =
  "mb-3 block font-[var(--font-body)] text-[12px] font-bold uppercase tracking-[0.1em] text-[#021024]";

const navLinkClass =
  "group flex w-fit items-center gap-1.5 py-1 font-[var(--font-body)] text-[14px] font-semibold text-[#021024] transition-transform duration-200 hover:translate-x-0.5";

const navLinkArrowClass =
  "text-[12px] opacity-0 transition-opacity duration-200 group-hover:opacity-100";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#F7F6F2" }}>
      <div className="relative z-[2] mx-auto w-full max-w-[72rem] px-6 pt-20 lg:px-16">
        <div className="flex flex-col gap-12 pb-16 sm:flex-row sm:flex-wrap sm:gap-x-20 sm:gap-y-10">
          <div className="max-w-[320px]">
            <p className="font-[var(--font-body)] text-[14px] font-semibold leading-[1.6] text-[#021024]">
              Pan-African institutional advisory. Precision-led consulting for growth,
              transformation, and execution.
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[13px] font-semibold leading-[1.6] text-[#021024]/70">
              Nairobi, Kenya
            </p>
          </div>

          <nav aria-label="Sitemap">
            <span className={groupLabelClass}>Sitemap</span>
            {SITEMAP_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={navLinkClass}>
                <span>{link.label}</span>
                <span aria-hidden="true" className={navLinkArrowClass}>→</span>
              </Link>
            ))}
          </nav>

          <nav aria-label="Company">
            <span className={groupLabelClass}>Company</span>
            {COMPANY_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={navLinkClass}>
                <span>{link.label}</span>
                <span aria-hidden="true" className={navLinkArrowClass}>→</span>
              </Link>
            ))}
          </nav>

          <div className="sm:ml-auto">
            <span className={groupLabelClass}>Follow us</span>
            <Link
              href="https://www.linkedin.com/company/rill-singh-limited"
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
              <span aria-hidden="true" className={navLinkArrowClass}>→</span>
            </Link>
            <Link
              href="https://wa.me/254793995142"
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
              <span aria-hidden="true" className={navLinkArrowClass}>→</span>
            </Link>
          </div>
        </div>

        <div className="relative z-[2] flex flex-col items-start gap-8 border-t border-[#021024]/12 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/images/logo/Lockup_Horizontal_Navy.png"
            alt="Rill Singh Limited"
            width={1800}
            height={560}
            className="h-12 w-auto sm:h-14"
          />
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-[var(--font-body)] text-[14px] font-semibold text-[#021024] transition-transform hover:translate-x-0.5 hover:underline"
          >
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative z-[2] flex flex-col gap-4 border-t border-[#021024]/12 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-[var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.04em] text-[#021024] underline underline-offset-4 transition-all duration-300 hover:underline-offset-[6px]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <span className="font-[var(--font-body)] text-[13px] font-semibold text-[#021024]/75">
            &copy; {new Date().getFullYear()} Rill Singh Limited
          </span>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5 1.12 1 2.5 1s2.48 1.119 2.48 2.5zM.222 8.222h4.44V23H.222V8.222zM8.222 8.222h4.256v2.017h.06c.593-1.122 2.04-2.305 4.2-2.305 4.49 0 5.317 2.956 5.317 6.803V23h-4.44v-6.94c0-1.655-.03-3.782-2.305-3.782-2.306 0-2.66 1.8-2.66 3.66V23H8.222V8.222z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.6 14.13c-.24.67-1.17 1.24-1.93 1.4-.52.11-1.2.2-3.48-.75-2.92-1.21-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.11.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.52.72 1.78.85.26.13.43.19.5.3.07.11.07.63-.17 1.3z" />
    </svg>
  );
}
