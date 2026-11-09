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
    <section className="py-20 md:py-28 bg-[#0C0F15] border-t border-white/[0.08] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-vignette opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-72 bg-primary/5 blur-[130px] pointer-events-none -z-10" />

      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Mobile Service Coverage
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Our Service Areas
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            You Scuff We Buff provides professional mobile alloy wheel repairs and SMART bodywork repairs across Birmingham and the wider West Midlands. Our team comes directly to your home or workplace.
          </p>
        </div>

        {/* 9 Regions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {serviceAreas.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-[#07080A] border border-white/[0.08] hover:border-primary/40 transition-all duration-300 group hover:-translate-y-0.5 shadow-luxury-dark"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-black transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight font-display group-hover:text-primary transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="flex items-center gap-1.5 pt-2 text-[11px] font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mobile Repair Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#07080A]/80 border border-primary/20 backdrop-blur-md max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white font-display uppercase tracking-tight">
              Don&apos;t See Your Exact Postcode?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
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
