"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components-v2/ui/ScrollReveal";
import { useScrollReveal } from "@/components-v2/foundation/useScrollReveal";

const LEADERS = [
  {
    name: "KENO VAN VINCENT",
    title: "Co-Founder & Chief Executive Officer",
    photo: "/images/team/vankeno.jpg",
    bio: "Keno Van Vincent is a finance and strategy executive with dual academic credentials from Kenyatta University (BCom, Finance) and Strathmore University (MCom, Finance), complemented by professional certification as a Certified Public Accountant (CPA). As Co-Founder of Rill Singh Limited, Keno leads the firm\u2019s advisory practice across financial strategy, institutional governance, and enterprise growth.",
    tags: ["Financial Strategy", "Governance", "Enterprise Growth", "CPA"],
    linkedin: "#",
  },
  {
    name: "KLYNE KEEGAN",
    title: "Software Architect",
    photo: "",
    bio: "Klyne Keegan is the technology principal and lead architect behind Rill Singh Limited\u2019s digital infrastructure. His technical foundation spans full-stack engineering (Meta, IBM), data architecture (ALX Africa), and machine learning (MIT). At RSL, he leads the orchestration of the firm\u2019s entire technology stack \u2014 ensuring the firm\u2019s digital presence operates at institutional-grade standards.",
    tags: ["Software Architecture", "Full-Stack", "ML/AI", "Data Engineering"],
    linkedin: "#",
  },
];

function LeaderCard({ leader }: { leader: (typeof LEADERS)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        boxShadow: hovered ? "0 12px 40px rgba(2,16,36,0.12)" : "0 8px 30px rgba(2,16,36,0.08)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {leader.photo && (
        <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden">
          <Image src={leader.photo} alt={leader.name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      )}
      <div className="p-7">
        <h3 className="text-[20px] font-bold tracking-[1px]" style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#021024" }}>
          {leader.name}
        </h3>
        <p className="text-[14px] mt-1" style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#5483B3" }}>
          {leader.title}
        </p>
        <div className="w-10 h-0.5 my-4" style={{ backgroundColor: "#C1E8FF" }} />
        <p
          className="text-[13px] leading-[1.6]"
          style={{
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            color: "#6B7280",
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : 3,
            WebkitBoxOrient: "vertical",
            overflow: expanded ? "visible" : "hidden",
          }}
        >
          {leader.bio}
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-[13px] font-medium transition-colors duration-200 hover:underline"
          style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#5483B3", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
        <div className="flex flex-wrap gap-2 mt-4">
          {leader.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-3 py-1 rounded-[20px] font-medium" style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", backgroundColor: "#C1E8FF", color: "#052659" }}>
              {tag}
            </span>
          ))}
        </div>
        <Link href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 transition-colors duration-200" aria-label={`${leader.name} on LinkedIn`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#5483B3" className="hover:fill-[#052659] transition-colors duration-200">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function LeadershipSection() {
  const headerLabel = useScrollReveal({ direction: "up", delay: 0, distance: 20, duration: 700 });
  const headerTitle = useScrollReveal({ direction: "up", delay: 150, distance: 25, duration: 800 });
  const headerDesc = useScrollReveal({ direction: "up", delay: 300, distance: 20, duration: 800 });

  return (
    <section className="py-20" style={{ backgroundColor: "#F8FBFF" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-center">
          <span
            ref={headerLabel.ref as React.RefObject<HTMLSpanElement>}
            className="block text-[12px] uppercase tracking-[4px] mb-3"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#5483B3", ...headerLabel.style }}
          >
            LEADERSHIP
          </span>
          <h2
            ref={headerTitle.ref as React.RefObject<HTMLHeadingElement>}
            className="text-[36px]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontWeight: 400, color: "#021024", ...headerTitle.style }}
          >
            The people behind the practice.
          </h2>
          <p
            ref={headerDesc.ref as React.RefObject<HTMLParagraphElement>}
            className="text-[15px] max-w-[600px] mx-auto mt-3 mb-12"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#6B7280", ...headerDesc.style }}
          >
            RSL engagements are led by the firm&apos;s principals. The people you meet are the people who deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {LEADERS.map((leader, i) => (
            <ScrollReveal key={leader.name} direction="up" delay={300 + i * 200} distance={40} duration={900}>
              <LeaderCard leader={leader} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
