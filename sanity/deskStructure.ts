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
			S.listItem()
				.title("Clients & Industries")
				.id("clientsAndIndustries")
				.child(
					S.document()
						.schemaType("clientsAndIndustries")
						.documentId("clientsAndIndustries")
				),
			S.listItem()
				.title("Careers")
				.id("careersPage")
				.child(
					S.document()
						.schemaType("careersPage")
						.documentId("careersPage")
				),
			S.listItem()
				.title("Contact")
				.id("contactPage")
				.child(
					S.document()
						.schemaType("contactPage")
						.documentId("contactPage")
				),
			S.listItem()
				.title("Company Positioning")
				.id("companyPositioning")
				.child(
					S.document()
						.schemaType("companyPositioning")
						.documentId("companyPositioning")
				),
			S.listItem()
				.title("Delivery Model")
				.id("deliveryModel")
				.child(
					S.document()
						.schemaType("deliveryModel")
						.documentId("deliveryModel")
				),
			S.listItem()
				.title("Internal Strategy")
				.id("internalStrategy")
				.child(
					S.document()
						.schemaType("internalStrategy")
						.documentId("internalStrategy")
				),
			S.listItem()
				.title("Core Team")
				.id("coreTeam")
				.child(
					S.document()
						.schemaType("coreTeam")
						.documentId("coreTeam")
				),
			S.listItem()
				.title("Capability Stack")
				.id("capabilityStack")
				.child(
					S.document()
						.schemaType("capabilityStack")
						.documentId("capabilityStack")
				),
			S.listItem()
				.title("Growth Strategy (Internal)")
				.id("growthStrategy")
				.child(
					S.document()
						.schemaType("growthStrategy")
						.documentId("growthStrategy")
				),
			S.listItem()
				.title("Join Us")
				.id("joinUs")
				.child(
					S.document()
						.schemaType("joinUs")
						.documentId("joinUs")
				),
			S.divider(),
			...S.documentTypeListItems().filter(
				(listItem) =>
					listItem.getId() !== "siteSettings" &&
					listItem.getId() !== "howWeWork" &&
					listItem.getId() !== "privacyPolicy" &&
					listItem.getId() !== "clientsAndIndustries" &&
					listItem.getId() !== "careersPage" &&
					listItem.getId() !== "contactPage" &&
					listItem.getId() !== "companyPositioning" &&
					listItem.getId() !== "deliveryModel" &&
					listItem.getId() !== "internalStrategy" &&
					listItem.getId() !== "coreTeam" &&
					listItem.getId() !== "capabilityStack" &&
					listItem.getId() !== "growthStrategy" &&
					listItem.getId() !== "joinUs"
			),
		]);
