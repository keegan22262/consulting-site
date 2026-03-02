
"use client";

import React, { useState, useMemo } from "react";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";
import Button from "@/components-v2/ui/Button";

interface InsightItem {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  industry?: string;
}

type SectionBackground = "white" | "slate" | "primary" | "accent50" | "accent700" | "neutral50";

interface InsightsGridSectionProps {
  insights: InsightItem[];
  background?: SectionBackground;
  showFilters?: boolean;
  overline?: string;
  title?: string;
  description?: string;
}

function InsightCard({
  slug,
  category,
  title,
  excerpt
}: InsightItem) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group block overflow-hidden rounded-[12px] bg-white border border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition duration-[200ms] ease-out hover:border-neutral-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-[12px] bg-neutral-200">
        <div className="absolute inset-0 bg-neutral-400 opacity-[0.22] transition duration-[300ms] ease-out group-hover:opacity-[0.35]" />
      </div>
      <div className="p-4 md:p-5 lg:p-6">
        <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
          {category}
        </span>
        <h3 className="text-h3 font-semibold text-neutral-900 mb-2">
          {title}
        </h3>
        <p className="text-base text-neutral-700 leading-relaxed mb-4">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>Read insight</span>
          <span className="inline-flex h-5 w-5 items-center justify-center text-accent-700 opacity-0 translate-x-0 transition duration-[200ms] ease group-hover:opacity-100 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function InsightsGridSection({
  insights,
  background = "white",
  showFilters = true,
  overline = "Insights",
  title = "Latest Research.",
  description,
}: InsightsGridSectionProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    insights.forEach(item => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [insights]);

  const industries = useMemo(() => {
    const set = new Set<string>();
    insights.forEach(item => {
      if (item.industry) set.add(item.industry);
    });
    return Array.from(set);
  }, [insights]);

  const filteredInsights = useMemo(() => {
    return insights.filter(insight => {
      const matchesSearch =
        insight.title.toLowerCase().includes(search.toLowerCase()) ||
        insight.excerpt?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !selectedCategory || insight.category === selectedCategory;

      const matchesIndustry =
        !selectedIndustry || insight.industry === selectedIndustry;

      return matchesSearch && matchesCategory && matchesIndustry;
    });
  }, [insights, search, selectedCategory, selectedIndustry]);

  return (
    <SectionWrapper background={background}>
      <SectionHeader
        overline={overline}
        title={title}
        description={description}
      />

      {showFilters && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search insights..."
            className="w-full md:w-1/3 px-4 py-2 border border-border-subtle rounded-card text-base text-text-primary bg-background focus:outline-none focus:border-accent-primary transition-fast"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "border-accent-700 text-accent-800" : ""}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant="secondary"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "border-accent-700 text-accent-800" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          <select
            value={selectedIndustry ?? ""}
            onChange={e => setSelectedIndustry(e.target.value === "" ? null : e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-border-subtle rounded-card text-base text-text-primary bg-background focus:outline-none focus:border-accent-primary transition-fast"
          >
            <option value="">All industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="rhythm-heading-grid grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {filteredInsights.length === 0 ? (
          <div className="w-full py-16 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold text-text-primary mb-2 text-center">No insights found</h3>
            <p className="text-base text-text-secondary mb-6 text-center">Adjust your filters or search criteria.</p>
            <Button
              variant="primary"
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
                setSelectedIndustry(null);
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          filteredInsights.map((item) => (
            <InsightCard
              key={item.slug}
              slug={item.slug}
              category={item.category}
              title={item.title}
              excerpt={item.excerpt}
            />
          ))
        )}
      </div>
    </SectionWrapper>
  );
}
