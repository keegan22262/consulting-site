import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./deskStructure";

export default defineConfig({
  name: "default",
  title: "Consulting Site Studio",

  projectId: "cwdgyz8l",
  dataset: "production",
  apiVersion: "2024-01-01",

  plugins: [deskTool({ structure: deskStructure }), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter(
        (template) =>
          template.schemaType !== "siteSettings" &&
          template.schemaType !== "howWeWork" &&
          template.schemaType !== "privacyPolicy" &&
          template.schemaType !== "clientsAndIndustries" &&
          template.schemaType !== "careersPage" &&
          template.schemaType !== "contactPage" &&
          template.schemaType !== "companyPositioning" &&
          template.schemaType !== "deliveryModel" &&
          template.schemaType !== "internalStrategy" &&
          template.schemaType !== "coreTeam" &&
          template.schemaType !== "capabilityStack" &&
          template.schemaType !== "growthStrategy" &&
          template.schemaType !== "joinUs"
      ),
  },
});
