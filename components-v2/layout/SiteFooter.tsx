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

const navLinkClass =
  "font-[var(--font-body)] text-[14px] leading-[2.2] text-[#C3D0DF] transition-colors duration-300 hover:text-white hover:underline";

export default function SiteFooter() {
  return (
    <footer className="bg-navy-darkest">
      <div className="mx-auto w-full max-w-[72rem] px-6 pt-20 lg:px-16">
        <div className="flex flex-col gap-14 sm:flex-row sm:flex-wrap sm:[column-gap:clamp(48px,7vw,96px)] sm:[row-gap:40px]">
          {/* Brand */}
          <div className="flex flex-col gap-2.5 sm:flex-[0_1_320px]">
            <Image
              src="/images/logo/Lockup_Horizontal_Navy.png"
              alt="Rill Singh Limited"
              width={1800}
              height={560}
              className="h-8 w-auto"
            />
            <p className="font-[var(--font-body)] text-[13px] leading-[1.6] text-blue-light">
              Pan-African institutional advisory. Precision-led consulting for growth,
              transformation, and execution.
            </p>
            <p className="font-[var(--font-body)] text-[13px] leading-[1.6] text-blue-light">
              Nairobi, Kenya
            </p>
          </div>

          {/* Sitemap */}
          <nav aria-label="Sitemap" className="flex flex-col sm:flex-[0_0_auto]">
            {SITEMAP_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="flex flex-col sm:flex-[0_0_auto]">
            {COMPANY_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Follow us */}
          <div className="flex flex-col gap-1.5 sm:ml-auto sm:flex-[0_0_auto]">
            <span className="mb-1 font-[var(--font-body)] text-[12px] font-semibold uppercase tracking-[0.1em] text-blue-light">
              Follow us
            </span>
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

        {/* Legal row */}
        <div className="mt-20 flex flex-col gap-4 border-t border-white/12 py-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-[var(--font-body)] text-[13px] text-blue-light">
            &copy; {new Date().getFullYear()} Rill Singh Limited
          </span>
          <div className="flex flex-wrap gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-[var(--font-body)] text-[13px] text-blue-light transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
