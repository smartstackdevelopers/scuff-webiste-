"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Car,
  FileText,
  MapPin,
  ChevronRight,
  Plus,
  Sparkles,
  LifeBuoy,
  ArrowUpRight,
  CheckCircle2,
  Timer,
} from "lucide-react";
import { useCustomer } from "../hooks/use-customer";
import { CustomerBooking } from "../types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingCard } from "./booking-card";
import { RescheduleModal, CancelBookingModal } from "./booking-action-modals";

export function DashboardOverview() {
  const { profile, bookings, vehicles, invoices, rescheduleBooking, cancelBooking } =
    useCustomer();

  const [rescheduleBookingTarget, setRescheduleBookingTarget] =
    React.useState<CustomerBooking | null>(null);
  const [cancelBookingTarget, setCancelBookingTarget] =
    React.useState<CustomerBooking | null>(null);

  // Metrics
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "in-progress"
  ).length;
  const completedServices = bookings.filter((b) => b.status === "completed").length;
  const totalInvested = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);

  // Next upcoming appointment
  const nextAppointment =
    bookings.find((b) => b.status === "confirmed" || b.status === "in-progress") ||
    bookings[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-secondary/40 border border-border/80 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="electric" className="text-xs">
                Private Client VIP
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                Client ID: {profile.id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Welcome back, {profile.fullName.split(" ")[0]}
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              Manage your detailing appointments, view vehicle transformation progress, inspect invoices, and configure concierge care.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric text-black text-xs font-black uppercase tracking-wider hover:bg-electric/90 shadow-glow-blue transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Book Service</span>
            </Link>

            <Link
              href="/customer/vehicles"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold transition-colors border border-border/70"
            >
              <Car className="w-4 h-4 text-electric" />
              <span>My Garage</span>
            </Link>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-electric/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-electric/40 transition-colors space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-foreground">
            {totalBookings}
          </p>
          <span className="text-[11px] text-muted-foreground block">
            Across registered vehicles
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-electric/40 transition-colors space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Upcoming
            </span>
            <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center text-electric">
              <Timer className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-electric">
            {upcomingBookings}
          </p>
          <span className="text-[11px] text-muted-foreground block">
            Scheduled sessions
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-electric/40 transition-colors space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Completed
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-500">
            {completedServices}
          </p>
          <span className="text-[11px] text-muted-foreground block">
            Full detailing treatments
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 hover:border-electric/40 transition-colors space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Total Invested
            </span>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-foreground">
            £{totalInvested.toFixed(0)}
          </p>
          <span className="text-[11px] text-muted-foreground block">
            Vehicle protection value
          </span>
        </div>
      </div>

      {/* Next Appointment Feature Card */}
      {nextAppointment && (
        <div className="rounded-3xl bg-card border border-electric/40 p-6 sm:p-7 shadow-glow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-electric animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-electric">
                Next Upcoming Detailing Session
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-muted-foreground">
                Ref: {nextAppointment.reference}
              </span>
              <Badge variant="electric" className="text-xs">
                {nextAppointment.statusLabel}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-foreground">
                {nextAppointment.serviceName}
              </h2>
              {nextAppointment.packageName && (
                <p className="text-xs text-muted-foreground font-medium">
                  Treatment Tier: {nextAppointment.packageName}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-electric shrink-0" />
                  <span className="font-bold text-foreground">
                    {nextAppointment.vehicleName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-electric shrink-0" />
                  <span>{nextAppointment.appointmentDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-electric shrink-0" />
                  <span>
                    {nextAppointment.appointmentTime} ({nextAppointment.duration})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-electric shrink-0" />
                  <span className="truncate">{nextAppointment.locationSummary}</span>
                </div>
              </div>
            </div>

            {/* Actions for next appointment */}
            <div className="flex flex-col gap-2.5 lg:border-l lg:border-border/60 lg:pl-6">
              <Link
                href={`/customer/bookings/${nextAppointment.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-electric text-black text-xs font-black uppercase tracking-wider hover:bg-electric/90 shadow-glow-sm transition-all"
              >
                <span>View Full Details & Live Stage</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRescheduleBookingTarget(nextAppointment)}
                  className="flex-1 text-xs font-semibold"
                >
                  Reschedule
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCancelBookingTarget(nextAppointment)}
                  className="text-xs text-destructive hover:bg-destructive/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Grid: Recent Bookings & Garage Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Recent Appointments
              </h2>
              <p className="text-xs text-muted-foreground">
                Latest service records and ongoing treatments
              </p>
            </div>

            <Link
              href="/customer/bookings"
              className="inline-flex items-center gap-1 text-xs font-bold text-electric hover:underline"
            >
              <span>View All ({bookings.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {bookings.slice(0, 3).map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onReschedule={(booking) => setRescheduleBookingTarget(booking)}
                onCancel={(booking) => setCancelBookingTarget(booking)}
              />
            ))}
          </div>
        </div>

        {/* Saved Garage Preview & Concierge (1 Col) */}
        <div className="space-y-6">
          {/* Garage Preview */}
          <div className="rounded-2xl bg-card border border-border/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Car className="w-4 h-4 text-electric" />
                <span>My Saved Garage ({vehicles.length})</span>
              </h3>

              <Link
                href="/customer/vehicles"
                className="text-xs font-bold text-electric hover:underline"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="p-3 rounded-xl bg-secondary/50 border border-border/60 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-foreground block">
                      {v.year} {v.make} {v.model}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {v.color || "Standard Finish"}
                    </span>
                  </div>

                  <div className="font-mono text-[10px] font-black bg-yellow-400 text-black px-2 py-0.5 rounded border border-black tracking-wider">
                    {v.registration}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/customer/vehicles"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Vehicle</span>
            </Link>
          </div>

          {/* Quick Concierge Help Callout */}
          <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3">
            <div className="flex items-center gap-2 text-electric">
              <LifeBuoy className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Concierge Assistance
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Need custom ceramic coating quotes, track-day prep, or bespoke interior reconditioning?
            </p>

            <Link
              href="/customer/support"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:text-electric transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-electric" />
              <span>Contact Master Detailer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Reschedule & Cancel Modals */}
      <RescheduleModal
        booking={rescheduleBookingTarget}
        open={!!rescheduleBookingTarget}
        onOpenChange={(open) => !open && setRescheduleBookingTarget(null)}
        onConfirm={(date, time) => {
          if (rescheduleBookingTarget) {
            rescheduleBooking(rescheduleBookingTarget.id, date, time);
          }
        }}
      />

      <CancelBookingModal
        booking={cancelBookingTarget}
        open={!!cancelBookingTarget}
        onOpenChange={(open) => !open && setCancelBookingTarget(null)}
        onConfirm={() => {
          if (cancelBookingTarget) {
            cancelBooking(cancelBookingTarget.id);
          }
        }}
      />
    </div>
  );
}
