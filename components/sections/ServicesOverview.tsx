import Link from "next/link";

import Container from "../layout/Container";
import ServiceCard from "./ServiceCard";

import { services } from "../../lib/services";

export default function ServicesOverview() {
  const featuredServices = services.slice(0, 3);

  return (
    <section aria-labelledby="services-overview-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="services-overview-title">Our Services</h2>
            <p className="mt-4">
              Practical, senior-level support across core disciplines—focused on
              clarity, alignment, and measurable outcomes.
            </p>
            <p className="mt-4">
              <Link href="/services">View all services</Link>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                summary={service.summary}
                category={service.category}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
