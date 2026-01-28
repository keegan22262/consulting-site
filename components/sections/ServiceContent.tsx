type ServiceContentProps = {
	description: string;
	offerings: string[];
	outcomes: string[];
};

export default function ServiceContent({
	description,
	offerings,
	outcomes,
}: ServiceContentProps) {
	return (
		<section aria-label="Service details" className="space-y-10">
			<section aria-label="Description" className="space-y-3">
				<p>{description}</p>
			</section>

			<section aria-labelledby="service-offerings-title" className="space-y-4">
				<h3 id="service-offerings-title">Offerings</h3>
				<ul className="space-y-3">
					{offerings.map((item) => (
						<li key={item} className="flex gap-3">
							<span aria-hidden="true">•</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</section>

			<section aria-labelledby="service-outcomes-title" className="space-y-4 p-6">
				<h3 id="service-outcomes-title">Outcomes</h3>
				<ul className="space-y-3">
					{outcomes.map((item) => (
						<li key={item} className="flex gap-3">
							<span aria-hidden="true">•</span>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</section>
		</section>
	);
}
