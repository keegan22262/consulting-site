import type { Metadata } from "next";
export const dynamic = 'force-dynamic';


import ContactForm from "./ContactForm";
import { getContactPage } from "@/lib/sanity/queries/contactPage";

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
			<section aria-labelledby="contact-title">
				<div className="max-w-7xl mx-auto px-6">
					<div className="py-16 md:py-24">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="contact-title" className="text-4xl leading-tight">
								{title}
							</h1>
							<p className="text-lg leading-relaxed">{intro}</p>
							<p className="leading-relaxed text-slate-600">{consultationNote}</p>
						</header>

						<section aria-labelledby="contact-form-title" className="mt-12">
							<div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 p-6">
								<h2 id="contact-form-title" className="text-base font-medium tracking-tight text-slate-900">
									Send a message
								</h2>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									{consultationNote || ""}
								</p>

								<ContactForm />
							</div>
						</section>
					</div>
				</div>
			</section>
		</main>
	);
}
export const revalidate = 300;
