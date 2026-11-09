"use client";

import * as React from "react";
import { AdminBooking } from "../types/admin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Car,
  User,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Timer,
  XCircle,
  Phone,
  Mail,
  Shield,
} from "lucide-react";
import { useAdmin } from "../hooks/use-admin";

interface BookingDetailsModalProps {
  booking: AdminBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDetailsModal({
  booking,
  open,
  onOpenChange,
}: BookingDetailsModalProps) {
  const { approveBooking, rejectBooking, startBooking, completeBooking, cancelBooking } =
    useAdmin();

  if (!booking) return null;

  const getStatusBadge = (status: AdminBooking["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="electric" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Approved
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="warning" className="text-xs">
            <Timer className="w-3 h-3 mr-1 animate-spin" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "cancelled":
      case "rejected":
        return (
          <Badge variant="outline" className="text-xs text-destructive">
            <XCircle className="w-3 h-3 mr-1" /> {booking.statusLabel}
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="warning" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending Approval
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-electric bg-electric/10 px-2 py-0.5 rounded border border-electric/30">
                {booking.reference}
              </span>
              {getStatusBadge(booking.status)}
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              Created: {booking.createdDate}
            </span>
          </div>

          <DialogTitle className="text-lg font-bold text-foreground mt-2">
            {booking.serviceName}
          </DialogTitle>
          <DialogDescription>
            {booking.packageName || "Standard Service"} • Duration: {booking.duration}
          </DialogDescription>
        </DialogHeader>

        {/* Content Details Grid */}
        <div className="space-y-5 text-xs py-2">
          {/* Customer & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-electric" />
                <span>Customer Profile</span>
              </span>
              <p className="font-bold text-foreground text-sm">
                {booking.customerName}
              </p>
              <div className="space-y-1 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  <span>{booking.customerEmail}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3" />
                  <span>{booking.customerPhone}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-electric" />
                <span>Service Location ({booking.locationType.toUpperCase()})</span>
              </span>
              <p className="text-foreground leading-relaxed">
                {booking.locationAddress}
              </p>
              <div className="pt-1 flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-electric" />
                  <span>{booking.appointmentDate}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-electric" />
                  <span>{booking.appointmentTime}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Vehicle & Assigned Technician */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-electric" />
                <span>Automobile Details</span>
              </span>
              <p className="font-bold text-foreground">
                {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="inline-block px-2.5 py-0.5 rounded bg-yellow-400 text-black font-mono text-[10px] font-black border border-black tracking-wider">
                  {booking.vehicleRegistration}
                </div>
                <span className="text-muted-foreground capitalize">
                  {booking.vehicleCategory}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-secondary/50 border border-border/60 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-electric" />
                <span>Assigned Bay & Specialist</span>
              </span>
              <p className="font-bold text-foreground">
                {booking.assignedStaffName || "Unassigned"}
              </p>
              <p className="text-muted-foreground">
                Total Invoiced: <strong className="text-foreground font-mono">{booking.currency}{booking.amount}</strong>
              </p>
            </div>
          </div>

          {/* Notes */}
          {(booking.customerNotes || booking.internalNotes) && (
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 space-y-2">
              {booking.customerNotes && (
                <div>
                  <span className="font-bold text-foreground block mb-0.5">
                    Customer Requests:
                  </span>
                  <p className="text-muted-foreground italic">
                    &ldquo;{booking.customerNotes}&rdquo;
                  </p>
                </div>
              )}
              {booking.internalNotes && (
                <div className="pt-2 border-t border-border/50">
                  <span className="font-bold text-electric block mb-0.5">
                    Internal Operations Notes:
                  </span>
                  <p className="text-muted-foreground">
                    {booking.internalNotes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <DialogFooter className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            Close Window
          </Button>

          <div className="flex items-center gap-2">
            {booking.status === "pending" && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    rejectBooking(booking.id);
                    onOpenChange(false);
                  }}
                  className="text-xs text-destructive hover:bg-destructive/10"
                >
                  Reject
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => {
                    approveBooking(booking.id);
                    onOpenChange(false);
                  }}
                  className="text-xs font-bold"
                >
                  Approve Appointment
                </Button>
              </>
            )}

            {booking.status === "approved" && (
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => {
                  startBooking(booking.id);
                  onOpenChange(false);
                }}
                className="text-xs font-bold"
              >
                Mark In Progress
              </Button>
            )}

            {booking.status === "in_progress" && (
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => {
                  completeBooking(booking.id);
                  onOpenChange(false);
                }}
                className="text-xs font-bold"
              >
                Mark Completed
              </Button>
            )}

            {(booking.status === "approved" || booking.status === "pending") && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  cancelBooking(booking.id);
                  onOpenChange(false);
                }}
                className="text-xs text-destructive hover:bg-destructive/10"
              >
                Cancel Booking
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
