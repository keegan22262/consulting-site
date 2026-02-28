interface ServicesDetailHeroSectionProps {
  number: string;
  title: string;
  approach: string;
}

export default function ServicesDetailHeroSection({ number, title, approach }: ServicesDetailHeroSectionProps) {
  return (
    <section className="relative bg-neutral-900 text-white">
      <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40" />
      <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-20 sm:py-16">
        <nav className="mb-6 text-sm text-white/70">
          <span>RSL</span>
          <span className="mx-2">/</span>
          <span>Services</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-white">{title}</span>
        </nav>
        <span className="block text-xs uppercase tracking-widest text-white/60 mb-4">
          Service {number} of 10
        </span>
        <h1 className="text-4xl md:text-3xl sm:text-2xl font-semibold tracking-tight max-w-2xl">
          {title}.
        </h1>
        <p className="mt-6 text-lg text-white/80 max-w-prose leading-relaxed">
          {approach}
        </p>
      </div>
    </section>
  );
}
