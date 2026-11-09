export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  announcement: {
    enabled: boolean;
    badge: string;
    text: string;
    ctaText?: string;
    ctaHref?: string;
  };
  links: {
    instagram: string;
    tiktok: string;
    whatsapp: string;
    facebook?: string;
    youtube?: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    phoneTel: string;
    phoneRaw: string;
    email: string;
    emailMailto: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    addressPlaceholder: string;
    city: string;
    country: string;
    serviceAreas: string[];
    businessHoursPlaceholder: string;
    whatsAppPlaceholder: {
      number: string;
      displayNumber: string;
      prefilledMessage: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  name: "You Scuff We Buff",
  tagline: "Expert Alloy Wheel Repair & Refurbishment Across the West Midlands",
  description:
    "You Scuff We Buff provides professional mobile alloy wheel refurbishment, diamond cut alloy wheel repairs and dent and scratch SMART repairs across Birmingham and the West Midlands.",
  url: "https://youscuffwebuff.co.uk",
  ogImage: "https://youscuffwebuff.co.uk/og.jpg",
  announcement: {
    enabled: true,
    badge: "MOBILE SERVICE",
    text: "We come to you at home or work across Birmingham & the West Midlands.",
    ctaText: "Get a Free Quote",
    ctaHref: "/booking",
  },
  links: {
    instagram: "https://www.instagram.com/youscuffwebuff/?igsh=MTY4aHU5M252NHBuYQ%3D%3D",
    tiktok: "https://www.tiktok.com/@youscuffwebuff",
    whatsapp: "https://wa.me/447448661691?text=Hello%20You%20Scuff%20We%20Buff%2C%20I%20would%20like%20a%20repair%20quote.",
  },
  contact: {
    phone: "07448 661 691",
    phoneFormatted: "07448 661 691",
    phoneTel: "tel:+447448661691",
    phoneRaw: "+447448661691",
    email: "info@youscuffwebuff.co.uk",
    emailMailto: "mailto:info@youscuffwebuff.co.uk",
    phonePlaceholder: "07448 661 691",
    emailPlaceholder: "info@youscuffwebuff.co.uk",
    addressPlaceholder: "Mobile Service across Birmingham & the West Midlands",
    city: "Birmingham",
    country: "United Kingdom",
    serviceAreas: [
      "Birmingham",
      "Solihull",
      "Wolverhampton",
      "Walsall",
      "Dudley",
      "Sandwell",
      "Coventry",
      "The Black Country",
      "Wider West Midlands",
    ],
    businessHoursPlaceholder: "Mon – Sat: 08:00 – 18:00 | Sunday: By Appointment",
    whatsAppPlaceholder: {
      number: "447448661691",
      displayNumber: "07448 661 691",
      prefilledMessage: "Hello You Scuff We Buff, I would like to get a quote for alloy wheel repair / SMART repair.",
    },
  },
};
