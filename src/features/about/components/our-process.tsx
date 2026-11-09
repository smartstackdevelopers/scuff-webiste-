"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Sliders, Wrench, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

const PROCESS_ICONS: Record<string, LucideIcon> = {
  Search,
  Sliders,
  Wrench,
  CheckCircle2,
};

export function OurProcess() {
  const { process } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 bg-surface-tertiary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Our 4-Step Detailing Process
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            A methodical, structured workflow engineered to eliminate defects, restore showroom shine, and lock in durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {process.map((step, index) => {
            const Icon = PROCESS_ICONS[step.iconName] || CheckCircle2;

            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col"
              >
                <Card className="h-full bg-surface-card border-white/[0.08] hover:border-primary/50 transition-all duration-300 p-6 flex flex-col justify-between group shadow-lg hover:-translate-y-1">
                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-foreground/20 font-mono group-hover:text-electric transition-colors">
                        {step.stepNumber}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-electric/10 text-electric flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold uppercase tracking-tight text-foreground mb-3 group-hover:text-electric transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Flow connector indicator on desktop */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:flex items-center gap-1 text-muted-foreground/30 mt-6 pt-4 border-t border-border/40 text-xs">
                      <span>Next phase</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto text-electric/60" />
                    </div>
                  )}
                  {index === process.length - 1 && (
                    <div className="hidden lg:flex items-center gap-1 text-electric font-medium mt-6 pt-4 border-t border-border/40 text-xs">
                      <span>Ready for Handover</span>
                      <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-electric" />
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
