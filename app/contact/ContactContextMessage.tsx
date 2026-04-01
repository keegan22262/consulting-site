"use client";

import { useSearchParams } from "next/navigation";

const CONTEXT_MESSAGES: Record<string, string> = {
  services: "Tell us about the challenge you\u2019re facing.",
  industries: "Which sector is your organization in?",
  careers: "Share your CV and tell us why RSL.",
  insights: "Subscribe to receive our latest perspectives.",
};

export default function ContactContextMessage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const message = from ? CONTEXT_MESSAGES[from] : null;

  if (!message) return null;

  return (
    <div className="mb-6 rounded-lg border border-[--a700]/20 bg-[--a700]/5 px-5 py-4">
      <p className="text-sm font-medium text-[--a700]">{message}</p>
    </div>
  );
}
