import HeroSection from "@/components-v2/sections/HeroSection";
export const dynamic = 'force-dynamic';
import ServicesGridSection from "@/components-v2/sections/ServicesGridSection";
import CTABlock from "@/components-v2/sections/CTABlock";

import type { Metadata } from "next";



import { getPublishedHomePage } from "@/lib/sanity/pages";
import { PortableText } from "@portabletext/react";
import ServiceCard from "@/components-v2/ui/ServiceCard";
import SectionHeader from "@/components-v2/sections/SectionHeader";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import IndustriesOverview from "@/components-v2/sections/IndustriesOverview";
import TrustSignalsSection from "@/components-v2/sections/TrustSignalsSection";

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
	if (process.env.NODE_ENV === "development") {
		console.log("CMS DATA:", JSON.stringify(home, null, 2));
	}

	const servicesMock = [
		{
			slug: "strategy-planning",
			title: "Strategy & Planning",
			focusAreas: "Strategic advisory for growth, transformation, and restructuring.",
			approach: "Evidence-based, outcome-driven planning.",
		},
		{
			slug: "finance-performance",
			title: "Finance & Performance",
			focusAreas: "Financial modeling, performance management, and capital allocation.",
			approach: "Disciplined financial analysis and reporting.",
		},
		{
			slug: "operations-delivery",
			title: "Operations & Delivery",
			focusAreas: "Operational improvement, program delivery, and execution support.",
			approach: "Practical delivery and continuous improvement.",
		},
	];


	const industriesMock = [
		{
			title: "Financial Services",
			description: "Banking & Capital Markets, Insurance, Private Equity",
			slug: "financial-services",
		},
		{
			title: "Technology & Digital",
			description: "Enterprise Software, Fintech, Infrastructure",
			slug: "technology-digital",
		},
		{
			title: "Energy & Resources",
			description: "Oil & Gas, Power & Utilities, Renewables",
			slug: "energy-resources",
		},
	];

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
			<HeroSection
				title={home?.heroTitle}
				subtitle={home?.heroSubtitle}
				description={undefined}
				primaryCta={home?.heroCTA}
				secondaryCta={undefined}
			/>

			{home?.problems && home.problems.length > 0 ? (
				<section id="problems" aria-labelledby="problems-title" className="scroll-mt-24">
					<div className="max-w-7xl mx-auto px-6">
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
					</div>
				</section>
			) : null}

			{home?.differentiation && home.differentiation.length > 0 ? (
				<section id="differentiation" aria-labelledby="differentiation-title" className="scroll-mt-24">
					<div className="max-w-7xl mx-auto px-6">
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
					</div>
				</section>
			) : null}

			{home?.capabilitiesIntro || (home?.capabilityClusters && home.capabilityClusters.length > 0) ? (
				<section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-24">
					<div className="max-w-7xl mx-auto px-6">
						<SectionWrapper>
							<SectionHeader
								overline="Services"
								title="Advisory disciplines across growth, restructuring, and execution"
								description="Integrated advisory across strategy, finance, operations, and performance transformation."
							/>

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
						</SectionWrapper>
					</div>
				</section>
			) : null}


			<ServicesGridSection services={home?.services ?? []} />

			<IndustriesOverview industries={home?.industries ?? []} />

			<div className="py-16 md:py-24">
				<TrustSignalsSection />
			</div>

			{home?.audiences && home.audiences.length > 0 ? (
				<section id="audiences" aria-labelledby="audiences-title" className="scroll-mt-24">
					<div className="max-w-7xl mx-auto px-6">
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
					</div>
				</section>
			) : null}

			{home?.workingProcess && home.workingProcess.length > 0 ? (
				<section id="working-process" aria-labelledby="working-process-title" className="scroll-mt-24">
					<div className="max-w-7xl mx-auto px-6">
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
					</div>
				</section>
			) : null}

			<CTABlock
				title="Start a strategic conversation"
				description="Engage with our advisory team to explore capital, transformation, and governance priorities."
				primaryLabel="Contact us"
				primaryHref="/contact"
			/>
		</>
	);
}
