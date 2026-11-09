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
    trustBadge: "MOBILE ALLOY WHEEL REFURBISHMENT • SMART REPAIRS • WEST MIDLANDS",
    ratingText: "Family-Run • 5-Star Rated Across Birmingham",
    headline: "Bring Back the Beauty. Protect the Drive.",
    subheadline:
      "Professional mobile alloy wheel refurbishment, diamond cutting repairs, and dent and scratch SMART repairs across Birmingham and the West Midlands. We come directly to your home or workplace.",
    primaryCta: {
      text: "Book Your Mobile Repair",
      href: "/booking",
    },
    secondaryCta: {
      text: "Explore Our Services",
      href: "/services",
    },
    image: {
      url: "/images/brand/van.jpg",
      alt: "You Scuff We Buff branded mobile alloy wheel repair van",
    },
  },

  stats: [
    {
      id: "stat-1",
      value: "100%",
      numericValue: 100,
      suffix: "%",
      label: "Mobile Service",
      description: "Direct to your home or workplace",
      isDemoData: false,
    },
    {
      id: "stat-2",
      value: "5-Star",
      numericValue: 5,
      suffix: "★",
      label: "Customer Rating",
      description: "Trusted family-run West Midlands service",
      isDemoData: false,
    },
    {
      id: "stat-3",
      value: "Same Day",
      numericValue: 1,
      suffix: "",
      label: "Fast Turnaround",
      description: "Most repairs completed within hours",
      isDemoData: false,
    },
    {
      id: "stat-4",
      value: "Free",
      numericValue: 0,
      suffix: "",
      label: "Quotes & Advice",
      description: "Fast WhatsApp photo estimates",
      isDemoData: false,
    },
  ] as StatItem[],

  services: {
    heading: "Our Mobile Repair Services",
    subheading:
      "You Scuff We Buff specialises in restoring damaged, scratched, scuffed and kerbed alloy wheels, diamond cut wheels and cosmetic bodywork scuffs across Birmingham and the West Midlands.",
    items: [
      {
        id: "alloy-wheel-refurbishment",
        title: "Alloy Wheel Refurbishment",
        tagline: "Kerb damage, scratches and scuff restoration",
        description:
          "Restore damaged, kerbed, scratched and corroded alloy wheels back to pristine showroom finish with high-grade primers, paints and protective lacquers.",
        startingPrice: "Free Quote",
        duration: "1-2 Hours / Wheel",
        image: "/images/brand/wheels.jpg",
        alt: "Refurbished alloy wheels after professional restoration",
        href: "/services/alloy-wheel-refurbishment",
        badge: "CORE SERVICE",
        features: ["Kerb Rash Removal", "OEM Paint Blending", "Protective Clear Lacquer"],
      },
      {
        id: "diamond-cutting",
        title: "Diamond Cutting Repair",
        tagline: "Precision diamond-cut alloy face restoration",
        description:
          "Restore the pristine two-tone machined face on diamond-cut alloys, eliminating spider-web corrosion and edge kerb damage with precision machining.",
        startingPrice: "Free Quote",
        duration: "Same-Day Return",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
        alt: "Diamond-cut alloy wheel face precision repair",
        href: "/services/diamond-cutting",
        badge: "PRECISION",
        features: ["Machined Face Restoration", "Corrosion Removal", "UV-Resistant Clear Coat"],
      },
      {
        id: "smart-repairs",
        title: "Dent & Scratch SMART Repair",
        tagline: "Targeted minor paint and bodywork scuff repair",
        description:
          "Small to Medium Area Repair Technology (SMART) repairs localized minor dents, stone chips, key scratches, and paint blemishes without repainting entire panels.",
        startingPrice: "Free Quote",
        duration: "2-3 Hours",
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop",
        alt: "SMART scratch and dent repair on car bodywork",
        href: "/services/smart-repairs",
        badge: "SMART REPAIR",
        features: ["Digital Colour Match", "Preserves Original Paint", "Fast Mobile Repair"],
      },
      {
        id: "bumper-damage",
        title: "Bumper Damage Repair",
        tagline: "Plastic bumper corner scuffs and crack restoration",
        description:
          "Repair unsightly bumper corner scuffs, parking scrapes, and minor textured plastic damage quickly and affordably at your home or workplace.",
        startingPrice: "Free Quote",
        duration: "2-3 Hours",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
        alt: "Bumper corner scuff repair and paint blending",
        href: "/car-painting",
        badge: "POPULAR",
        features: ["Corner Scuff Removal", "Plastic Texture Matching", "Seamless Blending"],
      },
      {
        id: "paint-scuff",
        title: "Paint Scuff Repair",
        tagline: "Mirror housings, arches, and door edge scuffs",
        description:
          "Erase everyday parking scrapes, bollard rubs, and wing mirror scuffs using factory-spec colour codes for an undetectable, seamless finish.",
        startingPrice: "Free Quote",
        duration: "1-2 Hours",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
        alt: "Paint scuff repair on vehicle wing mirror and panel",
        href: "/car-painting",
        badge: "SAME DAY",
        features: ["Factory Code Matching", "High Gloss Finish", "Rust Prevention"],
      },
      {
        id: "mobile-repairs",
        title: "Mobile Alloy Wheel Repair",
        tagline: "We come directly to your home or workplace",
        description:
          "Enjoy total convenience—our self-contained mobile workshop arrives at your driveway or workplace across Birmingham and the West Midlands.",
        startingPrice: "Free Quote",
        duration: "At Your Doorstep",
        image: "/images/brand/van.jpg",
        alt: "You Scuff We Buff mobile service van visiting customer",
        href: "/services/mobile-repairs",
        badge: "WE COME TO YOU",
        features: ["Home or Workplace", "No Garage Drop-Off", "Fully Equipped Unit"],
      },
    ] as HomeServiceItem[],
  },

  whyChooseUs: {
    heading: "Why Choose You Scuff We Buff?",
    subheading:
      "As a family-run specialist, we take genuine pride in restoring damaged alloy wheels and bodywork scuffs with honest pricing, personal service, and showroom finishes.",
    image: {
      url: "/images/brand/van.jpg",
      alt: "You Scuff We Buff mobile alloy wheel and SMART repair van",
    },
    pillars: [
      {
        id: "pillar-1",
        title: "Friendly Family-Run Service",
        description:
          "Independent, family-operated business offering friendly advice, reliable bookings, and care you can trust on every job.",
        iconName: "ShieldCheck",
      },
      {
        id: "pillar-2",
        title: "Skilled & Experienced Technicians",
        description:
          "Specialist knowledge in alloy wheel refurbishment, diamond cutting, and localized SMART bodywork repairs.",
        iconName: "Sparkles",
      },
      {
        id: "pillar-3",
        title: "Convenient Mobile Service",
        description:
          "We travel directly to your home or workplace across Birmingham and the West Midlands, saving you time and hassle.",
        iconName: "CheckCircle2",
      },
      {
        id: "pillar-4",
        title: "Honest Pricing & Free Quotes",
        description:
          "Clear, competitive quotes with no hidden fees. WhatsApp us photos for a fast, no-obligation estimate.",
        iconName: "HeartHandshake",
      },
      {
        id: "pillar-5",
        title: "High-Quality Finishes",
        description:
          "Using professional automotive-grade primers, factory paints, and durable protective lacquers that last.",
        iconName: "Award",
      },
      {
        id: "pillar-6",
        title: "Fast & Reliable Turnaround",
        description:
          "Most mobile repairs are completed in just a few hours on the same day so you can drive with confidence.",
        iconName: "CalendarClock",
      },
    ] as ValuePillar[],
  },

  beforeAfter: {
    heading: "Visible Transformation. Flawless Finishes.",
    subheading:
      "Slide across to compare a kerbed, scratched alloy wheel before and after our specialist refurbishment process.",
    demoBadge: "Before & After Showcase",
    beforeLabel: "Before Refurbishment",
    afterLabel: "After You Scuff We Buff",
    beforeDescription: "Deep kerb gouges, scratched face, brake dust corrosion",
    afterDescription: "Flawless smooth rim, exact factory colour, durable protective lacquer",
    beforeImage:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop",
    afterImage: "/images/brand/wheels.jpg",
  },

  howItWorks: {
    heading: "Simple 4-Step Repair Process",
    subheading:
      "Getting your wheels and bodywork scuffs restored with You Scuff We Buff is effortless and convenient.",
    steps: [
      {
        stepNumber: "01",
        title: "Send Us Photos",
        description:
          "Take a quick photo of the damaged wheel or bodywork scuff and send it via WhatsApp or our online quote form.",
        iconName: "Wrench",
      },
      {
        stepNumber: "02",
        title: "Get a Free Quote",
        description:
          "We review the photos promptly and give you a transparent, competitive price with no hidden surprises.",
        iconName: "Calendar",
      },
      {
        stepNumber: "03",
        title: "We Visit Your Location",
        description:
          "Our mobile repair unit arrives at your home or workplace across Birmingham and the West Midlands at your chosen time.",
        iconName: "CheckCircle",
      },
      {
        stepNumber: "04",
        title: "Inspect & Drive Away",
        description:
          "Inspect the restored wheel or panel together. Enjoy a flawless showroom finish completed right at your doorstep.",
        iconName: "Sparkles",
      },
    ],
  },

  packages: {
    heading: "Popular Repair Options",
    subheading:
      "Competitive, transparent pricing for mobile alloy wheel refurbishments and SMART repairs across the West Midlands.",
    items: [
      {
        id: "pkg-single-wheel",
        name: "Single Alloy Wheel",
        tagline: "Kerb damage & scratch refurbishment",
        price: "From £70",
        priceSubtext: "Exact quote based on damage photos",
        popular: false,
        duration: "1 - 2 Hours",
        warranty: "Durable Protective Lacquer",
        features: [
          "Full kerb rash & gouge repair",
          "Machine sanding & smoothing",
          "Automotive etch primer application",
          "Precision factory colour coat",
          "High-gloss protective clear lacquer",
          "Completed at your home or workplace",
        ],
        href: "/booking",
      },
      {
        id: "pkg-full-set",
        name: "Full Set (4 Wheels)",
        tagline: "Complete set wheel refresh & colour change",
        price: "From £240",
        priceSubtext: "Discounted multi-wheel rate",
        popular: true,
        duration: "Half Day",
        warranty: "Complete Set Guarantee",
        features: [
          "All 4 wheels fully refurbished",
          "Removal of all kerbing & scratches",
          "Silver, gloss black, anthracite or custom",
          "Brake dust & corrosion removal",
          "UV-resistant durable lacquer finish",
          "Great value set discount",
        ],
        href: "/booking",
      },
      {
        id: "pkg-smart-scuff",
        name: "Dent & Scratch SMART Repair",
        tagline: "Bumper scuffs & panel scratch repair",
        price: "From £95",
        priceSubtext: "Depends on area & damage depth",
        popular: false,
        duration: "2 - 3 Hours",
        warranty: "Seamless Paint Blend",
        features: [
          "Bumper corner scuffs & scrapes",
          "Computerized colour matching to paint code",
          "No whole-panel respray needed",
          "Clear coat blending & machine polishing",
          "Preserves original factory finish",
          "Same-day mobile completion",
        ],
        href: "/booking",
      },
    ] as PackageTier[],
  },

  testimonials: {
    heading: "What Our West Midlands Customers Say",
    subheading:
      "Real feedback from car owners across Birmingham, Solihull, and the wider West Midlands.",
    items: [
      {
        id: "test-1",
        name: "Mark Reynolds",
        role: "Vehicle Owner",
        location: "Solihull, West Midlands",
        vehicle: "BMW 3 Series M Sport",
        rating: 5,
        quote:
          "Kerbed two 19-inch diamond-cut alloys against a high kerb in town. You Scuff We Buff came out to my driveway in Solihull and made them look brand new again. Super friendly family team, punctual and reasonably priced. Highly recommended!",
        serviceReceived: "Diamond Cut Alloy Refurbishment",
        initials: "MR",
        isDemoReview: false,
      },
      {
        id: "test-2",
        name: "Sarah Jenkins",
        role: "Car Owner",
        location: "Sutton Coldfield, Birmingham",
        vehicle: "Audi A4 S-Line",
        rating: 5,
        quote:
          "Had a nasty bumper scrape from a supermarket car park. Sent a photo on WhatsApp, got a quote within 30 minutes, and they repaired it at my office car park two days later. You genuinely cannot tell where the damage was.",
        serviceReceived: "Bumper Scuff SMART Repair",
        initials: "SJ",
        isDemoReview: false,
      },
      {
        id: "test-3",
        name: "David Patel",
        role: "Mercedes Owner",
        location: "Harborne, Birmingham",
        vehicle: "Mercedes-Benz C-Class",
        rating: 5,
        quote:
          "Refurbished all four alloys on my C-Class before returning it at lease end. Saved me hundreds compared to the dealer penalties. Fantastic mobile service and really great finish.",
        serviceReceived: "Full Set 4-Wheel Refurbishment",
        initials: "DP",
        isDemoReview: false,
      },
    ] as TestimonialItem[],
  },

  faq: {
    heading: "Frequently Asked Questions",
    subheading: "Everything you need to know about our mobile alloy wheel and SMART repair services.",
    items: [
      {
        id: "faq-1",
        question: "What areas do You Scuff We Buff cover?",
        answer:
          "We provide convenient mobile services throughout Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry, The Black Country, and the wider West Midlands. We travel directly to your home or workplace.",
      },
      {
        id: "faq-2",
        question: "How does the mobile repair service work?",
        answer:
          "Our technician arrives at your location in a fully equipped mobile repair van. We need only safe access to park near your vehicle. Most repairs are completed within 1 to 3 hours, and you can carry on with your day while we work.",
      },
      {
        id: "faq-3",
        question: "Can you repair diamond-cut alloy wheels?",
        answer:
          "Yes, we specialise in diamond-cut alloy wheel repairs as well as standard painted alloys. We restore kerbed edges, clear coat corrosion, and machined faces back to OEM factory condition.",
      },
      {
        id: "faq-4",
        question: "How do I get a free quote?",
        answer:
          "Simply snap a couple of clear photos of the damaged wheel or bodywork scuff in daylight and send them to us via WhatsApp (07448 661 691) or through our website quote form. We'll reply with a fast, no-obligation quote.",
      },
      {
        id: "faq-5",
        question: "What is a SMART repair?",
        answer:
          "SMART stands for Small to Medium Area Repair Technology. It allows us to repair localized damage such as bumper scuffs, stone chips, and minor paint scratches without repainting the entire panel, saving you time and cost while preserving original factory paint.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    headline: "Restore Your Wheels & Bodywork Today.",
    subheadline:
      "Professional mobile alloy wheel refurbishment, diamond cutting, and SMART repairs brought directly to your home or workplace across Birmingham and the West Midlands.",
    primaryCtaText: "Get a Free Quote",
    primaryCtaHref: "/booking",
    secondaryCtaText: "Call 07448 661 691",
    secondaryCtaHref: "tel:+447448661691",
    image: "/images/brand/card-van.jpg",
  },
};
