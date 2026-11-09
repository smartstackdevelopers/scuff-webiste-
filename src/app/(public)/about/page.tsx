import * as React from "react";
import type { Metadata } from "next";
import {
  AboutHero,
  StorySection,
  AboutExpertise,
  MissionVision,
  WhyChooseUs,
  OurProcess,
  ServiceAreasSection,
  TrustCredibility,
  AboutCTA,
} from "@/features/about";

export const metadata: Metadata = {
  title: "About You Scuff We Buff | Alloy Wheel Repair West Midlands",
  description:
    "You Scuff We Buff is a family-run business specialising in professional mobile alloy wheel refurbishment, diamond cutting, and dent & scratch SMART repairs across Birmingham and the West Midlands.",
  openGraph: {
    title: "About You Scuff We Buff | Alloy Wheel Repair West Midlands",
    description:
      "Family-run mobile alloy wheel repair and refurbishment across Birmingham, Solihull, Wolverhampton, Coventry and the West Midlands.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      <AboutHero />
      <StorySection />
      <AboutExpertise />
      <MissionVision />
      <WhyChooseUs />
      <OurProcess />
      <ServiceAreasSection />
      <TrustCredibility />
      <AboutCTA />
    </div>
  );
}
