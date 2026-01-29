import Link from "next/link";

import Container from "../layout/Container";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container>
        <div className="flex flex-col items-center py-18 text-center">
          <h1 id="hero-title" className="max-w-3xl">
            Clarity for complex decisions. Execution that delivers.
          </h1>

          <p className="mt-6 max-w-2xl">
            We support leadership teams with structured analysis, decision support, and
            practical delivery across strategy, risk, and transformation.
          </p>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3"
            >
              Schedule a consultation
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
