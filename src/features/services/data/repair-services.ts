import type { DetailedService } from "../types";
import { BRAND_ASSETS } from "@/constants/theme";

/**
 * Core repair & mobile offerings for You Scuff We Buff.
 * Prices: quote-on-assessment where fixed pricing is not verified.
 */
export const REPAIR_SERVICES: Record<string, DetailedService> = {
  "alloy-wheel-refurbishment": {
    id: "svc-alloy-refurb",
    slug: "alloy-wheel-refurbishment",
    title: "Alloy Wheel Refurbishment",
    tagline: "Kerb damage, scuffs and colour restoration for alloy wheels.",
    badge: "Wheel Repair",
    category: "Wheel Repair",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "Assessed per wheel",
    description:
      "Professional alloy wheel cosmetic repairs including kerb damage, scratches, scuffs, surface restoration and colour matching — with mobile visits available for suitable jobs.",
    longDescription:
      "Alloy wheels take daily punishment from UK kerbs, grit and road debris. Our alloy wheel refurbishment service restores the cosmetic finish of damaged wheels through careful preparation, repair of scuffs and kerb rashes, and colour or diamond-cut style finishing where appropriate. Suitable jobs can be completed by our mobile team at your home or workplace. More complex refurbishment may require workshop assessment or specialist equipment. We will always confirm suitability before confirming your appointment.",
    heroImage: {
      url: BRAND_ASSETS.wheels,
      alt: "Diamond-cut alloy wheels after professional refurbishment",
    },
    popular: true,
    recommendedFor:
      "Drivers with kerbed, scratched or faded alloys who want a cosmetic restoration without unnecessary full replacements.",
    relatedSlugs: ["smart-repairs", "mobile-repairs", "exterior-detailing"],
    availability: "mobile_suitable",
    availabilityNote:
      "Many cosmetic alloy repairs can be completed by our mobile van at home or work. Complex diamond-cut or structural concerns require assessment.",
    problemsAddressed: [
      "Kerb rash and edge scuffs",
      "Scratched alloy faces",
      "Cosmetic surface wear",
      "Faded or mismatched wheel colour",
      "Minor wheel face restoration",
    ],
    keyBenefits: [
      {
        title: "Kerb Damage Repair",
        description:
          "Careful repair of common kerb rashes and edge damage for a cleaner cosmetic finish.",
      },
      {
        title: "Scuff & Scratch Restoration",
        description:
          "Localised repair of scratched and scuffed alloy surfaces where the damage is suitable for cosmetic repair.",
      },
      {
        title: "Colour & Finish Matching",
        description:
          "Wheel colour restoration and finish blending to improve appearance and consistency across the set.",
      },
      {
        title: "Mobile Where Suitable",
        description:
          "Our mobile team can attend home or workplace appointments for suitable alloy cosmetic repairs.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Inspection & Assessment",
        items: [
          "Visual inspection of each wheel",
          "Confirmation of mobile suitability or workshop requirement",
          "Clear explanation of recommended repair approach",
        ],
      },
      {
        phase: "2. Preparation & Repair",
        items: [
          "Surface preparation of damaged areas",
          "Cosmetic repair of scuffs, scratches and kerb damage where suitable",
          "Colour / finish restoration as agreed",
        ],
      },
      {
        phase: "3. Finish & Handover",
        items: [
          "Final detailing of repaired surfaces",
          "Review of completed work with you",
          "Advice on care and future protection",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: BRAND_ASSETS.wheels,
      afterUrl: BRAND_ASSETS.wheels,
      beforeLabel: "Worn / scuffed alloy",
      afterLabel: "Restored alloy finish",
      caseNote:
        "Representative alloy refurbishment outcome. Actual results depend on damage severity and finish type.",
    },
    faqs: [
      {
        question: "Can you repair kerb-damaged alloys at my home?",
        answer:
          "Often yes, for suitable cosmetic kerb damage. We confirm mobile suitability when you book. Some finishes or deeper damage may need workshop assessment.",
      },
      {
        question: "Do you repair scratched and scuffed wheels?",
        answer:
          "Yes — scratched and scuffed alloy cosmetic repairs are a core part of our wheel refurbishment service when the damage is suitable.",
      },
      {
        question: "Is every wheel finish suitable for mobile repair?",
        answer:
          "No. Availability depends on the wheel finish, damage type and site conditions. We never promise mobile completion until the job is assessed as suitable.",
      },
    ],
  },

  "smart-repairs": {
    id: "svc-smart-repairs",
    slug: "smart-repairs",
    title: "Smart Repairs",
    tagline: "Localised cosmetic repairs for scuffs, scratches and minor paint damage.",
    badge: "Smart Repair",
    category: "Smart Repair",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "Assessed per area",
    description:
      "Smart Repairs focus on suitable minor cosmetic damage — bumper scuffs, light scratches, localised paint marks and small surface imperfections — without treating major accident or structural damage.",
    longDescription:
      "Smart Repair is designed for targeted cosmetic improvements. If your bumper has been scuffed in a car park, a panel has a minor scratch, or paint has localised cosmetic marks, our team can assess and repair suitable damage. Many Smart Repairs can be carried out by our mobile van at your home or workplace. Smart Repair is not a substitute for major bodywork, structural repair or insurance-level accident restoration. If damage is beyond suitable Smart Repair scope, we will advise you honestly.",
    heroImage: {
      url: BRAND_ASSETS.cardVan,
      alt: "You Scuff We Buff mobile smart repair branding",
    },
    popular: true,
    recommendedFor:
      "Minor cosmetic scuffs, bumper marks, light scratches and localised paint imperfections on otherwise sound panels.",
    relatedSlugs: ["alloy-wheel-refurbishment", "mobile-repairs", "paint-correction"],
    availability: "mobile_suitable",
    availabilityNote:
      "Suitable minor cosmetic Smart Repairs can often be completed on-site. Larger or complex damage may require workshop assessment.",
    problemsAddressed: [
      "Minor scratch repairs",
      "Scuff repairs",
      "Bumper scuff repairs",
      "Minor paint damage",
      "Small cosmetic bodywork marks",
      "Localised paint repairs",
      "Minor surface damage restoration",
    ],
    keyBenefits: [
      {
        title: "Localised Cosmetic Focus",
        description:
          "We target the damaged area rather than unnecessary full-panel work where Smart Repair is suitable.",
      },
      {
        title: "Bumper & Panel Scuffs",
        description:
          "Ideal for common car-park scuffs and light cosmetic marks on bumpers and accessible panels.",
      },
      {
        title: "Honest Scope Control",
        description:
          "We clearly distinguish suitable Smart Repairs from major accident or structural bodywork.",
      },
      {
        title: "Mobile Convenience",
        description:
          "Where suitable, repairs can be arranged at your home, office or workplace via our mobile team.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Damage Review",
        items: [
          "Inspection of the affected area",
          "Confirmation that Smart Repair is appropriate",
          "Advice if workshop assessment is needed instead",
        ],
      },
      {
        phase: "2. Localised Repair",
        items: [
          "Preparation of the repair area",
          "Cosmetic repair of suitable scuffs, scratches or minor paint damage",
          "Blending and finishing for a neat visual result",
        ],
      },
      {
        phase: "3. Final Check",
        items: [
          "Quality review of the repaired area",
          "Clean-up of the work zone",
          "Care guidance after repair",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: BRAND_ASSETS.cardVan,
      afterUrl: BRAND_ASSETS.van,
      beforeLabel: "Cosmetic scuff / scratch",
      afterLabel: "Smart Repair finish",
      caseNote:
        "Smart Repair outcomes vary by paint type, colour and damage depth. Suitability is confirmed before work begins.",
    },
    faqs: [
      {
        question: "Is Smart Repair the same as full body shop repair?",
        answer:
          "No. Smart Repair is for suitable minor cosmetic damage. Major accident damage, structural issues or large-panel work fall outside this service.",
      },
      {
        question: "Can Smart Repairs be done at my workplace?",
        answer:
          "Yes, when the job is suitable and site access allows. Select a workplace appointment in booking and we will confirm suitability.",
      },
      {
        question: "Do I need to send photos?",
        answer:
          "Photos help us assess suitability before attending. You can describe damage in booking and optionally note that photos are available to share.",
      },
    ],
  },

  "mobile-repairs": {
    id: "svc-mobile-repairs",
    slug: "mobile-repairs",
    title: "Mobile Repair Services",
    tagline: "Professional repairs at your home, office or workplace.",
    badge: "We Come To You",
    category: "Mobile",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "Booked appointment",
    description:
      "Our branded mobile repair van can travel to your home, office or workplace for suitable automotive repairs — so you don’t always need to visit a garage.",
    longDescription:
      "You Scuff We Buff operates a mobile service model for suitable jobs. Book online, choose your preferred location, and our team can attend your driveway, workplace car park or another agreed suitable location. Mobile appointments are ideal for many alloy cosmetic repairs and Smart Repairs. Not every repair can be completed everywhere — some work needs specialist equipment or workshop conditions. Your booking request is subject to availability and location suitability, and we will confirm the appointment once reviewed.",
    heroImage: {
      url: BRAND_ASSETS.van,
      alt: "You Scuff We Buff branded mobile repair van",
    },
    popular: true,
    recommendedFor:
      "Customers who want convenient on-site repairs for suitable wheel or cosmetic Smart Repair work.",
    relatedSlugs: ["alloy-wheel-refurbishment", "smart-repairs", "maintenance-detailing"],
    availability: "mobile",
    availabilityNote:
      "Mobile attendance is available for suitable jobs. Workshop or assessment may still be required depending on the repair.",
    problemsAddressed: [
      "Need a home repair appointment",
      "Need a workplace / office appointment",
      "Prefer not to visit a garage for suitable jobs",
      "Mobile alloy wheel cosmetic repairs",
      "Suitable on-site Smart Repairs",
    ],
    keyBenefits: [
      {
        title: "Home Appointments",
        description:
          "Book a suitable repair and have our mobile team visit your home driveway where conditions allow.",
      },
      {
        title: "Workplace Appointments",
        description:
          "Arrange suitable cosmetic repairs while your car is parked at work, subject to site access.",
      },
      {
        title: "Online Booking",
        description:
          "Select service, preferred date, time and location through our website booking flow.",
      },
      {
        title: "Clear Suitability Checks",
        description:
          "We explain whether your job is mobile-suitable or needs workshop assessment before confirming.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Book Online",
        items: [
          "Choose your service and preferred appointment window",
          "Select home, workplace or other suitable location",
          "Share vehicle and damage details",
        ],
      },
      {
        phase: "2. Availability Review",
        items: [
          "We review suitability for mobile attendance",
          "We confirm appointment subject to availability",
          "We advise if workshop assessment is required instead",
        ],
      },
      {
        phase: "3. On-Site Visit",
        items: [
          "Mobile team attends the agreed location",
          "Suitable repairs are completed on-site",
          "You review the finished work before we leave",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: BRAND_ASSETS.van,
      afterUrl: BRAND_ASSETS.cardVan,
      beforeLabel: "Mobile van arrival",
      afterLabel: "On-site repair complete",
      caseNote:
        "Mobile completion depends on job type, weather, access and safety conditions at the location.",
    },
    faqs: [
      {
        question: "Do you come to my home or office?",
        answer:
          "Yes — for suitable repairs we can attend home, office/workplace or another agreed suitable location.",
      },
      {
        question: "Can every repair be done by the mobile van?",
        answer:
          "No. Some repairs need specialist equipment or workshop conditions. We confirm suitability before the appointment is finalised.",
      },
      {
        question: "Is my online booking automatically confirmed?",
        answer:
          "Your request is received through the website and is subject to service availability and location suitability. We confirm once reviewed.",
      },
    ],
  },
};
