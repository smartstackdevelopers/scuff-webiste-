import { NavItem } from "@/types";

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
    translationKey: "navHome",
  },
  {
    title: "About Us",
    href: "/about",
    description: "Family-run mobile alloy wheel repair & refurbishment across the West Midlands.",
    translationKey: "navAbout",
  },
  {
    title: "Services",
    href: "/services",
    description: "Professional mobile alloy wheel refurbishment, diamond cutting, and SMART repairs.",
    translationKey: "navServices",
    children: [
      {
        title: "Alloy Wheel Refurbishment",
        href: "/services/alloy-wheel-refurbishment",
        description: "Scuffed, scratched and kerb-damaged alloy wheels repaired at home or work.",
        iconName: "Wrench",
        badge: "CORE",
        translationKey: "svcWheels",
      },
      {
        title: "Diamond Cutting Repair",
        href: "/services/diamond-cutting",
        description: "Specialist diamond cut repair and refinishing methods for precision alloy faces.",
        iconName: "Sparkles",
        badge: "SPECIALIST",
        translationKey: "svcDiamond",
      },
      {
        title: "Dent & Scratch SMART Repair",
        href: "/services/smart-repairs",
        description: "Convenient mobile repair for shopping trolley dings, minor scrapes, and scratches.",
        iconName: "PaintBucket",
        badge: "MOBILE",
        translationKey: "svcSmart",
      },
      {
        title: "Bumper Damage & Paint Scuff",
        href: "/car-painting",
        description: "Bumper corner scuffs, paint marks and minor cosmetic bodywork imperfections.",
        iconName: "PaintBucket",
        badge: "POPULAR",
        translationKey: "svcPainting",
      },
      {
        title: "Mobile Alloy Wheel Repair",
        href: "/services/mobile-repairs",
        description: "We come to you at home or your workplace across Birmingham & the West Midlands.",
        iconName: "Car",
        badge: "WE COME TO YOU",
        translationKey: "svcMobile",
      },
    ],
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "Genuine before and after alloy wheel and SMART repair transformations.",
    translationKey: "navGallery",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description: "Get in touch or request a free quote for alloy wheel or bodywork repairs.",
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
    title: "Technicians & Vans",
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
    title: "Alloy Wheel Refurbishment",
    href: "/services/alloy-wheel-refurbishment",
    translationKey: "svcWheels",
  },
  {
    title: "Diamond Cutting Repair",
    href: "/services/diamond-cutting",
    translationKey: "svcDiamond",
  },
  {
    title: "Dent & Scratch SMART Repair",
    href: "/services/smart-repairs",
    translationKey: "svcSmart",
  },
  {
    title: "Bumper Damage & Paint Scuff",
    href: "/car-painting",
    translationKey: "svcPainting",
  },
  {
    title: "Mobile Alloy Wheel Repair",
    href: "/services/mobile-repairs",
    translationKey: "svcMobile",
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
