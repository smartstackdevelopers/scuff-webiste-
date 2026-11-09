"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Award, CheckCircle2, ArrowRight, Calendar, Phone, MapPin, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";
import { ABOUT_CONTENT } from "../data/about-content";
import { siteConfig } from "@/config/site";

export function AboutHero() {
  const { hero } = ABOUT_CONTENT;

  return (
    <CinematicVideoHero
      imageSrc={hero.image.url}
      imageAlt={hero.image.alt}
      badgeText={hero.badge}
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      badgeVariant="electric"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About Us" },
      ]}
      title={
        <>
          ABOUT <br className="hidden sm:inline" />
          <span className="text-gradient-electric">YOU SCUFF WE BUFF</span>
        </>
      }
      subtitle={hero.description}
      align="split"
      minHeightClass="min-h-[66vh] sm:min-h-[74vh]"
      primaryCta={{
        label: "Get a Free Quote",
        href: "/booking",
        variant: "amber",
        icon: <Calendar className="w-4 h-4 mr-2" />,
      }}
      secondaryCta={{
        label: `Call ${siteConfig.contact.phone}`,
        href: `tel:${siteConfig.contact.phoneRaw}`,
        icon: <Phone className="w-4 h-4 mr-2" />,
      }}
      metrics={[
        { label: "Service Mode", value: "100% Mobile", icon: <Wrench className="w-4 h-4" /> },
        { label: "Coverage", value: "West Midlands", icon: <MapPin className="w-4 h-4" /> },
        { label: "Quotes", value: "Free & Fast", icon: <CheckCircle2 className="w-4 h-4" /> },
      ]}
    >
      {/* Right Column: Floating Technical Excellence Plate */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative rounded-3xl bg-[#0C0F15]/95 border border-white/[0.12] p-6 sm:p-8 backdrop-blur-2xl shadow-luxury-dark space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-glow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-primary font-bold">
                Family-Run Specialist
              </div>
              <div className="text-base font-bold text-white font-display uppercase tracking-tight">
                Mobile Alloy & SMART Repairs
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            West Midlands
          </span>
        </div>

        <div className="space-y-3.5 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">We Come To You:</strong> Mobile repairs carried out at your home or workplace across Birmingham & West Midlands.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Alloy Wheel Refurbishment:</strong> Restores kerbed, scratched, scuffed, and corroded wheels to showroom condition.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Diamond Cutting & SMART Repairs:</strong> Precision diamond-cut face repairs and dent & scratch bodywork blending.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Honest Pricing & Fast Quotes:</strong> Free estimates with no hidden fees—send photos on WhatsApp for instant pricing.
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Direct phone line:</span>
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.contact.phone}</span>
          </a>
        </div>
      </motion.div>
    </CinematicVideoHero>
  );
}
