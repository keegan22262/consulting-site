
import type { Metadata } from "next";
import ServicesPageClient from "@/src/sections/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Ten integrated advisory disciplines spanning strategy, digital, finance, people, and governance.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <ServicesPageClient />
  );
}
