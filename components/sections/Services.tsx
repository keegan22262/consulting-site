import Container from "../layout/Container";
import ServiceCard from "./ServiceCard";

import { services } from "../../lib/services";

export default function Services() {
  return (
    <section aria-labelledby="services-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="services-title">Services</h2>
            <p className="mt-4">
              Practical support across strategy, advisory, and execution—designed for
              leaders who value clarity and follow-through.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
