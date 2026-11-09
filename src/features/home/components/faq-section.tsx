"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_CONTENT } from "@/features/home/data/home-content";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const { faq } = HOME_CONTENT;
  const [openId, setOpenId] = React.useState<string | null>("faq-1");

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-surface-tertiary border-t border-border/40">
      <Container>
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge variant="electric" dot>
                Got Questions?
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
              {faq.heading}
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {faq.subheading}
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faq.items.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-2xl border transition-all duration-200 overflow-hidden",
                    isOpen
                      ? "bg-surface-card border-primary/50 shadow-sm"
                      : "bg-surface-card/70 border-white/[0.08] hover:border-white/[0.15]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                  >
                    <span className="text-base sm:text-lg font-bold text-foreground pr-4">
                      {item.question}
                    </span>
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full bg-secondary border border-border/80 shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 bg-primary/10 border-electric/40 text-electric"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Additional Help Callout */}
          <div className="p-6 rounded-2xl bg-secondary/50 border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-card border border-border text-electric shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Have a specific damage or custom inquiry?</h4>
                <p className="text-xs text-muted-foreground">Our technicians are available for direct WhatsApp paint assessments.</p>
              </div>
            </div>

            <Link href="/contact">
              <Button variant="outline" size="sm" className="gap-2 shrink-0">
                <span>Contact Team</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
