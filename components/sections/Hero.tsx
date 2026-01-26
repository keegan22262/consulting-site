import Link from "next/link";

import Container from "../layout/Container";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container>
        <div className="flex flex-col items-center py-18 text-center">
          <h1 id="hero-title" className="max-w-3xl">
            Strategy and execution support for leaders who need momentum.
          </h1>

          <p className="mt-6 max-w-2xl">
            We partner with teams on growth strategy, operational alignment, and
            high-stakes initiatives—bringing clarity from diagnosis through delivery.
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
