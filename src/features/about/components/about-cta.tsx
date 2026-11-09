"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";
import { BrandMascot } from "@/components/brand/mascot";

export function AboutCTA() {
  const { cta } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-[#07080A] border-t border-border/40">
      {/* Decorative gradient backdrops */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-primary/10 blur-[130px] pointer-events-none -z-10" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/[0.1] bg-surface-card p-8 sm:p-12 md:p-16 text-center max-w-5xl mx-auto shadow-2xl backdrop-blur-md overflow-hidden"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute -right-4 bottom-0 hidden md:block opacity-90">
            <BrandMascot size="md" parallax={false} />
          </div>

          <div className="relative z-10 space-y-6 md:pr-36">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Satisfaction Guarantee</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white max-w-2xl mx-auto leading-tight">
              {cta.headline}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {cta.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={cta.primaryBtn.href}
                className={cn(
                  buttonVariants({ size: "lg", variant: "glow" }),
                  "w-full sm:w-auto text-base"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {cta.primaryBtn.text}
              </Link>

              <Link
                href={cta.secondaryBtn.href}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto text-base hover:border-electric hover:text-electric"
                )}
              >
                {cta.secondaryBtn.text}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
