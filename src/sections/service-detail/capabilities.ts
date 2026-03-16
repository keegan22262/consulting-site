import type { CapabilityData } from "@/src/sections/service-detail/data";

export const CAPABILITIES: Record<string, CapabilityData> = {
  strategy: {
    id: "strategy",
    number: "01",
    title: "Strategy & Corporate Transformation",
    focusAreas: "Corporate strategy, M&A advisory, organizational transformation, and growth strategy.",
    targetClients: "Multinational corporations, large enterprises, and growth-focused startups.",
    approach:
      "We guide businesses in navigating complex challenges, offering strategic development and ongoing support for seamless execution and measurable results.",
    deliverables: [
      {
        overline: "Strategic Planning",
        title: "Corporate Strategy Architecture",
        body:
          "End-to-end strategic framework development from market assessment through execution planning, calibrated for boards and C-suites navigating complex transitions.",
      },
      {
        overline: "M&A Advisory",
        title: "Transaction & Integration Support",
        body:
          "Pre-deal assessment, commercial due diligence, integration planning, and post-merger value realization across cross-border and domestic transactions.",
      },
      {
        overline: "Transformation",
        title: "Organizational Redesign",
        body:
          "Operating model restructuring, capability building, and change management for enterprises undergoing fundamental business model transitions.",
      },
      {
        overline: "Growth Strategy",
        title: "Market Entry & Expansion",
        body:
          "Market sizing, competitive positioning, go-to-market architecture, and geographic expansion strategy for scaling organizations.",
      },
    ],
    relatedIndustries: ["financial-services", "technology-digital", "energy-resources"],
  },
  digital: {
    id: "digital",
    number: "02",
    title: "Digital & AI Transformation",
    focusAreas: "Digital strategy, AI implementation, automation, cloud migration, and cybersecurity.",
    targetClients: "Tech companies, large enterprises, SMEs, and organizations looking to innovate.",
    approach:
      "We integrate advanced technology solutions to optimize operations, ensuring businesses stay ahead of the digital curve.",
    deliverables: [
      {
        overline: "Digital Strategy",
        title: "Digital Operating Model Design",
        body:
          "Enterprise-wide digital strategy including platform architecture, data governance, and technology roadmap development.",
      },
      {
        overline: "AI & Analytics",
        title: "AI Readiness & Implementation",
        body:
          "Organizational, data, and infrastructure readiness assessment for AI adoption with phased implementation planning.",
      },
      {
        overline: "Automation",
        title: "Process Automation & Cloud",
        body:
          "Cloud migration strategy, RPA implementation, and intelligent automation across operational workflows.",
      },
      {
        overline: "Cybersecurity",
        title: "Security Architecture",
        body:
          "Cybersecurity posture assessment, framework implementation, and incident response planning for regulated environments.",
      },
    ],
    relatedIndustries: ["technology-digital", "financial-services", "healthcare-life-sciences"],
  },
  finance: {
    id: "finance",
    number: "03",
    title: "Financial Advisory, Audit & Risk Management",
    focusAreas: "Regulatory compliance, risk assessment, financial restructuring, and forensic accounting.",
    targetClients: "Large corporations, financial institutions, and restructuring organizations.",
    approach:
      "We provide expert advice on navigating complex financial landscapes, ensuring sustainability and growth.",
    deliverables: [
      {
        overline: "Risk Governance",
        title: "Enterprise Risk Framework",
        body:
          "Comprehensive risk governance architecture including risk appetite frameworks, control environment assessment, and board reporting structures.",
      },
      {
        overline: "Financial Advisory",
        title: "Transaction & Restructuring",
        body:
          "Financial due diligence, capital structure optimization, and restructuring advisory for organizations navigating complex financial transitions.",
      },
      {
        overline: "Audit & Assurance",
        title: "Internal Audit Architecture",
        body:
          "Internal audit methodology design, control testing frameworks, and assurance program development aligned to institutional-grade standards.",
      },
      {
        overline: "Forensic Services",
        title: "Investigation & Compliance",
        body:
          "Forensic accounting, fraud investigation, and regulatory compliance review for organizations facing integrity challenges.",
      },
    ],
    relatedIndustries: ["financial-services", "private-capital", "energy-resources"],
  },
  people: {
    id: "people",
    number: "04",
    title: "People & Organization Consulting",
    focusAreas: "Talent management, leadership development, organizational design, and change management.",
    targetClients: "Growing startups, established corporations, and organizations undergoing transformation.",
    approach:
      "We foster organizational growth by optimizing talent and leadership, ensuring businesses are agile and adaptive to change.",
    deliverables: [
      {
        overline: "Organization Design",
        title: "Operating Model & Structure",
        body:
          "Organizational architecture redesign including spans of control, role clarity, and governance frameworks for scaling enterprises.",
      },
      {
        overline: "Leadership",
        title: "Leadership Assessment & Development",
        body: "C-suite and senior leadership assessment, succession planning, and executive development programs.",
      },
      {
        overline: "Talent Strategy",
        title: "Workforce Planning & Talent Architecture",
        body:
          "Strategic workforce planning, talent acquisition frameworks, and retention architecture calibrated to organizational growth trajectories.",
      },
      {
        overline: "Culture",
        title: "Culture Transformation & Change",
        body:
          "Culture diagnostic, change management methodology, and behavioral architecture for organizations undergoing fundamental transitions.",
      },
    ],
    relatedIndustries: ["technology-digital", "industrials-manufacturing", "public-sector-government"],
  },
  esg: {
    id: "esg",
    number: "05",
    title: "Sustainability & ESG Consulting",
    focusAreas: "Sustainable business practices, ESG reporting, climate risk assessment, and circular economy strategies.",
    targetClients: "Corporations, multinational companies, and public sector organizations.",
    approach:
      "We help businesses embed sustainability into their core operations, meeting regulatory standards and driving environmental impact.",
    deliverables: [
      {
        overline: "ESG Strategy",
        title: "Sustainability Framework Design",
        body:
          "ESG strategy development, materiality assessment, and sustainability roadmap aligned to global disclosure standards.",
      },
      {
        overline: "Reporting",
        title: "ESG Reporting & Disclosure",
        body:
          "Sustainability reporting framework implementation, data governance, and stakeholder communication architecture.",
      },
      {
        overline: "Climate Risk",
        title: "Climate Risk Assessment",
        body:
          "Physical and transition risk assessment, scenario analysis, and climate adaptation strategy development.",
      },
      {
        overline: "Circular Economy",
        title: "Circular Economy Advisory",
        body:
          "Circular business model design, waste reduction strategies, and resource efficiency optimization for industrial organizations.",
      },
    ],
    relatedIndustries: ["energy-resources", "industrials-manufacturing", "real-estate-infrastructure"],
  },
  public: {
    id: "public",
    number: "06",
    title: "Public Sector & Government Advisory",
    focusAreas: "Policy analysis, public sector reform, digital government transformation, and public-private partnerships.",
    targetClients: "Government agencies, public sector organizations, and non-profits.",
    approach:
      "We assist governments and institutions in modernizing operations, improving governance, and fostering strategic partnerships.",
    deliverables: [
      {
        overline: "Policy Design",
        title: "Policy & Regulatory Framework",
        body:
          "Evidence-based policy design, regulatory impact assessment, and institutional capacity building for government organizations.",
      },
      {
        overline: "Digital Government",
        title: "Government Modernization",
        body:
          "Digital service delivery transformation, citizen experience design, and legacy system modernization for public institutions.",
      },
      {
        overline: "Governance",
        title: "Institutional Governance Reform",
        body:
          "Governance architecture redesign, performance management frameworks, and accountability systems for public sector organizations.",
      },
      {
        overline: "Partnerships",
        title: "Public-Private Partnerships",
        body:
          "PPP structuring, stakeholder engagement, and project governance frameworks for large-scale public infrastructure initiatives.",
      },
    ],
    relatedIndustries: ["public-sector-government", "education", "healthcare-life-sciences"],
  },
  comms: {
    id: "comms",
    number: "07",
    title: "Digital Communication & Social Media Consulting",
    focusAreas: "Social media strategy, digital brand management, content marketing, and influencer marketing.",
    targetClients: "SMEs, tech companies, startups, and organizations seeking to strengthen their digital presence.",
    approach:
      "We craft tailored digital strategies that enhance engagement, boost brand visibility, and drive growth.",
    deliverables: [
      {
        overline: "Strategy",
        title: "Communications Architecture",
        body:
          "Strategic communications framework development including channel strategy, messaging architecture, and stakeholder engagement design.",
      },
      {
        overline: "Digital Presence",
        title: "Digital Brand Management",
        body:
          "Brand positioning, digital identity systems, and online presence optimization for institutional and corporate audiences.",
      },
      {
        overline: "Content",
        title: "Content & Engagement Strategy",
        body: "Content marketing architecture, editorial governance, and engagement measurement frameworks.",
      },
      {
        overline: "Influencer",
        title: "Influencer & Advocacy Programs",
        body:
          "Influencer identification, partnership architecture, and advocacy program design for brand amplification.",
      },
    ],
    relatedIndustries: ["technology-digital", "consumer-retail", "industrials-manufacturing"],
  },
  tax: {
    id: "tax",
    number: "08",
    title: "Tax Advisory & Asset Management",
    focusAreas: "Tax compliance, international tax planning, wealth management, estate planning, and investment strategies.",
    targetClients: "High-net-worth individuals, corporations, and family offices.",
    approach:
      "We offer insightful and strategic tax planning solutions to optimize wealth management and ensure financial stability.",
    deliverables: [
      {
        overline: "Tax Planning",
        title: "Tax Strategy & Compliance",
        body:
          "Corporate and individual tax planning, cross-border tax structuring, and compliance advisory for complex jurisdictional environments.",
      },
      {
        overline: "Wealth Management",
        title: "Asset & Wealth Governance",
        body:
          "Wealth structuring, investment governance, and family office advisory for high-net-worth individuals and corporate entities.",
      },
      {
        overline: "Estate Planning",
        title: "Succession & Estate Architecture",
        body: "Estate planning, succession strategy, and intergenerational wealth transfer frameworks.",
      },
      {
        overline: "Investment",
        title: "Investment Strategy Design",
        body: "Portfolio construction, asset allocation frameworks, and alternative investment advisory for institutional and private clients.",
      },
    ],
    relatedIndustries: ["financial-services", "private-capital", "real-estate-infrastructure"],
  },
  legal: {
    id: "legal",
    number: "09",
    title: "Legal & Regulatory Compliance Consulting",
    focusAreas: "Corporate governance, local regulatory compliance, international trade law, intellectual property, and labor law advisory.",
    targetClients: "MNCs, SMEs, and tech companies dealing with complex regulatory issues.",
    approach: "We provide legal and regulatory expertise to ensure compliance and mitigate risk.",
    deliverables: [
      {
        overline: "Compliance",
        title: "Regulatory Compliance Architecture",
        body:
          "Multi-jurisdiction compliance framework design, regulatory monitoring, and enforcement preparedness for regulated industries.",
      },
      {
        overline: "Corporate Governance",
        title: "Governance & Board Advisory",
        body:
          "Corporate governance framework design, board effectiveness reviews, and governance modernization for growing enterprises.",
      },
      {
        overline: "Trade & IP",
        title: "Cross-Border & IP Advisory",
        body: "International trade law advisory, intellectual property strategy, and cross-border regulatory navigation.",
      },
      {
        overline: "Labor Law",
        title: "Employment & Labor Advisory",
        body:
          "Employment law compliance, workforce restructuring advisory, and labor relations governance for complex organizations.",
      },
    ],
    relatedIndustries: ["financial-services", "technology-digital", "energy-resources"],
  },
  sme: {
    id: "sme",
    number: "10",
    title: "SME Development & Growth Consulting",
    focusAreas: "Business incubation, financing for SMEs, market entry strategies, operational efficiency, and export facilitation.",
    targetClients: "SMEs in East Africa and other developing regions.",
    approach:
      "We help SMEs scale and expand through strategic planning, funding facilitation, and operational optimization.",
    deliverables: [
      {
        overline: "Growth Strategy",
        title: "Scaling & Market Entry",
        body:
          "Growth strategy development, market entry planning, and competitive positioning for scaling small and medium enterprises.",
      },
      {
        overline: "Investment Readiness",
        title: "Funding & Investment Architecture",
        body:
          "Investment readiness assessment, pitch preparation, and capital raising strategy for growth-stage businesses.",
      },
      {
        overline: "Operations",
        title: "Operational Structuring",
        body:
          "Operational efficiency programs, governance design, and process optimization for enterprises building institutional capability.",
      },
      {
        overline: "Export",
        title: "Export & Market Expansion",
        body:
          "Export facilitation, market development advisory, and trade corridor strategy for SMEs entering international markets.",
      },
    ],
    relatedIndustries: ["consumer-retail", "technology-digital", "industrials-manufacturing"],
  },
};
