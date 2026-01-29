import Container from "../../../components/layout/Container";
import CTA from "../../../components/sections/CTA";
import ServiceContent from "../../../components/sections/ServiceContent";
import Link from "next/link";
import type { Metadata } from "next";

import { services, type Service } from "../../../lib/services";

export async function generateMetadata(
  { params }: ServiceDetailsPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.trim();
  const service: Service | undefined = services.find((s) => s.id === normalizedSlug);

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

  const description = `${service.summary}`;

  return {
    title: service.title,
    description,
    openGraph: {
      title: service.title,
      description,
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
  const service: Service | undefined = services.find((s) => s.id === normalizedSlug);

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

  const executiveSummary = `${service.summary} We provide pragmatic decision support and delivery focus—aligned to measurable outcomes.`;

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
                description={service.description}
                offerings={service.offerings}
                outcomes={service.outcomes}
              />
            </section>

            <section aria-labelledby="service-approach-title" className="space-y-4">
              <h2 id="service-approach-title" className="text-2xl leading-snug">
                Our Approach
              </h2>
              <p className="leading-relaxed">
                We start by clarifying objectives, constraints, and the decisions that need to be made. We then work with
                your team to align stakeholders, define ownership, and translate priorities into a practical plan that fits
                your operating realities.
              </p>
            </section>

            <section aria-labelledby="service-expect-title" className="space-y-4">
              <h2 id="service-expect-title" className="text-2xl leading-snug">
                What You Can Expect
              </h2>
              <p className="leading-relaxed">
                Clear deliverables, transparent trade-offs, and focused working sessions. We provide regular progress
                updates, document decisions and assumptions, and keep attention on execution—so recommendations translate
                into action and measurable improvement.
              </p>
            </section>

            <section aria-labelledby="service-additional-capabilities-title" className="space-y-3 border-t border-slate-200 pt-8">
              <h2
                id="service-additional-capabilities-title"
                className="text-base font-semibold tracking-tight text-slate-900"
              >
                Additional Capabilities
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Additional support may include adjacent advisory, delivery support, or specialist input where it helps
                accelerate decisions and execution. Scope is tailored to context and objectives.
              </p>
            </section>
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
