import { createClient } from "@sanity/client";

export const dynamic = "force-dynamic";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export default async function DebugPage() {
  const services = await client.fetch(`*[_type == "service"]`);
  const industries = await client.fetch(`*[_type == "industry"]`);
  const insights = await client.fetch(`*[_type == "insight"]`);

  return (
    <pre style={{ padding: 40 }}>
      {JSON.stringify(
        {
          env: {
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
          },
          counts: {
            services: services?.length,
            industries: industries?.length,
            insights: insights?.length,
          },
        },
        null,
        2
      )}
    </pre>
  );
}