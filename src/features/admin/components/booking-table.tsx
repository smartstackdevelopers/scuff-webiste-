"use client";

import * as React from "react";
import { AdminBooking } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Eye,
  CheckCircle2,
  Timer,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Calendar,
} from "lucide-react";
import { BookingDetailsModal } from "./booking-details-modal";
import { useAdmin } from "../hooks/use-admin";

export function BookingTable() {
  const { bookings } = useAdmin();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [serviceFilter, setServiceFilter] = React.useState<string>("all");
  const [selectedBooking, setSelectedBooking] = React.useState<AdminBooking | null>(
    null
  );
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sortField, setSortField] = React.useState<"date" | "amount" | "customer">("date");
  const [sortAsc, setSortAsc] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 6;

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.reference.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleModel.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleRegistration.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || b.status === statusFilter;

    const matchesService =
      serviceFilter === "all" || b.serviceId === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Sort logic
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortField === "amount") {
      return sortAsc ? a.amount - b.amount : b.amount - a.amount;
    }
    if (sortField === "customer") {
      return sortAsc
        ? a.customerName.localeCompare(b.customerName)
        : b.customerName.localeCompare(a.customerName);
    }
    // Date
    return sortAsc
      ? a.appointmentDate.localeCompare(b.appointmentDate)
      : b.appointmentDate.localeCompare(a.appointmentDate);
  });

  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage) || 1;
  const paginated = sortedBookings.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSort = (field: "date" | "amount" | "customer") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getStatusBadge = (status: AdminBooking["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="electric" className="text-xs">
            Approved
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
            <XCircle className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge variant="warning" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Booking Management
            </h1>
            <Badge variant="outline" className="text-xs font-mono">
              {bookings.length} Records
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Approve requests, assign specialists, track detailing lift bays, and update progress.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reference, customer, vehicle..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 text-xs"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 px-3 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved & Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <select
              value={serviceFilter}
              onChange={(e) => {
                setServiceFilter(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 px-3 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
            >
              <option value="all">All Services</option>
              <option value="ceramic-graphene-coating">Ceramic & Graphene Coating</option>
              <option value="paint-correction">Multi-Stage Paint Correction</option>
              <option value="scuff-scratch-repair">SMART Scuff & Scratch Repair</option>
              <option value="interior-detailing">Interior Deep Extraction</option>
              <option value="exterior-detailing">Exterior Safe Wash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl bg-card border border-border/80 overflow-hidden">
        {paginated.length === 0 ? (
          <div className="py-16 text-center space-y-3 text-xs text-muted-foreground">
            <Calendar className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="font-bold text-sm text-foreground">No bookings found</p>
            <p>Try resetting the search terms or status filters.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border/70 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Ref</th>
                    <th
                      className="py-3.5 px-4 cursor-pointer hover:text-foreground transition-colors"
                      onClick={() => handleSort("customer")}
                    >
                      <div className="flex items-center gap-1">
                        <span>Customer</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-3.5 px-4">Service Package</th>
                    <th className="py-3.5 px-4">Vehicle</th>
                    <th
                      className="py-3.5 px-4 cursor-pointer hover:text-foreground transition-colors"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center gap-1">
                        <span>Appointment</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="py-3.5 px-4 cursor-pointer hover:text-foreground transition-colors text-right"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Amount</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {paginated.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-secondary/30 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-electric">
                        {b.reference}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-foreground block">
                          {b.customerName}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {b.customerPhone}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-foreground block truncate max-w-[200px]">
                          {b.serviceName}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {b.locationType.toUpperCase()} ({b.duration})
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-foreground block">
                          {b.vehicleMake} {b.vehicleModel}
                        </span>
                        <span className="font-mono text-[10px] bg-yellow-400 text-black px-1.5 py-0.2 rounded font-black tracking-wider inline-block">
                          {b.vehicleRegistration}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        <span className="font-medium text-foreground block">
                          {b.appointmentDate}
                        </span>
                        <span className="text-[11px]">{b.appointmentTime}</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-sm text-foreground">
                        {b.currency}{b.amount}
                      </td>
                      <td className="py-3.5 px-4">{getStatusBadge(b.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => {
                              setSelectedBooking(b);
                              setModalOpen(true);
                            }}
                            className="text-xs"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            <span>Details</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Cards */}
            <div className="lg:hidden divide-y divide-border/60">
              {paginated.map((b) => (
                <div key={b.id} className="p-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-electric">
                      {b.reference}
                    </span>
                    {getStatusBadge(b.status)}
                  </div>

                  <div>
                    <p className="font-bold text-foreground text-sm">
                      {b.customerName}
                    </p>
                    <p className="text-muted-foreground">
                      {b.serviceName} • {b.vehicleMake} {b.vehicleModel}
                    </p>
                    <p className="text-muted-foreground mt-0.5">
                      {b.appointmentDate} at {b.appointmentTime} ({b.locationType})
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="font-mono text-base font-black text-foreground">
                      {b.currency}{b.amount}
                    </span>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => {
                        setSelectedBooking(b);
                        setModalOpen(true);
                      }}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      <span>Manage Booking</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Showing {(page - 1) * itemsPerPage + 1} to{" "}
                {Math.min(page * itemsPerPage, sortedBookings.length)} of{" "}
                {sortedBookings.length} bookings
              </span>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="xs"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <span className="px-2 font-mono font-bold text-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="xs"
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
