"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, CheckCircle2, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ABOUT_CONTENT } from "../data/about-content";

export function ServiceAreasSection() {
  const { serviceAreas } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 bg-surface-secondary border-t border-border relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-0 bg-radial-vignette opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-72 bg-primary/5 blur-[130px] pointer-events-none -z-10" />

      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Mobile Service Coverage
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground font-display">
            Our Service Areas
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            You Scuff We Buff provides professional mobile alloy wheel repairs and SMART bodywork repairs across Birmingham and the wider West Midlands. Our team comes directly to your home or workplace.
          </p>
        </div>

        {/* 9 Regions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1560px] mx-auto">
          {serviceAreas.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-surface-card border border-border hover:border-primary/40 transition-all duration-300 group hover:-translate-y-0.5 shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-black transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-bold text-foreground uppercase tracking-tight font-display group-hover:text-primary transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                  <div className="flex items-center gap-1.5 pt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mobile Repair Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-surface-card border border-primary/25 backdrop-blur-md max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-foreground font-display uppercase tracking-tight">
              Don&apos;t See Your Exact Postcode?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              We cover surrounding areas across the West Midlands. Contact us to verify your location.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/booking"
              className={cn(buttonVariants({ size: "default", variant: "amber" }), "text-xs shadow-glow-sm")}
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              Book Mobile Repair
            </Link>
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className={cn(buttonVariants({ size: "default", variant: "outline" }), "text-xs border-white/[0.15] text-white hover:border-primary")}
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
