"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

export function MissionVision() {
  const { missionVision } = ABOUT_CONTENT;

  return (
    <section className="py-20 bg-surface-tertiary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">
            Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
            Our Mission & Vision
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Rooted in technical precision, dedicated to unmatched automotive excellence across the UK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-surface-card backdrop-blur-sm border-white/[0.08] hover:border-primary/50 transition-all duration-300 shadow-xl group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -z-10 group-hover:bg-primary/20 transition-all" />

              <div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-white">
                    {missionVision.mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base text-white/90 font-medium leading-relaxed">
                    &ldquo;{missionVision.mission.statement}&rdquo;
                  </p>
                </CardContent>
              </div>

              <div className="p-6 pt-0 mt-4">
                <div className="p-3.5 rounded-lg bg-surface-secondary border border-white/[0.08] text-xs text-muted-foreground flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{missionVision.mission.highlight}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Card className="h-full bg-surface-card backdrop-blur-sm border-white/[0.08] hover:border-primary/50 transition-all duration-300 shadow-xl group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] -z-10 group-hover:bg-primary/20 transition-all" />

              <div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-white">
                    {missionVision.vision.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base text-white/90 font-medium leading-relaxed">
                    &ldquo;{missionVision.vision.statement}&rdquo;
                  </p>
                </CardContent>
              </div>

              <div className="p-6 pt-0 mt-4">
                <div className="p-3.5 rounded-lg bg-surface-secondary border border-white/[0.08] text-xs text-muted-foreground flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{missionVision.vision.highlight}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
