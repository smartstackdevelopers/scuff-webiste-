"use client";

import * as React from "react";
import Link from "next/link";
import { AdminInvoice, InvoiceStatus } from "../types/finance";
import { useFinance } from "../hooks/use-finance";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Receipt,
  Plus,
  Search,
  Eye,
  Download,
  CreditCard,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RecordPaymentModal } from "./record-payment-modal";
import { exportToCsv } from "../lib/financial-calculations";

export function InvoiceTable() {
  const { invoices, deleteInvoice, summary } = useFinance();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = React.useState<AdminInvoice | null>(null);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 8;

  const filteredInvoices = invoices.filter((inv) => {
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      inv.bookingReference.toLowerCase().includes(search.toLowerCase()) ||
      inv.vehicleMake.toLowerCase().includes(search.toLowerCase()) ||
      inv.vehicleModel.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;
    if (statusFilter !== "all" && inv.status !== statusFilter) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage) || 1;
  const paginatedList = filteredInvoices.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return <Badge variant="success" className="text-xs">Paid in Full</Badge>;
      case "partially_paid":
        return <Badge variant="warning" className="text-xs">Partially Paid</Badge>;
      case "sent":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">Sent (Demo)</Badge>;
      case "overdue":
        return <Badge variant="destructive" className="text-xs">Overdue</Badge>;
      case "draft":
        return <Badge variant="outline" className="text-xs">Draft</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="text-xs text-muted-foreground">Cancelled</Badge>;
    }
  };

  const handleExportCsv = () => {
    const csvData = filteredInvoices.map((inv) => ({
      InvoiceNumber: inv.invoiceNumber,
      Customer: inv.customerName,
      Email: inv.customerEmail,
      Phone: inv.customerPhone,
      BookingReference: inv.bookingReference,
      Vehicle: `${inv.vehicleYear} ${inv.vehicleMake} ${inv.vehicleModel} (${inv.vehicleRegistration})`,
      IssueDate: inv.issueDate,
      DueDate: inv.dueDate,
      Subtotal: inv.subtotal,
      Discount: inv.discountAmount,
      VATAmount: inv.taxAmount,
      GrandTotal: inv.grandTotal,
      AmountPaid: inv.amountPaid,
      OutstandingBalance: inv.outstandingBalance,
      Status: inv.status,
    }));
    exportToCsv(csvData, `you-scuff-we-buff-invoices-${new Date().toISOString().split("T")[0]}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Invoice Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Generate, track, and reconcile customer detailing invoices, advance deposits, and VAT breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="mr-1.5 h-4 w-4" />
            Export Invoices CSV
          </Button>
          <Link href="/admin/invoices/create">
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Create Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Total Invoiced Volume</span>
          <p className="mt-1 text-2xl font-bold text-foreground font-mono">
            £{summary.totalRevenue.toLocaleString("en-GB", { minimumFractionDigits: 0 })}
          </p>
          <span className="text-[10px] text-muted-foreground">{summary.totalInvoices} active invoices</span>
        </div>

        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Collected Revenue</span>
          <p className="mt-1 text-2xl font-bold text-emerald-400 font-mono">
            £{summary.totalPaymentsCollected.toLocaleString("en-GB", { minimumFractionDigits: 0 })}
          </p>
          <span className="text-[10px] text-emerald-400 font-medium">{summary.paidInvoices} paid in full</span>
        </div>

        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Outstanding Balance</span>
          <p className="mt-1 text-2xl font-bold text-primary font-mono">
            £{summary.outstandingBalance.toLocaleString("en-GB", { minimumFractionDigits: 0 })}
          </p>
          <span className="text-[10px] text-muted-foreground">{summary.partiallyPaidInvoices} partially paid</span>
        </div>

        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Overdue Receivables</span>
          <p className="mt-1 text-2xl font-bold text-red-400 font-mono">
            {summary.overdueInvoices}
          </p>
          <span className="text-[10px] text-red-400 font-medium">Action required</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoice #, customer, car, booking ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Invoice Statuses</option>
            <option value="paid">Paid in Full</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="sent">Sent to Client</option>
            <option value="overdue">Overdue</option>
            <option value="draft">Draft</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30 text-left text-muted-foreground font-medium">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Customer & Vehicle</th>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Issue / Due Date</th>
                <th className="py-3 px-4 text-right">Grand Total</th>
                <th className="py-3 px-4 text-right">Paid</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {paginatedList.length > 0 ? (
                paginatedList.map((inv) => (
                  <tr key={inv.id} className="hover:bg-muted/20 transition-colors">
                    {/* Invoice # */}
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/admin/invoices/${inv.id}`}
                        className="font-mono font-bold text-primary hover:underline block"
                      >
                        {inv.invoiceNumber}
                      </Link>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        UK VAT 20%
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-foreground block">
                        {inv.customerName}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {inv.vehicleYear} {inv.vehicleMake} {inv.vehicleModel}
                      </span>
                    </td>

                    {/* Booking Ref */}
                    <td className="py-3.5 px-4 font-mono font-medium text-foreground">
                      {inv.bookingReference}
                    </td>

                    {/* Issue / Due */}
                    <td className="py-3.5 px-4 text-muted-foreground font-mono">
                      <span className="block text-foreground">{inv.issueDate}</span>
                      <span className="text-[10px]">Due: {inv.dueDate}</span>
                    </td>

                    {/* Grand Total */}
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className="font-bold text-foreground text-sm block">
                        £{inv.grandTotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Ex. VAT: £{inv.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Paid */}
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-emerald-400">
                      £{inv.amountPaid.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                    </td>

                    {/* Balance */}
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span
                        className={`font-bold ${
                          inv.outstandingBalance > 0 ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        £{inv.outstandingBalance.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(inv.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {inv.outstandingBalance > 0 && inv.status !== "cancelled" && (
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-primary/20 text-primary border border-primary/40 hover:bg-primary hover:text-primary-foreground"
                            onClick={() => setSelectedInvoiceForPayment(inv)}
                          >
                            <CreditCard className="mr-1 h-3 w-3" />
                            Record Pay
                          </Button>
                        )}

                        <Link href={`/admin/invoices/${inv.id}`}>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>

                        {inv.status === "draft" && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => deleteInvoice(inv.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-muted-foreground">
                    <Receipt className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                    No invoices match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-3 border-t border-border/40 text-xs">
            <span className="text-muted-foreground">
              Showing {(page - 1) * itemsPerPage + 1} to{" "}
              {Math.min(page * itemsPerPage, filteredInvoices.length)} of{" "}
              {filteredInvoices.length} invoices
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="px-2 font-mono text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Recording Modal */}
      <RecordPaymentModal
        open={!!selectedInvoiceForPayment}
        onOpenChange={(open) => !open && setSelectedInvoiceForPayment(null)}
        invoice={selectedInvoiceForPayment}
      />
    </div>
  );
}
