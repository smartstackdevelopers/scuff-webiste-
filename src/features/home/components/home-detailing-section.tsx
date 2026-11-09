"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  Layers,
  ArrowRight,
  Check,
  Clock,
  Gauge,
  Droplets,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DETAILING_CARDS = [
  {
    id: "paint-correction-multi",
    title: "Multi-Stage Paint Correction",
    subtitle: "Precision Swirl & Scratch Elimination",
    price: "From £280",
    duration: "5 - 7 Hours",
    image:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop",
    badge: "SIGNATURE FINISH",
    badgeColor: "electric" as const,
    description:
      "Dual-action machine compounding and refining polish. Removes up to 90% of swirl marks, light scratches, oxidation, and micro-marring to unlock deep optical clarity.",
    features: [
      "Digital paint thickness gauge audit",
      "Two-stage rotary & orbital polish",
      "Swirl, haze & hologram elimination",
      "Surface primed for ceramic bonding",
    ],
    href: "/services/paint-correction",
  },
  {
    id: "ceramic-graphene-coating",
    title: "Ceramic & Graphene Shield",
    subtitle: "9H Ultra-Hydrophobic 5-Year Armor",
    price: "From £450",
    duration: "6 - 8 Hours",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    badge: "5-YEAR WARRANTY",
    badgeColor: "warning" as const,
    description:
      "Certified application of 9H aerospace-grade ceramic and graphene resin. Produces extreme hydrophobic water beading, chemical resistance, UV deflection, and gloss.",
    features: [
      "9H certified hardness barrier",
      "Extreme 110° water contact angle",
      "Resists road salts, birdlime & tree sap",
      "Official guarantee certificate issued",
    ],
    href: "/services/ceramic-graphene-coating",
  },
  {
    id: "deep-interior-sanitization",
    title: "Deep Interior Detailing",
    subtitle: "Steam Extraction & Leather Revival",
    price: "From £95",
    duration: "2 - 3 Hours",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
    badge: "HYGIENE CERTIFIED",
    badgeColor: "electric" as const,
    description:
      "Comprehensive cockpit restoration. High-pressure steam extraction for carpets and upholstery, pH-balanced leather conditioning, and anti-bacterial fogging.",
    features: [
      "Deep hot-water carpet extraction",
      "Leather cleansing & conditioning feed",
      "HVAC vent sanitisation & odor removal",
      "Matte finish UV dashboard protection",
    ],
    href: "/services/interior-detailing",
  },
];

export function HomeDetailingSection() {
  return (
    <section
      id="car-detailing"
      className="py-20 md:py-28 relative overflow-hidden bg-surface-secondary border-t border-border/40"
    >
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-primary/5 blur-[150px] pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="flex justify-center">
            <Badge variant="electric" dot>
              Concourse Care
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            Precision Car Detailing Services
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            From swirl-marked clearcoats to tired interiors, our studio-grade detailing techniques
            use ultrasonic measurement, premium Swiss and German compounds, and laboratory-tested
            coatings to deliver an unblemished showroom finish.
          </p>
        </div>

        {/* 3 Detailing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DETAILING_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full rounded-2xl border border-white/[0.08] bg-surface-card overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Card Image Stage */}
              <div className="relative h-52 w-full overflow-hidden bg-surface-tertiary">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent" />

                {/* Badge top right */}
                <div className="absolute top-3 right-3">
                  <Badge variant={card.badgeColor} size="sm" className="shadow-md backdrop-blur-md">
                    {card.badge}
                  </Badge>
                </div>

                {/* Price & Duration bar */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-surface-card/90 backdrop-blur-md border border-white/[0.08] text-white">
                    <strong className="text-primary font-bold">{card.price}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-card/90 backdrop-blur-md border border-white/[0.08] text-muted-foreground">
                    <Clock className="w-3 h-3 text-primary" />
                    {card.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {card.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    {card.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors"
                  >
                    <span>Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link href={`/booking?service=${card.id}`}>
                    <Button variant="default" size="sm">
                      Book Detailing
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
