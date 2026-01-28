import Link from "next/link";

import Container from "../layout/Container";
import InsightCard from "./InsightCard";

import { insights } from "../../lib/insights";

export default function InsightsTeaser() {
  const latestInsights = insights
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  return (
    <section aria-labelledby="insights-teaser-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="insights-teaser-title">Insights</h2>
            <p className="mt-4">
              Research-backed perspectives and practical guidance on strategy, risk, and transformation.
            </p>
            <p className="mt-4">
              <Link href="/insights">View all insights</Link>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {latestInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                title={insight.title}
                summary={insight.summary}
                category={insight.category}
                date={insight.date}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
