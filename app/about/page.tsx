import Container from "../../components/layout/Container";
import TrustSignals from "../../components/sections/TrustSignals";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About",
	description:
		"Learn how we work with leadership teams—senior-led, practical engagement models focused on clarity and outcomes.",
	openGraph: {
		title: "About",
		description:
			"Learn how we work with leadership teams—senior-led, practical engagement models focused on clarity and outcomes.",
	},
};

export default function AboutPage() {
	return (
		<main>
			<section aria-labelledby="about-title">
				<Container>
					<div className="py-18">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="about-title" className="text-4xl leading-tight">
								About Us
							</h1>
							<p className="text-lg leading-relaxed">
								We provide independent, senior-level support to help leadership teams make
								clear decisions and execute with discipline. Our work is evidence-informed,
								rigorously structured, and designed to translate priorities into measurable
								outcomes.
							</p>
						</header>
					</div>
				</Container>
			</section>

			<TrustSignals />

			<section aria-label="About details">
				<Container>
					<div className="py-18">
						<div className="mx-auto max-w-3xl space-y-12">
							<section aria-labelledby="mission-title" className="space-y-3">
								<h2 id="mission-title" className="text-2xl leading-snug">
									Our Mission
								</h2>
								<p className="leading-relaxed">
									Enable better decisions and stronger execution by bringing independence,
									rigor, and practical delivery to complex initiatives.
								</p>
							</section>

							<section aria-labelledby="approach-title" className="space-y-3">
								<h2 id="approach-title" className="text-2xl leading-snug">
									Our Approach
								</h2>
								<p className="leading-relaxed">
									We work through structured assessment, stakeholder alignment, and clear
									decision support, then stay close to execution to remove friction and keep
									work moving. Deliverables are concise, traceable to decisions, and grounded
									in operating constraints.
								</p>
							</section>

							<section aria-labelledby="who-title" className="space-y-4">
								<h2 id="who-title" className="text-2xl leading-snug">
									Who We Work With
								</h2>
								<p className="leading-relaxed">
									We work with organizations that require clarity, alignment, and accountable
									execution—from growth-stage teams to established enterprises.
								</p>
								<ul className="space-y-3">
									<li className="flex gap-3">
										<span aria-hidden="true">•</span>
										<span>Leadership teams shaping strategy and priorities</span>
									</li>
									<li className="flex gap-3">
										<span aria-hidden="true">•</span>
										<span>Functional leaders managing complex initiatives</span>
									</li>
									<li className="flex gap-3">
										<span aria-hidden="true">•</span>
										<span>Program owners coordinating cross-team delivery</span>
									</li>
								</ul>
							</section>
						</div>
					</div>
				</Container>
			</section>
		</main>
	);
}
