"use client";

import * as React from "react";
import Link from "next/link";
import { AdminBooking } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowUpRight,
  Eye,
  CheckCircle2,
  Timer,
  AlertCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { BookingDetailsModal } from "./booking-details-modal";

interface RecentBookingsProps {
  bookings: AdminBooking[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedBooking, setSelectedBooking] = React.useState<AdminBooking | null>(
    null
  );
  const [modalOpen, setModalOpen] = React.useState(false);

  const filtered = bookings
    .filter((b) => {
      const matchSearch =
        b.reference.toLowerCase().includes(search.toLowerCase()) ||
        b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.serviceName.toLowerCase().includes(search.toLowerCase()) ||
        b.vehicleModel.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;
      if (statusFilter === "all") return true;
      return b.status === statusFilter;
    })
    .slice(0, 5);

  const handleView = (b: AdminBooking) => {
    setSelectedBooking(b);
    setModalOpen(true);
  };

  const getStatusBadge = (status: AdminBooking["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="electric" className="text-[10px] py-0.5">
            Approved
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="warning" className="text-[10px] py-0.5">
            <Timer className="w-2.5 h-2.5 mr-1 animate-spin" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="success" className="text-[10px] py-0.5">
            <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Completed
          </Badge>
        );
      case "cancelled":
      case "rejected":
        return (
          <Badge variant="outline" className="text-[10px] py-0.5 text-destructive">
            <XCircle className="w-2.5 h-2.5 mr-1" /> Cancelled
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="warning" className="text-[10px] py-0.5">
            <AlertCircle className="w-2.5 h-2.5 mr-1" /> Pending
          </Badge>
        );
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 space-y-4">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-foreground">
              Recent Detailing Bookings
            </h3>
            <Badge variant="outline" className="text-[10px] font-mono">
              Live Mock Feed
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest incoming service requests, technician assignments, and progress states
          </p>
        </div>

        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-1 text-xs font-bold text-electric hover:underline self-start sm:self-center"
        >
          <span>View All ({bookings.length})</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {["all", "pending", "approved", "in_progress", "completed"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === tab
                  ? "bg-electric text-black font-bold shadow-glow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table (Desktop) / Cards (Mobile) */}
      {filtered.length === 0 ? (
        <div className="py-10 text-center space-y-2 text-xs text-muted-foreground">
          <Calendar className="w-8 h-8 text-muted-foreground mx-auto" />
          <p>No bookings match the selected filter criteria.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/70 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-secondary/40 border-b border-border/70 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Ref</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">Appointment</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-electric">
                      {b.reference}
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground">
                      {b.customerName}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground truncate max-w-[150px]">
                      {b.serviceName}
                    </td>
                    <td className="py-3 px-4 text-foreground font-medium">
                      {b.vehicleMake} {b.vehicleModel}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {b.appointmentDate} <span className="text-[10px]">({b.appointmentTime})</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-foreground">
                      {b.currency}{b.amount}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(b.status)}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleView(b)}
                        className="text-xs font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Manage</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border/60">
            {filtered.map((b) => (
              <div key={b.id} className="p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-electric">
                    {b.reference}
                  </span>
                  {getStatusBadge(b.status)}
                </div>

                <div>
                  <p className="font-bold text-foreground">{b.customerName}</p>
                  <p className="text-muted-foreground">
                    {b.serviceName} • {b.vehicleMake} {b.vehicleModel}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {b.appointmentDate} at {b.appointmentTime}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="font-mono font-bold text-foreground">
                    {b.currency}{b.amount}
                  </span>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleView(b)}
                  >
                    <span>Inspect</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal View */}
      <BookingDetailsModal
        booking={selectedBooking}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
