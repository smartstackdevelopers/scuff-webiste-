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
      imageSrc="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2070&auto=format&fit=crop"
      imageAlt="Professional alloy wheel repair and refurbishment workshop You Scuff We Buff"
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
      subtitle="Mobile alloy wheel refurbishment, diamond cutting, and SMART repairs across Birmingham and the West Midlands. We bring professional workshop craftsmanship directly to your home or workplace."
      align="center"
      minHeightClass="min-h-[46vh] sm:min-h-[52vh] md:min-h-[56vh]"
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
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-card/90 hover:bg-primary/10 border border-border hover:border-primary/40 text-[11px] sm:text-xs font-semibold text-foreground/80 hover:text-foreground transition-all backdrop-blur-md shadow-sm group max-w-full"
            >
              <Icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform shrink-0" />
              <span className="truncate">{pill.label}</span>
              <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-primary transition-colors shrink-0" />
            </Link>
          );
        })}
      </motion.div>
    </CinematicVideoHero>
  );
}
