"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { DetailedService } from "../types";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceFAQsProps {
  service: DetailedService;
}

export function ServiceFAQs({ service }: ServiceFAQsProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-surface-tertiary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-primary">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
            Questions About {service.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about preparation, timing, and aftercare.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {service.faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Card
                key={index}
                className={cn(
                  "bg-surface-card border transition-all duration-200 overflow-hidden",
                  isOpen ? "border-primary/50 shadow-sm" : "border-white/[0.08]"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 select-none hover:text-electric transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-electric shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-foreground">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0",
                      isOpen && "rotate-180 text-electric"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    <p className="pl-7">{faq.answer}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
