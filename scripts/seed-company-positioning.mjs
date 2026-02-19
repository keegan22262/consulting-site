import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cwdgyz8l",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const doc = {
  _id: "companyPositioning",
  _type: "companyPositioning",
  mission:
    "At ALINABSS, we deliver comprehensive, innovative solutions designed to drive sustainable growth and transformation for businesses across the globe. Guided by our PRIDE philosophy (Precision, Integrity, Discipline, Execution), we focus on providing results-driven, tailored consulting services for startups, SMEs, and large enterprises. Our goal is to empower entities through strategic transformation, technology integration, financial optimization, and human capital development.",
  brandPositioning:
    "ALINABSS positions itself as a consulting firm that provides the same level of expertise as larger firms, but with a more personalized, flexible, and cost-effective approach. We emphasize niche expertise in areas such as digital transformation, AI consulting, and SME tax advisory to stand out in competitive markets. While aiming for a global reputation, we position ourselves as local experts with global insights, delivering tailored solutions for businesses of all sizes.",
  problemStatement:
    "Many organizations struggle with defining clear strategies or face challenges when translating strategic intent into effective execution. Rapid technological change, regulatory complexity, and organizational inefficiencies further compound these challenges. ALINABSS addresses these issues by delivering expert, cost-effective, and customized solutions that combine strategic clarity with disciplined execution.",
  painPoints: [
    "Lack of strategic clarity and difficulty executing complex strategies",
    "Technological lag and complexity in digital transformation and AI adoption",
    "Financial and regulatory compliance risks",
    "Talent management and organizational inefficiency",
    "Sustainability and ESG compliance pressures",
    "Public sector and government inefficiencies",
  ],
  whyChooseUs: [
    "Tailored, personalized consulting services",
    "Cost-effective and agile delivery",
    "Niche expertise with global insight",
    "Strong focus on execution guided by the PRIDE philosophy",
    "Integrated end-to-end solutions",
    "Transparency, integrity, and long-term partnership focus",
  ],
};

async function main() {
  try {
    const result = await client.createOrReplace(doc);
    console.log("Document created:", result._id);
  } catch (err) {
    console.error("Failed to create document:", err);
    process.exit(1);
  }
}

main();
