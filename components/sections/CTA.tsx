import Link from "next/link";

import Container from "../layout/Container";

export default function CTA() {
  return (
    <section aria-labelledby="cta-title">
      <Container>
        <div className="flex flex-col items-center py-18 text-center">
          <h2 id="cta-title" className="max-w-3xl">
            Ready to move from analysis to action?
          </h2>
          <p className="mt-4 max-w-2xl">
            Share your goals and constraints— we’ll respond with a clear next step.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3"
            >
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
