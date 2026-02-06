import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./deskStructure";

function readEnv(name: string): string {
  return (process.env[name] || "").trim();
}

const projectId = readEnv("SANITY_PROJECT_ID") || readEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = readEnv("SANITY_DATASET") || readEnv("NEXT_PUBLIC_SANITY_DATASET");
const apiVersion = readEnv("SANITY_API_VERSION") || readEnv("NEXT_PUBLIC_SANITY_API_VERSION");

export default defineConfig({
  name: "default",
  title: "Consulting Site Studio",

  projectId,
  dataset,
  apiVersion,

  plugins: [deskTool({ structure: deskStructure }), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter(
        (template) =>
          template.schemaType !== "siteSettings" &&
          template.schemaType !== "howWeWork" &&
          template.schemaType !== "privacyPolicy"
      ),
  },
});
