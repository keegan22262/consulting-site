interface AboutHeroSectionProps {
  title: string;
  intro: string;
}

export default function AboutHeroSection({ title, intro }: AboutHeroSectionProps) {
  return (
    <section aria-labelledby="about-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-16 md:py-24">
          <header className="mx-auto max-w-3xl space-y-4">
            <h1 id="about-title" className="text-4xl leading-tight">
              {title}
            </h1>
            <p className="text-lg leading-relaxed">{intro}</p>
          </header>
        </div>
      </div>
    </section>
  );
}
