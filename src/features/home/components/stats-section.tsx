"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { HOME_CONTENT } from "@/features/home/data/home-content";

export function StatsSection() {
  const { stats } = HOME_CONTENT;

  return (
    <section id="stats" className="relative py-12 border-y border-white/[0.08] bg-surface-primary backdrop-blur-md">
      <Container>
        {/* Strip container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-3 pt-6 md:pt-3 space-y-1 group"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight group-hover:text-primary transition-colors">
                  {stat.value}
                </span>
              </div>

              <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase">
                {stat.label}
              </span>

              <span className="text-xs text-muted-foreground leading-normal max-w-[200px]">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Transparent Demo Data Disclaimer */}
        <div className="mt-8 text-center">
          <Badge variant="neutral" size="sm" className="opacity-75">
            Verified Performance Metrics • (Demo Data Reference)
          </Badge>
        </div>
      </Container>
    </section>
  );
}
