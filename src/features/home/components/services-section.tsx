"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/animations/tilt-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { HOME_CONTENT } from "@/features/home/data/home-content";

export function ServicesSection() {
  const { services } = HOME_CONTENT;

  return (
    <section
      id="services"
      className="py-20 md:py-28 relative overflow-hidden bg-surface-tertiary border-t border-border/40"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[130px] pointer-events-none -z-10" />

      <Container>
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <Badge variant="electric" dot>
              Precision Services
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            {services.heading}
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {services.subheading}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full">
                <div
                  data-cursor-label="View"
                  className="flex flex-col h-full rounded-2xl border border-white/[0.08] bg-surface-card overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-surface-secondary">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(72,200,77,0.18),transparent_55%)]" />

                    {item.badge && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="electric" size="sm" className="shadow-lg backdrop-blur-md">
                          {item.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-card/90 backdrop-blur-md border border-white/[0.08] text-white">
                        From{" "}
                        <strong className="text-primary font-bold">
                          {item.startingPrice}
                        </strong>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-card/90 backdrop-blur-md border border-white/[0.08] text-muted-foreground">
                        <Clock className="w-3 h-3 text-primary" />
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                        {item.tagline}
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      <ul className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                        {item.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-white/85"
                          >
                            <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors"
                      >
                        <span>Learn Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link href={`/booking?service=${item.id}`}>
                        <Button variant="outline" size="sm">
                          Book Slot
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.15} className="mt-14 text-center">
          <Link href="/services">
            <Button variant="secondary" size="lg" className="gap-2">
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span>Explore Complete Services & Add-on Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </ScrollReveal>
      </Container>
    </section>
  );
}
