"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Award, CheckCircle2, ArrowRight, Calendar, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";
import { ABOUT_CONTENT } from "../data/about-content";

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
          CRAFTSMANSHIP BEYOND <br className="hidden sm:inline" />
          <span className="text-gradient-electric">CONVENTIONAL DETAILING.</span>
        </>
      }
      subtitle={hero.description}
      align="split"
      minHeightClass="min-h-[66vh] sm:min-h-[74vh]"
      primaryCta={{
        label: "Book Studio Bay",
        href: "/booking",
        variant: "amber",
        icon: <Calendar className="w-4 h-4 mr-2" />,
      }}
      secondaryCta={{
        label: "Explore Working Standards",
        href: "#standards",
        icon: <Wrench className="w-4 h-4 mr-2" />,
      }}
      metrics={[
        { label: "Motor Trade Cover", value: "£5,000,000", icon: <ShieldCheck className="w-4 h-4" /> },
        { label: "Paint Depth Audit", value: "100% Verified", icon: <CheckCircle2 className="w-4 h-4" /> },
        { label: "Ceramic Warranty", value: "Up to 5 Years", icon: <Award className="w-4 h-4" /> },
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
                Standards of Excellence
              </div>
              <div className="text-base font-bold text-white font-display uppercase tracking-tight">
                Studio Clean Bay & UK Mobile Units
              </div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            Accredited
          </span>
        </div>

        <div className="space-y-3.5 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Cleanroom Class 100 Bay:</strong> Air-scrubbed studio environment prevents micro-dust settling during ceramic coating curing.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Ultrasonic Paint Thickness:</strong> Continuous digital measurement ensures safe multi-stage compounding without clearcoat danger.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Self-Sufficient Mobile Fleet:</strong> Vans carry onboard Honda generators, 500L pure de-ionised water, and all-weather pop-up bay canopies.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Accredited Master Detailers:</strong> Over a decade of specialized prestige, supercar, and classic vehicle preservation.
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
          <span>UK Studio: Unit 4, Falcon Park</span>
          <Link href="/contact" className="text-primary hover:underline font-semibold flex items-center gap-1 group">
            <span>Find Studio Bay</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </CinematicVideoHero>
  );
}
