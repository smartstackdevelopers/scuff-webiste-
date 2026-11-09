"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Clock, CheckCircle2, Truck, MapPin } from "lucide-react";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

export function BookingHero() {
  return (
    <CinematicVideoHero
      imageSrc="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop"
      imageAlt="Professional automotive workshop and mobile repair dispatch"
      badgeText="MOBILE ALLOY WHEEL & SMART REPAIR BOOKINGS"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      badgeVariant="electric"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Book a Repair" },
      ]}
      title={
        <>
          REQUEST YOUR <br className="hidden sm:inline" />
          <span className="text-gradient-electric">FREE REPAIR QUOTE.</span>
        </>
      }
      subtitle="Arrange your mobile repair in a few simple steps. Our friendly team comes directly to your home or workplace across Birmingham and the wider West Midlands to restore damaged wheels and bodywork scuffs."
      align="center"
      minHeightClass="min-h-[50vh] sm:min-h-[58vh]"
      metrics={[
        { label: "Upfront Cost", value: "£0 Deposit", icon: <ShieldCheck className="w-4 h-4" /> },
        { label: "Service Mode", value: "100% Mobile", icon: <Truck className="w-4 h-4" /> },
        { label: "Coverage", value: "West Midlands", icon: <MapPin className="w-4 h-4" /> },
      ]}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground font-medium"
      >
        <span className="flex items-center gap-1.5 text-primary">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Family-Run Quality & Care</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="flex items-center gap-1.5 text-primary">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Free Upfront Estimates</span>
        </span>
      </motion.div>
    </CinematicVideoHero>
  );
}
