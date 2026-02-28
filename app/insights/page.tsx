
import InsightsHeroSection from "@/components-v2/sections/InsightsHeroSection";
import InsightsGridSection from "@/components-v2/sections/InsightsGridSection";

const insightsMock = [
  {
    slug: "institutionalizing-growth",
    category: "Capital Strategy",
    title: "Institutionalizing Growth Architecture",
    excerpt: "How boards structure capital deployment for sustainable expansion."
  },
  {
    slug: "platform-operating-models",
    category: "Digital Transformation",
    title: "Platform-Led Operating Models",
    excerpt: "Architecting digital core systems for scale and resilience."
  },
  {
    slug: "governance-discipline",
    category: "Governance",
    title: "Board-Level Capital Discipline",
    excerpt: "Embedding institutional governance across complex organizations."
  }
];

export default async function Page() {
  return (
    <>
      <InsightsHeroSection />
      <InsightsGridSection insights={insightsMock} />
    </>
  );
}

