"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, FileCheck2, CheckCircle2, Lock, ThumbsUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CONTENT } from "../data/about-content";

export function TrustCredibility() {
  const { trustCredentials } = ABOUT_CONTENT;

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border relative transition-colors duration-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Trust Narrative */}
          <div className="lg:col-span-5 space-y-5">
            <Badge variant="electric" dot>
              Peace of Mind Guarantee
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground font-display">
              Built on Complete Trust & Legal Protection
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              When you entrust your vehicle to You Scuff We Buff, it is protected by the highest operational standards in the UK automotive repair industry.
            </p>

            <div className="space-y-3 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Full £5M Public & Motor Trade Road Risk Coverage</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="w-4 h-4 text-primary shrink-0" />
                <span>Pre-work photographic & paint gauge inspection log</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-primary shrink-0" />
                <span>Secure key management and fully alarmed facility</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ThumbsUp className="w-4 h-4 text-primary shrink-0" />
                <span>100% satisfaction walkthrough before invoice settlement</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Credibility Metric Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {trustCredentials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl bg-surface-card border border-border hover:border-primary/40 transition-colors shadow-sm space-y-2"
              >
                <div className="text-xs uppercase tracking-wider font-semibold text-primary">
                  {item.title}
                </div>
                <div className="text-3xl font-black text-foreground font-display tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
