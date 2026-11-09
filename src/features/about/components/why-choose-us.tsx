"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Clock,
  Wrench,
  CalendarCheck,
  LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Clock,
  Wrench,
  CalendarCheck,
};

export function WhyChooseUs() {
  const { whyChooseUs } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-electric">
            The You Scuff We Buff Distinction
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            Why Customers Choose Us
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            From our chemistry formulation down to our handover inspection, we set the gold standard in vehicle preservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUs.map((feature, index) => {
            const Icon = ICON_MAP[feature.iconName] || Sparkles;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full bg-card/80 border-border/70 hover:border-electric/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-electric/5 rounded-full blur-2xl group-hover:bg-electric/15 transition-all" />

                  <CardContent className="p-6 sm:p-8 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-electric/10 text-electric flex items-center justify-center group-hover:bg-electric group-hover:text-black transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-electric transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
