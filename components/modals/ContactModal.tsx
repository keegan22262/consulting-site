"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { InquiryType } from "./ContactModalProvider";

type ContactModalProps = {
	open: boolean;
	onClose: () => void;
	context?: {
		inquiryType?: InquiryType;
		relatedServiceId?: string;
		relatedServiceTitle?: string;
	};
};

export default function ContactModal({ open, onClose, context }: ContactModalProps) {
	const dialogId = useId();
	const panelRef = useRef<HTMLDivElement | null>(null);
	const nameInputRef = useRef<HTMLInputElement | null>(null);
	const lastActiveElementRef = useRef<HTMLElement | null>(null);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [status, setStatus] = useState<
		| { type: "idle" }
		| { type: "success"; message: string }
		| { type: "error"; message: string }
	>({ type: "idle" });

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [inquiryType, setInquiryType] = useState<InquiryType>("general");
	const [relatedServiceId, setRelatedServiceId] = useState("");
	const [relatedServiceTitle, setRelatedServiceTitle] = useState("");

	function resetForm() {
		setFullName("");
		setEmail("");
		setMessage("");
		setInquiryType("general");
		setRelatedServiceId("");
		setRelatedServiceTitle("");
		setStatus({ type: "idle" });
	}

	useEffect(() => {
		if (!open) return;
		lastActiveElementRef.current = document.activeElement as HTMLElement | null;
		nameInputRef.current?.focus();
		setStatus({ type: "idle" });
	}, [open]);

	useEffect(() => {
		if (!open) return;

		const nextRelatedServiceId = (context?.relatedServiceId ?? "").trim();
		const nextRelatedServiceTitle = (context?.relatedServiceTitle ?? "").trim();
		const nextInquiryType = context?.inquiryType;

		if (nextRelatedServiceId) {
			setInquiryType("service");
			setRelatedServiceId(nextRelatedServiceId);
			setRelatedServiceTitle(nextRelatedServiceTitle);
			return;
		}

		if (nextInquiryType) {
			setInquiryType(nextInquiryType);
		}
		setRelatedServiceId("");
		setRelatedServiceTitle("");
	}, [open, context?.inquiryType, context?.relatedServiceId, context?.relatedServiceTitle]);

	useEffect(() => {
		if (open) return;
		lastActiveElementRef.current?.focus();
		lastActiveElementRef.current = null;
		resetForm();
	}, [open]);

	useEffect(() => {
		if (!open) return;

		const previousBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousBodyOverflow;
		};
	}, [open]);

	if (!open) return null;

	const isRelatedServiceLocked = Boolean(context?.relatedServiceId);

	return (
		<div
			id={dialogId}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`${dialogId}-title`}
			aria-describedby={`${dialogId}-description`}
			className="fixed inset-0 z-60"
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					event.preventDefault();
					onClose();
					return;
				}

				if (event.key !== "Tab") return;
				const panel = panelRef.current;
				if (!panel) return;

				const focusable = Array.from(
					panel.querySelectorAll<HTMLElement>(
						'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
					)
				).filter((element) => element.offsetParent !== null);

				if (focusable.length === 0) return;

				const first = focusable[0];
				const last = focusable[focusable.length - 1];
				const active = document.activeElement as HTMLElement | null;

				if (!event.shiftKey && active === last) {
					event.preventDefault();
					first.focus();
				} else if (event.shiftKey && (active === first || !active || !panel.contains(active))) {
					event.preventDefault();
					last.focus();
				}
			}}
		>
			<button
				type="button"
				className="absolute inset-0 cursor-default bg-black/60"
				onClick={onClose}
				aria-label="Close contact modal"
			/>

			<div className="relative flex min-h-full items-end justify-center px-4 py-6 sm:items-center sm:py-10">
				<div
					ref={panelRef}
					className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-w-xl"
				>
					<div className="flex items-start justify-between gap-6 bg-slate-900 px-6 py-5 text-white">
						<div className="space-y-1">
							<h2 id={`${dialogId}-title`} className="text-lg font-semibold tracking-tight">
								Get in touch
							</h2>
							<p id={`${dialogId}-description`} className="text-sm text-slate-200">
								Share a few details and we’ll respond shortly.
							</p>
						</div>
						<button
							type="button"
							className="rounded-md p-2 text-slate-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
							onClick={onClose}
							aria-label="Close"
						>
							<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
								<path
									d="M6 6l12 12M18 6L6 18"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>

					<form
						className="space-y-4 px-6 py-6"
						onSubmit={async (event) => {
							event.preventDefault();
							if (isSubmitting) return;
							setStatus({ type: "idle" });

							setIsSubmitting(true);
							try {
								const trimmedName = fullName.trim();
								const trimmedEmail = email.trim();
								const trimmedMessage = message.trim();
								const trimmedRelatedServiceId = relatedServiceId.trim();

								const response = await fetch("/api/contact", {
									method: "POST",
									headers: { "Content-Type": "application/json" },
									body: JSON.stringify({
										name: trimmedName,
										email: trimmedEmail,
										message: trimmedMessage,
										inquiryType,
										...(trimmedRelatedServiceId
											? {
												relatedServiceId: trimmedRelatedServiceId,
												relatedService: trimmedRelatedServiceId,
											}
											: {}),
									}),
								});

								if (!response.ok) {
									let errorMessage = "Failed to send message.";
									try {
										const data = (await response.json()) as unknown;
										if (
											data &&
											typeof data === "object" &&
											"error" in data &&
											typeof (data as { error?: unknown }).error === "string"
										) {
											errorMessage = (data as { error: string }).error;
										}
									} catch {
										// ignore
									}
									setStatus({ type: "error", message: errorMessage });
									return;
								}

								setStatus({
									type: "success",
									message: "Message sent. We’ll get back to you shortly.",
								});
								setFullName("");
								setEmail("");
								setMessage("");
								setInquiryType("general");
								setRelatedServiceId("");
								setRelatedServiceTitle("");
							} catch {
								setStatus({
									type: "error",
									message: "Something went wrong. Please try again.",
								});
							} finally {
								setIsSubmitting(false);
							}
						}}
					>
						{status.type === "success" ? (
							<div
								className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
								role="status"
							>
								{status.message}
							</div>
						) : null}

						{status.type === "error" ? (
							<div
								className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900"
								role="alert"
							>
								{status.message}
							</div>
						) : null}

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<label className="block text-sm font-medium text-slate-800" htmlFor={`${dialogId}-fullName`}>
									Full Name
								</label>
								<input
									ref={nameInputRef}
									id={`${dialogId}-fullName`}
									name="fullName"
									type="text"
									autoComplete="name"
									required
									disabled={isSubmitting}
									value={fullName}
									onChange={(event) => setFullName(event.target.value)}
									className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
									placeholder="Your name"
								/>
							</div>

							<div className="space-y-2">
								<label className="block text-sm font-medium text-slate-800" htmlFor={`${dialogId}-email`}>
									Email
								</label>
								<input
									id={`${dialogId}-email`}
									name="email"
									type="email"
									autoComplete="email"
									required
									disabled={isSubmitting}
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
									placeholder="you@company.com"
								/>
							</div>
						</div>

						<fieldset className="space-y-2">
							<legend className="block text-sm font-medium text-slate-800">Inquiry Type</legend>
							<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
								<label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
									<input
										type="radio"
										name="inquiryType"
										value="general"
										checked={inquiryType === "general"}
										onChange={() => setInquiryType("general")}
										disabled={isSubmitting}
										className="h-4 w-4"
									/>
									<span>General</span>
								</label>
								<label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
									<input
										type="radio"
										name="inquiryType"
										value="service"
										checked={inquiryType === "service"}
										onChange={() => setInquiryType("service")}
										disabled={isSubmitting}
										className="h-4 w-4"
									/>
									<span>Service</span>
								</label>
								<label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
									<input
										type="radio"
										name="inquiryType"
										value="career"
										checked={inquiryType === "career"}
										onChange={() => setInquiryType("career")}
										disabled={isSubmitting}
										className="h-4 w-4"
									/>
									<span>Career</span>
								</label>
							</div>
						</fieldset>

						{inquiryType === "service" ? (
							<div className="space-y-2">
								<label
									className="block text-sm font-medium text-slate-800"
									htmlFor={`${dialogId}-relatedService`}
								>
									Related Service (optional)
								</label>
								{isRelatedServiceLocked ? (
									<div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
										{relatedServiceTitle || relatedServiceId}
									</div>
								) : (
									<input
										id={`${dialogId}-relatedService`}
										name="relatedServiceId"
										type="text"
										disabled={isSubmitting}
										value={relatedServiceId}
										onChange={(event) => setRelatedServiceId(event.target.value)}
										className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
										placeholder="Service ID"
									/>
								)}
							</div>
						) : null}

						<div className="space-y-2">
							<label className="block text-sm font-medium text-slate-800" htmlFor={`${dialogId}-message`}>
								Message
							</label>
							<textarea
								id={`${dialogId}-message`}
								name="message"
								rows={5}
								required
								disabled={isSubmitting}
								value={message}
								onChange={(event) => setMessage(event.target.value)}
								className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
								placeholder="How can we help?"
							/>
						</div>

						<div className="flex items-center justify-end gap-3 pt-2">
							<button
								type="button"
								className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
								onClick={onClose}
								disabled={isSubmitting}
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={isSubmitting}
								className="rounded-lg border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-950 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-slate-400"
							>
								{isSubmitting ? "Sending…" : "Send message"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
