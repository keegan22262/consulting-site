import Link from "next/link";

import Container from "../layout/Container";

type CTAProps = {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  href?: string;
};

export default function CTA({
  heading = "Ready to move from analysis to action?",
  subheading = "Share your goals and constraints— we’ll respond with a clear next step.",
  buttonText = "Contact us",
  href = "/contact",
}: CTAProps) {
  return (
    <section aria-labelledby="cta-title">
      <Container>
        <div className="flex flex-col items-center py-18 text-center">
          <h2 id="cta-title" className="max-w-3xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-2xl">
            {subheading}
          </p>
          <div className="mt-10">
            <Link
              href={href}
              className="inline-flex items-center justify-center px-6 py-3"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
