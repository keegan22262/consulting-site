import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";
import ServiceCard from "@/components-v2/ui/ServiceCard";

interface RelatedService {
  slug: string;
  title: string;
  description: string;
}

interface IndustryRelatedServicesSectionProps {
  services: RelatedService[];
}

export default function IndustryRelatedServicesSection({ services }: IndustryRelatedServicesSectionProps) {
  return (
    <SectionWrapper>
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
      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {services.slice(0, 3).map((service, index) => (
          <ServiceCard
            key={service.slug}
            slug={service.slug}
            title={service.title}
            focusAreas={service.description}
            approach={service.description}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
