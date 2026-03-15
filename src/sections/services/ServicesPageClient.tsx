"use client";

import InstitutionalCTA from "@/components-v2/sections/InstitutionalCTA";
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
      <InstitutionalCTA
        overline="Next Step"
        headline="Ready to discuss a specific challenge?"
        body="Every engagement begins with a structured conversation to determine whether there is a basis for collaboration."
        buttonLabel="Schedule an Introduction"
        secondaryLabel="View Industry Coverage"
        secondaryHref="/coverage"
      />
    </>
  );
}
