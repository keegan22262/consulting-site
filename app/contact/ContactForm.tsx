"use client";

import React, { useState } from "react";
import Button from "@/components-v2/ui/Button";

type FormValues = {
	name: string;
	email: string;
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
				setValues({ name: "", email: "", message: "", company: "" });
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

			<div className="pt-2">
				<Button
					type="submit"
					disabled={isSubmitting}
					aria-disabled={isSubmitting}
					variant="primary"
				>
					{isSubmitting ? "Sending…" : "Send message"}
				</Button>
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
		</form>
	);
}
