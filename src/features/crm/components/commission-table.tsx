"use client";

import * as React from "react";
import { useCrm } from "../hooks/use-crm";
import { CommissionPaymentStatus } from "../types/crm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  CheckCircle2,
  ShieldCheck,
  Search,
  Download,
  CreditCard,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { exportToCsv } from "../lib/crm-calculations";

export function CommissionTable() {
  const { commissions, salespersons, approveCommission, payCommission } = useCrm();

  const [search, setSearch] = React.useState("");
  const [salespersonFilter, setSalespersonFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const [page, setPage] = React.useState(1);
  const itemsPerPage = 7;

  // Aggregate Metrics
  const totalCommissionAmount = commissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const pendingApprovalAmount = commissions
    .filter((c) => (c.paymentStatus || c.status) === "pending")
    .reduce((sum, c) => sum + c.commissionAmount, 0);
  const approvedAwaitingPayout = commissions
    .filter((c) => (c.paymentStatus || c.status) === "approved")
    .reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalPaidAmount = commissions
    .filter((c) => (c.paymentStatus || c.status) === "paid")
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  // Filter
  const filteredCommissions = commissions.filter((c) => {
    const client = c.customerName || c.clientName || "";
    const vehicle = c.vehicleSummary || "";
    const currentStatus = c.paymentStatus || c.status || "pending";

    const matchSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.salespersonName.toLowerCase().includes(search.toLowerCase()) ||
      client.toLowerCase().includes(search.toLowerCase()) ||
      c.bookingReference.toLowerCase().includes(search.toLowerCase()) ||
      (c.quotationNumber && c.quotationNumber.toLowerCase().includes(search.toLowerCase())) ||
      vehicle.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (salespersonFilter !== "all" && c.salespersonId !== salespersonFilter) return false;
    if (statusFilter !== "all" && currentStatus !== statusFilter) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredCommissions.length / itemsPerPage) || 1;
  const paginatedList = filteredCommissions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getStatusBadge = (status: CommissionPaymentStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning" className="text-xs">Pending Approval</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">Approved for Payout</Badge>;
      case "paid":
        return <Badge variant="success" className="text-xs">Paid Out</Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="text-xs">Cancelled</Badge>;
    }
  };

  const handleExportCsv = () => {
    const csvData = filteredCommissions.map((c) => ({
      CommissionID: c.id,
      Salesperson: c.salespersonName,
      RatePercent: c.commissionRate || c.rateApplied || 10,
      Reference: c.bookingReference,
      Quotation: c.quotationNumber || "N/A",
      Client: c.customerName || c.clientName || "Client",
      Vehicle: c.vehicleSummary || "Vehicle",
      SaleAmount: c.saleAmount || c.totalSaleValue || 0,
      CommissionAmount: c.commissionAmount,
      Status: c.paymentStatus || c.status || "pending",
      EarnedDate: c.commissionDate || c.earnedDate || "",
      ApprovedDate: c.approvedDate || "Pending",
      PaidDate: c.paidDate || "Pending",
    }));
    exportToCsv(csvData, `you-scuff-we-buff-commissions-${new Date().toISOString().split("T")[0]}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Sales Commission & Payout Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track consultant commissions, approve deal payouts, and prevent duplicate commission claims.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="mr-1.5 h-4 w-4" />
            Export Commission CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Total Commission Value</span>
          <p className="mt-1 text-2xl font-bold text-foreground font-mono">
            £{totalCommissionAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Pending Approval</span>
          <p className="mt-1 text-2xl font-bold text-amber-400 font-mono">
            £{pendingApprovalAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Approved Awaiting Payout</span>
          <p className="mt-1 text-2xl font-bold text-blue-400 font-mono">
            £{approvedAwaitingPayout.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Paid Out (YTD)</span>
          <p className="mt-1 text-2xl font-bold text-emerald-400 font-mono">
            £{totalPaidAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search advisor, client, sale ref, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div>
          <select
            value={salespersonFilter}
            onChange={(e) => setSalespersonFilter(e.target.value)}
            className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Sales Representatives</option>
            {salespersons.map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName || s.name} ({s.commissionRate}%)
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Payout Statuses</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved for Payout</option>
            <option value="paid">Paid Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Commission Table */}
      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30 text-left text-muted-foreground font-medium">
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Representative</th>
                <th className="py-3 px-4">Sale / Deal Reference</th>
                <th className="py-3 px-4">Client & Vehicle</th>
                <th className="py-3 px-4 text-right">Sale Total</th>
                <th className="py-3 px-4 text-right">Commission Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {paginatedList.length > 0 ? (
                paginatedList.map((c) => {
                  const status = c.paymentStatus || c.status || "pending";
                  const client = c.customerName || c.clientName || "Client";
                  const vehicle = c.vehicleSummary || "Registered Vehicle";
                  const saleValue = c.saleAmount || c.totalSaleValue || 0;
                  const dateStr = c.commissionDate || c.earnedDate || "";
                  const rate = c.commissionRate || c.rateApplied || 10;

                  return (
                    <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                      {/* Ref */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-foreground">
                        {c.id}
                        <span className="text-[10px] text-muted-foreground block font-normal">
                          {dateStr}
                        </span>
                      </td>

                      {/* Salesperson */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-foreground block">
                          {c.salespersonName}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          Tier Rate: {rate}%
                        </span>
                      </td>

                      {/* Deal Reference with unique verified badge */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="font-mono text-primary font-medium block">
                            {c.bookingReference}
                          </span>
                          {c.quotationNumber && (
                            <span className="text-[10px] text-muted-foreground block font-mono">
                              Quote: {c.quotationNumber}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                            <ShieldCheck className="h-3 w-3" /> Duplicate-Protected
                          </span>
                        </div>
                      </td>

                      {/* Client & Vehicle */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-foreground block">
                          {client}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {vehicle}
                        </span>
                      </td>

                      {/* Sale Total */}
                      <td className="py-3.5 px-4 text-right font-mono">
                        <span className="text-foreground block">
                          £{saleValue.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Commission Due */}
                      <td className="py-3.5 px-4 text-right font-mono">
                        <span className="font-bold text-emerald-400 text-sm block">
                          £{c.commissionAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(status)}
                        {c.paidDate && (
                          <span className="text-[10px] text-muted-foreground block mt-0.5 font-mono">
                            Paid: {c.paidDate}
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        {status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-500 text-white h-7 text-xs"
                            onClick={() => approveCommission(c.id)}
                          >
                            <UserCheck className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                        )}

                        {status === "approved" && (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white h-7 text-xs"
                            onClick={() => payCommission(c.id)}
                          >
                            <CreditCard className="mr-1 h-3 w-3" />
                            Mark Paid
                          </Button>
                        )}

                        {status === "paid" && (
                          <span className="text-emerald-400 text-xs font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Disbursed
                          </span>
                        )}

                        {status === "cancelled" && (
                          <span className="text-muted-foreground text-xs italic">
                            Voided
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    <DollarSign className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                    No commission records match your filter criteria.
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
              {Math.min(page * itemsPerPage, filteredCommissions.length)} of{" "}
              {filteredCommissions.length} records
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
    </div>
  );
}
