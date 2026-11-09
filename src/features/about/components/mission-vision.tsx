"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, CheckCircle2, Sparkles, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

export function MissionVision() {
  const { commitmentToQuality, mobileConvenience } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-24 bg-background border-t border-border relative transition-colors duration-200">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <Badge variant="electric" dot>
            Quality & Convenience
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground font-display">
            Our Standards & Mobile Service
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Combining meticulous craftsmanship, high-grade automotive materials, and total mobile convenience across the West Midlands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1560px] mx-auto">
          {/* Commitment to Quality Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-surface-card backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 shadow-sm group relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10 group-hover:bg-primary/20 transition-all" />

              <div className="space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    {commitmentToQuality.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground font-display mt-1">
                    {commitmentToQuality.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {commitmentToQuality.statement}
                </p>

                <div className="space-y-3 pt-2">
                  {commitmentToQuality.points.map((pt, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-surface-secondary border border-border space-y-1">
                      <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{pt.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border">
                <div className="flex items-center gap-3 text-xs text-primary font-semibold">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{commitmentToQuality.highlight}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Convenient Mobile Repairs Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Card className="h-full bg-surface-card backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 shadow-sm group relative overflow-hidden flex flex-col justify-between p-6 sm:p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10 group-hover:bg-primary/20 transition-all" />

              <div className="space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    {mobileConvenience.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground font-display mt-1">
                    {mobileConvenience.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {mobileConvenience.description}
                </p>

                <div className="space-y-3 pt-2">
                  {mobileConvenience.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary border border-border text-xs text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border">
                <div className="flex items-center gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>Serving Birmingham, Solihull, Wolverhampton, Coventry & West Midlands</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
