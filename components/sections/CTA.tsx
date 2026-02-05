import Link from "next/link";

import Container from "../layout/Container";
import ContactTrigger from "../modals/ContactTrigger";
import type { ContactModalOpenOptions } from "../modals/ContactModalProvider";

type CTAProps = {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  href?: string;
	contactContext?: ContactModalOpenOptions;
};

export default function CTA({
  heading = "Start a conversation",
  subheading = "A short discussion can help clarify needs, constraints, and next steps.",
  buttonText = "Discuss your needs",
  href = "/contact",
	contactContext,
}: CTAProps) {
  return (
    <section aria-labelledby="cta-title">
      <Container>
        <div className="py-22">
          <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center sm:px-10">
            <h2 id="cta-title" className="mx-auto max-w-3xl font-medium">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl">
              {subheading}
            </p>
            <div className="mt-8">
          {contactContext ? (
            <ContactTrigger
              context={contactContext}
              className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-800 px-6 py-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              {buttonText}
            </ContactTrigger>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-800 px-6 py-3 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              {buttonText}
            </Link>
          )}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-600">
              Formal contact channels will be published soon.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
