import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import type { ServiceItem } from "./data";

interface Props {
  services: ServiceItem[];
}

/**
 * ServicesCardGrid
 *
 * Dark navy grid of service cards. 3-col desktop / 2-col tablet / 1-col mobile.
 * Each card links to /services/[slug].
 * IDs are set on each card anchor so ServicesNavStrip can scroll to them.
 *
 * Layout: Figma reference — figma-reference/rslservices.tsx → ServiceGridSection
 * Background: --a900 (deep navy, #0C1C2E)
 * Card style: translucent navy, orange top accent, white text, hover lightens bg.
 * Spacing: section py-24 (96px); card p-7 (28px); grid gap-6 (24px); mt-12 after header
 * Typography: overline caption, H2 title, H3 card title, 14px body, 13px CTA
 */
export default function ServicesCardGrid({ services }: Props) {
  return (
    <SectionWrapper
      className="bg-(--a900)"
      padV={{ mobile: 48, tablet: 64, desktop: 80 }}
    >
      {/* Section header — custom colours for dark background */}
      <div className="mb-10 md:mb-12">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
          Professional Services
        </span>
        <h2
          className="mt-2 font-semibold text-white"
          style={{
            fontSize: "var(--text-h2)",
            lineHeight: "var(--line-height-h2)",
          }}
        >
          Advisory Disciplines
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {services.map((svc) => (
          <ServiceDarkCard key={svc.slug} service={svc} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ServiceDarkCard({ service }: { service: ServiceItem }) {
  return (
    <div id={`service-${service.slug}`}>
      <Link
        href={`/services/${service.slug}`}
        className="group flex min-h-70 flex-col rounded-(--radius-card) border-t-[3px] border-t-(--o500) bg-[rgba(27,58,92,0.35)] p-7 no-underline transition-colors duration-150 hover:bg-[rgba(27,58,92,0.55)]"
      >
        {/* Card title */}
        <h3
          className="font-semibold text-white transition-colors duration-150 group-hover:text-(--o500)"
          style={{
            fontSize: "var(--text-h3)",
            lineHeight: "1.3",
          }}
        >
          {service.title}
        </h3>

        {/* Card body — approach copy */}
        <p
          className="mt-3 grow leading-[1.6] text-white/70"
          style={{ fontSize: "0.875rem" }}
        >
          {service.approach}
        </p>

        {/* Explore CTA */}
        <span className="mt-5 inline-block text-[13px] font-semibold text-white/60 transition-colors duration-150 group-hover:text-white">
          Explore →
        </span>
      </Link>
    </div>
  );
}
