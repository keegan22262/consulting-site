import type { Metadata } from "next";
import IndustriesPageClient from "@/src/sections/industries/IndustriesPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Deep sector expertise across 11 industries shaping Africa's next decade of economic transformation.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
