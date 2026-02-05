import Link from "next/link";

import Container from "../layout/Container";
import InsightCard from "./InsightCard";

import { getLatestInsights } from "@/lib/sanityInsights";

type InsightsTeaserProps = {
  title?: string;
  intro?: string;
  linkLabel?: string;
  linkHref?: string;
};

export default async function InsightsTeaser({
  title = "Insights",
  intro = "Research-informed guidance on decision-making, risk, and transformation.",
  linkLabel = "View all insights",
  linkHref = "/insights",
}: InsightsTeaserProps) {
  const latestInsights = await getLatestInsights(2);

  return (
    <section aria-labelledby="insights-teaser-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="insights-teaser-title">{title}</h2>
			{intro ? <p className="mt-4">{intro}</p> : null}
            <p className="mt-4">
				<Link href={linkHref}>{linkLabel}</Link>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {latestInsights.map((insight) => (
              <InsightCard
                key={insight.slug}
                slug={insight.slug}
                title={insight.title}
                summary={insight.summary}
					category={insight.category ?? ""}
					date={insight.date ?? ""}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
