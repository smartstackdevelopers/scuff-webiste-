"use client";

import * as React from "react";
import Link from "next/link";
import { Wrench, Calendar, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_CONTENT } from "@/features/home/data/home-content";

export function HowItWorks() {
  const { howItWorks } = HOME_CONTENT;

  const getStepIcon = (name: string) => {
    switch (name) {
      case "Wrench":
        return <Wrench className="w-5 h-5 text-electric" />;
      case "Calendar":
        return <Calendar className="w-5 h-5 text-electric" />;
      case "CheckCircle":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-electric-cyan" />;
      default:
        return <Sparkles className="w-5 h-5 text-electric" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-surface-tertiary border-t border-border/40 relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <Badge variant="electric" dot>
              Frictionless Process
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            {howItWorks.heading}
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {howItWorks.subheading}
          </p>
        </div>

        {/* 4 Steps with Connecting Line */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-white/[0.08] -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {howItWorks.steps.map((step, index) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/[0.08] bg-surface-card backdrop-blur-md shadow-sm hover:border-primary/50 transition-all duration-300 group"
              >
                {/* Step Number & Icon Circle */}
                <div className="relative mb-5">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-secondary border border-white/[0.08] text-white group-hover:border-primary/50 group-hover:shadow-glow-sm transition-all duration-300">
                    {getStepIcon(step.iconName)}
                  </div>
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-black">
                    {step.stepNumber}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link href="/booking">
            <Button variant="glow" size="lg" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span>Book Your Appointment Online</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
