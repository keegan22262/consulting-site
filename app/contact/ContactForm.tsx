"use client";

import React, { useState } from "react";

type FormValues = {
	name: string;
	email: string;
	inquiryType: string;
	message: string;
	honeypot: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const INQUIRY_TOPICS = [
	"General Inquiry",
	"Advisory Services",
	"Partnership",
	"Media & Press",
	"Investor Relations",
	"Careers",
];

/* ── Shared input styles ── */
const INPUT_BASE = [
	"w-full h-12 rounded-lg border px-4 text-[14px] bg-white transition-all duration-300",
	"focus:outline-none focus:border-[#5483B3] focus:shadow-[0_0_0_3px_rgba(84,131,179,0.1)]",
].join(" ");

const LABEL_STYLE = [
	"block text-[11px] font-semibold uppercase tracking-[2px] mb-1.5",
].join(" ");

export default function ContactForm() {
	const [values, setValues] = useState<FormValues>({
		name: "",
		email: "",
		inquiryType: "",
		message: "",
		honeypot: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	function setField<K extends keyof FormValues>(key: K, value: string) {
		setValues((prev) => ({ ...prev, [key]: value }));
		setSubmitError(null);
		setSubmitSuccess(false);
		setErrors((prev) => {
			if (!prev[key]) return prev;
			const next = { ...prev };
			delete next[key];
			return next;
		});
	}

	function validate(v: FormValues): FormErrors {
		const e: FormErrors = {};
		if (!v.name.trim()) e.name = "Name is required.";
		if (!v.email.trim()) {
			e.email = "Email is required.";
		} else if (!isValidEmail(v.email.trim())) {
			e.email = "Enter a valid email address.";
		}
		if (!v.message.trim()) {
			e.message = "Message is required.";
		} else if (v.message.trim().length <= 10) {
			e.message = "Message must be more than 10 characters.";
		}
		return e;
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (isSubmitting) return;

		const trimmed: FormValues = {
			name: values.name.trim(),
			email: values.email.trim(),
			inquiryType: values.inquiryType.trim(),
			message: values.message.trim(),
			honeypot: values.honeypot.trim(),
		};

		const nextErrors = validate(trimmed);
		setErrors(nextErrors);
		setSubmitError(null);
		setSubmitSuccess(false);

		if (Object.keys(nextErrors).length > 0) return;

		setIsSubmitting(true);
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					name: trimmed.name,
					email: trimmed.email,
					inquiryType: trimmed.inquiryType || "General Inquiry",
					message: trimmed.message,
					company: trimmed.honeypot, // honeypot
				}),
			});

			let apiError: string | null = null;
			try {
				const data = (await response.json()) as unknown;
				if (
					data &&
					typeof data === "object" &&
					"error" in data &&
					typeof (data as { error?: unknown }).error === "string"
				) {
					apiError = (data as { error: string }).error;
				}
			} catch {
				// ignore JSON parsing errors
			}

			if (response.ok) {
				setSubmitSuccess(true);
				setValues({
					name: "",
					email: "",
					inquiryType: "",
					message: "",
					honeypot: "",
				});
				return;
			}

			setSubmitError(
				apiError || "We couldn't send your message. Please try again later."
			);
		} catch {
			setSubmitError(
				"We couldn't send your message. Please try again later."
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	if (submitSuccess) {
		return (
			<div className="rounded-xl border border-[rgba(84,131,179,0.2)] bg-[#F8FBFF] p-6">
				<div aria-live="polite" aria-atomic="true">
					<p
						role="status"
						className="text-[15px]"
						style={{
							fontFamily: "'DM Sans', sans-serif",
							color: "#021024",
						}}
					>
						Thank you. Your message has been received.
					</p>
				</div>
				<div className="mt-4">
					<button
						type="button"
						onClick={() => {
							setSubmitSuccess(false);
							setSubmitError(null);
							setErrors({});
						}}
						className="inline-flex items-center rounded-lg px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[2px] text-white transition-colors duration-300"
						style={{
							background: "#5483B3",
							fontFamily: "'DM Sans', sans-serif",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.background = "#052659")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.background = "#5483B3")
						}
					>
						Send another message
					</button>
				</div>
			</div>
		);
	}

	return (
		<form
			method="post"
			noValidate
			onSubmit={handleSubmit}
			style={{ fontFamily: "'DM Sans', sans-serif" }}
		>
			{/* Honeypot — hidden from real users */}
			<input
				type="text"
				name="honeypot"
				value={values.honeypot}
				onChange={(e) => setField("honeypot", e.target.value)}
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
				className="absolute -left-[9999px] h-0 w-0 opacity-0"
			/>

			{/* Row 1: Name */}
			<div>
				<label
					htmlFor="contact-name"
					className={LABEL_STYLE}
					style={{ color: "#5483B3" }}
				>
					Name
				</label>
				<input
					id="contact-name"
					type="text"
					autoComplete="name"
					placeholder="Your name"
					value={values.name}
					onChange={(e) => setField("name", e.target.value)}
					aria-invalid={Boolean(errors.name)}
					aria-describedby={errors.name ? "err-name" : undefined}
					className={INPUT_BASE}
					style={{
						borderColor: errors.name
							? "#ef4444"
							: "rgba(84,131,179,0.2)",
						color: "#1A1A2E",
					}}
				/>
				{errors.name && (
					<p id="err-name" role="alert" className="mt-1 text-[13px] text-red-600">
						{errors.name}
					</p>
				)}
			</div>

			{/* Row 2: Email */}
			<div className="mt-5">
				<label
					htmlFor="contact-email"
					className={LABEL_STYLE}
					style={{ color: "#5483B3" }}
				>
					Email
				</label>
				<input
					id="contact-email"
					type="email"
					autoComplete="email"
					inputMode="email"
					placeholder="Email address"
					value={values.email}
					onChange={(e) => setField("email", e.target.value)}
					aria-invalid={Boolean(errors.email)}
					aria-describedby={errors.email ? "err-email" : undefined}
					className={INPUT_BASE}
					style={{
						borderColor: errors.email
							? "#ef4444"
							: "rgba(84,131,179,0.2)",
						color: "#1A1A2E",
					}}
				/>
				{errors.email && (
					<p id="err-email" role="alert" className="mt-1 text-[13px] text-red-600">
						{errors.email}
					</p>
				)}
			</div>

			{/* Row 3: Inquiry Type (dropdown) */}
			<div className="mt-5">
				<label
					htmlFor="contact-inquiry"
					className={LABEL_STYLE}
					style={{ color: "#5483B3" }}
				>
					Inquiry type
				</label>
				<select
					id="contact-inquiry"
					value={values.inquiryType}
					onChange={(e) => setField("inquiryType", e.target.value)}
					className={INPUT_BASE}
					style={{
						borderColor: "rgba(84,131,179,0.2)",
						color: values.inquiryType ? "#1A1A2E" : "#9CA3AF",
						appearance: "none",
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
						backgroundRepeat: "no-repeat",
						backgroundPosition: "right 16px center",
					}}
				>
					<option value="" disabled>
						Select a topic
					</option>
					{INQUIRY_TOPICS.map((topic) => (
						<option key={topic} value={topic}>
							{topic}
						</option>
					))}
				</select>
			</div>

			{/* Row 4: Message */}
			<div className="mt-5">
				<label
					htmlFor="contact-message"
					className={LABEL_STYLE}
					style={{ color: "#5483B3" }}
				>
					Message
				</label>
				<textarea
					id="contact-message"
					placeholder="Your message"
					value={values.message}
					onChange={(e) => setField("message", e.target.value)}
					aria-invalid={Boolean(errors.message)}
					aria-describedby={errors.message ? "err-message" : undefined}
					className={`${INPUT_BASE} resize-y !h-auto`}
					style={{
						borderColor: errors.message
							? "#ef4444"
							: "rgba(84,131,179,0.2)",
						color: "#1A1A2E",
						minHeight: 140,
						paddingTop: 12,
						paddingBottom: 12,
					}}
				/>
				{errors.message && (
					<p id="err-message" role="alert" className="mt-1 text-[13px] text-red-600">
						{errors.message}
					</p>
				)}
			</div>

			{/* Row 5: Submit */}
			<div className="mt-6">
				<button
					type="submit"
					disabled={isSubmitting}
					aria-disabled={isSubmitting}
					className="inline-flex items-center gap-2 rounded-lg border-none px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[2px] text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60"
					style={{ background: "#5483B3" }}
					onMouseEnter={(e) => {
						if (!isSubmitting) e.currentTarget.style.background = "#052659";
					}}
					onMouseLeave={(e) => {
						if (!isSubmitting) e.currentTarget.style.background = "#5483B3";
					}}
				>
					{isSubmitting ? "Sending\u2026" : "Send Message"}
					{!isSubmitting && (
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					)}
				</button>
			</div>

			{/* WhatsApp alternative */}
			<div className="mt-5">
				<a
					href="https://wa.me/254793995142"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 text-[13px] transition-colors duration-300 hover:underline"
					style={{
						fontFamily: "'DM Sans', sans-serif",
						color: "#5483B3",
					}}
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
					</svg>
					Prefer WhatsApp? Message us directly
				</a>
			</div>

			{/* Submit error */}
			<div aria-live="polite" aria-atomic="true">
				{submitError && (
					<div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
						<p role="status" className="text-[13px] text-red-700">
							{submitError}
						</p>
					</div>
				)}
			</div>
		</form>
	);
}
