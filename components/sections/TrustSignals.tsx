import Container from "../layout/Container";

type TrustIndicator = {
  title: string;
  description: string;
};

const indicators: TrustIndicator[] = [
  {
    title: "Experienced",
    description:
      "Senior-led delivery with a bias for clarity, strong decisions, and pragmatic execution.",
  },
  {
    title: "Evidence-based",
    description:
      "Recommendations grounded in data, structured analysis, and transparent assumptions.",
  },
  {
    title: "Independent",
    description:
      "Vendor-neutral guidance focused on what works for your context—not whats easiest to sell.",
  },
  {
    title: "Impact-focused",
    description:
      "Outcome-driven work aligned to measurable results, not slide decks or activity metrics.",
  },
];

export default function TrustSignals() {
  return (
    <section aria-labelledby="trust-signals-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="trust-signals-title">How We Work</h2>
            <p className="mt-4">
              A consulting style built for high-stakes decisions: structured, independent, and
              accountable to real outcomes.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {indicators.map((indicator) => (
              <article
                key={indicator.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  {indicator.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{indicator.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
