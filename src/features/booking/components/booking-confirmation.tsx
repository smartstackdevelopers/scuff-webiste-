"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  ShieldAlert,
  ArrowRight,
  RotateCcw,
  Home,
  MapPin,
} from "lucide-react";
import { BookingState, ServiceLocation } from "../types/booking";
import { calculateBookingSummary } from "../lib/booking-calculations";
import { formatDisplayDate } from "../lib/date-utils";
import { BASE_TIME_SLOTS } from "../data/availability";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingConfirmationProps {
  state: BookingState;
  onReset: () => void;
}

export function BookingConfirmation({ state, onReset }: BookingConfirmationProps) {
  const summary = calculateBookingSummary(state);

  const slotInfo = BASE_TIME_SLOTS.find((s) => s.id === state.timeSlot);
  const formattedTime = slotInfo ? slotInfo.time : state.timeSlot || "Morning Slot";
  const formattedDate = state.appointmentDate
    ? formatDisplayDate(state.appointmentDate)
    : "Appointment Date Confirmed";

  const LOCATION_LABELS: Record<ServiceLocation, string> = {
    home: "At My Home",
    workplace: "At My Office / Workplace",
    other: "Other Suitable Location",
    workshop: "Workshop Appointment",
  };

  return (
    <div className="py-12 max-w-2xl mx-auto space-y-8">
      {/* Success Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="p-8 sm:p-10 bg-card/95 backdrop-blur-md border border-emerald-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
          {/* Subtle green ambient glow */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-emerald-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none -z-10" />

          {/* Success Check Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
            className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg"
          >
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </motion.div>

          <div className="space-y-2">
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/40 font-mono text-xs">
              Reservation Intake Verified
            </Badge>

            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
              Booking Request Received!
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-foreground">{state.customer.fullName}</strong>.
              Your appointment request has been received and is subject to availability and location suitability.
            </p>
          </div>

          {/* Booking Reference Pill */}
          <div className="p-4 rounded-2xl bg-secondary/70 border border-border/80 inline-block space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground block">
              Demo Booking Reference
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-electric tracking-wider">
              {state.confirmationReference || "YSWB-7492"}
            </span>
          </div>

          {/* Summary Breakdown Box */}
          <div className="text-left rounded-2xl bg-muted/40 border border-border/60 p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Scheduled Service
                </span>
                <p className="font-bold text-foreground text-sm">
                  {summary.selectedServiceName}
                </p>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-electric" />
                  {summary.estimatedDuration}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Appointment Window
                </span>
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-electric" />
                  {formattedDate}
                </p>
                <p className="text-electric font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formattedTime}
                </p>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Vehicle
                </span>
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-electric" />
                  {state.customer.vehicleYear} {state.customer.vehicleMake} {state.customer.vehicleModel}
                </p>
                <p className="text-muted-foreground capitalize">
                  Size: {state.customer.vehicleCategory}
                </p>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Service Location
                </span>
                <p className="font-bold text-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-electric" />
                  {LOCATION_LABELS[state.customer.serviceLocation]}
                </p>
                {state.customer.serviceLocation !== "workshop" && (
                  <p className="text-muted-foreground">
                    {[state.customer.addressLine1, state.customer.city, state.customer.postcode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-1 pt-2 sm:col-span-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {summary.priceOnAssessment ? "Pricing" : "Estimated Total (Demo)"}
                </span>
                {summary.priceOnAssessment ? (
                  <p className="font-bold text-electric text-lg">Quote on assessment</p>
                ) : (
                  <p className="font-mono text-2xl font-black text-electric">
                    £{summary.estimatedTotal}
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground">
                  No online payment taken · request pending review
                </p>
              </div>
            </div>

            {summary.addons.length > 0 && (
              <div className="pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
                <span className="font-semibold text-foreground">Add-ons Included:</span>{" "}
                {summary.addons.map((a) => a.title).join(", ")}
              </div>
            )}
          </div>

          {/* Strict Simulation Notice */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2.5 text-left leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Frontend Simulation:</strong> This booking confirmation is a client-side mock demonstration. No actual appointment record or email has been transmitted to a live server. Live backend database scheduling and payment processing will be implemented in subsequent phases.
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "glow", size: "lg" }),
                "w-full sm:w-auto text-sm"
              )}
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Homepage
            </Link>

            <Link
              href="/customer/bookings"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto text-sm hover:border-electric"
              )}
            >
              <span>View Customer Portal</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 pt-2 sm:pt-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Book Another Service
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
