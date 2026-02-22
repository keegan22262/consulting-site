
import Container from "../../components/layout/Container";
import InsightCard from "../../components/sections/InsightCard";
import type { Metadata } from "next";
import { getAllInsights } from "@/lib/sanityInsights";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thought leadership and research-informed guidance on strategy, operating models, risk, and transformation.",
  openGraph: {
    title: "Insights",
    description:
      "Thought leadership and research-informed guidance on strategy, operating models, risk, and transformation.",
  },
  alternates: {
    canonical: "/insights",
  },
};

export default async function InsightsPage() {
  let fetchedInsights: Awaited<ReturnType<typeof getAllInsights>> = [];
  let hasError = false;

  try {
    fetchedInsights = await getAllInsights();
  } catch {
    hasError = true;
  }

  return (
    <main>
      <section aria-labelledby="insights-page-title">
        <Container>
          <div className="py-16 md:py-24">
            <h1 id="insights-page-title" className="text-4xl leading-tight">
              Insights
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed">
              Research, analysis, and perspective on strategy, risk, and transformation—grounded in practical delivery
              and focused on decision-quality and measurable outcomes.
            </p>

            {hasError ? (
              <div className="mt-10 max-w-2xl">
                <p className="text-sm leading-relaxed text-slate-700">
                  Insights are unavailable at this time.
                </p>
              </div>
            ) : fetchedInsights.length === 0 ? (
              <div className="mt-10 max-w-2xl">
                <p className="text-sm leading-relaxed text-slate-700">
                  No insights are available at this time.
                </p>
              </div>
            ) : (
              <section aria-label="Insight cards" className="mt-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {fetchedInsights.map((insight) => (
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
              </section>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}

