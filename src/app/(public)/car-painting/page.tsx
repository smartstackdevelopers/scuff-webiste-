"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PaintBucket,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Award,
  Zap,
  MessageSquare,
  Flame,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";
import { siteConfig } from "@/config/site";

const PAINT_SERVICES = [
  {
    title: "SMART Bumper Scuff Repair",
    desc: "Localised precision repair keeping the factory paint on 80% of your bumper. Repaired, primed, color-matched and baked in under 3 hours.",
    turnaround: "2–3 Hours",
    price: "From £140",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1000&auto=format&fit=crop",
    features: ["OEM code matching", "Seamless clearcoat blend", "Lifetime adhesion warranty"],
  },
  {
    title: "Deep Scratch & Key Mark Leveling",
    desc: "Multi-stage wet sanding and paint micro-fill technique designed to eliminate vandalism key marks and hedge scratches without repainting the entire panel.",
    turnaround: "3–4 Hours",
    price: "From £120",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop",
    features: ["Micro-fill technique", "Paint depth verification", "Zero halo blending"],
  },
  {
    title: "Full Panel Respray & Refinishing",
    desc: "Factory-grade panel repainting executed inside our air-filtered, positive-pressure booth. Guaranteed color match across aluminum, composite, and steel.",
    turnaround: "1–2 Days",
    price: "From £260",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop",
    features: ["Positive-pressure booth", "PPG / Glasurit waterborne", "Factory clear coat thickness"],
  },
  {
    title: "Stone Chip Elimination & Airbrushing",
    desc: "Surgical removal of bonnet road rash and stone chips using high-precision needle airbrushing followed by optical jewel compounding.",
    turnaround: "2 Hours",
    price: "From £95",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop",
    features: ["Rust conversion primer", "Multi-layer clear drop", "Smooth flush finish"],
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Spectrophotometer Analysis",
    desc: "We analyze your vehicle with a 5-angle digital spectrophotometer to formulate the exact OEM pigment variant, accounting for sunlight aging and metallic flake orientation.",
  },
  {
    num: "02",
    title: "Surgical Surface Preparation",
    desc: "Panel is mechanically degreased, feather-edged with micro-abrasives, and sealed with anti-corrosion etch primer inside our cleanroom preparation zone.",
  },
  {
    num: "03",
    title: "Precision Spray Application",
    desc: "Waterborne basecoat applied with computerized DeVilbiss HVLP guns at precise 2.0 bar pressure to recreate the factory orange-peel texture perfectly.",
  },
  {
    num: "04",
    title: "Shortwave Infrared Curing",
    desc: "Cured from the metal out with shortwave infrared lamps in 18 minutes, providing rock-hard scratch resistance and instant polish readiness.",
  },
];

export default function CarPaintingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07080A]">
      {/* 1. Cinematic Video Hero */}
      <CinematicVideoHero
        videoSrc="/videos/hero/04-painting.mp4"
        posterSrc="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2000&auto=format&fit=crop"
        badgeText="OEM Factory Automotive Spray Painting & SMART Repair"
        badgeIcon={<PaintBucket className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Car Painting & SMART Repairs" },
        ]}
        title={
          <>
            OEM FACTORY CAR PAINTING & <br className="hidden sm:inline" />
            <span className="text-gradient-electric">SMART SCUFF RESTORATION.</span>
          </>
        }
        subtitle="Flawless colour matching via computerized 5-angle digital spectrophotometers. From bumper scuffs and stone chips to full panel resprays inside our dust-free positive-pressure spray booth."
        align="split"
        minHeightClass="min-h-[66vh] sm:min-h-[74vh]"
        primaryCta={{
          label: "Book Spray Booth Bay",
          href: "/booking?service=smart-repairs",
          variant: "amber",
        }}
        secondaryCta={{
          label: "WhatsApp Fast Photo Quote",
          href: `https://wa.me/${siteConfig.contact.whatsAppPlaceholder.number}?text=${encodeURIComponent(
            "Hi, I would like a quote for car painting / scuff repair. Here are photos of my car:"
          )}`,
          icon: <MessageSquare className="w-4 h-4 mr-2" />,
        }}
        metrics={[
          { label: "Colour Precision", value: "99.4%", icon: <Award className="w-4 h-4" /> },
          { label: "Bake Curing Time", value: "18 Mins", icon: <Flame className="w-4 h-4" /> },
          { label: "Adhesion Guarantee", value: "Lifetime", icon: <ShieldCheck className="w-4 h-4" /> },
        ]}
      >
        {/* Right Column: Floating Technical Spec Card */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-3xl bg-surface-card/90 border border-white/[0.1] p-6 sm:p-8 backdrop-blur-xl shadow-luxury-dark space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <PaintBucket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                  Equipment Standard
                </span>
                <span className="text-base font-bold text-white font-display uppercase tracking-tight">
                  Cleanroom Spray Booth
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Active Bay
            </span>
          </div>

          <div className="space-y-3.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">55,000+ Factory Codes:</strong> Direct digital interface with Porsche, BMW, Mercedes-Benz, Audi, Aston Martin, and Ferrari OEM databases.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Zero Overspray Promise:</strong> High-density 3M protective masking wraps every exterior trim, glass, and alloy wheel.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Same-Day Vehicle Return:</strong> Drive in with a scuffed bumper at 9:00 AM; drive away factory-fresh by 1:00 PM.
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <span className="text-slate-400">Mobile Van Available for Scuffs</span>
            <Link href="/services/mobile-repairs" className="text-primary font-bold hover:underline flex items-center gap-1">
              <span>Mobile Van Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </CinematicVideoHero>

      {/* 2. Painting Services Grid */}
      <section className="py-20 bg-[#0C0F15] border-b border-white/[0.08]">
        <Container>
          <div className="text-center max-w-4xl xl:max-w-5xl mx-auto space-y-4 mb-14">
            <Badge variant="electric" dot>
              <Sparkles className="w-3 h-3" />
              Specialist Painting Treatments
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
              PRECISION RESTORATION FOR EVERY PANEL
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Whether you need localized cosmetic SMART repair to save insurance excess or a full bare-metal glass finish, our master spray technicians deliver flawless results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PAINT_SERVICES.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl bg-surface-card border border-white/[0.08] hover:border-primary/40 overflow-hidden shadow-luxury-dark transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent" />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/[0.1] text-xs font-bold text-white font-display uppercase tracking-wider">
                      {svc.price}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-xs font-bold text-primary font-display uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {svc.turnaround}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-wide group-hover:text-primary transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {svc.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] text-slate-300 font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <Link href={`/booking?service=smart-repairs`} className="w-full">
                        <Button variant="outline" className="w-full justify-between hover:bg-primary hover:text-black hover:border-primary text-xs font-bold py-5">
                          <span>Reserve Painting Slot</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. 4-Step Painting Workflow */}
      <section className="py-20 bg-[#07080A]">
        <Container>
          <div className="text-center max-w-4xl xl:max-w-5xl mx-auto space-y-4 mb-16">
            <Badge variant="electric" dot>
              Technical Process
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
              THE 4-STAGE FACTORY FINISHING PROTOCOL
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              How our computerized workflow delivers imperceptible blending and stone-chip resilience that outlasts the vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="relative p-6 sm:p-7 rounded-3xl bg-surface-card border border-white/[0.08] hover:border-primary/40 space-y-4 shadow-luxury-dark transition-all"
              >
                <div className="text-4xl font-black text-primary/30 font-display">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Consultation CTA */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-surface-card via-[#111622] to-surface-card border border-white/[0.1] shadow-luxury-dark flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                HAVE A SCUFF OR SCRATCH REQUIRING ASSESSMENT?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Send 2–3 photos via WhatsApp or book a 15-minute free studio inspection with our master technician.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link href="/booking?service=smart-repairs">
                <Button variant="amber" size="lg" className="shadow-glow-sm">
                  <span>Book Paint Assessment</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/[0.14] text-white">
                  <span>Studio Location</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
