"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

export function StorySection() {
  const { story } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-surface-secondary border-t border-border/40">
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Automotive Detailing Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] shadow-luxury-dark bg-surface-card">
              <Image
                src={story.image.url}
                alt={story.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-xl bg-surface-card/90 backdrop-blur-md border border-white/[0.1] shadow-lg flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Master Detailing Bay
                    </p>
                    <p className="text-sm font-bold text-white">
                      Precision Equipment & Certified Craftsmanship
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle glow behind card */}
            <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-primary/5 blur-[80px] -z-10 rounded-full" />
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
              <Badge variant="outline" className="text-electric border-electric/30">
                <Shield className="w-3.5 h-3.5 mr-1" />
                Craftsmanship & Precision
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
                {story.heading}
              </h2>
              <p className="text-lg font-medium text-primary">
                {story.subheading}
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {story.stats.map((stat, idx) => (
                <Card
                  key={idx}
                  className="p-4 bg-surface-card border-white/[0.08] hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-white pl-6">
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
