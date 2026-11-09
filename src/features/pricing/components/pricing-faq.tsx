"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRICING_FAQS } from "../data/faqs";

export function PricingFAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-muted/20 border-t border-border/40 relative">
      <Container>
        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Clear Pricing Answers
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl xl:max-w-3xl mx-auto">
            Everything you need to know about our vehicle size scaling, package options, add-ons, and payment expectations.
          </p>
        </div>

        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto space-y-4">
          {PRICING_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <Card
                key={index}
                className={cn(
                  "bg-card/90 border transition-all duration-200 overflow-hidden shadow-sm",
                  isOpen ? "border-electric/50 shadow-md" : "border-border/80"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 select-none hover:text-electric transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
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
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    <p className="pl-7">{faq.answer}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-14 max-w-2xl mx-auto p-6 rounded-2xl bg-card border border-border/70 text-center space-y-4">
          <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
            Still Have Questions About Our Pricing?
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            Our master technicians are on hand to assess unusual vehicle body shapes, commercial fleets, or heavy clearcoat damage.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "text-xs font-bold uppercase tracking-wider hover:border-electric hover:text-electric"
              )}
            >
              <PhoneCall className="w-3.5 h-3.5 mr-2" />
              Speak With A Detailing Specialist
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
