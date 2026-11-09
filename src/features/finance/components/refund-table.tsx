"use client";

import * as React from "react";
import Link from "next/link";
import {
  RotateCcw,
  Search,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useFinance } from "../hooks/use-finance";
import { AdminRefund, RefundStatus } from "../types/finance";
import { formatCurrency, exportToCsv } from "../lib/financial-calculations";

export function RefundTable() {
  const { refunds, payments, requestRefund, approveRefund, rejectRefund, processRefund } =
    useFinance();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<RefundStatus | "all">("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // New refund modal state
  const [isNewRefundModalOpen, setIsNewRefundModalOpen] = React.useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = React.useState("");
  const [newRefundAmount, setNewRefundAmount] = React.useState("");
  const [newRefundReason, setNewRefundReason] = React.useState("Customer requested cancellation");
  const [newRefundNotes, setNewRefundNotes] = React.useState("");

  // Reject dialog state
  const [rejectingRefundId, setRejectingRefundId] = React.useState<string | null>(null);
  const [rejectReason, setRejectReason] = React.useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Find currently selected payment in modal
  const selectedPayment = React.useMemo(() => {
    return payments.find((p) => p.id === selectedPaymentId);
  }, [payments, selectedPaymentId]);

  // Update amount when payment changes
  React.useEffect(() => {
    if (selectedPayment) {
      setNewRefundAmount(selectedPayment.amount.toString());
    }
  }, [selectedPayment]);

  // Set default payment if none selected when modal opens
  React.useEffect(() => {
    if (isNewRefundModalOpen && !selectedPaymentId && payments.length > 0) {
      const eligible = payments.find((p) => p.status === "paid") || payments[0];
      setSelectedPaymentId(eligible.id);
      setNewRefundAmount(eligible.amount.toString());
    }
  }, [isNewRefundModalOpen, selectedPaymentId, payments]);

  // Filtered refunds
  const filteredRefunds = React.useMemo(() => {
    return refunds.filter((r) => {
      const matchesSearch =
        r.refundReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.paymentReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.refundReason.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "all" || r.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [refunds, searchQuery, statusFilter]);

  // Totals
  const totalRefundsValue = refunds
    .filter((r) => r.status === "processed" || r.status === "approved")
    .reduce((sum, r) => sum + r.refundAmount, 0);

  const pendingCount = refunds.filter((r) => r.status === "requested").length;
  const approvedCount = refunds.filter((r) => r.status === "approved").length;
  const processedCount = refunds.filter((r) => r.status === "processed").length;
  const rejectedCount = refunds.filter((r) => r.status === "rejected").length;

  const handleExportCsv = () => {
    const csvData = filteredRefunds.map((r) => ({
      RefundRef: r.refundReference,
      PaymentRef: r.paymentReference,
      InvoiceNumber: r.invoiceNumber,
      Customer: r.customerName,
      RefundAmount: r.refundAmount,
      OriginalAmount: r.originalAmount,
      Date: r.refundDate,
      Status: r.status,
      Reason: r.refundReason,
      ApprovedBy: r.approvedBy || "N/A",
      ApprovedDate: r.approvedDate || "N/A",
    }));

    exportToCsv(csvData, `yswb-refunds-${new Date().toISOString().split("T")[0]}.csv`);
    showToast(`Exported ${filteredRefunds.length} refund entries to CSV.`);
  };

  const handleCreateRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment) return;

    const amount = parseFloat(newRefundAmount);
    const result = requestRefund({
      paymentId: selectedPayment.id,
      amount,
      reason: newRefundReason,
      notes: newRefundNotes,
    });

    if (result.success) {
      showToast(`Refund request logged (${formatCurrency(amount)}) for ${selectedPayment.customerName}.`);
      setIsNewRefundModalOpen(false);
      setNewRefundNotes("");
    } else {
      alert(result.error || "Failed to submit refund.");
    }
  };

  const handleApprove = (r: AdminRefund) => {
    approveRefund(r.id);
    showToast(`Refund ${r.refundReference} approved by Alexander Vance.`);
  };

  const handleProcess = (r: AdminRefund) => {
    processRefund(r.id);
    showToast(`Refund ${r.refundReference} (${formatCurrency(r.refundAmount)}) marked as processed.`);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingRefundId) return;

    rejectRefund(rejectingRefundId, rejectReason);
    showToast(`Refund request rejected.`);
    setRejectingRefundId(null);
    setRejectReason("");
  };

  const getStatusBadge = (status: RefundStatus) => {
    switch (status) {
      case "processed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Processed (Settled)
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <ShieldCheck className="w-3 h-3" />
            Approved
          </span>
        );
      case "requested":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            Requested
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" />
            Rejected
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              AUDIT &amp; REIMBURSEMENTS
            </span>
            <span className="text-xs text-zinc-500 font-mono">GBP Sterling (£)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Refunds &amp; Credit Adjustments
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Authorizations, client cancellations, deposits returns, and audit approvals.
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
          <button
            onClick={() => setIsNewRefundModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Request New Refund
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total Refunded</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">
              {formatCurrency(totalRefundsValue)}
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Approved &amp; processed reimbursements</p>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Pending Review</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-amber-400">{pendingCount}</span>
            <span className="text-xs text-zinc-500 ml-2">awaiting signoff</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Requires management authorization</p>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Approved / Processed</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-white">{approvedCount + processedCount}</span>
            <span className="text-xs text-zinc-500 ml-2">completed</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Dispatched to client bank accounts</p>
        </div>

        <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Declined / Void</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-mono text-zinc-300">{rejectedCount}</span>
            <span className="text-xs text-zinc-500 ml-2">rejected</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">Denied after audit examination</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search refund reference, client, payment, or reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RefundStatus | "all")}
            className="bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="requested">Requested (Pending)</option>
            <option value="approved">Approved</option>
            <option value="processed">Processed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800/80 bg-zinc-900/50 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Refund Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Payment &amp; Invoice</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Reason / Notes</th>
                <th className="py-3.5 px-4 text-right">Refund Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredRefunds.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-500">
                    <RotateCcw className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold text-zinc-400">No refund records found</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      No adjustments match the selected criteria.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredRefunds.map((refund) => (
                  <tr key={refund.id} className="hover:bg-zinc-900/40 transition-colors">
                    {/* Refund Ref */}
                    <td className="py-4 px-4 font-mono font-bold text-purple-400">
                      {refund.refundReference}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-zinc-100">{refund.customerName}</p>
                      <p className="text-xs text-zinc-500">{refund.customerEmail}</p>
                    </td>

                    {/* Payment & Invoice Link */}
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/payments/${refund.paymentId}`}
                        className="font-mono text-xs font-semibold text-amber-400 hover:underline block"
                      >
                        {refund.paymentReference}
                      </Link>
                      <Link
                        href={`/admin/invoices/${refund.invoiceNumber}`}
                        className="font-mono text-[11px] text-zinc-500 hover:text-zinc-300 block"
                      >
                        Inv: {refund.invoiceNumber}
                      </Link>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-xs text-zinc-300">{refund.refundDate}</td>

                    {/* Reason */}
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-xs font-medium text-zinc-200 truncate">{refund.refundReason}</p>
                      {refund.notes && (
                        <p className="text-[11px] text-zinc-500 truncate mt-0.5">{refund.notes}</p>
                      )}
                      {refund.approvedBy && (
                        <p className="text-[10px] text-blue-400 mt-1">
                          Authorized by: {refund.approvedBy}
                        </p>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono font-black text-rose-400 text-base">
                        -{formatCurrency(refund.refundAmount, refund.currency)}
                      </span>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        of {formatCurrency(refund.originalAmount, refund.currency)} paid
                      </p>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">{getStatusBadge(refund.status)}</td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {refund.status === "requested" && (
                          <>
                            <button
                              onClick={() => handleApprove(refund)}
                              className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setRejectingRefundId(refund.id)}
                              className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {refund.status === "approved" && (
                          <button
                            onClick={() => handleProcess(refund)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
                          >
                            Mark Processed
                          </button>
                        )}

                        {refund.status === "processed" && (
                          <span className="text-[11px] text-zinc-500 font-mono">Dispatched</span>
                        )}

                        {refund.status === "rejected" && (
                          <span className="text-[11px] text-rose-400/80 font-mono">Declined</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request New Refund Modal */}
      {isNewRefundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-purple-400" />
              Authorize Client Refund
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Select an existing transaction and enter refund details for financial ledger tracking.
            </p>

            <form onSubmit={handleCreateRefund} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Select Settlement Payment *
                </label>
                <select
                  value={selectedPaymentId}
                  onChange={(e) => setSelectedPaymentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-purple-500"
                  required
                >
                  {payments.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.paymentReference} &bull; {p.customerName} &bull; {formatCurrency(p.amount, p.currency)} ({p.invoiceNumber})
                    </option>
                  ))}
                </select>
              </div>

              {selectedPayment && (
                <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Customer:</span>
                    <span className="text-zinc-200 font-semibold">{selectedPayment.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Settled Amount:</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Payment Method:</span>
                    <span className="text-zinc-300 capitalize">{selectedPayment.paymentMethod.replace("_", " ")}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Refund Amount (£) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={selectedPayment ? selectedPayment.amount : undefined}
                  value={newRefundAmount}
                  onChange={(e) => setNewRefundAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Reason for Refund *
                </label>
                <select
                  value={newRefundReason}
                  onChange={(e) => setNewRefundReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="Customer requested cancellation">Customer requested cancellation</option>
                  <option value="Booking reschedule deposit return">Booking reschedule deposit return</option>
                  <option value="Ceramic coating package adjustment">Ceramic coating package adjustment</option>
                  <option value="Service goodwill adjustment">Service goodwill adjustment</option>
                  <option value="Billing reconciliation correction">Billing reconciliation correction</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={newRefundNotes}
                  onChange={(e) => setNewRefundNotes(e.target.value)}
                  placeholder="Additional context for auditor..."
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsNewRefundModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectingRefundId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              Decline Refund Request
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Specify the rationale for declining this refund request.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Decline Rationale *
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g., Work completed and certified by client; outside 48hr cancellation policy window."
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-rose-500 resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setRejectingRefundId(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Confirm Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
