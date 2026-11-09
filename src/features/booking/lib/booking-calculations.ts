import { BookingState, BookingPriceSummary } from "../types/booking";
import { SERVICES_DATA } from "@/features/services/data/services-content";
import { PRICING_PACKAGES, VEHICLE_CATEGORIES } from "@/features/pricing/data/packages";
import { SERVICE_ADDONS } from "@/features/pricing/data/addons";
import { validateCoupon } from "@/features/pricing/lib/pricing-calculations";

export function calculateBookingSummary(state: BookingState): BookingPriceSummary {
  // 1. Identify primary service or package
  let basePrice = 120;
  let serviceName = "Vehicle Detailing";
  let packageName: string | undefined;
  let estimatedDuration = "3 – 5 Hours";

  let priceOnAssessment = false;

  if (state.serviceId && SERVICES_DATA[state.serviceId]) {
    const svc = SERVICES_DATA[state.serviceId];
    basePrice = svc.startingPrice;
    serviceName = svc.title;
    estimatedDuration = svc.duration;
    priceOnAssessment = Boolean(svc.priceOnAssessment) || svc.startingPrice <= 0;
  } else if (state.packageId) {
    const pkg = PRICING_PACKAGES.find((p) => p.id === state.packageId);
    if (pkg) {
      basePrice = pkg.basePrice;
      serviceName = pkg.name;
      packageName = pkg.name;
      estimatedDuration = pkg.duration;
    }
  }

  // 2. Vehicle multiplier
  const vehicleCategory = state.customer.vehicleCategory || "sedan";
  const vehicleOpt = VEHICLE_CATEGORIES.find((v) => v.id === vehicleCategory);
  const vehicleMultiplier = vehicleOpt ? vehicleOpt.multiplier : 1.0;

  const vehicleAdjustedPrice = Math.round(basePrice * vehicleMultiplier);

  // 3. Add-ons
  const selectedAddons = SERVICE_ADDONS.filter((addon) =>
    state.selectedAddonIds.includes(addon.id)
  ).map((addon) => ({
    id: addon.id,
    title: addon.title,
    price: addon.demoPrice,
  }));

  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);

  // 4. Subtotal
  const subtotal = vehicleAdjustedPrice + addonsTotal;

  // 5. Coupon discount calculation
  let discountAmount = 0;
  if (state.couponCode) {
    const valResult = validateCoupon(state.couponCode, subtotal);
    if (valResult.isValid) {
      discountAmount = valResult.discountAmount;
    }
  }

  const estimatedTotal = Math.max(0, subtotal - discountAmount);

  return {
    selectedServiceName: serviceName,
    selectedPackageName: packageName,
    basePrice,
    vehicleMultiplier,
    vehicleAdjustedPrice,
    addons: selectedAddons,
    addonsTotal,
    subtotal,
    discountAmount,
    estimatedTotal,
    estimatedDuration,
    priceOnAssessment,
  };
}
