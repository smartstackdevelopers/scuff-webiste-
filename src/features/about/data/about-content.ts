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

export const ABOUT_CONTENT = {
  hero: {
    badge: "EXCELLENCE IN AUTOMOTIVE CARE",
    headline: "More Than Detailing. It's a Standard of Care.",
    description:
      "At You Scuff We Buff, we believe every vehicle deserves exceptional attention, professional care, and a finish worth being proud of.",
    image: {
      url: "/images/brand/van.jpg",
      alt: "Supercar paint reflection in high-end detailing studio",
    },
  },

  story: {
    heading: "Our Story",
    subheading: "A calculated standard of restoration, not a rushed surface wash.",
    paragraphs: [
      "You Scuff We Buff was created out of a genuine appreciation for automotive design and an obsession with optical surface clarity. Too often in the vehicle care industry, cars are subjected to abrasive brushes, aggressive caustic chemicals, and hasty hand washes that leave clearcoats scratched, oxidized, and dull.",
      "We operate under a fundamentally different standard. To us, every vehicle—from a daily commuter to a limited-production supercar—is treated with scientific care. We examine paint depth using digital ultrasonic gauges, pair machine polishing pads specifically to factory paint hardness, and exclusively deploy pH-neutral deionizing chemistry.",
      "Whether at our controlled London studio bay or through our self-contained mobile detailing units across the UK, our mission remains uncompromising: bring back the beauty, protect the finish, and provide an experience built entirely on trust and transparency.",
    ],
    image: {
      url: "/images/brand/mascot.jpg",
      alt: "Master detailer perfecting black sports car with dual-action polisher",
    },
    stats: [
      { label: "Surface Inspection", value: "100%" },
      { label: "Insured Bay Standard", value: "BS 10125" },
      { label: "Warranty Guarantee", value: "Up to 5 Yrs" },
    ],
  },

  missionVision: {
    mission: {
      title: "Our Mission",
      statement:
        "To deliver professional vehicle care through attention to detail, quality workmanship, and customer-focused service.",
      highlight: "Uncompromising precision on every panel, interior stitch, and wheel barrel.",
    },
    vision: {
      title: "Our Vision",
      statement:
        "To create a trusted automotive care experience where every vehicle receives the attention it deserves.",
      highlight: "Setting a recognized national benchmark for vehicle protection and customer transparency.",
    },
  },

  whyChooseUs: [
    {
      id: "feature-1",
      title: "Professional Attention to Detail",
      description:
        "We spend hours refining micro-imperfections, door shuts, and leather seams that traditional washes routinely overlook.",
      iconName: "Sparkles",
    },
    {
      id: "feature-2",
      title: "Quality Products",
      description:
        "Only certified, pH-balanced European compounding pastes, ceramic sealants, and premium natural leather feeds are utilized.",
      iconName: "ShieldCheck",
    },
    {
      id: "feature-3",
      title: "Customer Satisfaction",
      description:
        "We walk through every finished vehicle with you before sign-off, ensuring expectations are consistently exceeded.",
      iconName: "HeartHandshake",
    },
    {
      id: "feature-4",
      title: "Reliable Service",
      description:
        "Punctual mobile arrivals and prompt studio turnarounds. We respect your schedule and keep you updated with live progress photos.",
      iconName: "Clock",
    },
    {
      id: "feature-5",
      title: "Modern Techniques",
      description:
        "From dual-action rotary polishers with multi-step foam pads to infrared curing lamps for ceramic adhesion, we invest in modern science.",
      iconName: "Wrench",
    },
    {
      id: "feature-6",
      title: "Convenient Booking",
      description:
        "Transparent pricing, no hidden mobile travel fees within our primary service zones, and flexible online scheduling.",
      iconName: "CalendarCheck",
    },
  ] as AboutFeature[],

  process: [
    {
      stepNumber: "01",
      title: "Vehicle Assessment",
      description:
        "Thorough digital paint depth measurements, clearcoat defect mapping, and interior surface evaluation under LED inspection lamps.",
      iconName: "Search",
    },
    {
      stepNumber: "02",
      title: "Service Selection",
      description:
        "Tailoring the ideal combination of chemical decontamination, machine polishing stages, and protective coatings for your vehicle.",
      iconName: "Sliders",
    },
    {
      stepNumber: "03",
      title: "Professional Detailing",
      description:
        "Meticulous multi-stage execution—combining safe hand washes, compound correction, steam extraction, and ceramic bonding.",
      iconName: "Wrench",
    },
    {
      stepNumber: "04",
      title: "Final Quality Check",
      description:
        "Comprehensive 30-point inspection under direct inspection lighting, tyre dressing, streak-free glass check, and client handover.",
      iconName: "CheckCircle2",
    },
  ] as ProcessStep[],

  cta: {
    headline: "Ready to Give Your Vehicle the Care It Deserves?",
    subheadline:
      "Join hundreds of discerning drivers who trust You Scuff We Buff for precision detailing and long-lasting paint protection.",
    primaryBtn: {
      text: "Book an Appointment",
      href: "/booking",
    },
    secondaryBtn: {
      text: "Explore Services",
      href: "/services",
    },
  },
};
