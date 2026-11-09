import * as React from "react";
import type { Metadata } from "next";
import {
  PricingHero,
  PricingPackages,
  PackageComparison,
  AddonSelector,
  DealsSection,
  PriceEstimator,
  PricingFAQSection,
} from "@/features/pricing";

export const metadata: Metadata = {
  title: "Pricing & Packages | You Scuff We Buff - Transparent Detailing Rates",
  description:
    "Transparent automotive detailing packages in the UK. Explore Essential Care, Premium Detail, Ultimate Protection, specialized add-ons, and interactive price estimates.",
  openGraph: {
    title: "Pricing & Packages | You Scuff We Buff",
    description:
      "Transparent vehicle detailing packages, machine correction tiers, and ceramic protection rates.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PricingHero />
      <PricingPackages />
      <PackageComparison />
      <AddonSelector showProceedCTA />
      <DealsSection />
      <PriceEstimator />
      <PricingFAQSection />
    </div>
  );
}
