export type CapabilityDeliverable = {
  overline: string;
  title: string;
  body: string;
};

export type CapabilityData = {
  id: string;
  number: string;
  title: string;
  focusAreas: string;
  targetClients: string;
  approach: string;
  deliverables: CapabilityDeliverable[];
  relatedIndustries: string[];
};

export { SERVICE_IMAGES, IMG_CTA_PATTERN, FINAL_CTA_IMAGES, IMG_FINAL_CTA_FALLBACK } from "@/src/sections/service-detail/images";
export { CAPABILITY_CARD_IMAGES } from "@/src/sections/service-detail/capabilityCardImages";
export { METHODOLOGY_STAGE_IMAGES, METHODOLOGY_STAGES } from "@/src/sections/service-detail/methodologyImages";
export { INDUSTRY_IMAGES_REF, INDUSTRY_REF } from "@/src/sections/service-detail/industryRefs";
export { CAPABILITIES } from "@/src/sections/service-detail/capabilities";
