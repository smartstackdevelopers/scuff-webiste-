"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Sparkles, CheckCircle2, Wrench, Award, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

export function StorySection() {
  const { whoWeAre } = ABOUT_CONTENT;

  return (
    <section id="who-we-are" className="py-20 md:py-28 relative overflow-hidden bg-background border-t border-border transition-colors duration-200">
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Overlapping Automotive Detailing Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-sm bg-surface-secondary group">
              <Image
                src={whoWeAre.image.url}
                alt={whoWeAre.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-black/25 to-transparent pointer-events-none" />

              {/* Floating Quality Badge at bottom of image */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Specialist Mobile Refurbishment
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      Alloy Wheel & SMART Bodywork Repairs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Top Accent Card */}
            <div className="hidden sm:flex absolute -top-5 -right-5 p-3.5 rounded-2xl bg-card/95 border border-primary/30 backdrop-blur-md shadow-glow-sm items-center gap-3 z-10">
              <HeartHandshake className="w-5 h-5 text-primary" />
              <div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  Our Promise
                </div>
                <div className="text-xs font-bold text-foreground">
                  Friendly Family-Run Service
                </div>
              </div>
            </div>

            {/* Subtle glow behind card */}
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-primary/10 blur-[90px] -z-10 rounded-full" />
          </motion.div>

          {/* Right Column: Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-3">
              <Badge variant="electric" dot>
                {whoWeAre.badge}
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground font-display">
                {whoWeAre.heading}
              </h2>
              <p className="text-base sm:text-lg font-medium text-primary">
                {whoWeAre.subheading}
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              {whoWeAre.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {whoWeAre.stats.map((stat, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-surface-secondary border border-border text-center">
                  <div className="text-xs uppercase font-semibold text-primary">{stat.label}</div>
                  <div className="text-sm sm:text-base font-extrabold text-foreground font-display mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
