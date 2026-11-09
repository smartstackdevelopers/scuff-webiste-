"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Search,
  Wrench,
  CheckCircle2,
  Shield,
  LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CONTENT } from "../data/about-content";

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  ShieldCheck,
  Search,
  Wrench,
  CheckCircle2,
  Shield,
};

export function WhyChooseUs() {
  const { whyChooseUs } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#07080A] border-t border-white/[0.08]">
      <Container>
        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            The You Scuff We Buff Distinction
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Why Customers Trust Us
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl xl:max-w-3xl mx-auto">
            From our laboratory chemistry formulations to our digital handover sign-off, we hold every vehicle to an uncompromising standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUs.map((feature, index) => {
            const Icon = ICON_MAP[feature.iconName] || ShieldCheck;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full bg-[#0C0F15] border-white/[0.08] hover:border-primary/50 transition-all duration-300 hover:shadow-luxury-dark hover:-translate-y-1 group relative overflow-hidden rounded-3xl">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-all" />

                  <CardContent className="p-6 sm:p-8 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors duration-300 shadow-glow-sm">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white font-display group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
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
