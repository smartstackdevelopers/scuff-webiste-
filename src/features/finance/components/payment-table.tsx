"use client";

import * as React from "react";
import Link from "next/link";
import {
  CreditCard,
  Search,
  Download,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Building,
  Banknote,
  Globe,
  Receipt,
  RotateCcw,
  Plus,
} from "lucide-react";
import { useFinance } from "../hooks/use-finance";
import { AdminPayment, PaymentMethod, PaymentStatus } from "../types/finance";
import { formatCurrency, exportToCsv } from "../lib/financial-calculations";

export function PaymentTable() {
  const { payments, summary, requestRefund } = useFinance();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [methodFilter, setMethodFilter] = React.useState<PaymentMethod | "all">("all");
  const [statusFilter, setStatusFilter] = React.useState<PaymentStatus | "all">("all");
  const [sortBy, setSortBy] = React.useState<"date" | "amount">("date");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  // Refund dialog state
  const [refundModalPayment, setRefundModalPayment] = React.useState<AdminPayment | null>(null);
  const [refundAmount, setRefundAmount] = React.useState("");
  const [refundReason, setRefundReason] = React.useState("Customer requested cancellation");
  const [refundNotes, setRefundNotes] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered and sorted payments
  const filteredPayments = React.useMemo(() => {
    return payments
      .filter((payment) => {
        const matchesSearch =
          payment.paymentReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (payment.transactionReference &&
            payment.transactionReference.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesMethod = methodFilter === "all" || payment.paymentMethod === methodFilter;
        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;

        return matchesSearch && matchesMethod && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          const dateA = new Date(a.paymentDate).getTime();
          const dateB = new Date(b.paymentDate).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else {
          return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
        }
      });
  }, [payments, searchQuery, methodFilter, statusFilter, sortBy, sortOrder]);

  const handleExportCsv = () => {
    const csvData = filteredPayments.map((p) => ({
      PaymentRef: p.paymentReference,
      InvoiceNumber: p.invoiceNumber,
      Customer: p.customerName,
      Email: p.customerEmail,
      Date: p.paymentDate,
      Time: p.paymentTime || "",
      Method: p.paymentMethod,
      Amount: p.amount,
      Currency: p.currency || "£",
      Status: p.status,
      TransactionRef: p.transactionReference || "",
      IsDeposit: p.isDeposit ? "Yes" : "No",
    }));

    exportToCsv(csvData, `yswb-payments-${new Date().toISOString().split("T")[0]}.csv`);
    showToast(`Exported ${filteredPayments.length} payment records to CSV.`);
  };

  const handleOpenRefundModal = (payment: AdminPayment) => {
    setRefundModalPayment(payment);
    setRefundAmount(payment.amount.toString());
    setRefundReason("Client requested cancellation / adjustment");
    setRefundNotes("");
  };

  const handleConfirmRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundModalPayment) return;

    const amountNum = parseFloat(refundAmount);
    const result = requestRefund({
      paymentId: refundModalPayment.id,
      amount: amountNum,
      reason: refundReason,
      notes: refundNotes,
    });

    if (result.success) {
      showToast(`Refund requested for ${refundModalPayment.paymentReference} (${formatCurrency(amountNum)}).`);
      setRefundModalPayment(null);
    } else {
      alert(result.error || "Failed to submit refund request.");
    }
  };

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case "bank_transfer":
        return <Building className="w-3.5 h-3.5 text-blue-400" />;
      case "cash":
        return <Banknote className="w-3.5 h-3.5 text-emerald-400" />;
      case "online":
      default:
        return <Globe className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case "partially_paid":
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            Pending / Deposit
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <RotateCcw className="w-3 h-3" />
            Refunded
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            Failed
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-300 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              LEDGER &amp; SETTLEMENTS
            </span>
            <span className="text-xs text-zinc-500 font-mono">GBP Sterling (£)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Payments &amp; Transactions
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real-time reconciliation of client deposits, card transactions, bank transfers, and recorded settlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            Export CSV
          </button>
          <Link
            href="/admin/invoices"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Record on Invoice
          </Link>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Collected</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">
              {formatCurrency(summary.totalPaymentsCollected)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Across all verified settlement channels</p>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Completed Payments</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">
              {payments.filter((p) => p.status === "paid").length}
            </span>
            <span className="text-xs text-zinc-500 ml-2">records</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Confirmed &amp; matched to active bookings</p>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Pending / Deposits</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-amber-400">
              {formatCurrency(summary.pendingPayments)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Awaiting completion or partial clearances</p>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Refunds Processed</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">
              {formatCurrency(summary.totalRefunds)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Total customer reimbursements issued</p>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search payment reference, customer, invoice or transaction ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value as PaymentMethod | "all")}
            className="bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Methods</option>
            <option value="bank_transfer">Bank Transfer (BACS)</option>
            <option value="online">Online Payment</option>
            <option value="cash">Cash Settlement</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PaymentStatus | "all")}
            className="bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Completed</option>
            <option value="pending">Pending</option>
            <option value="partially_paid">Partially Paid</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>

          {/* Sort By */}
          <button
            onClick={() => {
              if (sortBy === "date") {
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
              } else {
                setSortBy("date");
                setSortOrder("desc");
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              sortBy === "date"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Date {sortBy === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>

          <button
            onClick={() => {
              if (sortBy === "amount") {
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
              } else {
                setSortBy("amount");
                setSortOrder("desc");
              }
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
              sortBy === "amount"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            Amount {sortBy === "amount" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-900/50 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Payment Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Invoice / Booking</th>
                <th className="py-3.5 px-4">Date &amp; Time</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-500">
                    <Receipt className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold text-zinc-400">No payment records found</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      Try adjusting your search terms or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-zinc-900/40 transition-colors group">
                    {/* Payment Ref */}
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/payments/${payment.id}`}
                        className="font-mono font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1.5"
                      >
                        {payment.paymentReference}
                      </Link>
                      {payment.isDeposit && (
                        <span className="block mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-500/80">
                          Advance Deposit
                        </span>
                      )}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-zinc-100">{payment.customerName}</p>
                      <p className="text-xs text-zinc-500">{payment.customerEmail}</p>
                    </td>

                    {/* Linked Invoice & Booking */}
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/invoices/${payment.invoiceNumber}`}
                        className="font-mono text-xs font-semibold text-zinc-300 hover:text-amber-400 inline-block"
                      >
                        {payment.invoiceNumber}
                      </Link>
                      {payment.bookingReference && (
                        <p className="text-[11px] text-zinc-500 font-mono">
                          Job: {payment.bookingReference}
                        </p>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4">
                      <p className="text-xs text-zinc-200">{payment.paymentDate}</p>
                      {payment.paymentTime && (
                        <p className="text-[11px] text-zinc-500 font-mono">{payment.paymentTime}</p>
                      )}
                    </td>

                    {/* Method */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
                        {getMethodIcon(payment.paymentMethod)}
                        <span className="capitalize">{payment.paymentMethodLabel || payment.paymentMethod.replace("_", " ")}</span>
                      </span>
                      {payment.transactionReference && (
                        <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                          {payment.transactionReference}
                        </p>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono font-extrabold text-white text-base">
                        {formatCurrency(payment.amount, payment.currency)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">{getStatusBadge(payment.status)}</td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/payments/${payment.id}`}
                          title="View Official Receipt"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                        >
                          <Receipt className="w-4 h-4" />
                        </Link>

                        {payment.status === "paid" && (
                          <button
                            onClick={() => handleOpenRefundModal(payment)}
                            title="Request Customer Refund"
                            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-zinc-700/60 transition-colors"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Showing <strong className="text-zinc-300">{filteredPayments.length}</strong> of{" "}
            <strong className="text-zinc-300">{payments.length}</strong> total payment settlements
          </span>
          <span className="font-mono">UK Currency: GBP (£)</span>
        </div>
      </div>

      {/* Refund Request Modal */}
      {refundModalPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-purple-400" />
              Request Refund
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Initiate a client reimbursement against transaction{" "}
              <span className="font-mono text-amber-400 font-semibold">
                {refundModalPayment.paymentReference}
              </span>
              .
            </p>

            <form onSubmit={handleConfirmRefund} className="space-y-4">
              <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Customer:</span>
                  <span className="text-zinc-200 font-semibold">{refundModalPayment.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Original Amount:</span>
                  <span className="font-mono font-bold text-white">
                    {formatCurrency(refundModalPayment.amount, refundModalPayment.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Invoice:</span>
                  <span className="font-mono text-zinc-300">{refundModalPayment.invoiceNumber}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Refund Amount (£) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={refundModalPayment.amount}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Refund Reason *
                </label>
                <select
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="Customer requested cancellation">Customer requested cancellation</option>
                  <option value="Vehicle scheduling conflict">Vehicle scheduling conflict</option>
                  <option value="Adjustment on line items">Adjustment on line items</option>
                  <option value="Customer dissatisfaction (Ceramic rework waiver)">
                    Customer dissatisfaction (Ceramic rework waiver)
                  </option>
                  <option value="Duplicate payment settlement">Duplicate payment settlement</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={refundNotes}
                  onChange={(e) => setRefundNotes(e.target.value)}
                  placeholder="Details for management audit..."
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setRefundModalPayment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Submit Refund Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
