import type { Metadata } from "next";
export const dynamic = 'force-dynamic';


import ContactForm from "./ContactForm";
import { getContactPage } from "@/lib/sanity/queries/contactPage";
import CTABlock from "@/components-v2/sections/CTABlock";
import ContactFormSection from "@/src/sections/contact/ContactFormSection";
import ContactHeroSection from "@/src/sections/contact/ContactHeroSection";

export const metadata: Metadata = {
	title: "Contact",
	description: "How to reach us.",
	openGraph: {
		title: "Contact",
		description: "How to reach us.",
	},
	alternates: {
		canonical: "/contact",
	},
};

const fallbackTitle = "Contact Us";
const fallbackIntro = "";
const fallbackConsultationNote = "";

export default async function ContactPage() {
	const data = await getContactPage();

	const title = data?.title || fallbackTitle;
	const intro = data?.intro || fallbackIntro;
	const consultationNote = data?.consultationNote || fallbackConsultationNote;

	return (
		<main>
			<ContactHeroSection title={title} intro={intro} consultationNote={consultationNote} />
			<ContactNarrativeSection />
			<div className="max-w-7xl mx-auto px-6">
				<div className="pb-16 md:pb-24">
					<ContactFormSection consultationNote={consultationNote}>
						<ContactForm />
					</ContactFormSection>
				</div>
			</div>
			<ServiceDeliverySection />
			<WhoWeServeSection />
			<EmployeesInvestorsSection />
			<ClosingStatementSection />
			<CTABlock
				title="Ready to begin?"
				description="If there is strategic alignment, we can schedule an initial partner conversation and define the next step."
				primaryLabel="Schedule an Introduction"
				primaryHref="/contact"
			/>
		</main>
	);
}
export const revalidate = 300;

function ServiceDeliverySection() {
	const steps = [
		["01", "Context review", "We assess your institutional context, pressure points, and decision horizon."],
		["02", "Scoping", "We define engagement scope, governance cadence, and required advisory capabilities."],
		["03", "Activation", "Once aligned, we initiate a structured delivery pathway with clear accountabilities."],
	];

	return (
		<section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-6 md:px-8">
				<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">How We Deliver</span>
				<h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
					Service delivery sequence.
				</h3>
				<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
					{steps.map(([step, title, body]) => (
						<div key={step} className="rounded-xl border border-[#E2E8F0] bg-white p-6">
							<p className="text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">{step}</p>
							<h4 className="mt-2 text-base font-semibold text-[#0F1720]">{title}</h4>
							<p className="mt-2 text-sm leading-[1.6] text-[#475569]">{body}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function ContactNarrativeSection() {
	return (
		<section className="bg-white py-12 md:py-14 lg:py-16">
			<div className="mx-auto max-w-7xl px-6 md:px-8">
				<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Get In Touch</span>
				<h2 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
					Start a structured conversation.
				</h2>
				<p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
					Share your context and priorities, and our team will determine the right advisory path for discovery,
					scoping, and delivery.
				</p>
			</div>
		</section>
	);
}

function WhoWeServeSection() {
	const segments = [
		"Small and medium enterprises scaling operations and governance.",
		"Growth-stage institutions navigating transformation complexity.",
		"Public and regulated entities modernizing service delivery.",
		"Large organizations coordinating multi-function execution programs.",
	];

	return (
		<section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-6 md:px-8">
				<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Who We Serve</span>
				<h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
					Institutional contexts where we deliver impact.
				</h3>
				<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
					{segments.map((segment) => (
						<div key={segment} className="rounded-xl border border-[#E2E8F0] bg-white p-6 text-sm leading-[1.6] text-[#334155]">
							{segment}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function EmployeesInvestorsSection() {
	return (
		<section className="bg-white py-14 md:py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-6 md:px-8">
				<span className="block text-xs font-semibold uppercase tracking-widest text-[#1B3A5C]">Employees & Investors</span>
				<h3 className="mt-3 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[2rem]">
					For partnership, media, and stakeholder inquiries.
				</h3>
				<p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#475569]">
					Use the contact form to route investor, partnership, and media requests. Our team will direct each inquiry to the appropriate lead.
				</p>
			</div>
		</section>
	);
}

function ClosingStatementSection() {
	return (
		<section className="bg-[#0C1C2E] py-14 md:py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-6 md:px-8">
				<div className="rounded-xl border border-white/15 bg-white/5 p-8 md:p-10">
					<span className="block text-xs font-semibold uppercase tracking-widest text-white/70">Closing Statement</span>
					<p className="mt-4 max-w-[66ch] text-base leading-[1.7] text-[#D5E2F0]">
						Every advisory engagement starts with context, not assumptions. We look forward to understanding your
						institutional priorities and identifying whether there is a clear basis for collaboration.
					</p>
				</div>
			</div>
		</section>
	);
}
