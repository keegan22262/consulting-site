import Container from "../../components/layout/Container";
import ServiceCard from "../../components/sections/ServiceCard";
import type { Metadata } from "next";

import { services } from "../../lib/services";

export const metadata: Metadata = {
	title: "Services",
	description:
		"Explore our consulting services across strategy, advisory, risk, and digital transformation—designed for clear decisions and execution momentum.",
	openGraph: {
		title: "Services",
		description:
			"Explore our consulting services across strategy, advisory, risk, and digital transformation—designed for clear decisions and execution momentum.",
	},
};

export default function ServicesPage() {
	return (
		<main>
			<section aria-labelledby="services-page-title">
				<Container>
					<div className="py-18">
						<h1 id="services-page-title" className="text-4xl leading-tight">
							Our Services
						</h1>
						<p className="mt-4 max-w-2xl text-lg leading-relaxed">
							Practical, execution-focused consulting for SMEs and growth-stage organizations.
							We provide structured decision support and hands-on delivery to help teams
							prioritize, align, and achieve measurable outcomes—without the overhead of large-firm engagements.
						</p>

						<section aria-label="Service cards" className="mt-10">
							<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
								{services.map((service) => (
									<ServiceCard
										key={service.id}
										id={service.id}
										title={service.title}
										summary={service.summary}
										category={service.category}
									/>
								))}
							</div>
						</section>
					</div>
				</Container>
			</section>
		</main>
	);
}
