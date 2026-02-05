export type UnifiedSearchResultType = "page" | "service" | "insight";

export type UnifiedSearchResult = {
	type: UnifiedSearchResultType;
	title: string;
	slug: string;
	excerpt: string;
};

export type UnifiedSearchGroupedResults = {
	pages: UnifiedSearchResult[];
	services: UnifiedSearchResult[];
	insights: UnifiedSearchResult[];
};
