export default function InsightsHeroSection() {
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-20 sm:py-16">
        <nav className="mb-8 text-sm text-text-muted">
          <span className="text-text-secondary">RSL</span>
          <span className="mx-2">/</span>
          <span className="text-text-primary font-medium">Insights</span>
        </nav>
        <h1 className="text-4xl md:text-3xl sm:text-2xl font-semibold tracking-tight text-text-primary max-w-2xl">
          Research & Perspectives.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-text-secondary max-w-prose">
          Institutional analysis across capital strategy, governance, digital architecture, and sector transformation.
        </p>
      </div>
    </section>
  );
}
