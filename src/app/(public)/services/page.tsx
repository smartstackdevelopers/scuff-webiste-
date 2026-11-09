import * as React from "react";
import type { Metadata } from "next";
import {
  ServicesHero,
  ServiceGrid,
  ServiceComparison,
  ServicesCTA,
} from "@/features/services";

export const metadata: Metadata = {
  title: "Alloy Wheel Refurbishment & SMART Repairs | You Scuff We Buff",
  description:
    "Professional mobile alloy wheel repair, diamond cutting, dent and scratch SMART repairs across Birmingham and the West Midlands. We come to you at home or work.",
  openGraph: {
    title: "Alloy Wheel Refurbishment & SMART Repairs | You Scuff We Buff",
    description:
      "Professional mobile alloy wheel refurbishment and SMART bodywork repairs across Birmingham, Solihull, Coventry, and the West Midlands.",
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
