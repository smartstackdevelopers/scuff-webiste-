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
    <section className="py-20 md:py-28 bg-[#07080A] border-t border-white/[0.08] relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-primary/5 blur-[140px] pointer-events-none -z-10" />

      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Technical Disciplines & Core Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Our Restoration Expertise
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
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
              className="group rounded-3xl bg-[#0C0F15] border border-white/[0.08] hover:border-primary/50 transition-all duration-300 shadow-luxury-dark overflow-hidden flex flex-col justify-between"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F15] via-transparent to-black/30" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#07080A]/85 backdrop-blur-md border border-white/[0.15] text-[11px] font-bold text-primary uppercase tracking-wider">
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
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.08]">
                  <Link
                    href={item.href}
                    className="text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <span className="text-[11px] text-slate-500 font-mono">
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
