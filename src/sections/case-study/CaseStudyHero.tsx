import type { CaseStudyRecord } from "./data";
import Link from "next/link";
import Image from "next/image";

export default function CaseStudyHero({ study }: { study: CaseStudyRecord }) {
  return (
    <>
      <section className="bg-(--n50)">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-(--a700)">Client Impact</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#0F1720] md:text-5xl">
            {study.title}
          </h1>
          <p
            className="mt-3 max-w-[52ch] text-(--n500)"
            style={{ fontSize: "var(--text-body)", lineHeight: "var(--line-height-body)" }}
          >
            {study.client}
          </p>
          <p
            className="mt-5 max-w-[56ch] text-(--n700)"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: "var(--line-height-body-lg)" }}
          >
            {study.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {study.industryIds.map((industryId) => (
              <Link
                key={industryId}
                href={`/industries/${industryId}`}
                className="rounded-lg bg-[#F1F5F9] px-3 py-1.5 text-xs font-medium text-[#475569] transition hover:bg-[#E2E8F0]"
              >
                {humanizeIdentifier(industryId)}
              </Link>
            ))}
            {study.serviceIds.map((serviceId) => (
              <Link
                key={serviceId}
                href={`/services/${serviceId}`}
                className="rounded-lg bg-[#EEF2FF] px-3 py-1.5 text-xs font-medium text-[#1B3A5C] transition hover:bg-[#E0E7FF]"
              >
                {humanizeIdentifier(serviceId)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-8 md:pb-12 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="relative w-full overflow-hidden rounded-xl pt-[45%] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <Image src={study.image} alt={study.title} fill className="object-cover" sizes="100vw" />
            <div className="bg-linear-to-t absolute inset-x-0 bottom-0 h-24 from-black/15 to-transparent" />
          </div>
        </div>
      </section>
    </>
  );
}

function humanizeIdentifier(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
