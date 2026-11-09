import * as React from "react";
import type { Metadata } from "next";
import {
  HeroSection,
  HomeAboutSection,
  StatsSection,
  ServicesSection,
  HomeDetailingSection,
  HomeCarPaintingSection,
  HomeMaintenanceSection,
  BeforeAfterSection,
  WhyChooseUs,
  HowItWorks,
  PackagesSection,
  TestimonialsSection,
  HomeBookingSection,
  FaqSection,
  HomeContactSection,
  CtaSection,
} from "@/features/home";

export const metadata: Metadata = {
  title: "You Scuff We Buff | Mobile Alloy Wheel Repair Birmingham",
  description:
    "You Scuff We Buff provides professional mobile alloy wheel refurbishment, diamond cutting, and dent & scratch SMART repairs across Birmingham and the West Midlands. We come to your home or workplace.",
  openGraph: {
    title: "You Scuff We Buff | Mobile Alloy Wheel Repair Birmingham",
    description:
      "Family-run mobile alloy wheel repair and refurbishment across Birmingham, Solihull, Wolverhampton, Coventry & the West Midlands.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Hero Section - HOMEPAGE HERO PRESERVED EXACTLY */}
      <HeroSection />

      {/* 3. About the Business */}
      <HomeAboutSection />

      {/* Performance Metrics Strip */}
      <StatsSection />

      {/* 4. Our Automotive Services Overview */}
      <ServicesSection />

      {/* 5. Car Detailing Services Deep-Dive */}
      <HomeDetailingSection />

      {/* 6. Professional Car Painting & SMART Repairs */}
      <HomeCarPaintingSection />

      {/* 7. Car Maintenance & Alloy Wheel Refurbishment */}
      <HomeMaintenanceSection />

      {/* 8. Interactive Before & After Showcase */}
      <BeforeAfterSection />

      {/* 9. Why Choose Us (Workshop & Mobile Van) */}
      <WhyChooseUs />

      {/* 10. Our Working Process (4 Steps) */}
      <HowItWorks />

      {/* 11. Service Packages & Transparent Pricing */}
      <PackagesSection />

      {/* 12. Customer Reviews & 5-Star Ratings */}
      <TestimonialsSection />

      {/* 13. Appointment Booking Section */}
      <HomeBookingSection />

      {/* 14. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 15. Contact Section & Mobile Coverage */}
      <HomeContactSection />

      {/* Final Mobile Dispatch Banner */}
      <CtaSection />
    </div>
  );
}
