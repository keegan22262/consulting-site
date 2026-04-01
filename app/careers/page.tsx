import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers at Rill Singh Limited",
  description:
    "Build your career in pan-African institutional advisory. We are always looking for exceptional people who combine analytical depth with execution discipline.",
  alternates: {
    canonical: "/careers",
  },
};

const WHY_RSL = [
  {
    title: "Senior-Led Teams",
    description:
      "Work directly with firm principals on every engagement. No delegation to junior analysts.",
  },
  {
    title: "Pan-African Reach",
    description:
      "Operate across 11 industries and multiple geographies. Every engagement expands your perspective.",
  },
  {
    title: "Integrated Practice",
    description:
      "Ten advisory disciplines under one roof. Cross-functional exposure from day one.",
  },
];

export default function CareersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-standard bg-neutral-900">
        <div className="layout-container pt-28 pb-16 md:pt-36 md:pb-20">
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-white/60 mb-2">
            Careers
          </span>
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-semibold leading-[1.1] text-white max-w-3xl">
            Build your career at RSL
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/75 max-w-[55ch]">
            We are always looking for exceptional people who combine analytical depth with execution discipline.
          </p>
        </div>
      </section>

      {/* Why RSL */}
      <section className="section-wrapper">
        <div className="layout-container">
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-neutral-500 mb-2">
            Why RSL
          </span>
          <h2 className="text-[2rem] font-semibold leading-[1.2] text-neutral-900">
            What makes RSL different.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WHY_RSL.map((card) => (
              <div
                key={card.title}
                className="rounded-lg border border-neutral-200 px-6 py-6"
              >
                <h3 className="text-[0.9375rem] font-semibold text-neutral-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-[1.55] text-neutral-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="section-wrapper bg-neutral-50">
        <div className="layout-container">
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-neutral-500 mb-2">
            Opportunities
          </span>
          <h2 className="text-[2rem] font-semibold leading-[1.2] text-neutral-900">
            Current Opportunities
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 max-w-[60ch]">
            We do not currently have open positions listed. However, we welcome expressions of interest from exceptional candidates. Submit your CV and a brief note on why RSL.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?from=careers"
              className="inline-block rounded-md bg-[--a700] px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors duration-150 hover:bg-[--a800]"
            >
              Submit Expression of Interest
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
