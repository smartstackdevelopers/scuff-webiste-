"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ShieldCheck, MessageSquare, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ABOUT_CONTENT } from "../data/about-content";

export function AboutCTA() {
  const { cta } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background border-t border-border transition-colors duration-200">
      {/* Decorative gradient backdrops */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-primary/10 blur-[140px] pointer-events-none -z-10" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border bg-surface-card p-8 sm:p-12 md:p-16 text-center max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto shadow-sm backdrop-blur-md overflow-hidden"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Friendly Family Service • Free No-Obligation Quotes</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground max-w-3xl xl:max-w-4xl mx-auto leading-tight">
              {cta.headline}
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl xl:max-w-4xl mx-auto leading-relaxed">
              {cta.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href={cta.primaryBtn.href}
                className={cn(
                  buttonVariants({ size: "lg", variant: "amber" }),
                  "w-full sm:w-auto text-base shadow-glow-sm"
                )}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {cta.primaryBtn.text}
              </Link>

              <a
                href={cta.secondaryBtn.href}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full sm:w-auto text-base border-border text-foreground hover:border-primary hover:text-primary"
                )}
              >
                <Phone className="w-4 h-4 mr-2" />
                {cta.secondaryBtn.text} ({siteConfig.contact.phone})
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsAppPlaceholder.number}?text=${encodeURIComponent(
                  "Hi You Scuff We Buff, I would like a quote for alloy wheel / paint repair:"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "glow" }),
                  "w-full sm:w-auto text-base"
                )}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Photos
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
