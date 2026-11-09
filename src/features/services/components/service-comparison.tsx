"use client";

import * as React from "react";
import Link from "next/link";
import { Check, X, HelpCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SERVICE_COMPARISON_CATEGORIES,
  DETAILING_COMPARISON_SERVICES,
} from "../data/services-content";

export function ServiceComparison() {
  const [selectedMobileService, setSelectedMobileService] = React.useState<string>("full-vehicle-detailing");

  return (
    <section className="py-20 md:py-28 bg-muted/20 border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Package Comparison Matrix
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            Compare Detailing Tiers
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Not sure which package fits your car? Compare our complete scope of work across exterior, correction, protection, and cabin care.
          </p>
        </div>

        {/* Desktop Comparison Table (Hidden on small screens) */}
        <div className="hidden xl:block overflow-x-auto rounded-2xl border border-border/80 bg-card/90 shadow-2xl backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40">
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-foreground w-[26%]">
                  Features & Treatments
                </th>
                {DETAILING_COMPARISON_SERVICES.map((service) => (
                  <th key={service.id} className="p-4 text-center align-bottom min-w-[140px]">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-wider font-extrabold text-foreground">
                        {service.title}
                      </p>
                      <p className="text-sm font-bold text-electric">
                        {service.priceOnAssessment
                          ? "Quote"
                          : `${service.currency}${service.startingPrice}`}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {service.duration}
                      </p>
                      <Link
                        href={`/booking?service=${service.slug}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "xs" }),
                          "mt-2 text-[11px] hover:border-electric hover:text-electric"
                        )}
                      >
                        Book
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICE_COMPARISON_CATEGORIES.map((category, catIdx) => (
                <React.Fragment key={catIdx}>
                  <tr className="bg-secondary/40 border-y border-border/60">
                    <td
                      colSpan={7}
                      className="px-6 py-3 text-xs font-black uppercase tracking-wider text-electric"
                    >
                      {category.categoryName}
                    </td>
                  </tr>

                  {category.features.map((feature, featIdx) => (
                    <tr
                      key={featIdx}
                      className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 px-6 text-xs sm:text-sm font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span>{feature.name}</span>
                          {feature.tooltip && (
                            <Tooltip content={feature.tooltip}>
                              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
                            </Tooltip>
                          )}
                        </div>
                      </td>

                      {/* Interior Detailing */}
                      <td className="p-4 text-center">
                        <ValueCell value={feature.interiorDetailing} />
                      </td>

                      {/* Exterior Detailing */}
                      <td className="p-4 text-center">
                        <ValueCell value={feature.exteriorDetailing} />
                      </td>

                      {/* Paint Correction */}
                      <td className="p-4 text-center">
                        <ValueCell value={feature.paintCorrection} />
                      </td>

                      {/* Ceramic Coating */}
                      <td className="p-4 text-center">
                        <ValueCell value={feature.ceramicCoating} />
                      </td>

                      {/* Full Vehicle Detailing */}
                      <td className="p-4 text-center bg-electric/[0.03]">
                        <ValueCell value={feature.fullVehicleDetailing} />
                      </td>

                      {/* Maintenance Detailing */}
                      <td className="p-4 text-center">
                        <ValueCell value={feature.maintenanceDetailing} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Friendly Breakdown (Visible on < xl screens) */}
        <div className="xl:hidden space-y-6">
          {/* Service Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {DETAILING_COMPARISON_SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedMobileService(service.slug)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all border",
                  selectedMobileService === service.slug
                    ? "bg-electric text-black border-electric shadow-glow-blue"
                    : "bg-card border-border/70 text-muted-foreground hover:text-foreground"
                )}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Active Service Card Breakdown */}
          {(() => {
            const activeService =
              DETAILING_COMPARISON_SERVICES.find((s) => s.slug === selectedMobileService) ||
              DETAILING_COMPARISON_SERVICES[4];
            return (
              <Card className="p-6 bg-card border-border/80 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h3 className="text-xl font-bold uppercase text-foreground">
                      {activeService.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activeService.priceOnAssessment
                        ? "Quote on assessment"
                        : `Starting from ${activeService.currency}${activeService.startingPrice}`}{" "}
                      • {activeService.duration}
                    </p>
                  </div>
                  <Link
                    href={`/booking?service=${activeService.slug}`}
                    className={cn(buttonVariants({ size: "sm", variant: "glow" }))}
                  >
                    Book Now
                  </Link>
                </div>

                <div className="space-y-6">
                  {SERVICE_COMPARISON_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-wider text-electric">
                        {cat.categoryName}
                      </p>
                      <div className="divide-y divide-border/40 bg-muted/30 rounded-xl p-3">
                        {cat.features.map((feat, fIdx) => {
                          const val = getFeatureValue(feat, activeService.slug);
                          return (
                            <div key={fIdx} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                              <span className="text-foreground/90 font-medium">{feat.name}</span>
                              <div className="shrink-0">
                                <ValueCell value={val} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href={`/services/${activeService.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-electric hover:underline uppercase tracking-wider"
                  >
                    <span>Read full specifications for {activeService.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })()}
        </div>
      </Container>
    </section>
  );
}

function ValueCell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-500">
        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted/60 text-muted-foreground/40">
        <X className="w-3.5 h-3.5" />
      </div>
    );
  }

  return (
    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-electric/15 text-electric border border-electric/30">
      {value}
    </span>
  );
}

function getFeatureValue(
  feature: (typeof SERVICE_COMPARISON_CATEGORIES)[0]["features"][0],
  slug: string
): boolean | string {
  switch (slug) {
    case "interior-detailing":
      return feature.interiorDetailing;
    case "exterior-detailing":
      return feature.exteriorDetailing;
    case "paint-correction":
      return feature.paintCorrection;
    case "ceramic-coating":
      return feature.ceramicCoating;
    case "full-vehicle-detailing":
      return feature.fullVehicleDetailing;
    case "maintenance-detailing":
      return feature.maintenanceDetailing;
    default:
      return false;
  }
}
