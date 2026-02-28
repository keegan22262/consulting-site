import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";

interface RelatedService {
  slug: string;
  title: string;
  description: string;
}

interface IndustryRelatedServicesSectionProps {
  services: RelatedService[];
}

function ServiceMiniCard({ slug, title, description }: RelatedService) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group block border border-border-subtle rounded-card p-6 transition-fast ease-standard hover:border-border-strong hover:shadow-sm"
    >
      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-fast">
        {title}
      </h3>
      <p className="text-base text-text-secondary leading-relaxed mb-4">
        {description}
      </p>
      <span className="text-sm font-medium text-accent-primary">
        Explore service →
      </span>
    </Link>
  );
}

export default function IndustryRelatedServicesSection({ services }: IndustryRelatedServicesSectionProps) {
  return (
    <SectionWrapper background="slate">
      <div className="flex items-center justify-between">
        <SectionHeader
          overline="Related Capabilities"
          title="Advisory Services."
        />
        <Link
          href="/services"
          className="text-sm font-medium text-accent-primary hover:underline"
        >
          Explore all services →
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.slice(0, 3).map((service) => (
          <ServiceMiniCard
            key={service.slug}
            slug={service.slug}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
