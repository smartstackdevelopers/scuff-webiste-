import type { DetailedService } from "../types";
import { BRAND_ASSETS } from "@/constants/theme";

/**
 * Core repair & mobile offerings for You Scuff We Buff.
 * Focuses on:
 * 1. Alloy Wheel Refurbishment
 * 2. Diamond Cutting Repair
 * 3. Dent & Scratch SMART Repair
 * 4. Bumper Damage Repair
 * 5. Paint Scuff Repair
 * 6. Mobile Alloy Wheel Repair
 */
export const REPAIR_SERVICES: Record<string, DetailedService> = {
  "alloy-wheel-refurbishment": {
    id: "svc-alloy-refurb",
    slug: "alloy-wheel-refurbishment",
    title: "Alloy Wheel Refurbishment",
    tagline: "Scuffed, scratched and kerb-damaged alloy wheel restoration across the West Midlands.",
    badge: "Most Popular",
    category: "Wheel Repair",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "Assessed per wheel",
    description:
      "Our expert mobile technicians repair scuffed, scratched and kerb-damaged alloy wheels, restoring their appearance with quality materials and professional repair techniques at your home or workplace.",
    longDescription:
      "Our expert mobile technicians repair scuffed, scratched and kerb-damaged alloy wheels, restoring their appearance with quality materials and professional repair techniques. We aim to bring your wheels back to their best while providing a convenient service at your home or workplace across Birmingham and the West Midlands. Whether you are dealing with minor parking scrapes or severe kerb damage, our team delivers high-quality finishes without the hassle of leaving your car at a traditional garage.",
    heroImage: {
      url: BRAND_ASSETS.wheels,
      alt: "Restored alloy wheels by You Scuff We Buff",
    },
    popular: true,
    recommendedFor:
      "Drivers with scuffed, scratched, faded or kerb-damaged alloy wheels seeking convenient mobile restoration.",
    relatedSlugs: ["diamond-cutting", "smart-repairs", "mobile-repairs"],
    availability: "mobile_suitable",
    availabilityNote:
      "Convenient mobile repairs completed at your home or workplace across Birmingham and the West Midlands.",
    problemsAddressed: [
      "Kerb damage and rim scrapes",
      "Scratched and scuffed wheel faces",
      "Flaking lacquer and cosmetic corrosion",
      "Uneven or mismatched wheel colours",
      "End-of-lease wheel reconditioning",
    ],
    keyBenefits: [
      {
        title: "Mobile Convenience",
        description:
          "We come to your home or workplace, saving you the time and inconvenience of dropping your car off.",
      },
      {
        title: "Quality Materials & Techniques",
        description:
          "We use professional automotive paints, primers, and durable lacquers for an excellent long-lasting finish.",
      },
      {
        title: "Kerb & Scuff Specialists",
        description:
          "Dedicated focus on restoring kerbed and scratched wheels back to their best appearance.",
      },
      {
        title: "Friendly Family-Run Service",
        description:
          "Reliable, honest advice from technicians who care about delivering top-tier customer satisfaction.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Wheel Inspection & Assessment",
        items: [
          "Careful visual assessment of the damage on each wheel",
          "Verification of repair suitability and finish type",
          "Clear explanation of the repair process",
        ],
      },
      {
        phase: "2. Surface Preparation & Repair",
        items: [
          "Thorough wheel face cleaning and sanding out kerb rash",
          "Precision surface filling and priming of damaged areas",
          "Colour matching and professional lacquer application",
        ],
      },
      {
        phase: "3. Inspection & Handover",
        items: [
          "Review of completed wheel finish with customer",
          "Drying and curing check",
          "Maintenance guidance for lasting protection",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: BRAND_ASSETS.wheels,
      afterUrl: BRAND_ASSETS.wheels,
      beforeLabel: "Kerbed / Scuffed Alloy",
      afterLabel: "Restored Alloy Finish",
      caseNote: "Kerb damage repaired on-site at customer's driveway in Solihull.",
    },
    faqs: [
      {
        question: "Can alloy wheel refurbishment be done at my home?",
        answer:
          "Yes! Our mobile van is equipped to carry out suitable alloy wheel repairs at your home driveway or workplace across Birmingham and the West Midlands.",
      },
      {
        question: "How long does a mobile wheel repair take?",
        answer:
          "Most cosmetic alloy repairs take between 1.5 to 2.5 hours per wheel depending on the severity of the scuffs.",
      },
      {
        question: "How do I get a free quote?",
        answer:
          "Simply send us photos of your damaged wheels via our online quote form or WhatsApp on 07448 661 691 for a quick, no-obligation quote.",
      },
    ],
  },

  "diamond-cutting": {
    id: "svc-diamond-cutting",
    slug: "diamond-cutting",
    title: "Diamond Cutting Repair",
    tagline: "Specialist diamond cut alloy wheel repair and precision refinishing.",
    badge: "Specialist",
    category: "Wheel Repair",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "Assessed per wheel",
    description:
      "Diamond cut alloy wheels require specialist repair techniques. Our trained technicians repair suitable damaged diamond cut wheels, restoring their appearance through professional refinishing methods.",
    longDescription:
      "Diamond cut alloy wheels feature a machined metallic face with contrasting painted inserts, requiring specialist care when damaged. Our trained technicians assess every wheel to determine the most suitable repair approach. From localised edge repair to complete face refinishing, we help restore the distinctive two-tone appearance of diamond cut alloys across Birmingham and the West Midlands.",
    heroImage: {
      url: BRAND_ASSETS.wheels,
      alt: "Diamond cut alloy wheel restoration by You Scuff We Buff",
    },
    popular: true,
    recommendedFor:
      "Owners of vehicles with two-tone diamond cut wheels suffering from kerb rash, milky lacquer or edge scuffs.",
    relatedSlugs: ["alloy-wheel-refurbishment", "smart-repairs", "mobile-repairs"],
    availability: "mobile_suitable",
    availabilityNote:
      "Wheel assessment required to determine on-site suitability or specialist refinishing requirement.",
    problemsAddressed: [
      "Kerb rash on diamond cut rims",
      "Corrosion creep under clear lacquer",
      "Scuffed metallic polished wheel faces",
      "Cloudy or peeling diamond cut lacquer",
    ],
    keyBenefits: [
      {
        title: "Specialist Knowledge",
        description:
          "Trained in the specific characteristics and repair limits of diamond turned alloy wheels.",
      },
      {
        title: "Honest Wheel Assessment",
        description:
          "We inspect your wheel to confirm whether cosmetic SMART blending or lathe re-cutting is recommended.",
      },
      {
        title: "Corrosion Protection",
        description:
          "High-grade clear coats seal the bare aluminum face against road salt and moisture ingress.",
      },
      {
        title: "Convenient West Midlands Coverage",
        description:
          "Mobile visits across Birmingham, Solihull, Coventry, Wolverhampton and surrounding areas.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Diagnostic Wheel Assessment",
        items: [
          "Evaluation of clearcoat condition and aluminum face integrity",
          "Verification of previous cuts and metal depth safety",
          "Recommendation of best repair pathway",
        ],
      },
      {
        phase: "2. Precision Refinishing",
        items: [
          "Smooth feathering of damaged kerb edges",
          "Re-application of OEM contrasting base colours where required",
          "Ultra-durable UV protective clear lacquer application",
        ],
      },
      {
        phase: "3. Final Inspection",
        items: [
          "Optical check of diamond cut contrast lines",
          "Curing verification",
          "Customer walkaround and care tips",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: BRAND_ASSETS.wheels,
      afterUrl: BRAND_ASSETS.wheels,
      beforeLabel: "Damaged Diamond Cut Rim",
      afterLabel: "Refinished Diamond Cut Wheel",
      caseNote: "Diamond cut edge scuffs repaired for a customer in Birmingham.",
    },
    faqs: [
      {
        question: "How do I know if my wheels are diamond cut?",
        answer:
          "Diamond cut wheels typically have a shiny, bare metal face that looks like the surface of a CD, combined with painted inner spokes or backgrounds.",
      },
      {
        question: "Can all diamond cut wheels be repaired mobile?",
        answer:
          "Many cosmetic edge scuffs and rim repairs can be completed on-site. Deeper damage requiring lathe re-cutting is assessed honestly by our team.",
      },
    ],
  },

  "smart-repairs": {
    id: "svc-smart-repairs",
    slug: "smart-repairs",
    title: "Dent & Scratch SMART Repair",
    tagline: "Convenient mobile repairs for minor scratches, dents and bumper scuffs.",
    badge: "Cost-Effective",
    category: "Smart Repair",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "Assessed per area",
    description:
      "Scratches, dents and bumper scuffs can affect the appearance of your vehicle. Our SMART repair service helps repair suitable minor bodywork damage with a convenient mobile service at your home or workplace.",
    longDescription:
      "Small to Medium Area Repair Technology (SMART) allows our skilled technicians to repair localized minor cosmetic damage without painting entire panels. Whether the damage comes from a supermarket shopping trolley, a minor scrape against a wall, or an everyday car park accident, contact our team to discuss your repair. We bring our mobile repair service directly to your location across Birmingham and the West Midlands.",
    heroImage: {
      url: BRAND_ASSETS.cardVan,
      alt: "Mobile SMART repair service van You Scuff We Buff",
    },
    popular: true,
    recommendedFor:
      "Vehicles with localized bumper scrapes, minor panel scratches, and shopping trolley dings.",
    relatedSlugs: ["car-painting", "alloy-wheel-refurbishment", "mobile-repairs"],
    availability: "mobile_suitable",
    availabilityNote:
      "Suitable minor cosmetic SMART repairs completed at your home or workplace across the West Midlands.",
    problemsAddressed: [
      "Shopping trolley scrapes and dings",
      "Car park door edge scratches",
      "Bumper corner scuffs and scrapes",
      "Minor surface scratches on clearcoat",
      "Stone chip clusters on forward panels",
    ],
    keyBenefits: [
      {
        title: "Localized Repair Focus",
        description:
          "We repair only the damaged area, preserving the majority of your car's original factory paintwork.",
      },
      {
        title: "Fast Turnaround",
        description:
          "Most SMART repairs are completed in 2 to 3 hours, so you aren't left without your car for days.",
      },
      {
        title: "Cost-Effective Solution",
        description:
          "Significantly more affordable than traditional bodyshop panel replacement or full resprays.",
      },
      {
        title: "Mobile at Home or Work",
        description:
          "We travel to you across Birmingham, Solihull, Dudley, Walsall, and the wider West Midlands.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Damage Assessment",
        items: [
          "Inspection of paint depth and dent severity",
          "Confirmation that damage is suitable for mobile SMART repair",
          "Digital color code identification from your vehicle",
        ],
      },
      {
        phase: "2. Precision Localized Repair",
        items: [
          "Sanding and feathering of the damaged area",
          "Specialist primer application and infrared heat drying",
          "Computerized paint matching and clearcoat blending",
        ],
      },
      {
        phase: "3. Polish & Sign-Off",
        items: [
          "Machine compounding of the blend line for a seamless finish",
          "Customer inspection and satisfaction check",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: BRAND_ASSETS.cardVan,
      afterUrl: BRAND_ASSETS.van,
      beforeLabel: "Bumper corner scuff",
      afterLabel: "Flawless SMART repair",
      caseNote: "Car park bumper scuff repaired at customer's workplace in Wolverhampton.",
    },
    faqs: [
      {
        question: "What is SMART repair?",
        answer:
          "SMART stands for Small to Medium Area Repair Technology. It allows us to repair small scuffs, scratches, and dings locally without repainting the entire vehicle panel.",
      },
      {
        question: "Will the color match my car?",
        answer:
          "Yes, we mix paints directly to your manufacturer's specific OEM colour code on-site for a seamless blend.",
      },
    ],
  },

  "car-painting": {
    id: "svc-bumper-scuff",
    slug: "car-painting",
    title: "Bumper Damage & Paint Scuff Repair",
    tagline: "Specialist repair for bumper damage, paint scuffs and cosmetic bodywork marks.",
    badge: "Cosmetic Repair",
    category: "Smart Repair",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "2 – 3 Hours",
    description:
      "We help repair suitable bumper damage, paint scuffs and minor cosmetic bodywork imperfections. Contact us with details or photographs of the damage so we can advise on the available repair options.",
    longDescription:
      "Plastic bumper covers and exterior trims frequently suffer from parking scuffs, scrapes against bollards, and stone chip damage. At You Scuff We Buff, we repair suitable bumper damage and paint scuffs using flexible plastic fillers, adhesion promoters, and manufacturer-matched topcoats. Contact us with details or photographs of the damage so our friendly team can advise on the available repair options across Birmingham and the West Midlands.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
      alt: "Automotive spray painting and bumper repair",
    },
    popular: true,
    recommendedFor:
      "Vehicles with scuffed plastic bumpers, textured trim scrapes, or localized paint marks.",
    relatedSlugs: ["smart-repairs", "alloy-wheel-refurbishment", "mobile-repairs"],
    availability: "mobile_suitable",
    availabilityNote:
      "Mobile repairs arranged at your home or workplace across the West Midlands.",
    problemsAddressed: [
      "Plastic bumper corner scuffs",
      "Kerb and bollard scrape marks",
      "Minor cosmetic split repair on plastic bumpers",
      "Paint flaking from plastic trims",
    ],
    keyBenefits: [
      {
        title: "Exact Colour Formulation",
        description:
          "Mixed to manufacturer paint codes for an unnoticeable seamless blend.",
      },
      {
        title: "Flexible Plastic Repair",
        description:
          "Specialist flexible fillers that withstand bumper vibration without cracking.",
      },
      {
        title: "Home or Workplace Service",
        description:
          "Convenient repair while you carry on with your day.",
      },
      {
        title: "Lease Return Ready",
        description:
          "Avoid expensive dealership penalties at vehicle handover.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Damage Review",
        items: [
          "Assessment of bumper substrate and paint depth",
          "Selection of suitable plastic repair compound",
          "Precise OEM colour formulation",
        ],
      },
      {
        phase: "2. Repair & Refinish",
        items: [
          "Surface leveling, priming, and basecoat spraying",
          "High-solid clearcoat application",
          "Shortwave infrared curing for fast hardening",
        ],
      },
      {
        phase: "3. Machine Polish & Handover",
        items: [
          "Machine refinement of the blend zone",
          "Final customer inspection",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
      afterUrl: BRAND_ASSETS.van,
      beforeLabel: "Bumper scuff",
      afterLabel: "Restored bumper",
      caseNote: "Bumper corner scuff repaired mobile in Dudley.",
    },
    faqs: [
      {
        question: "Can you fix a cracked plastic bumper?",
        answer:
          "Minor hairline cracks on plastic bumpers can often be plastic-welded or reinforced. Send us a photo on WhatsApp (07448 661 691) so we can confirm suitability.",
      },
    ],
  },

  "mobile-repairs": {
    id: "svc-mobile-repairs",
    slug: "mobile-repairs",
    title: "Mobile Alloy Wheel Repair",
    tagline: "We Come to You, At Home or Work Across the West Midlands.",
    badge: "We Come To You",
    category: "Mobile",
    startingPrice: 0,
    currency: "£",
    priceOnAssessment: true,
    duration: "Booked appointment",
    description:
      "Looking for reliable alloy wheel refurbishment near you? Our mobile team brings professional alloy wheel repair services directly to your home or workplace across Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry and surrounding areas.",
    longDescription:
      "Looking for reliable alloy wheel refurbishment near you? Our mobile team brings professional alloy wheel repair services directly to your home or workplace. Covering Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry and surrounding areas, we make getting your wheels repaired convenient and straightforward. Our fully self-contained vans are equipped with professional tools, compressors, and paint systems so we can complete suitable repairs right on your driveway or workplace car park.",
    heroImage: {
      url: BRAND_ASSETS.van,
      alt: "You Scuff We Buff branded mobile repair van",
    },
    popular: true,
    recommendedFor:
      "Busy customers who want high-quality alloy wheel and SMART bodywork repairs without taking time off work.",
    relatedSlugs: ["alloy-wheel-refurbishment", "smart-repairs", "diamond-cutting"],
    availability: "mobile",
    availabilityNote:
      "Covering Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry and the wider West Midlands.",
    problemsAddressed: [
      "No time to visit a garage or bodyshop",
      "Need repairs done while working at the office",
      "Convenient driveway repairs at home",
      "Mobile alloy wheel cosmetic repairs",
      "Quick and easy repair quote process",
    ],
    keyBenefits: [
      {
        title: "Convenient Mobile Service",
        description:
          "No need to take time off work or leave your car at a workshop for days.",
      },
      {
        title: "Home and Workplace Visits",
        description:
          "We attend your private driveway or workplace car park at a time that suits you.",
      },
      {
        title: "Friendly Professional Technicians",
        description:
          "Experienced, courteous technicians who take pride in delivering great results.",
      },
      {
        title: "Local West Midlands Coverage",
        description:
          "Covering Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, and Coventry.",
      },
    ],
    whatsIncluded: [
      {
        phase: "1. Request a Quote",
        items: [
          "Send photos of your wheel or bodywork damage via our form or WhatsApp",
          "Receive a clear, honest quote with no hidden extras",
          "Agree on a convenient appointment date and location",
        ],
      },
      {
        phase: "2. We Arrive at Your Location",
        items: [
          "Our technician arrives in our self-contained mobile repair van",
          "We inspect the damage and confirm the repair plan",
          "Work is carried out safely on-site",
        ],
      },
      {
        phase: "3. Inspection & Handover",
        items: [
          "You inspect the completed repair on your vehicle",
          "Payment is processed easily once you are completely satisfied",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: BRAND_ASSETS.van,
      afterUrl: BRAND_ASSETS.cardVan,
      beforeLabel: "Mobile van arrival",
      afterLabel: "On-site repair complete",
      caseNote:
        "Mobile appointment carried out at a customer's driveway in Birmingham.",
    },
    faqs: [
      {
        question: "Which areas do you cover?",
        answer:
          "We cover Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry, The Black Country, and the wider West Midlands.",
      },
      {
        question: "Do I need to provide power or water?",
        answer:
          "Our mobile repair vans are self-contained. Having access to a standard household power socket is helpful, but we can accommodate most requirements.",
      },
      {
        question: "Can every repair be done mobile?",
        answer:
          "Many cosmetic alloy wheel and SMART repairs can be completed mobile. Service suitability must be confirmed with the customer beforehand.",
      },
    ],
  },
};
