import { sanityClient } from "@/lib/sanity/client";
import { getAllInsightsQuery } from "@/lib/sanity/queries/insight";

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const insights = await sanityClient.fetch(getAllInsightsQuery);

  return (
    <main className="py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <h1 className="text-3xl font-semibold">Insights</h1>
        <div className="mt-10 space-y-6">
          {insights?.map((insight: any) => (
            <div key={insight._id} className="rounded-xl border p-6">
              <h2 className="text-xl font-medium">{insight.title}</h2>
              {insight.summary && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {insight.summary}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}