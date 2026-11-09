"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Clock, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { PricingPackage } from "../types/pricing";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  pkg: PricingPackage;
}

export function PricingCard({ pkg }: PricingCardProps) {
  const isRecommended = pkg.recommended;

  return (
    <Card
      className={cn(
        "relative flex flex-col h-full bg-surface-card backdrop-blur-md transition-all duration-300 shadow-sm overflow-hidden group",
        isRecommended
          ? "border-2 border-primary shadow-glow-sm lg:-translate-y-2.5 z-10"
          : "border-border hover:border-primary/50 hover:-translate-y-1"
      )}
    >
      {/* Recommended Ribbon / Badge */}
      {isRecommended && (
        <div className="absolute top-0 right-0 left-0 bg-electric text-black text-center py-1.5 text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Recommended Choice</span>
        </div>
      )}

      <CardHeader className={cn("space-y-4 pb-6", isRecommended ? "pt-10" : "pt-6")}>
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant={isRecommended ? "electric" : "outline"}
            className="font-mono text-[11px]"
          >
            {pkg.badge || "Package"}
          </Badge>
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Demo Rate
          </span>
        </div>

        <div>
          <CardTitle className="text-2xl font-black uppercase tracking-tight text-foreground group-hover:text-electric transition-colors">
            {pkg.name}
          </CardTitle>
          <p className="text-xs font-medium text-electric mt-1">
            {pkg.tagline}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {pkg.description}
        </p>

        {/* Price & Duration */}
        <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground block font-semibold">
              From (Demo)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-foreground">
                {pkg.currency}{pkg.basePrice}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                / vehicle
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground block font-semibold">
              Duration
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
              <Clock className="w-3.5 h-3.5 text-electric shrink-0" />
              <span>{pkg.duration}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground block">
            What&apos;s Included:
          </span>
          <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6 border-t border-border/50 flex flex-col gap-3">
        <Link
          href={`/booking?package=${pkg.id}`}
          className={cn(
            buttonVariants({
              size: "lg",
              variant: isRecommended ? "glow" : "outline",
            }),
            "w-full text-sm font-bold uppercase tracking-wider justify-center"
          )}
        >
          <span>Select {pkg.name}</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>

        <p className="text-[11px] text-center text-muted-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-electric shrink-0" />
          <span>Includes free consultation & assessment</span>
        </p>
      </CardFooter>
    </Card>
  );
}
