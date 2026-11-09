export interface StatItem {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
  isDemoData: boolean;
}

export interface HomeServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  startingPrice: string;
  duration: string;
  image: string;
  alt: string;
  href: string;
  badge?: string;
  features: string[];
}

export interface ValuePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceSubtext: string;
  popular?: boolean;
  features: string[];
  duration: string;
  warranty: string;
  href: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  vehicle: string;
  rating: number;
  quote: string;
  serviceReceived: string;
  initials: string;
  isDemoReview: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HOME_CONTENT = {
  hero: {
    trustBadge: "WHEEL REPAIRS • SMART REPAIRS • MOBILE VAN",
    ratingText: "4.9/5 Rating (Demo Data • 240+ Reviews)",
    headline: "Bring Back the Beauty. Protect the Drive.",
    subheadline:
      "Professional alloy wheel refurbishment, Smart Repairs and convenient mobile appointments at your home or workplace — plus premium detailing when you need it.",
    primaryCta: {
      text: "Book Your Mobile Repair",
      href: "/booking?service=mobile-repairs",
    },
    secondaryCta: {
      text: "Explore Our Services",
      href: "/services",
    },
    image: {
      url: "/images/brand/van.jpg",
      alt: "You Scuff We Buff branded mobile service van",
    },
  },

  stats: [
    {
      id: "stat-1",
      value: "500+",
      numericValue: 500,
      suffix: "+",
      label: "Vehicles Detailed",
      description: "Supercars, executive saloons & luxury 4x4s",
      isDemoData: true,
    },
    {
      id: "stat-2",
      value: "98%",
      numericValue: 98,
      suffix: "%",
      label: "Customer Satisfaction",
      description: "Consistently rated 5 stars across reviews",
      isDemoData: true,
    },
    {
      id: "stat-3",
      value: "5+",
      numericValue: 5,
      suffix: "+",
      label: "Years Experience",
      description: "Master certified British detailing techniques",
      isDemoData: true,
    },
    {
      id: "stat-4",
      value: "100%",
      numericValue: 100,
      suffix: "%",
      label: "Attention to Detail",
      description: "Digital paint depth inspection on every car",
      isDemoData: true,
    },
  ] as StatItem[],

  services: {
    heading: "Wheels, Smart Repairs & Mobile Care",
    subheading:
      "Professional alloy wheel refurbishment, Smart Repairs and convenient mobile appointments — plus our established detailing services.",
    items: [
      {
        id: "alloy-wheel-refurbishment",
        title: "Alloy Wheel Refurbishment",
        tagline: "Kerb damage, scuffs and colour restoration",
        description:
          "Cosmetic alloy repairs including kerb rash, scratched faces, scuffs and wheel colour restoration — mobile where suitable.",
        startingPrice: "Quote",
        duration: "Assessed",
        image: "/images/brand/wheels.jpg",
        alt: "Diamond-cut alloy wheels after professional refurbishment",
        href: "/services/alloy-wheel-refurbishment",
        badge: "WHEEL REPAIR",
        features: ["Kerb Damage Repair", "Scuff Restoration", "Colour Matching"],
      },
      {
        id: "smart-repairs",
        title: "Smart Repairs",
        tagline: "Localised cosmetic scratch & scuff repairs",
        description:
          "Suitable minor paint and bumper scuffs repaired with a Smart Repair approach — not major accident bodywork.",
        startingPrice: "Quote",
        duration: "Assessed",
        image: "/images/brand/card-van.jpg",
        alt: "You Scuff We Buff smart repair branding",
        href: "/services/smart-repairs",
        badge: "SMART REPAIR",
        features: ["Bumper Scuffs", "Minor Scratches", "Localised Paint"],
      },
      {
        id: "mobile-repairs",
        title: "Mobile Repair Services",
        tagline: "We come to your home or workplace",
        description:
          "Our mobile van attends suitable jobs at home, office or workplace so you don’t always need to visit a garage.",
        startingPrice: "Quote",
        duration: "Booked slot",
        image: "/images/brand/van.jpg",
        alt: "You Scuff We Buff branded mobile repair van",
        href: "/services/mobile-repairs",
        badge: "WE COME TO YOU",
        features: ["Home Appointments", "Workplace Visits", "Online Booking"],
      },
      {
        id: "paint-correction",
        title: "Paint Correction",
        tagline: "Erase swirl marks & restore clarity",
        description:
          "Multi-stage machine compounding and ultra-fine finishing polish to remove swirls, scratches, and haze.",
        startingPrice: "£280",
        duration: "5-7 Hours",
        image:
          "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
        alt: "Precision machine compounding on vehicle clearcoat",
        href: "/services/paint-correction",
        badge: "SIGNATURE",
        features: ["Paint Depth Gauge Check", "Dual-Action Machine Buff", "Mirror Gloss Finish"],
      },
      {
        id: "exterior-detailing",
        title: "Exterior Detailing",
        tagline: "Safe multi-stage decontamination",
        description:
          "Snow foam pre-wash, two-bucket hand cleanse, chemical fallout removal, and synthetic sealant.",
        startingPrice: "£110",
        duration: "2-3 Hours",
        image:
          "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1200&auto=format&fit=crop",
        alt: "Snow foam pre-wash on black sports car during exterior detailing",
        href: "/services/exterior-detailing",
        features: ["De-ironing & Clay Bar", "Warm Blow Dry", "Hydrophobic Sealant"],
      },
      {
        id: "interior-detailing",
        title: "Interior Detailing",
        tagline: "Deep steam purification & leather revival",
        description:
          "Complete cabin extraction, leather care, UV dashboard shield, and hygiene-focused sanitisation.",
        startingPrice: "£95",
        duration: "2-3 Hours",
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
        alt: "Luxury vehicle cockpit interior detailing and leather care",
        href: "/services/interior-detailing",
        features: ["Steam Carpet Extraction", "pH-Neutral Leather Feed", "Odor Elimination"],
      },
    ] as HomeServiceItem[],
  },

  whyChooseUs: {
    heading: "Why Choose You Scuff We Buff?",
    subheading:
      "We operate at the intersection of craftsmanship, chemistry, and convenience. Your pride and joy is treated with the highest degree of respect.",
    image: {
      url: "/images/brand/van.jpg",
      alt: "You Scuff We Buff mobile alloy wheel and smart repair van",
    },
    pillars: [
      {
        id: "pillar-1",
        title: "Professional Detailing",
        description:
          "Certified master technicians with extensive training on luxury marques, supercars, and classic paint systems.",
        iconName: "ShieldCheck",
      },
      {
        id: "pillar-2",
        title: "Premium Products",
        description:
          "We exclusively deploy Swissvax, Gtechniq, CarPro, and Meguiar's Pro line chemistry for unmatched durability.",
        iconName: "Sparkles",
      },
      {
        id: "pillar-3",
        title: "Attention to Every Detail",
        description:
          "From wheel nut cavities to door shut jambs, no area of your vehicle is overlooked or rushed.",
        iconName: "CheckCircle2",
      },
      {
        id: "pillar-4",
        title: "Customer-Focused Service",
        description:
          "Transparent communication with live inspection photos, honest advice, and zero high-pressure upselling.",
        iconName: "HeartHandshake",
      },
      {
        id: "pillar-5",
        title: "Convenient Online Booking",
        description:
          "Book your studio appointment or mobile van visit in under 2 minutes with flexible UK scheduling.",
        iconName: "CalendarClock",
      },
      {
        id: "pillar-6",
        title: "Quality Vehicle Care",
        description:
          "Fully insured bay coverage, ultrasonic paint depth verification, and written guarantees on all protective coatings.",
        iconName: "Award",
      },
    ] as ValuePillar[],
  },

  beforeAfter: {
    heading: "Visible Transformation. Flawless Precision.",
    subheading:
      "Slide across to compare a swirl-marked clearcoat before and after our multi-stage paint correction and ceramic seal.",
    demoBadge: "Interactive Demo Showcase",
    beforeLabel: "Before Detailing",
    afterLabel: "After Mirror Correction",
    beforeDescription: "Swirl marks, spiderwebbing, oxidation & key scratch haze",
    afterDescription: "90%+ defect removal, optical clarity & hydrophobic glass depth",
    beforeImage:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop",
    afterImage: "/images/brand/wheels.jpg",
  },

  howItWorks: {
    heading: "Effortless 4-Step Experience",
    subheading:
      "Booking your vehicle care is seamless, whether you prefer our dedicated studio bay or mobile service at your home or workplace.",
    steps: [
      {
        stepNumber: "01",
        title: "Choose Your Service",
        description:
          "Select from our specialized packages or customize your care with specific paint correction and ceramic tiers.",
        iconName: "Wrench",
      },
      {
        stepNumber: "02",
        title: "Select Date & Time",
        description:
          "Pick a convenient appointment slot. Choose our London studio bay or mobile unit at your preferred location.",
        iconName: "Calendar",
      },
      {
        stepNumber: "03",
        title: "Confirm Your Booking",
        description:
          "Receive instant digital booking confirmation, technician contact details, and pre-care instructions with no upfront deposit.",
        iconName: "CheckCircle",
      },
      {
        stepNumber: "04",
        title: "Enjoy Your Detailed Car",
        description:
          "Inspect your vehicle alongside our master technician. Experience that showroom feeling every time you take the wheel.",
        iconName: "Sparkles",
      },
    ],
  },

  packages: {
    heading: "Featured Detailing Packages",
    subheading:
      "Carefully tailored service packages designed to suit every vehicle condition and budget. Clear, transparent UK pricing.",
    items: [
      {
        id: "pkg-essential",
        name: "Essential Care",
        tagline: "Thorough deep clean & gloss boost",
        price: "£145",
        priceSubtext: "Configurable placeholder starting rate",
        popular: false,
        duration: "3 - 4 Hours",
        warranty: "6-Month Hydrophobic Seal",
        features: [
          "Multi-stage safe snow foam wash",
          "Chemical iron fallout decontamination",
          "Interior deep extraction & vacuum",
          "Glass polished inside and out",
          "Wheel faces & arches cleaned",
          "Synthetic hydrophobic gloss sealant",
        ],
        href: "/pricing",
      },
      {
        id: "pkg-premium",
        name: "Premium Detail",
        tagline: "Our most requested studio treatment",
        price: "£320",
        priceSubtext: "Configurable placeholder starting rate",
        popular: true,
        duration: "1 Full Day",
        warranty: "1-Year Paint Protection",
        features: [
          "Everything in Essential Care tier",
          "Full clay bar surface decontamination",
          "Single-stage machine compounding polish",
          "Removes 60-70% of light swirl marks",
          "Engine bay cleaned & dressed",
          "Full leather deep conditioning treatment",
          "12-Month ceramic spray coating application",
        ],
        href: "/pricing",
      },
      {
        id: "pkg-ultimate",
        name: "Ultimate Protection",
        tagline: "Concourse standard & 5-year ceramic",
        price: "£595",
        priceSubtext: "Configurable placeholder starting rate",
        popular: false,
        duration: "2 Full Days",
        warranty: "5-Year Guarantee Certificate",
        features: [
          "Everything in Premium Detail tier",
          "Multi-stage heavy compounding & refining",
          "Removes up to 90%+ of swirls & defects",
          "9H Graphene Ceramic Coating on paintwork",
          "Ceramic wheel face & barrel protection",
          "Hydrophobic glass coating on all windows",
          "Official 5-Year written warranty certificate",
        ],
        href: "/pricing",
      },
    ] as PackageTier[],
  },

  testimonials: {
    heading: "Trusted by Enthusiasts & Collectors",
    subheading:
      "Read what vehicle owners across the UK say about our workmanship and attention to detail. (Demo Reviews)",
    items: [
      {
        id: "test-1",
        name: "Alexander Wright",
        role: "Sports Car Collector",
        location: "Kensington, London",
        vehicle: "Porsche 911 GT3 (992)",
        rating: 5,
        quote:
          "The swirl marks on my black GT3 were driving me mad. The team spent two full days compounding and applying the 9H ceramic shield. The depth of reflection is genuinely better than when it left the factory.",
        serviceReceived: "Paint Correction & 5-Year Ceramic",
        initials: "AW",
        isDemoReview: true,
      },
      {
        id: "test-2",
        name: "Dr. Sophie Campbell",
        role: "Executive Owner",
        location: "Richmond, Surrey",
        vehicle: "Range Rover Autobiography",
        rating: 5,
        quote:
          "Incredible mobile service. They arrived on time with their own water and power units, erased a nasty bumper scuff, and returned the ivory leather to brand new condition. Outstanding professionalism.",
        serviceReceived: "SMART Scuff Repair & Interior",
        initials: "SC",
        isDemoReview: true,
      },
      {
        id: "test-3",
        name: "James Thornton",
        role: "Automotive Enthusiast",
        location: "St Albans, Hertfordshire",
        vehicle: "BMW M4 Competition",
        rating: 5,
        quote:
          "Transparent pricing, polite communication, and unbelievable attention to detail. The water beading on the bonnet six months later is still identical to day one. Will never use another detailer.",
        serviceReceived: "Premium Detail & Ceramic",
        initials: "JT",
        isDemoReview: true,
      },
    ] as TestimonialItem[],
  },

  faq: {
    heading: "Frequently Asked Questions",
    subheading: "Everything you need to know about our automotive detailing methods and booking process.",
    items: [
      {
        id: "faq-1",
        question: "What detailing and repair services do you offer?",
        answer:
          "We offer comprehensive interior and exterior vehicle care, including multi-stage machine paint correction, certified 9H ceramic coatings, SMART bumper scuff and scratch repairs, alloy wheel refurbishment, and regular maintenance wash schedules. Both mobile visits and studio bay appointments are available.",
      },
      {
        id: "faq-2",
        question: "How long does a professional detailing session take?",
        answer:
          "Duration depends on the service level selected. An Essential Care clean takes approximately 3-4 hours, while our single-stage Premium Detail requires a full day (6-8 hours). Concourse multi-stage paint correction with multi-layer ceramic coatings typically requires 2 full days to allow proper infrared curing time.",
      },
      {
        id: "faq-3",
        question: "Do I need to book an appointment in advance?",
        answer:
          "Yes, we operate strictly by appointment to guarantee our master technicians dedicate uninterrupted focus to your vehicle. While we frequently accommodate same-week requests, we recommend booking 1-2 weeks in advance for weekend slots or multi-stage paint correction packages.",
      },
      {
        id: "faq-4",
        question: "Can I customize a package or choose individual services?",
        answer:
          "Absolutely. In addition to our three featured packages, you can choose standalone services—such as targeted bumper scuff repair, interior-only decontamination, or convertible soft-top waterproofing. Contact our team for a tailored quotation.",
      },
      {
        id: "faq-5",
        question: "How can I contact your team or get a quote for paint damage?",
        answer:
          "You can use our online booking form, send photos of your vehicle scratches directly via our floating WhatsApp button, or email bookings@placeholder-youscuffwebuff.co.uk. We typically reply with a transparent preliminary quote within 2 hours.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    headline: "Your Car Deserves the Best.",
    subheadline:
      "Give your vehicle the attention it deserves with professional detailing, paint correction, and certified ceramic protection.",
    primaryCtaText: "Book Your Detailing Slot",
    primaryCtaHref: "/pricing",
    secondaryCtaText: "Contact Technicians",
    secondaryCtaHref: "/contact",
    image: "/images/brand/card-van.jpg",
  },
};
