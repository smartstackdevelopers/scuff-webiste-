"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PricingCard } from "./pricing-card";
import { PRICING_PACKAGES } from "../data/packages";

export function PricingPackages() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-surface-secondary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Three Tier Architecture
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Our Primary Detailing Packages
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Choose from essential maintenance, our signature deep transformation, or ultimate multi-stage ceramic protection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <PricingCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
