import Link from "next/link";

import { getSocialLinks } from "@/lib/sanity/settings";

const firmName = "Firm Name";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

const footerLinkClassName =
  "transition-colors duration-fast motion-reduce:transition-none hover:underline hover:decoration-slate-300 underline-offset-4 focus-visible:underline focus-visible:decoration-slate-300";

function hasAnySocialLink(links: {
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
}): boolean {
  return Boolean(
    links.linkedinUrl || links.twitterUrl || links.youtubeUrl || links.instagramUrl
  );
}

type SocialIconProps = {
  label: string;
  href: string;
  children: React.ReactNode;
};

function SocialIconLink({ label, href, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors duration-fast motion-reduce:transition-none hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
    >
      <span className="sr-only">{label}</span>
      {children}
    </a>
  );
}

export default async function Footer() {
  const year = new Date().getFullYear();
  const socialLinks = await getSocialLinks();
  const showSocial = hasAnySocialLink(socialLinks);

  return (
    <footer>
      <div className="mx-auto max-w-content px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="shrink-0">{firmName}</div>

          <nav aria-label="Secondary">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href} className="whitespace-nowrap">
                  <Link href={link.href} className={footerLinkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <small className="text-sm text-slate-600">
            © {year} {firmName}. All rights reserved.
          </small>

          <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href} className="whitespace-nowrap">
                    <Link href={link.href} className={footerLinkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {showSocial ? (
              <nav aria-label="Social media">
                <ul className="flex items-center gap-2">
                  {socialLinks.linkedinUrl ? (
                    <li>
                      <SocialIconLink label="LinkedIn" href={socialLinks.linkedinUrl}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                          <path
                            d="M6.5 10.5V18M6.5 6.75v.5M10 18v-4.3c0-1.8 1-3.2 2.8-3.2 1.7 0 2.7 1.2 2.7 3.2V18"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 10.5v7.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </SocialIconLink>
                    </li>
                  ) : null}

                  {socialLinks.twitterUrl ? (
                    <li>
                      <SocialIconLink label="X" href={socialLinks.twitterUrl}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                          <path
                            d="M6 6l12 12M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </SocialIconLink>
                    </li>
                  ) : null}

                  {socialLinks.youtubeUrl ? (
                    <li>
                      <SocialIconLink label="YouTube" href={socialLinks.youtubeUrl}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                          <path
                            d="M8 10.2c0-1 .8-1.6 1.6-1.2l6 3.1c.9.5.9 1.8 0 2.3l-6 3.1c-.8.4-1.6-.2-1.6-1.2v-6.1Z"
                            fill="currentColor"
                          />
                          <path
                            d="M4.5 8.8c.2-1 1-1.8 2-1.9C8 6.6 10 6.5 12 6.5s4 .1 5.5.4c1 .1 1.8.9 2 1.9.2 1.1.3 2.3.3 3.2s-.1 2.1-.3 3.2c-.2 1-1 1.8-2 1.9-1.5.3-3.5.4-5.5.4s-4-.1-5.5-.4c-1-.1-1.8-.9-2-1.9C4.3 16.1 4.2 14.9 4.2 14s.1-2.1.3-3.2Z"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </SocialIconLink>
                    </li>
                  ) : null}

                  {socialLinks.instagramUrl ? (
                    <li>
                      <SocialIconLink label="Instagram" href={socialLinks.instagramUrl}>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                          <path
                            d="M8.5 3.8h7c2.6 0 4.7 2.1 4.7 4.7v7c0 2.6-2.1 4.7-4.7 4.7h-7c-2.6 0-4.7-2.1-4.7-4.7v-7c0-2.6 2.1-4.7 4.7-4.7Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.5 6.8h.01"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </SocialIconLink>
                    </li>
                  ) : null}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
