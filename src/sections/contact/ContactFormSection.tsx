import type { ReactNode } from "react";

interface ContactFormSectionProps {
  consultationNote: string;
  children: ReactNode;
}

export default function ContactFormSection({
  consultationNote,
  children,
}: ContactFormSectionProps) {
  return (
    <section aria-labelledby="contact-form-title" className="mt-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-slate-50 p-6">
        <h2 id="contact-form-title" className="text-base font-medium tracking-tight text-slate-900">
          Send a message
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{consultationNote || ""}</p>
        {children}
      </div>
    </section>
  );
}
