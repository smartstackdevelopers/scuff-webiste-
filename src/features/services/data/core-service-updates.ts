import type { ServiceAvailability } from "../types";

/** Availability defaults for existing catalogue services (configurable). */
export const EXISTING_SERVICE_AVAILABILITY: Record<
  string,
  { availability: ServiceAvailability; availabilityNote: string }
> = {
  "interior-detailing": {
    availability: "mobile_suitable",
    availabilityNote:
      "Many interior refreshes can be completed on-site where access and conditions allow. Complex jobs may need workshop assessment.",
  },
  "exterior-detailing": {
    availability: "mobile_suitable",
    availabilityNote:
      "Suitable exterior detailing can often be carried out at home or workplace with the correct access and water/power conditions.",
  },
  "paint-correction": {
    availability: "assessment",
    availabilityNote:
      "Paint correction quality depends on lighting, power and controlled conditions. We assess whether mobile or workshop is appropriate.",
  },
  "ceramic-coating": {
    availability: "workshop",
    availabilityNote:
      "Ceramic coating typically requires controlled preparation and curing conditions. Workshop appointment or assessment required.",
  },
  "full-vehicle-detailing": {
    availability: "assessment",
    availabilityNote:
      "Full detailing scope varies by vehicle condition. We confirm whether the job is suitable for mobile completion or needs a workshop bay.",
  },
  "maintenance-detailing": {
    availability: "mobile_suitable",
    availabilityNote:
      "Routine maintenance detailing is often ideal for home or workplace appointments when access is available.",
  },
};
