import { ServiceTier } from "@/types";

export const INITIAL_SERVICES: ServiceTier[] = [
  {
    id: "scuff-scratch-repair",
    name: "SMART Scuff & Scratch Repair",
    tagline: "Precision bumper and panel scratch elimination",
    description:
      "Targeted spot repair using OEM-matched paint mixing and infrared curing to erase bumper scuffs, key scratches, and stone chips without respraying the entire panel.",
    durationHours: 3,
    startingPrice: 120,
    popular: true,
    features: [
      "Exact OEM Computerised Colour Match",
      "Seamless Blend into Surrounding Clearcoat",
      "Infrared Rapid Curing Process",
      "Lifetime Workmanship Warranty",
    ],
  },
  {
    id: "paint-correction",
    name: "Multi-Stage Paint Correction",
    tagline: "Restore deep showroom gloss and clarity",
    description:
      "Comprehensive machine compounding and refining to eliminate swirl marks, oxidation, etching, and holograms.",
    durationHours: 6,
    startingPrice: 280,
    popular: false,
    features: [
      "Digital Paint Depth Gauge Readings",
      "Dual-Action Compound & Fine Finishing Polish",
      "Removes up to 90% of Swirls & Defects",
      "Prepares Surface for Ceramic Protection",
    ],
  },
  {
    id: "ceramic-graphene-coating",
    name: "Ceramic & Graphene Shield",
    tagline: "Ultra-hydrophobic 5-year surface protection",
    description:
      "Application of 9H aerospace-grade ceramic or graphene coating, creating a hard sacrificial layer that resists road salt, UV rays, bird droppings, and chemicals.",
    durationHours: 5,
    startingPrice: 450,
    popular: true,
    features: [
      "9H Hardness Certified Protection",
      "Extreme Water Beading (110° Contact Angle)",
      "Chemical & Road Salt Defense",
      "Official Warranty Certificate Issued",
    ],
  },
];
