export type InsightEntry = {
  slug: string;
  headline: string;
  whatItMeans: string;
  source: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export type TopicFilter = {
  label: string;
  categories: string[];
};

export const HERO_BG =
  "https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2t5bGluZSUyMGJ1c2luZXNzJTIwZGlzdHJpY3QlMjBkdXNrfGVufDF8fHx8MTc3MzIzMjQ3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export const ANALYSIS_BG =
  "https://images.unsplash.com/photo-1645363929133-d8210bdad577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMGJyaWRnZSUyMGNvbnN0cnVjdGlvbiUyMGFmcmljYXxlbnwxfHx8fDE3NzMyMzI0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export const TOPIC_FILTERS: TopicFilter[] = [
  { label: "All Insights", categories: [] },
  { label: "Digital Transformation", categories: ["Digital Infrastructure", "Digital Transformation"] },
  { label: "Financial Systems", categories: ["Financial Inclusion", "Tax & Compliance"] },
  { label: "Public Sector", categories: ["Public Sector"] },
  { label: "Infrastructure", categories: ["Operations & Supply Chain"] },
  { label: "Supply Chains", categories: ["Operations & Supply Chain"] },
  { label: "Cybersecurity", categories: ["Cybersecurity & Risk"] },
  { label: "ESG & Sustainability", categories: ["ESG & Sustainability", "Climate & Risk"] },
  { label: "Economic Outlook", categories: ["Macroeconomic Outlook"] },
  { label: "SME Development", categories: ["SME Development"] },
  {
    label: "Institutional Transformation",
    categories: ["Delivery & Execution", "Institutional Resilience", "AI & Governance"],
  },
];

export const INSIGHTS_DATA: InsightEntry[] = [
  {
    slug: "mobile-connectivity-economic-engine",
    headline: "Mobile connectivity is now a core economic engine—so \"digital\" is no longer optional",
    whatItMeans:
      "Across Africa, mobile and connectivity are foundational infrastructure for commerce, financial inclusion, service delivery, and data-driven decision-making.",
    source: "https://event-assets.gsma.com/pdf/20231017-GSMA-Mobile-Economy-Sub-Saharan-Africa-report.pdf",
    category: "Digital Infrastructure",
    date: "2025-10-17",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1741020805000-87e22a38e379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlY29tJTIwdG93ZXIlMjBtb2JpbGUlMjBuZXR3b3JrJTIwaW5mcmFzdHJ1Y3R1cmUlMjBBZnJpY2F8ZW58MXx8fHwxNzczMjM0NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "financial-inclusion-usage-not-access",
    headline: "The next wave of financial inclusion is about \"usage\"—not just access",
    whatItMeans:
      "Financial inclusion has expanded, but the competitive advantage now comes from making digital finance usable: trust, customer experience, responsible credit, and data-led personalization.",
    source: "https://www.worldbank.org/en/publication/globalfindex",
    category: "Financial Inclusion",
    date: "2025-09-28",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1533234944761-2f5337579079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwZGlnaXRhbCUyMHBheW1lbnRzJTIwQWZyaWNhfGVufDF8fHx8MTc3MzIzNDQ2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "public-sector-digital-transformation-measurable",
    headline: "Public sector digital transformation is now measurable—and citizens expect it",
    whatItMeans:
      "Governments are increasingly assessed on the maturity of core systems, service delivery, digital citizen engagement, and enabling foundations.",
    source: "https://openknowledge.worldbank.org/entities/publication/10b535a7-e9d4-51bd-96ed-6b917d5eb09e",
    category: "Public Sector",
    date: "2025-09-15",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwZGlnaXRhbCUyMG9wZXJhdGlvbnMlMjBtb2Rlcm4lMjBvZmZpY2V8ZW58MXx8fHwxNzczMjM0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "supply-chain-resilience-board-priority",
    headline: "Supply-chain resilience has become a board-level priority—not just an operations issue",
    whatItMeans: "Global disruptions exposed logistics as a strategic advantage.",
    source: "https://lpi.worldbank.org/",
    category: "Operations & Supply Chain",
    date: "2025-08-22",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1769144256181-698b8f807066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lciUyMHBvcnQlMjBsb2dpc3RpY3MlMjBhZXJpYWx8ZW58MXx8fHwxNzczMjM0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "cybersecurity-national-enterprise-resilience",
    headline: "Cybersecurity has shifted from \"IT risk\" to national and enterprise resilience",
    whatItMeans:
      "Cyber readiness spans legal, technical, organizational, capacity and cooperation dimensions.",
    source: "https://www.itu.int/en/ITU-D/Cybersecurity/Pages/global-cybersecurity-index.aspx",
    category: "Cybersecurity & Risk",
    date: "2025-08-10",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1655036387197-566206c80980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwb3BlcmF0aW9ucyUyMGNlbnRlciUyMGRhcmslMjBzY3JlZW5zfGVufDF8fHx8MTc3MzIzNDQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "ai-governance-competitive-differentiator",
    headline: "AI's biggest risk is unmanaged AI—governance is now a competitive differentiator",
    whatItMeans:
      "Organizations are moving quickly to AI, but trust, transparency, ethics, and lifecycle controls are becoming mandatory.",
    source: "https://www.iso.org/standard/81230.html",
    category: "AI & Governance",
    date: "2025-07-30",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29yayUyMGFic3RyYWN0fGVufDF8fHx8MTc3MzE2MDA5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "digital-tax-administration-compliance-designed",
    headline: "Digital tax administration is proving that \"compliance can be designed\"",
    whatItMeans:
      "Evidence increasingly shows that e-filing, e-invoicing/fiscalization, and better data use can reduce compliance costs and improve collection.",
    source: "https://www.imf.org/-/media/files/publications/howtonotes/2023/english/htnea2023003.pdf",
    category: "Tax & Compliance",
    date: "2025-07-15",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1710572358383-a2508d860be9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXglMjBhZG1pbmlzdHJhdGlvbiUyMGZpc2NhbCUyMGRpZ2l0YWwlMjBzeXN0ZW1zJTIwb2ZmaWNlfGVufDF8fHx8MTc3MzIzNDQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "sme-growth-constrained-by-systems",
    headline:
      "SME growth is constrained less by \"ideas\" and more by systems: finance, governance, and execution",
    whatItMeans:
      "A consistent theme across emerging markets is that MSMEs face structural barriers—access to finance, informality constraints, and limited operating capacity.",
    source:
      "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/653831510568517947/msme-finance-gap-assessment-of-the-shortfalls-and-opportunities-in-financing-micro-small-and-medium-enterprises-in-emerging-markets",
    category: "SME Development",
    date: "2025-06-25",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1734254807102-fbf62b0cc513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwbWFya2V0cGxhY2UlMjBBZnJpY2FuJTIwZW50cmVwcmVuZXVyfGVufDF8fHx8MTc3MzIzNDQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "esg-decision-useful-disclosure",
    headline: "ESG is moving from \"storytelling\" to decision-useful disclosure",
    whatItMeans:
      "Investors and lenders increasingly want sustainability information that connects directly to financial prospects, risk management, governance, targets, and performance.",
    source:
      "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/ifrs-s2-climate-related-disclosures/",
    category: "ESG & Sustainability",
    date: "2025-06-10",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1770068511771-7c146210a55b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHJlbmV3YWJsZSUyMGVuZXJneSUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc3MzIzNDQ3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "africa-growth-outlook-execution-determines",
    headline: "Africa's growth outlook is resilient—but execution determines who captures it",
    whatItMeans: "Macro conditions may improve unevenly across regions and sectors.",
    source: "https://www.afdb.org/sites/default/files/2024/06/06/aeo_2024_-_chapter_1.pdf",
    category: "Macroeconomic Outlook",
    date: "2025-05-20",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1694434948850-ed51bd461733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYWdvcyUyME5haXJvYmklMjBtb2Rlcm4lMjBjaXR5c2NhcGUlMjBlY29ub21pYyUyMGdyb3d0aHxlbnwxfHx8fDE3NzMyMzQ0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "transformation-delivery-system-differentiator",
    headline:
      "The real differentiator in transformation is the delivery system: cadence, ownership, and artifacts",
    whatItMeans: "Across the market, many firms promise implementation but don't explain delivery mechanics.",
    source:
      "https://thedocs.worldbank.org/en/doc/2fb41046aca43d083008ca6335f1335f-0460042022/original/2022-GTMI-Update-20221116.pdf",
    category: "Delivery & Execution",
    date: "2025-05-05",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1760611656160-7c7bf7e6da9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBib2FyZHJvb20lMjBzdHJhdGVneSUyMHBsYW5uaW5nJTIwZXhlY3V0aXZlfGVufDF8fHx8MTc3MzIzNDQ3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "digital-transformation-converging",
    headline:
      "Digital transformation is converging: strategy + tech + people + risk must move together",
    whatItMeans: "Fragmented projects often fail at adoption.",
    source: "https://www.iso.org/standard/81230.html",
    category: "Digital Transformation",
    date: "2025-04-18",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVyJTIwdGVjaG5vbG9neSUyMGRpZ2l0YWwlMjBjb252ZXJnZW5jZXxlbnwxfHx8fDE3NzMyMzQ0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "resilience-institutions-cooperation-capacity",
    headline:
      "Resilience increasingly depends on institutions: cooperation and capacity-building matter",
    whatItMeans:
      "The fastest-improving organizations are those that invest in internal capability, not just external vendors.",
    source: "https://www.itu.int/en/ITU-D/Cybersecurity/Pages/global-cybersecurity-index.aspx",
    category: "Institutional Resilience",
    date: "2025-04-02",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1673515336414-0db19994707f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxpbnN0aXR1dGlvbmFsJTIwY29vcGVyYXRpb24lMjBjYXBhY2l0eSUyMGJ1aWxkaW5nJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzczMjM0NDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "connectivity-digital-identity-payments-rails",
    headline:
      "Connectivity + digital identity + payments are the \"rails\" for modern services",
    whatItMeans: "Modern customer and citizen experiences depend on strong digital rails.",
    source: "https://www.worldbank.org/en/publication/globalfindex",
    category: "Digital Infrastructure",
    date: "2025-03-15",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1661169398346-aecdc4f5068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaWRlbnRpdHklMjBiaW9tZXRyaWMlMjB2ZXJpZmljYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzIzNDQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    slug: "climate-risk-operational-risk-cost-of-capital",
    headline: "Climate risk is operational risk—and it's starting to show up in cost of capital",
    whatItMeans:
      "Organizations increasingly need to explain how climate-related risks and opportunities affect cash flows, financing access, and strategic choices.",
    source:
      "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/ifrs-s2-climate-related-disclosures/",
    category: "Climate & Risk",
    date: "2025-03-01",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1706737373564-7747084180f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZmxvb2RpbmclMjBpbmR1c3RyaWFsJTIwY29hc3RhbCUyMHJpc2t8ZW58MXx8fHwxNzczMjM0NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];
