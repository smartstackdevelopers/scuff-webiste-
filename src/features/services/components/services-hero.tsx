"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, Phone, Clock, ArrowRight, Wrench, PaintBucket, Car } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";
import { siteConfig } from "@/config/site";
import { BRAND_ASSETS } from "@/constants/theme";

const SERVICE_QUICK_PILLS = [
  { label: "Alloy Wheel Refurbishment", href: "/services/alloy-wheel-refurbishment", icon: Wrench },
  { label: "Diamond Cutting Repair", href: "/services/diamond-cutting", icon: Sparkles },
  { label: "Dent & Scratch SMART Repair", href: "/services/smart-repairs", icon: PaintBucket },
  { label: "Bumper Damage & Paint Scuffs", href: "/car-painting", icon: PaintBucket },
  { label: "Mobile Service (We Come To You)", href: "/services/mobile-repairs", icon: Car },
];

export function ServicesHero() {
  return (
    <CinematicVideoHero
      imageSrc={BRAND_ASSETS.wheels}
      imageAlt="Professional alloy wheel repair by You Scuff We Buff"
      badgeText="Mobile Alloy Wheel Repair Across the West Midlands"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      badgeVariant="electric"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services" },
      ]}
      title={
        <>
          OUR ALLOY WHEEL <br className="hidden sm:inline" />
          <span className="text-gradient-electric">REPAIR SERVICES.</span>
        </>
      }
      subtitle="At You Scuff We Buff, we make alloy wheel repairs easy and convenient with our mobile alloy wheel repair service across the West Midlands. Whether you are at home or work, our friendly team will help restore your wheels to their best. We specialise in alloy wheel refurbishment for different makes and models, helping improve the appearance and condition of your wheels."
      align="center"
      minHeightClass="min-h-[64vh] sm:min-h-[72vh]"
      primaryCta={{
        label: "Get a Free Quote Today",
        href: "/booking",
        variant: "amber",
        icon: <Calendar className="w-4 h-4 mr-2" />,
      }}
      secondaryCta={{
        label: `Call ${siteConfig.contact.phone}`,
        href: siteConfig.contact.phoneTel,
        icon: <Phone className="w-4 h-4 mr-2" />,
      }}
      metrics={[
        { label: "Service Model", value: "We Come To You", icon: <Car className="w-4 h-4" /> },
        { label: "Coverage", value: "Birmingham & West Midlands", icon: <Clock className="w-4 h-4" /> },
        { label: "Business Type", value: "Family-Run Specialist", icon: <ShieldCheck className="w-4 h-4" /> },
      ]}
    >
      {/* Category Quick Navigator Pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="pt-4 flex flex-wrap justify-center gap-2.5 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto"
      >
        {SERVICE_QUICK_PILLS.map((pill) => {
          const Icon = pill.icon;
          return (
            <Link
              key={pill.href}
              href={pill.href}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-primary/10 border border-white/[0.08] hover:border-primary/40 text-xs font-semibold text-slate-300 hover:text-white transition-all backdrop-blur-md group"
            >
              <Icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
              <span>{pill.label}</span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </motion.div>
    </CinematicVideoHero>
  );
}
