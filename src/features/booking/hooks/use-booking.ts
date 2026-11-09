"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  BookingState,
  BookingStep,
  CustomerDetails,
  VehicleCategory,
} from "../types/booking";
import { SERVICES_DATA } from "@/features/services/data/services-content";
import { PRICING_PACKAGES } from "@/features/pricing/data/packages";
import { SERVICE_ADDONS } from "@/features/pricing/data/addons";
import { validateCurrentStep } from "../lib/booking-validation";

const STORAGE_KEY = "yswb_booking_draft_v2";

const DEFAULT_CUSTOMER: CustomerDetails = {
  fullName: "",
  email: "",
  phone: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: new Date().getFullYear().toString(),
  vehicleCategory: "sedan",
  vehicleReg: "",
  specialInstructions: "",
  preferredContact: "phone",
  serviceLocation: "home",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postcode: "",
  damageDescription: "",
  photoNotes: "",
};

const INITIAL_STATE: BookingState = {
  step: 1,
  serviceId: "alloy-wheel-refurbishment",
  packageId: null,
  selectedAddonIds: [],
  appointmentDate: null,
  timeSlot: null,
  customer: DEFAULT_CUSTOMER,
  couponCode: "",
  termsAccepted: false,
  isConfirmed: false,
};

export function useBooking() {
  const searchParams = useSearchParams();
  const [state, setState] = React.useState<BookingState>(INITIAL_STATE);
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  // 1. Restore from sessionStorage or hydrate from URL query params on mount
  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.step) {
          setState((prev) => ({
            ...prev,
            ...parsed,
            customer: {
              ...DEFAULT_CUSTOMER,
              ...(parsed.customer || {}),
            },
            isConfirmed: false, // Always reset confirmation status on fresh mount
          }));
          setIsHydrated(true);
          return;
        }
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }

    // Parse URL query parameters if no saved draft
    const paramService = searchParams.get("service");
    const paramPackage = searchParams.get("package");
    const paramVehicle = searchParams.get("vehicle") as VehicleCategory | null;
    const paramAddons = searchParams.get("addons");
    const paramCoupon = searchParams.get("coupon");

    setState((prev) => {
      const next = { ...prev };

      // Validate service query parameter against SERVICES_DATA
      if (paramService && SERVICES_DATA[paramService]) {
        next.serviceId = paramService;
        next.packageId = null;
      }

      // Validate package query parameter against PRICING_PACKAGES
      if (paramPackage && PRICING_PACKAGES.some((p) => p.id === paramPackage)) {
        next.packageId = paramPackage;
        next.serviceId = null;
      }

      // Validate vehicle
      if (paramVehicle && ["small", "sedan", "suv", "large"].includes(paramVehicle)) {
        next.customer = {
          ...next.customer,
          vehicleCategory: paramVehicle,
        };
      }

      // Validate addons
      if (paramAddons) {
        const addonList = paramAddons.split(",").filter((id) =>
          SERVICE_ADDONS.some((a) => a.id === id)
        );
        if (addonList.length > 0) {
          next.selectedAddonIds = addonList;
        }
      }

      // Validate coupon
      if (paramCoupon) {
        next.couponCode = paramCoupon.trim().toUpperCase();
      }

      return next;
    });

    setIsHydrated(true);
  }, [searchParams]);

  // 2. Persist state to sessionStorage whenever it changes (after initial hydration)
  React.useEffect(() => {
    if (!isHydrated || state.isConfirmed) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage quota or private mode fallback
    }
  }, [state, isHydrated]);

  // Actions
  const setStep = (step: BookingStep) => {
    setValidationErrors({});
    setState((prev) => ({ ...prev, step }));
  };

  const nextStep = (): boolean => {
    const valResult = validateCurrentStep(state);
    if (!valResult.isValid) {
      setValidationErrors(valResult.errors);
      return false;
    }

    setValidationErrors({});
    if (state.step < 5) {
      setState((prev) => ({ ...prev, step: (prev.step + 1) as BookingStep }));
      return true;
    }
    return true;
  };

  const prevStep = () => {
    setValidationErrors({});
    if (state.step > 1) {
      setState((prev) => ({ ...prev, step: (prev.step - 1) as BookingStep }));
    }
  };

  const selectService = (serviceId: string) => {
    setState((prev) => ({
      ...prev,
      serviceId,
      packageId: null, // clear package if selecting a core service
    }));
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy.service;
      return copy;
    });
  };

  const selectPackage = (packageId: string) => {
    setState((prev) => ({
      ...prev,
      packageId,
      serviceId: null, // clear service if selecting a tier package
    }));
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy.service;
      return copy;
    });
  };

  const toggleAddon = (addonId: string) => {
    setState((prev) => {
      const exists = prev.selectedAddonIds.includes(addonId);
      return {
        ...prev,
        selectedAddonIds: exists
          ? prev.selectedAddonIds.filter((id) => id !== addonId)
          : [...prev.selectedAddonIds, addonId],
      };
    });
  };

  const selectDate = (dateStr: string) => {
    setState((prev) => ({
      ...prev,
      appointmentDate: dateStr,
      timeSlot: null, // reset slot if date changes
    }));
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy.date;
      return copy;
    });
  };

  const selectTimeSlot = (timeSlotId: string) => {
    setState((prev) => ({
      ...prev,
      timeSlot: timeSlotId,
    }));
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy.time;
      return copy;
    });
  };

  const updateCustomerField = <K extends keyof CustomerDetails>(
    field: K,
    value: CustomerDetails[K]
  ) => {
    setState((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
    setValidationErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const setTermsAccepted = (accepted: boolean) => {
    setState((prev) => ({ ...prev, termsAccepted: accepted }));
    if (accepted) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy.terms;
        return copy;
      });
    }
  };

  const applyCouponCode = (code: string) => {
    setState((prev) => ({ ...prev, couponCode: code.trim().toUpperCase() }));
  };

  const removeCouponCode = () => {
    setState((prev) => ({ ...prev, couponCode: "" }));
  };

  const confirmBooking = () => {
    const valResult = validateCurrentStep(state);
    if (!valResult.isValid) {
      setValidationErrors(valResult.errors);
      return false;
    }

    // Generate pseudo booking reference (e.g. YSWB-7492)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `YSWB-${randomNum}`;

    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }

    setState((prev) => ({
      ...prev,
      isConfirmed: true,
      confirmationReference: reference,
    }));
    return true;
  };

  const resetBooking = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setState(INITIAL_STATE);
    setValidationErrors({});
  };

  return {
    state,
    isHydrated,
    validationErrors,
    setStep,
    nextStep,
    prevStep,
    selectService,
    selectPackage,
    toggleAddon,
    selectDate,
    selectTimeSlot,
    updateCustomerField,
    setTermsAccepted,
    applyCouponCode,
    removeCouponCode,
    confirmBooking,
    resetBooking,
  };
}
