import * as React from "react";
import type { Metadata } from "next";
import {
  AboutHero,
  StorySection,
  MissionVision,
  AboutExpertise,
  WorkshopShowcase,
  WhyChooseUs,
  OurProcess,
  TrustCredibility,
  AboutCTA,
} from "@/features/about";

export const metadata: Metadata = {
  title: "About Us | You Scuff We Buff - Master Vehicle Care & Detailing",
  description:
    "Learn about You Scuff We Buff—delivering professional vehicle care, precision paint correction, and ceramic protection across the UK.",
  openGraph: {
    title: "About Us | You Scuff We Buff",
    description:
      "Precision vehicle detailing, paint correction, and ceramic coating craftsmanship in the UK.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07080A]">
      <AboutHero />
      <StorySection />
      <MissionVision />
      <AboutExpertise />
      <WorkshopShowcase />
      <WhyChooseUs />
      <OurProcess />
      <TrustCredibility />
      <AboutCTA />
    </div>
  );
}
