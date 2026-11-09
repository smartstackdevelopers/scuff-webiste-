"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Building2, CalendarCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/constants/theme";

const FEATURES = [
  {
    icon: Home,
    title: "At Your Home",
    description:
      "Book a suitable repair and have our mobile team visit your home.",
  },
  {
    icon: Building2,
    title: "At Your Workplace",
    description:
      "Get suitable cosmetic repairs arranged while your car is parked at work.",
  },
  {
    icon: CalendarCheck,
    title: "Convenient Online Booking",
    description:
      "Select your service, preferred date and appointment time through our website.",
  },
] as const;

const VISUALS = [
  { src: BRAND_ASSETS.van, alt: "You Scuff We Buff branded mobile repair van", label: "Mobile Van" },
  { src: BRAND_ASSETS.cardVan, alt: "Mobile repair branding for home and office visits", label: "We Come To You" },
  { src: BRAND_ASSETS.wheels, alt: "Alloy wheel repair and refurbishment", label: "Alloy Wheels" },
  { src: BRAND_ASSETS.mascot, alt: "You Scuff We Buff smart repair brand presence", label: "Smart Repairs" },
] as const;

export function MobileVanSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden border-y border-border/40">
      <div className="absolute inset-0 -z-20">
        <Image
          src={BRAND_ASSETS.van}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/92 to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(72,200,77,0.12),_transparent_55%)]" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <Badge variant="electric" dot>
              WE COME TO YOU
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-[1.05]">
              Professional Car Repairs, Right at Your Doorstep
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Can&apos;t make it to a garage? Our mobile repair team can come to your home or workplace
              to carry out suitable automotive repairs at a location convenient for you.
            </p>
            <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-xl">
              From your driveway to your workplace, our mobile repair team makes suitable automotive
              repairs more convenient. Suitability depends on the job — some repairs need workshop assessment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-border/70 bg-card/80 p-4 space-y-2"
                >
                  <feature.icon className="w-5 h-5 text-electric" />
                  <h3 className="text-sm font-bold uppercase tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/booking?service=mobile-repairs"
                className={cn(buttonVariants({ variant: "glow", size: "lg" }), "text-sm")}
              >
                Book Your Mobile Repair
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/services/mobile-repairs"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-sm")}
              >
                Explore Mobile Services
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {VISUALS.map((visual, index) => (
              <motion.div
                key={visual.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl",
                  index === 0 ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-square"
                )}
              >
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-xs font-bold uppercase tracking-wider text-white">
                  {visual.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
