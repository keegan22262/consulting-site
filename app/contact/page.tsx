import type { Metadata } from "next";


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
const fallbackIntro =
	"For now, the best way to reach us is via this page. Formal contact channels will be published as we approach launch.";
const fallbackConsultationNote =
	"If you share a brief summary of your objectives and context, we can respond with a clear next step.";

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
									Share a brief summary and we'll respond with a clear next step.
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
