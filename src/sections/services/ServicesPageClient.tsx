"use client";

import CTABlock from "@/components-v2/sections/CTABlock";
import { useServices } from "@/lib/hooks/useServices";
import CapabilityFrameworkMap from "@/src/sections/services/CapabilityFrameworkMap";
import CinematicHero from "@/src/sections/services/CinematicHero";
import CreativeDeliverySection from "@/src/sections/services/CreativeDeliverySection";
import ServiceGridSection from "@/src/sections/services/ServiceGridSection";
import ServicesNavStrip from "@/src/sections/services/ServicesNavStrip";
import { SERVICES, type ServiceItem } from "@/src/sections/services/data";

export default function ServicesPageClient() {
  const { data: cmsServices } = useServices<ServiceItem>();
  const services = cmsServices ?? SERVICES;

  return (
    <>
      <CinematicHero />
      <ServicesNavStrip services={services} />
      <ServiceGridSection services={services} />
      <CapabilityFrameworkMap />
      <CreativeDeliverySection />
      <CTABlock
        title="Ready to discuss a specific challenge?"
        description="Every engagement begins with a structured conversation to determine whether there is a basis for collaboration."
        primaryLabel="Schedule an Introduction"
        primaryHref="/contact"
        secondaryLabel="View Industry Coverage"
        secondaryHref="/industries"
        secondaryVariant="ghost"
      />
    </>
  );
}
