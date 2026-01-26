import Container from "../../components/layout/Container";

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
							{/* Service cards will be rendered here. */}
						</section>
					</div>
				</Container>
			</section>
		</main>
	);
}
