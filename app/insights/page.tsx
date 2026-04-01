import type { Metadata } from "next";
import InsightsPageClient from "@/src/sections/insights/InsightsPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Strategic analysis on the forces shaping institutions, markets, and transformation across Africa.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
