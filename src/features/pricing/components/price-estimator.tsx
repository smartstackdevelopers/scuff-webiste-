"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Truck,
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  ShieldAlert,
  Percent,
} from "lucide-react";
import { VehicleCategory, Coupon } from "../types/pricing";
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VEHICLE_CATEGORIES, PRICING_PACKAGES } from "../data/packages";
import { SERVICE_ADDONS } from "../data/addons";
import { calculateFullPriceBreakdown, formatCurrency } from "../lib/pricing-calculations";
import { CouponForm } from "./coupon-form";

export function PriceEstimator() {
  const [selectedVehicle, setSelectedVehicle] = React.useState<VehicleCategory>("sedan");
  const [selectedPackageId, setSelectedPackageId] = React.useState<string>("premium-detail");
  const [selectedAddonIds, setSelectedAddonIds] = React.useState<string[]>([
    "leather-conditioning",
  ]);
  const [appliedCoupon, setAppliedCoupon] = React.useState<Coupon | null>(null);

  // Active selections
  const currentVehicle =
    VEHICLE_CATEGORIES.find((v) => v.id === selectedVehicle) ||
    VEHICLE_CATEGORIES[1];

  const currentPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPackageId) ||
    PRICING_PACKAGES[1];

  const selectedAddons = SERVICE_ADDONS.filter((a) =>
    selectedAddonIds.includes(a.id)
  );

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.demoPrice, 0);

  // Live breakdown calculation via typed utility
  const breakdown = calculateFullPriceBreakdown({
    packageBasePrice: currentPackage.basePrice,
    vehicleMultiplier: currentVehicle.multiplier,
    addonsTotal,
    appliedCoupon,
  });

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Build target booking URL with query params
  const bookingParams = new URLSearchParams({
    package: currentPackage.id,
    vehicle: currentVehicle.id,
  });
  if (selectedAddonIds.length > 0) {
    bookingParams.set("addons", selectedAddonIds.join(","));
  }
  if (appliedCoupon) {
    bookingParams.set("coupon", appliedCoupon.code);
  }
  const bookingUrl = `/booking?${bookingParams.toString()}`;

  return (
    <section id="estimator" className="py-20 md:py-28 bg-surface-tertiary border-t border-border/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-primary/10 blur-[150px] pointer-events-none -z-10" />

      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <Badge variant="electric" dot>
            Interactive Quote Engine
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            Instant Detailing Price Estimator
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Configure your vehicle size, select your preferred detailing level, add optional treatments, and preview demo savings instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configuration Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Vehicle Category */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-electric text-black font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                  Select Vehicle Category
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICLE_CATEGORIES.map((vehicle) => {
                  const isSelected = selectedVehicle === vehicle.id;

                  return (
                    <button
                      key={vehicle.id}
                      type="button"
                      onClick={() => setSelectedVehicle(vehicle.id)}
                      className={cn(
                        "p-4 rounded-xl text-left border transition-all duration-200 relative flex flex-col justify-between",
                        isSelected
                          ? "bg-card border-2 border-electric shadow-glow-blue"
                          : "bg-card/70 border-border/80 hover:border-electric/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                              isSelected
                                ? "bg-electric text-black"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {vehicle.id === "suv" || vehicle.id === "large" ? (
                              <Truck className="w-4 h-4" />
                            ) : (
                              <Car className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-foreground">
                              {vehicle.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {vehicle.sublabel}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-electric text-black flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-border/40 text-[11px] text-muted-foreground flex items-center justify-between">
                        <span>Size Multiplier</span>
                        <span className="font-mono font-bold text-electric">
                          {vehicle.multiplier === 1.0 ? "Base (1.0x)" : `${vehicle.multiplier}x`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Service Package */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-electric text-black font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                  Select Detailing Package
                </h3>
              </div>

              <div className="space-y-3">
                {PRICING_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={cn(
                        "w-full p-4 sm:p-5 rounded-xl text-left border transition-all duration-200 flex items-center justify-between gap-4",
                        isSelected
                          ? "bg-card border-2 border-electric shadow-glow-blue"
                          : "bg-card/70 border-border/80 hover:border-electric/50"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-bold uppercase tracking-tight text-foreground">
                            {pkg.name}
                          </span>
                          {pkg.recommended && (
                            <Badge variant="electric" className="text-[10px] py-0">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {pkg.tagline}
                        </p>
                        <p className="text-[11px] text-electric font-medium">
                          Duration: {pkg.duration}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-lg sm:text-xl font-black text-foreground block">
                          £{Math.round(pkg.basePrice * currentVehicle.multiplier)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {currentVehicle.multiplier > 1
                            ? `(adj. from £${pkg.basePrice})`
                            : "base price"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Add-ons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-electric text-black font-black text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                    Optional Treatment Add-ons
                  </h3>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {selectedAddonIds.length} selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_ADDONS.map((addon) => {
                  const isSelected = selectedAddonIds.includes(addon.id);

                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={cn(
                        "p-3 rounded-xl text-left border transition-all duration-200 flex items-center justify-between gap-3 text-xs",
                        isSelected
                          ? "bg-card border-electric shadow-sm"
                          : "bg-card/50 border-border/70 hover:border-electric/40"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-md flex items-center justify-center text-black shrink-0 transition-colors",
                            isSelected ? "bg-electric" : "border border-border bg-background"
                          )}
                        >
                          {isSelected ? (
                            <Check className="w-3 h-3 stroke-[3]" />
                          ) : (
                            <Plus className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        <span className="font-semibold text-foreground line-clamp-1">
                          {addon.title}
                        </span>
                      </div>

                      <span className="font-mono font-bold text-electric shrink-0">
                        +£{addon.demoPrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Coupon Voucher Entry */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-electric text-black font-black text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                  Apply Demo Promo Code
                </h3>
              </div>

              <CouponForm
                currentSubtotal={breakdown.subtotal}
                appliedCoupon={appliedCoupon}
                onApplyCoupon={(coupon) => setAppliedCoupon(coupon)}
                onRemoveCoupon={() => setAppliedCoupon(null)}
              />
            </div>
          </div>

          {/* Right Column: Live Summary & Price Breakdown Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <Card className="bg-card/95 backdrop-blur-md border border-electric/40 shadow-2xl overflow-hidden">
              <CardHeader className="bg-muted/40 border-b border-border/60 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="electric" dot>
                    Live Estimation Summary
                  </Badge>
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Instant Quote
                  </span>
                </div>
                <CardTitle className="text-xl font-black uppercase tracking-tight text-foreground mt-2">
                  Estimated Detailing Investment
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Selected Details Itemization */}
                <div className="space-y-3 text-xs">
                  {/* Vehicle */}
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Vehicle Category:</span>
                    <span className="font-bold text-foreground">
                      {currentVehicle.label} ({currentVehicle.multiplier}x)
                    </span>
                  </div>

                  {/* Package */}
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Selected Package:</span>
                    <span className="font-bold text-foreground">
                      {currentPackage.name}
                    </span>
                  </div>

                  {/* Base Package Price */}
                  <div className="flex items-center justify-between text-muted-foreground pl-3 border-l-2 border-border/60">
                    <span>Package Price (size adjusted):</span>
                    <span className="font-mono font-bold text-foreground">
                      {formatCurrency(breakdown.packageAdjustedPrice)}
                    </span>
                  </div>

                  {/* Add-ons List */}
                  <div className="pt-2 border-t border-border/40 space-y-1.5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Selected Add-Ons ({selectedAddons.length}):</span>
                      <span className="font-mono font-bold text-foreground">
                        {formatCurrency(breakdown.addonsTotal)}
                      </span>
                    </div>

                    {selectedAddons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-center justify-between pl-3 text-[11px] text-muted-foreground"
                      >
                        <span className="line-clamp-1">• {addon.title}</span>
                        <span className="font-mono">£{addon.demoPrice}</span>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-sm font-bold text-foreground">
                    <span>Estimated Subtotal:</span>
                    <span className="font-mono">
                      {formatCurrency(breakdown.subtotal)}
                    </span>
                  </div>

                  {/* Discount if applied */}
                  <AnimatePresence>
                    {breakdown.discountAmount > 0 && appliedCoupon && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20"
                      >
                        <span className="flex items-center gap-1.5">
                          <Percent className="w-3.5 h-3.5" />
                          <span>Promo Discount ({appliedCoupon.code}):</span>
                        </span>
                        <span className="font-mono">
                          -{formatCurrency(breakdown.discountAmount)}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Final Estimated Total Box */}
                <div className="p-5 rounded-2xl bg-muted/60 border border-electric/30 space-y-2 text-center">
                  <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground block">
                    Final Estimated Total (Demo)
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-electric tracking-tight">
                    {formatCurrency(breakdown.finalEstimatedTotal)}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Est. Duration: {currentPackage.duration}
                  </p>
                </div>

                {/* Booking Navigation Action */}
                <div className="space-y-3 pt-2">
                  <Link
                    href={bookingUrl}
                    className={cn(
                      buttonVariants({ size: "lg", variant: "glow" }),
                      "w-full text-sm font-bold uppercase tracking-wider justify-center shadow-lg"
                    )}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Proceed with this Estimate
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>

                  {/* Disclaimer */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed flex items-start gap-2 text-left">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Disclaimer:</strong> Final pricing may vary depending on vehicle condition and selected services. Confirmed in person before work commences.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
