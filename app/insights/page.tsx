import type { Metadata } from "next";
import InsightsPageClient from "@/src/sections/insights/InsightsPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights | Rill Singh Limited",
  description:
    "Research and perspectives on strategy, transformation, risk, and institutional delivery.",
};

export default function InsightsPage() {
  return <InsightsPageClient />;
}
