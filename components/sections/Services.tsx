import Container from "../layout/Container";
import ServiceCard from "./ServiceCard";

import { getAllServices } from "@/lib/sanityServices";

export default async function Services() {
	const services = await getAllServices();

  return (
    <section aria-labelledby="services-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="services-title">Services</h2>
          </div>

				{services.length === 0 ? (
					<div className="mx-auto mt-10 max-w-3xl text-center">
						<p className="text-sm leading-relaxed text-slate-700">
							No services are available at this time.
						</p>
					</div>
				) : (
					<div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{services.map((service) => (
							<ServiceCard
								key={service.slug}
								id={service.slug}
								title={service.title}
								summary={service.summary}
								category={service.category ?? ""}
							/>
						))}
					</div>
				)}
        </div>
      </Container>
    </section>
  );
}
