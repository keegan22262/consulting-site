import Image from "next/image";

export default function CoverageHero() {
  return (
    <section className="relative isolate overflow-hidden bg-(--a900)">
      <Image
        src="/images/industries/hero/hero-city-skyline.jpg"
        alt="Industry coverage overview"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,28,46,0.9)] via-[rgba(12,28,46,0.55)] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/65">Industry Coverage</p>
        <h1
          className="mt-3 font-semibold text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.1", letterSpacing: "-0.02em" }}
        >
          Where We Advise.
        </h1>
        <p className="mt-5 max-w-[56ch] text-white/85" style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--line-height-body-lg)" }}>
          Cross-sector advisory spanning regulated, capital-intensive, and digitally disruptive industries.
        </p>
      </div>
    </section>
  );
}
