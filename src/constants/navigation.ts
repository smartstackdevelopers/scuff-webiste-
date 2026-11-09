import { NavItem } from "@/types";

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
    translationKey: "navHome",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about our precision craftsmanship and master technician standards.",
    translationKey: "navAbout",
  },
  {
    title: "Services",
    href: "/services",
    description: "Complete vehicle reconditioning, paint restoration, and protection tiers.",
    translationKey: "navServices",
    children: [
      {
        title: "Car Painting & SMART Repairs",
        href: "/car-painting",
        description: "Bumper scuffs, key scratch leveling, and OEM computerized paint matching.",
        iconName: "PaintBucket",
        badge: "HOT",
        translationKey: "svcPainting",
      },
      {
        title: "Car Maintenance & Wheels",
        href: "/car-maintenance",
        description: "CNC diamond-cut wheel lathe refurb, brake calipers, and lease return audit.",
        iconName: "Wrench",
        badge: "PREMIUM",
        translationKey: "svcMaintenancePage",
      },
      {
        title: "Alloy Wheel Refurbishment",
        href: "/services/alloy-wheel-refurbishment",
        description: "Kerb damage, scuffs, scratches and colour restoration for alloy wheels.",
        iconName: "Wrench",
        badge: "CORE",
        translationKey: "svcWheels",
      },
      {
        title: "Smart Repairs",
        href: "/services/smart-repairs",
        description: "Localised cosmetic repairs for scuffs, scratches and minor paint damage.",
        iconName: "Sparkles",
        badge: "NEW",
        translationKey: "svcSmart",
      },
      {
        title: "Mobile Repair Services",
        href: "/services/mobile-repairs",
        description: "Suitable repairs at your home, office or workplace via our mobile van.",
        iconName: "Car",
        badge: "WE COME TO YOU",
        translationKey: "svcMobile",
      },
      {
        title: "Interior Detailing",
        href: "/services/interior-detailing",
        description: "Deep steam extraction, leather conditioning, and anti-bacterial fogging.",
        iconName: "Sparkles",
        translationKey: "svcInterior",
      },
      {
        title: "Exterior Detailing",
        href: "/services/exterior-detailing",
        description: "Safe multi-bucket wash, chemical de-ironing, clay bar, and paint gloss enhancement.",
        iconName: "Car",
        translationKey: "svcExterior",
      },
      {
        title: "Paint Correction",
        href: "/services/paint-correction",
        description: "Multi-stage machine compounding to eliminate swirl marks, scratches, and haze.",
        iconName: "Wrench",
        badge: "POPULAR",
        translationKey: "svcPaint",
      },
      {
        title: "Ceramic Coating",
        href: "/services/ceramic-coating",
        description: "9H certified graphene and ceramic glass shield with 5-year guarantee.",
        iconName: "ShieldCheck",
        badge: "5-YEAR SEAL",
        translationKey: "svcCeramic",
      },
      {
        title: "Full Vehicle Detailing",
        href: "/services/full-vehicle-detailing",
        description: "Complete interior and exterior detailing for a showroom finish.",
        iconName: "Zap",
        translationKey: "svcFull",
      },
      {
        title: "Maintenance Detailing",
        href: "/services/maintenance-detailing",
        description: "Regular care to preserve ceramic coatings and keep your vehicle pristine.",
        iconName: "PlusCircle",
        translationKey: "svcMaintenance",
      },
    ],
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "Before and after vehicle transformations across supercars, saloons, and SUVs.",
    translationKey: "navGallery",
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Transparent UK mobile and studio detailing packages.",
    translationKey: "navPricing",
  },
  {
    title: "FAQ",
    href: "/faq",
    description: "Common questions regarding ceramic coatings, paint correction, and guarantees.",
    translationKey: "navFaq",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch or book an in-person or mobile paint inspection.",
    translationKey: "navContact",
  },
];

export const CUSTOMER_NAV_ITEMS: NavItem[] = [
  {
    title: "Overview",
    href: "/customer/dashboard",
    iconName: "LayoutDashboard",
  },
  {
    title: "My Bookings",
    href: "/customer/bookings",
    iconName: "Calendar",
  },
  {
    title: "Vehicle Garage",
    href: "/customer/profile",
    iconName: "Car",
  },
  {
    title: "Invoices & Receipts",
    href: "/customer/invoices",
    iconName: "FileText",
  },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    iconName: "LayoutDashboard",
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    iconName: "Calendar",
    badge: "Live",
  },
  {
    title: "Customers",
    href: "/admin/customers",
    iconName: "Users",
  },
  {
    title: "Services Catalog",
    href: "/admin/services",
    iconName: "Wrench",
  },
  {
    title: "Technicians & Bays",
    href: "/admin/staff",
    iconName: "Shield",
  },
  {
    title: "Reports & Analytics",
    href: "/admin/reports",
    iconName: "BarChart3",
  },
];

export const FOOTER_SERVICES: NavItem[] = [
  {
    title: "Car Painting & SMART Repairs",
    href: "/car-painting",
    translationKey: "svcPainting",
  },
  {
    title: "Car Maintenance & Wheels",
    href: "/car-maintenance",
    translationKey: "svcMaintenancePage",
  },
  {
    title: "Alloy Wheel Refurbishment",
    href: "/services/alloy-wheel-refurbishment",
    translationKey: "svcWheels",
  },
  {
    title: "Smart Repairs",
    href: "/services/smart-repairs",
    translationKey: "svcSmart",
  },
  {
    title: "Mobile Repair Services",
    href: "/services/mobile-repairs",
    translationKey: "svcMobile",
  },
  {
    title: "Interior Detailing",
    href: "/services/interior-detailing",
    translationKey: "svcInterior",
  },
  {
    title: "Exterior Detailing",
    href: "/services/exterior-detailing",
    translationKey: "svcExterior",
  },
  {
    title: "Paint Correction",
    href: "/services/paint-correction",
    translationKey: "svcPaint",
  },
  {
    title: "Ceramic Coating",
    href: "/services/ceramic-coating",
    translationKey: "svcCeramic",
  },
  {
    title: "Full Vehicle Detailing",
    href: "/services/full-vehicle-detailing",
    translationKey: "svcFull",
  },
  {
    title: "Maintenance Detailing",
    href: "/services/maintenance-detailing",
    translationKey: "svcMaintenance",
  },
];

export const FOOTER_LEGAL: NavItem[] = [
  {
    title: "Privacy Policy",
    href: "/privacy",
    translationKey: "legalPrivacy",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
    translationKey: "legalTerms",
  },
  {
    title: "Cookie Policy",
    href: "/cookies",
    translationKey: "legalCookies",
  },
];
