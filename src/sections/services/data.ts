// Static fallback data for Services page.
// Used when Sanity CMS returns no results.
// Copy preserved verbatim from Figma reference (figma-reference/rslservices.tsx).

export interface ServiceItem {
  slug: string;
  title: string;
  focusAreas: string;
  approach: string;
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "strategy",
    title: "Strategy & Corporate Transformation",
    focusAreas: "Corporate strategy, M&A advisory, organizational transformation, and growth strategy.",
    approach:
      "We guide businesses in navigating complex challenges, offering strategic development and ongoing support for seamless execution and measurable results.",
  },
  {
    slug: "digital",
    title: "Digital & AI Transformation",
    focusAreas: "Digital strategy, AI implementation, automation, cloud migration, and cybersecurity.",
    approach:
      "We integrate advanced technology solutions to optimize operations, ensuring businesses stay ahead of the digital curve.",
  },
  {
    slug: "finance",
    title: "Financial Advisory, Audit & Risk Management",
    focusAreas: "Regulatory compliance, risk assessment, financial restructuring, and forensic accounting.",
    approach:
      "We provide expert advice on navigating complex financial landscapes, ensuring sustainability and growth.",
  },
  {
    slug: "people",
    title: "People & Organization Consulting",
    focusAreas:
      "Talent management, leadership development, organizational design, and change management.",
    approach:
      "We foster organizational growth by optimizing talent and leadership, ensuring businesses are agile and adaptive to change.",
  },
  {
    slug: "esg",
    title: "Sustainability & ESG Consulting",
    focusAreas:
      "Sustainable business practices, ESG reporting, climate risk assessment, and circular economy strategies.",
    approach:
      "We help businesses embed sustainability into their core operations, meeting regulatory standards and driving environmental impact.",
  },
  {
    slug: "public",
    title: "Public Sector & Government Advisory",
    focusAreas:
      "Policy analysis, public sector reform, digital government transformation, and public-private partnerships.",
    approach:
      "We assist governments and institutions in modernizing operations, improving governance, and fostering strategic partnerships.",
  },
  {
    slug: "comms",
    title: "Digital Communication & Social Media Consulting",
    focusAreas:
      "Social media strategy, digital brand management, content marketing, and influencer marketing.",
    approach:
      "We craft tailored digital strategies that enhance engagement, boost brand visibility, and drive growth.",
  },
  {
    slug: "tax",
    title: "Tax Advisory & Asset Management",
    focusAreas:
      "Tax compliance, international tax planning, wealth management, estate planning, and investment strategies.",
    approach:
      "We offer insightful and strategic tax planning solutions to optimize wealth management and ensure financial stability.",
  },
  {
    slug: "legal",
    title: "Legal & Regulatory Compliance Consulting",
    focusAreas:
      "Corporate governance, local regulatory compliance, international trade law, intellectual property, and labor law advisory.",
    approach: "We provide legal and regulatory expertise to ensure compliance and mitigate risk.",
  },
  {
    slug: "sme",
    title: "SME Development & Growth Consulting",
    focusAreas:
      "Business incubation, financing for SMEs, market entry strategies, operational efficiency, and export facilitation.",
    approach:
      "We help SMEs scale and expand through strategic planning, funding facilitation, and operational optimization.",
  },
];
