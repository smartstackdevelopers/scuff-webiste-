"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CONTENT } from "../data/about-content";

export function AboutExpertise() {
  const { expertise } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-28 bg-surface-secondary border-t border-border relative overflow-hidden transition-colors duration-200">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-primary/5 blur-[140px] pointer-events-none -z-10" />

      <Container>
        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Technical Disciplines & Core Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground font-display">
            Our Restoration Expertise
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl xl:max-w-3xl mx-auto">
            Engineered procedures, laboratory-grade chemistry, and certified master workmanship across four specialized automotive fields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {expertise.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-3xl bg-surface-card border border-border hover:border-primary/50 transition-all duration-300 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              {/* Real Photography Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60">
                <Image
                  src={item.image}
                  alt={`${item.title} - You Scuff We Buff`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-bold text-primary uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text & Deliverables Content */}
              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wider text-primary font-bold">
                    {item.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground font-display group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-border">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-border">
                  <Link
                    href={item.href}
                    className="text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <span className="text-[11px] text-muted-foreground font-mono">
                    UK Guaranteed
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
