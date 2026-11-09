import { z } from "zod";
import { BookingState, StepValidationResult } from "../types/booking";
import { isDateSelectable } from "./date-utils";

export const customerDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address (e.g. name@example.com)"),
  phone: z
    .string()
    .trim()
    .min(9, "Phone number must be at least 9 digits")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+\s()-]+$/, "Phone number contains invalid characters"),
  vehicleMake: z
    .string()
    .trim()
    .min(2, "Please enter vehicle make (e.g. BMW, Porsche)"),
  vehicleModel: z
    .string()
    .trim()
    .min(1, "Please enter vehicle model (e.g. 3 Series, 911)"),
  vehicleYear: z
    .string()
    .trim()
    .regex(/^(19|20)\d{2}$/, "Please enter a valid 4-digit year (e.g. 2023)"),
  vehicleCategory: z.enum(["small", "sedan", "suv", "large"], {
    errorMap: () => ({ message: "Please select a vehicle category" }),
  }),
  vehicleReg: z.string().trim().optional(),
  specialInstructions: z.string().trim().max(500, "Maximum 500 characters").optional(),
  preferredContact: z.enum(["phone", "email", "whatsapp"]),
  serviceLocation: z.enum(["home", "workplace", "other", "workshop"], {
    errorMap: () => ({ message: "Please select your preferred service location" }),
  }),
  addressLine1: z.string().trim().optional().default(""),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().optional().default(""),
  postcode: z.string().trim().optional().default(""),
  damageDescription: z
    .string()
    .trim()
    .max(800, "Maximum 800 characters")
    .optional(),
  photoNotes: z.string().trim().max(300, "Maximum 300 characters").optional(),
}).superRefine((data, ctx) => {
  if (data.serviceLocation === "workshop") return;

  if (!data.addressLine1 || data.addressLine1.trim().length < 3) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter the full address for the appointment",
      path: ["addressLine1"],
    });
  }
  if (!data.city || data.city.trim().length < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter the town or city",
      path: ["city"],
    });
  }
  if (!data.postcode || data.postcode.trim().length < 5) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter a valid UK postcode",
      path: ["postcode"],
    });
  } else if (data.postcode.trim().length > 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Postcode is too long",
      path: ["postcode"],
    });
  }
});

export function validateStep1(state: BookingState): StepValidationResult {
  const errors: Record<string, string> = {};
  if (!state.serviceId && !state.packageId) {
    errors.service = "Please select a detailing service or package to continue.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep2(state: BookingState): StepValidationResult {
  const errors: Record<string, string> = {};
  if (!state.appointmentDate) {
    errors.date = "Please select an appointment date from the calendar.";
  } else if (!isDateSelectable(state.appointmentDate)) {
    errors.date = "Selected date is not available. Please choose another date.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep3(state: BookingState): StepValidationResult {
  const errors: Record<string, string> = {};
  if (!state.timeSlot) {
    errors.time = "Please choose a time slot for your appointment.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep4(state: BookingState): StepValidationResult {
  const errors: Record<string, string> = {};
  const result = customerDetailsSchema.safeParse(state.customer);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString() || "form";
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateStep5(state: BookingState): StepValidationResult {
  const errors: Record<string, string> = {};
  if (!state.termsAccepted) {
    errors.terms = "You must agree to the demo booking terms and cancellation policy.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCurrentStep(state: BookingState): StepValidationResult {
  switch (state.step) {
    case 1:
      return validateStep1(state);
    case 2:
      return validateStep2(state);
    case 3:
      return validateStep3(state);
    case 4:
      return validateStep4(state);
    case 5:
      return validateStep5(state);
    default:
      return { isValid: true, errors: {} };
  }
}
