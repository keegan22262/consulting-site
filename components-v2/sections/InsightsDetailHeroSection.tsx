interface InsightsDetailHeroSectionProps {
  category: string;
  title: string;
  excerpt: string;
}

export default function InsightsDetailHeroSection({ category, title, excerpt }: InsightsDetailHeroSectionProps) {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-4xl px-6 py-28 md:py-20 sm:py-16">
        <nav className="mb-6 text-sm text-white/70">
          <span>RSL</span>
          <span className="mx-2">/</span>
          <span>Insights</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-white">{title}</span>
        </nav>
        <span className="block text-xs uppercase tracking-widest text-white/60 mb-4">
          {category}
        </span>
        <h1 className="text-4xl md:text-3xl sm:text-2xl font-semibold tracking-tight max-w-2xl">
          {title}
        </h1>
        <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-prose">
          {excerpt}
        </p>
      </div>
    </section>
  );
}
