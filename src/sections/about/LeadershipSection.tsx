import Image from "next/image";
import Link from "next/link";

const LEADERS = [
  {
    name: "KENO VAN VINCENT",
    title: "Co-Founder",
    photo: "/images/team/keno-van-vincent.jpg",
    bio: "Keno Van Vincent is a finance and strategy executive with dual academic credentials from Kenyatta University (BCom, Finance) and Strathmore University (MCom, Finance), complemented by professional certification as a Certified Public Accountant (CPA). As Co-Founder of Rill Singh Limited, Keno leads the firm\u2019s advisory practice across financial strategy, institutional governance, and enterprise growth.",
    tags: ["Financial Strategy", "Institutional Governance", "Enterprise Growth", "Risk Assessment", "Venture Development"],
    linkedin: "#",
  },
  {
    name: "KLYNE KEEGAN",
    title: "Lead Software Architect",
    photo: "/images/team/klyne-keegan.jpg",
    bio: "Klyne Keegan is the technology principal and lead architect behind Rill Singh Limited\u2019s digital infrastructure. His technical foundation spans full-stack engineering (Meta, IBM), data architecture (ALX Africa), and machine learning (MIT). At RSL, he leads the orchestration of the firm\u2019s entire technology stack \u2014 ensuring the firm\u2019s digital presence operates at institutional-grade standards.",
    tags: ["Software Architecture", "Full-Stack Engineering", "Data Engineering", "ML/AI", "Platform Development"],
    linkedin: "#",
  },
];

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

        <div className="mt-12 flex flex-col gap-0">
          {LEADERS.map((leader, idx) => (
            <div key={leader.name}>
              {idx > 0 && <hr className="border-neutral-200 my-0" />}
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 py-10">
                <div className="flex justify-center md:justify-start">
                  <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-lg overflow-hidden bg-neutral-100">
                    <Image
                      src={leader.photo}
                      alt={leader.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 280px, 280px"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-neutral-900">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] font-medium text-[--a700]">
                    {leader.title}
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-[1.65] text-neutral-700 max-w-[60ch]">
                    {leader.bio}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {leader.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-[0.6875rem] font-medium text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-neutral-500 hover:text-[--a700] transition-colors duration-150"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
