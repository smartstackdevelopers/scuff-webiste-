"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, Check, Sparkles, AlertCircle } from "lucide-react";
import { BookingState } from "../../types/booking";
import { SERVICES_LIST } from "@/features/services/data/services-content";
import { PRICING_PACKAGES } from "@/features/pricing/data/packages";
import { SERVICE_ADDONS } from "@/features/pricing/data/addons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Step1ServiceSelectionProps {
  state: BookingState;
  onSelectService: (serviceId: string) => void;
  onSelectPackage: (packageId: string) => void;
  onToggleAddon: (addonId: string) => void;
  errorMessage?: string;
}

export function Step1ServiceSelection({
  state,
  onSelectService,
  onSelectPackage,
  onToggleAddon,
  errorMessage,
}: Step1ServiceSelectionProps) {
  const [activeTab, setActiveTab] = React.useState<"services" | "packages">("services");

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
          Step 1: Choose Your Service or Package
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Select one primary detailing service or signature package, and customize with optional add-ons.
        </p>

        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Mode Selector Tabs: Core Services vs Signature Packages */}
      <div className="flex p-1 rounded-xl bg-muted/60 border border-border/80 max-w-sm">
        <button
          type="button"
          onClick={() => setActiveTab("services")}
          className={cn(
            "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
            activeTab === "services"
              ? "bg-electric text-black shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Individual Services ({SERVICES_LIST.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("packages")}
          className={cn(
            "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
            activeTab === "packages"
              ? "bg-electric text-black shadow-md"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Signature Packages ({PRICING_PACKAGES.length})
        </button>
      </div>

      {/* Services Grid View */}
      {activeTab === "services" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES_LIST.map((service) => {
            const isSelected = state.serviceId === service.slug && !state.packageId;

            return (
              <Card
                key={service.id}
                onClick={() => onSelectService(service.slug)}
                className={cn(
                  "cursor-pointer p-4 transition-all duration-200 border rounded-2xl flex flex-col justify-between group relative overflow-hidden select-none",
                  isSelected
                    ? "bg-card border-2 border-electric shadow-glow-blue"
                    : "bg-card/75 border-border/80 hover:border-electric/50"
                )}
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                    <Image
                      src={service.heroImage.url}
                      alt={service.heroImage.alt}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold uppercase tracking-tight text-foreground group-hover:text-electric transition-colors">
                        {service.title}
                      </h3>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-electric text-black flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-electric" />
                        {service.duration}
                      </span>
                      <span>•</span>
                      <span className="text-foreground font-bold font-mono">
                        {service.priceOnAssessment || service.startingPrice <= 0
                          ? "Quote on assessment"
                          : `From ${service.currency}${service.startingPrice}`}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Packages Grid View */}
      {activeTab === "packages" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRICING_PACKAGES.map((pkg) => {
            const isSelected = state.packageId === pkg.id;

            return (
              <Card
                key={pkg.id}
                onClick={() => onSelectPackage(pkg.id)}
                className={cn(
                  "cursor-pointer p-5 transition-all duration-200 border rounded-2xl flex flex-col justify-between group relative select-none",
                  isSelected
                    ? "bg-card border-2 border-electric shadow-glow-blue"
                    : "bg-card/75 border-border/80 hover:border-electric/50"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant={pkg.recommended ? "electric" : "outline"} className="text-[10px]">
                      {pkg.badge || "Package"}
                    </Badge>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-electric text-black flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-electric font-medium mt-0.5">
                      {pkg.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {pkg.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-base font-black text-foreground font-mono">
                    {pkg.currency}{pkg.basePrice}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {pkg.duration}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Optional Add-Ons Section */}
      <div className="pt-6 border-t border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold uppercase tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric" />
              <span>Optional Treatment Add-ons</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Select any additional treatments to bundle into your appointment.
            </p>
          </div>
          <span className="text-xs font-semibold text-electric">
            {state.selectedAddonIds.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICE_ADDONS.map((addon) => {
            const isSelected = state.selectedAddonIds.includes(addon.id);

            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => onToggleAddon(addon.id)}
                className={cn(
                  "p-3.5 rounded-xl text-left border transition-all flex items-center justify-between gap-3 text-xs select-none",
                  isSelected
                    ? "bg-card border-2 border-electric shadow-sm"
                    : "bg-card/50 border-border/70 hover:border-electric/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors text-black",
                      isSelected ? "bg-electric" : "border border-border bg-background"
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="font-bold text-foreground block line-clamp-1">
                      {addon.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {addon.duration}
                    </span>
                  </div>
                </div>

                <span className="font-mono font-bold text-electric shrink-0">
                  +£{addon.demoPrice}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
