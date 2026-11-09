export type BookingStep = 1 | 2 | 3 | 4 | 5;

export type VehicleCategory = "small" | "sedan" | "suv" | "large";

export type PreferredContactMethod = "phone" | "email" | "whatsapp";

export type ServiceLocation =
  | "home"
  | "workplace"
  | "other"
  | "workshop";

export interface TimeSlot {
  id: string;
  time: string;
  period: "morning" | "afternoon";
  available: boolean;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleCategory: VehicleCategory;
  vehicleReg?: string;
  specialInstructions?: string;
  preferredContact: PreferredContactMethod;
  /** Preferred attendance location for the appointment */
  serviceLocation: ServiceLocation;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  damageDescription?: string;
  /** Optional note that customer can share damage photos after request */
  photoNotes?: string;
}

export interface BookingState {
  step: BookingStep;
  serviceId: string | null;
  packageId: string | null;
  selectedAddonIds: string[];
  appointmentDate: string | null; // ISO YYYY-MM-DD
  timeSlot: string | null;
  customer: CustomerDetails;
  couponCode?: string;
  termsAccepted: boolean;
  isConfirmed: boolean;
  confirmationReference?: string;
}

export interface BookingPriceSummary {
  selectedServiceName: string;
  selectedPackageName?: string;
  basePrice: number;
  vehicleMultiplier: number;
  vehicleAdjustedPrice: number;
  addons: { id: string; title: string; price: number }[];
  addonsTotal: number;
  subtotal: number;
  discountAmount: number;
  estimatedTotal: number;
  estimatedDuration: string;
  priceOnAssessment?: boolean;
}

export interface StepValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
