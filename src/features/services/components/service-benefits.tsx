"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Droplets, Flame, Award, LucideIcon } from "lucide-react";
import { DetailedService } from "../types";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceBenefitsProps {
  service: DetailedService;
}

const BENEFIT_ICONS: LucideIcon[] = [Sparkles, Shield, Droplets, Flame, Award];

export function ServiceBenefits({ service }: ServiceBenefitsProps) {
  return (
    <section className="py-16 md:py-24 bg-surface-tertiary border-t border-border/40 relative">
      <Container>
        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">
            Key Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
            Why Choose {service.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl xl:max-w-3xl mx-auto">
            Engineered procedures delivering visible transformation and measurable surface preservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.keyBenefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full bg-surface-card border-white/[0.08] hover:border-primary/50 transition-all duration-300 hover:shadow-card-hover group">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-11 h-11 rounded-xl bg-electric/10 text-electric flex items-center justify-center group-hover:bg-electric group-hover:text-black transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold uppercase tracking-tight text-foreground group-hover:text-electric transition-colors">
                      {benefit.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
