import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { SITE_SETTINGS_SOCIAL_LINKS_QUERY } from "@/lib/sanity/queries";

export type SocialLinks = {
	linkedinUrl?: string;
	twitterUrl?: string;
	youtubeUrl?: string;
	instagramUrl?: string;
};



export const getSocialLinks = async (): Promise<SocialLinks> => {
	const data = await sanityFetch<SocialLinks | null>(
		SITE_SETTINGS_SOCIAL_LINKS_QUERY,
		undefined,
		{}
	);

	return data ?? {};
};
