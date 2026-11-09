"use client";

import * as React from "react";
import { AdminCustomer } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  Users,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { CustomerModal, DeleteCustomerModal } from "./customer-modal";
import { useAdmin } from "../hooks/use-admin";

export function CustomerTable() {
  const { customers, addCustomer, updateCustomer, deleteCustomer, bookings } =
    useAdmin();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingCustomer, setEditingCustomer] = React.useState<AdminCustomer | null>(
    null
  );
  const [deletingCustomer, setDeletingCustomer] = React.useState<AdminCustomer | null>(
    null
  );
  const [viewingCustomer, setViewingCustomer] = React.useState<AdminCustomer | null>(
    null
  );

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.postcode.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AdminCustomer["status"]) => {
    switch (status) {
      case "vip":
        return <Badge variant="electric">VIP Private Client</Badge>;
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      default:
        return <Badge variant="secondary">Standard</Badge>;
    }
  };

  const handleSaveCustomer = (data: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    status: AdminCustomer["status"];
    notes?: string;
  }) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, data);
      setEditingCustomer(null);
    } else {
      addCustomer(data);
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Customer Management
            </h1>
            <Badge variant="outline" className="text-xs font-mono">
              {customers.length} Clients Registered
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage private vehicle owner records, concierge notes, spending history, and garage fleet profiles.
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setEditingCustomer(null);
            setModalOpen(true);
          }}
          className="text-xs font-bold uppercase tracking-wider"
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          <span>Add New Client</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by client name, email, postcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["all", "vip", "active", "inactive"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === status
                  ? "bg-electric text-black font-bold shadow-glow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {status === "vip" ? "VIP Only" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Table, Right Profile Preview (if selected) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={viewingCustomer ? "lg:col-span-2 space-y-4" : "lg:col-span-3 space-y-4"}>
          <div className="rounded-2xl bg-card border border-border/80 overflow-hidden">
            {filteredCustomers.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground space-y-2">
                <Users className="w-8 h-8 mx-auto text-muted-foreground" />
                <p>No customers match your search criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-secondary/40 border-b border-border/70 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Contact & Location</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Total Spent</th>
                      <th className="py-3.5 px-4">Bookings</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredCustomers.map((c) => {
                      const initials = c.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2);

                      const isSelected = viewingCustomer?.id === c.id;

                      return (
                        <tr
                          key={c.id}
                          className={`hover:bg-secondary/30 transition-colors ${
                            isSelected ? "bg-secondary/50" : ""
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar size="sm">
                                <AvatarFallback className="text-[10px] bg-charcoal-800 text-electric border border-electric/30">
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-bold text-foreground block">
                                  {c.fullName}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                  Joined {c.registeredDate}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-muted-foreground">
                            <span className="block text-foreground font-medium truncate max-w-[170px]">
                              {c.email}
                            </span>
                            <span className="text-[11px]">
                              {c.city}, {c.postcode}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">{getStatusBadge(c.status)}</td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-foreground">
                            £{c.totalSpent}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-muted-foreground">
                            {c.totalBookings} job(s)
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => setViewingCustomer(c)}
                                className="text-xs"
                                title="View Customer Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => {
                                  setEditingCustomer(c);
                                  setModalOpen(true);
                                }}
                                className="text-xs"
                                title="Edit Customer"
                              >
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => setDeletingCustomer(c)}
                                className="text-xs text-destructive hover:bg-destructive/10"
                                title="Delete Customer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Customer Profile Drawer / Card Preview */}
        {viewingCustomer && (
          <div className="rounded-2xl bg-card border border-border/80 p-5 space-y-4 animate-in fade-in">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-border/60">
              <div className="flex items-center gap-3">
                <Avatar size="md">
                  <AvatarFallback className="bg-charcoal-800 text-electric font-bold border border-electric/30">
                    {viewingCustomer.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {viewingCustomer.fullName}
                  </h3>
                  {getStatusBadge(viewingCustomer.status)}
                </div>
              </div>

              <Button
                variant="ghost"
                size="xs"
                onClick={() => setViewingCustomer(null)}
                className="text-xs text-muted-foreground"
              >
                Close
              </Button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1.5 p-3 rounded-xl bg-secondary/40 border border-border/60">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span className="truncate">{viewingCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span>{viewingCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span>
                    {viewingCustomer.address}, {viewingCustomer.city} {viewingCustomer.postcode}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                    Total Invested
                  </span>
                  <span className="text-base font-black font-mono text-electric mt-0.5 block">
                    £{viewingCustomer.totalSpent}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">
                    Vehicles
                  </span>
                  <span className="text-base font-black font-mono text-foreground mt-0.5 block">
                    {viewingCustomer.vehiclesCount} Saved
                  </span>
                </div>
              </div>

              {viewingCustomer.notes && (
                <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
                  <span className="text-[10px] font-bold text-foreground uppercase tracking-wider block mb-1">
                    Concierge Notes
                  </span>
                  <p className="text-muted-foreground italic text-[11px] leading-relaxed">
                    &ldquo;{viewingCustomer.notes}&rdquo;
                  </p>
                </div>
              )}

              {/* Past Bookings by this customer */}
              <div className="pt-2 border-t border-border/60 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Customer Booking History
                </span>
                {bookings
                  .filter((b) => b.customerEmail === viewingCustomer.email)
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-2.5 rounded-lg bg-background border border-border/60 flex items-center justify-between text-[11px]"
                    >
                      <div>
                        <span className="font-mono font-bold text-electric block">
                          {b.reference}
                        </span>
                        <span className="text-muted-foreground">
                          {b.serviceName}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-foreground">
                        {b.currency}{b.amount}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customer Add/Edit Modal */}
      <CustomerModal
        customerToEdit={editingCustomer}
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setEditingCustomer(null);
        }}
        onSave={handleSaveCustomer}
      />

      {/* Customer Delete Modal */}
      <DeleteCustomerModal
        customer={deletingCustomer}
        open={!!deletingCustomer}
        onOpenChange={(open) => !open && setDeletingCustomer(null)}
        onConfirm={() => {
          if (deletingCustomer) {
            deleteCustomer(deletingCustomer.id);
            if (viewingCustomer?.id === deletingCustomer.id) {
              setViewingCustomer(null);
            }
            setDeletingCustomer(null);
          }
        }}
      />
    </div>
  );
}
