"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "./service-card";
import { SERVICES_LIST } from "../data/services-content";

export function ServiceGrid() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-surface-secondary border-t border-border/40 relative">
      <Container>
        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">
            Precision Repair Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground font-display">
            Our Repair & Refurbishment Services
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Professional alloy wheel refurbishment, diamond cutting, and dent & scratch SMART repairs delivered directly to your home or workplace across Birmingham and the West Midlands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex"
            >
              <ServiceCard service={service} priority={index < 3} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
