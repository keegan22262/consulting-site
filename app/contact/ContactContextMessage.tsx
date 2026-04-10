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
		<div
			className="mb-6 rounded-lg px-5 py-4"
			style={{
				background: "rgba(84,131,179,0.08)",
				border: "1px solid rgba(84,131,179,0.2)",
			}}
		>
			<p
				className="text-[14px] font-medium"
				style={{
					fontFamily: "'DM Sans', sans-serif",
					color: "#052659",
				}}
			>
				{message}
			</p>
		</div>
	);
}
