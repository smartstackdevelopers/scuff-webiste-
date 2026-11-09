"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_CONTENT } from "@/features/home/data/home-content";

export function CtaSection() {
  const { finalCta } = HOME_CONTENT;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={finalCta.image}
          alt="Automotive detailing studio bay with sports car ready for delivery"
          fill
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </div>

      {/* Dark Overlay for optimal readability */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70 -z-10" />
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Neon ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 workshop-mesh opacity-40 -z-10 pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex justify-center"
          >
            <Badge variant="electric" dot className="bg-background/80 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dedicated Detailing Bays & Mobile Vans</span>
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-display leading-[1.08]">
              {finalCta.headline}
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {finalCta.subheadline}
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link href={finalCta.primaryCtaHref} className="w-full sm:w-auto">
              <Button
                variant="glow"
                size="lg"
                className="w-full sm:w-auto shadow-glow-neon"
              >
                <Calendar className="w-5 h-5" />
                <span>{finalCta.primaryCtaText}</span>
              </Button>
            </Link>

            <Link href={finalCta.secondaryCtaHref} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-card/70 backdrop-blur-md hover:bg-card hover:border-electric"
              >
                <Phone className="w-4 h-4 text-electric" />
                <span>{finalCta.secondaryCtaText}</span>
              </Button>
            </Link>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-semibold"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Fully Insured Bay & Public Liability
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric" />
              Certified Graphene & Ceramic Applicator
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Fast Direct WhatsApp Estimates
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
