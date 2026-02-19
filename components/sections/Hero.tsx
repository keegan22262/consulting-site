import Link from "next/link";

import Container from "../layout/Container";
import Enter from "../ui/Enter";

type HeroProps = {
	title?: string;
	subtitle?: string;
	ctaLabel?: string;
	ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

export default function Hero({
	title = "Clarity for complex decisions. Execution that delivers.",
	subtitle =
		"We support leadership teams with structured analysis, decision support, and practical delivery across strategy, risk, and transformation.",
	ctaLabel = "Schedule a consultation",
	ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
}: HeroProps) {
  return (
    <section aria-labelledby="hero-title">
      <Container>
			<div className="flex flex-col items-center py-24 md:py-32 text-center">
        <Enter>
          <h1 id="hero-title" className="max-w-3xl">
            {title}
          </h1>
        </Enter>

        <Enter>
          <p className="mt-6 max-w-prose">
            {subtitle}
          </p>
        </Enter>

        <Enter>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-6 py-3"
            >
              {ctaLabel}
            </Link>
            {secondaryCtaLabel && secondaryCtaHref ? (
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center px-6 py-3"
              >
                {secondaryCtaLabel}
              </a>
            ) : null}
          </div>
        </Enter>
        </div>
      </Container>
    </section>
  );
}
