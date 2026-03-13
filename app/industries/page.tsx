import type { Metadata } from "next";
import IndustriesPageClient from "@/src/sections/industries/IndustriesPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industries | Rill Singh Limited",
  description:
    "Industry-specific advisory across financial services, technology, public sector, and other complex institutional contexts.",
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
