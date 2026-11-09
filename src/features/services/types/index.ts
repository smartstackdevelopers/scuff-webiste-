export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceInclusionPhase {
  phase: string;
  items: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceBeforeAfter {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  caseNote: string;
}

/** Configurable availability — never assume every job is mobile. */
export type ServiceAvailability =
  | "mobile"
  | "mobile_suitable"
  | "workshop"
  | "assessment";

export interface DetailedService {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  category:
    | "Detailing"
    | "Correction"
    | "Protection"
    | "Maintenance"
    | "Wheel Repair"
    | "Smart Repair"
    | "Mobile";
  startingPrice: number;
  currency: string;
  /** When true, UI shows quote-on-assessment instead of a fixed price */
  priceOnAssessment?: boolean;
  duration: string;
  description: string;
  longDescription: string;
  heroImage: {
    url: string;
    alt: string;
  };
  keyBenefits: ServiceBenefit[];
  whatsIncluded: ServiceInclusionPhase[];
  beforeAfter: ServiceBeforeAfter;
  faqs: ServiceFAQ[];
  popular?: boolean;
  recommendedFor: string;
  relatedSlugs: string[];
  /** Common problems this service addresses */
  problemsAddressed?: string[];
  /** Configurable availability for mobile / workshop */
  availability?: ServiceAvailability;
  availabilityNote?: string;
  enabled?: boolean;
}

export interface ComparisonFeature {
  name: string;
  tooltip?: string;
  interiorDetailing: boolean | string;
  exteriorDetailing: boolean | string;
  paintCorrection: boolean | string;
  ceramicCoating: boolean | string;
  fullVehicleDetailing: boolean | string;
  maintenanceDetailing: boolean | string;
}

export interface ComparisonCategory {
  categoryName: string;
  features: ComparisonFeature[];
}

export const AVAILABILITY_LABELS: Record<
  ServiceAvailability,
  { label: string; short: string; tone: "mobile" | "workshop" | "assessment" }
> = {
  mobile: {
    label: "Mobile Service Available",
    short: "Mobile",
    tone: "mobile",
  },
  mobile_suitable: {
    label: "Home & Office Appointments (Suitable Jobs)",
    short: "Mobile Suitable",
    tone: "mobile",
  },
  workshop: {
    label: "Workshop Required",
    short: "Workshop",
    tone: "workshop",
  },
  assessment: {
    label: "Assessment Required",
    short: "Assessment",
    tone: "assessment",
  },
};
