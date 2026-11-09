"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, Award, Clock, ArrowRight, Layers, PaintBucket, Wrench, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

const SERVICE_QUICK_PILLS = [
  { label: "Paint Correction", href: "/services/paint-correction", icon: Layers },
  { label: "Ceramic Coatings", href: "/services/ceramic-coating", icon: Sparkles },
  { label: "SMART Scuff Repairs", href: "/services/smart-repairs", icon: PaintBucket },
  { label: "Alloy Wheel Refurb", href: "/services/alloy-wheel-refurbishment", icon: Wrench },
  { label: "Interior Detailing", href: "/services/interior-detailing", icon: Sparkle },
];

export function ServicesHero() {
  return (
    <CinematicVideoHero
      videoSrc="/videos/hero/06-final-reveal.mp4"
      posterSrc="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2000&auto=format&fit=crop"
      badgeText="Certified Automotive Detailing & Preservation"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      badgeVariant="electric"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services Catalog" },
      ]}
      title={
        <>
          CRAFTSMANSHIP FOR EVERY CURVE. <br className="hidden sm:inline" />
          <span className="text-gradient-electric">TAILORED DETAILING & REPAIR.</span>
        </>
      }
      subtitle="From surgical multi-stage paint correction and certified 9H ceramic glass protection to computerized SMART bumper scuff repairs and CNC diamond-cut alloy wheels. Select your vehicle treatment below."
      align="center"
      minHeightClass="min-h-[64vh] sm:min-h-[72vh]"
      primaryCta={{
        label: "Book Service Bay",
        href: "/booking",
        variant: "amber",
        icon: <Calendar className="w-4 h-4 mr-2" />,
      }}
      secondaryCta={{
        label: "View Transparent Pricing",
        href: "/pricing",
      }}
      metrics={[
        { label: "Fully Insured", value: "£5M Cover", icon: <ShieldCheck className="w-4 h-4" /> },
        { label: "Ceramic Warranty", value: "Up to 5 Yrs", icon: <Award className="w-4 h-4" /> },
        { label: "Studio & Mobile", value: "100% Mobile Ready", icon: <Clock className="w-4 h-4" /> },
      ]}
    >
      {/* Category Quick Navigator Pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="pt-4 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
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
