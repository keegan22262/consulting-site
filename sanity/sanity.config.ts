import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./deskStructure";

const projectId = "cwdgyz8l";
const dataset = "production";
const apiVersion = "2026-02-03";

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
