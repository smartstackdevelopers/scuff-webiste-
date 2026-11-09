import { DetailedService, ComparisonCategory } from "../types";
import { REPAIR_SERVICES } from "./repair-services";
import { EXISTING_SERVICE_AVAILABILITY } from "./core-service-updates";

const CORE_SERVICES: Record<string, DetailedService> = {
  "interior-detailing": {
    id: "svc-interior",
    slug: "interior-detailing",
    title: "Interior Detailing",
    tagline: "Medical-grade cabin sanitation and bespoke leather nourishment.",
    badge: "Cabin Restoration",
    category: "Detailing",
    startingPrice: 120,
    currency: "£",
    duration: "3 – 5 Hours",
    description:
      "A deep, surgical transformation of your cabin. Removes embedded dirt, allergens, stubborn stains, and restores supple natural leather without sticky residues.",
    longDescription:
      "Modern automotive cabins are crafted with complex materials—fine nappa leathers, alcantara weaves, piano-black gloss trims, and intricate air vents. Our Interior Detailing service treats every crevice with pH-balanced conditioners, high-temperature dry steam extraction, and HEPA particulate vacuuming. We do not mask odours with cheap fragrances; we eliminate the biological source and coat surfaces with non-greasy UV repellents.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1800&auto=format&fit=crop",
      alt: "Pristine luxury car interior with detailed perforated leather seats",
    },
    popular: false,
    recommendedFor: "Vehicles with pet hair, drink spills, neglected leather, or drivers seeking fresh showroom cabin hygiene.",
    relatedSlugs: ["full-vehicle-detailing", "maintenance-detailing", "exterior-detailing"],
    keyBenefits: [
      {
        title: "Deep Steam Sanitisation",
        description: "160°C dry vapour steam neutralises 99.9% of bacteria, allergens, and mould within upholstery and air ducts.",
      },
      {
        title: "pH-Neutral Leather Care",
        description: "Gentle foaming cleanse followed by natural lanolin conditioners to prevent cracking, fading, and dye transfer.",
      },
      {
        title: "Hot Water Carpet Extraction",
        description: "Industrial injection-extraction lifts ground-in UK winter mud, road salt, and stubborn spills from deep pile carpets.",
      },
      {
        title: "Matte OEM UV Finish",
        description: "All dashboards, console plastics, and trims are dressed in anti-static, non-reflective factory OEM finishes.",
      },
    ],
    whatsIncluded: [
      {
        phase: "Phase 1: Deep Vacuum & Debris Removal",
        items: [
          "High-power compressed air blowout of seat runners and vents",
          "HEPA filtration vacuum of carpets, mats, and boot lining",
          "Pet hair and embedded particulate removal using specialist rubber combs",
        ],
      },
      {
        phase: "Phase 2: Chemical & Steam Cleansing",
        items: [
          "Hot water extraction shampooing of fabric seats and floor mats",
          "Boar-hair brush agitation of cup holders, switches, and trim creases",
          "160°C dry steam disinfection of ventilation system and headliner spot cleaning",
        ],
      },
      {
        phase: "Phase 3: Leather & Trim Conditioning",
        items: [
          "Leather seat deep pore cleanse using pH-balanced foaming lather",
          "Bespoke leather balm application to replenish natural essential oils",
          "Anti-static, zero-glare UV shield applied to all interior dash plastics",
          "Streak-free crystal glass clarity inside and out",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
      afterUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      beforeLabel: "Stained fabric & dusty trim",
      afterLabel: "Sanitised & matte restored finish",
      caseNote: "Complete recovery of high-mileage executive saloon with neglected beige upholstery.",
    },
    faqs: [
      {
        question: "How long will the interior take to dry completely?",
        answer: "Thanks to our commercial high-temperature dry steam extraction and dedicated air blowers, carpets and fabrics are 95% dry upon handover and ready to drive within 45 minutes.",
      },
      {
        question: "Does the leather treatment leave seats greasy or shiny?",
        answer: "Never. Factory leather has an understated matte finish. We use water-based conditioners that absorb completely, leaving the leather soft and matte without slick residue.",
      },
      {
        question: "Can you eliminate severe smoke or pet odours?",
        answer: "Yes, our deep steam extraction removes odour sources directly. For persistent smoke, we offer an optional medical ozone shock treatment cycle.",
      },
    ],
  },

  "exterior-detailing": {
    id: "svc-exterior",
    slug: "exterior-detailing",
    title: "Exterior Detailing",
    tagline: "Safe multi-stage decontamination and lustrous gloss preservation.",
    badge: "Surface Refinement",
    category: "Detailing",
    startingPrice: 140,
    currency: "£",
    duration: "3 – 5 Hours",
    description:
      "A delicate, multi-step wash and chemical decontamination that removes iron fallout, tar, and road grime, finished with a high-durability synthetic sealant.",
    longDescription:
      "Automotive paint is vulnerable to harsh UK weather, road salts, brake dust, and industrial fallout. Our Exterior Detailing begins with touchless citrus pre-washes, high-foaming pH-neutral snow foams, and a strict two-bucket hand wash with plush microfibre wash mitts. We systematically decontaminate the clearcoat with chemical iron removers and fine detailing clay before laying down a 6-month synthetic sealant for high-gloss water beading.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1800&auto=format&fit=crop",
      alt: "Pristine supercar exterior with deep water beading and metallic reflection",
    },
    popular: false,
    recommendedFor: "Drivers wanting a thorough seasonal reset, iron fallout decontamination, and protective sealant.",
    relatedSlugs: ["paint-correction", "ceramic-coating", "full-vehicle-detailing"],
    keyBenefits: [
      {
        title: "Two-Bucket Safe Contact Wash",
        description: "Zero grit transfer using scratch-free grit guards and premium ultra-soft microfibre mitts.",
      },
      {
        title: "Chemical & Mechanical Decontamination",
        description: "Dissolves sintered brake dust and industrial iron fallout that causes orange spots on light paint.",
      },
      {
        title: "Wheel Arches & Barrel Cleansing",
        description: "Alloy wheel faces, deep inner barrels, brake calipers, and wheel wells stripped of built-up carbon grime.",
      },
      {
        title: "6-Month Hydrophobic Shield",
        description: "Infused polymer sealant provides instant water repellency and high-gloss slickness.",
      },
    ],
    whatsIncluded: [
      {
        phase: "Phase 1: Pre-Wash & Decontamination",
        items: [
          "Citrus pre-wash application to loosen road traffic film and bugs",
          "Dense snow foam blanket dwell to lift grit safely off clearcoat",
          "Wheel barrel, tyre wall, and arch cleaning with dedicated acid-free brushes",
          "Chemical iron fallout and tar remover bath across lower panels",
        ],
      },
      {
        phase: "Phase 2: Contact Wash & Clay Bar",
        items: [
          "Two-bucket wash with warm pH-neutral shampoo and grit-trap filtration",
          "Door shuts, petrol cap, and boot aperture detailed with soft brushes",
          "Ultra-fine clay bar treatment to lift remaining embedded surface roughness",
          "Filtered warm forced-air dry and plush drying towels",
        ],
      },
      {
        phase: "Phase 3: Protection & Dressing",
        items: [
          "High-gloss ceramic-infused spray sealant applied for 6 months protection",
          "Satin hydrophobic tyre dressing applied to prevent browning",
          "Exterior plastics, rubbers, and scuttle panels conditioned",
          "Crystal clarity glass polish applied to all exterior windows",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
      afterUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      beforeLabel: "Grime, road film & dull alloys",
      afterLabel: "Decontaminated slick gloss & dressed wheels",
      caseNote: "Full winter road film removal and high-gloss sealant on metallic coupe.",
    },
    faqs: [
      {
        question: "Does exterior detailing remove swirl marks and scratches?",
        answer: "Exterior detailing cleans, decontaminates, and protects the surface. To physically remove swirl marks, haze, and scratches, see our Paint Correction service.",
      },
      {
        question: "Will you clean inside the door shuts and boot edges?",
        answer: "Yes, all door jambs, fuel flap areas, and boot shuts are degreased and cleaned with soft detail brushes as standard.",
      },
      {
        question: "How long does the paint sealant last?",
        answer: "Under typical UK driving conditions, our polymer sealant provides up to 6 months of active UV protection and hydrophobic water sheeting.",
      },
    ],
  },

  "paint-correction": {
    id: "svc-paint-correction",
    slug: "paint-correction",
    title: "Paint Correction",
    tagline: "Precision multi-stage machine polishing for optical reflection clarity.",
    badge: "Flagship Service",
    category: "Correction",
    startingPrice: 320,
    currency: "£",
    duration: "1 – 2 Days",
    description:
      "Eliminates up to 90%+ of paint defects, swirl marks, bird lime etching, and buffer trails through calibrated rotary and dual-action machine polishing.",
    longDescription:
      "Every automotive clearcoat is unique. German paints (BMW, Audi, Porsche) are notoriously hard, while Japanese paints (Toyota, Mazda, Lexus) are delicate and soft. Our Paint Correction specialists measure digital clearcoat thickness across every single panel before selecting pad and compound pairings. Through single, two-stage, or multi-stage machine compounding and finishing jewelling, we flatten microscopic clearcoat valleys, eliminating ugly spiderweb swirls and unlocking deep, liquid-like reflections.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1800&auto=format&fit=crop",
      alt: "Master detailer operating dual action polisher under high-intensity inspection light",
    },
    popular: true,
    recommendedFor: "Vehicles with visible spider-web swirl marks under sunlight, faded clearcoats, or before ceramic coating installation.",
    relatedSlugs: ["ceramic-coating", "full-vehicle-detailing", "exterior-detailing"],
    keyBenefits: [
      {
        title: "Digital Ultrasonic Paint Depth Gauging",
        description: "Precise panel mapping ensures safe clearcoat removal without risking strike-through.",
      },
      {
        title: "85% – 95% Defect Elimination",
        description: "Permanently erases wash marring, swirl marks, light scratches, and holograms.",
      },
      {
        title: "True Optical Jewelling",
        description: "Finished with ultra-fine finishing polishes to produce mirror-depth reflections, not silicone fillers.",
      },
      {
        title: "Prepped for Long-Life Coatings",
        description: "Panels wiped down with pure isopropanol (IPA) to leave raw, clinically clean clearcoat for bonding.",
      },
    ],
    whatsIncluded: [
      {
        phase: "Phase 1: Surface Preparation",
        items: [
          "Complete multi-stage decontamination wash and clay bar treatment",
          "Digital paint depth audit recorded for all metal and composite panels",
          "Delicate rubber seals, badges, and sharp body edges taped with 3M masking tape",
        ],
      },
      {
        phase: "Phase 2: Compounding & Correction",
        items: [
          "Medium/heavy cutting compound pass using microfibre or wool pads to eliminate deeper scratches",
          "Secondary refining foam pass to eradicate compounding haze and micro-marring",
          "Jewelling finishing pass under 4000K LED inspection lighting to ensure uniform clarity",
        ],
      },
      {
        phase: "Phase 3: Panel Wipe & Base Protection",
        items: [
          "Dual IPA and solvent panel wipe to inspect true bare clearcoat without masking oils",
          "Application of premium carnauba wax or preparatory bonding primer",
          "Final inspection under multi-angle high-CRI inspection lamps",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
      afterUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      beforeLabel: "Swirl-filled, oxidized paint",
      afterLabel: "Flawless mirror reflection",
      caseNote: "Two-stage correction on jet-black BMW M3 eliminating heavy swirl marring from automatic car washes.",
    },
    faqs: [
      {
        question: "Does paint correction remove clearcoat?",
        answer: "A micro-fraction (typically 2 to 4 microns) of clearcoat is levelled to smooth out imperfections. We measure clearcoat thickness beforehand to ensure complete structural safety.",
      },
      {
        question: "Do swirl marks come back after washing?",
        answer: "We physically eliminate the scratch rather than filling it with cheap silicone glazes. As long as safe wash techniques (two buckets, soft mitts) are maintained, your paint remains swirl-free.",
      },
      {
        question: "Should I get Ceramic Coating after Paint Correction?",
        answer: "Highly recommended! Paint correction creates the perfect bare mirror finish, and ceramic coating locks it in with a rigid sacrificial layer for 3-5 years.",
      },
    ],
  },

  "ceramic-coating": {
    id: "svc-ceramic-coating",
    slug: "ceramic-coating",
    title: "Ceramic Coating",
    tagline: "Ultra-hard 9H liquid glass protection with extreme hydrophobicity.",
    badge: "Maximum Protection",
    category: "Protection",
    startingPrice: 480,
    currency: "£",
    duration: "1 – 2 Days",
    description:
      "A permanent molecular bond of nano-ceramic SiO2 providing 3 to 5 years of extreme gloss, chemical resistance, UV block, and self-cleaning water repellency.",
    longDescription:
      "Traditional carnauba waxes degrade in UK rains within 4 to 6 weeks. Ceramic coating forms a semi-permanent covalent bond with your factory clearcoat, creating a crystal-clear 9H hardness shield. Water, bug splatter, bird lime, and road grit cannot bite into the paintwork, making ongoing washes effortless. Each application is cured in our temperature-controlled bay under short-wave infrared lamps to ensure rock-solid molecular density.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1800&auto=format&fit=crop",
      alt: "Pristine sports car showing intense hydrophobic water contact angle on bonnet",
    },
    popular: true,
    recommendedFor: "Brand new car collections, recently corrected vehicles, and owners wanting long-term peace of mind with minimal wash effort.",
    relatedSlugs: ["paint-correction", "full-vehicle-detailing", "maintenance-detailing"],
    keyBenefits: [
      {
        title: "3 to 5 Year Warranty Protection",
        description: "True molecular bonding that will not wash away with detergents or heavy rain.",
      },
      {
        title: "Super-Hydrophobic Water Contact Angle",
        description: "115° contact angle causes water and mud to roll off in self-cleaning sheets.",
      },
      {
        title: "Chemical & Bird Dropping Resistance",
        description: "Withstands pH2 to pH12 acids and alkalis, preventing acidic bird etchings.",
      },
      {
        title: "Infrared Heat Curing",
        description: "Panels baked with short-wave infrared lamps to accelerate cross-linking and hardness.",
      },
    ],
    whatsIncluded: [
      {
        phase: "Phase 1: Full Surface Prep & Single-Stage Polish",
        items: [
          "Complete decontamination wash, clay bar, and iron removal",
          "Single-stage gloss enhancement machine polish to maximise reflection",
          "Double IPA solvent panel wipe to ensure complete chemical purity",
        ],
      },
      {
        phase: "Phase 2: Ceramic Coating Application",
        items: [
          "Precision cross-hatch hand application of 9H nano-ceramic base coat",
          "Dedicated flash-off leveling with micro-suede levelling towels",
          "Optional hydrophobic topcoat layer for hyper-slick surface tension",
        ],
      },
      {
        phase: "Phase 3: Infrared Baking & Handover",
        items: [
          "Infrared lamp curing across bonnet, roof, and side panels at 65°C",
          "Glass hydrophobic rain-repellent coating applied to windshield",
          "Comprehensive care pack and warranty documentation provided upon handover",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
      afterUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      beforeLabel: "Standard factory clearcoat",
      afterLabel: "9H Glass mirror reflection with bead sheeting",
      caseNote: "Brand new delivery Porsche 911 GT3 protected with 5-year ceramic package before road exposure.",
    },
    faqs: [
      {
        question: "Can I wash the car immediately after application?",
        answer: "The vehicle is touch-dry upon collection, but the coating requires 7 days to fully cure at room temperature. We ask you to avoid washing with detergents during the first week.",
      },
      {
        question: "Does ceramic coating prevent stone chips?",
        answer: "Ceramic coating resists light wash scratches and chemical etching, but cannot stop high-velocity stone impacts on motorways. For stone chips, Paint Protection Film (PPF) is recommended.",
      },
      {
        question: "What maintenance is required to keep the warranty valid?",
        answer: "Just regular two-bucket washes with pH-neutral shampoo and an optional annual ceramic top-up inspection with us.",
      },
    ],
  },

  "full-vehicle-detailing": {
    id: "svc-full-vehicle",
    slug: "full-vehicle-detailing",
    title: "Full Vehicle Detailing",
    tagline: "The comprehensive signature experience: cabin rejuvenation & exterior refinement.",
    badge: "Most Popular",
    category: "Detailing",
    startingPrice: 240,
    currency: "£",
    duration: "5 – 8 Hours",
    description:
      "Our most sought-after full-day transformation. Combines our comprehensive multi-stage exterior decontamination with a complete medical-grade interior restoration.",
    longDescription:
      "When your car deserves a total reset, Full Vehicle Detailing delivers perfection from wheel arches to headlining. Outside, your paint is bathed in citrus pre-washes, treated with clay bars, and hand-polished to enhance depth before applying a hydrophobic seal. Inside, steam extraction revives fabric textures, while leather is cleaned, conditioned, and protected from UK dampness. Every seal, shut, glass panel, and vent is treated with meticulous care.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1800&auto=format&fit=crop",
      alt: "Fully detailed performance car inside bright modern studio",
    },
    popular: true,
    recommendedFor: "Pre-sale preparation, seasonal vehicle resets, lease returns, or owners wanting complete bumper-to-bumper perfection.",
    relatedSlugs: ["ceramic-coating", "paint-correction", "interior-detailing"],
    keyBenefits: [
      {
        title: "Bumper-to-Bumper Total Reset",
        description: "No surface left untouched. Exterior, interior, engine bay edges, and wheel wells.",
      },
      {
        title: "Lease Return & Resale Value Boost",
        description: "Frequently adds several thousand pounds to vehicle private resale valuations.",
      },
      {
        title: "Single-Day Turnaround",
        description: "Booked as a dedicated single-day studio bay appointment or mobile visit.",
      },
      {
        title: "Complete Odour & Allergen Removal",
        description: "High-heat steam sanitisation leaves the interior fresh, clean, and hypoallergenic.",
      },
    ],
    whatsIncluded: [
      {
        phase: "Phase 1: Exterior Decontamination & Cleanse",
        items: [
          "Snow foam pre-soak, wheel barrel detail, and arch cleaning",
          "Two-bucket pH neutral contact wash and clay bar decontamination",
          "Single-stage machine gloss refinement pass to enhance paint depth",
          "Durable hydrophobic synthetic paint sealant and satin tyre dressing",
        ],
      },
      {
        phase: "Phase 2: Comprehensive Interior Restoration",
        items: [
          "HEPA vacuum, air-vent blowouts, and compressed dirt extraction",
          "Hot water extraction and 160°C dry steam sanitisation of upholstery",
          "Deep leather scrub and matte conditioning cream application",
          "Dashboard, console, and door card UV matte dressing",
        ],
      },
      {
        phase: "Phase 3: Finishing Touches",
        items: [
          "Interior and exterior streak-free glass clarification",
          "Door jambs, boot shuts, and fuel aperture polished",
          "Final 30-point quality audit and client walkthrough",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
      afterUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      beforeLabel: "Daily driven road dirt & family cabin use",
      afterLabel: "Flawless showroom condition inside & out",
      caseNote: "Complete full-day revival of family SUV prior to private sale handover.",
    },
    faqs: [
      {
        question: "Can this service be completed at my home?",
        answer: "Yes, our mobile detailing vans are equipped with high-pressure water tanks, silent generators, and industrial extraction equipment. All we need is safe parking space.",
      },
      {
        question: "How far in advance should I book?",
        answer: "Due to the full-day time commitment, we recommend scheduling 5 to 7 days ahead, especially for weekend slots.",
      },
      {
        question: "What size vehicles does the starting price cover?",
        answer: "Starting prices reflect compact/hatchback models. Saloons, estates, and 4x4s require slightly more time and products, detailed transparently upon booking.",
      },
    ],
  },

  "maintenance-detailing": {
    id: "svc-maintenance",
    slug: "maintenance-detailing",
    title: "Maintenance Detailing",
    tagline: "Routine scheduled care to safeguard coatings and preserve showroom shine.",
    badge: "Recurring Care",
    category: "Maintenance",
    startingPrice: 75,
    currency: "£",
    duration: "1.5 – 2.5 Hours",
    description:
      "A regular bi-weekly or monthly maintenance visit designed to safely maintain ceramics, clearcoats, and interior freshness without risking wash marring.",
    longDescription:
      "Detailing is an investment worth preserving. Commercial roadside hand washes use harsh caustic traffic film removers (TFR) and dirty wash sponges that immediately strip coatings and scratch soft clearcoats. Our Maintenance Detailing is exclusive routine care for clients who value perfection. We use ultra-gentle pH-neutral cleansers, SiO2 ceramic booster sprays, and light interior maintenance to keep your car permanently pristine.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1800&auto=format&fit=crop",
      alt: "Pristine luxury vehicle receiving safe hand wash maintenance foam",
    },
    popular: false,
    recommendedFor: "Vehicles with existing ceramic coatings, previous detailing clients, and drivers committed to scratch-free routine upkeep.",
    relatedSlugs: ["full-vehicle-detailing", "ceramic-coating", "exterior-detailing"],
    keyBenefits: [
      {
        title: "Zero-Scratch Guarantee",
        description: "Strict two-bucket wash methods ensure your corrected paint never develops wash swirls.",
      },
      {
        title: "Ceramic Coating Booster",
        description: "SiO2 maintenance spray applied on every visit to revive water beading and self-cleaning attributes.",
      },
      {
        title: "Flexible Bi-Weekly or Monthly Plans",
        description: "Convenient scheduled recurring bookings at your home driveway or office car park.",
      },
      {
        title: "Preserves Vehicle Value",
        description: "Ensures your vehicle looks consistently immaculate year-round through all seasons.",
      },
    ],
    whatsIncluded: [
      {
        phase: "Phase 1: Safe Exterior Maintenance",
        items: [
          "Pre-wash citrus spray and high-density snow foam dwell",
          "Two-bucket wash with warm water and microfibre mitts",
          "Alloy wheel faces and tyre walls degreased safely",
          "SiO2 quick-detailer spray sealant top-up",
          "Plush towel & warm filtered air drying",
        ],
      },
      {
        phase: "Phase 2: Light Interior Maintenance",
        items: [
          "Full vacuum of carpets, mats, and seat crevices",
          "Dust wipe-down of dashboard, console, and door panels",
          "Glass cleaned inside and outside to streak-free finish",
          "Neutral scent vehicle air freshener",
        ],
      },
    ],
    beforeAfter: {
      beforeUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop",
      afterUrl: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop",
      beforeLabel: "Light road dust & water spots",
      afterLabel: "Hydrophobic gloss renewed",
      caseNote: "Monthly maintenance visit preserving a 3-year ceramic coated estate car.",
    },
    faqs: [
      {
        question: "Can I book a Maintenance Detail if my car has never been detailed by you?",
        answer: "If your vehicle is in reasonable condition, yes! However, if heavy stains, severe swirl marks, or iron contamination exist, we recommend an initial Full Detail or Paint Correction first.",
      },
      {
        question: "Do you offer subscription discounts?",
        answer: "Yes, clients enrolled in our bi-weekly or monthly maintenance schedules enjoy discounted flat rates and priority weekend scheduling.",
      },
      {
        question: "How long does a maintenance appointment take?",
        answer: "Typically between 90 minutes to 2 hours, making it quick and easy to fit into your busy schedule.",
      },
    ],
  },
};

function applyAvailability(services: Record<string, DetailedService>): Record<string, DetailedService> {
  const next: Record<string, DetailedService> = { ...services };
  for (const [slug, meta] of Object.entries(EXISTING_SERVICE_AVAILABILITY)) {
    if (next[slug]) {
      next[slug] = {
        ...next[slug],
        availability: next[slug].availability ?? meta.availability,
        availabilityNote: next[slug].availabilityNote ?? meta.availabilityNote,
      };
    }
  }
  return next;
}

export const SERVICES_DATA: Record<string, DetailedService> = applyAvailability({
  ...REPAIR_SERVICES,
  ...CORE_SERVICES,
});

/** All enabled services for grids, booking and detail routes: The 6 Core You Scuff We Buff Offerings */
export const SERVICES_LIST: DetailedService[] = [
  SERVICES_DATA["alloy-wheel-refurbishment"],
  SERVICES_DATA["diamond-cutting"],
  SERVICES_DATA["smart-repairs"],
  SERVICES_DATA["car-painting"],
  SERVICES_DATA["paint-scuff-repair"],
  SERVICES_DATA["mobile-repairs"],
].filter(Boolean);

/** Original detailing tiers used by the comparison matrix (fixed feature columns) */
export const DETAILING_COMPARISON_SLUGS = [
  "interior-detailing",
  "exterior-detailing",
  "paint-correction",
  "ceramic-coating",
  "full-vehicle-detailing",
  "maintenance-detailing",
] as const;

export const DETAILING_COMPARISON_SERVICES = DETAILING_COMPARISON_SLUGS.map(
  (slug) => SERVICES_DATA[slug]
).filter(Boolean);

export const SERVICE_COMPARISON_CATEGORIES: ComparisonCategory[] = [
  {
    categoryName: "Preparation & Cleansing",
    features: [
      {
        name: "Two-Bucket Safe Hand Wash",
        tooltip: "Scratch-free wash with grit guards",
        interiorDetailing: false,
        exteriorDetailing: true,
        paintCorrection: true,
        ceramicCoating: true,
        fullVehicleDetailing: true,
        maintenanceDetailing: true,
      },
      {
        name: "Chemical Iron Fallout & Tar Removal",
        tooltip: "Dissolves sintered brake dust particles",
        interiorDetailing: false,
        exteriorDetailing: true,
        paintCorrection: true,
        ceramicCoating: true,
        fullVehicleDetailing: true,
        maintenanceDetailing: false,
      },
      {
        name: "Clay Bar Mechanical Decontamination",
        tooltip: "Smooths glass-like paint feeling",
        interiorDetailing: false,
        exteriorDetailing: true,
        paintCorrection: true,
        ceramicCoating: true,
        fullVehicleDetailing: true,
        maintenanceDetailing: false,
      },
      {
        name: "Deep Wheel Barrel & Arch Cleansing",
        tooltip: "Removes built-up carbon and road dirt",
        interiorDetailing: false,
        exteriorDetailing: true,
        paintCorrection: true,
        ceramicCoating: true,
        fullVehicleDetailing: true,
        maintenanceDetailing: "Face Only",
      },
    ],
  },
  {
    categoryName: "Paint Correction & Polish",
    features: [
      {
        name: "Digital Paint Depth Mapping",
        tooltip: "Ultrasonic clearcoat thickness measurement",
        interiorDetailing: false,
        exteriorDetailing: false,
        paintCorrection: true,
        ceramicCoating: true,
        fullVehicleDetailing: false,
        maintenanceDetailing: false,
      },
      {
        name: "Single-Stage Gloss Enhancement Polish",
        tooltip: "Restores deep gloss and cleans clearcoat",
        interiorDetailing: false,
        exteriorDetailing: false,
        paintCorrection: true,
        ceramicCoating: true,
        fullVehicleDetailing: true,
        maintenanceDetailing: false,
      },
      {
        name: "Multi-Stage Swirl & Scratch Elimination (85%+)",
        tooltip: "Removes spiderwebs, buffer trails, and wash scratches",
        interiorDetailing: false,
        exteriorDetailing: false,
        paintCorrection: true,
        ceramicCoating: "Available Add-on",
        fullVehicleDetailing: false,
        maintenanceDetailing: false,
      },
    ],
  },
  {
    categoryName: "Protection & Longevity",
    features: [
      {
        name: "High-Gloss Polymer Sealant (up to 6 months)",
        tooltip: "Synthetic paint sealant shield",
        interiorDetailing: false,
        exteriorDetailing: true,
        paintCorrection: true,
        ceramicCoating: false,
        fullVehicleDetailing: true,
        maintenanceDetailing: "SiO2 Booster",
      },
      {
        name: "9H Nano-Ceramic Protective Coating (3 - 5 Yrs)",
        tooltip: "Permanent molecular glass shield with warranty",
        interiorDetailing: false,
        exteriorDetailing: false,
        paintCorrection: "Optional Upgrade",
        ceramicCoating: true,
        fullVehicleDetailing: "Optional Upgrade",
        maintenanceDetailing: false,
      },
      {
        name: "Infrared Curing Lamp Treatment",
        tooltip: "Bakes ceramic matrix for max hardness",
        interiorDetailing: false,
        exteriorDetailing: false,
        paintCorrection: false,
        ceramicCoating: true,
        fullVehicleDetailing: false,
        maintenanceDetailing: false,
      },
    ],
  },
  {
    categoryName: "Cabin & Interior Detailing",
    features: [
      {
        name: "HEPA Filtration Cabin Vacuum",
        tooltip: "Cleans deep pile carpets and seat runners",
        interiorDetailing: true,
        exteriorDetailing: false,
        paintCorrection: false,
        ceramicCoating: false,
        fullVehicleDetailing: true,
        maintenanceDetailing: true,
      },
      {
        name: "160°C Dry Vapour Steam Sanitisation",
        tooltip: "Kills bacteria and flushes ventilation ducts",
        interiorDetailing: true,
        exteriorDetailing: false,
        paintCorrection: false,
        ceramicCoating: false,
        fullVehicleDetailing: true,
        maintenanceDetailing: false,
      },
      {
        name: "Hot Water Carpet & Seat Extraction",
        tooltip: "Extracts deep grime and spilled liquids",
        interiorDetailing: true,
        exteriorDetailing: false,
        paintCorrection: false,
        ceramicCoating: false,
        fullVehicleDetailing: true,
        maintenanceDetailing: false,
      },
      {
        name: "Leather Deep Cleanse & Lanoline Balm",
        tooltip: "Restores matte supple leather feel",
        interiorDetailing: true,
        exteriorDetailing: false,
        paintCorrection: false,
        ceramicCoating: false,
        fullVehicleDetailing: true,
        maintenanceDetailing: "Light Wipe",
      },
    ],
  },
];
