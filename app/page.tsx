import Hero from "../components/sections/Hero";
import ServicesOverview from "../components/sections/ServicesOverview";
import TrustSignals from "../components/sections/TrustSignals";
import InsightsTeaser from "../components/sections/InsightsTeaser";
import CTA from "../components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Senior-level consulting support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
  openGraph: {
    title: "Home",
    description:
      "Senior-level consulting support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
  },
};

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
