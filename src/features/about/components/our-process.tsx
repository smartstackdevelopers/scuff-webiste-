"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, Sliders, Wrench, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CONTENT } from "../data/about-content";

const PROCESS_ICONS: Record<string, LucideIcon> = {
  Search,
  Sliders,
  Wrench,
  CheckCircle2,
};

export function OurProcess() {
  const { process } = ABOUT_CONTENT;

  return (
    <section id="process" className="py-20 md:py-28 bg-[#0C0F15] border-t border-white/[0.08] relative">
      <Container>
        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Methodical Precision Protocol
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Our 4-Step Detailing Process
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl xl:max-w-3xl mx-auto">
            A repeatable, scientific workflow engineered to eliminate defects, restore showroom gloss, and bond long-term protection.
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
                <Card className="h-full bg-[#07080A] border-white/[0.08] hover:border-primary/50 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group shadow-luxury-dark hover:-translate-y-1 rounded-3xl">
                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-white/20 font-mono group-hover:text-primary transition-colors">
                        {step.stepNumber}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold uppercase tracking-tight text-white font-display mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Flow connector indicator on desktop */}
                  {index < process.length - 1 && (
                    <div className="hidden lg:flex items-center gap-1 text-slate-500 mt-6 pt-4 border-t border-white/[0.08] text-xs font-mono">
                      <span>Next Phase</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto text-primary" />
                    </div>
                  )}
                  {index === process.length - 1 && (
                    <div className="hidden lg:flex items-center gap-1 text-primary font-medium mt-6 pt-4 border-t border-white/[0.08] text-xs font-mono">
                      <span>Ready for Handover</span>
                      <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-primary" />
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
