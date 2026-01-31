import "server-only";

import { Resend } from "resend";

export function getResendClient(): Resend {
	const apiKey = process.env.RESEND_API_KEY;

	if (!apiKey || apiKey.trim().length === 0) {
		throw new Error("RESEND_API_KEY is not set.");
	}

	return new Resend(apiKey);
}
