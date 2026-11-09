"use client";

import * as React from "react";
import { AdminBooking } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAdmin } from "../hooks/use-admin";
import { BookingDetailsModal } from "./booking-details-modal";

export function AdminCalendar() {
  const { bookings, staff, services } = useAdmin();

  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 10, 1)); // Nov 2026
  const [viewMode, setViewMode] = React.useState<"month" | "week" | "agenda">("month");
  const [selectedStaff, setSelectedStaff] = React.useState<string>("all");
  const [selectedService, setSelectedService] = React.useState<string>("all");
  const [selectedBooking, setSelectedBooking] = React.useState<AdminBooking | null>(
    null
  );
  const [modalOpen, setModalOpen] = React.useState(false);

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const setToday = () => {
    setCurrentDate(new Date(2026, 10, 1));
  };

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchStaff =
      selectedStaff === "all" || b.assignedStaffId === selectedStaff;
    const matchService =
      selectedService === "all" || b.serviceId === selectedService;
    return matchStaff && matchService;
  });

  const monthYearLabel = currentDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  // Calendar days grid calculation
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Adjusted for Monday start (UK style)
  const startingDay = (firstDayIndex + 6) % 7;

  const daysArray = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i - startingDay + 1;
    const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
    const dateString = isValidDay
      ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(dayNumber).padStart(2, "0")}`
      : "";
    return { dayNumber, isValidDay, dateString };
  });

  const getStatusColor = (status: AdminBooking["status"]) => {
    switch (status) {
      case "approved":
        return "bg-electric/20 border-electric text-electric-cyan";
      case "in_progress":
        return "bg-amber-500/20 border-amber-500 text-amber-500";
      case "completed":
        return "bg-emerald-500/20 border-emerald-500 text-emerald-500";
      case "cancelled":
        return "bg-destructive/20 border-destructive text-destructive";
      default:
        return "bg-secondary border-border text-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Master Detailing Calendar
            </h1>
            <Badge variant="electric" className="text-xs">
              Studio & Mobile Schedule
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Coordinate appointment slots, track technician capacity, and balance studio bay allocations.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl">
          {(["month", "agenda"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                viewMode === mode
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode} View
            </button>
          ))}
        </div>
      </div>

      {/* Navigation & Filters Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Date Month Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="xs"
              onClick={prevMonth}
              aria-label="Previous month"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={nextMonth}
              aria-label="Next month"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <h2 className="text-base font-bold text-foreground">
            {monthYearLabel}
          </h2>

          <Button
            variant="ghost"
            size="xs"
            onClick={setToday}
            className="text-xs text-electric"
          >
            Today
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground font-bold uppercase">
              Staff:
            </span>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
            >
              <option value="all">All Specialists</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role.split(" ")[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground font-bold uppercase">
              Service:
            </span>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric max-w-[160px]"
            >
              <option value="all">All Services</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      {viewMode === "month" ? (
        <div className="rounded-2xl bg-card border border-border/80 overflow-hidden shadow-sm">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 bg-secondary/50 border-b border-border/70 text-center text-[11px] font-bold text-muted-foreground uppercase py-2.5">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 divide-x divide-y divide-border/60">
            {daysArray.map((cell, idx) => {
              const dayBookings = cell.isValidDay
                ? filteredBookings.filter((b) => b.appointmentDate === cell.dateString)
                : [];

              return (
                <div
                  key={idx}
                  className={`min-h-[110px] p-2 flex flex-col justify-between transition-colors ${
                    cell.isValidDay
                      ? "bg-card hover:bg-secondary/20"
                      : "bg-secondary/20 text-muted-foreground/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        cell.isValidDay ? "text-foreground" : "text-muted-foreground/40"
                      }`}
                    >
                      {cell.isValidDay ? cell.dayNumber : ""}
                    </span>

                    {dayBookings.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                    )}
                  </div>

                  {/* Day Bookings Pills */}
                  <div className="space-y-1 mt-1">
                    {dayBookings.slice(0, 2).map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setSelectedBooking(b);
                          setModalOpen(true);
                        }}
                        className={`w-full text-left p-1 rounded-md border text-[10px] leading-tight truncate font-medium transition-transform hover:scale-[1.02] cursor-pointer ${getStatusColor(
                          b.status
                        )}`}
                      >
                        <span className="font-bold">{b.appointmentTime}</span>{" "}
                        <span>{b.customerName.split(" ")[0]}</span>
                      </button>
                    ))}
                    {dayBookings.length > 2 && (
                      <span className="text-[9px] text-muted-foreground font-mono block text-center">
                        +{dayBookings.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Agenda View */
        <div className="rounded-2xl bg-card border border-border/80 p-5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Chronological Appointment Agenda
          </h3>

          <div className="divide-y divide-border/60">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-secondary/20 px-2 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-electric">
                      {b.reference}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {b.locationType.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-semibold text-foreground">
                      {b.appointmentDate} at {b.appointmentTime}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-foreground">
                    {b.serviceName}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Client: {b.customerName} • {b.vehicleMake} {b.vehicleModel} ({b.vehicleRegistration})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-xs">
                    <span className="font-mono font-bold text-foreground block">
                      {b.currency}{b.amount}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {b.assignedStaffName || "Unassigned"}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => {
                      setSelectedBooking(b);
                      setModalOpen(true);
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
