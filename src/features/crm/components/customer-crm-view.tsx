"use client";

import * as React from "react";
import Link from "next/link";
import { useAdmin } from "@/features/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  User,
  Car,
  Calendar,
  Phone,
  Mail,
  Award,
  Crown,
  FileText,
  Download,
  Plus,
  Send,
  MessageSquare,
} from "lucide-react";
import { exportToCsv } from "../lib/crm-calculations";
import { FollowUpModal } from "./follow-up-modal";

export function CustomerCRMView() {
  const { customers, bookings } = useAdmin();

  const [search, setSearch] = React.useState("");
  const [tierFilter, setTierFilter] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"spend" | "bookings" | "name">("spend");

  // Selected customer for detailed CRM view
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string | null>(null);

  // Follow-up modal state
  const [followUpModalOpen, setFollowUpModalOpen] = React.useState(false);

  // Local customer notes state
  const [customerNotes, setCustomerNotes] = React.useState<Record<string, Array<{ id: string; note: string; author: string; date: string }>>>({
    "cust-1": [
      {
        id: "cn-1",
        note: "Prefers ceramic coating maintenance every 6 months. High-value private collector with 4 vehicles.",
        author: "Julian Thorne",
        date: "2026-02-10",
      },
    ],
    "cust-2": [
      {
        id: "cn-2",
        note: "Requested dedicated enclosed trailer collection for the Ferrari Roma. Extreme care on matte wheels.",
        author: "Beatrice Vance",
        date: "2026-03-01",
      },
    ],
  });

  const [newNoteText, setNewNoteText] = React.useState("");

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  // Helper to extract vehicle list for a customer from bookings
  const getVehiclesForCustomer = (email: string) => {
    const custBookings = bookings.filter((b) => b.customerEmail.toLowerCase() === email.toLowerCase());
    const uniqueVehicles: Array<{ year: string; make: string; model: string; reg: string }> = [];
    const seenRegs = new Set<string>();

    for (const b of custBookings) {
      if (b.vehicleRegistration && !seenRegs.has(b.vehicleRegistration)) {
        seenRegs.add(b.vehicleRegistration);
        uniqueVehicles.push({
          year: b.vehicleYear || "2024",
          make: b.vehicleMake,
          model: b.vehicleModel,
          reg: b.vehicleRegistration,
        });
      }
    }

    if (uniqueVehicles.length === 0) {
      // Default placeholder vehicle for display
      uniqueVehicles.push({
        year: "2024",
        make: "Porsche",
        model: "911 GT3 RS",
        reg: "YS24 BUF",
      });
    }

    return uniqueVehicles;
  };

  // Filter & sort customers
  const filteredCustomers = customers
    .filter((c) => {
      const matchSearch =
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      // Tier filter
      if (tierFilter !== "all") {
        if (tierFilter === "vip" && c.totalSpent < 2000) return false;
        if (tierFilter === "platinum" && (c.totalSpent < 1500 || c.totalSpent >= 2000)) return false;
        if (tierFilter === "gold" && (c.totalSpent < 800 || c.totalSpent >= 1500)) return false;
        if (tierFilter === "silver" && (c.totalSpent < 300 || c.totalSpent >= 800)) return false;
        if (tierFilter === "bronze" && c.totalSpent >= 300) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "spend") return b.totalSpent - a.totalSpent;
      if (sortBy === "bookings") return b.totalBookings - a.totalBookings;
      return a.fullName.localeCompare(b.fullName);
    });

  const getTierBadge = (spend: number) => {
    if (spend >= 2000) {
      return (
        <Badge variant="secondary" className="bg-amber-500/10 text-amber-300 border-amber-500/30 flex items-center gap-1 font-semibold">
          <Crown className="h-3 w-3 text-amber-400" /> VIP Collector
        </Badge>
      );
    }
    if (spend >= 1500) {
      return (
        <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border-purple-500/30 flex items-center gap-1">
          <Award className="h-3 w-3 text-purple-400" /> Platinum Tier
        </Badge>
      );
    }
    if (spend >= 800) {
      return (
        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-300 border-yellow-500/30 flex items-center gap-1">
          <Award className="h-3 w-3 text-yellow-400" /> Gold Tier
        </Badge>
      );
    }
    if (spend >= 300) {
      return (
        <Badge variant="secondary" className="bg-slate-500/10 text-slate-300 border-slate-500/30">
          Silver Tier
        </Badge>
      );
    }
    return <Badge variant="outline">Bronze Tier</Badge>;
  };

  const handleAddCustomerNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || !newNoteText.trim()) return;

    const newNote = {
      id: `cn-${Date.now()}`,
      note: newNoteText.trim(),
      author: "Julian Thorne (Senior Advisor)",
      date: new Date().toISOString().split("T")[0],
    };

    setCustomerNotes((prev) => ({
      ...prev,
      [selectedCustomerId]: [newNote, ...(prev[selectedCustomerId] || [])],
    }));

    setNewNoteText("");
  };

  const handleExportCsv = () => {
    const csvData = filteredCustomers.map((c) => ({
      ID: c.id,
      FullName: c.fullName,
      Email: c.email,
      Phone: c.phone,
      TotalSpent: c.totalSpent,
      TotalBookings: c.totalBookings,
      VehicleCount: c.vehiclesCount || 1,
      RegisteredDate: c.registeredDate,
    }));
    exportToCsv(csvData, "you-scuff-we-buff-customer-crm");
  };

  const selectedVehicles = selectedCustomer ? getVehiclesForCustomer(selectedCustomer.email) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Customer Relationship Profiles
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Deep customer intelligence, lifetime spend history, vehicle registries, and personalized client notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="mr-1.5 h-4 w-4" />
            Export CRM Data
          </Button>
          <Link href="/admin/customers">
            <Button size="sm" variant="default">
              <Plus className="mr-1.5 h-4 w-4" />
              Manage Customer Records
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customer, vehicle registration, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Loyalty Tiers</option>
            <option value="vip">VIP Collector (£2,000+)</option>
            <option value="platinum">Platinum (£1,500 - £1,999)</option>
            <option value="gold">Gold (£800 - £1,499)</option>
            <option value="silver">Silver (£300 - £799)</option>
            <option value="bronze">Bronze (Under £300)</option>
          </select>
        </div>

        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "spend" | "bookings" | "name")}
            className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="spend">Sort by Lifetime Spend (High to Low)</option>
            <option value="bookings">Sort by Total Completed Bookings</option>
            <option value="name">Sort by Client Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Customers CRM Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((cust) => {
            const vehicles = getVehiclesForCustomer(cust.email);

            return (
              <div
                key={cust.id}
                className="rounded-xl border border-border/40 bg-card p-5 flex flex-col justify-between hover:border-primary/40 transition-all space-y-4"
              >
                {/* Header: Name, Avatar, Tier */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {cust.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm leading-tight">
                          {cust.fullName}
                        </h3>
                        <span className="text-xs text-muted-foreground block">
                          Client since {cust.registeredDate || "2025"}
                        </span>
                      </div>
                    </div>
                    {getTierBadge(cust.totalSpent)}
                  </div>

                  {/* Contact Info */}
                  <div className="text-xs space-y-1 text-muted-foreground pt-1 border-t border-border/20">
                    <div className="flex items-center gap-1.5 text-foreground/80">
                      <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="truncate">{cust.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground/80">
                      <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span>{cust.phone}</span>
                    </div>
                  </div>

                  {/* Vehicle Fleet */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5 flex items-center gap-1">
                      <Car className="h-3 w-3 text-primary" />
                      Registered Vehicles ({vehicles.length})
                    </span>
                    <div className="space-y-1">
                      {vehicles.slice(0, 2).map((v, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs bg-muted/40 px-2 py-1 rounded border border-border/30"
                        >
                          <span className="font-medium text-foreground truncate">
                            {v.year} {v.make} {v.model}
                          </span>
                          <span className="font-mono text-[10px] bg-background px-1.5 py-0.5 rounded border border-border/40 font-semibold text-primary">
                            {v.reg}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial & Booking Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/20 text-center">
                    <div className="rounded-lg bg-background/60 p-2 border border-border/30">
                      <span className="text-[10px] text-muted-foreground block">Lifetime Spend</span>
                      <span className="font-mono font-bold text-sm text-emerald-400">
                        £{cust.totalSpent.toLocaleString()}
                      </span>
                    </div>
                    <div className="rounded-lg bg-background/60 p-2 border border-border/30">
                      <span className="text-[10px] text-muted-foreground block">Completed Services</span>
                      <span className="font-mono font-bold text-sm text-foreground">
                        {cust.totalBookings}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 border-t border-border/30 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => setSelectedCustomerId(cust.id)}
                  >
                    <User className="mr-1.5 h-3.5 w-3.5" />
                    View CRM Profile
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full rounded-xl border border-border/40 bg-card p-12 text-center">
            <User className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <h3 className="mt-3 text-base font-semibold text-foreground">No Customer Profiles Found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search criteria or loyalty tier filter.
            </p>
          </div>
        )}
      </div>

      {/* Customer CRM Detailed Profile Modal */}
      <Dialog
        open={!!selectedCustomer}
        onOpenChange={(open) => !open && setSelectedCustomerId(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCustomer && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2 text-xl font-serif">
                    {selectedCustomer.fullName}
                  </DialogTitle>
                  {getTierBadge(selectedCustomer.totalSpent)}
                </div>
                <DialogDescription>
                  Detailed customer relationship metrics, registered fleet, and internal concierge notes.
                </DialogDescription>
              </DialogHeader>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <span className="text-[10px] text-muted-foreground block uppercase font-medium">Lifetime Spend</span>
                  <span className="font-mono font-bold text-base text-emerald-400">
                    £{selectedCustomer.totalSpent.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <span className="text-[10px] text-muted-foreground block uppercase font-medium">Completed Bookings</span>
                  <span className="font-mono font-bold text-base text-foreground">
                    {selectedCustomer.totalBookings}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <span className="text-[10px] text-muted-foreground block uppercase font-medium">Registered Fleet</span>
                  <span className="font-mono font-bold text-base text-foreground">
                    {selectedVehicles.length}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
                  <span className="text-[10px] text-muted-foreground block uppercase font-medium">Avg Order Value</span>
                  <span className="font-mono font-bold text-base text-primary">
                    £{selectedCustomer.totalBookings > 0 ? Math.round(selectedCustomer.totalSpent / selectedCustomer.totalBookings) : 0}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-lg border border-border/40 bg-card p-4 space-y-2 text-xs">
                <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-primary" />
                  Primary Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
                  <div>
                    <span className="block text-[10px] text-muted-foreground/80">Email</span>
                    <a href={`mailto:${selectedCustomer.email}`} className="text-foreground hover:text-primary">
                      {selectedCustomer.email}
                    </a>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground/80">Telephone</span>
                    <a href={`tel:${selectedCustomer.phone}`} className="text-foreground hover:text-primary">
                      {selectedCustomer.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Registered Vehicles Fleet */}
              <div className="rounded-lg border border-border/40 bg-card p-4 space-y-3">
                <h4 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <Car className="h-3.5 w-3.5 text-primary" />
                  Vehicle Fleet Registry ({selectedVehicles.length})
                </h4>
                <div className="space-y-2">
                  {selectedVehicles.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-border/30 bg-muted/20 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-foreground">
                          {v.year} {v.make} {v.model}
                        </span>
                      </div>
                      <span className="font-mono text-xs bg-card px-2 py-0.5 rounded border border-border/50 font-bold text-primary">
                        {v.reg}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concierge Notes & Interaction History */}
              <div className="rounded-lg border border-border/40 bg-card p-4 space-y-3">
                <h4 className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-primary" />
                  CRM Concierge Notes
                </h4>

                <form onSubmit={handleAddCustomerNote} className="flex gap-2">
                  <Input
                    placeholder="Log client preference, vehicle handling notice, special request..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="text-xs"
                  />
                  <Button type="submit" size="sm" disabled={!newNoteText.trim()}>
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>

                <div className="space-y-2 pt-2">
                  {customerNotes[selectedCustomer.id] && customerNotes[selectedCustomer.id].length > 0 ? (
                    customerNotes[selectedCustomer.id].map((n) => (
                      <div
                        key={n.id}
                        className="p-2.5 rounded-lg border border-border/30 bg-background/50 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                          <span className="font-semibold text-foreground">{n.author}</span>
                          <span>{n.date}</span>
                        </div>
                        <p className="text-foreground/90">{n.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic py-1">
                      No internal notes recorded yet for this client profile.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCustomerId(null);
                    setFollowUpModalOpen(true);
                  }}
                >
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  Schedule Touchpoint
                </Button>
                <Link href={`/admin/quotations?email=${selectedCustomer.email}`}>
                  <Button size="sm">
                    <FileText className="mr-1.5 h-3.5 w-3.5" />
                    New Quotation
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Follow-up modal */}
      <FollowUpModal
        open={followUpModalOpen}
        onOpenChange={setFollowUpModalOpen}
      />
    </div>
  );
}
