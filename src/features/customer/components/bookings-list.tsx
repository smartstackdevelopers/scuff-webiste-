"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Search,
  Plus,
} from "lucide-react";
import { useCustomer } from "../hooks/use-customer";
import { CustomerBooking, BookingStatus } from "../types/customer";
import { Input } from "@/components/ui/input";
import { BookingCard } from "./booking-card";
import { RescheduleModal, CancelBookingModal } from "./booking-action-modals";

export function BookingsList() {
  const { bookings, rescheduleBooking, cancelBooking } = useCustomer();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [rescheduleTarget, setRescheduleTarget] = React.useState<CustomerBooking | null>(
    null
  );
  const [cancelTarget, setCancelTarget] = React.useState<CustomerBooking | null>(
    null
  );

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.reference.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleName.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;
    if (statusFilter === "upcoming")
      return b.status === "confirmed" || b.status === "in-progress";
    return b.status === (statusFilter as BookingStatus);
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            My Detailing Bookings
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            View upcoming service slots, inspect real-time progress stages, or reschedule appointments.
          </p>
        </div>

        <Link
          href="/booking"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric text-black text-xs font-black uppercase tracking-wider hover:bg-electric/90 shadow-glow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Book New Service</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by reference, service, or vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { key: "all", label: "All Bookings" },
            { key: "upcoming", label: "Upcoming & Active" },
            { key: "completed", label: "Completed" },
            { key: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === tab.key
                  ? "bg-electric text-black font-bold shadow-glow-sm"
                  : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-card border border-border/80 space-y-3">
          <Calendar className="w-10 h-10 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">
            No Bookings Found
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            There are no detailing appointments matching your current search or filter criteria.
          </p>
          <div className="pt-2">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-electric" />
              <span>Schedule New Detailing</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onReschedule={(booking) => setRescheduleTarget(booking)}
              onCancel={(booking) => setCancelTarget(booking)}
            />
          ))}
        </div>
      )}

      {/* Reschedule & Cancel Modals */}
      <RescheduleModal
        booking={rescheduleTarget}
        open={!!rescheduleTarget}
        onOpenChange={(open) => !open && setRescheduleTarget(null)}
        onConfirm={(date, time) => {
          if (rescheduleTarget) {
            rescheduleBooking(rescheduleTarget.id, date, time);
          }
        }}
      />

      <CancelBookingModal
        booking={cancelTarget}
        open={!!cancelTarget}
        onOpenChange={(open) => !open && setCancelTarget(null)}
        onConfirm={() => {
          if (cancelTarget) {
            cancelBooking(cancelTarget.id);
          }
        }}
      />
    </div>
  );
}
