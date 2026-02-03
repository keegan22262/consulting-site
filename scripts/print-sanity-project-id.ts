import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
	return typeof value === "object" && value !== null;
}

function pickProjectId(maybeConfig: unknown): string | undefined {
	if (!isRecord(maybeConfig)) return undefined;

	// Common shapes:
	// - { projectId: "..." }
	// - { api: { projectId: "..." } }
	// - defineConfig({ projectId: "..." }) returning object
	const direct = maybeConfig.projectId;
	if (typeof direct === "string" && direct.trim()) return direct.trim();

	const api = maybeConfig.api;
	if (isRecord(api)) {
		const nested = api.projectId;
		if (typeof nested === "string" && nested.trim()) return nested.trim();
	}

	return undefined;
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	const root = process.cwd();
	const candidates = [
		path.join(root, "sanity.config.ts"),
		path.join(root, "sanity.config.js"),
		path.join(root, "sanity.cli.ts"),
		path.join(root, "sanity.cli.js"),
	];

	const found = (
		await Promise.all(
			candidates.map(async (candidate) => ((await fileExists(candidate)) ? candidate : null))
		)
	).find((candidate): candidate is string => Boolean(candidate));

	if (!found) {
		console.log("No Sanity configuration found");
		return;
	}

	try {
		const mod = await import(pathToFileURL(found).href);
		const exported = (mod as AnyRecord).default ?? mod;
		const projectId = pickProjectId(exported);

		if (!projectId) {
			console.log("Sanity configuration found but projectId is not readable", {
				file: path.relative(root, found),
			});
			return;
		}

		console.log(projectId);
	} catch (error) {
		console.log("Sanity configuration found but could not be imported", {
			file: path.relative(root, found),
		});
		console.error(error);
		process.exitCode = 1;
	}
}

void main();
