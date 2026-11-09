"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  CalendarClock,
  Award,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_CONTENT } from "@/features/home/data/home-content";

export function WhyChooseUs() {
  const { whyChooseUs } = HOME_CONTENT;

  const getPillarIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-electric" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-electric-cyan" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5 text-amber-500" />;
      case "CalendarClock":
        return <CalendarClock className="w-5 h-5 text-electric" />;
      case "Award":
        return <Award className="w-5 h-5 text-electric-cyan" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-electric" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-surface-secondary border-t border-border/40 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Split Media & Imagery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border border-white/[0.08] shadow-luxury-dark group">
              <Image
                src={whyChooseUs.image.url}
                alt={whyChooseUs.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A]/90 via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_70%_30%,rgba(72,200,77,0.18),transparent_55%)]" />

              {/* Overlaid Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-surface-card/95 backdrop-blur-xl border border-white/[0.1] space-y-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm" dot>
                    Mobile & On-Site
                  </Badge>
                  <span className="text-xs text-muted-foreground">UK Coverage</span>
                </div>
                <p className="text-sm font-bold text-white leading-snug">
                  Alloy wheel refurb, diamond cutting & smart repair — right when you need them.
                </p>
              </div>
            </div>

            {/* Ambient decorative glow */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
          </motion.div>

          {/* Right Column: Heading & 6 Value Pillars Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="electric" dot>
                The You Scuff We Buff Standard
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {whyChooseUs.heading}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
                {whyChooseUs.subheading}
              </p>
            </div>

            {/* 6 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {whyChooseUs.pillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="p-4 rounded-xl border border-white/[0.08] bg-surface-card backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-surface-secondary border border-white/[0.08] shrink-0">
                      {getPillarIcon(pillar.iconName)}
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-11">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Learn More & Pricing CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/about">
                <Button variant="glow" className="gap-2">
                  <span>Our Craftsmanship Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary">
                  Compare Service Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
