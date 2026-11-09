"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, PhoneCall, ShieldCheck, Check } from "lucide-react";
import { DetailedService } from "../types";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceBookingBannerProps {
  service: DetailedService;
}

export function ServiceBookingBanner({ service }: ServiceBookingBannerProps) {
  return (
    <section className="py-20 bg-[#07080A] border-t border-border/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-primary/10 blur-[130px] pointer-events-none -z-10" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-white/[0.1] bg-surface-card p-8 sm:p-12 md:p-14 text-center max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto shadow-sm backdrop-blur-md overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Mobile Service Across Birmingham &amp; West Midlands</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-display max-w-3xl xl:max-w-4xl mx-auto leading-tight">
              Ready to Book Your {service.title}?
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Appointments starting from {service.currency}{service.startingPrice}. Mobile repair appointments available across Birmingham and the wider West Midlands at your home or workplace.
            </p>

            {/* Quick check indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                No Deposit Required To Reserve
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                Live Technician Progress Updates
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                100% Satisfaction Sign-off
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={`/booking?service=${service.slug}`}
                className={cn(
                  buttonVariants({ size: "lg", variant: "glow" }),
                  "w-full sm:w-auto text-base"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Confirm Appointment for {service.title}
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto text-base hover:border-electric hover:text-electric"
                )}
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Have Questions First?
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
