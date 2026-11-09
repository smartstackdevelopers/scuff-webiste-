"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Calculator, CheckCircle2, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

const TIER_QUICK_JUMP = [
  { name: "Bronze", price: "£149", desc: "Essential Maintenance" },
  { name: "Silver", price: "£299", desc: "Single-Stage Polish" },
  { name: "Gold", price: "£599", desc: "Multi-Stage + 3Yr Ceramic", popular: true },
  { name: "Platinum", price: "£1,199", desc: "Concours 5Yr Graphene" },
];

export function PricingHero() {
  return (
    <CinematicVideoHero
      videoSrc="/videos/hero/02-wheel-fit.mp4"
      posterSrc="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop"
      badgeText="Transparent UK Detailing & Repair Rates"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      badgeVariant="electric"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Pricing & Packages" },
      ]}
      title={
        <>
          TRANSPARENT INVESTMENT. <br className="hidden sm:inline" />
          <span className="text-gradient-electric">UNCOMPROMISING CARE.</span>
        </>
      }
      subtitle="Honest, fixed rates with no hidden mobile surcharges or fine-print upcharges. Clear deliverables, digital vehicle condition check, and guaranteed studio standards on every booking."
      align="center"
      minHeightClass="min-h-[46vh] sm:min-h-[52vh] md:min-h-[56vh]"
      primaryCta={{
        label: "View All Packages",
        href: "#packages",
        variant: "glow",
        icon: <Sparkles className="w-4 h-4 mr-2" />,
      }}
      secondaryCta={{
        label: "Custom Price Estimator",
        href: "#estimator",
        icon: <Calculator className="w-4 h-4 mr-2" />,
      }}
      metrics={[
        { label: "Mobile Surcharges", value: "£0 Hidden", icon: <CheckCircle2 className="w-4 h-4" /> },
        { label: "Payment Options", value: "Card & BACS", icon: <CreditCard className="w-4 h-4" /> },
        { label: "Insured Protection", value: "£5M Guarantee", icon: <ShieldCheck className="w-4 h-4" /> },
      ]}
    >
      {/* Quick Tier Jump Pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-4xl xl:max-w-5xl mx-auto"
      >
        {TIER_QUICK_JUMP.map((tier) => (
          <a
            key={tier.name}
            href={`#packages`}
            className={`p-3 rounded-xl border text-center transition-all backdrop-blur-md shadow-sm ${
              tier.popular
                ? "bg-primary/10 border-primary/50 shadow-glow-sm hover:border-primary"
                : "bg-card/90 border-border hover:border-primary/40"
            }`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider font-display">
                {tier.name}
              </span>
              {tier.popular && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-primary text-black font-extrabold uppercase">
                  Top
                </span>
              )}
            </div>
            <div className="text-lg font-black text-foreground font-display mt-0.5">
              {tier.price}
            </div>
            <div className="text-[10px] text-muted-foreground truncate">
              {tier.desc}
            </div>
          </a>
        ))}
      </motion.div>
    </CinematicVideoHero>
  );
}
