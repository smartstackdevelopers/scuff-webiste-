"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Wrench,
  Sun,
  Sparkles,
  Wind,
  ShieldAlert,
  Plus,
  Check,
  Clock,
  LucideIcon,
  ShoppingBag,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICE_ADDONS } from "../data/addons";

const ADDON_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Wrench,
  Sun,
  Sparkles,
  Wind,
  ShieldAlert,
};

interface AddonSelectorProps {
  selectedIds?: string[];
  onChange?: (selectedIds: string[]) => void;
  showProceedCTA?: boolean;
}

export function AddonSelector({
  selectedIds: controlledSelectedIds,
  onChange,
  showProceedCTA = false,
}: AddonSelectorProps) {
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<string[]>([
    "leather-conditioning",
  ]);

  const selectedIds = controlledSelectedIds ?? internalSelectedIds;

  const toggleAddon = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];

    if (onChange) {
      onChange(next);
    } else {
      setInternalSelectedIds(next);
    }
  };

  const selectedAddons = SERVICE_ADDONS.filter((addon) =>
    selectedIds.includes(addon.id)
  );

  const totalAddonPrice = selectedAddons.reduce(
    (sum, addon) => sum + addon.demoPrice,
    0
  );

  return (
    <section id="addons" className="py-20 md:py-28 bg-surface-secondary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <Badge variant="electric" dot>
            Custom Treatment Upgrades
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Specialized Service Add-Ons
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Target specific areas of wear or contamination. Add any combination to your primary package with a single click.
          </p>
        </div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_ADDONS.map((addon) => {
            const isSelected = selectedIds.includes(addon.id);
            const Icon = ADDON_ICONS[addon.iconName] || Sparkles;

            return (
              <motion.div
                key={addon.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  onClick={() => toggleAddon(addon.id)}
                  className={cn(
                    "cursor-pointer h-full transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden select-none",
                    isSelected
                      ? "bg-card border-2 border-electric shadow-glow-blue"
                      : "bg-card/70 border-border/70 hover:border-electric/40 hover:bg-card"
                  )}
                >
                  {/* Popular Badge */}
                  {addon.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-electric/15 text-electric border border-electric/30 uppercase tracking-wider">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0",
                          isSelected
                            ? "bg-electric text-black"
                            : "bg-electric/10 text-electric"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold uppercase tracking-tight text-foreground">
                          {addon.title}
                        </h3>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-electric" />
                          {addon.duration}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {addon.shortDescription}
                    </p>
                  </div>

                  {/* Footer with Price and Selection Button */}
                  <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-medium">
                        Demo Price
                      </span>
                      <span className="text-xl font-black text-foreground">
                        {addon.currency}{addon.demoPrice}
                      </span>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "text-xs font-semibold px-3.5",
                        isSelected
                          ? "bg-electric text-black hover:bg-electric/90"
                          : "hover:border-electric hover:text-electric"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAddon(addon.id);
                      }}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          Add Extra
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Add-ons Live Counter Bar */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="p-5 sm:p-6 bg-card/90 backdrop-blur-md border border-electric/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-electric/15 text-electric flex items-center justify-center shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                  Interactive Selection Summary
                </p>
                <p className="text-base font-bold text-foreground">
                  {selectedAddons.length}{" "}
                  {selectedAddons.length === 1 ? "Add-On" : "Add-Ons"} Selected
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <AnimatePresence>
                    {selectedAddons.length === 0 ? (
                      <span className="text-xs text-muted-foreground italic">
                        No add-ons selected yet. Click above to add extras.
                      </span>
                    ) : (
                      selectedAddons.map((addon) => (
                        <motion.span
                          key={addon.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-foreground border border-border/60"
                        >
                          {addon.title} (+£{addon.demoPrice})
                        </motion.span>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block font-semibold">
                  Add-Ons Demo Total
                </span>
                <span className="text-2xl sm:text-3xl font-black text-electric">
                  £{totalAddonPrice}
                </span>
              </div>

              {showProceedCTA && (
                <a
                  href="#estimator"
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-electric text-black hover:bg-electric/90 shadow-md shrink-0"
                  )}
                >
                  Review in Estimator
                </a>
              )}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
