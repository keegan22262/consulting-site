import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulatory Disclosures",
  description: "Regulatory disclosures for Rill Singh Limited.",
  alternates: { canonical: "/regulatory-disclosures" },
};

export default function RegulatoryDisclosuresPage() {
  return (
    <main className="mx-auto w-full max-w-[800px] px-6 py-24 lg:px-8 lg:py-32">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 lg:text-4xl">
        Regulatory Disclosures
      </h1>
      <p className="mt-6 text-base leading-relaxed text-neutral-600">
        Rill Singh Limited operates as a management advisory firm and does not provide regulated
        financial services, investment advice, or legal counsel unless expressly stated within a
        formal engagement agreement with a licensed affiliate.
      </p>
      <p className="mt-4 text-base leading-relaxed text-neutral-600">
        Where regulatory requirements apply to specific advisory engagements, all relevant
        disclosures will be provided directly to the client as part of the engagement process and
        in accordance with applicable jurisdiction requirements.
      </p>
      <p className="mt-4 text-base leading-relaxed text-neutral-600">
        For regulatory enquiries, please contact us via our{" "}
        <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600">
          contact page
        </Link>
        .
      </p>
    </main>
  );
}
