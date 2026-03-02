import type { Metadata } from "next";
export const dynamic = 'force-dynamic';


import { getHowWeWork } from "@/lib/sanity/queries/howWeWork";

export const metadata: Metadata = {
	title: "How We Work",
	description:
		"A practical engagement approach designed to improve decision quality, align stakeholders, and support accountable execution.",
	openGraph: {
		title: "How We Work",
		description:
			"A practical engagement approach designed to improve decision quality, align stakeholders, and support accountable execution.",
	},
	alternates: {
		canonical: "/how-we-work",
	},
};

type Step = {
	title: string;
	description: string;
};

export default async function HowWeWorkPage() {
	const data = await getHowWeWork();

	const intro = data?.intro || "";
	const steps: Step[] = data?.steps && data.steps.length > 0 ? data.steps : [];

	return (
		<main>
			<section aria-labelledby="how-we-work-title">
				<div className="max-w-7xl mx-auto px-6">
					<div className="py-16 md:py-24">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="how-we-work-title" className="text-4xl leading-tight">
								How We Work
							</h1>
							<p className="text-lg leading-relaxed">{intro}</p>
							<p className="leading-relaxed text-slate-600">{""}</p>
						</header>

						<section aria-labelledby="how-we-work-steps-title" className="mt-16">
							<div className="mx-auto max-w-3xl">
								<h2 id="how-we-work-steps-title" className="text-2xl leading-snug">
									A simple four-step model
								</h2>
								<p className="mt-3 leading-relaxed">{""}</p>
							</div>

							<ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
								{steps.map((step, index) => (
									<li key={step.title}>
										<article className="rounded-xl border border-slate-200 bg-white p-6">
											<header>
												<p className="text-xs font-medium uppercase tracking-wide text-slate-600">
													Step {index + 1}
												</p>
												<h3 className="mt-2 text-sm font-medium tracking-tight text-slate-900">
													{step.title}
												</h3>
										</header>
										<p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
									</article>
								</li>
								))}
							</ol>
						</section>
					</div>
				</div>
			</section>
		</main>
	);
}

export const revalidate = 300;

