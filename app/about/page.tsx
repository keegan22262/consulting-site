

import type { Metadata } from "next";
export const dynamic = 'force-dynamic';

import { getPublishedPageBySlug } from "@/lib/sanity/pages";
import CTABlock from "@/components-v2/sections/CTABlock";
import AboutDetailsSection from "@/src/sections/about/AboutDetailsSection";
import AboutHeroSection from "@/src/sections/about/AboutHeroSection";

const DEFAULT_ABOUT_TITLE = "About";
const DEFAULT_ABOUT_DESCRIPTION = "About";

type PortableTextChild = {
	text?: string;
};

type PortableTextBlock = {
	_type?: string;
	style?: string;
	listItem?: string;
	children?: PortableTextChild[];
};

function blockToText(block: PortableTextBlock): string {
	if (!Array.isArray(block.children)) return "";
	return block.children
		.map((child) => (typeof child?.text === "string" ? child.text : ""))
		.join("")
		.trim();
}
export const revalidate = 300;

function extractAboutContent(blocks: PortableTextBlock[] | undefined) {
	const introParts: string[] = [];
	const missionParts: string[] = [];
	const approachParts: string[] = [];
	const whoIntroParts: string[] = [];
	const whoBullets: string[] = [];

	if (!Array.isArray(blocks)) {
		return {
			intro: undefined,
			mission: undefined,
			approach: undefined,
			whoIntro: undefined,
			whoBullets: [],
		};
	}

	let section: "intro" | "mission" | "approach" | "who" = "intro";

	for (const block of blocks) {
		if (!block || block._type !== "block") continue;
		const text = blockToText(block);
		if (!text) continue;

		const isHeading = block.style === "h2" || block.style === "h3";
		if (isHeading) {
			const normalized = text.toLowerCase();
			if (normalized.includes("mission")) section = "mission";
			else if (normalized.includes("approach")) section = "approach";
			else if (normalized.includes("who")) section = "who";
			continue;
		}

		if (section === "intro" && !block.listItem) {
			introParts.push(text);
			continue;
		}

		if (section === "mission" && !block.listItem) {
			missionParts.push(text);
			continue;
		}

		if (section === "approach" && !block.listItem) {
			approachParts.push(text);
			continue;
		}

		if (section === "who") {
			if (!block.listItem) {
				whoIntroParts.push(text);
				continue;
			}

			if (block.listItem === "bullet") {
				whoBullets.push(text);
			}
		}
	}

	return {
		intro: introParts.join(" ").trim() || undefined,
		mission: missionParts.join(" ").trim() || undefined,
		approach: approachParts.join(" ").trim() || undefined,
		whoIntro: whoIntroParts.join(" ").trim() || undefined,
		whoBullets,
	};
}

export async function generateMetadata(): Promise<Metadata> {
	try {
		const cmsPage = await getPublishedPageBySlug("about");
		const cmsBody = cmsPage?.body as PortableTextBlock[] | undefined;
		const cms = cmsPage ? extractAboutContent(cmsBody) : null;

		const title = (cmsPage?.title || "").trim() || DEFAULT_ABOUT_TITLE;
		const description = (cms?.intro || "").trim() || DEFAULT_ABOUT_DESCRIPTION;

		return {
			title,
			description,
			openGraph: {
				title,
				description,
			},
			alternates: {
				canonical: "/about",
			},
		};
	} catch {
		return {
			title: DEFAULT_ABOUT_TITLE,
			description: DEFAULT_ABOUT_DESCRIPTION,
			openGraph: {
				title: DEFAULT_ABOUT_TITLE,
				description: DEFAULT_ABOUT_DESCRIPTION,
			},
			alternates: {
				canonical: "/about",
			},
		};
	}
}

export default async function AboutPage() {
	const cmsPage = await getPublishedPageBySlug("about");
	const cmsBody = cmsPage?.body as PortableTextBlock[] | undefined;
	const cms = cmsPage ? extractAboutContent(cmsBody) : null;

	const title = cmsPage?.title ?? DEFAULT_ABOUT_TITLE;
	const intro = cms?.intro ?? "";
	const mission = cms?.mission ?? "";
	const approach = cms?.approach ?? "";
	const whoIntro = cms?.whoIntro ?? "";
	const whoBullets = cms?.whoBullets?.slice(0, 6) ?? [];

	return (
		<main>
			<AboutHeroSection title={title} intro={intro} />
			<AboutDetailsSection
				mission={mission}
				approach={approach}
				whoIntro={whoIntro}
				whoBullets={whoBullets}
			/>
				<InstitutionalFootprintSection />
				<ClientImpactSection />
				<DeliveryCapabilitiesSection />
				<RelatedPracticeNavigationSection />
				<CTABlock
					title="Begin a strategic conversation"
					description="RSL partners with leadership teams to shape strategy, execution discipline, and institutional resilience across complex markets."
					primaryLabel="Contact"
					primaryHref="/contact"
				/>
		</main>
	);
}

	function InstitutionalFootprintSection() {
		return (
			<section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
				<div className="mx-auto max-w-7xl px-6 md:px-8">
					<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Institutional Footprint</span>
					<h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
						Built for cross-sector, cross-function advisory.
					</h2>
					<p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
						Our teams operate at the intersection of strategy, technology, financial governance, people transformation,
						and sustainability to support institutions facing multi-variable change.
					</p>
					<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
						{["Strategy & Transformation", "Digital & AI Delivery", "Governance, Risk & Performance"].map((item) => (
							<div key={item} className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155]">
								{item}
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	function ClientImpactSection() {
		return (
			<section className="bg-white py-14 md:py-16 lg:py-20">
				<div className="mx-auto max-w-7xl px-6 md:px-8">
					<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Client Impact</span>
					<h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
						Impact signals across engagements.
					</h2>
					<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
						{[
							["30-50%", "Cycle-time and process improvement outcomes"],
							["2x+", "Delivery throughput gains in transformation programs"],
							["15-30%", "Cost-efficiency uplift across operating models"],
						].map(([value, note]) => (
							<div key={value} className="border-t-2 border-[#1B3A5C] pt-6">
								<p className="text-[1.875rem] font-semibold leading-none text-[#1B3A5C] md:text-[2.25rem]">{value}</p>
								<p className="mt-3 text-sm leading-[1.6] text-[#64748B]">{note}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	function RelatedPracticeNavigationSection() {
		return (
			<section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
				<div className="mx-auto max-w-7xl px-6 md:px-8">
					<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Explore Related Practice Areas</span>
					<h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
						Navigate our service, industry, and research context.
					</h2>
					<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
						{[
							["/services", "Services"],
							["/industries", "Industries"],
							["/insights", "Insights"],
						].map(([href, label]) => (
							<a
								key={href}
								href={href}
								className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm font-medium text-[#334155] transition hover:border-[#94A3B8]"
							>
								{label}
							</a>
						))}
					</div>
				</div>
			</section>
		);
	}

	function DeliveryCapabilitiesSection() {
		return (
			<section className="bg-white py-14 md:py-16 lg:py-20">
				<div className="mx-auto max-w-7xl px-6 md:px-8">
					<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Delivery & Capabilities</span>
					<h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
						How we work with leadership teams.
					</h2>
					<div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
						{[
							["Diagnose", "Clarify structural constraints, strategic options, and execution realities."],
							["Design", "Build institution-specific pathways that align ambition with implementation capacity."],
							["Deliver", "Embed execution governance and transformation management in live operating contexts."],
							["Sustain", "Transfer capability and strengthen institutional discipline for long-horizon resilience."],
						].map(([title, body]) => (
							<div key={title} className="border-t-2 border-[#1B3A5C] pt-5">
								<h3 className="text-lg font-semibold text-[#0F1720]">{title}</h3>
								<p className="mt-2 text-base leading-[1.7] text-[#475569]">{body}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}
