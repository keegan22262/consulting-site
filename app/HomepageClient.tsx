"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DiamondMotif from "@/components-v2/ui/DiamondMotif";
import { useReducedMotionPreference } from "@/src/lib/motion/useReducedMotionPreference";
import { CLUSTERS, SERVICES } from "@/src/sections/services/data";
import { INDUSTRIES } from "@/src/sections/industries/data";
import type { HomepageInsight } from "./page";

interface HomepageClientProps {
  insights: HomepageInsight[];
}

/* ── Presentation-only copy that doesn't belong in the CMS fallback data ── */
const CLUSTER_ONE_LINERS: Record<string, string> = {
  "strategy-transformation": "Direction, operating models, and the digital and human systems that carry them.",
  "finance-risk-regulation": "Financial clarity and compliance that hold up under scrutiny.",
  "sustainability-public": "ESG and public-sector work that moves policy into practice.",
  "growth-communications": "Positioning and growth systems for enterprises and SMEs.",
};

const SERVICE_SHORT_LABELS: Record<string, string> = {
  strategy: "Strategy",
  digital: "Digital",
  people: "People",
  finance: "Finance",
  tax: "Tax",
  legal: "Legal",
  esg: "ESG",
  public: "Public",
  sme: "SME",
  comms: "Comms",
};

const DIFFERENTIATORS = [
  {
    title: "Institutional rigor",
    body: "Analysis and governance built to withstand board, investor, and regulator scrutiny.",
  },
  {
    title: "Ground truth",
    body: "Judgment formed inside the markets where you operate — not observed from a distance.",
  },
  {
    title: "Execution focus",
    body: "Engagements measured by what actually changes — not by the weight of the deck.",
  },
] as const;

const FEATURED_INDUSTRY_ID = "financial-services";
const SUPPORTING_INDUSTRY_IDS = ["public-sector-government", "energy-resources", "industrials-manufacturing"];

export default function HomepageClient({ insights }: HomepageClientProps) {
  return (
    <>
      <HeroSection />
      <DifferentiatorsSection />
      <ServiceClustersSection />
      <PointOfViewSection />
      <IndustriesSection />
      {insights.length > 0 && <InsightsSection insights={insights} />}
      <CtaBandSection />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 1 — HERO
════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section data-homepage-hero className="relative bg-white">
      <div className="mx-auto w-full max-w-[72rem] px-6 pt-[clamp(96px,16vh,152px)] sm:px-16">
        <div className="flex flex-col items-center gap-[clamp(18px,2.4vw,26px)] text-center">
          <div className="text-[13px] font-semibold uppercase tracking-[.14em] text-eyebrow">
            Pan-African institutional advisory
          </div>
          <h1 className="max-w-[38rem] font-[var(--font-heading)] text-[clamp(2.25rem,1.55rem+3vw,4.625rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest">
            Institutional advisory, built for African markets.
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[72rem] px-6 pt-[clamp(36px,5vw,56px)] sm:px-16">
        <div className="relative min-h-[clamp(420px,50vw,640px)] overflow-hidden rounded-3xl bg-[linear-gradient(155deg,#0B355E_0%,#021024_78%)]">
          <DiamondMotif left="78%" top="26%" size="100%" />
          <div className="absolute right-[clamp(24px,3vw,40px)] top-[clamp(24px,3vw,40px)] flex w-[min(28rem,80%)] flex-col gap-5 rounded-2xl bg-[--color-paper] p-[clamp(24px,3.2vw,36px)]">
            <p className="max-w-[30ch] text-[clamp(15px,0.3vw+14px,17px)] leading-[1.6] text-[#37424F]">
              We advise governments, investors, and enterprises across ten disciplines and eleven
              sectors — with the rigor boards expect and the ground truth execution demands.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-7">
              <Link
                href="/contact"
                className="rounded-[2px] bg-terracotta px-7 py-4 text-[15px] font-semibold leading-none text-navy-darkest transition-colors hover:bg-terracotta-hover"
              >
                Start a conversation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-eyebrow transition-transform hover:translate-x-0.5 hover:underline"
              >
                Explore our services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[72rem] px-6 pb-[clamp(64px,8vw,96px)] pt-[clamp(24px,3vw,32px)] sm:px-16">
        <div className="text-[12px] font-medium uppercase tracking-[.08em] text-navy-darkest/55">
          10 disciplines · 11 sectors · Nairobi
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 2 — DIFFERENTIATORS
════════════════════════════════════════════════════════════════════ */
function DifferentiatorsSection() {
  const reducedMotion = useReducedMotionPreference();
  const [playing, setPlaying] = useState(true);
  const isPlaying = playing && !reducedMotion;

  return (
    <section className="relative bg-[--color-paper]">
      <div className="mx-auto flex w-full max-w-[72rem] flex-wrap items-center gap-10 px-6 py-[clamp(64px,8vw,96px)] sm:gap-20 sm:px-16">
        <div className="flex min-w-[340px] flex-[48_1_0%] flex-col gap-6">
          <div className="text-[13px] font-bold uppercase tracking-[.14em] text-eyebrow">Why Rill Singh</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest">
            Built to advise. Structured to deliver.
          </h2>
          <p className="max-w-[44ch] text-[17px] leading-[1.75] text-[#37424F]">
            We bring institutional-grade rigor and on-the-ground judgment to every engagement —
            advising governments, investors, and enterprises across ten disciplines and eleven
            sectors, and measuring ourselves by what actually changes.
          </p>
          <div className="mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-terracotta px-8 py-[18px] text-[14px] font-bold uppercase tracking-[.04em] text-navy-darkest transition-colors hover:bg-terracotta-hover"
            >
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="min-w-[360px] flex-[52_1_0%]">
          <div className="relative aspect-[4/3] min-h-[320px] w-full overflow-hidden rounded-3xl bg-navy-darkest shadow-[0_24px_64px_-24px_rgba(2,16,36,.4)]">
            <div className="absolute inset-0 bg-[linear-gradient(165deg,#021024_0%,#052659_100%)]" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[14%]"
              style={{
                background: "rgba(125,160,202,.07)",
                clipPath:
                  "polygon(0% 0%,8.33% 100%,16.66% 0%,25% 100%,33.33% 0%,41.66% 100%,50% 0%,58.33% 100%,66.66% 0%,75% 100%,83.33% 0%,91.66% 100%,100% 0%,100% 0%,0% 0%)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[20%]"
              style={{
                background: "rgba(125,160,202,.09)",
                clipPath:
                  "polygon(0% 100%,8.33% 25%,16.66% 100%,25% 25%,33.33% 100%,41.66% 25%,50% 100%,58.33% 25%,66.66% 100%,75% 25%,83.33% 100%,91.66% 25%,100% 100%)",
              }}
            />
            <DiamondMotif left="50%" top="52%" size="80%" animate playing={isPlaying} />
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause background motion" : "Play background motion"}
              className="absolute bottom-[18px] right-[18px] z-10 flex h-10 w-10 items-center justify-center rounded-[10px] border border-[rgba(247,246,242,.24)] bg-[rgba(247,246,242,.14)] transition-colors hover:bg-[rgba(247,246,242,.24)]"
            >
              {isPlaying ? (
                <span className="flex gap-1">
                  <span className="h-3 w-[3px] rounded-[1px] bg-[--color-paper]" />
                  <span className="h-3 w-[3px] rounded-[1px] bg-[--color-paper]" />
                </span>
              ) : (
                <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-[--color-paper]" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[72rem] px-6 pb-[clamp(64px,8vw,96px)] sm:px-16">
        <div className="flex flex-col gap-9 sm:flex-row">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title} className="flex flex-1 flex-col gap-2.5 border-t border-navy-darkest/16 pr-2 pt-5">
              <h3 className="font-[var(--font-heading)] text-[19px] font-semibold leading-[1.3] text-navy-darkest">
                {d.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#5B6472]">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 3 — SERVICE CLUSTERS
════════════════════════════════════════════════════════════════════ */
function ServiceClustersSection() {
  const cardCopy = (clusterId: string) => {
    const items = SERVICES.filter((s) => s.cluster === clusterId).slice(0, 3);
    return { one_liner: CLUSTER_ONE_LINERS[clusterId] ?? "", items };
  };

  const [c1, c2, c3, c4] = CLUSTERS;

  return (
    <section className="relative bg-white">
      <div className="mx-auto w-full max-w-[72rem] px-6 py-[clamp(64px,8vw,96px)] sm:px-16">
        <div className="mb-[clamp(48px,6vw,72px)] flex max-w-[42rem] flex-col gap-4.5">
          <div className="text-[13px] font-bold uppercase tracking-[.14em] text-eyebrow">Services</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest">
            Ten disciplines. Four ways in.
          </h2>
        </div>

        <div className="flex flex-col gap-[clamp(20px,3vw,24px)] min-[700px]:flex-row">
          <ClusterCardBig num="01" cluster={c1} {...cardCopy(c1.id)} left="60%" top="56%" motifSize="78%" />
          <div className="flex flex-col gap-[clamp(20px,3vw,24px)] min-[700px]:w-[45%]">
            <ClusterCardSmall num="02" cluster={c2} {...cardCopy(c2.id)} left="84%" top="10%" motifSize="70%" />
            <ClusterCardSmall num="03" cluster={c3} {...cardCopy(c3.id)} left="16%" top="94%" motifSize="70%" />
          </div>
        </div>

        <div className="relative mt-[clamp(32px,5vw,48px)] overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#021024_0%,#052659_100%)] p-[clamp(24px,3vw,32px)]">
          <DiamondMotif left="82%" top="50%" size="clamp(160px,20vw,240px)" />
          <div className="relative z-[2] flex max-w-[26rem] flex-col gap-3">
            <div className="text-[12px] font-bold tracking-[.12em] text-blue-light">04</div>
            <h3 className="font-[var(--font-heading)] text-[clamp(1.5rem,1.2rem+1.5vw,2rem)] font-normal leading-[1.15] text-white">
              {c4.label}
            </h3>
            <p className="text-[16px] leading-[1.55] text-[#C3D0DF]">{cardCopy(c4.id).one_liner}</p>
            <ServiceLinks items={cardCopy(c4.id).items} />
          </div>
          <div className="relative z-[2] mt-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-[22px] py-3 text-[13px] font-bold text-navy-darkest transition-colors hover:bg-terracotta-hover"
            >
              Explore <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-[clamp(8px,2vw,16px)]">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-eyebrow transition-transform hover:translate-x-0.5 hover:underline"
          >
            Explore all ten disciplines <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceLinks({ items }: { items: { slug: string }[] }) {
  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-2">
      {items.map((s, i) => (
        <span key={s.slug} className="flex items-center gap-2">
          {i > 0 && <span className="text-white/30">·</span>}
          <Link
            href={`/services/${s.slug}`}
            className="text-[14px] font-medium text-blue-light transition-colors hover:underline"
          >
            {SERVICE_SHORT_LABELS[s.slug] ?? s.slug}
          </Link>
        </span>
      ))}
    </div>
  );
}

function ClusterCardBig({
  num,
  cluster,
  one_liner,
  items,
  left,
  top,
  motifSize,
}: {
  num: string;
  cluster: { id: string; label: string };
  one_liner: string;
  items: { slug: string }[];
  left: string;
  top: string;
  motifSize: string;
}) {
  return (
    <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#021024_0%,#052659_100%)] p-[clamp(28px,3.5vw,40px)] min-[700px]:w-[55%] min-[700px]:flex-none">
      <DiamondMotif left={left} top={top} size={motifSize} />
      <div className="relative z-[2] flex h-full flex-col justify-between">
        <div className="flex max-w-[34rem] flex-col gap-3">
          <div className="text-[12px] font-bold tracking-[.12em] text-blue-light">{num}</div>
          <h3 className="font-[var(--font-heading)] text-[clamp(1.75rem,1.3rem+2.2vw,2.5rem)] font-normal leading-[1.15] text-white">
            {cluster.label}
          </h3>
          <p className="text-[16px] leading-[1.55] text-[#C3D0DF]">{one_liner}</p>
          <ServiceLinks items={items} />
        </div>
        <div className="mt-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-[22px] py-3 text-[13px] font-bold text-navy-darkest transition-colors hover:bg-terracotta-hover"
          >
            Explore <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ClusterCardSmall({
  num,
  cluster,
  one_liner,
  items,
  left,
  top,
  motifSize,
}: {
  num: string;
  cluster: { id: string; label: string };
  one_liner: string;
  items: { slug: string }[];
  left: string;
  top: string;
  motifSize: string;
}) {
  return (
    <div className="relative aspect-[16/10] min-h-[180px] flex-1 overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#021024_0%,#052659_100%)] p-[clamp(22px,2.6vw,28px)]">
      <DiamondMotif left={left} top={top} size={motifSize} />
      <div className="relative z-[2] flex h-full flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-[11px] font-bold tracking-[.12em] text-blue-light">{num}</div>
          <h3 className="font-[var(--font-heading)] text-[clamp(1.15rem,1rem+0.8vw,1.4rem)] font-normal leading-[1.2] text-white">
            {cluster.label}
          </h3>
          <p className="text-[14px] leading-[1.5] text-[#C3D0DF]">{one_liner}</p>
          <ServiceLinks items={items} />
        </div>
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-[18px] py-2.5 text-[12px] font-bold text-navy-darkest transition-colors hover:bg-terracotta-hover"
          >
            Explore <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 4 — POINT OF VIEW
════════════════════════════════════════════════════════════════════ */
function PointOfViewSection() {
  return (
    <section className="relative bg-[--color-paper]">
      <div className="mx-auto flex w-full max-w-[44rem] flex-col items-center px-6 py-[clamp(80px,9vw,128px)] text-center sm:px-16">
        <p className="font-[var(--font-heading)] text-[clamp(1.75rem,1.2rem+3.2vw,3.25rem)] font-normal leading-[1.2] tracking-[-0.01em] text-navy-darkest">
          Africa&apos;s next decade belongs to institutions that can execute.
        </p>
        <div className="mt-[clamp(32px,4vw,40px)]">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-mid transition-transform hover:translate-x-0.5 hover:underline"
          >
            Our point of view, and the work behind it <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 5 — INDUSTRIES
════════════════════════════════════════════════════════════════════ */
function IndustriesSection() {
  const featured = INDUSTRIES.find((i) => i.id === FEATURED_INDUSTRY_ID);
  const supporting = SUPPORTING_INDUSTRY_IDS.map((id) => INDUSTRIES.find((i) => i.id === id)).filter(
    (i): i is NonNullable<typeof i> => Boolean(i),
  );

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      <DiamondMotif left="92%" top="6%" size="46%" />
      <div className="relative z-[2] mx-auto w-full max-w-[72rem] px-6 py-[clamp(64px,8vw,96px)] sm:px-16">
        <div className="mb-[clamp(40px,5vw,56px)] flex max-w-[42rem] flex-col gap-4">
          <div className="text-[13px] font-bold uppercase tracking-[.14em] text-eyebrow">Industries</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-navy-darkest">
            Sector depth across the real economy.
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 [scrollbar-width:thin] lg:gap-1.5">
          <div className="relative h-[clamp(360px,52vw,520px)] w-[88%] flex-none overflow-hidden rounded-2xl bg-[linear-gradient(165deg,#0B355E_0%,#021024_82%)] sm:w-[58%]">
            <DiamondMotif left="16%" top="50%" size="110%" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 rounded-t-2xl bg-[--color-paper] p-[22px]">
              <div className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-blue-mid">Featured sector</div>
              <h3 className="font-[var(--font-heading)] text-[1.4rem] font-semibold leading-[1.2] text-navy-darkest">
                {featured.title}
              </h3>
              <p className="text-[14px] leading-[1.5] text-[#37424F]">{featured.description}</p>
              <Link
                href={`/industries/${featured.id}`}
                className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#B08858] transition-transform hover:translate-x-0.5 hover:underline"
              >
                Explore sector <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {supporting.map((industry, i) => (
            <div
              key={industry.id}
              className="group relative h-[clamp(360px,52vw,520px)] w-[88%] flex-none overflow-hidden rounded-2xl bg-[linear-gradient(165deg,#0F3E6B_0%,#052659_85%)] sm:w-[46%] lg:w-[34%]"
            >
              <DiamondMotif left={`${20 + i * 30}%`} top={i % 2 === 0 ? "16%" : "88%"} size="120%" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 overflow-hidden rounded-t-2xl bg-[--color-paper] p-[18px] lg:h-[34%] lg:transition-[height] lg:duration-500 lg:ease-[cubic-bezier(0.25,0.46,0.45,0.94)] lg:group-hover:h-full lg:group-focus-within:h-full">
                <div className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-blue-mid">Sector</div>
                <h3 className="max-w-[20ch] font-[var(--font-heading)] text-[1.15rem] font-semibold leading-[1.25] text-navy-darkest">
                  {industry.title}
                </h3>
                <p className="text-[13px] leading-[1.5] text-[#37424F] lg:translate-y-2 lg:opacity-0 lg:transition-[opacity,transform] lg:duration-200 lg:ease-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                  {industry.description}
                </p>
                <Link
                  href={`/industries/${industry.id}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#B08858] hover:underline lg:translate-y-2 lg:opacity-0 lg:transition-[opacity,transform] lg:duration-200 lg:ease-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100"
                >
                  Explore sector <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(28px,3.5vw,36px)]">
          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-eyebrow transition-transform hover:translate-x-0.5 hover:underline"
          >
            See all 11 sectors <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 6 — INSIGHTS CAROUSEL
════════════════════════════════════════════════════════════════════ */
function InsightsSection({ insights }: { insights: HomepageInsight[] }) {
  const reducedMotion = useReducedMotionPreference();
  const [index, setIndex] = useState(0);
  const last = insights.length - 1;

  return (
    <section className="relative bg-navy-darkest">
      <div className="mx-auto w-full max-w-[72rem] px-6 py-[clamp(64px,8vw,96px)] sm:px-16">
        <div className="mb-[clamp(40px,5vw,56px)] flex max-w-[42rem] flex-col gap-4">
          <div className="text-[13px] font-bold uppercase tracking-[.14em] text-blue-light">Insights</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-white">
            Latest thinking.
          </h2>
        </div>

        <div className="overflow-hidden rounded-[20px]">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: reducedMotion ? "none" : "transform 300ms ease",
            }}
          >
            {insights.map((insight, i) => (
              <div
                key={insight._id}
                className="relative min-h-[380px] w-full flex-none overflow-hidden bg-[linear-gradient(165deg,#052659_0%,#021024_76%)] sm:min-h-[460px]"
              >
                <DiamondMotif left={`${20 + i * 30}%`} top={i % 2 === 0 ? "30%" : "78%"} size="80%" />
                <div className="relative z-[2] flex h-full max-w-[36rem] flex-col justify-end gap-3 p-[clamp(28px,4vw,48px)]">
                  <div className="text-[11px] font-bold uppercase tracking-[.12em] text-blue-light">
                    {insight.category}
                  </div>
                  <h3 className="font-[var(--font-heading)] text-[clamp(1.5rem,1.2rem+1.6vw,2.15rem)] font-normal leading-[1.2] text-white">
                    {insight.title}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-[#C3D0DF]">{insight.dek}</p>
                  <div className="mt-1 text-[13px] font-medium text-[#C3D0DF]/65">
                    {new Date(insight.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {insights.length > 1 && (
          <div className="mt-[clamp(24px,3vw,32px)] flex items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Previous insight"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-light/35 text-blue-light transition-colors hover:border-blue-light hover:bg-blue-light/12 disabled:opacity-35"
            >
              ‹
            </button>
            <div className="flex items-center gap-2">
              {insights.map((insight, i) => (
                <button
                  key={insight._id}
                  type="button"
                  aria-label={`Go to insight ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className="h-[7px] rounded-full transition-[width,background] duration-200"
                  style={{ width: i === index ? 22 : 7, background: i === index ? "#7DA0CA" : "rgba(125,160,202,.28)" }}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next insight"
              disabled={index === last}
              onClick={() => setIndex((i) => Math.min(last, i + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-light/35 text-blue-light transition-colors hover:border-blue-light hover:bg-blue-light/12 disabled:opacity-35"
            >
              ›
            </button>
          </div>
        )}

        <div className="mt-[clamp(24px,3vw,32px)] flex justify-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-blue-light transition-transform hover:translate-x-0.5 hover:underline"
          >
            All insights <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SECTION 7 — CTA BAND
════════════════════════════════════════════════════════════════════ */
function CtaBandSection() {
  return (
    <section className="relative overflow-hidden bg-[--color-paper]">
      <div className="flex w-full flex-col md:flex-row md:items-stretch">
        <div className="flex flex-none flex-col gap-[22px] px-6 py-[clamp(56px,7vw,88px)] sm:px-16 md:w-[44%] md:justify-center md:px-16">
          <div className="text-[13px] font-bold uppercase tracking-[.14em] text-blue-mid">Get in touch</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(2.25rem,1.6rem+2.6vw,3.25rem)] font-semibold leading-[1.14] tracking-[-0.01em] text-navy-darkest">
            Let&apos;s discuss what&apos;s next for your institution.
          </h2>
          <p className="max-w-[40ch] text-[17px] leading-[1.65] text-[#37424F]">
            A first conversation is free of charge — and free of theatre.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Link
              href="https://wa.me/254793995142"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-navy-darkest bg-transparent px-7 py-4 text-[14px] font-bold tracking-[.02em] text-navy-darkest transition-colors hover:bg-navy-darkest/6"
            >
              Message us on WhatsApp <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 text-[14px] font-bold tracking-[.02em] text-navy-darkest transition-colors hover:bg-terracotta-hover"
            >
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[320px] flex-none items-center justify-center overflow-hidden bg-[linear-gradient(155deg,#0B355E_0%,#021024_78%)] p-[clamp(28px,5vw,56px)] md:w-[56%]">
          <DiamondMotif left="38%" top="44%" size="150%" />
          <div className="relative z-[2] aspect-[4/5] w-[min(360px,84%)] bg-[--color-paper] p-2.5 shadow-[0_24px_64px_-20px_rgba(2,16,36,.5)]">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/team/vankeno.jpg"
                alt="Rill Singh Limited advisory team"
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
