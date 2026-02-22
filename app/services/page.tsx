
import Container from "../../components/layout/Container";
import ServiceCard from "../../components/sections/ServiceCard";
import type { Metadata } from "next";
import { getAllServices } from "@/lib/sanityServices";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Services",
  description: "Browse available services.",
  openGraph: {
    title: "Services",
    description: "Browse available services.",
  },
  alternates: {
    canonical: "/services",
  },
};

export default async function ServicesPage() {
  const fetchedServices = await getAllServices();

  return (
    <main>
      <section aria-labelledby="services-page-title">
        <Container>
          <div className="py-16 md:py-24">
            <h1 id="services-page-title" className="text-4xl leading-tight">
              Our Services
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed">Browse available services.</p>

            {fetchedServices.length === 0 ? (
              <div className="mt-10 max-w-2xl">
                <p className="text-sm leading-relaxed text-slate-700">
                  No services are available at this time.
                </p>
              </div>
            ) : (
              <section aria-label="Service cards" className="mt-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {fetchedServices.map((service) => (
                    <ServiceCard
                      key={service.slug}
                      id={service.slug}
                      title={service.title}
                      summary={service.summary}
                      category={service.category ?? ""}
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
