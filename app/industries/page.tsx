import { sanityClient } from "@/lib/sanity/client";
import { industriesQuery } from "@/lib/sanity/queries/industry";

export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const industries = await sanityClient.fetch(industriesQuery);

  return (
    <main className="py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <h1 className="text-3xl font-semibold">Industries</h1>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries?.map((industry: any) => (
            <div key={industry._id} className="rounded-xl border p-6">
              <h2 className="text-xl font-medium">{industry.title}</h2>
              {industry.summary && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {industry.summary}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}