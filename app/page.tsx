import Hero from "../components/sections/Hero";
import ServicesOverview from "../components/sections/ServicesOverview";
import TrustSignals from "../components/sections/TrustSignals";
import InsightsTeaser from "../components/sections/InsightsTeaser";
import CTA from "../components/sections/CTA";
import type { Metadata } from "next";

import Container from "../components/layout/Container";

import { getPublishedHomePage } from "@/lib/sanity/pages";
import { PortableText } from "@portabletext/react";
import { getHowWeWork } from "@/lib/sanity/queries/howWeWork";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Senior-level consulting support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
  openGraph: {
    title: "Home",
    description:
      "Senior-level consulting support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
  },
};

export default async function Home() {
  const [home, howWeWork] = await Promise.all([
    getPublishedHomePage(),
    getHowWeWork(),
  ]);
  const hasHowWeWork = Boolean(howWeWork);
  const hasSeeHowContent = Boolean(
    (home?.companyDescription && home.companyDescription.length > 0) ||
      (home?.operatingApproach && home.operatingApproach.length > 0)
  );

  const seeHowIntro = home?.sectionIntros?.find((intro) => intro.sectionId === "see-how");
  const seeHowTitle = seeHowIntro?.title?.trim() || "See how";
  const seeHowButtonLabel = seeHowIntro?.linkLabel?.trim() || seeHowTitle;

  return (
    <>
      <Hero
        title={home?.heroTitle}
        subtitle={home?.heroSubtitle}
        ctaLabel={home?.heroCTA?.label}
        ctaHref={home?.heroCTA?.href}
        secondaryCtaLabel={hasHowWeWork ? seeHowButtonLabel : undefined}
        secondaryCtaHref={hasHowWeWork ? "#how-we-work" : undefined}
      />
      {hasSeeHowContent ? (
        <section id="see-how" aria-labelledby="see-how-title" className="scroll-mt-24">
          <Container>
            <div className="py-18">
              <h2 id="see-how-title" className="mx-auto max-w-3xl text-center">
                {seeHowTitle}
              </h2>
              <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2">
                {home?.companyDescription ? (
                  <section aria-label="Company description" className="space-y-4">
                    <div className="space-y-3 text-slate-700">
                      <PortableText
                        value={home.companyDescription}
                        components={{
                          block: {
                            normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
                          },
                        }}
                      />
                    </div>
                  </section>
                ) : null}

                {home?.operatingApproach ? (
                  <section aria-label="Operating approach" className="space-y-4">
                    <div className="space-y-3 text-slate-700">
                      <PortableText
                        value={home.operatingApproach}
                        components={{
                          block: {
                            normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
                          },
                        }}
                      />
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {howWeWork ? (
        <section id="how-we-work" aria-labelledby="how-we-work-title" className="scroll-mt-24">
          <Container>
            <div className="py-18">
              <header className="mx-auto max-w-3xl space-y-4 text-center">
                <h2 id="how-we-work-title">{howWeWork.title}</h2>
                {howWeWork.intro.length > 0 ? (
                  <div className="space-y-3 text-slate-700">
                    <PortableText
                      value={howWeWork.intro}
                      components={{
                        block: {
                          normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
                        },
                      }}
                    />
                  </div>
                ) : null}
              </header>

              {howWeWork.principles.length > 0 ? (
                <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {howWeWork.principles.map((principle, index) => (
                    <article
                      key={`${principle.title}-${index}`}
                      className="rounded-xl border border-slate-200 bg-white p-6"
                    >
                      <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                        {principle.title}
                      </h3>
                      {principle.description ? (
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {principle.description}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}
      <ServicesOverview
        intro={home?.servicesIntro}
      />
      <TrustSignals />
      <InsightsTeaser
        intro={home?.insightsIntro}
      />
      <CTA
        heading={home?.ctaText}
      />
    </>
  );
}
