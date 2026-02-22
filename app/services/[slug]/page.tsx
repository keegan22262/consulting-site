import Container from "../../../components/layout/Container";
import CTA from "../../../components/sections/CTA";
import Link from "next/link";
import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/sanityServices";

export const revalidate = 300;

type ServiceDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
      alternates: {
        canonical: `/services/${normalizedSlug}`,
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
    alternates: {
      canonical: `/services/${normalizedSlug}`,
    },
  };
}

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
          <section className="py-16 md:py-24" aria-labelledby="service-not-found-title">
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary ?? "",
    provider: {
      "@type": "Organization",
      name: "Rill Singh Consulting",
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Global",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL + "/services/" + slug,
  };

  return (
    <main>
      <Container>
        <section className="py-16 md:py-24" aria-labelledby="service-title">
          <div className="mx-auto max-w-2xl space-y-12">
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
            {service.targetClients ? (
              <section aria-labelledby="service-target-clients-title" className="space-y-4">
                <h2 id="service-target-clients-title" className="text-2xl leading-snug">
                  Who This Is For
                </h2>
                <p className="leading-relaxed">{service.targetClients}</p>
              </section>
            ) : null}
            {service.focusAreas && service.focusAreas.length > 0 ? (
              <section aria-labelledby="service-focus-areas-title" className="space-y-4">
                <h2 id="service-focus-areas-title" className="text-2xl leading-snug">
                  Focus Areas
                </h2>
                <ul className="space-y-2">
                  {service.focusAreas.map((area) => (
                    <li key={area} className="flex gap-3 text-slate-700">
                      <span aria-hidden="true" className="text-slate-400">&bull;</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
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
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
          </div>
        </section>
      </Container>
      <CTA
        heading={`Discuss ${service.title}`}
        subheading={`Share your objectives for ${service.category}. We'll respond with a clear next step.`}
        buttonText="Schedule a consultation"
        contactContext={{
          inquiryType: "service",
          relatedServiceId: service.id,
          relatedServiceTitle: service.title,
        }}
      />
    </main>
  );
}
