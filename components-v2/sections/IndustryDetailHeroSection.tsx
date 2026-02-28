import Link from "next/link";

interface IndustryDetailHeroSectionProps {
  title: string;
  description: string;
}

export default function IndustryDetailHeroSection({ title, description }: IndustryDetailHeroSectionProps) {
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-20 sm:py-16">
        <nav className="mb-8 text-sm text-text-muted">
          <Link href="/" className="text-text-secondary">RSL</Link>
          <span className="mx-2">/</span>
          <Link href="/industries" className="text-text-secondary">Industries</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary font-medium">{title}</span>
        </nav>
        <h1 className="text-4xl md:text-3xl sm:text-2xl font-semibold tracking-tight text-text-primary max-w-2xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-secondary max-w-prose">
          {description}
        </p>
      </div>
    </section>
  );
}
