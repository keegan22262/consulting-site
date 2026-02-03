import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import sanityEnv from "./env";

const { projectId, dataset, apiVersion } = sanityEnv;

export default defineConfig({
  name: "default",
  title: "Consulting Site Studio",

  projectId,
  dataset,
  apiVersion,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
