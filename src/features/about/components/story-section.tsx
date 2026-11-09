"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Sparkles, CheckCircle2, Gauge, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

export function StorySection() {
  const { story } = ABOUT_CONTENT;

  return (
    <section id="standards" className="py-20 md:py-28 relative overflow-hidden bg-[#07080A] border-t border-white/[0.08]">
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
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/[0.1] shadow-luxury-dark bg-[#0C0F15] group">
              <Image
                src={story.image.url}
                alt={story.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080A]/90 via-black/25 to-transparent pointer-events-none" />

              {/* Floating Quality Badge at bottom of image */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="p-4 rounded-2xl bg-[#0C0F15]/90 backdrop-blur-md border border-white/[0.12] shadow-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center shrink-0">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      Ultrasonic Gauge Diagnostics
                    </p>
                    <p className="text-sm font-bold text-white">
                      Measuring Clearcoat Down to Single Microns
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Top Accent Card for Overlapping Agency Feel */}
            <div className="hidden sm:flex absolute -top-5 -right-5 p-3.5 rounded-2xl bg-[#0C0F15]/95 border border-primary/30 backdrop-blur-md shadow-glow-sm items-center gap-3 z-10">
              <Award className="w-5 h-5 text-primary" />
              <div>
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  Accreditation
                </div>
                <div className="text-xs font-bold text-white">
                  Accredited Detailing Studio
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
                Craftsmanship & Scientific Precision
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
                {story.heading}
              </h2>
              <p className="text-base sm:text-lg font-medium text-primary">
                {story.subheading}
              </p>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
              {story.stats.map((stat, idx) => (
                <Card
                  key={idx}
                  className="p-4 bg-[#0C0F15]/90 border-white/[0.08] hover:border-primary/40 transition-colors shadow-luxury-dark"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white pl-6">
                    {stat.value}
                  </p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
