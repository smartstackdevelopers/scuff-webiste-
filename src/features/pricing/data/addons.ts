import { ServiceAddon } from "../types/pricing";

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: "leather-conditioning",
    title: "Leather Conditioning",
    shortDescription:
      "Deep pore cleanser and natural lanolin balm feed to restore factory matte softness and prevent cracking.",
    demoPrice: 45,
    currency: "£",
    duration: "+ 45 mins",
    iconName: "ShieldCheck",
    category: "Interior",
    popular: true,
  },
  {
    id: "engine-bay-cleaning",
    title: "Engine Bay Cleaning",
    shortDescription:
      "Safe low-pressure dry steam degreasing of engine covers, rubbers, and under-bonnet plastics with satin dressing.",
    demoPrice: 55,
    currency: "£",
    duration: "+ 45 mins",
    iconName: "Wrench",
    category: "Exterior",
  },
  {
    id: "headlight-restoration",
    title: "Headlight Restoration",
    shortDescription:
      "Wet-sanding oxidation and machine jewelling cloudy polycarbonate lenses, finished with UV ceramic coat.",
    demoPrice: 60,
    currency: "£",
    duration: "+ 1 hour",
    iconName: "Sun",
    category: "Exterior",
    popular: true,
  },
  {
    id: "pet-hair-removal",
    title: "Pet Hair Removal",
    shortDescription:
      "Specialist rubber blade agitation and compressed air blowout for heavily embedded animal fur in carpet pile.",
    demoPrice: 35,
    currency: "£",
    duration: "+ 30 mins",
    iconName: "Sparkles",
    category: "Interior",
  },
  {
    id: "odour-treatment",
    title: "Odour Treatment (Ozone Shock)",
    shortDescription:
      "Medical-grade ozone gas machine sanitisation cycle to eradicate persistent tobacco, damp, and bacterial smells.",
    demoPrice: 40,
    currency: "£",
    duration: "+ 40 mins",
    iconName: "Wind",
    category: "Interior",
  },
  {
    id: "extra-paint-protection",
    title: "Extra Paint Protection (SiO2 Layer)",
    shortDescription:
      "Supplementary high-concentration ceramic SiO2 spray topper providing 12 months additional hydrophobic resistance.",
    demoPrice: 75,
    currency: "£",
    duration: "+ 45 mins",
    iconName: "ShieldAlert",
    category: "Protection",
    popular: true,
  },
];
