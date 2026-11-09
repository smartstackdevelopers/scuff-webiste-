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
import { PACKAGE_COMPARISON_DATA, PRICING_PACKAGES } from "../data/packages";

export function PackageComparison() {
  const [selectedMobilePackage, setSelectedMobilePackage] = React.useState<string>("premium-detail");

  return (
    <section className="py-20 md:py-28 bg-surface-tertiary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Side-By-Side Comparison
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Package Comparison Matrix
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Evaluate the scope of each package across decontamination, paint correction, interior sanitation, and durability.
          </p>
        </div>

        {/* Desktop Comparison Table (Visible on lg+) */}
        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border bg-surface-card shadow-sm backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40">
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-foreground w-[34%]">
                  Features & Treatments
                </th>

                {PRICING_PACKAGES.map((pkg) => {
                  const isRec = pkg.recommended;
                  return (
                    <th
                      key={pkg.id}
                      className={cn(
                        "p-5 text-center align-bottom min-w-[180px]",
                        isRec && "bg-electric/[0.04] border-x border-electric/30 relative"
                      )}
                    >
                      {isRec && (
                        <div className="absolute top-0 left-0 right-0 bg-electric text-black text-[10px] font-black uppercase py-0.5 tracking-wider">
                          Recommended
                        </div>
                      )}
                      <div className={cn("space-y-1.5", isRec && "pt-3")}>
                        <p className="text-xs uppercase tracking-wider font-extrabold text-foreground">
                          {pkg.name}
                        </p>
                        <p className="text-lg font-black text-electric">
                          {pkg.currency}{pkg.basePrice}
                        </p>
                        <p className="text-[11px] text-muted-foreground font-medium">
                          {pkg.duration}
                        </p>
                        <Link
                          href={`/booking?package=${pkg.id}`}
                          className={cn(
                            buttonVariants({
                              variant: isRec ? "glow" : "outline",
                              size: "xs",
                            }),
                            "mt-2 text-[11px] font-semibold w-full max-w-[130px]"
                          )}
                        >
                          Select
                        </Link>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {PACKAGE_COMPARISON_DATA.map((category, catIdx) => (
                <React.Fragment key={catIdx}>
                  <tr className="bg-secondary/40 border-y border-border/60">
                    <td
                      colSpan={4}
                      className="px-6 py-3 text-xs font-black uppercase tracking-wider text-electric"
                    >
                      {category.categoryName}
                    </td>
                  </tr>

                  {category.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 px-6 text-xs sm:text-sm font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span>{row.feature}</span>
                          {row.tooltip && (
                            <Tooltip content={row.tooltip}>
                              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
                            </Tooltip>
                          )}
                        </div>
                      </td>

                      {/* Essential Care */}
                      <td className="p-4 text-center">
                        <ValueCell value={row.essentialCare} />
                      </td>

                      {/* Premium Detail */}
                      <td className="p-4 text-center bg-electric/[0.04] border-x border-electric/20">
                        <ValueCell value={row.premiumDetail} />
                      </td>

                      {/* Ultimate Protection */}
                      <td className="p-4 text-center">
                        <ValueCell value={row.ultimateProtection} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Friendly Breakdown (Visible on < lg) */}
        <div className="lg:hidden space-y-6">
          {/* Mobile Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PRICING_PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedMobilePackage(pkg.id)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all border flex items-center gap-1.5",
                  selectedMobilePackage === pkg.id
                    ? "bg-electric text-black border-electric shadow-glow-blue"
                    : "bg-card border-border/70 text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{pkg.name}</span>
                {pkg.recommended && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20 text-black font-extrabold">
                    ★
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Active Package Mobile Comparison Card */}
          {(() => {
            const activePkg =
              PRICING_PACKAGES.find((p) => p.id === selectedMobilePackage) ||
              PRICING_PACKAGES[1];

            return (
              <Card className="p-6 bg-card border-border/80 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold uppercase text-foreground">
                        {activePkg.name}
                      </h3>
                      {activePkg.recommended && (
                        <Badge variant="electric" className="text-[10px]">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      From {activePkg.currency}{activePkg.basePrice} • {activePkg.duration}
                    </p>
                  </div>

                  <Link
                    href={`/booking?package=${activePkg.id}`}
                    className={cn(buttonVariants({ size: "sm", variant: "glow" }))}
                  >
                    Select
                  </Link>
                </div>

                <div className="space-y-6">
                  {PACKAGE_COMPARISON_DATA.map((cat, idx) => (
                    <div key={idx} className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-wider text-electric">
                        {cat.categoryName}
                      </p>
                      <div className="divide-y divide-border/40 bg-muted/30 rounded-xl p-3">
                        {cat.rows.map((row, rIdx) => {
                          const val = getPackageRowValue(row, activePkg.id);
                          return (
                            <div
                              key={rIdx}
                              className="py-2.5 flex items-center justify-between gap-4 text-xs"
                            >
                              <span className="text-foreground/90 font-medium">
                                {row.feature}
                              </span>
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
                    href={`/booking?package=${activePkg.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-electric hover:underline uppercase tracking-wider"
                  >
                    <span>Proceed with {activePkg.name} Booking</span>
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

function getPackageRowValue(
  row: (typeof PACKAGE_COMPARISON_DATA)[0]["rows"][0],
  pkgId: string
): boolean | string {
  switch (pkgId) {
    case "essential-care":
      return row.essentialCare;
    case "premium-detail":
      return row.premiumDetail;
    case "ultimate-protection":
      return row.ultimateProtection;
    default:
      return false;
  }
}
