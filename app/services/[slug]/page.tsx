import Container from "../../../components/layout/Container";
import CTA from "../../../components/sections/CTA";
import ServiceContent from "../../../components/sections/ServiceContent";
import Link from "next/link";

import { services, type Service } from "../../../lib/services";

type ServiceDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { slug } = await params;
  const service: Service | undefined = services.find((s) => s.id === slug);

  if (!service) {
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
            </header>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <section className="py-18" aria-labelledby="service-title">
          <div className="mx-auto max-w-3xl space-y-16">
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
              <p className="text-lg leading-relaxed">{service.summary}</p>
            </header>

            <section aria-labelledby="service-content-title" className="space-y-6">
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
                Placeholder content—describe how we work with your team, how we structure
                collaboration, and how we keep decisions and delivery moving.
              </p>
            </section>

            <section aria-labelledby="service-expect-title" className="space-y-4">
              <h2 id="service-expect-title" className="text-2xl leading-snug">
                What You Can Expect
              </h2>
              <p className="leading-relaxed">
                Placeholder content—outline what deliverables look like, how progress is
                reported, and what outcomes to expect over the first few weeks.
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
