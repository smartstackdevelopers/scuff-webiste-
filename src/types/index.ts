export type ThemeMode = "light" | "dark" | "system";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  iconName?: string;
  disabled?: boolean;
  external?: boolean;
  highlight?: boolean;
  translationKey?: string;
  children?: NavItem[];
}

export interface ServiceTier {
  id: string;
  name: string;
  tagline: string;
  description: string;
  durationHours: number;
  startingPrice: number;
  popular?: boolean;
  features: string[];
}

export type VehicleCategory =
  | "hatchback"
  | "sedan"
  | "suv"
  | "luxury_supercar"
  | "van_commercial";

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  createdAt: string;
}
