import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
	name: unknown;
	email: unknown;
	message: unknown;
	company?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
	// Intentionally simple (no external libs) while catching common invalid formats.
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (typeof value !== "object" || value === null) return false;
	if (Array.isArray(value)) return false;
	return true;
}

export async function POST(request: Request): Promise<Response> {
	try {
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

		if (message.length <= 10) {
			return Response.json(
				{ success: false, error: "Message must be more than 10 characters long." },
				{ status: 400 }
			);
		}

		const resendApiKey = process.env.RESEND_API_KEY;
		const senderEmail = process.env.CONTACT_SENDER_EMAIL;
		const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

		if (!resendApiKey || !senderEmail || !receiverEmail) {
			console.error("Contact email sending is not configured.", {
				resendApiKey: Boolean(resendApiKey),
				senderEmail: Boolean(senderEmail),
				receiverEmail: Boolean(receiverEmail),
			});
			return Response.json(
				{ success: false, error: "Internal server error." },
				{ status: 500 }
			);
		}

		try {
			const resend = new Resend(resendApiKey);
			await resend.emails.send({
				from: senderEmail,
				to: receiverEmail,
				subject: "New Website Inquiry",
				text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
			});
		} catch (error) {
			const timestamp = new Date().toISOString();
			console.error("Failed to send contact email", { timestamp, error });
			return Response.json(
				{ success: false, error: "Internal server error." },
				{ status: 500 }
			);
		}

		const timestamp = new Date().toISOString();
		console.log("Contact submission received", { timestamp });
		return Response.json({ success: true }, { status: 200 });
	} catch {
		return Response.json(
			{ success: false, error: "Internal server error." },
			{ status: 500 }
		);
	}
}
