"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_CONTENT } from "@/features/home/data/home-content";
import { cn } from "@/lib/utils";

export function PackagesSection() {
  const { packages } = HOME_CONTENT;

  return (
    <section id="pricing-preview" className="py-20 md:py-28 relative overflow-hidden bg-surface-secondary border-t border-border/40">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <Badge variant="electric" dot>
              Transparent Pricing
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            {packages.heading}
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {packages.subheading}
          </p>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.items.map((pkg, index) => {
            const isPopular = pkg.popular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300",
                  isPopular
                    ? "bg-surface-card border-primary/60 shadow-glow-sm lg:-translate-y-2"
                    : "bg-surface-card border-white/[0.08] shadow-sm hover:border-white/[0.16]"
                )}
              >
                {/* Popular Pill */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="electric" size="sm" className="shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Most Popular Studio Choice</span>
                    </Badge>
                  </div>
                )}

                {/* Package Top Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1 pb-4 border-b border-border/60">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-muted-foreground">starting rate</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground/80 block">
                      {pkg.priceSubtext}
                    </span>
                  </div>

                  {/* Duration & Warranty Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary text-foreground font-medium">
                      <Clock className="w-3 h-3 text-electric" />
                      {pkg.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      {pkg.warranty}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 pt-2 text-sm text-foreground/90">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Package CTA */}
                <div className="pt-8">
                  <Link href={`/pricing#${pkg.id}`} className="block w-full">
                    <Button
                      variant={isPopular ? "glow" : "outline"}
                      size="lg"
                      className="w-full gap-2 justify-center"
                    >
                      <span>Select {pkg.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Pricing Details Link */}
        <div className="mt-14 text-center">
          <Link href="/pricing">
            <Button variant="secondary" size="lg" className="gap-2">
              <span>View Comprehensive Price Matrix & Vehicle Size Breakdown</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
