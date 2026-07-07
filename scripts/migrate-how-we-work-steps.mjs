import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}

if (!token) {
  console.error("Missing SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const QUERY = '*[_type == "howWeWork"][0]{ _id, steps }';

function normalizeString(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

async function main() {
  const doc = await client.fetch(QUERY);
  if (!doc) {
    console.log("No howWeWork document found.");
    return;
  }

  if (!Array.isArray(doc.steps)) {
    console.log("howWeWork.steps is not an array. No changes made.");
    return;
  }

  let changed = false;

  const mapped = doc.steps.map((step) => {
    if (typeof step === "string") {
      const text = normalizeString(step);
      if (!text) return step;
      changed = true;
      return { title: text, description: text };
    }

    if (step && typeof step === "object") {
      const record = step;
      const title = normalizeString(record.title);
      const description = normalizeString(record.description);
      const nextTitle = title || description;
      const nextDescription = description || title;

      if (nextTitle !== title || nextDescription !== description) {
        changed = true;
      }

      return { ...record, title: nextTitle, description: nextDescription };
    }

    return step;
  });

  if (!changed) {
    console.log("No step updates required.");
    return;
  }

  await client
    .patch(doc._id)
    .set({ steps: mapped })
    .commit({ autoGenerateArrayKeys: true });

  console.log("How We Work steps updated.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
