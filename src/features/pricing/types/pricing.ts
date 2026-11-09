export type VehicleCategory = "small" | "sedan" | "suv" | "large";

export interface VehicleCategoryOption {
  id: VehicleCategory;
  label: string;
  sublabel: string;
  description: string;
  multiplier: number;
  iconName: string;
}

export interface PricingPackage {
  id: "essential-care" | "premium-detail" | "ultimate-protection";
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  currency: string;
  duration: string;
  recommended?: boolean;
  badge?: string;
  features: string[];
  inclusionsSummary: string[];
}

export interface PackageComparisonCategory {
  categoryName: string;
  rows: {
    feature: string;
    tooltip?: string;
    essentialCare: boolean | string;
    premiumDetail: boolean | string;
    ultimateProtection: boolean | string;
  }[];
}

export interface ServiceAddon {
  id: string;
  title: string;
  shortDescription: string;
  demoPrice: number;
  currency: string;
  duration: string;
  iconName: string;
  popular?: boolean;
  category: "Interior" | "Exterior" | "Protection";
}

export interface DealOffer {
  id: string;
  title: string;
  tagline: string;
  description: string;
  discountPlaceholder: string;
  badge: string;
  expiryDate: string;
  terms: string[];
  couponCode?: string;
  targetPackageId?: "essential-care" | "premium-detail" | "ultimate-protection";
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrder: number;
  expiryDate: string;
  description: string;
  maxDiscount?: number;
}

export interface CouponValidationResult {
  isValid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}

export interface PriceBreakdown {
  packageBasePrice: number;
  vehicleMultiplier: number;
  packageAdjustedPrice: number;
  addonsTotal: number;
  subtotal: number;
  discountAmount: number;
  finalEstimatedTotal: number;
}

export interface PricingFAQ {
  question: string;
  answer: string;
}
