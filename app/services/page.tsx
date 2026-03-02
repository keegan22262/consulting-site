
import ServicesHeroSection from "@/components-v2/sections/ServicesHeroSection";
import ServicesIntroSection from "@/components-v2/sections/ServicesIntroSection";
import ServicesGridSection from "@/components-v2/sections/ServicesGridSection";
import ServicesRelatedIndustriesSection from "@/components-v2/sections/ServicesRelatedIndustriesSection";
import CTABlock from "@/components-v2/sections/CTABlock";

import { sanityClient } from "@/lib/sanity/client";
import { getAllServicesQuery } from "@/lib/sanity/queries";

type ServiceResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
};

export default async function Page() {
  const services = await sanityClient.fetch<ServiceResult[]>(getAllServicesQuery);
  const serviceCards = (services ?? [])
    .filter((service): service is ServiceResult & { slug: string; title: string; summary: string } =>
      Boolean(service.slug && service.title && service.summary)
    )
    .map((service) => ({
      slug: service.slug,
      title: service.title,
      focusAreas: service.summary,
      approach: service.description ?? service.summary,
    }));

  const relatedIndustries: { slug: string; title: string; description: string }[] = [];

  return (
    <>
      <ServicesHeroSection />
      <ServicesIntroSection />
      {serviceCards.length > 0 ? (
        <ServicesGridSection services={serviceCards} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}
      {relatedIndustries.length > 0 ? (
        <ServicesRelatedIndustriesSection industries={relatedIndustries} />
      ) : (
        <div style={{ padding: "40px 0" }} />
      )}
      <CTABlock
        title={serviceCards[0]?.title ?? "Talk to a partner"}
        description={serviceCards[0]?.focusAreas}
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}
