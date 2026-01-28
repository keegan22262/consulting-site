import Container from "../../components/layout/Container";
import TrustSignals from "../../components/sections/TrustSignals";

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
								We are a consulting firm focused on helping leadership teams make
								clear decisions, align execution, and deliver measurable outcomes.
								Our work is practical, collaborative, and grounded in the realities
								of how organizations operate.
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
									Provide clear, senior-level support that helps teams move from
									analysis to action—reducing uncertainty and accelerating delivery.
								</p>
							</section>

							<section aria-labelledby="approach-title" className="space-y-3">
								<h2 id="approach-title" className="text-2xl leading-snug">
									Our Approach
								</h2>
								<p className="leading-relaxed">
									We combine structured problem-solving with hands-on partnership.
									Engagements typically include discovery, alignment on priorities,
									a focused plan, and practical support through implementation.
								</p>
							</section>

							<section aria-labelledby="who-title" className="space-y-4">
								<h2 id="who-title" className="text-2xl leading-snug">
									Who We Work With
								</h2>
								<p className="leading-relaxed">
									We work with organizations that need clarity and momentum—from
									growth-stage companies to established enterprises.
								</p>
								<ul className="space-y-3">
									<li className="flex gap-3">
										<span aria-hidden="true">•</span>
										<span>Executive teams shaping strategy and priorities</span>
									</li>
									<li className="flex gap-3">
										<span aria-hidden="true">•</span>
										<span>Functional leaders driving complex initiatives</span>
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
