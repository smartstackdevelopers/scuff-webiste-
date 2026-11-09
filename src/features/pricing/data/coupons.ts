import { Coupon } from "../types/pricing";

export const DEMO_COUPONS: Record<string, Coupon> = {
  WELCOME10: {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrder: 50,
    expiryDate: "2026-12-31",
    description: "10% off your first booking (Min order £50)",
  },
  DETAIL15: {
    code: "DETAIL15",
    discountType: "percentage",
    discountValue: 15,
    minOrder: 100,
    expiryDate: "2026-11-30",
    description: "15% seasonal discount on detailing packages (Min order £100)",
  },
  PREMIUM20: {
    code: "PREMIUM20",
    discountType: "percentage",
    discountValue: 20,
    minOrder: 150,
    maxDiscount: 100,
    expiryDate: "2026-12-31",
    description: "20% off Premium Detail or Ultimate Protection (Min order £150, max savings £100)",
  },
  BUFF25: {
    code: "BUFF25",
    discountType: "fixed",
    discountValue: 25,
    minOrder: 120,
    expiryDate: "2026-12-31",
    description: "£25 fixed voucher on orders over £120",
  },
  EXPIRED50: {
    code: "EXPIRED50",
    discountType: "percentage",
    discountValue: 50,
    minOrder: 50,
    expiryDate: "2024-01-01",
    description: "Expired promotional coupon (for test validation simulation)",
  },
};

export const DEMO_AVAILABLE_COUPONS = [
  DEMO_COUPONS.WELCOME10,
  DEMO_COUPONS.DETAIL15,
  DEMO_COUPONS.PREMIUM20,
  DEMO_COUPONS.BUFF25,
];
