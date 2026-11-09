"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Timer,
  XCircle,
} from "lucide-react";
import { CustomerBooking } from "../types/customer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: CustomerBooking;
  onReschedule?: (booking: CustomerBooking) => void;
  onCancel?: (booking: CustomerBooking) => void;
}

export function BookingCard({ booking, onReschedule, onCancel }: BookingCardProps) {
  const getStatusBadge = (status: CustomerBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="electric" className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Timer className="w-3 h-3 animate-spin" />
            <span>In Progress</span>
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground border-border/80">
            <XCircle className="w-3 h-3 text-destructive" />
            <span>Cancelled</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{booking.statusLabel}</span>
          </Badge>
        );
    }
  };

  const isActionable = booking.status === "confirmed" || booking.status === "pending";

  return (
    <div className="relative group rounded-2xl bg-card border border-border/80 p-5 md:p-6 transition-all duration-300 hover:border-electric/50 hover:shadow-card-hover">
      {/* Top Bar: Reference + Status + Price */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-black tracking-wider text-electric px-2.5 py-1 rounded-md bg-electric/10 border border-electric/30">
            {booking.reference}
          </span>
          {getStatusBadge(booking.status)}
        </div>

        <div className="text-right">
          <span className="text-xs text-muted-foreground block">Total Investment</span>
          <span className="font-mono text-base font-black text-foreground">
            {booking.currency}
            {booking.estimatedPrice}
          </span>
        </div>
      </div>

      {/* Main Body */}
      <div className="py-4 space-y-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-electric transition-colors">
            {booking.serviceName}
          </h3>
          {booking.packageName && (
            <p className="text-xs text-muted-foreground font-medium">
              Package: {booking.packageName}
            </p>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-electric shrink-0" />
            <span className="font-semibold text-foreground truncate">
              {booking.vehicleName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-electric shrink-0" />
            <span>{booking.appointmentDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-electric shrink-0" />
            <span>
              {booking.appointmentTime} ({booking.duration})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-electric shrink-0" />
            <span className="truncate">{booking.locationSummary}</span>
          </div>
        </div>

        {/* Addons preview if any */}
        {booking.addons && booking.addons.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {booking.addons.map((add) => (
              <span
                key={add.id}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/60"
              >
                + {add.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/customer/bookings/${booking.id}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "group/btn text-xs font-bold uppercase tracking-wider"
          )}
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
        </Link>

        {isActionable && (
          <div className="flex items-center gap-2">
            {onReschedule && (
              <button
                type="button"
                onClick={() => onReschedule(booking)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
              >
                Reschedule
              </button>
            )}

            {onCancel && (
              <button
                type="button"
                onClick={() => onCancel(booking)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        )}

        {booking.status === "completed" && (
          <Link
            href="/booking"
            className="inline-flex items-center gap-1 text-xs font-bold text-electric hover:underline"
          >
            <span>Book Again</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
