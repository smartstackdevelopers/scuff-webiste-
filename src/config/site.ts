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
    facebook: string;
    tiktok: string;
    youtube?: string;
    whatsapp?: string;
  };
  contact: {
    phonePlaceholder: string;
    emailPlaceholder: string;
    addressPlaceholder: string;
    city: string;
    country: string;
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
  tagline: "Quality Fast Repairs Right When You Need Them",
  description:
    "Premium mobile alloy wheel refurbishment, diamond cutting, dent and scratch smart repair, and automotive detailing across the UK.",
  url: "https://youscuffwebuff.co.uk",
  ogImage: "https://youscuffwebuff.co.uk/og.jpg",
  announcement: {
    enabled: true,
    badge: "SPRING OFFER",
    text: "Complimentary interior decontamination with any 5-Year Ceramic Coating package.",
    ctaText: "View Packages",
    ctaHref: "/pricing",
  },
  links: {
    instagram: "https://instagram.com/placeholder-youscuffwebuff",
    facebook: "https://facebook.com/placeholder-youscuffwebuff",
    tiktok: "https://tiktok.com/@placeholder-youscuffwebuff",
    youtube: "https://youtube.com/@placeholder-youscuffwebuff",
    whatsapp: "https://wa.me/447445661601?text=Hello%20You%20Scuff%20We%20Buff%2C%20I%20would%20like%20a%20quote",
  },
  contact: {
    phonePlaceholder: "07445 661601",
    emailPlaceholder: "bookings@youscuffwebuff.co.uk",
    addressPlaceholder: "Mobile service across the UK",
    city: "London",
    country: "United Kingdom",
    businessHoursPlaceholder: "Mon – Fri: 08:00 – 18:00 | Sat: 09:00 – 16:00 | Sun: Closed",
    whatsAppPlaceholder: {
      number: "447445661601",
      displayNumber: "07445 661601",
      prefilledMessage: "Hello You Scuff We Buff, I would like to inquire about a vehicle repair quote.",
    },
  },
};
