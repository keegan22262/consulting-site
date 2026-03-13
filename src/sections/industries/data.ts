export const C = {
  white: "#FFFFFF",
  a900: "#0C1C2E",
  a700: "#1B3A5C",
  a200: "#CBD7E6",
  n900: "#0F1720",
  n700: "#334155",
  n600: "#475569",
  n500: "#64748B",
  n400: "#94A3B8",
  n200: "#E2E8F0",
  n100: "#F1F5F9",
  n50: "#F8FAFC",
};

export const F = "Inter, system-ui, -apple-system, Segoe UI, sans-serif";
export const M_DUR = "200ms";
export const M_CURVE = "ease";
export const BORDER_RADIUS = "8px";
export const MAX_WIDTH = "1280px";

export const INSIGHT_CAROUSEL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
export const INSIGHT_CARD_H = 520;

export interface IndustryData {
  id: string;
  title: string;
  description: string;
  challenge: string;
  capabilities: string[];
  regulatoryContext: string;
}

export type SectorInsightData = {
  category: string;
  title: string;
  excerpt: string;
  source: string;
  image: string;
  slug: string;
};

export const HERO_BACKGROUNDS = [
  "/images/industries/hero/hero-boardroom.jpg",
  "/images/industries/hero/hero-bridge-infrastructure.jpg",
  "/images/industries/hero/hero-digital-command-center.jpg",
  "/images/industries/hero/hero-city-skyline.jpg",
];

export const PHILOSOPHY_IMAGES = [
  "/images/industries/philosophy/energy-grid.jpg",
  "/images/industries/philosophy/manufacturing-plant.jpg",
  "/images/industries/philosophy/logistics-port.jpg",
  "/images/industries/philosophy/consulting-office.jpg",
];

export const ANALYTICAL_IMAGES = [
  "/images/industries/analytical/financial-data-modeling.jpg",
  "/images/industries/analytical/infrastructure-blueprints.jpg",
  "/images/industries/analytical/digital-command-center.jpg",
];

export const INDUSTRY_IMAGES: Record<string, string> = {
  "financial-services": "/images/industries/sectors/financial-services.jpg",
  "technology-digital": "/images/industries/sectors/technology-digital.jpg",
  "energy-resources": "/images/industries/sectors/energy-resources.jpg",
  "healthcare-life-sciences": "/images/industries/sectors/healthcare-life-sciences.jpg",
  "real-estate-infrastructure": "/images/industries/sectors/real-estate-infrastructure.jpg",
  "public-sector-government": "/images/industries/sectors/public-sector-government.jpg",
  "industrials-manufacturing": "/images/industries/sectors/industrials-manufacturing.jpg",
  "consumer-retail": "/images/industries/sectors/consumer-retail.jpg",
  "transport-logistics": "/images/industries/sectors/transport-logistics.jpg",
  "private-capital": "/images/industries/sectors/private-capital.jpg",
  education: "/images/industries/sectors/education.jpg",
};

export const SECTOR_INSIGHT_IMAGES = {
  technology: "/images/insights/sectors/technology.jpg",
  finance: "/images/insights/sectors/finance.jpg",
  infrastructure: "/images/insights/sectors/infrastructure.jpg",
  publicPolicy: "/images/insights/sectors/public-policy.jpg",
  strategy: "/images/insights/sectors/strategy.jpg",
};

export const INDUSTRIES: IndustryData[] = [
  {
    id: "financial-services",
    title: "Financial Services",
    description:
      "We support banks, capital markets players, insurers, asset/wealth managers, and fintechs as they modernize platforms, strengthen risk and compliance, and build better digital customer experiences.",
    challenge:
      "Navigating regulatory complexity while modernizing legacy platforms and building institutional-grade digital infrastructure.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Digital & AI Transformation",
      "Financial Advisory, Audit & Risk Management",
      "Tax Advisory & Asset Management",
      "Legal & Regulatory Compliance Consulting",
    ],
    regulatoryContext:
      "Banking; Capital Markets; Insurance; Asset/Wealth Management; Fintech",
  },
  {
    id: "healthcare-life-sciences",
    title: "Healthcare & Life Sciences",
    description:
      "We help healthcare providers and payers improve outcomes, access, and affordability through operational excellence and digital enablement.",
    challenge:
      "Improving patient outcomes and system efficiency while managing regulatory burden and technology adoption gaps.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Digital & AI Transformation",
      "People & Organization Consulting",
      "Public Sector & Government Advisory",
      "Legal & Regulatory Compliance Consulting",
    ],
    regulatoryContext:
      "Healthcare (Providers/Payers); Pharma & Biotech; Life Sciences; MedTech",
  },
  {
    id: "energy-resources",
    title: "Energy & Natural Resources",
    description:
      "We partner with energy and resources organizations to improve safety, reliability, and asset performance while navigating the transition to lower-carbon systems.",
    challenge:
      "Balancing operational reliability and cost efficiency with the accelerating transition to sustainable energy systems.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Sustainability & ESG Consulting",
      "Financial Advisory, Audit & Risk Management",
      "Public Sector & Government Advisory",
      "Legal & Regulatory Compliance Consulting",
    ],
    regulatoryContext:
      "Oil & Gas; Utilities; Renewables; Power & Grids; Mining; Metals; Natural Resources",
  },
  {
    id: "industrials-manufacturing",
    title: "Industrials & Manufacturing",
    description:
      "We help industrial companies raise productivity, improve quality, and strengthen supply networks across increasingly complex operations.",
    challenge:
      "Raising throughput and margins while managing volatile input costs, supply chain disruption, and digital transformation.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Digital & AI Transformation",
      "Financial Advisory, Audit & Risk Management",
      "People & Organization Consulting",
      "SME Development & Growth Consulting",
    ],
    regulatoryContext:
      "Industrial Manufacturing; Industrial Products & Services; Engineering/Construction Materials; Industrial Equipment",
  },
  {
    id: "consumer-retail",
    title: "Consumer & Retail",
    description:
      "We support consumer-facing companies in winning market share through sharper brand strategy, revenue growth management, and omnichannel execution.",
    challenge:
      "Winning share in fragmented markets while responding to rapidly shifting consumer behavior and channel dynamics.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Digital & AI Transformation",
      "Digital Communication & Social Media Consulting",
      "Tax Advisory & Asset Management",
      "Financial Advisory, Audit & Risk Management",
    ],
    regulatoryContext:
      "Retail; Consumer Products; Consumer Goods & Services; CPG; Food & Beverage; Luxury",
  },
  {
    id: "technology-digital",
    title: "Technology, Media & Telecommunications",
    description:
      "We help technology, media, and telecom companies scale growth, modernize operating models, and improve unit economics in fast-moving markets.",
    challenge:
      "Scaling growth and retention while modernizing operations and maintaining innovation velocity.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Digital & AI Transformation",
      "People & Organization Consulting",
      "Digital Communication & Social Media Consulting",
      "SME Development & Growth Consulting",
    ],
    regulatoryContext:
      "Technology; Software & Platforms; High Tech; Media & Entertainment; Telecommunications; Communications",
  },
  {
    id: "transport-logistics",
    title: "Transportation & Logistics",
    description:
      "We support airlines, shippers, logistics providers, and travel/hospitality businesses in optimizing networks, improving service reliability, and enhancing customer experience.",
    challenge:
      "Maintaining dependable operations and profitability through demand volatility and network complexity.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Digital & AI Transformation",
      "Financial Advisory, Audit & Risk Management",
      "People & Organization Consulting",
      "Sustainability & ESG Consulting",
    ],
    regulatoryContext: "Transportation; Logistics; Shipping; Travel; Tourism; Hospitality",
  },
  {
    id: "public-sector-government",
    title: "Public Sector & Government",
    description:
      "We work with governments, agencies, and defense organizations to improve service delivery, strengthen governance, and modernize legacy systems securely.",
    challenge:
      "Delivering measurable citizen outcomes while modernizing governance, technology, and institutional capability.",
    capabilities: [
      "Public Sector & Government Advisory",
      "Strategy & Corporate Transformation",
      "People & Organization Consulting",
      "Sustainability & ESG Consulting",
      "Financial Advisory, Audit & Risk Management",
    ],
    regulatoryContext:
      "Public Sector; Government (Federal/State/Local); Defense & Security; National Security",
  },
  {
    id: "real-estate-infrastructure",
    title: "Real Estate & Infrastructure",
    description:
      "We help owners, investors, and operators improve the performance of real assets across the lifecycle — from planning and development to operations and portfolio strategy.",
    challenge:
      "Improving returns and reducing risk across complex asset lifecycles in volatile market conditions.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Financial Advisory, Audit & Risk Management",
      "Legal & Regulatory Compliance Consulting",
      "Sustainability & ESG Consulting",
      "Tax Advisory & Asset Management",
    ],
    regulatoryContext: "Real Estate; Infrastructure; Construction; Capital Projects",
  },
  {
    id: "private-capital",
    title: "Private Capital",
    description:
      "We support investors across the deal lifecycle — from commercial due diligence through post-merger integration, value creation, and exit readiness.",
    challenge:
      "Accelerating value creation across portfolio companies while maintaining diligence discipline and exit readiness.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Financial Advisory, Audit & Risk Management",
      "Digital & AI Transformation",
      "People & Organization Consulting",
      "Tax Advisory & Asset Management",
    ],
    regulatoryContext: "Private Equity; Principal Investors; Private Capital",
  },
  {
    id: "education",
    title: "Education & Social Impact",
    description:
      "We help education institutions and social-impact organizations sharpen strategy, improve operating models, and measure outcomes more effectively.",
    challenge:
      "Delivering better outcomes at scale where resources are constrained and accountability is critical.",
    capabilities: [
      "Strategy & Corporate Transformation",
      "Public Sector & Government Advisory",
      "People & Organization Consulting",
      "Digital & AI Transformation",
      "Sustainability & ESG Consulting",
    ],
    regulatoryContext:
      "Education; Non-Profits; Social Enterprise; Foundations; Development Organizations",
  },
];

export const PHILOSOPHY_CARDS = [
  {
    title: "Regulatory Calibration",
    body: "Advisory architecture must embed the regulatory environment of each sector — translating compliance requirements into operational governance.",
    image: PHILOSOPHY_IMAGES[0],
  },
  {
    title: "Market Intelligence",
    body: "Sector-specific competitive dynamics shape strategy. We map market structures before defining advisory scope.",
    image: PHILOSOPHY_IMAGES[1],
  },
  {
    title: "Operational Maturity",
    body: "Digital readiness and operational complexity differ across industries. Our frameworks are calibrated to each sector's transformation velocity.",
    image: PHILOSOPHY_IMAGES[2],
  },
  {
    title: "Cross-Sector Transfer",
    body: "Multi-sector presence generates compounding intelligence. Patterns from one industry systematically strengthen advisory quality across all others.",
    image: PHILOSOPHY_IMAGES[3],
  },
];

export const SECTOR_INSIGHTS: SectorInsightData[] = [
  {
    category: "Technology",
    title: "AI Readiness Assessment for African Enterprises",
    excerpt:
      "Evaluating organizational, data, and infrastructure readiness for AI adoption across industries with varying levels of digital maturity.",
    source: "RSL Perspectives · January 2026",
    image: SECTOR_INSIGHT_IMAGES.technology,
    slug: "ai-readiness-assessment",
  },
  {
    category: "Finance",
    title: "Capital Structure Optimization in Volatile Currency Environments",
    excerpt:
      "Analytical methodology for managing multi-currency exposure and debt structuring in African markets subject to exchange rate instability.",
    source: "RSL Perspectives · December 2025",
    image: SECTOR_INSIGHT_IMAGES.finance,
    slug: "capital-structure-optimization",
  },
  {
    category: "Infrastructure",
    title: "Corridor-Led Development: Unlocking Continental Trade Routes",
    excerpt:
      "How integrated transport and logistics corridors are reshaping intra-African trade, enabling scale economics and catalysing industrial zones.",
    source: "RSL Perspectives · November 2025",
    image: SECTOR_INSIGHT_IMAGES.infrastructure,
    slug: "corridor-led-development",
  },
  {
    category: "Public Policy",
    title: "Renewable Energy Transition and Institutional Readiness",
    excerpt:
      "Assessing the regulatory, financial, and operational architectures required for governments and utilities to accelerate just energy transitions.",
    source: "RSL Perspectives · October 2025",
    image: SECTOR_INSIGHT_IMAGES.publicPolicy,
    slug: "renewable-energy-transition",
  },
  {
    category: "Strategy",
    title: "Scaling Advisory-Led Growth in Sub-Saharan Africa",
    excerpt:
      "A framework for enterprise advisory firms positioning against global incumbents while maintaining boutique delivery quality and cultural relevance.",
    source: "RSL Perspectives · February 2026",
    image: SECTOR_INSIGHT_IMAGES.strategy,
    slug: "scaling-advisory-led-growth",
  },
];

export const ANALYTICAL_BLOCKS = [
  {
    headline: "Cross-Sector Pattern Recognition",
    body: "Compliance frameworks developed for financial services inform governance architecture across healthcare, energy, and public sector engagements — accelerating implementation through proven structural templates. Our multi-sector presence generates compounding intelligence that single-industry practices cannot replicate.",
    image: ANALYTICAL_IMAGES[0],
  },
  {
    headline: "Digital Maturity Benchmarking",
    body: "Technology transformation patterns observed in digital-native sectors provide calibrated benchmarks for organizations in traditional industries navigating digital operating model transitions. We measure readiness across data infrastructure, organizational capability, and technology adoption velocity.",
    image: ANALYTICAL_IMAGES[1],
  },
  {
    headline: "Capital Allocation Discipline",
    body: "Investment governance frameworks refined in capital-intensive sectors — energy, infrastructure, financial services — transfer directly to portfolio rationalization and growth strategy across all industries. Our analytical approach connects capital decisions to measurable strategic outcomes.",
    image: ANALYTICAL_IMAGES[2],
  },
];

export const TRANSFORMATION_FORCES = [
  {
    title: "Regulatory Convergence",
    body: "Cross-border regulatory harmonization is reshaping compliance architectures across financial services, healthcare, and technology — creating both complexity and opportunity for institutions with multi-jurisdictional presence.",
  },
  {
    title: "Digital Infrastructure Maturity",
    body: "The gap between digital-native and traditional sectors is narrowing as cloud, AI, and automation become baseline expectations. Organizations that delay transformation face accelerating competitive disadvantage.",
  },
  {
    title: "Capital Reallocation",
    body: "ESG mandates, geopolitical risk, and shifting return expectations are fundamentally altering capital flows across sectors — from energy transition investment to infrastructure modernization.",
  },
  {
    title: "Operational Resilience",
    body: "Supply chain disruption, cyber threats, and climate risk have elevated operational resilience from a compliance concern to a board-level strategic imperative across all industries.",
  },
  {
    title: "Geopolitical Restructuring",
    body: "Trade realignment, sanctions regimes, and regional economic integration are redrawing the map of where and how institutions operate — demanding new advisory frameworks for strategic planning.",
  },
];

export const FILTER_CATEGORIES = [
  { label: "All Industries", ids: [] as string[] },
  { label: "Financial Systems", ids: ["financial-services", "private-capital"] },
  {
    label: "Infrastructure & Energy",
    ids: ["energy-resources", "real-estate-infrastructure", "transport-logistics"],
  },
  { label: "Technology & Digital", ids: ["technology-digital"] },
  { label: "Public Sector", ids: ["public-sector-government", "education"] },
  {
    label: "Consumer & Industrial",
    ids: ["consumer-retail", "industrials-manufacturing"],
  },
  { label: "Healthcare & Life Sciences", ids: ["healthcare-life-sciences"] },
] as const;
