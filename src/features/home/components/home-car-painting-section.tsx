"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Paintbrush,
  Sparkles,
  ShieldCheck,
  Check,
  Clock,
  ArrowRight,
  Flame,
  Pipette,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND_ASSETS } from "@/constants/theme";

const PAINTING_SERVICES = [
  {
    id: "bumper-scuff-repair",
    title: "SMART Bumper Scuff Repair",
    subtitle: "Localized Spot Respray & Blend",
    price: "From £120",
    duration: "2 - 3 Hours",
    image: BRAND_ASSETS.cardVan,
    badge: "MOBILE COMPATIBLE",
    badgeColor: "electric" as const,
    description:
      "Targeted repair of bumper corner scrapes, parking scuffs, and curb contact without expensive whole-panel respraying. We feather the damage, prime, color match, and bake on-site.",
    highlights: [
      "Exact OEM computerized color formulation",
      "Seamless blend into adjacent clearcoat",
      "Rapid short-wave infrared heat curing",
      "Saves up to 60% compared to body shops",
    ],
  },
  {
    id: "scratch-key-repair",
    title: "Scratch & Vandal Key Mark Repair",
    subtitle: "Deep Clearcoat & Primer Restoration",
    price: "From £140",
    duration: "2 - 4 Hours",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
    badge: "LIFETIME WARRANTY",
    badgeColor: "warning" as const,
    description:
      "Precision touch-up and clearcoat leveling for key scratches, branch drag marks, and stone chips. Prevents corrosion and restores smooth light reflection without visible lines.",
    highlights: [
      "Anti-corrosive etching primer application",
      "Dual micro-spray localized blend",
      "Compound and buffed to factory texture",
      "Written lifetime warranty against peeling",
    ],
  },
  {
    id: "panel-blend-respray",
    title: "Panel Blending & Clearcoat",
    subtitle: "Quarter Panels, Wings & Mirror Caps",
    price: "From £165",
    duration: "3 - 5 Hours",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    badge: "WORKSHOP & MOBILE",
    badgeColor: "electric" as const,
    description:
      "When cosmetic damage spans across styling swage lines or mirror housings, our advanced blending techniques ensure zero paint halos or visible overspray boundaries.",
    highlights: [
      "Digital spectrophotometer paint reading",
      "High-solids 2K acrylic polyurethane clear",
      "Dust-free filtered mobile booth shelter",
      "Complete gloss buff and ceramic sealant",
    ],
  },
];

export function HomeCarPaintingSection() {
  return (
    <section
      id="car-painting"
      className="py-20 md:py-28 relative overflow-hidden bg-surface-tertiary border-t border-border/40"
    >
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-primary/5 blur-[160px] pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="flex justify-center">
            <Badge variant="electric" dot>
              SMART Paint Restoration
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Professional Car Painting & SMART Repairs
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Avoid astronomical insurance claims and lengthy body shop delays. Our SMART
            (Small to Medium Area Repair Technique) technology delivers factory-spec paint blending,
            rapid infrared curing, and lifetime durability right in our studio or on your driveway.
          </p>
        </div>

        {/* 3 Painting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PAINTING_SERVICES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full rounded-2xl border border-white/[0.08] bg-surface-card overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Media banner */}
              <div className="relative h-52 w-full overflow-hidden bg-surface-secondary">
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

              {/* Content */}
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
                    {item.highlights.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <Link
                    href={`/services/smart-repairs`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors"
                  >
                    <span>Technique Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link href={`/booking?service=smart-repairs`}>
                    <Button variant="default" size="sm">
                      Get Paint Quote
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
