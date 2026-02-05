import Container from "../../../components/layout/Container";
import CTA from "../../../components/sections/CTA";
import InsightCard from "../../../components/sections/InsightCard";
import ServiceContent from "../../../components/sections/ServiceContent";
import Link from "next/link";
import type { Metadata } from "next";

import { getServiceBySlug } from "@/lib/sanityServices";
import { getAllInsights } from "@/lib/sanityInsights";

export async function generateMetadata(
  { params }: ServiceDetailsPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.trim();
  const service = normalizedSlug ? await getServiceBySlug(normalizedSlug) : null;

  if (!normalizedSlug || !service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be located.",
      openGraph: {
        title: "Service Not Found",
        description: "The requested service could not be located.",
      },
    };
  }

  const safeTitle = (service.title || "").trim() || "Service";
  const safeDescription =
		(service.summary || "").trim() ||
		"Consulting services focused on clear decisions and measurable outcomes.";

  return {
    title: safeTitle,
    description: safeDescription,
    openGraph: {
      title: safeTitle,
      description: safeDescription,
    },
  };
}

type ServiceDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.trim();
  const service = normalizedSlug ? await getServiceBySlug(normalizedSlug) : null;

  if (!normalizedSlug || !service) {
    return (
      <main>
        <Container>
          <section className="py-18" aria-labelledby="service-not-found-title">
            <header className="space-y-4">
              <h1 id="service-not-found-title" className="text-3xl leading-tight">
                Service not found
              </h1>
              <p className="max-w-2xl leading-relaxed">
                The requested service could not be located.
              </p>
              <p>
                <Link href="/services" className="text-sm underline underline-offset-4">
                  View all services
                </Link>
              </p>
            </header>
          </section>
        </Container>
      </main>
    );
  }

  const executiveSummary = service.summary;

  const relatedInsightSlugs = (service.relatedInsights ?? [])
    .map((item) => item?.slug)
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0);

  type RelatedInsightForRender = {
    title: string;
    slug: string;
    summary: string;
    category?: string;
    date?: string;
  };

  let relatedInsightsForRender: RelatedInsightForRender[] = [];
  if (relatedInsightSlugs.length > 0) {
    const allInsights = await getAllInsights();
    const bySlug = new Map(allInsights.map((insight) => [insight.slug, insight] as const));

    relatedInsightsForRender = relatedInsightSlugs
      .map((slugValue) => {
        const fromIndex = bySlug.get(slugValue);
        if (fromIndex) return fromIndex;

        const fallback = (service.relatedInsights ?? []).find((item) => item?.slug === slugValue);
        if (!fallback) return null;

        return {
          title: fallback.title,
          slug: fallback.slug,
          summary: fallback.summary,
          category: fallback.category,
          date: fallback.date,
        };
      })
      .filter((value): value is RelatedInsightForRender => value !== null);
  }

  return (
    <main>
      <Container>
        <section className="py-18" aria-labelledby="service-title">
          <div className="mx-auto max-w-3xl space-y-12">
            <header className="space-y-4">
              <p>
                <Link href="/services" className="text-sm underline underline-offset-4">
                  Back to services
                </Link>
              </p>
              <p className="text-xs uppercase tracking-wide">
                {service.category}
              </p>
              <h1 id="service-title" className="text-4xl leading-tight">
                {service.title}
              </h1>
              <p className="text-lg leading-relaxed">{executiveSummary}</p>
            </header>

            <section aria-labelledby="service-content-title" className="space-y-4">
              <h2 id="service-content-title" className="text-2xl leading-snug">
                What We Do
              </h2>
              <ServiceContent
                description={service.description ?? ""}
                offerings={service.offerings ?? []}
                outcomes={service.outcomes ?? []}
              />
            </section>

            {relatedInsightsForRender.length > 0 ? (
              <section aria-labelledby="service-related-insights-title" className="space-y-4">
                <h2 id="service-related-insights-title" className="text-2xl leading-snug">
                  Related Insights
                </h2>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  {relatedInsightsForRender.map((insight) => (
                    <InsightCard
                      key={insight.slug}
                      slug={insight.slug}
                      title={insight.title}
                      summary={insight.summary}
                      category={insight.category ?? ""}
                      date={insight.date ?? ""}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {service.approach ? (
              <section aria-labelledby="service-approach-title" className="space-y-4">
                <h2 id="service-approach-title" className="text-2xl leading-snug">
                  Our Approach
                </h2>
                <p className="leading-relaxed">{service.approach}</p>
              </section>
            ) : null}

            {service.expectations ? (
              <section aria-labelledby="service-expect-title" className="space-y-4">
                <h2 id="service-expect-title" className="text-2xl leading-snug">
                  What You Can Expect
                </h2>
                <p className="leading-relaxed">{service.expectations}</p>
              </section>
            ) : null}

            {service.additionalCapabilities ? (
              <section
                aria-labelledby="service-additional-capabilities-title"
                className="space-y-3 border-t border-slate-200 pt-8"
              >
                <h2
                  id="service-additional-capabilities-title"
                  className="text-base font-semibold tracking-tight text-slate-900"
                >
                  Additional Capabilities
                </h2>
                <p className="text-sm leading-6 text-slate-600">{service.additionalCapabilities}</p>
              </section>
            ) : null}
          </div>
        </section>
      </Container>

      <CTA
        heading={`Discuss ${service.title}`}
        subheading={`Share your objectives for ${service.category}. We’ll respond with a clear next step.`}
        buttonText="Schedule a consultation"
        href="/contact"
      />
    </main>
  );
}
