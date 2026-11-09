import { PricingPackage, PackageComparisonCategory, VehicleCategoryOption } from "../types/pricing";

export const DEMO_PRICE_DISCLAIMER =
  "All prices, packages, and durations shown are DEMO placeholders for demonstration purposes only. Final pricing may vary depending on vehicle condition, size, and bespoke specifications.";

export const VEHICLE_CATEGORIES: VehicleCategoryOption[] = [
  {
    id: "small",
    label: "Small / Hatchback",
    sublabel: "e.g. VW Polo, Mini Cooper, Ford Fiesta",
    description: "Compact bodywork requiring standard application time.",
    multiplier: 1.0,
    iconName: "Car",
  },
  {
    id: "sedan",
    label: "Saloon / Coupe",
    sublabel: "e.g. BMW 3 Series, Audi A4, Mercedes C-Class",
    description: "Medium chassis with standard interior & boot volume.",
    multiplier: 1.15,
    iconName: "CarFront",
  },
  {
    id: "suv",
    label: "SUV / Estate",
    sublabel: "e.g. Range Rover Sport, BMW X5, Audi Q7",
    description: "Taller body panels, large glass area & spacious cabin.",
    multiplier: 1.3,
    iconName: "Truck",
  },
  {
    id: "large",
    label: "Large 4x4 / Van",
    sublabel: "e.g. Defender 130, Land Cruiser, Transporter",
    description: "Maximum surface area, extended arches & high roofs.",
    multiplier: 1.45,
    iconName: "Bus",
  },
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "essential-care",
    name: "Essential Care",
    tagline: "Essential routine upkeep & surface sanitisation.",
    description:
      "A thorough entry-level maintenance package designed to safely refresh your vehicle's exterior finish and restore interior cleanliness without risking swirl marks.",
    basePrice: 65,
    currency: "£",
    duration: "1.5 – 2.0 Hours",
    recommended: false,
    badge: "Routine Reset",
    features: [
      "pH-neutral citrus pre-wash & snow foam bath",
      "Two-bucket contact wash with microfibre mitts",
      "Alloy wheel face cleaning & tyre shine dressing",
      "Complete interior vacuum of seats, mats & boot",
      "Dashboard, console & door card dust wipe-down",
      "Streak-free crystal glass clarity inside & out",
    ],
    inclusionsSummary: [
      "Basic exterior wash",
      "Interior vacuum",
      "Dashboard cleaning",
      "Window cleaning",
      "Basic tyre care",
    ],
  },
  {
    id: "premium-detail",
    name: "Premium Detail",
    tagline: "The complete interior & exterior transformation.",
    description:
      "Our most popular all-round signature package. Combines full cabin deep-cleaning and steam extraction with single-stage machine gloss enhancement and polymer protection.",
    basePrice: 165,
    currency: "£",
    duration: "3.5 – 5.0 Hours",
    recommended: true,
    badge: "Most Popular",
    features: [
      "Everything in Essential Care package",
      "Chemical iron fallout & tar spot removal",
      "Clay bar surface clearcoat decontamination",
      "Single-stage machine polish for high gloss",
      "160°C dry steam extraction & cabin sanitisation",
      "Deep leather pore cleansing & lanolin nourishment",
      "6-month hydrophobic polymer synthetic sealant",
      "Deep wheel barrel & caliper cleaning",
    ],
    inclusionsSummary: [
      "Everything in Essential Care",
      "Deep interior cleaning",
      "Exterior detailing",
      "Paint enhancement",
      "Premium finishing",
    ],
  },
  {
    id: "ultimate-protection",
    name: "Ultimate Protection",
    tagline: "Flagship multi-stage correction & 9H ceramic shield.",
    description:
      "The definitive automotive preservation service. Features multi-stage clearcoat defect correction to eliminate 85%+ swirls, topped with permanent 9H nano-ceramic liquid glass.",
    basePrice: 345,
    currency: "£",
    duration: "1 – 2 Days",
    recommended: false,
    badge: "Flagship Preservation",
    features: [
      "Everything in Premium Detail package",
      "Digital paint depth audit on all body panels",
      "Multi-stage machine compounding & jewelling polish",
      "Erases 85%+ of swirl marks, scratches & haze",
      "Certified 9H nano-ceramic coating (3–5 Yrs warranty)",
      "Short-wave infrared lamp panel baking",
      "Hydrophobic rain-repellent windshield coating",
      "Full engine bay bay steam degrease & dress",
    ],
    inclusionsSummary: [
      "Everything in Premium Detail",
      "Advanced paint protection",
      "Premium detailing treatment",
      "Enhanced exterior finish",
      "Additional protection options",
    ],
  },
];

export const PACKAGE_COMPARISON_DATA: PackageComparisonCategory[] = [
  {
    categoryName: "Exterior Cleaning & Decontamination",
    rows: [
      {
        feature: "Two-Bucket Safe Exterior Wash",
        tooltip: "Grit-guarded scratch-free contact wash",
        essentialCare: true,
        premiumDetail: true,
        ultimateProtection: true,
      },
      {
        feature: "Chemical Iron & Tar Decontamination",
        tooltip: "Dissolves embedded industrial fallout and road tar",
        essentialCare: false,
        premiumDetail: true,
        ultimateProtection: true,
      },
      {
        feature: "Clay Bar Mechanical Cleansing",
        tooltip: "Restores smooth glass-like clearcoat feeling",
        essentialCare: false,
        premiumDetail: true,
        ultimateProtection: true,
      },
      {
        feature: "Alloy Wheel & Barrel Treatment",
        tooltip: "Wheel face vs full inner barrel and caliper detailing",
        essentialCare: "Faces Only",
        premiumDetail: "Deep Barrels",
        ultimateProtection: "Ceramic Coated",
      },
    ],
  },
  {
    categoryName: "Interior Cleaning & Restoration",
    rows: [
      {
        feature: "HEPA Filtration Cabin Vacuum",
        tooltip: "High-power extraction across all carpet pile",
        essentialCare: true,
        premiumDetail: true,
        ultimateProtection: true,
      },
      {
        feature: "160°C Dry Vapour Steam Cleansing",
        tooltip: "Neutralises 99.9% of bacteria and odours in ducts",
        essentialCare: false,
        premiumDetail: true,
        ultimateProtection: true,
      },
      {
        feature: "Deep Hot Water Carpet Extraction",
        tooltip: "Shampoos embedded mud, dirt, and stains",
        essentialCare: false,
        premiumDetail: true,
        ultimateProtection: true,
      },
      {
        feature: "Leather Deep Clean & Conditioning",
        tooltip: "Supple matte leather balm replenishment",
        essentialCare: "Dust Wipe",
        premiumDetail: "Deep Balm",
        ultimateProtection: "Ceramic Shield",
      },
    ],
  },
  {
    categoryName: "Paint Correction & Polish",
    rows: [
      {
        feature: "Digital Ultrasonic Depth Mapping",
        tooltip: "Measures clearcoat micron thickness before machine work",
        essentialCare: false,
        premiumDetail: false,
        ultimateProtection: true,
      },
      {
        feature: "Single-Stage Gloss Polish",
        tooltip: "Enhances metallic depth and clarity",
        essentialCare: false,
        premiumDetail: true,
        ultimateProtection: true,
      },
      {
        feature: "Multi-Stage Swirl & Scratch Removal",
        tooltip: "Removes 85% to 95% of wash marring and spiderwebs",
        essentialCare: false,
        premiumDetail: "Available Add-on",
        ultimateProtection: "Included (Full Correction)",
      },
    ],
  },
  {
    categoryName: "Paint Protection & Longevity",
    rows: [
      {
        feature: "Hydrophobic Polymer Sealant",
        tooltip: "Up to 6 months UV and water repellency",
        essentialCare: false,
        premiumDetail: true,
        ultimateProtection: false,
      },
      {
        feature: "9H Nano-Ceramic Liquid Glass",
        tooltip: "Semi-permanent 3 to 5-year bonded molecular protection",
        essentialCare: false,
        premiumDetail: "Available Add-on",
        ultimateProtection: true,
      },
      {
        feature: "Infrared Curing Lamp Treatment",
        tooltip: "Thermal baking for maximum coating hardness",
        essentialCare: false,
        premiumDetail: false,
        ultimateProtection: true,
      },
      {
        feature: "Windshield Hydrophobic Rain Barrier",
        tooltip: "Extreme rain repellent glass treatment",
        essentialCare: false,
        premiumDetail: "Windshield Only",
        ultimateProtection: "All Glass Panels",
      },
    ],
  },
  {
    categoryName: "Turnaround & Specifications",
    rows: [
      {
        feature: "Estimated Duration",
        tooltip: "Dedicated technician slot time",
        essentialCare: "1.5 – 2.0 Hours",
        premiumDetail: "3.5 – 5.0 Hours",
        ultimateProtection: "1 – 2 Days",
      },
      {
        feature: "Mobile or Studio Bay",
        tooltip: "Location suitability",
        essentialCare: "Mobile / Studio",
        premiumDetail: "Mobile / Studio",
        ultimateProtection: "Studio Bay Only",
      },
    ],
  },
];
