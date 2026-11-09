"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Award, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";
import { Button } from "@/components/ui/button";

export function AboutHero() {
  return (
    <CinematicVideoHero
      videoSrc="/videos/hero/master.mp4"
      posterSrc="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop"
      badgeText="Automotive Detailing & Restoration Heritage"
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
      subtitle="Founded on an obsession with microscopic paint perfection. From our climate-controlled studio cleanrooms to high-spec mobile workshop units, we bring Concours-level restoration to every vehicle across the UK."
      align="split"
      minHeightClass="min-h-[64vh] sm:min-h-[72vh]"
      primaryCta={{
        label: "Book Studio Bay",
        href: "/booking",
        variant: "amber",
      }}
      secondaryCta={{
        label: "Our Working Process",
        href: "/about#process",
      }}
      metrics={[
        { label: "Vehicles Restored", value: "5,200+", icon: <CheckCircle2 className="w-4 h-4" /> },
        { label: "Colour Precision", value: "99.4%", icon: <Award className="w-4 h-4" /> },
        { label: "Studio Guarantee", value: "10 Years", icon: <ShieldCheck className="w-4 h-4" /> },
      ]}
    >
      {/* Right Column: Floating Luxury Craftsmanship Specs Card */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative rounded-2xl bg-surface-card/90 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl shadow-luxury-dark space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-primary font-bold">
                Standards of Excellence
              </div>
              <div className="text-base font-bold text-white font-display uppercase tracking-tight">
                Studio & Mobile Clean Bay
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            Accredited
          </span>
        </div>

        <div className="space-y-3.5 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Cleanroom Class 100:</strong> Air-scrubbed, positive-pressure booth prevents microscopic dust during ceramic curing.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Digital Spectrophotometer:</strong> OEM factory colour code reading down to 0.01% pigment balance.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Self-Sufficient Fleet:</strong> Mobile vans carry onboard pure de-ionised water, Honda generators, and pop-up detailing canopies.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">IDA Certified Master Detailers:</strong> Over 12 years of specialized prestige vehicle handling.
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
          <span>UK Studio: Unit 4, Falcon Park</span>
          <Link href="/contact" className="text-primary hover:underline font-semibold flex items-center gap-1">
            <span>Studio Location</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </CinematicVideoHero>
  );
}
