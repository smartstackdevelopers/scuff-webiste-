"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  Disc,
  Lightbulb,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  Car,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND_ASSETS } from "@/constants/theme";

const MAINTENANCE_SERVICES = [
  {
    id: "alloy-wheel-refurbishment",
    title: "Alloy Wheel Refurbishment",
    subtitle: "Diamond Cut & Powder Coat Refinishing",
    price: "From £75 / wheel",
    duration: "Same Day / 24h",
    image: BRAND_ASSETS.wheels,
    badge: "WHEEL SPECIALISTS",
    badgeColor: "electric" as const,
    description:
      "Precision CNC lathe diamond cutting and electrostatic powder coating. Completely erases severe kerb rash, deep rim gouges, spoke scrapes, and corrosion pitting.",
    features: [
      "OEM precision CNC diamond cut lathe face",
      "Full chemical dip & acid bath strip",
      "Durable electrostatic powder coat primer & color",
      "High-temp gloss powder clear lacquer bake",
    ],
    href: "/services/alloy-wheel-refurbishment",
  },
  {
    id: "headlight-restoration",
    title: "Headlight De-Oxidation & Seal",
    subtitle: "Restore MOT Passing Beam & Optical Clarity",
    price: "From £65 / pair",
    duration: "1 - 2 Hours",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
    badge: "MOT SAFETY",
    badgeColor: "warning" as const,
    description:
      "Wet sanding and machine compounding to strip yellowed, cloudy oxidation from polycarbonate lenses, finished with UV-blocking ceramic coating to stop haze returning.",
    features: [
      "Multi-grit wet sand oxidation removal",
      "High-clarity optical compounding buff",
      "Ceramic UV-blocking protective barrier",
      "Restores night visibility & beam spread",
    ],
    href: "/services",
  },
  {
    id: "lease-return-inspection",
    title: "End-of-Lease Cosmetic De-Snag",
    subtitle: "Avoid Heavy BVRLA Penalty Charges",
    price: "From £150",
    duration: "Half Day",
    image: BRAND_ASSETS.van,
    badge: "SAVE THOUSANDS",
    badgeColor: "electric" as const,
    description:
      "Comprehensive vehicle walkaround according to BVRLA fair wear & tear guidelines. We pinpoint and erase bumper scuffs, wheel marks, and scratches before lease handback.",
    features: [
      "Complete BVRLA compliance pre-audit",
      "Selective SMART spot repair & touch-ups",
      "Wheel rim kerb rash elimination",
      "Interior sanitization & stain removal",
    ],
    href: "/booking",
  },
];

export function HomeMaintenanceSection() {
  return (
    <section
      id="car-maintenance"
      className="py-20 md:py-28 relative overflow-hidden bg-surface-secondary border-t border-border/40"
    >
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 blur-[160px] pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="flex justify-center">
            <Badge variant="electric" dot>
              Wheel & Surface Care
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Car Maintenance & Alloy Wheel Refurbishment
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Keep your pride and joy looking pristine from rim to roofline. From CNC diamond-cut wheel
            restoration to MOT headlight clearance and pre-lease turn-in repairs, we restore cosmetic
            and functional excellence.
          </p>
        </div>

        {/* 3 Maintenance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAINTENANCE_SERVICES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full rounded-2xl border border-white/[0.08] bg-surface-card overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="relative h-52 w-full overflow-hidden bg-surface-tertiary">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent" />

                <div className="absolute top-3 right-3">
                  <Badge variant={item.badgeColor} size="sm" className="shadow-md backdrop-blur-md">
                    {item.badge}
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-surface-card/90 backdrop-blur-md border border-white/[0.08] text-white">
                    <strong className="text-primary font-bold">{item.price}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-card/90 backdrop-blur-md border border-white/[0.08] text-muted-foreground">
                    <Clock className="w-3 h-3 text-primary" />
                    {item.duration}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors"
                  >
                    <span>Inspect Process</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link href={`/booking?service=${item.id}`}>
                    <Button variant="default" size="sm">
                      Book Wheel Care
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
