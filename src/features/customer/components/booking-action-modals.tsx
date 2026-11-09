"use client";

import * as React from "react";
import { CustomerBooking } from "../types/customer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Calendar, Clock, CheckCircle2 } from "lucide-react";

interface RescheduleModalProps {
  booking: CustomerBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: string, time: string) => void;
}

export function RescheduleModal({
  booking,
  open,
  onOpenChange,
  onConfirm,
}: RescheduleModalProps) {
  const [selectedDate, setSelectedDate] = React.useState("2026-11-20");
  const [selectedTime, setSelectedTime] = React.useState("10:00 AM");
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    if (booking) {
      setSelectedDate(booking.appointmentDate || "2026-11-20");
      setSelectedTime(booking.appointmentTime || "10:00 AM");
      setIsSuccess(false);
    }
  }, [booking, open]);

  const timeSlots = [
    "08:30 AM",
    "10:00 AM",
    "11:30 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(selectedDate, selectedTime);
      onOpenChange(false);
      setIsSuccess(false);
    }, 700);
  };

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="default">
        <DialogHeader>
          <div className="flex items-center gap-2 text-electric mb-1">
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              {booking.reference}
            </span>
          </div>
          <DialogTitle>Reschedule Detailing Appointment</DialogTitle>
          <DialogDescription>
            Choose a new date and time slot for your {booking.serviceName}.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-foreground">
              Appointment Rescheduled!
            </h4>
            <p className="text-xs text-muted-foreground">
              Updated to {selectedDate} at {selectedTime}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 py-2">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Select Preferred Date
              </label>
              <Input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-electric text-black font-bold border-electric shadow-glow-sm"
                          : "bg-secondary/60 border-border/80 text-foreground hover:border-electric/50"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-secondary/50 border border-border/60 text-xs text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">Rescheduling Policy</p>
              <p>
                Appointments can be rescheduled at no additional charge up to 24
                hours prior to the scheduled slot.
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                Keep Current Date
              </Button>
              <Button type="submit" variant="default" size="sm">
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface CancelModalProps {
  booking: CustomerBooking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CancelBookingModal({
  booking,
  open,
  onOpenChange,
  onConfirm,
}: CancelModalProps) {
  const [reason, setReason] = React.useState("schedule_conflict");
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (!booking) return null;

  const handleCancel = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm();
      onOpenChange(false);
      setIsSuccess(false);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="default">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              {booking.reference}
            </span>
          </div>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogDescription>
            Are you sure you wish to cancel this detailing appointment?
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-destructive mx-auto" />
            <h4 className="text-base font-bold text-foreground">
              Booking Cancelled
            </h4>
            <p className="text-xs text-muted-foreground">
              Your appointment has been cancelled. Confirmation has been logged.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs space-y-1.5 text-foreground">
              <p className="font-bold">Cancellation Details</p>
              <p className="text-muted-foreground">
                Service: <strong className="text-foreground">{booking.serviceName}</strong>
              </p>
              <p className="text-muted-foreground">
                Date: <strong className="text-foreground">{booking.appointmentDate}</strong> at{" "}
                <strong className="text-foreground">{booking.appointmentTime}</strong>
              </p>
              <p className="text-muted-foreground">
                Vehicle: <strong className="text-foreground">{booking.vehicleName}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Reason for cancellation
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              >
                <option value="schedule_conflict">Schedule conflict / unavailable</option>
                <option value="sold_vehicle">Vehicle sold or changed</option>
                <option value="weather">Inclement weather predicted</option>
                <option value="financial">Budget / financial adjustment</option>
                <option value="other">Other reason</option>
              </select>
            </div>

            <p className="text-[11px] text-muted-foreground">
              * Any refundable deposit will be credited back to your original payment method in 3–5 business days according to our terms of service.
            </p>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                Keep Booking
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleCancel}
              >
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
