"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Tag, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function GalleryCTA() {
  return (
    <section className="py-20 md:py-24 bg-muted/20 border-t border-border/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-electric/10 blur-[130px] pointer-events-none -z-10" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-electric/40 bg-card/95 p-8 sm:p-12 md:p-14 text-center max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto shadow-2xl backdrop-blur-md overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric/15 border border-electric/30 text-electric text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Mobile Alloy &amp; SMART Repairs &bull; West Midlands</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground font-display max-w-3xl xl:max-w-4xl mx-auto leading-tight">
              Ready to See Your Vehicle In Our Gallery?
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl xl:max-w-4xl mx-auto leading-relaxed">
              Whether your car needs kerb damage refurbishment, diamond-cut face restoration, or localized SMART bumper blending, trust our family-run team to deliver showroom results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/booking"
                className={cn(
                  buttonVariants({ size: "lg", variant: "glow" }),
                  "w-full sm:w-auto text-base"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Appointment Now
              </Link>

              <Link
                href="/pricing"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto text-base hover:border-electric hover:text-electric"
                )}
              >
                <Tag className="w-4 h-4 mr-2" />
                Explore Pricing & Packages
              </Link>
            </div>

            <p className="text-[11px] text-muted-foreground pt-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-electric" />
              <span>Free digital paint depth inspection included with every booking</span>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
