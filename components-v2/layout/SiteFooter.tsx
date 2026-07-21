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
  "mb-3 block font-[var(--font-body)] text-[12px] font-bold uppercase tracking-[0.1em] text-[#021024]/60";

const navLinkClass =
  "block font-[var(--font-body)] text-[14px] font-semibold leading-[1.9] text-[#021024]/85 transition-colors duration-300 hover:text-[#021024] hover:underline";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#F7F6F2" }}>
      <div className="relative z-[2] mx-auto w-full max-w-[72rem] px-6 pt-20 lg:px-16">
        <div className="flex flex-col gap-12 pb-16 sm:flex-row sm:flex-wrap sm:gap-x-20 sm:gap-y-10">
          <div className="max-w-[320px]">
            <p className="font-[var(--font-body)] text-[14px] font-semibold leading-[1.6] text-[#021024]/85">
              Pan-African institutional advisory. Precision-led consulting for growth,
              transformation, and execution.
            </p>
            <p className="mt-3 font-[var(--font-body)] text-[13px] font-semibold leading-[1.6] text-[#021024]/60">
              Nairobi, Kenya
            </p>
          </div>

          <nav aria-label="Sitemap">
            <span className={groupLabelClass}>Sitemap</span>
            {SITEMAP_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company">
            <span className={groupLabelClass}>Company</span>
            {COMPANY_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
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
              LinkedIn
            </Link>
            <Link
              href="https://wa.me/254793995142"
              target="_blank"
              rel="noopener noreferrer"
              className={navLinkClass}
            >
              WhatsApp
            </Link>
          </div>
        </div>

        <div className="relative z-[2] flex flex-col items-start gap-8 border-t border-[#021024]/12 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/images/logo/Lockup_Horizontal_Dark.png"
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
                className="font-[var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.04em] text-[#021024]/70 underline underline-offset-4 transition-colors duration-300 hover:text-[#021024]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <span className="font-[var(--font-body)] text-[13px] font-semibold text-[#021024]/60">
            &copy; {new Date().getFullYear()} Rill Singh Limited
          </span>
        </div>
      </div>
    </footer>
  );
}
