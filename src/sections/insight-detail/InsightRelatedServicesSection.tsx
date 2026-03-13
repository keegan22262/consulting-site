import Link from "next/link";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import ServiceCard from "@/components-v2/ui/ServiceCard";

export type InsightRelatedService = {
  slug: string;
  title: string;
  description: string;
};

export default function InsightRelatedServicesSection({
  relatedServices,
}: {
  relatedServices: InsightRelatedService[];
}) {
  if (relatedServices.length === 0) return null;

  return (
    <SectionWrapper background="neutral50">
      <div className="flex items-center justify-between">
        <SectionHeader overline="Related Services" title="Advisory Support." />
        <Link href="/services" className="text-sm font-medium text-accent-primary hover:underline">
          Explore all services →
        </Link>
      </div>
      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {relatedServices.map((service, index) => (
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
