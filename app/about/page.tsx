

import type { Metadata } from "next";
export const dynamic = 'force-dynamic';

import { getPublishedPageBySlug } from "@/lib/sanity/pages";

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
			<section aria-labelledby="about-title">
				<div className="max-w-7xl mx-auto px-6">
					<div className="py-16 md:py-24">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="about-title" className="text-4xl leading-tight">
								{title}
							</h1>
							<p className="text-lg leading-relaxed">
								{intro}
							</p>
						</header>
					</div>
				</div>
			</section>



			<section aria-label="About details">
				<div className="max-w-7xl mx-auto px-6">
					<div className="py-16 md:py-24">
						<div className="mx-auto max-w-prose space-y-12">
							{mission ? (
							<section aria-labelledby="mission-title" className="space-y-3">
								<h2 id="mission-title" className="text-2xl leading-snug">
									Our Mission
								</h2>
								<p className="leading-relaxed">
									{mission}
								</p>
							</section>
							) : null}

							{approach ? (
							<section aria-labelledby="approach-title" className="space-y-3">
								<h2 id="approach-title" className="text-2xl leading-snug">
									Our Approach
								</h2>
								<p className="leading-relaxed">
									{approach}
								</p>
							</section>
							) : null}

							{whoIntro || whoBullets.length > 0 ? (
							<section aria-labelledby="who-title" className="space-y-4">
								<h2 id="who-title" className="text-2xl leading-snug">
									Who We Work With
								</h2>
								{whoIntro ? <p className="leading-relaxed">{whoIntro}</p> : null}
								{whoBullets.length > 0 ? <ul className="space-y-3">
									{whoBullets.map((item) => (
										<li key={item} className="flex gap-3">
											<span aria-hidden="true">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul> : null}
							</section>
							) : null}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
