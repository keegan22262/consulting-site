import Container from "../../components/layout/Container";

function SkeletonCard() {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-6">
			<div className="h-3 w-28 rounded bg-slate-200" />
			<div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
			<div className="mt-4 space-y-2">
				<div className="h-3 w-full rounded bg-slate-100" />
				<div className="h-3 w-11/12 rounded bg-slate-100" />
				<div className="h-3 w-9/12 rounded bg-slate-100" />
			</div>
		</div>
	);
}

export default function Loading() {
	return (
		<main>
			<section aria-label="Loading services">
				<Container>
					<div className="py-16 md:py-24">
						<h1 className="text-4xl leading-tight">Our Services</h1>
						<p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
							Loading services.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
							{Array.from({ length: 4 }).map((_, index) => (
								<SkeletonCard key={index} />
							))}
						</div>
					</div>
				</Container>
			</section>
		</main>
	);
}
