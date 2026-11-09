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

export interface ServiceArea {
  name: string;
  description: string;
}

export const ABOUT_CONTENT = {
  hero: {
    badge: "FAMILY-RUN MOBILE ALLOY WHEEL & SMART REPAIR SPECIALISTS",
    headline: "About You Scuff We Buff",
    supportingHeading: "Expert Alloy Wheel Repair & Refurbishment Across the West Midlands",
    description:
      "You Scuff We Buff is a family-run business specialising in professional alloy wheel repair and refurbishment. We take pride in restoring damaged alloy wheels to their original condition, combining skilled workmanship with friendly and reliable customer service. Serving Birmingham and the wider West Midlands, we provide convenient mobile alloy wheel repairs and SMART bodywork repairs at your home or workplace. Our aim is simple: deliver quality repairs, excellent finishes and a hassle-free service that customers can rely on.",
    image: {
      url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
      alt: "Professional automotive workshop showing alloy wheel refurbishment and vehicle care",
    },
    metrics: [
      { label: "Service Mode", value: "100% Mobile" },
      { label: "Coverage", value: "West Midlands" },
      { label: "Quotes", value: "Free & Fast" },
    ],
  },

  whoWeAre: {
    badge: "OUR HERITAGE & MISSION",
    heading: "Who We Are",
    subheading: "A family-run team dedicated to honest craftsmanship and outstanding finishes.",
    paragraphs: [
      "You Scuff We Buff is an independent, family-run mobile alloy wheel repair and refurbishment specialist. Founded on a passion for automotive excellence and straightforward, friendly customer care, we set out to make wheel and bodywork repairs seamless, cost-effective, and convenient for car owners throughout the West Midlands.",
      "Rather than losing your car for days at an impersonal body shop or paying inflated replacement costs at dealerships, our skilled mobile technicians bring professional refurbishment directly to your doorstep. Whether you are at home or at work, we restore kerbed, scratched, scuffed, and oxidized wheels right outside your door.",
      "Every vehicle we work on is treated with the care and precision we would demand on our own family cars. From precision diamond-cut alloy repairs to seamless dent and paint scuff SMART repairs, we deliver showroom-grade results with transparent, competitive pricing and zero hassle.",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2070&auto=format&fit=crop",
      alt: "Professional technician carrying out precision wheel and bodywork restoration",
    },
    stats: [
      { label: "Family Run", value: "100% Dedicated" },
      { label: "Service Area", value: "West Midlands Wide" },
      { label: "Customer Rating", value: "5-Star Service" },
    ],
  },

  commitmentToQuality: {
    badge: "UNCOMPROMISING QUALITY",
    title: "Our Commitment to Quality",
    statement:
      "We believe that exceptional results come from combining high-grade materials, proven specialist techniques, and genuine pride in workmanship.",
    highlight: "Quality materials, precise colour matching, and finishes built to withstand daily British roads.",
    points: [
      {
        title: "Premium Materials & Lacquers",
        desc: "We exclusively use professional automotive-grade primers, basecoats, and UV-resistant protective lacquers designed for lasting durability and brake dust resistance.",
      },
      {
        title: "Meticulous Attention to Detail",
        desc: "Every scuff, scratch, and kerbed edge is thoroughly prepped, smoothed, primed, and precision-blended to achieve an OEM-level finish.",
      },
      {
        title: "Customer Satisfaction First",
        desc: "We take the time to inspect every repair alongside you before completion, ensuring you are completely happy with the results.",
      },
    ],
  },

  mobileConvenience: {
    badge: "MOBILE CONVENIENCE",
    title: "Convenient Mobile Repairs — We Come To You",
    description:
      "Say goodbye to the inconvenience of dropping off your car, arranging lifts, or waiting days for repairs. Our fully equipped mobile repair units come directly to your home or workplace across Birmingham and the West Midlands.",
    points: [
      "Repairs carried out at your driveway, garage, or office parking space",
      "Self-contained mobile repair units with professional tools and equipment",
      "Most wheel and SMART scuff repairs completed in just a few hours",
      "Zero disruption to your daily schedule—carry on with your day while we work",
    ],
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
  },

  expertise: [
    {
      id: "alloy-wheel-refurbishment",
      title: "Alloy Wheel Refurbishment",
      subtitle: "Full Kerb Damage, Scuff & Corrosion Restoration",
      description:
        "Professional mobile repair for kerbed, scratched, chipped, and corroded alloy wheels. We restore the smooth profile and apply durable, factory-grade paint and clear protective lacquer.",
      features: [
        "Complete removal of unsightly kerbing and rash",
        "High-grade automotive primer and durable finish coat",
        "Protective lacquer shield against brake dust and road salt",
      ],
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
      badge: "Core Speciality",
      href: "/services/alloy-wheel-refurbishment",
    },
    {
      id: "diamond-cutting",
      title: "Diamond Cutting Repair",
      subtitle: "Precision Diamond-Cut Wheel Face Restoration",
      description:
        "Specialist restoration for premium diamond-cut wheels with high-precision edge repair, clear coat re-application, and OEM factory-standard gloss finish.",
      features: [
        "Restores two-tone and machine-faced alloy profiles",
        "Removes milky spider-web corrosion and edge scuffs",
        "Ultra-clear UV-stable protective lacquer finish",
      ],
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
      badge: "Precision Finish",
      href: "/services/diamond-cutting",
    },
    {
      id: "smart-repairs",
      title: "Dent & Scratch SMART Repair",
      subtitle: "Localized Small-to-Medium Area Repair",
      description:
        "Targeted repair technology focusing specifically on the damaged area rather than respraying whole panels, keeping repairs swift, affordable, and seamless.",
      features: [
        "Computerized digital paint matching to manufacturer codes",
        "Preserves original factory finish across untouched panels",
        "Completed within hours at your home or workplace",
      ],
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop",
      badge: "Fast Turnaround",
      href: "/services/smart-repairs",
    },
    {
      id: "bumper-paint-scuff",
      title: "Bumper Damage & Paint Scuff",
      subtitle: "Seamless Corner Scuff & Plastic Bumper Repair",
      description:
        "Restore scratched bumper corners, parking scuffs, and chipped bodywork back to a flawless, uniform finish without costly bumper replacement.",
      features: [
        "Repairs textured and gloss plastic bumper sections",
        "Exact colour blending seamlessly into adjacent bodywork",
        "Protects against rust, peeling, and long-term weathering",
      ],
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
      badge: "Same-Day Service",
      href: "/car-painting",
    },
  ] as ServiceExpertise[],

  whyChooseUs: [
    {
      id: "feature-1",
      title: "Friendly Family-Run Service",
      description:
        "We are an independent, family-operated business that genuinely cares about our reputation, delivering personal service and honest advice on every job.",
      iconName: "ShieldCheck",
    },
    {
      id: "feature-2",
      title: "Skilled & Experienced Technicians",
      description:
        "Our repair specialists bring years of hands-on expertise in alloy wheel refurbishments, diamond cut repairs, and precision SMART paint blending.",
      iconName: "Award",
    },
    {
      id: "feature-3",
      title: "Convenient Mobile Service",
      description:
        "We come directly to your home or workplace across the West Midlands, saving you time and avoiding the hassle of visiting a body shop.",
      iconName: "Wrench",
    },
    {
      id: "feature-4",
      title: "Honest Pricing & Free Quotes",
      description:
        "Clear, upfront quotes with no hidden charges. Simply send us photos of the damage via WhatsApp or our quote form for a fast, free estimate.",
      iconName: "CheckCircle2",
    },
    {
      id: "feature-5",
      title: "High-Quality Finishes",
      description:
        "We use professional automotive-grade coatings and high-durability lacquers to ensure your wheels and panels look exceptional and stay protected.",
      iconName: "Search",
    },
    {
      id: "feature-6",
      title: "Fast & Reliable Service",
      description:
        "Most mobile repairs are completed in just a few hours on the same day, getting you back on the road safely and without delay.",
      iconName: "Shield",
    },
  ] as AboutFeature[],

  serviceAreas: [
    { name: "Birmingham", description: "Central, South, North & East Birmingham suburbs" },
    { name: "Solihull", description: "Shirley, Knowle, Dorridge & surrounding districts" },
    { name: "Wolverhampton", description: "City centre, Tettenhall, Penn & neighbouring localities" },
    { name: "Walsall", description: "Aldridge, Bloxwich, Streetly & borough areas" },
    { name: "Dudley", description: "Stourbridge, Halesowen, Brierley Hill & surrounding area" },
    { name: "Sandwell", description: "West Bromwich, Oldbury, Smethwick, Rowley Regis" },
    { name: "Coventry", description: "Full Coventry coverage and adjoining commuter towns" },
    { name: "The Black Country", description: "Comprehensive mobile coverage throughout all boroughs" },
    { name: "West Midlands", description: "Wider West Midlands region and neighbouring postcodes" },
  ] as ServiceArea[],

  process: [
    {
      stepNumber: "01",
      title: "Send Us Photos",
      description:
        "Take a couple of clear photos of the wheel or bodywork damage and send them to us via WhatsApp or our simple online quote form.",
      iconName: "Search",
    },
    {
      stepNumber: "02",
      title: "Receive Free Quote",
      description:
        "We review the photos promptly and provide a transparent, competitive quote with no obligation and no hidden extras.",
      iconName: "Sliders",
    },
    {
      stepNumber: "03",
      title: "We Come To You",
      description:
        "Our fully equipped mobile unit arrives at your home or workplace at a time that suits you, carrying out the repair cleanly on site.",
      iconName: "Wrench",
    },
    {
      stepNumber: "04",
      title: "Inspect & Drive Away",
      description:
        "We walk around the finished wheel or panel together so you can inspect the flawless finish before any payment is made.",
      iconName: "CheckCircle2",
    },
  ] as ProcessStep[],

  trustCredentials: [
    { title: "Service Model", value: "100% Mobile", desc: "Repairs carried out at your home or workplace" },
    { title: "Service Area", value: "West Midlands", desc: "Birmingham, Solihull, Black Country & Coventry" },
    { title: "Quotes", value: "100% Free", desc: "No-obligation WhatsApp & online photo estimates" },
    { title: "Turnaround", value: "Same Day", desc: "Most repairs completed in a matter of hours" },
  ],

  cta: {
    headline: "Restore Your Wheels & Bodywork Today.",
    subheadline:
      "Contact You Scuff We Buff for friendly advice and a free, no-obligation quote. Our mobile team is ready to visit your home or workplace across Birmingham and the West Midlands.",
    primaryBtn: {
      text: "Get a Free Quote",
      href: "/booking",
    },
    secondaryBtn: {
      text: "Call Our Team",
      href: "tel:+447448661691",
    },
  },
};
