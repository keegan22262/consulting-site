export const runtime = "nodejs";

import "server-only";

import { createClient } from "@sanity/client";
import nodemailer from "nodemailer";

type ContactPayload = {
	name: unknown;
	email: unknown;
	message: unknown;
	inquiryType: unknown;
	relatedServiceId?: unknown;
	relatedService?: unknown;
	company?: unknown;
};

type InquiryType = "general" | "service" | "career";

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
	// Intentionally simple (no external libs) while catching common invalid formats.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidInquiryType(value: string): value is InquiryType {
	return value === "general" || value === "service" || value === "career";
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (typeof value !== "object" || value === null) return false;
	if (Array.isArray(value)) return false;
	return true;
}

function readEnv(name: string): string {
	return (process.env[name] || "").trim();
}

function methodNotAllowed(): Response {
	return Response.json(
		{ success: false, error: "Method not allowed." },
		{ status: 405, headers: { Allow: "POST" } }
	);
}

function getSanityWriteClient() {
	const projectId = readEnv("SANITY_PROJECT_ID");
	const dataset = readEnv("SANITY_DATASET");
	const apiVersion = readEnv("SANITY_API_VERSION");
	const token =
		readEnv("SANITY_API_WRITE_TOKEN") ||
		readEnv("SANITY_WRITE_TOKEN") ||
		readEnv("SANITY_TOKEN");

	if (!projectId || !dataset || !apiVersion || !token) return null;

	return createClient({
		projectId,
		dataset,
		apiVersion,
		useCdn: false,
		token,
	});
}

type SmtpConfig = {
	host: string;
	port: number;
	user: string;
	pass: string;
	from: string;
	to: string;
};

function normalizePort(value: string): number {
	const parsed = Number.parseInt(value, 10);
	if (!Number.isFinite(parsed) || parsed <= 0) return 587;
	return parsed;
}

function getSmtpConfig(): SmtpConfig | null {
	const host = readEnv("SMTP_HOST");
	const port = normalizePort(readEnv("SMTP_PORT"));
	const user = readEnv("SMTP_USER");
	const pass = readEnv("SMTP_PASS");
	const from = readEnv("SMTP_FROM_EMAIL") || readEnv("CONTACT_SENDER_EMAIL");
	const to = readEnv("SMTP_TO_EMAIL") || readEnv("CONTACT_RECEIVER_EMAIL");

	if (!host || !user || !pass || !from || !to) return null;
	return { host, port, user, pass, from, to };
}

function getInquirySubject(inquiryType: InquiryType): string {
	switch (inquiryType) {
		case "general":
			return "New General Inquiry";
		case "service":
			return "New Service Inquiry";
		case "career":
			return "New Career Inquiry";
		default:
			return "New Inquiry";
	}
}

async function sendContactNotificationEmail(payload: {
	name: string;
	email: string;
	message: string;
	inquiryType: InquiryType;
}): Promise<void> {
	const smtp = getSmtpConfig();
	if (!smtp) {
		console.warn("SMTP is not configured; skipping contact notification email", {
			SMTP_HOST: Boolean(readEnv("SMTP_HOST")),
			SMTP_PORT: Boolean(readEnv("SMTP_PORT")),
			SMTP_USER: Boolean(readEnv("SMTP_USER")),
			SMTP_PASS: Boolean(readEnv("SMTP_PASS")),
			SMTP_FROM_EMAIL: Boolean(readEnv("SMTP_FROM_EMAIL")),
			SMTP_TO_EMAIL: Boolean(readEnv("SMTP_TO_EMAIL")),
			CONTACT_SENDER_EMAIL: Boolean(readEnv("CONTACT_SENDER_EMAIL")),
			CONTACT_RECEIVER_EMAIL: Boolean(readEnv("CONTACT_RECEIVER_EMAIL")),
		});
		return;
	}

	const transporter = nodemailer.createTransport({
		host: smtp.host,
		port: smtp.port,
		secure: smtp.port === 465,
		auth: {
			user: smtp.user,
			pass: smtp.pass,
		},
	});

	const subject = getInquirySubject(payload.inquiryType);
	const text = [
		`Inquiry Type: ${payload.inquiryType}`,
		`Name: ${payload.name}`,
		`Email: ${payload.email}`,
		"",
		"Message:",
		payload.message,
		"",
	].join("\n");

	await transporter.sendMail({
		from: smtp.from,
		to: smtp.to,
		subject,
		text,
	});
}

export function GET(): Response {
	return methodNotAllowed();
}

export function PUT(): Response {
	return methodNotAllowed();
}

export function PATCH(): Response {
	return methodNotAllowed();
}

export function DELETE(): Response {
	return methodNotAllowed();
}

export async function POST(request: Request): Promise<Response> {
	try {
		const sanity = getSanityWriteClient();
		if (!sanity) {
			console.error("Sanity write client is not configured for /api/contact", {
				SANITY_PROJECT_ID: Boolean(readEnv("SANITY_PROJECT_ID")),
				SANITY_DATASET: Boolean(readEnv("SANITY_DATASET")),
				SANITY_API_VERSION: Boolean(readEnv("SANITY_API_VERSION")),
				SANITY_API_WRITE_TOKEN: Boolean(readEnv("SANITY_API_WRITE_TOKEN")),
				SANITY_WRITE_TOKEN: Boolean(readEnv("SANITY_WRITE_TOKEN")),
				SANITY_TOKEN: Boolean(readEnv("SANITY_TOKEN")),
			});
			return Response.json(
				{ success: false, error: "Contact submission is not configured." },
				{ status: 503 }
			);
		}

		const parsed = (await request.json()) as unknown;
		if (!isPlainObject(parsed)) {
			return Response.json(
				{ success: false, error: "Invalid payload structure." },
				{ status: 400 }
			);
		}

		const payload = parsed as ContactPayload;
		const name = typeof payload.name === "string" ? payload.name.trim() : "";
		const email = typeof payload.email === "string" ? payload.email.trim() : "";
		const message = typeof payload.message === "string" ? payload.message.trim() : "";
		const inquiryType =
			typeof payload.inquiryType === "string" ? payload.inquiryType.trim() : "";
		const relatedServiceId =
			typeof payload.relatedServiceId === "string"
				? payload.relatedServiceId.trim()
				: "";
		const relatedServiceAlias =
			typeof payload.relatedService === "string" ? payload.relatedService.trim() : "";
		const relatedServiceRef = relatedServiceId || relatedServiceAlias;
		const company = typeof payload.company === "string" ? payload.company.trim() : "";

		if (company.length > 0) {
			return Response.json({ success: true }, { status: 200 });
		}

		if (!isNonEmptyString(name)) {
			return Response.json(
				{ success: false, error: "Name is required." },
				{ status: 400 }
			);
		}

		if (!isNonEmptyString(email)) {
			return Response.json(
				{ success: false, error: "Email is required." },
				{ status: 400 }
			);
		}

		if (!isValidEmail(email)) {
			return Response.json(
				{ success: false, error: "Email must be a valid email address." },
				{ status: 400 }
			);
		}

		if (!isNonEmptyString(message)) {
			return Response.json(
				{ success: false, error: "Message is required." },
				{ status: 400 }
			);
		}

		if (!isNonEmptyString(inquiryType)) {
			return Response.json(
				{ success: false, error: "Inquiry type is required." },
				{ status: 400 }
			);
		}

		if (!isValidInquiryType(inquiryType)) {
			return Response.json(
				{
					success: false,
					error: "Inquiry type must be one of: general, service, career.",
				},
				{ status: 400 }
			);
		}

		if (message.length <= 10) {
			return Response.json(
				{ success: false, error: "Message must be more than 10 characters long." },
				{ status: 400 }
			);
		}

		try {
			await sanity.create({
				_type: "contactSubmission",
				name,
				email,
				message,
				inquiryType,
				relatedService: relatedServiceRef
					? { _type: "reference", _ref: relatedServiceRef }
					: undefined,
				createdAt: new Date().toISOString(),
			});
		} catch (error) {
			const timestamp = new Date().toISOString();
			console.error("Failed to create contactSubmission in Sanity", { timestamp, error });
			return Response.json(
				{ success: false, error: "Internal server error." },
				{ status: 500 }
			);
		}

		// Best-effort email: never fail the API response if this errors.
		void sendContactNotificationEmail({
			name,
			email,
			message,
			inquiryType,
		}).catch((error) => {
			const timestamp = new Date().toISOString();
			console.error("Failed to send contact notification email", { timestamp, error });
		});

		return Response.json({ success: true }, { status: 200 });
	} catch {
		return Response.json(
			{ success: false, error: "Internal server error." },
			{ status: 500 }
		);
	}
}
