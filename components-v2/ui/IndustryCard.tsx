"use client";
import { useState } from "react";

interface IndustryCardProps {
  title: string;
  description: string;
  href: string;
}

export default function IndustryCard({ title, description, href }: IndustryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white border border-subtle rounded-card overflow-hidden transition-fast ease-standard flex flex-col ${hovered ? "shadow-cardSemantic border-strong" : ""}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {/* Image placeholder (replace with actual image logic if needed) */}
      {/* <div className="relative h-[140px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center grayscale-[70%] contrast-[1.05] transition-fast ease-standard" style={{ opacity: hovered ? 0.35 : 0.22 }} />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
      </div> */}

      <div className="p-7 flex flex-col flex-1">
        <h3 className={`font-semibold text-lg leading-relaxed transition-fast ease-standard ${hovered ? "text-accent-primary" : "text-neutral-900"}`}>
          {title}
        </h3>
        <p className="text-neutral-600 mt-2 flex-1 line-clamp-2">
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-subtle flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-primary">
            Explore industry
          </span>
          <span className={`font-semibold text-base transition-fast ease-standard ${hovered ? "text-accent-hover" : "text-neutral-300"}`}>
            →
          </span>
        </div>
      </div>
    </a>
  );
}
