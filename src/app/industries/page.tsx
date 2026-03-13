import type { Metadata } from "next";
import IndustriesPageClient from "@/src/sections/industries/IndustriesPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industries | Rill Singh Limited",
  description:
    "Sector expertise grounded in institutional execution across financial services, infrastructure, public sector, and technology.",
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
