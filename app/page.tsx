
import Hero from "../components/sections/Hero";
import ServicesOverview from "../components/sections/ServicesOverview";
import CTA from "../components/sections/CTA";
import AnimatedSection from "../components/ui/AnimatedSection";
import type { Metadata } from "next";

import Container from "../components/layout/Container";

import { getPublishedHomePage } from "@/lib/sanity/pages";
import { PortableText } from "@portabletext/react";

export const revalidate = 120;

export const metadata: Metadata = {
	title: "Home",
	description:
		"Senior-level consulting support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
	openGraph: {
		title: "Home",
		description:
			"Senior-level consulting support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
	},
	alternates: {
		canonical: "/",
	},
};

export default async function Home() {
	const home = await getPublishedHomePage();

	function getSectionTitle(sectionId: string, fallback: string) {
		const intro = home?.sectionIntros?.find((item) => item.sectionId === sectionId);
		return intro?.title?.trim() || fallback;
	}

	const problemsTitle = getSectionTitle("problems", "Problems");
	const differentiationTitle = getSectionTitle("differentiation", "Differentiation");
	const capabilitiesTitle = getSectionTitle("capabilities", "Capabilities");
	const audiencesTitle = getSectionTitle("audiences", "Audiences");
	const workingProcessTitle = getSectionTitle("working-process", "Working process");

	return (
		<>
			<AnimatedSection staggerIndex={0}>
				<Hero
					title={home?.heroTitle}
					subtitle={home?.heroSubtitle}
					ctaLabel={home?.heroCTA?.label}
					ctaHref={home?.heroCTA?.href}
				/>
			</AnimatedSection>

			{home?.problems && home.problems.length > 0 ? (
				<AnimatedSection staggerIndex={1}>
					<section id="problems" aria-labelledby="problems-title" className="scroll-mt-24">
						<Container>
							<div className="py-16 md:py-24">
								<header className="mx-auto max-w-3xl text-center">
									<h2 id="problems-title">{problemsTitle}</h2>
								</header>
								<div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
									{home.problems.map((problem, index) => (
										<article
											key={`${problem.title}-${index}`}
											className="rounded-xl border border-slate-200 bg-white p-6"
										>
											<h3 className="text-sm font-medium tracking-tight text-slate-900">{problem.title}</h3>
											<p className="mt-2 text-sm leading-6 text-slate-600">{problem.description}</p>
										</article>
									))}
								</div>
							</div>
						</Container>
					</section>
				</AnimatedSection>
			) : null}

			{home?.differentiation && home.differentiation.length > 0 ? (
				<AnimatedSection staggerIndex={2}>
					<section id="differentiation" aria-labelledby="differentiation-title" className="scroll-mt-24">
						<Container>
							<div className="py-16 md:py-24">
								<header className="mx-auto max-w-3xl text-center">
									<h2 id="differentiation-title">{differentiationTitle}</h2>
								</header>
								<div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
									{home.differentiation.map((item, index) => (
										<article
											key={`${item.label}-${index}`}
											className="rounded-xl border border-slate-200 bg-white p-6"
										>
											<h3 className="text-sm font-medium tracking-tight text-slate-900">{item.label}</h3>
											<p className="mt-2 text-sm leading-6 text-slate-600">{item.explanation}</p>
										</article>
									))}
								</div>
							</div>
						</Container>
					</section>
				</AnimatedSection>
			) : null}

			{home?.capabilitiesIntro || (home?.capabilityClusters && home.capabilityClusters.length > 0) ? (
				<AnimatedSection staggerIndex={3}>
					<section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-24">
						<Container>
							<div className="py-16 md:py-24">
								<header className="mx-auto max-w-3xl space-y-4 text-center">
									<h2 id="capabilities-title">{capabilitiesTitle}</h2>
									{home?.capabilitiesIntro ? (
										<p className="leading-relaxed text-slate-700">{home.capabilitiesIntro}</p>
									) : null}
								</header>

								{home?.capabilityClusters && home.capabilityClusters.length > 0 ? (
									<div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2">
										{home.capabilityClusters.map((cluster, index) => (
											<span
												key={`${cluster}-${index}`}
												className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-700"
											>
												{cluster}
											</span>
										))}
									</div>
								) : null}
							</div>
						</Container>
					</section>
				</AnimatedSection>
			) : null}

			<AnimatedSection staggerIndex={4}>
				<ServicesOverview intro={home?.servicesIntro} />
			</AnimatedSection>

			{home?.audiences && home.audiences.length > 0 ? (
				<AnimatedSection staggerIndex={5}>
					<section id="audiences" aria-labelledby="audiences-title" className="scroll-mt-24">
						<Container>
							<div className="py-16 md:py-24">
								<header className="mx-auto max-w-3xl text-center">
									<h2 id="audiences-title">{audiencesTitle}</h2>
								</header>
								<div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
									{home.audiences.map((audience, index) => (
										<article
											key={`${audience.name ?? "audience"}-${index}`}
											className="rounded-xl border border-slate-200 bg-white p-6"
										>
											{audience.name ? (
												<h3 className="text-sm font-medium tracking-tight text-slate-900">
													{audience.name}
												</h3>
											) : null}
											{audience.qualifier ? (
												<p className="mt-2 text-sm leading-6 text-slate-600">{audience.qualifier}</p>
											) : null}
										</article>
									))}
								</div>
							</div>
						</Container>
					</section>
				</AnimatedSection>
			) : null}

			{home?.workingProcess && home.workingProcess.length > 0 ? (
				<AnimatedSection staggerIndex={6}>
					<section id="working-process" aria-labelledby="working-process-title" className="scroll-mt-24">
						<Container>
							<div className="py-16 md:py-24">
								<header className="mx-auto max-w-3xl space-y-4 text-center">
									<h2 id="working-process-title">{workingProcessTitle}</h2>
								</header>
								<div className="mx-auto mt-8 max-w-prose space-y-3 text-slate-700">
									<PortableText
										value={home.workingProcess}
										components={{
											block: {
												normal: ({ children }) => <p className="leading-relaxed">{children}</p>,
											},
										}}
									/>
								</div>
							</div>
						</Container>
					</section>
				</AnimatedSection>
			) : null}

			<AnimatedSection staggerIndex={7}>
				<CTA heading={home?.ctaText} />
			</AnimatedSection>
		</>
	);
}
