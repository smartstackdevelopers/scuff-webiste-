import { DealOffer } from "../types/pricing";

export const DEMO_DEALS_OFFERS: DealOffer[] = [
  {
    id: "deal-seasonal",
    title: "Seasonal Detailing Offer",
    tagline: "Autumn & Winter Clearcoat Shield",
    description:
      "Prepare your paintwork for harsh road salts and winter rain. Includes complete decontamination wash, clay bar, and 6-month polymer sealant.",
    discountPlaceholder: "15% OFF",
    badge: "Limited Time",
    expiryDate: "Valid until 30 Nov 2026",
    couponCode: "DETAIL15",
    targetPackageId: "premium-detail",
    terms: [
      "Applies to Premium Detail package bookings.",
      "Valid for mobile visits and studio bay appointments across London.",
      "Cannot be combined with other promotional codes.",
    ],
  },
  {
    id: "deal-new-customer",
    title: "New Customer Discount",
    tagline: "First-Time Detailing Welcome",
    description:
      "Experience our master craftsmanship on your vehicle. Save 10% on any service package when booking with You Scuff We Buff for the first time.",
    discountPlaceholder: "10% OFF",
    badge: "First Visit",
    expiryDate: "Valid until 31 Dec 2026",
    couponCode: "WELCOME10",
    targetPackageId: "essential-care",
    terms: [
      "Exclusive to first-time vehicle registration bookings.",
      "Minimum order value of £50 applies.",
      "One redemption per household / vehicle registration.",
    ],
  },
  {
    id: "deal-premium-offer",
    title: "Premium Package Offer",
    tagline: "Dual-Action Machine Correction Upgrade",
    description:
      "Unlock 20% off when upgrading to our flagship Ultimate Protection package. Includes 9H ceramic coating and 3-year warranty certificate.",
    discountPlaceholder: "SAVE 20%",
    badge: "Best Value",
    expiryDate: "Valid until 31 Dec 2026",
    couponCode: "PREMIUM20",
    targetPackageId: "ultimate-protection",
    terms: [
      "Valid for studio bay appointments only due to infrared baking requirements.",
      "Applicable to all vehicle categories (Small to Large 4x4).",
      "Maximum discount capped at £100.",
    ],
  },
  {
    id: "deal-care-bundle",
    title: "Vehicle Care Bundle",
    tagline: "Interior & Engine Bay Protection Duo",
    description:
      "Book any Premium Detail and receive £25 off when adding Leather Conditioning and Engine Bay Steam Cleaning to your reservation.",
    discountPlaceholder: "£25 VOUCHER",
    badge: "Bundle Deal",
    expiryDate: "Valid until 31 Dec 2026",
    couponCode: "BUFF25",
    targetPackageId: "premium-detail",
    terms: [
      "Requires minimum basket value of £120.",
      "Includes complimentary satin rubber dress protection.",
      "Subject to technician availability.",
    ],
  },
];
