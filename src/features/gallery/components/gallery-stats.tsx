"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Car, Sparkles, ShieldCheck, HeartHandshake, LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { GALLERY_STATS } from "../data/stats";

const STAT_ICONS: Record<string, LucideIcon> = {
  Car,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
};

export function GalleryStats() {
  return (
    <section className="py-16 md:py-20 bg-background relative border-t border-border/40">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-electric">
            Track Record of Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground">
            Our Detailing Craft In Numbers
          </h2>
          <p className="text-xs text-muted-foreground">
            * Demonstration figures representing studio bay capacity and service benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_STATS.map((stat, index) => {
            const Icon = STAT_ICONS[stat.iconName] || Sparkles;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full bg-card/85 border-border/80 hover:border-electric/50 transition-all duration-300 p-6 flex flex-col justify-between group shadow-lg hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-electric/10 text-electric flex items-center justify-center group-hover:bg-electric group-hover:text-black transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <span className="text-3xl sm:text-4xl font-black text-foreground group-hover:text-electric transition-colors tracking-tight font-mono">
                        {stat.value}
                      </span>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mt-1">
                        {stat.label}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
