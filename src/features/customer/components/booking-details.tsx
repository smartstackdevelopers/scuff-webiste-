"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Car,
  MapPin,
  CheckCircle2,
  FileText,
  AlertCircle,
  Timer,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { CustomerBooking } from "../types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RescheduleModal, CancelBookingModal } from "./booking-action-modals";
import { useCustomer } from "../hooks/use-customer";

interface BookingDetailsViewProps {
  bookingId: string;
}

export function BookingDetailsView({ bookingId }: BookingDetailsViewProps) {
  const { bookings, rescheduleBooking, cancelBooking } = useCustomer();
  const [rescheduleOpen, setRescheduleOpen] = React.useState(false);
  const [cancelOpen, setCancelOpen] = React.useState(false);

  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <div className="py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Booking Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The booking reference {bookingId} could not be located in your account.
        </p>
        <Link
          href="/customer/bookings"
          className="inline-flex items-center gap-2 text-xs font-bold text-electric hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Bookings</span>
        </Link>
      </div>
    );
  }

  const isActionable = booking.status === "confirmed" || booking.status === "pending";

  const getStatusBadge = (status: CustomerBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="electric" className="flex items-center gap-1.5 px-3 py-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed Appointment</span>
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="warning" className="flex items-center gap-1.5 px-3 py-1">
            <Timer className="w-3.5 h-3.5 animate-spin" />
            <span>Detailing In Progress</span>
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="flex items-center gap-1.5 px-3 py-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Service Completed</span>
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 text-muted-foreground border-border/80">
            <XCircle className="w-3.5 h-3.5 text-destructive" />
            <span>Cancelled</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="px-3 py-1">
            {booking.statusLabel}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div className="flex items-center gap-3">
          <Link
            href="/customer/bookings"
            className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to bookings"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-black text-electric">
                {booking.reference}
              </span>
              {getStatusBadge(booking.status)}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mt-0.5">
              {booking.serviceName}
            </h1>
          </div>
        </div>

        {isActionable && (
          <div className="flex items-center gap-2 sm:self-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRescheduleOpen(true)}
              className="text-xs font-bold"
            >
              Reschedule
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCancelOpen(true)}
              className="text-xs font-semibold text-destructive hover:bg-destructive/10"
            >
              Cancel Booking
            </Button>
          </div>
        )}
      </div>

      {/* Main Grid: Left Timeline + Details, Right Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Timeline */}
          <div className="rounded-2xl bg-card border border-border/80 p-6 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Appointment Timeline & Status
            </h2>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {booking.timeline.map((stage, idx) => {
                const isDone = stage.isCompleted;
                const isCurrent = stage.isCurrent;

                return (
                  <div key={idx} className="relative group">
                    {/* Bullet marker */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isCurrent
                          ? "bg-electric text-black border-electric shadow-glow-sm"
                          : isDone
                          ? "bg-emerald-500 text-black border-emerald-500"
                          : "bg-background border-border text-muted-foreground"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={`text-sm font-bold ${
                            isCurrent
                              ? "text-electric"
                              : isDone
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {stage.label}
                        </span>
                        {stage.timestamp && (
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {stage.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service & Inclusions Card */}
          <div className="rounded-2xl bg-card border border-border/80 p-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Service Inclusions & Add-Ons
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {booking.serviceName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Tier: {booking.packageName || "Standard"} • Duration: {booking.duration}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-black text-foreground">
                    {booking.currency}
                    {booking.estimatedPrice -
                      booking.addons.reduce((acc, a) => acc + a.price, 0)}
                  </span>
                </div>
              </div>

              {booking.addons.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Selected Upgrades:
                  </span>
                  {booking.addons.map((add) => (
                    <div
                      key={add.id}
                      className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-background border border-border/60"
                    >
                      <span className="font-medium text-foreground">{add.title}</span>
                      <span className="font-mono font-bold text-electric">
                        +{booking.currency}
                        {add.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Special Instructions */}
            {booking.specialInstructions && (
              <div className="pt-3 border-t border-border/60 text-xs">
                <span className="font-semibold text-foreground block mb-1">
                  Technician Special Notes:
                </span>
                <p className="text-muted-foreground italic">
                  &ldquo;{booking.specialInstructions}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Vehicle, Location & Price */}
        <div className="space-y-6">
          {/* Vehicle Information */}
          <div className="rounded-2xl bg-card border border-border/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Vehicle Assigned
              </h2>
              <Car className="w-4 h-4 text-electric" />
            </div>

            <div>
              <p className="text-base font-bold text-foreground">
                {booking.vehicleName}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                Category: {booking.vehicleCategory}
              </p>
            </div>

            {/* UK Registration Plate Style */}
            <div className="inline-block px-3 py-1.5 rounded-md bg-yellow-400 text-black border-2 border-black font-mono text-xs font-black tracking-widest shadow-sm">
              <span>GB</span> <span className="ml-1">YS26 WBF</span>
            </div>
          </div>

          {/* Date, Time & Location */}
          <div className="rounded-2xl bg-card border border-border/80 p-6 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Appointment Info
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">Date</span>
                  <span className="text-muted-foreground">{booking.appointmentDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">Time Slot</span>
                  <span className="text-muted-foreground">
                    {booking.appointmentTime} ({booking.duration})
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">
                    {booking.addressType === "studio" ? "Detailing Studio" : "Mobile Location"}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">
                    {booking.locationSummary}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Invoice */}
          <div className="rounded-2xl bg-card border border-border/80 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Payment Summary
              </h2>
              <FileText className="w-4 h-4 text-electric" />
            </div>

            <div className="space-y-2 text-xs border-b border-border/60 pb-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Base Service</span>
                <span className="font-mono">
                  {booking.currency}
                  {booking.estimatedPrice -
                    booking.addons.reduce((acc, a) => acc + a.price, 0)}
                </span>
              </div>

              {booking.addons.length > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Add-ons ({booking.addons.length})</span>
                  <span className="font-mono">
                    +{booking.currency}
                    {booking.addons.reduce((acc, a) => acc + a.price, 0)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-muted-foreground">
                <span>VAT (20% Inc.)</span>
                <span className="font-mono">
                  {booking.currency}
                  {(booking.estimatedPrice * 0.2).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-sm font-bold text-foreground">Total Price</span>
              <span className="font-mono text-xl font-black text-electric">
                {booking.currency}
                {booking.estimatedPrice}
              </span>
            </div>

            <Link
              href="/customer/invoices"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-electric" />
              <span>View Invoices & Receipts</span>
            </Link>
          </div>

          {/* Need assistance */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-electric shrink-0" />
              <span className="text-muted-foreground">Have questions regarding this service?</span>
            </div>
            <Link
              href="/customer/support"
              className="font-bold text-electric hover:underline shrink-0"
            >
              Get Help
            </Link>
          </div>
        </div>
      </div>

      {/* Reschedule & Cancel Modals */}
      <RescheduleModal
        booking={booking}
        open={rescheduleOpen}
        onOpenChange={setRescheduleOpen}
        onConfirm={(date, time) => rescheduleBooking(booking.id, date, time)}
      />

      <CancelBookingModal
        booking={booking}
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        onConfirm={() => cancelBooking(booking.id)}
      />
    </div>
  );
}
