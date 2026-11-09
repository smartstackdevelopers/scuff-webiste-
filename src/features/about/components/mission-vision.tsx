"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, Compass, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CONTENT } from "@/features/about/data/about-content";

export function MissionVision() {
  const { missionVision } = ABOUT_CONTENT;

  return (
    <section className="py-20 md:py-24 bg-[#0C0F15] border-t border-white/[0.08] relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <Badge variant="electric" dot>
            Guiding Philosophy
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Our Mission & Vision
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
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
            <Card className="h-full bg-[#07080A]/90 backdrop-blur-md border-white/[0.1] hover:border-primary/50 transition-all duration-300 shadow-luxury-dark group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10 group-hover:bg-primary/20 transition-all" />

              <div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                    <Target className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-white font-display">
                    {missionVision.mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base text-slate-200 font-medium leading-relaxed">
                    &ldquo;{missionVision.mission.statement}&rdquo;
                  </p>
                </CardContent>
              </div>

              <div className="p-6 pt-0 mt-4">
                <div className="p-4 rounded-xl bg-[#0C0F15] border border-white/[0.08] text-xs text-slate-300 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
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
            <Card className="h-full bg-[#07080A]/90 backdrop-blur-md border-white/[0.1] hover:border-primary/50 transition-all duration-300 shadow-luxury-dark group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] -z-10 group-hover:bg-primary/20 transition-all" />

              <div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-glow-sm">
                    <Compass className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl font-black uppercase tracking-tight text-white font-display">
                    {missionVision.vision.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base text-slate-200 font-medium leading-relaxed">
                    &ldquo;{missionVision.vision.statement}&rdquo;
                  </p>
                </CardContent>
              </div>

              <div className="p-6 pt-0 mt-4">
                <div className="p-4 rounded-xl bg-[#0C0F15] border border-white/[0.08] text-xs text-slate-300 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
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
