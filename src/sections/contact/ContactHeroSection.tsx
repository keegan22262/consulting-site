interface ContactHeroSectionProps {
  title: string;
  intro: string;
  consultationNote: string;
}

export default function ContactHeroSection({
  title,
  intro,
  consultationNote,
}: ContactHeroSectionProps) {
  return (
    <section aria-labelledby="contact-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-16 md:py-24">
          <header className="mx-auto max-w-3xl space-y-4">
            <h1 id="contact-title" className="text-4xl leading-tight">
              {title}
            </h1>
            <p className="text-lg leading-relaxed">{intro}</p>
            <p className="leading-relaxed text-slate-600">{consultationNote}</p>
          </header>
        </div>
      </div>
    </section>
  );
}
