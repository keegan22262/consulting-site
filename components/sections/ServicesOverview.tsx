import Link from "next/link";

import Container from "../layout/Container";
import ServiceCard from "./ServiceCard";

import { getFeaturedServices } from "@/lib/sanityServices";

type ServicesOverviewProps = {
	title?: string;
	intro?: string;
	linkLabel?: string;
	linkHref?: string;
};

export default async function ServicesOverview({
	title = "Our Services",
	intro,
	linkLabel = "View all services",
	linkHref = "/services",
}: ServicesOverviewProps) {
  const featuredServices = await getFeaturedServices();

  return (
    <section aria-labelledby="services-overview-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
						<h2 id="services-overview-title">{title}</h2>
				{intro ? (
					<p className="mt-4">{intro}</p>
				) : null}
            <p className="mt-4">
					<Link href={linkHref}>{linkLabel}</Link>
            </p>
          </div>

				{featuredServices.length === 0 ? (
					<div className="mx-auto mt-10 max-w-3xl text-center">
						<p className="text-sm leading-relaxed text-slate-700">
							No services are available at this time.
						</p>
					</div>
				) : (
					<div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{featuredServices.map((service) => (
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
