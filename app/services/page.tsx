
import ServicesHeroSection from "@/components-v2/sections/ServicesHeroSection";
import ServicesIntroSection from "@/components-v2/sections/ServicesIntroSection";
import ServicesGridSection from "@/components-v2/sections/ServicesGridSection";
import ServicesIntegrationSection from "@/components-v2/sections/ServicesIntegrationSection";

import { getAllServices } from "@/lib/sanity/services";

export default async function Page() {
  const services = await getAllServices();
  return (
    <>
      <ServicesHeroSection />
      <ServicesIntroSection />
      <ServicesGridSection services={services} />
      <ServicesIntegrationSection />
    </>
  );
}
