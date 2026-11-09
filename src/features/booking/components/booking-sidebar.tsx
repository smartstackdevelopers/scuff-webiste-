"use client";

import * as React from "react";
import { ChevronDown, Calendar, Clock, Car, Sparkles, ShieldCheck, Tag, MapPin } from "lucide-react";
import { BookingState, ServiceLocation } from "../types/booking";
import { calculateBookingSummary } from "../lib/booking-calculations";
import { formatDisplayDate } from "../lib/date-utils";
import { BASE_TIME_SLOTS } from "../data/availability";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BookingSidebarProps {
  state: BookingState;
}

export function BookingSidebar({ state }: BookingSidebarProps) {
  const [isMobileExpanded, setIsMobileExpanded] = React.useState(false);
  const summary = calculateBookingSummary(state);

  const slotInfo = BASE_TIME_SLOTS.find((s) => s.id === state.timeSlot);
  const formattedTime = slotInfo ? slotInfo.time : null;
  const formattedDate = state.appointmentDate
    ? formatDisplayDate(state.appointmentDate)
    : null;

  return (
    <>
      {/* Mobile Collapsible Bar (Visible on < lg screens) */}
      <div className="lg:hidden mb-6">
        <div className="rounded-2xl border border-electric/30 bg-card/95 backdrop-blur-md shadow-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="w-full p-4 flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-electric/15 text-electric flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {summary.selectedServiceName}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {formattedDate ? `${formattedDate.split(",")[0]}, ${formattedTime || "Select time"}` : "Date pending"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-black text-electric font-mono">
                {summary.priceOnAssessment ? "Quote" : `£${summary.estimatedTotal}`}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform duration-200",
                  isMobileExpanded && "rotate-180 text-electric"
                )}
              />
            </div>
          </button>

          {isMobileExpanded && (
            <div className="px-4 pb-4 pt-1 border-t border-border/40 space-y-3 text-xs">
              <SidebarDetailsContent summary={summary} state={state} formattedDate={formattedDate} formattedTime={formattedTime} />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sticky Sidebar (Visible on lg+ screens) */}
      <div className="hidden lg:block sticky top-24">
        <Card className="bg-card/95 backdrop-blur-md border border-electric/30 shadow-2xl overflow-hidden">
          <CardHeader className="bg-muted/40 border-b border-border/60 pb-4">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="electric" dot className="text-[10px]">
                Live Booking Overview
              </Badge>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Step {state.step} of 5
              </span>
            </div>
            <CardTitle className="text-lg font-black uppercase tracking-tight text-foreground mt-2">
              Reservation Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 space-y-5">
            <SidebarDetailsContent summary={summary} state={state} formattedDate={formattedDate} formattedTime={formattedTime} />

            {/* Total Block */}
            <div className="p-4 rounded-xl bg-muted/60 border border-electric/30 text-center space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground block">
                {summary.priceOnAssessment ? "Pricing Status" : "Estimated Total (Demo)"}
              </span>
              <div className="text-3xl font-black text-electric tracking-tight font-mono">
                {summary.priceOnAssessment ? "Quote" : `£${summary.estimatedTotal}`}
              </div>
              <p className="text-[10px] text-muted-foreground">
                Est. Duration: {summary.estimatedDuration}
              </p>
            </div>

            <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Request subject to availability & suitability</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const LOCATION_LABELS: Record<ServiceLocation, string> = {
  home: "At My Home",
  workplace: "Office / Workplace",
  other: "Other Suitable Location",
  workshop: "Workshop Appointment",
};

function SidebarDetailsContent({
  summary,
  state,
  formattedDate,
  formattedTime,
}: {
  summary: ReturnType<typeof calculateBookingSummary>;
  state: BookingState;
  formattedDate: string | null;
  formattedTime: string | null;
}) {
  return (
    <div className="space-y-4 text-xs">
      {/* Service */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
          Selected Service
        </span>
        <div className="flex items-start justify-between gap-2">
          <span className="font-bold text-foreground">{summary.selectedServiceName}</span>
          <span className="font-mono text-foreground font-semibold">
            {summary.priceOnAssessment ? "Quote" : `£${summary.vehicleAdjustedPrice}`}
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3 text-electric" />
          {summary.estimatedDuration}
        </span>
      </div>

      <div className="space-y-1 pt-2 border-t border-border/40">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
          Location Preference
        </span>
        <p className="flex items-center gap-1.5 text-foreground font-medium">
          <MapPin className="w-3.5 h-3.5 text-electric shrink-0" />
          {LOCATION_LABELS[state.customer.serviceLocation]}
        </p>
      </div>

      {/* Vehicle */}
      <div className="space-y-1 pt-2 border-t border-border/40">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
          Vehicle
        </span>
        <div className="flex items-center justify-between text-foreground font-medium">
          <span className="flex items-center gap-1.5 capitalize">
            <Car className="w-3.5 h-3.5 text-electric shrink-0" />
            {state.customer.vehicleMake && state.customer.vehicleModel
              ? `${state.customer.vehicleMake} ${state.customer.vehicleModel}`
              : `${state.customer.vehicleCategory} (Category)`}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {summary.vehicleMultiplier > 1 ? `${summary.vehicleMultiplier}x rate` : "1.0x"}
          </span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="space-y-1 pt-2 border-t border-border/40">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
          Appointment Slot
        </span>
        <div className="space-y-0.5 text-foreground font-medium">
          <p className="flex items-center gap-1.5 text-xs">
            <Calendar className="w-3.5 h-3.5 text-electric shrink-0" />
            {formattedDate ? formattedDate.split(",").slice(0, 2).join(",") : "Date not selected yet"}
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground pl-5">
            {formattedTime ? `Arrival: ${formattedTime}` : "Time window pending"}
          </p>
        </div>
      </div>

      {/* Add-ons */}
      {summary.addons.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Add-Ons ({summary.addons.length})
            </span>
            <span className="font-mono text-foreground font-semibold">+£{summary.addonsTotal}</span>
          </div>
          <div className="space-y-1 pl-1">
            {summary.addons.map((a) => (
              <div key={a.id} className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="line-clamp-1">• {a.title}</span>
                <span className="font-mono">£{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discount if present */}
      {summary.discountAmount > 0 && (
        <div className="pt-2 border-t border-border/40 flex items-center justify-between text-emerald-400 font-semibold">
          <span className="flex items-center gap-1 text-[11px]">
            <Tag className="w-3 h-3" />
            Coupon ({state.couponCode})
          </span>
          <span className="font-mono">-£{summary.discountAmount}</span>
        </div>
      )}
    </div>
  );
}
