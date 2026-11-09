import * as React from "react";
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Hero Section */}
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

      {/* 15. Contact Section & Studio Map */}
      <HomeContactSection />

      {/* Final Studio & Dispatch Banner */}
      <CtaSection />
    </div>
  );
}
