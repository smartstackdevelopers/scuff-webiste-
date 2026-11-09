"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  Car,
  User,
  ShieldCheck,
  Edit,
  Tag,
  AlertCircle,
  MapPin,
} from "lucide-react";
import { BookingState, BookingStep, ServiceLocation } from "../../types/booking";
import { calculateBookingSummary } from "../../lib/booking-calculations";
import { formatDisplayDate } from "../../lib/date-utils";
import { BASE_TIME_SLOTS } from "../../data/availability";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Step5ReviewConfirmProps {
  state: BookingState;
  onGoToStep: (step: BookingStep) => void;
  onSetTermsAccepted: (accepted: boolean) => void;
  errorMessage?: string;
}

export function Step5ReviewConfirm({
  state,
  onGoToStep,
  onSetTermsAccepted,
  errorMessage,
}: Step5ReviewConfirmProps) {
  const summary = calculateBookingSummary(state);

  const slotInfo = BASE_TIME_SLOTS.find((s) => s.id === state.timeSlot);
  const formattedTime = slotInfo ? slotInfo.time : state.timeSlot || "Not set";
  const formattedDate = state.appointmentDate
    ? formatDisplayDate(state.appointmentDate)
    : "Not set";

  const LOCATION_LABELS: Record<ServiceLocation, string> = {
    home: "At My Home",
    workplace: "At My Office / Workplace",
    other: "Other Suitable Location",
    workshop: "Workshop Appointment",
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
          Step 5: Review & Confirm Booking
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Review your appointment details, service location and pricing before submitting your request.
          This is not an automatic confirmation — availability and location suitability will be reviewed.
        </p>

        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Service & Appointment Block */}
        <Card className="p-5 sm:p-6 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <Calendar className="w-4 h-4 text-electric" />
              <span>Appointment & Service</span>
            </div>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => onGoToStep(1)}
              className="text-xs text-electric hover:text-electric/80 gap-1"
            >
              <Edit className="w-3 h-3" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                Primary Treatment
              </span>
              <p className="text-sm font-bold text-foreground">
                {summary.selectedServiceName}
              </p>
              <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-electric" />
                Est. Duration: {summary.estimatedDuration}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                Appointment Schedule
              </span>
              <p className="text-sm font-bold text-foreground">
                {formattedDate}
              </p>
              <p className="text-electric font-semibold flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                Arrival Window: {formattedTime}
              </p>
            </div>
          </div>

          {/* Add-ons List */}
          {summary.addons.length > 0 && (
            <div className="pt-3 border-t border-border/40 space-y-1.5 text-xs">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold block">
                Selected Add-Ons ({summary.addons.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {summary.addons.map((a) => (
                  <span
                    key={a.id}
                    className="px-2.5 py-1 rounded-lg bg-muted text-foreground border border-border/70 text-[11px] font-medium"
                  >
                    {a.title} (+£{a.price})
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Vehicle & Customer Details Block */}
        <Card className="p-5 sm:p-6 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <User className="w-4 h-4 text-electric" />
              <span>Customer & Vehicle Specifications</span>
            </div>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => onGoToStep(4)}
              className="text-xs text-electric hover:text-electric/80 gap-1"
            >
              <Edit className="w-3 h-3" />
              Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                Client Contact
              </span>
              <p className="text-sm font-bold text-foreground">
                {state.customer.fullName || "Not provided"}
              </p>
              <p className="text-muted-foreground">{state.customer.email}</p>
              <p className="text-muted-foreground">{state.customer.phone}</p>
              <p className="text-[11px] text-electric capitalize mt-1">
                Preferred: {state.customer.preferredContact}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold">
                Vehicle Details
              </span>
              <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-electric shrink-0" />
                {state.customer.vehicleYear} {state.customer.vehicleMake} {state.customer.vehicleModel}
              </p>
              <p className="text-muted-foreground capitalize">
                Category: {state.customer.vehicleCategory} ({summary.vehicleMultiplier}x rate)
              </p>
              {state.customer.vehicleReg && (
                <p className="text-[11px] font-mono font-bold text-foreground">
                  Reg: {state.customer.vehicleReg}
                </p>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-border/40 text-xs space-y-2">
            <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold block">
              Service Location
            </span>
            <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-electric shrink-0" />
              {LOCATION_LABELS[state.customer.serviceLocation] || "Not set"}
            </p>
            {state.customer.serviceLocation !== "workshop" && (
              <p className="text-muted-foreground leading-relaxed">
                {[
                  state.customer.addressLine1,
                  state.customer.addressLine2,
                  state.customer.city,
                  state.customer.postcode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          </div>

          {state.customer.damageDescription && (
            <div className="pt-3 border-t border-border/40 text-xs">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold block">
                Damage Description:
              </span>
              <p className="text-foreground/90 italic mt-0.5">
                &ldquo;{state.customer.damageDescription}&rdquo;
              </p>
            </div>
          )}

          {state.customer.specialInstructions && (
            <div className="pt-3 border-t border-border/40 text-xs">
              <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-semibold block">
                Special Access Notes:
              </span>
              <p className="text-foreground/90 italic mt-0.5">
                &ldquo;{state.customer.specialInstructions}&rdquo;
              </p>
            </div>
          )}
        </Card>

        {/* Investment Price Breakdown */}
        <Card className="p-5 sm:p-6 bg-card/95 border border-electric/30 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-3">
            <Tag className="w-4 h-4 text-electric" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {summary.priceOnAssessment ? "Assessment Quote Summary" : "Demo Price Breakdown"}
            </h3>
          </div>

          {summary.priceOnAssessment ? (
            <div className="space-y-3 text-xs">
              <p className="text-sm font-bold text-foreground">
                Pricing confirmed after assessment of the damage and location suitability.
              </p>
              <div className="flex items-center justify-between text-muted-foreground font-semibold">
                <span>Selected Service:</span>
                <span className="font-mono text-foreground">{summary.selectedServiceName}</span>
              </div>
              {summary.addonsTotal > 0 && (
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Optional Add-ons ({summary.addons.length}):</span>
                  <span className="font-mono text-foreground">+£{summary.addonsTotal}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>{summary.selectedServiceName} (Base):</span>
                <span className="font-mono text-foreground">£{summary.basePrice}</span>
              </div>

              {summary.vehicleMultiplier > 1 && (
                <div className="flex items-center justify-between text-muted-foreground pl-2 border-l border-border/40">
                  <span>Vehicle Size Adjustment ({summary.vehicleMultiplier}x):</span>
                  <span className="font-mono text-foreground">£{summary.vehicleAdjustedPrice}</span>
                </div>
              )}

              {summary.addonsTotal > 0 && (
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Add-ons Subtotal ({summary.addons.length}):</span>
                  <span className="font-mono text-foreground">+£{summary.addonsTotal}</span>
                </div>
              )}

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-muted-foreground font-semibold">
                <span>Estimated Subtotal:</span>
                <span className="font-mono text-foreground">£{summary.subtotal}</span>
              </div>

              {summary.discountAmount > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-lg">
                  <span>Voucher Savings ({state.couponCode}):</span>
                  <span className="font-mono">-£{summary.discountAmount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-base sm:text-lg font-black text-foreground">
                <span>Estimated Investment:</span>
                <span className="font-mono text-electric text-2xl font-black">
                  £{summary.estimatedTotal}
                </span>
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 leading-relaxed">
            * <strong>Request Notice:</strong> This submits an appointment request only. Availability,
            location suitability and final pricing are reviewed before confirmation. No payment is taken online.
          </div>
        </Card>

        {/* Terms & Conditions Acceptance */}
        <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
          <div className="flex items-start gap-3">
            <Checkbox
              id="booking-terms"
              checked={state.termsAccepted}
              onChange={(e) => onSetTermsAccepted(e.target.checked)}
              className="mt-0.5"
            />
            <label
              htmlFor="booking-terms"
              className="text-xs text-foreground/90 leading-normal cursor-pointer select-none"
            >
              I understand this is a demonstration reservation request. I agree to the{" "}
              <span className="text-electric font-semibold underline">cancellation policy</span> and consent to You Scuff We Buff contacting me regarding vehicle inspection.
            </label>
          </div>

          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pl-7">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Zero cancellation fee if notified at least 24 hours prior to appointment.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
