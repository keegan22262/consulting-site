import type { StructureBuilder } from "sanity/desk";

export const deskStructure = (S: StructureBuilder) =>
	S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Site Settings")
				.id("siteSettings")
				.child(
					S.document()
						.schemaType("siteSettings")
						.documentId("siteSettings")
				),
			S.listItem()
				.title("How We Work")
				.id("howWeWork")
				.child(
					S.document()
						.schemaType("howWeWork")
						.documentId("howWeWork")
				),
			S.listItem()
				.title("Privacy Policy")
				.id("privacyPolicy")
				.child(
					S.document()
						.schemaType("privacyPolicy")
						.documentId("privacyPolicy")
				),
			S.divider(),
			...S.documentTypeListItems().filter(
				(listItem) =>
					listItem.getId() !== "siteSettings" &&
					listItem.getId() !== "howWeWork" &&
					listItem.getId() !== "privacyPolicy"
			),
		]);
