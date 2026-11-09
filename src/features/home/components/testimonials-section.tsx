"use client";

import * as React from "react";
import { Star, Quote, ShieldCheck, Car } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HOME_CONTENT } from "@/features/home/data/home-content";

export function TestimonialsSection() {
  const { testimonials } = HOME_CONTENT;

  return (
    <section className="py-20 md:py-28 bg-surface-tertiary border-t border-border/40 relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="electric" dot>
              Client Trust
            </Badge>
            <Badge variant="neutral" size="sm">
              Demonstration Reviews
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
            {testimonials.heading}
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {testimonials.subheading}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-white/[0.08] bg-surface-card backdrop-blur-md shadow-sm hover:border-primary/40 transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Top Quote Icon & 5 Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-muted-foreground/30 group-hover:text-electric/40 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Service Tag */}
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary text-[11px] font-semibold text-muted-foreground">
                    <ShieldCheck className="w-3 h-3 text-electric" />
                    {item.serviceReceived}
                  </span>
                </div>
              </div>

              {/* Author & Vehicle Footer */}
              <div className="pt-6 mt-6 border-t border-border/60 flex items-center gap-3">
                <Avatar size="md" status="verified">
                  <AvatarFallback>{item.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                    <Car className="w-3 h-3 shrink-0 text-electric" />
                    <span className="truncate">{item.vehicle}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/80">
                    {item.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Disclaimer */}
        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>
            * Testimonials shown are representative client experience samples for demonstration purposes.
          </p>
        </div>
      </Container>
    </section>
  );
}
