export interface AboutFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceExpertise {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  badge: string;
  href: string;
}

export const ABOUT_CONTENT = {
  hero: {
    badge: "PRECISION AUTOMOTIVE RESTORATION & DETAILING",
    headline: "Craftsmanship Beyond Conventional Detailing",
    description:
      "Founded on an obsession with optical paint clarity and structural perfection. From our climate-controlled studio cleanrooms to self-sufficient mobile workshop vans, we bring Concours-level vehicle preservation across the UK.",
    image: {
      url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
      alt: "Professional automotive detailing studio clean bay under ceiling hex lighting",
    },
  },

  story: {
    heading: "The Standard Behind You Scuff We Buff",
    subheading: "A calculated standard of restoration, not a rushed surface wash.",
    paragraphs: [
      "You Scuff We Buff was founded with a single uncompromising mission: to challenge the rushed, abrasive practices of conventional car valeting and offer true paint preservation and SMART repair craftsmanship to drivers across the UK.",
      "Most automotive paint damage doesn't occur on the road—it happens in traditional car washes using harsh caustic detergents, dirty sponges, and aggressive automatic brushes that scour microscopic swirl marks into factory clearcoats. We take an engineer's approach to every vehicle: measuring clear coat thickness with digital ultrasonic gauges, pairing polishing compounds to specific factory paint hardness, and executing localized repairs that preserve up to 90% of your car's original factory finish.",
      "Today, our operations encompass both our dedicated London studio facility at Falcon Park and a fleet of self-contained mobile repair units. Whether you bring a high-performance sports car to our cleanroom bay or require diamond-cut wheel refurbishment at your driveway, you receive identical diagnostic rigor, laboratory-grade chemistry, and total transparency.",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2070&auto=format&fit=crop",
      alt: "Master technician refining luxury automotive paint with professional rotary machine polisher",
    },
    stats: [
      { label: "Surface Audit", value: "100% Inspected" },
      { label: "Liability Insurance", value: "£5,000,000" },
      { label: "Coating Warranty", value: "Up to 5 Years" },
    ],
  },

  missionVision: {
    mission: {
      title: "Our Mission",
      statement:
        "To elevate UK automotive vehicle care through uncompromising craftsmanship, scientific paint restoration, and honest customer transparency on every service.",
      highlight: "Treating every vehicle as an engineering project, never a volume commodity.",
    },
    vision: {
      title: "Our Vision",
      statement:
        "To stand as the UK's most trusted authority in mobile SMART repairs and master studio detailing, setting a national benchmark for workmanship and client respect.",
      highlight: "Transparent pricing, verifiable clearcoat health, and long-term surface protection.",
    },
  },

  expertise: [
    {
      id: "exp-1",
      title: "Multi-Stage Paint Correction",
      subtitle: "Optical Micro-Scratch & Swirl Elimination",
      description:
        "Using dual-action and rotary polishers with dimorphic micro-abrasive compounds, we safely level paint clearcoats down to the micron to permanently remove swirl marks, bird lime etching, and hazing without compromising clearcoat safety.",
      features: [
        "Digital paint depth gauge audit before polishing",
        "Permanent defect removal, no silicone filler glazes",
        "Jeweled finishing polish for maximum optical depth",
      ],
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop",
      badge: "Stage 1–3 Correction",
      href: "/services/paint-correction",
    },
    {
      id: "exp-2",
      title: "9H Ceramic & Graphene Shields",
      subtitle: "Molecular Covalent Surface Bonding",
      description:
        "Our certified ceramic and graphene matrix coatings create an ultra-hard, hydrophobic shield that cross-links with the clear coat. Resists harsh road salt, UV radiation, environmental fallout, and oxidation for up to 5 years.",
      features: [
        "Infrared shortwave heat-cured bonding",
        "Extreme 110° water contact angle and beading",
        "Registered warranty certificates with every application",
      ],
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      badge: "Up to 5-Year Protection",
      href: "/services/ceramic-coating",
    },
    {
      id: "exp-3",
      title: "SMART Bumper Scuff & Scratch Repair",
      subtitle: "Localized OEM Precision Colour Matching",
      description:
        "Small to Medium Area Repair Technology (SMART) enables our technicians to repair bumper corners, stone chips, and door scratches within hours, matching factory color codes digitally and avoiding unnecessary panel replacement.",
      features: [
        "5-angle digital spectrophotometer colour formulation",
        "Positive-pressure filtered spray booth curing",
        "Lifetime paint adhesion warranty",
      ],
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
      badge: "Same-Day Turnaround",
      href: "/car-painting",
    },
    {
      id: "exp-4",
      title: "CNC Diamond-Cut Alloy Refurbishment",
      subtitle: "Computerized Precision Lathe Machining",
      description:
        "From severe kerb rash to corrosion, our specialized diamond-cutting lathes digitally map wheel contours and skim a micron-thin layer of alloy to restore the iridescent rainbow sheen and factory OEM profile.",
      features: [
        "0.001mm laser probe surface contour profiling",
        "High-temperature powder coat primer and base",
        "Clear protective acrylic lacquer against brake dust",
      ],
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
      badge: "OEM Factory Profile",
      href: "/services/alloy-wheel-refurbishment",
    },
  ] as ServiceExpertise[],

  workshopGallery: [
    {
      title: "Climate-Controlled Studio Bay",
      desc: "Positive-pressure cleanroom eliminating floating dust particles during ceramic application.",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
      category: "Facility",
    },
    {
      title: "Master Machine Polishing",
      desc: "Precision compounding tailored to German, Japanese, and British clearcoat hardness.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop",
      category: "Technique",
    },
    {
      title: "OEM Spray Booth Refinishing",
      desc: "Shortwave infrared lamp baking ensures rapid cure and stone-hard chip resistance.",
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
      category: "Painting",
    },
    {
      title: "Flawless Handover Reflections",
      desc: "Every completed vehicle undergoes high-CRI inspection before client sign-off.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      category: "Handover",
    },
  ],

  whyChooseUs: [
    {
      id: "feature-1",
      title: "IDA-Certified Master Technicians",
      description:
        "Every detailing and painting specialist undergoes continuous technical accreditation in clear coat metallurgy and multi-stage correction.",
      iconName: "Award",
    },
    {
      id: "feature-2",
      title: "OEM Factory-Approved Materials",
      description:
        "We exclusively partner with world-renowned detailing laboratories including Gyeon, CarPro, Menzerna, and Glasurit waterborne coatings.",
      iconName: "ShieldCheck",
    },
    {
      id: "feature-3",
      title: "Digital Paint Depth Verification",
      description:
        "Ultrasonic paint thickness readings across 24 panel checkpoints ensure polishing never removes critical clearcoat layers.",
      iconName: "Search",
    },
    {
      id: "feature-4",
      title: "Self-Sufficient Mobile Vans",
      description:
        "Our mobile fleet arrives equipped with silent Honda generators, 500L de-ionised pure water, pop-up canopies, and lighting.",
      iconName: "Wrench",
    },
    {
      id: "feature-5",
      title: "Transparent Fixed Pricing",
      description:
        "Clear, written quotations before any work begins. No hidden call-out charges, mileage fees, or surprise upsells.",
      iconName: "CheckCircle2",
    },
    {
      id: "feature-6",
      title: "Full £5M Public Liability Cover",
      description:
        "Comprehensive motor trade insurance protecting prestige, supercar, commercial, and everyday vehicles throughout our care.",
      iconName: "Shield",
    },
  ] as AboutFeature[],

  process: [
    {
      stepNumber: "01",
      title: "Diagnostic Assessment",
      description:
        "High-CRI LED defect mapping and ultrasonic paint depth audit to identify swirl density, stone chips, and clearcoat thickness.",
      iconName: "Search",
    },
    {
      stepNumber: "02",
      title: "Multi-Stage Decontamination",
      description:
        "pH-neutral citrus pre-wash, iron fallout chemical dissolution, tar removal, and soft clay bar extraction of embedded contaminants.",
      iconName: "Sliders",
    },
    {
      stepNumber: "03",
      title: "Correction & Protection",
      description:
        "Tailored machine compounding, refinement jewelling, SMART scuff refinishing, and shortwave IR-cured 9H ceramic bond.",
      iconName: "Wrench",
    },
    {
      stepNumber: "04",
      title: "Handover Walkaround",
      description:
        "Joint 30-point inspection under direct lighting, tyre and trim conditioning, interior touch-up, and warranty handover.",
      iconName: "CheckCircle2",
    },
  ] as ProcessStep[],

  trustCredentials: [
    { title: "Motor Trade Cover", value: "£5,000,000", desc: "Comprehensive public & vehicle liability insurance" },
    { title: "Defect Elimination", value: "Up to 95%", desc: "Permanent swirl, scratch & oxidation removal" },
    { title: "Ceramic Warranty", value: "Up to 5 Years", desc: "Chemical, UV & hydrophobicity guarantee" },
    { title: "Colour Accuracy", value: "99.4%", desc: "Computerized spectrophotometer digital matching" },
  ],

  cta: {
    headline: "Experience Automotive Detailing Done Right.",
    subheadline:
      "Whether you need master paint correction at our Falcon Park cleanroom bay or alloy wheel repair at your home, our certified technicians are ready to restore your vehicle.",
    primaryBtn: {
      text: "Book Detailing Bay",
      href: "/booking",
    },
    secondaryBtn: {
      text: "View Services Catalog",
      href: "/services",
    },
  },
};
