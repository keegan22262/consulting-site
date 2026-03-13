import SectionWrapper from "@/components-v2/sections/SectionWrapper";

const COVERAGE = [
  "Financial Services",
  "Technology & Digital",
  "Energy & Resources",
  "Healthcare & Life Sciences",
  "Public Sector & Government",
  "Industrials & Manufacturing",
  "Consumer & Retail",
  "Transportation & Logistics",
  "Real Estate & Infrastructure",
  "Private Capital",
  "Education & Social Impact",
];

export default function CoverageMatrixSection() {
  return (
    <SectionWrapper background="neutral50" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[var(--text-h2)] leading-[var(--line-height-h2)] font-semibold text-(--n900)">
          Sector Matrix
        </h2>
        <div className="mt-6 h-0.5 w-12 bg-(--a700)" />
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COVERAGE.map((item) => (
            <div key={item} className="rounded-(--radius-card) border border-(--n200) bg-white p-6">
              <p className="text-(--n900) font-semibold leading-[1.35]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
