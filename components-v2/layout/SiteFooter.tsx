import Link from "next/link";

const socials = [
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Twitter" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "WhatsApp" },
  { href: "#", label: "TikTok" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "Instagram" },
  { href: "mailto:info@rsl.com", label: "Email" },
];

function SocialIcon({ label }: { label: string }) {
  return (
    <svg
      aria-hidden
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-8 pt-[56px] pb-[40px] md:pt-[72px] md:pb-[48px] lg:pt-[96px] lg:pb-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          <div className="space-y-4 mb-8 md:mb-8 lg:mb-12">
            <div className="text-h3 font-semibold text-white" style={{ maxWidth: "160px" }}>
              RSL
            </div>
            <p
              className="text-[var(--text-caption)] leading-relaxed text-neutral-400"
              style={{ maxWidth: "420px" }}
            >
              Institutional advisory across strategy, capital architecture,
              digital transformation, and governance.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-[var(--text-caption)] font-semibold uppercase tracking-[0.04em] text-white mb-4">Services</h3>
            <ul className="flex flex-col gap-2 text-[var(--text-caption)] text-neutral-400 leading-[1.6]">
              <li>
                <Link
                  href="/services"
                  className="block hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-[var(--text-caption)] font-semibold uppercase tracking-[0.04em] text-white mb-4">Insights</h3>
            <ul className="flex flex-col gap-2 text-[var(--text-caption)] text-neutral-400 leading-[1.6]">
              <li>
                <Link
                  href="/insights"
                  className="block hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  Research & Perspectives
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-[var(--text-caption)] font-semibold uppercase tracking-[0.04em] text-white mb-4">Company</h3>
            <ul className="flex flex-col gap-2 text-[var(--text-caption)] text-neutral-400 leading-[1.6]">
              <li>
                <Link
                  href="/about"
                  className="block hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="block hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="block hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#404040] mt-12 pt-12">
          <p className="text-[var(--text-caption)] font-semibold uppercase tracking-[0.04em] text-white mb-4">Social</p>
          <div className="flex flex-wrap items-center gap-6">
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-center text-[#A3A3A3] hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              >
                <SocialIcon label={item.label} />
                <span className="sr-only">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[#404040] mt-12 pt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-[0.75rem] text-neutral-400">
          <div className="text-neutral-400">© {new Date().getFullYear()} RSL Advisory. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-[120ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
