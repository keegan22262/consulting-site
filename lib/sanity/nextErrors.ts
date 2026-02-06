export function isNextDynamicServerUsageError(error: unknown): boolean {
	if (!error || typeof error !== "object") return false;

	const anyError = error as Record<string, unknown>;
	if (anyError.digest === "DYNAMIC_SERVER_USAGE") return true;

	const message = anyError.message;
	if (typeof message === "string" && message.includes("Dynamic server usage:")) return true;

	const description = anyError.description;
	if (typeof description === "string" && description.includes("Dynamic server usage:")) return true;

	return false;
}
