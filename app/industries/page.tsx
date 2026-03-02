import IndustriesHeroSection from "@/components-v2/sections/IndustriesHeroSection";
import IndustriesOverview from "@/components-v2/sections/IndustriesOverview";
import CTABlock from "@/components-v2/sections/CTABlock";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import { sanityClient } from "@/lib/sanity/client";
import { industriesQuery } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

type IndustryResult = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
};

export default async function IndustriesPage() {
  const results = await sanityClient.fetch<IndustryResult[]>(industriesQuery);

  const industries = (results ?? [])
    .filter((item): item is IndustryResult & { slug: string; title: string } => Boolean(item.slug && item.title))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.summary ?? "",
    }));

  if (industries.length === 0) {
    return (
      <>
        <IndustriesHeroSection />
        <SectionWrapper background="neutral50">
          <SectionHeader
            overline="Industry Coverage"
            title="Industries"
            description="No published industry content is available."
          />
        </SectionWrapper>
        <CTABlock
          title="Talk to a partner"
          description="Reach out to discuss your industry challenges and priorities."
          primaryLabel="Contact"
          primaryHref="/contact"
        />
      </>
    );
  }

  return (
    <>
      <IndustriesHeroSection />
      <IndustriesOverview industries={industries} background="neutral50" />
      <CTABlock
        title="Talk to a partner"
        description="Let’s align on your industry context and delivery needs."
        primaryLabel="Contact"
        primaryHref="/contact"
      />
    </>
  );
}
