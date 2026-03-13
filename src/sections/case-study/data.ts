export type CaseStudyRecord = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  image: string;
  industryIds: string[];
  serviceIds: string[];
  metrics: Array<{ value: string; label: string }>;
};

export const CASE_STUDIES: CaseStudyRecord[] = [
  {
    slug: "institutional-transformation-program",
    title: "Institutional Transformation Program",
    client: "Regional Financial Institution",
    summary: "Multi-year transformation across strategy, operating model, and digital delivery.",
    challenge: "Leadership needed a unified plan across fragmented workstreams and rising execution risk.",
    approach: "Established integrated governance, sequenced capabilities, and embedded value-tracking cadence.",
    outcome: "Accelerated delivery velocity, stronger accountability, and measurable operational uplift.",
    image: "/images/services/hero-services.jpg",
    industryIds: ["financial-services"],
    serviceIds: ["strategy", "digital", "finance"],
    metrics: [
      { value: "32%", label: "Cycle-Time Improvement" },
      { value: "24%", label: "Cost Efficiency Uplift" },
      { value: "2.1x", label: "Delivery Throughput" },
    ],
  },
];
