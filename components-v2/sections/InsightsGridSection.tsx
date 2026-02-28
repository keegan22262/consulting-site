
"use client";

import React, { useState, useMemo } from "react";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import Link from "next/link";

interface InsightItem {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  industry?: string;
}

interface InsightsGridSectionProps {
  insights: InsightItem[];
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
      className="group block border border-border-subtle rounded-card overflow-hidden transition-fast ease-standard transform hover:-translate-y-1 hover:border-border-strong hover:shadow-sm"
    >
      <div className="aspect-video bg-neutral-200" />
      <div className="p-6">
        <span className="block text-xs uppercase tracking-widest text-text-muted mb-2">
          {category}
        </span>
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-fast mb-2">
          {title}
        </h3>
        <p className="text-base text-text-secondary leading-relaxed">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function InsightsGridSection({ insights }: InsightsGridSectionProps) {
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
    <SectionWrapper>
      <SectionHeader
        overline="Insights"
        title="Latest Research."
      />

      {/* Controls container */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-6">
        {/* Search input */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search insights..."
          className="w-full md:w-1/3 px-4 py-2 border border-border-subtle rounded-card text-base text-text-primary bg-background focus:outline-none focus:border-accent-primary transition-fast"
        />

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-card text-base font-medium transition-fast ${selectedCategory === null ? "text-accent-primary" : "text-text-secondary hover:text-accent-primary"}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-card text-base font-medium transition-fast ${selectedCategory === category ? "text-accent-primary" : "text-text-secondary hover:text-accent-primary"}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Industry dropdown */}
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

      {/* ...existing grid rendering... */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredInsights.length === 0 ? (
          <div className="w-full py-16 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold text-text-primary mb-2 text-center">No insights found</h3>
            <p className="text-base text-text-secondary mb-6 text-center">Adjust your filters or search criteria.</p>
            <button
              type="button"
              className="px-6 py-2 rounded-card bg-accent-primary text-white text-base font-medium transition-fast ease-standard hover:bg-accent-primary/90"
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
                setSelectedIndustry(null);
              }}
            >
              Reset filters
            </button>
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
