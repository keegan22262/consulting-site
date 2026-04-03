import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Notices",
  description: "Legal notices and disclosures for Rill Singh Limited.",
  alternates: { canonical: "/legal-notices" },
};

export default function LegalNoticesPage() {
  return (
    <main className="mx-auto w-full max-w-[800px] px-6 py-24 lg:px-8 lg:py-32">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 lg:text-4xl">
        Legal Notices
      </h1>
      <p className="mt-6 text-base leading-relaxed text-neutral-600">
        Rill Singh Limited is a pan-African management advisory firm. The information published on
        this website is for general informational purposes only and does not constitute legal,
        financial, or professional advice. Engagement of Rill Singh Limited&apos;s services is governed
        by the terms of a formal engagement letter or service agreement.
      </p>
      <p className="mt-4 text-base leading-relaxed text-neutral-600">
        All content on this website is the property of Rill Singh Limited and may not be reproduced
        or redistributed without written permission.
      </p>
      <p className="mt-4 text-base leading-relaxed text-neutral-600">
        For legal enquiries, please contact us via our{" "}
        <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600">
          contact page
        </Link>
        .
      </p>
    </main>
  );
}
