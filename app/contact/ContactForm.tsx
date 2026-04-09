"use client";

import React, { useState } from "react";
import Button from "@/components-v2/ui/Button";

const INQUIRY_TYPES = [
	"Strategy & Transformation",
	"Digital & AI",
	"Financial Advisory",
	"Public Sector Advisory",
	"Sustainability & ESG",
	"Legal & Regulatory",
	"General Inquiry",
] as const;

type FormValues = {
	name: string;
	email: string;
	inquiryType: string;
	message: string;
	company: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
	const [values, setValues] = useState<FormValues>({
		name: "",
		email: "",
		inquiryType: "",
		message: "",
		company: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	function setField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
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

	function validate(nextValues: FormValues): FormErrors {
		const nextErrors: FormErrors = {};
		const name = nextValues.name.trim();
		const email = nextValues.email.trim();
		const message = nextValues.message.trim();

		if (name.length === 0) {
			nextErrors.name = "Name is required.";
		}

		if (email.length === 0) {
			nextErrors.email = "Email is required.";
		} else if (!isValidEmail(email)) {
			nextErrors.email = "Enter a valid email address.";
		}

		if (!nextValues.inquiryType) {
			nextErrors.inquiryType = "Please select an inquiry type.";
		}

		if (message.length === 0) {
			nextErrors.message = "Message is required.";
		} else if (message.length <= 10) {
			nextErrors.message = "Message must be more than 10 characters.";
		}

		return nextErrors;
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (isSubmitting) return;

		const nextValues: FormValues = {
			name: values.name.trim(),
			email: values.email.trim(),
			inquiryType: values.inquiryType,
			message: values.message.trim(),
			company: values.company.trim(),
		};

		const nextErrors = validate(nextValues);
		setErrors(nextErrors);
		setSubmitError(null);
		setSubmitSuccess(false);

		if (Object.keys(nextErrors).length > 0) {
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: nextValues.name,
					email: nextValues.email,
					inquiryType: nextValues.inquiryType,
					message: nextValues.message,
					company: nextValues.company,
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
				setValues({ name: "", email: "", inquiryType: "", message: "", company: "" });
				return;
			}

			if (apiError) {
				setSubmitError(apiError);
				return;
			}

			setSubmitError("We couldn’t send your message. Please try again later.");
		} catch {
			setSubmitError("We couldn’t send your message. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (submitSuccess) {
		return (
			<div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
				<div aria-live="polite" aria-atomic="true">
					<p role="status" className="text-sm text-slate-700">
					Thank you. Your message has been received.
					</p>
				</div>
				<div className="mt-4">
					<Button
						variant="secondary"
						onClick={() => {
							setSubmitSuccess(false);
							setSubmitError(null);
							setErrors({});
						}}
					>
						Send another message
					</Button>
				</div>
			</div>
		);
	}

	return (
		<form className="mt-6 space-y-5" method="post" noValidate onSubmit={handleSubmit}>
			<input type="hidden" name="company" value={values.company} />

			<div className="space-y-2">
				<label htmlFor="contact-name" className="text-sm font-medium text-slate-900">
					Name
				</label>
				<input
					id="contact-name"
					name="name"
					type="text"
					autoComplete="name"
					value={values.name}
					onChange={(event) => setField("name", event.target.value)}
					aria-invalid={Boolean(errors.name)}
					aria-describedby={errors.name ? "contact-name-error" : undefined}
					className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
				/>
				{errors.name ? (
					<p id="contact-name-error" role="alert" className="text-sm text-red-700">
						{errors.name}
					</p>
				) : null}
			</div>

			<div className="space-y-2">
				<label htmlFor="contact-email" className="text-sm font-medium text-slate-900">
					Email
				</label>
				<input
					id="contact-email"
					name="email"
					type="email"
					autoComplete="email"
					inputMode="email"
					value={values.email}
					onChange={(event) => setField("email", event.target.value)}
					aria-invalid={Boolean(errors.email)}
					aria-describedby={errors.email ? "contact-email-error" : undefined}
					className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
				/>
				{errors.email ? (
					<p id="contact-email-error" role="alert" className="text-sm text-red-700">
						{errors.email}
					</p>
				) : null}
			</div>

			<div className="space-y-2">
				<label htmlFor="contact-inquiry-type" className="text-sm font-medium text-slate-900">
					Inquiry type
				</label>
				<select
					id="contact-inquiry-type"
					name="inquiryType"
					value={values.inquiryType}
					onChange={(event) => setField("inquiryType", event.target.value)}
					aria-invalid={Boolean(errors.inquiryType)}
					aria-describedby={errors.inquiryType ? "contact-inquiry-type-error" : undefined}
					className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
				>
					<option value="">Select a topic</option>
					{INQUIRY_TYPES.map((type) => (
						<option key={type} value={type}>{type}</option>
					))}
				</select>
				{errors.inquiryType ? (
					<p id="contact-inquiry-type-error" role="alert" className="text-sm text-red-700">
						{errors.inquiryType}
					</p>
				) : null}
			</div>

			<div className="space-y-2">
				<label htmlFor="contact-message" className="text-sm font-medium text-slate-900">
					Message
				</label>
				<textarea
					id="contact-message"
					name="message"
					rows={6}
					value={values.message}
					onChange={(event) => setField("message", event.target.value)}
					aria-invalid={Boolean(errors.message)}
					aria-describedby={errors.message ? "contact-message-error" : undefined}
					className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
				/>
				{errors.message ? (
					<p id="contact-message-error" role="alert" className="text-sm text-red-700">
						{errors.message}
					</p>
				) : null}
			</div>

			<div className="pt-4">
				<button
					type="submit"
					disabled={isSubmitting}
					aria-disabled={isSubmitting}
					className="inline-flex items-center justify-center rounded-lg bg-[#1B3A5C] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#132B45] disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{isSubmitting ? "Sending…" : "Send Message"}
				</button>
			</div>

			<div aria-live="polite" aria-atomic="true">
				{submitError ? (
					<div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
						<p role="status" className="text-sm text-slate-700">
							{submitError}
						</p>
					</div>
				) : null}
			</div>

			<div className="mt-6 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
				<svg viewBox="0 0 24 24" fill="#25D366" className="h-5 w-5 flex-shrink-0">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
				</svg>
				<p className="text-sm text-slate-600">
					Prefer WhatsApp?{" "}
					<a
						href="https://wa.me/254793995142"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-[#1B3A5C] underline underline-offset-2 hover:text-[#132B45]"
					>
						Message us directly
					</a>
				</p>
			</div>
		</form>
	);
}
