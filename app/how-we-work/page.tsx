import type { Metadata } from "next";

import Container from "../../components/layout/Container";

export const metadata: Metadata = {
	title: "How We Work",
	description:
		"A practical engagement approach designed to improve decision quality, align stakeholders, and support accountable execution.",
	openGraph: {
		title: "How We Work",
		description:
			"A practical engagement approach designed to improve decision quality, align stakeholders, and support accountable execution.",
	},
};

type Step = {
	title: string;
	description: string;
};

const steps: Step[] = [
	{
		title: "Understand",
		description:
			"Clarify objectives, constraints, stakeholders, and the decisions that need to be made. We align on what success should mean in your context.",
	},
	{
		title: "Diagnose",
		description:
			"Develop a clear view of the current situation—what is working, what is not, and where the real constraints sit—without unnecessary complexity.",
	},
	{
		title: "Advise",
		description:
			"Provide practical options, trade-offs, and a recommended path. The goal is decision-ready guidance that can be acted on within operating realities.",
	},
	{
		title: "Support",
		description:
			"Stay close to execution as needed—helping maintain alignment, remove friction, and keep focus on outcomes as work moves forward.",
	},
];

export default function HowWeWorkPage() {
	return (
		<main>
			<section aria-labelledby="how-we-work-title">
				<Container>
					<div className="py-18">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="how-we-work-title" className="text-4xl leading-tight">
								How We Work
							</h1>
							<p className="text-lg leading-relaxed">
								Engagements are designed to be structured, practical, and proportionate to your needs. We focus on
								improving decision quality, aligning stakeholders, and supporting accountable delivery.
							</p>
							<p className="leading-relaxed text-slate-600">
								This is a general model. Scope and depth are tailored to context and objectives.
							</p>
						</header>

						<section aria-labelledby="how-we-work-steps-title" className="mt-16">
							<div className="mx-auto max-w-3xl">
								<h2 id="how-we-work-steps-title" className="text-2xl leading-snug">
									A simple four-step model
								</h2>
								<p className="mt-3 leading-relaxed">
									A clear structure helps teams move from ambiguity to action while keeping decisions and delivery
									connected.
								</p>
							</div>

							<ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
								{steps.map((step, index) => (
									<li key={step.title}>
										<article className="rounded-xl border border-slate-200 bg-white p-6">
											<header>
												<p className="text-xs font-medium uppercase tracking-wide text-slate-600">
													Step {index + 1}
												</p>
												<h3 className="mt-3 text-sm font-semibold tracking-tight text-slate-900">
													{step.title}
												</h3>
										</header>
										<p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
									</article>
								</li>
								))}
							</ol>
						</section>
					</div>
				</Container>
			</section>
		</main>
	);
}

