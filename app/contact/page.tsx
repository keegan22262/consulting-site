import type { Metadata } from "next";

import Container from "../../components/layout/Container";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
	title: "Contact",
	description: "How to reach us.",
	openGraph: {
		title: "Contact",
		description: "How to reach us.",
	},
};

export default function ContactPage() {
	return (
		<main>
			<section aria-labelledby="contact-title">
				<Container>
					<div className="py-18">
						<header className="mx-auto max-w-3xl space-y-4">
							<h1 id="contact-title" className="text-4xl leading-tight">
								Contact Us
							</h1>
							<p className="text-lg leading-relaxed">
								For now, the best way to reach us is via this page. Formal contact channels will be published as we
								approach launch.
							</p>
							<p className="leading-relaxed text-slate-600">
								If you share a brief summary of your objectives and context, we can respond with a clear next step.
							</p>
						</header>

						<section aria-labelledby="contact-form-title" className="mt-12">
							<div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6">
								<h2 id="contact-form-title" className="text-base font-semibold tracking-tight text-slate-900">
									Send a message
								</h2>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									Share a brief summary and we’ll respond with a clear next step.
								</p>

								<ContactForm />
							</div>
						</section>
					</div>
				</Container>
			</section>
		</main>
	);
}
