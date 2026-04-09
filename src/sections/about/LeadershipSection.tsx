"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LEADERS = [
  {
    name: "Keno Van Vincent",
    title: "Co-Founder",
    photo: "/images/team/vankeno.jpg",
    bio: "Keno Van Vincent is a finance and strategy executive with dual academic credentials from Kenyatta University (BCom, Finance) and Strathmore University (MCom, Finance), complemented by professional certification as a Certified Public Accountant (CPA). As Co-Founder of Rill Singh Limited, Keno leads the firm\u2019s advisory practice across financial strategy, institutional governance, and enterprise growth.",
    tags: ["Financial Strategy", "Institutional Governance", "Enterprise Growth", "Risk Assessment", "Venture Development"],
    linkedin: "#",
  },
  {
    name: "Klyne Keegan",
    title: "Lead Software Architect",
    photo: "/images/team/klyne-keegan.jpg",
    bio: "Klyne Keegan is the technology principal and lead architect behind Rill Singh Limited\u2019s digital infrastructure. His technical foundation spans full-stack engineering (Meta, IBM), data architecture (ALX Africa), and machine learning (MIT). At RSL, he leads the orchestration of the firm\u2019s entire technology stack \u2014 ensuring the firm\u2019s digital presence operates at institutional-grade standards.",
    tags: ["Software Architecture", "Full-Stack Engineering", "Data Engineering", "ML/AI", "Platform Development"],
    linkedin: "#",
  },
];

function LeaderCard({
  leader,
}: {
  leader: (typeof LEADERS)[number];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group flex flex-col">
      {/* ── Portrait card ── */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-neutral-100">
        <Image
          src={leader.photo}
          alt={leader.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Bottom gradient overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Name + title overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <h3 className="text-[1.0625rem] font-semibold leading-tight text-white">
            {leader.name}
          </h3>
          <p className="mt-1 text-[0.8125rem] font-normal text-white/80">
            {leader.title}
          </p>
        </div>
        {/* LinkedIn icon — top-right on hover */}
        <Link
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-white/30 group-hover:opacity-100"
          aria-label={`${leader.name} on LinkedIn`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </Link>
      </div>

      {/* ── Expandable bio panel ── */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[#1B3A5C] transition-colors hover:text-[#132B45]"
        >
          {expanded ? "Close" : "Read bio"}
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`h-3 w-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </button>

        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: expanded ? "600px" : "0px", opacity: expanded ? 1 : 0 }}
        >
          <p className="mt-3 text-[0.875rem] leading-[1.65] text-neutral-600">
            {leader.bio}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {leader.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-[0.6875rem] font-medium text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadershipSection() {
  return (
    <section className="section-wrapper">
      <div className="layout-container">
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-neutral-500 mb-2">
          Leadership
        </span>
        <h2 className="text-[2rem] font-semibold leading-[1.2] text-neutral-900">
          The people behind the practice.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-600 max-w-[55ch]">
          RSL engagements are led by the firm&apos;s principals. The people you meet are the people who deliver.
        </p>

        {/* BCG-style grid: 2-up for 2 members, scales to 3-4 col when more are added */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-3xl">
          {LEADERS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
