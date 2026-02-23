import { page } from "./page";
import { service } from "./service";
import { insight } from "./insight";
import { insightTheme } from "./insightTheme";
import { siteSettings } from "./siteSettings";
import { howWeWork } from "./howWeWork";
import { privacyPolicy } from "./privacyPolicy";
import { terms } from "./terms";
import { contactSubmission } from "./contactSubmission";
import { clientsAndIndustries } from "./clientsAndIndustries";
import { careersPage } from "./careersPage";
import { contactPage } from "./contactPage";
import { companyPositioning } from "./companyPositioning";
import { deliveryModel } from "./deliveryModel";
import { internalStrategy } from "./internalStrategy";
import { coreTeam } from "./coreTeam";
import { capabilityStack } from "./capabilityStack";
import { growthStrategy } from "./growthStrategy";
import { joinUs } from "./joinUs";
import { industry } from "./industry";

export const schemaTypes = [
  page,
  service,
  insight,
  insightTheme,
  siteSettings,
  howWeWork,
  privacyPolicy,
  terms,
  contactSubmission,
  clientsAndIndustries,
  careersPage,
  contactPage,
  companyPositioning,
  deliveryModel,
  internalStrategy,
  coreTeam,
  capabilityStack,
  growthStrategy,
  joinUs,
  industry
];

export interface Industry {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  tags?: string[];
  order?: number;
}

export interface Homepage {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  tags?: string[];
  order?: number;
  industries?: {
    _id: string;
    title: string;
    slug: { current: string };
    summary?: string;
    tags?: string[];
    order?: number;
  }[];
}
