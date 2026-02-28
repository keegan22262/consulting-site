import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import ServiceCard from "@/components-v2/ui/ServiceCard";
import React from "react";

interface ServicesGridSectionProps {
  services: {
    slug: string;
    title: string;
    focusAreas: string;
    approach: string;
  }[];
}

export default function ServicesGridSection({ services }: ServicesGridSectionProps) {
  return (
    <SectionWrapper background="slate">
      <SectionHeader
        overline="Advisory Disciplines"
        title="10 Service Lines."
        description={undefined}
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((svc, index) => (
          <ServiceCard
            key={svc.slug}
            slug={svc.slug}
            title={svc.title}
            focusAreas={svc.focusAreas}
            approach={svc.approach}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
