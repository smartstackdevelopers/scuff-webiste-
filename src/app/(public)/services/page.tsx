import * as React from "react";
import type { Metadata } from "next";
import {
  ServicesHero,
  ServiceGrid,
  ServiceComparison,
  ServicesCTA,
} from "@/features/services";

export const metadata: Metadata = {
  title: "Vehicle Detailing Services & Packages | You Scuff We Buff",
  description:
    "Explore our full suite of professional vehicle detailing services in the UK: paint correction, 9H ceramic coatings, interior steam sanitisation, and regular maintenance.",
  openGraph: {
    title: "Vehicle Detailing Services & Packages | You Scuff We Buff",
    description:
      "Precision vehicle detailing, paint correction, ceramic coatings, and cabin restoration across the UK.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ServicesHero />
      <ServiceGrid />
      <ServiceComparison />
      <ServicesCTA />
    </div>
  );
}
