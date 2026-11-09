"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, PhoneCall, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ServicesCTA() {
  return (
    <section className="py-20 md:py-24 bg-[#07080A] border-t border-border/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/[0.1] bg-surface-card p-8 sm:p-12 md:p-16 text-center max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto shadow-2xl backdrop-blur-md overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Mobile Service Across Birmingham &amp; West Midlands</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display max-w-3xl xl:max-w-4xl mx-auto leading-tight">
              Need a Custom Wheel or SMART Repair Consultation?
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl xl:max-w-4xl mx-auto leading-relaxed">
              Every vehicle has unique repair requirements. Speak directly with our friendly family team or send photos on WhatsApp for an instant, transparent quote.
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
                Book Your Vehicle In
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto text-base hover:border-electric hover:text-electric"
                )}
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Request Custom Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
