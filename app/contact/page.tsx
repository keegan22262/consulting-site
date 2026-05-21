import type { Metadata } from "next";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";
import ContactContextMessage from "./ContactContextMessage";
import NewsletterSection from "./NewsletterSection";
import ScrollReveal from "@/src/components/ScrollReveal";

export const metadata: Metadata = {
	title: "Contact",
	description: "Begin a conversation with Rill Singh Limited's advisory team.",
	openGraph: {
		title: "Contact | Rill Singh Limited",
		description:
			"Begin a conversation with Rill Singh Limited's advisory team.",
	},
	alternates: {
		canonical: "/contact",
	},
};

export default async function ContactPage() {
	return (
		<main>
			{/* ===== SECTION 1: HERO BANNER ===== */}
			<section className="relative flex items-center justify-center overflow-hidden h-[340px] md:h-[420px]">
				{/* Background image */}
				<Image
					src="/images/contact/contacthero.jpeg"
					alt="Advisory team meeting"
					fill
					sizes="100vw"
					priority
					quality={90}
					className="object-cover object-center"
				/>
				{/* Gradient overlay */}
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(135deg, #021024 0%, #052659 50%, #5483B3 100%)",
						opacity: 0.85,
					}}
				/>
				{/* Content */}
				<div className="relative z-10 text-center px-6 max-w-[700px]">
					<h1
						className="text-[32px] md:text-[44px] text-white"
						style={{
							fontFamily: "'Playfair Display', serif",
							fontWeight: 400,
						}}
					>
						Contact
					</h1>
					<p
						className="mt-4 text-[15px] md:text-[16px]"
						style={{
							fontFamily: "'DM Sans', sans-serif",
							color: "rgba(255,255,255,0.75)",
							lineHeight: 1.7,
						}}
					>
						We engage with organizations seeking thoughtful, results-driven
						consulting partnerships.
					</p>
					<p
						className="mt-2 text-[14px] md:text-[15px]"
						style={{
							fontFamily: "'DM Sans', sans-serif",
							color: "rgba(255,255,255,0.55)",
							lineHeight: 1.7,
						}}
					>
						Initial consultations are designed to understand your objectives,
						context, and challenges, and to determine how we can add value.
					</p>

					{/* CTA Buttons */}
					<div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
						<a
							href="#contact-form"
							className="inline-flex items-center gap-2 rounded-lg px-7 py-3 text-[12px] font-semibold uppercase tracking-[2px] text-white transition-colors duration-300 bg-[#5483B3] hover:bg-[#7DA0CA]"
							style={{
								fontFamily: "'DM Sans', sans-serif",
							}}
						>
							Schedule an Introduction
						</a>
						<a
							href="https://wa.me/254793995142"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-lg border px-7 py-3 text-[12px] font-semibold uppercase tracking-[2px] text-white transition-colors duration-300"
							style={{
								borderColor: "rgba(255,255,255,0.3)",
								fontFamily: "'DM Sans', sans-serif",
							}}
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
							</svg>
							WhatsApp Us
						</a>
					</div>

					{/* Image caption */}
					<p
						className="mt-5 text-[12px] italic"
						style={{
							fontFamily: "'DM Sans', sans-serif",
							color: "rgba(255,255,255,0.4)",
						}}
					>
						Advisory team meeting
					</p>
				</div>
			</section>

			{/* ===== SECTION 2: GET IN TOUCH + IMAGE ===== */}
			<section className="bg-white" style={{ padding: "80px 0" }}>
				<div className="mx-auto max-w-[1200px] px-6">
					<div className="flex flex-col md:flex-row gap-12">
						{/* Left Column — Contact Info */}
						<div className="w-full md:w-1/2">
							<h2
								className="text-[32px] mb-4"
								style={{
									fontFamily: "'Playfair Display', serif",
									fontWeight: 400,
									color: "#021024",
								}}
							>
								Get In Touch
							</h2>
							<p
								className="mb-3 text-[16px] font-medium"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#021024",
								}}
							>
								Start a structured conversation.
							</p>
							<p
								className="mb-10"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									fontSize: "15px",
									color: "#6B7280",
									lineHeight: 1.7,
								}}
							>
								Share your context and priorities, and our team will determine
								the right advisory path for discovery, scoping, and delivery.
							</p>

							{/* Contact Blocks */}
							<div className="space-y-7">
								{/* Head Office */}
								<div className="flex items-center">
									<div
										className="flex-shrink-0 flex items-center justify-center rounded-full"
										style={{
											width: 48,
											height: 48,
											backgroundColor: "#C1E8FF",
										}}
									>
										<svg
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#052659"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
											<circle cx="12" cy="10" r="3" />
										</svg>
									</div>
									<div className="ml-4">
										<p
											className="text-[16px] font-semibold"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#021024",
												marginBottom: 4,
											}}
										>
											Head Office
										</p>
										<p
											className="text-[14px]"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#6B7280",
											}}
										>
											Nairobi, Kenya
										</p>
									</div>
								</div>

								{/* Email */}
								<div className="flex items-center">
									<div
										className="flex-shrink-0 flex items-center justify-center rounded-full"
										style={{
											width: 48,
											height: 48,
											backgroundColor: "#C1E8FF",
										}}
									>
										<svg
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#052659"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<rect
												width="20"
												height="16"
												x="2"
												y="4"
												rx="2"
											/>
											<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
										</svg>
									</div>
									<div className="ml-4">
										<p
											className="text-[16px] font-semibold"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#021024",
												marginBottom: 4,
											}}
										>
											Email us
										</p>
										<a
											href="mailto:info@rillsingh.com"
											className="block text-[14px] transition-colors duration-300 hover:underline"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#5483B3",
											}}
										>
											info@rillsingh.com
										</a>
										<a
											href="mailto:advisory@rillsingh.com"
											className="block text-[14px] transition-colors duration-300 hover:underline"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#5483B3",
											}}
										>
											advisory@rillsingh.com
										</a>
									</div>
								</div>

								{/* Phone */}
								<div className="flex items-center">
									<div
										className="flex-shrink-0 flex items-center justify-center rounded-full"
										style={{
											width: 48,
											height: 48,
											backgroundColor: "#C1E8FF",
										}}
									>
										<svg
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#052659"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
										</svg>
									</div>
									<div className="ml-4">
										<p
											className="text-[16px] font-semibold"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#021024",
												marginBottom: 4,
											}}
										>
											Call us
										</p>
										<p
											className="text-[14px]"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#6B7280",
											}}
										>
											Phone: +254 793 995 142
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column — Image */}
						<div className="w-full md:w-1/2">
							<div
								className="relative w-full overflow-hidden h-[300px] md:h-[400px]"
								style={{
									borderRadius: 12,
									border: "1px solid rgba(84,131,179,0.15)",
									background: "#F8FBFF",
								}}
							>
								<Image
									src="/images/contact/contactimage2.jpg"
									alt="Office location"
									fill
									sizes="(min-width: 768px) 50vw, 100vw"
									quality={90}
									className="object-cover object-center"
								/>
								{/* Location badge */}
								<div
									className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white px-4 py-2"
									style={{
										boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
									}}
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#021024"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
										<circle cx="12" cy="10" r="3" />
									</svg>
									<span
										className="text-[13px]"
										style={{
											fontFamily: "'DM Sans', sans-serif",
											color: "#021024",
										}}
									>
										Nairobi, Kenya
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ===== SECTION 3: SEND A MESSAGE (FORM) ===== */}
			<section id="contact-form" className="relative">
				{/* Dark background top portion */}
				<div
					className="text-center"
					style={{
						background: "#052659",
						padding: "60px 24px 120px",
					}}
				>
					<h2
						className="text-[28px] md:text-[36px] text-white"
						style={{
							fontFamily: "'Playfair Display', serif",
							fontWeight: 400,
						}}
					>
						Send a message
					</h2>
					<p
						className="mx-auto mt-3 max-w-[560px]"
						style={{
							fontSize: 15,
							color: "rgba(255,255,255,0.6)",
							lineHeight: 1.6,
							fontFamily: "'DM Sans', sans-serif",
						}}
					>
						Initial consultations are designed to understand your objectives,
						context, and challenges, and to determine how we can add value.
					</p>
				</div>

				{/* Form card overlapping into white zone */}
				<div
					className="relative z-10 mx-auto w-full max-w-[720px] px-4 md:px-0"
					style={{ marginTop: -80 }}
				>
					<div
						className="rounded-2xl bg-white p-6 md:p-12"
						style={{
							boxShadow: "0 20px 60px rgba(2,16,36,0.12)",
						}}
					>
						<Suspense fallback={null}>
							<ContactContextMessage />
						</Suspense>
						<ContactForm />
					</div>
				</div>

				{/* White background bottom portion */}
				<div className="bg-white" style={{ paddingBottom: 60 }} />
			</section>

			{/* ===== SECTION 4: HOW WE DELIVER ===== */}
			<section style={{ background: "#F8FBFF", padding: "80px 0" }}>
				<div className="mx-auto max-w-[1200px] px-6">
					<div className="text-center mb-14">
						<h2
							className="text-[28px] md:text-[36px]"
							style={{
								fontFamily: "'Playfair Display', serif",
								fontWeight: 400,
								color: "#021024",
							}}
						>
							How We Deliver
						</h2>
						<p
							className="mt-3 text-[15px]"
							style={{
								fontFamily: "'DM Sans', sans-serif",
								color: "#6B7280",
							}}
						>
							Service delivery sequence.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Step 01 */}
						<div
							className="rounded-xl p-8"
							style={{
								background: "#fff",
								border: "1px solid rgba(84,131,179,0.12)",
							}}
						>
							<span
								className="text-[36px] font-bold"
								style={{
									fontFamily: "'Playfair Display', serif",
									color: "rgba(84,131,179,0.25)",
								}}
							>
								01
							</span>
							<h3
								className="mt-3 text-[18px] font-semibold"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#021024",
								}}
							>
								Context review
							</h3>
							<p
								className="mt-2 text-[14px]"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#6B7280",
									lineHeight: 1.7,
								}}
							>
								We assess your institutional context, pressure points, and
								decision horizon.
							</p>
						</div>

						{/* Step 02 */}
						<div
							className="rounded-xl p-8"
							style={{
								background: "#fff",
								border: "1px solid rgba(84,131,179,0.12)",
							}}
						>
							<span
								className="text-[36px] font-bold"
								style={{
									fontFamily: "'Playfair Display', serif",
									color: "rgba(84,131,179,0.25)",
								}}
							>
								02
							</span>
							<h3
								className="mt-3 text-[18px] font-semibold"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#021024",
								}}
							>
								Scoping
							</h3>
							<p
								className="mt-2 text-[14px]"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#6B7280",
									lineHeight: 1.7,
								}}
							>
								We define engagement scope, governance cadence, and required
								advisory capabilities.
							</p>
						</div>

						{/* Step 03 */}
						<div
							className="rounded-xl p-8"
							style={{
								background: "#fff",
								border: "1px solid rgba(84,131,179,0.12)",
							}}
						>
							<span
								className="text-[36px] font-bold"
								style={{
									fontFamily: "'Playfair Display', serif",
									color: "rgba(84,131,179,0.25)",
								}}
							>
								03
							</span>
							<h3
								className="mt-3 text-[18px] font-semibold"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#021024",
								}}
							>
								Activation
							</h3>
							<p
								className="mt-2 text-[14px]"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#6B7280",
									lineHeight: 1.7,
								}}
							>
								Once aligned, we initiate a structured delivery pathway with
								clear accountabilities.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ===== SECTION 5: WHO WE SERVE ===== */}
			<section className="bg-white" style={{ padding: "80px 0" }}>
				<div className="mx-auto max-w-[1200px] px-6">
					<div className="flex flex-col md:flex-row gap-12">
						{/* Left — Who We Serve */}
						<div className="w-full md:w-1/2">
							<h2
								className="text-[28px] md:text-[36px] mb-3"
								style={{
									fontFamily: "'Playfair Display', serif",
									fontWeight: 400,
									color: "#021024",
								}}
							>
								Who We Serve
							</h2>
							<p
								className="mb-8 text-[15px]"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#6B7280",
								}}
							>
								Institutional contexts where we deliver impact.
							</p>
							<ul className="space-y-4">
								{[
									"Small and medium enterprises scaling operations and governance.",
									"Growth-stage institutions navigating transformation complexity.",
									"Public and regulated entities modernizing service delivery.",
									"Large organizations coordinating multi-function execution programs.",
								].map((item) => (
									<li key={item} className="flex items-start gap-3">
										<span
											className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full"
											style={{ background: "#5483B3" }}
										/>
										<span
											className="text-[14px]"
											style={{
												fontFamily: "'DM Sans', sans-serif",
												color: "#374151",
												lineHeight: 1.7,
											}}
										>
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>

						{/* Right — Employees & Investors */}
						<div className="w-full md:w-1/2">
							<h2
								className="text-[28px] md:text-[36px] mb-3"
								style={{
									fontFamily: "'Playfair Display', serif",
									fontWeight: 400,
									color: "#021024",
								}}
							>
								Employees &amp; Investors
							</h2>
							<p
								className="mb-4 text-[15px]"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#6B7280",
								}}
							>
								For partnership, media, and stakeholder inquiries.
							</p>
							<p
								className="text-[14px]"
								style={{
									fontFamily: "'DM Sans', sans-serif",
									color: "#374151",
									lineHeight: 1.7,
								}}
							>
								Use the contact form to route investor, partnership, and media
								requests. Our team will direct each inquiry to the appropriate
								lead.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ===== SECTION 6: CLOSING STATEMENT ===== */}
			<section
				style={{
					background: "linear-gradient(135deg, #021024 0%, #052659 100%)",
					padding: "80px 0",
				}}
			>
				<div className="mx-auto max-w-[720px] px-6 text-center">
					<h2
						className="text-[28px] md:text-[36px] text-white"
						style={{
							fontFamily: "'Playfair Display', serif",
							fontWeight: 400,
						}}
					>
						Closing Statement
					</h2>
					<p
						className="mt-5 text-[15px]"
						style={{
							fontFamily: "'DM Sans', sans-serif",
							color: "rgba(255,255,255,0.7)",
							lineHeight: 1.8,
						}}
					>
						Every advisory engagement starts with context, not assumptions. We
						look forward to understanding your institutional priorities and
						identifying whether there is a clear basis for collaboration.
					</p>

					<div
						className="mt-8 rounded-xl p-8"
						style={{
							background: "rgba(255,255,255,0.06)",
							border: "1px solid rgba(255,255,255,0.1)",
						}}
					>
						<h3
							className="text-[20px] text-white"
							style={{
								fontFamily: "'Playfair Display', serif",
								fontWeight: 400,
							}}
						>
							Ready to begin?
						</h3>
						<p
							className="mt-3 text-[14px]"
							style={{
								fontFamily: "'DM Sans', sans-serif",
								color: "rgba(255,255,255,0.6)",
								lineHeight: 1.7,
							}}
						>
							If there is strategic alignment, we can schedule an initial
							partner conversation and define the next step.
						</p>
						<a
							href="#contact-form"
							className="mt-6 inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[2px] text-white transition-colors duration-300"
							style={{
								background: "#5483B3",
								fontFamily: "'DM Sans', sans-serif",
							}}
						>
							Schedule an Introduction
						</a>
					</div>
				</div>
			</section>

			{/* ===== SECTION 7: NEWSLETTER / FOLLOW ===== */}
			<NewsletterSection />

			{/* Footer is rendered by layout */}
		</main>
	);
}

export const revalidate = 300;
