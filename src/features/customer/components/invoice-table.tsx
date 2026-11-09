"use client";

import * as React from "react";
import { CustomerInvoice } from "../types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
} from "lucide-react";
import { useCustomer } from "../hooks/use-customer";
import { InvoiceModal } from "./invoice-modal";

interface InvoiceTableProps {
  invoices?: CustomerInvoice[];
}

export function InvoiceTable({ invoices: propInvoices }: InvoiceTableProps) {
  const { invoices: contextInvoices } = useCustomer();
  const invoices = propInvoices || contextInvoices;
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedInvoice, setSelectedInvoice] = React.useState<CustomerInvoice | null>(
    null
  );
  const [modalOpen, setModalOpen] = React.useState(false);

  // Financial summary
  const totalPaid = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalOutstanding = invoices.reduce(
    (acc, inv) => acc + inv.outstandingBalance,
    0
  );

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.bookingReference.toLowerCase().includes(search.toLowerCase()) ||
      inv.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      inv.vehicleName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewInvoice = (inv: CustomerInvoice) => {
    setSelectedInvoice(inv);
    setModalOpen(true);
  };

  const getStatusBadge = (status: CustomerInvoice["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="success" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="warning" className="text-xs">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" /> {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Total Invoiced & Paid
            </span>
            <p className="text-2xl font-black font-mono text-emerald-500 mt-1">
              £{totalPaid.toFixed(2)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Outstanding Balance
            </span>
            <p className="text-2xl font-black font-mono text-foreground mt-1">
              £{totalOutstanding.toFixed(2)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary text-muted-foreground flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice # or booking ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["all", "paid", "pending"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                statusFilter === status
                  ? "bg-electric text-black font-bold shadow-glow-sm"
                  : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices List / Table */}
      {filteredInvoices.length === 0 ? (
        <div className="py-12 text-center rounded-2xl bg-card border border-border/80 space-y-2">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto" />
          <h4 className="text-sm font-bold text-foreground">No Invoices Found</h4>
          <p className="text-xs text-muted-foreground">
            No invoices match your selected filter criteria.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-card border border-border/80 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-secondary/40 border-b border-border/70 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-5">Invoice #</th>
                  <th className="py-3.5 px-4">Booking Ref</th>
                  <th className="py-3.5 px-4">Service & Vehicle</th>
                  <th className="py-3.5 px-4">Issue Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Amount</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="py-4 px-5 font-mono font-bold text-foreground">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-4 font-mono text-electric">
                      {inv.bookingReference}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-foreground">
                        {inv.serviceName}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {inv.vehicleName}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {inv.issueDate}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(inv.status)}</td>
                    <td className="py-4 px-4 text-right font-mono font-black text-sm text-foreground">
                      {inv.currency}
                      {inv.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewInvoice(inv)}
                          className="h-8 px-2.5 text-xs"
                          aria-label={`View invoice ${inv.invoiceNumber}`}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          <span>View</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border/60">
            {filteredInvoices.map((inv) => (
              <div key={inv.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-foreground text-sm">
                    {inv.invoiceNumber}
                  </span>
                  {getStatusBadge(inv.status)}
                </div>

                <div className="space-y-1 text-xs">
                  <p className="font-bold text-foreground">{inv.serviceName}</p>
                  <p className="text-muted-foreground">{inv.vehicleName}</p>
                  <p className="text-muted-foreground">
                    Ref: <span className="text-electric">{inv.bookingReference}</span> • Issued: {inv.issueDate}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="font-mono text-base font-black text-foreground">
                    {inv.currency}{inv.totalAmount.toFixed(2)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewInvoice(inv)}
                    className="text-xs h-8"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    <span>View / Receipt</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      <InvoiceModal
        invoice={selectedInvoice}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
