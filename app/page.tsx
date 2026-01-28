import Hero from "../components/sections/Hero";
import ServicesOverview from "../components/sections/ServicesOverview";
import TrustSignals from "../components/sections/TrustSignals";
import InsightsTeaser from "../components/sections/InsightsTeaser";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <TrustSignals />
      <InsightsTeaser />
      <CTA />
    </>
  );
}
