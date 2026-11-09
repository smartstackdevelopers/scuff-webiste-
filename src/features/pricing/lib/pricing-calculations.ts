import { Coupon, CouponValidationResult, PriceBreakdown } from "../types/pricing";
import { DEMO_COUPONS } from "../data/coupons";

/**
 * Rounds monetary amounts to 2 decimal places (or integer for neat presentation).
 */
export function formatCurrency(amount: number, currency = "£"): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded)
    ? `${currency}${rounded}`
    : `${currency}${rounded.toFixed(2)}`;
}

/**
 * Calculates package price adjusted by vehicle size multiplier.
 */
export function calculateAdjustedPackagePrice(
  basePrice: number,
  multiplier: number
): number {
  return Math.round(basePrice * multiplier);
}

/**
 * Validates a coupon code against mock demo coupons and subtotal.
 * Note: Simulation only on frontend.
 */
export function validateCoupon(
  code: string,
  subtotal: number
): CouponValidationResult {
  const trimmedCode = code.trim().toUpperCase();

  if (!trimmedCode) {
    return {
      isValid: false,
      discountAmount: 0,
      message: "Please enter a coupon code.",
    };
  }

  const coupon = DEMO_COUPONS[trimmedCode];

  if (!coupon) {
    return {
      isValid: false,
      discountAmount: 0,
      message: `Coupon "${trimmedCode}" is not recognized. Try WELCOME10, DETAIL15, or PREMIUM20.`,
    };
  }

  // Check expiry (demo dates)
  const today = new Date().toISOString().split("T")[0];
  if (coupon.expiryDate < today) {
    return {
      isValid: false,
      coupon,
      discountAmount: 0,
      message: `Coupon "${coupon.code}" expired on ${coupon.expiryDate}.`,
    };
  }

  // Check minimum basket requirement
  if (subtotal < coupon.minOrder) {
    return {
      isValid: false,
      coupon,
      discountAmount: 0,
      message: `Coupon "${coupon.code}" requires a minimum order of £${coupon.minOrder}. Current subtotal is £${subtotal}.`,
    };
  }

  // Calculate discount
  let discount = 0;
  if (coupon.discountType === "percentage") {
    discount = Math.round((subtotal * coupon.discountValue) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else if (coupon.discountType === "fixed") {
    discount = Math.min(coupon.discountValue, subtotal);
  }

  return {
    isValid: true,
    coupon,
    discountAmount: discount,
    message: `Coupon "${coupon.code}" applied! You saved £${discount}.`,
  };
}

/**
 * Computes full price breakdown including vehicle multiplier, addons, and applied coupon.
 */
export function calculateFullPriceBreakdown({
  packageBasePrice,
  vehicleMultiplier,
  addonsTotal,
  appliedCoupon,
}: {
  packageBasePrice: number;
  vehicleMultiplier: number;
  addonsTotal: number;
  appliedCoupon: Coupon | null;
}): PriceBreakdown {
  const packageAdjustedPrice = calculateAdjustedPackagePrice(
    packageBasePrice,
    vehicleMultiplier
  );
  const subtotal = packageAdjustedPrice + addonsTotal;

  let discountAmount = 0;
  if (appliedCoupon) {
    const valResult = validateCoupon(appliedCoupon.code, subtotal);
    if (valResult.isValid) {
      discountAmount = valResult.discountAmount;
    }
  }

  const finalEstimatedTotal = Math.max(0, subtotal - discountAmount);

  return {
    packageBasePrice,
    vehicleMultiplier,
    packageAdjustedPrice,
    addonsTotal,
    subtotal,
    discountAmount,
    finalEstimatedTotal,
  };
}
