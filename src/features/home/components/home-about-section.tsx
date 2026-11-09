"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Wrench,
  Award,
  ArrowRight,
  CheckCircle2,
  Gauge,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND_ASSETS } from "@/constants/theme";

export function HomeAboutSection() {
  return (
    <section
      id="about-business"
      className="py-20 md:py-28 relative overflow-hidden bg-surface-secondary border-t border-border/40"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Media Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden border border-white/[0.08] shadow-luxury-dark group">
              <Image
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop"
                alt="Master technician conducting precision dual action machine paint polishing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A] via-transparent to-black/30" />

              {/* Floating Stat Badge 1 */}
              <div className="absolute top-6 left-6 p-4 rounded-2xl bg-[#151922]/90 backdrop-blur-md border border-white/[0.08] shadow-lg space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    UK Precision Standards
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-display">
                  500+ CARS RESTORED
                </div>
              </div>

              {/* Floating Card at bottom */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#151922]/92 backdrop-blur-xl border border-white/[0.1] shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      Bespoke Cleanroom Bay & Mobile Van
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Fully insured, certified technicians, and digital paint depth audits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Offset Accent */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-primary/20 -z-10 pointer-events-none" />
          </motion.div>

          {/* Right Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-3">
              <Badge variant="electric" dot>
                About The Business
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.05]">
                Passion for Automotive Perfection Across the UK
              </h2>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Founded on an uncompromising obsession with automotive surface excellence,{" "}
              <strong className="text-white font-semibold">You Scuff We Buff</strong> bridges
              high-end detailing craftsmanship with fast, hassle-free SMART repair convenience.
              Whether in our dedicated cleanroom lighting studio or directly at your driveway via
              our custom-fitted mobile workshop vans, we treat every vehicle like our own.
            </p>

            <p className="text-muted-foreground text-sm leading-relaxed">
              From restoring diamond-cut alloy wheels after harsh kerb rash to erasing bumper scuffs
              and applying 5-year 9H ceramic glass shields, our master technicians leverage
              spectrophotometer computerized color matching and rotary machine polishers for
              showroom results.
            </p>

            {/* Key Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-card border border-white/[0.06]">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Digital Paint Depth Audit</span>
                  <span className="text-muted-foreground">Ultrasonic microns verification</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-card border border-white/[0.06]">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Fully Insured Bay & Van</span>
                  <span className="text-muted-foreground">£5M comprehensive public liability</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-card border border-white/[0.06]">
                <Wrench className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block">OEM Computerized Match</span>
                  <span className="text-muted-foreground">Exact factory paint blending codes</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-card border border-white/[0.06]">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Showroom Mirror Clarity</span>
                  <span className="text-muted-foreground">Multi-stage scratch & swirl removal</span>
                </div>
              </div>
            </div>

            {/* Dual Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="default" size="default" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Learn More About Us
                </Button>
              </Link>
              <Link href="/booking" className="w-full sm:w-auto">
                <Button variant="outline" size="default">
                  Book Studio or Mobile Service
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
