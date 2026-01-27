import Container from "../../components/layout/Container";
import ServiceCard from "../../components/sections/ServiceCard";

import { services } from "../../lib/services";

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
							We help leadership teams make clear decisions, align execution, and
							build momentum across high-impact initiatives.
						</p>

						<section aria-label="Service cards" className="mt-10">
							<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
								{services.map((service) => (
									<ServiceCard
										key={service.id}
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
