"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { DetailedService } from "../types";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceIncludedProps {
  service: DetailedService;
}

export function ServiceIncluded({ service }: ServiceIncludedProps) {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <Badge variant="outline" className="text-primary border-primary/40">
            Transparent Scope of Work
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
            What&apos;s Included In This Service
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Every step is documented and carried out in strict accordance with master detailing standards.
          </p>
        </div>

        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-6">
          {service.whatsIncluded.map((group, phaseIdx) => (
            <motion.div
              key={phaseIdx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: phaseIdx * 0.1 }}
            >
              <Card className="bg-surface-card border-white/[0.08] shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-electric/15 text-electric font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      0{phaseIdx + 1}
                    </span>
                    <CardTitle className="text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                      {group.phase}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Bay Standard Quality Note */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 text-xs text-muted-foreground flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-electric shrink-0" />
            <span>
              All chemical products used in this service are 100% pH-neutral, European-formulated, and clearcoat-safe.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
