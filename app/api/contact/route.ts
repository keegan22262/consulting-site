import { getResendClient } from "../../../lib/resend";

declare global {
	// eslint-disable-next-line no-var
	var __contactRateLimitStore: Map<string, number[]> | undefined;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore: Map<string, number[]> =
	globalThis.__contactRateLimitStore ?? new Map<string, number[]>();
globalThis.__contactRateLimitStore = rateLimitStore;

const ALLOWED_PAYLOAD_FIELDS = new Set<string>([
	"name",
	"email",
	"message",
	"company",
]);

function isPlainObject(value: unknown): value is Record<string, unknown> {
	if (typeof value !== "object" || value === null) return false;
	if (Array.isArray(value)) return false;
	return true;
}

function getClientIp(request: Request): string {
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) {
		const first = forwardedFor.split(",")[0]?.trim();
		if (first) return first;
	}

	const realIp = request.headers.get("x-real-ip")?.trim();
	if (realIp) return realIp;

	return "unknown";
}

function isRateLimited(ip: string, nowMs: number): boolean {
	const existing = rateLimitStore.get(ip) ?? [];
	const windowStart = nowMs - RATE_LIMIT_WINDOW_MS;
	const recent = existing.filter((timestamp) => timestamp > windowStart);

	if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
		rateLimitStore.set(ip, recent);
		return true;
	}

	recent.push(nowMs);
	rateLimitStore.set(ip, recent);
	return false;
}

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

type ContactLogEntry = {
	timestamp: string;
	source: string;
	success: boolean;
};

function logInfo(entry: ContactLogEntry) {
	console.info("[contact]", entry);
}

function logWarn(entry: ContactLogEntry) {
	console.warn("[contact]", entry);
}

export async function POST(request: Request): Promise<Response> {
	try {
		const timestamp = new Date().toISOString();
		const source = getClientIp(request);

		let payload: ContactPayload;

		try {
			const parsed = (await request.json()) as unknown;
			if (!isPlainObject(parsed)) {
				logInfo({ timestamp, source, success: false });
				return Response.json(
					{ success: false, error: "Invalid payload structure." },
					{ status: 400 }
				);
			}

			for (const key of Object.keys(parsed)) {
				if (!ALLOWED_PAYLOAD_FIELDS.has(key)) {
					logInfo({ timestamp, source, success: false });
					return Response.json(
						{ success: false, error: "Invalid payload structure." },
						{ status: 400 }
					);
				}
			}

			payload = parsed as ContactPayload;
		} catch {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Invalid JSON body." },
				{ status: 400 }
			);
		}

		const { name, email, message, company } = payload;

		if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Invalid payload structure." },
				{ status: 400 }
			);
		}

		if (company !== undefined && company !== null && typeof company !== "string") {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Invalid payload structure." },
				{ status: 400 }
			);
		}

		const trimmedName = name.trim();
		const trimmedEmail = email.trim();
		const trimmedMessage = message.trim();
		const trimmedCompany = typeof company === "string" ? company.trim() : "";

		if (trimmedCompany.length > 0) {
			logWarn({ timestamp, source, success: false });
			return Response.json({ success: true }, { status: 200 });
		}

		if (isRateLimited(source, Date.now())) {
			logWarn({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Too many requests. Please try again later." },
				{ status: 429 }
			);
		}

		if (!isNonEmptyString(trimmedName)) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Name is required." },
				{ status: 400 }
			);
		}

		if (!isNonEmptyString(trimmedEmail)) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Email is required." },
				{ status: 400 }
			);
		}

		if (!isValidEmail(trimmedEmail)) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Email must be a valid email address." },
				{ status: 400 }
			);
		}

		if (!isNonEmptyString(trimmedMessage)) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Message is required." },
				{ status: 400 }
			);
		}

		if (trimmedMessage.length > 2000) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Message must be 2000 characters or fewer." },
				{ status: 400 }
			);
		}

		if (trimmedMessage.length < 10) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Message must be at least 10 characters long." },
				{ status: 400 }
			);
		}

		const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
		const senderEmail = process.env.CONTACT_SENDER_EMAIL;

		if (!receiverEmail || receiverEmail.trim().length === 0) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Internal server error." },
				{ status: 500 }
			);
		}

		if (!senderEmail || senderEmail.trim().length === 0) {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Internal server error." },
				{ status: 500 }
			);
		}

		const resend = getResendClient();

		const emailText = [
			"New Contact Inquiry",
			"",
			`Name: ${trimmedName}`,
			`Email: ${trimmedEmail}`,
			"",
			"Message:",
			trimmedMessage,
		].join("\n");

		try {
			const sendResult = await resend.emails.send({
				from: senderEmail.trim(),
				to: [receiverEmail.trim()],
				subject: "New Contact Inquiry",
				text: emailText,
			});

			if (sendResult && "error" in sendResult && sendResult.error) {
				logInfo({ timestamp, source, success: false });
				return Response.json(
					{ success: false, error: "Internal server error." },
					{ status: 500 }
				);
			}
		} catch {
			logInfo({ timestamp, source, success: false });
			return Response.json(
				{ success: false, error: "Internal server error." },
				{ status: 500 }
			);
		}

		logInfo({ timestamp, source, success: true });
		return Response.json({ success: true }, { status: 200 });
	} catch {
		const timestamp = new Date().toISOString();
		const source = getClientIp(request);
		logInfo({ timestamp, source, success: false });

		return Response.json(
			{ success: false, error: "Internal server error." },
			{ status: 500 }
		);
	}
}
