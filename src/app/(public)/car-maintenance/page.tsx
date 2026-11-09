"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wrench,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  Award,
  Zap,
  Car,
  Check,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";
import { siteConfig } from "@/config/site";

const MAINTENANCE_SERVICES = [
  {
    title: "CNC Diamond-Cut Alloy Refurbishment",
    desc: "Precision laser mapping and ultra-fine diamond tip CNC lathe cutting to restore kerbed, corroded, or spider-veined diamond-cut wheels to original factory sheen.",
    turnaround: "Same Day / 24h",
    price: "From £85 / Wheel",
    image: "/images/brand/wheels.jpg",
    features: ["Laser surface profile mapping", "OEM clear lacquer powder coat", "Dynamic wheel rebalancing"],
  },
  {
    title: "End-of-Lease Return Snag De-Risking",
    desc: "Complete BVRLA standard pre-return inspection. We identify and fix all minor body dents, kerbed rims, bumper grazes, and stone chips before the lease inspector charges exorbitant dealer penalty fees.",
    turnaround: "1 Day",
    price: "From £199",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop",
    features: ["BVRLA Fair Wear & Tear audit", "Save up to £1,200 penalty charges", "Guaranteed compliance certificate"],
  },
  {
    title: "UV Headlight Restoration & Vapor Seal",
    desc: "Optical wet compounding to strip opaque yellow oxidation, haze, and micro-scratches from polycarbonate headlight covers, followed by a permanent UV-blocking polymer cure.",
    turnaround: "1.5 Hours",
    price: "From £70 / Pair",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop",
    features: ["MOT beam pass guaranteed", "+80% night visibility restore", "Permanent UV sealant"],
  },
  {
    title: "High-Temp Brake Caliper Refinishing",
    desc: "Custom caliper enamel painting with heat-resistant polyurethane paint in Brembo Red, Acid Green, Gloss Black, or OEM Performance Gold with high-heat marque decals.",
    turnaround: "4 Hours",
    price: "From £160 / Set",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop",
    features: ["Resists 650°C track heat", "Anti-corrosion wire wheel prep", "Bespoke high-temp branding"],
  },
];

const LEASE_PENALTY_SAVINGS = [
  { issue: "Kerbed Diamond-Cut Wheel (x2)", dealerFee: "£360 - £480", ourPrice: "£170", savings: "Save ~£250" },
  { issue: "Front Bumper Parking Scuff", dealerFee: "£450 - £600", ourPrice: "£140", savings: "Save ~£380" },
  { issue: "Door Panel Key Scratch", dealerFee: "£500 - £750", ourPrice: "£160", savings: "Save ~£450" },
  { issue: "Dull / Yellowed Headlights (MOT Fail)", dealerFee: "£600 (Replacement)", ourPrice: "£70 (Restored)", savings: "Save ~£530" },
];

export default function CarMaintenancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* 1. Cinematic Video Hero */}
      <CinematicVideoHero
        videoSrc="/videos/hero/05-wheel-refurb.mp4"
        posterSrc="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2070&auto=format&fit=crop"
        badgeText="Preventative Automotive Maintenance & Inspection"
        badgeIcon={<Wrench className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Car Maintenance & Wheel Care" },
        ]}
        title={
          <>
            PREVENTATIVE CAR MAINTENANCE & <br className="hidden sm:inline" />
            <span className="text-gradient-electric">ALLOY WHEEL RESTORATION.</span>
          </>
        }
        subtitle="Precision engineering inspections, CNC diamond-cut alloy wheel refurbishment, high-temp brake caliper enamel, headlight de-oxidation, and end-of-lease de-snagging to eliminate punitive finance return charges."
        align="split"
        minHeightClass="min-h-[66vh] sm:min-h-[74vh]"
        primaryCta={{
          label: "Book Maintenance Bay",
          href: "/booking",
          variant: "amber",
        }}
        secondaryCta={{
          label: "Alloy Refurbishment Details",
          href: "/services/alloy-wheel-refurbishment",
          icon: <Wrench className="w-4 h-4 mr-2" />,
        }}
        metrics={[
          { label: "CNC Tolerance", value: "0.001mm", icon: <Award className="w-4 h-4" /> },
          { label: "Lease Savings", value: "Up to £1,200", icon: <ShieldCheck className="w-4 h-4" /> },
          { label: "Wheel Warranty", value: "12 Months", icon: <CheckCircle2 className="w-4 h-4" /> },
        ]}
      >
        {/* Right Column: Floating BVRLA Lease Audit Card */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="rounded-3xl bg-card/95 border border-border p-6 sm:p-8 backdrop-blur-xl shadow-sm space-y-6 text-foreground"
        >
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 block">
                  Finance Protection
                </span>
                <span className="text-base font-bold text-foreground font-display uppercase tracking-tight">
                  BVRLA Lease Audit Guarantee
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
              Save £££
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Finance leasing companies enforce draconian wear-and-tear penalty charges upon lease return. Our technicians perform an itemized pre-inspection and repair cosmetic snags at a fraction of franchised dealer penalty invoices.
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-secondary border border-border/60">
              <span className="text-muted-foreground">Average Dealer Penalty Fee</span>
              <span className="font-bold text-red-500 font-display">£850 - £1,500</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-primary/10 border border-primary/30">
              <span className="text-foreground font-semibold">You Scuff We Buff Pre-Fix</span>
              <span className="font-bold text-primary font-display">£250 - £450</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">PCP, PCH & Hire Purchase</span>
            <Link href="/booking" className="text-primary font-bold hover:underline flex items-center gap-1">
              <span>Book Lease De-Snag</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </CinematicVideoHero>

      {/* 2. Maintenance Services Catalog */}
      <section className="py-20 bg-surface-secondary border-b border-border transition-colors duration-200">
        <Container>
          <div className="text-center max-w-4xl xl:max-w-5xl mx-auto space-y-4 mb-14">
            <Badge variant="electric" dot>
              <Sparkles className="w-3 h-3" />
              Specialist Workshop Services
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground font-display uppercase tracking-tight">
              PRECISION RESTORATION & WHEEL ENGINEERING
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Equipped with in-house CNC lathe technology, pneumatic wheel bead breakers, and high-temp baking ovens to restore components to OEM showroom tolerances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MAINTENANCE_SERVICES.map((svc, idx) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl bg-surface-card border border-border hover:border-primary/40 overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between"
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
                    <span className="px-3 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border text-xs font-bold text-foreground font-display uppercase tracking-wider">
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
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground font-display uppercase tracking-wide group-hover:text-primary transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {svc.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-1 rounded-lg bg-surface-secondary border border-border/50 text-[11px] text-muted-foreground font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <Link href={`/booking`} className="w-full">
                        <Button variant="outline" className="w-full justify-between hover:bg-primary hover:text-black hover:border-primary text-xs font-bold py-5">
                          <span>Reserve Bay Appointment</span>
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

      {/* 3. Lease Return Penalty Comparison Table */}
      <section className="py-20 bg-background border-b border-border transition-colors duration-200">
        <Container>
          <div className="text-center max-w-4xl xl:max-w-5xl mx-auto space-y-4 mb-14">
            <Badge variant="electric" dot>
              Cost Transparency
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground font-display uppercase tracking-tight">
              DEALER PENALTY INVOICE VS YOU SCUFF WE BUFF
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Why returning your lease without our pre-inspection de-snagging costs motorists hundreds in avoidable finance penalties.
            </p>
          </div>

          <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto overflow-x-auto rounded-3xl border border-border bg-surface-card shadow-sm">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-12 bg-muted/40 p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                <div className="col-span-5 sm:col-span-6">Cosmetic Defect / Issue</div>
                <div className="col-span-3 sm:col-span-2 text-right">Dealer Surcharge</div>
                <div className="col-span-2 text-right text-primary">Our Studio Price</div>
                <div className="col-span-2 text-right text-amber-500 hidden sm:block">Client Savings</div>
              </div>

              <div className="divide-y divide-border">
                {LEASE_PENALTY_SAVINGS.map((row) => (
                  <div key={row.issue} className="grid grid-cols-12 p-4 text-xs items-center hover:bg-muted/30 transition-colors">
                    <div className="col-span-5 sm:col-span-6 font-semibold text-foreground">
                      {row.issue}
                    </div>
                    <div className="col-span-3 sm:col-span-2 text-right text-red-500 font-mono font-medium">
                      {row.dealerFee}
                    </div>
                    <div className="col-span-2 text-right text-primary font-bold font-mono">
                      {row.ourPrice}
                    </div>
                    <div className="col-span-2 text-right text-amber-500 font-bold hidden sm:block">
                      {row.savings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <Link href="/booking">
              <Button variant="amber" size="lg" className="shadow-glow-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Lease Pre-Inspection & Wheel Service</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
