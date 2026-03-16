"use client";

import ServicesCardGrid from "@/src/sections/services/ServicesCardGrid";
import { SERVICES } from "@/src/sections/services/data";

export default function AdvisoryDisciplinesSection() {
  return (
    <ServicesCardGrid
      services={SERVICES}
      overline="Professional Services"
      title="Advisory Disciplines"
      description="Ten integrated advisory disciplines. One shared delivery framework. Each capability is designed to work independently or as part of a coordinated, multi-disciplinary engagement."
    />
  );
}
