"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, Calendar, ArrowRight, Info, Check, Copy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEMO_DEALS_OFFERS } from "../data/offers";

export function DealsSection() {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="deals" className="py-20 md:py-28 bg-muted/20 border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Promotions & Packages
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            Deals & Special Offers
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Take advantage of limited-time seasonal bundles and promotional voucher codes designed for superior vehicle care value.
          </p>
          <div className="inline-block text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
            Demo Promotional Content • Not Actual Legal Offers
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DEMO_DEALS_OFFERS.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/90 border-border/80 hover:border-electric/50 transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-36 h-36 bg-electric/5 rounded-full blur-2xl group-hover:bg-electric/15 transition-all" />

                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline" className="text-electric border-electric/40 font-mono text-[11px]">
                      {deal.badge}
                    </Badge>

                    {/* Discount Placeholder Banner */}
                    <span className="px-3 py-1 rounded-lg bg-electric text-black font-black text-xs uppercase tracking-wider shadow-md">
                      {deal.discountPlaceholder}
                    </span>
                  </div>

                  <div>
                    <CardTitle className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-electric transition-colors">
                      {deal.title}
                    </CardTitle>
                    <p className="text-xs font-semibold text-electric mt-1">
                      {deal.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {deal.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4 pb-4">
                  {/* Coupon Code Pill */}
                  {deal.couponCode && (
                    <div className="p-3 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Tag className="w-4 h-4 text-electric shrink-0" />
                        <span className="text-muted-foreground font-medium">Promo Code:</span>
                        <code className="font-mono font-bold text-foreground text-xs sm:text-sm px-2 py-0.5 rounded bg-background border border-border">
                          {deal.couponCode}
                        </code>
                      </div>

                      <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        className="text-[11px] h-7"
                        onClick={() => copyCouponCode(deal.couponCode!)}
                      >
                        {copiedCode === deal.couponCode ? (
                          <>
                            <Check className="w-3 h-3 mr-1 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {/* Expiry Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-electric shrink-0" />
                    <span>{deal.expiryDate}</span>
                  </div>

                  {/* Terms & Conditions preview */}
                  <div className="pt-2 border-t border-border/40 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <Info className="w-3 h-3 text-muted-foreground" />
                      Terms & Conditions (Demo)
                    </span>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      {deal.terms.map((term, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <span className="text-electric font-bold">•</span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/50">
                  <Link
                    href={`/booking?package=${deal.targetPackageId || "premium-detail"}&coupon=${deal.couponCode || ""}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full text-xs font-bold uppercase tracking-wider hover:border-electric hover:text-electric"
                    )}
                  >
                    <span>Claim Deal & Book</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
