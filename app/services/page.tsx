
import type { Metadata } from "next";
import ServicesPageClient from "@/src/sections/services/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | Rill Singh Limited",
  description:
    "Ten advisory disciplines. One integrated practice. Each capability operates within a shared delivery framework — strategy, digital, finance, people, ESG, and more.",
};

export default function ServicesPage() {
  return (
    <ServicesPageClient />
  );
}
