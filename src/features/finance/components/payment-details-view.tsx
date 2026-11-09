"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  Download,
  Building,
  Banknote,
  Globe,
  Receipt,
  RotateCcw,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useFinance } from "../hooks/use-finance";
import { formatCurrency } from "../lib/financial-calculations";

interface PaymentDetailsViewProps {
  id: string;
}

export function PaymentDetailsView({ id }: PaymentDetailsViewProps) {
  const router = useRouter();
  const { payments, invoices, requestRefund } = useFinance();

  const [isRefundModalOpen, setIsRefundModalOpen] = React.useState(false);
  const [refundAmount, setRefundAmount] = React.useState("");
  const [refundReason, setRefundReason] = React.useState("Customer requested adjustment");
  const [refundNotes, setRefundNotes] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Find payment
  const payment = payments.find(
    (p) => p.id === id || p.paymentReference === id || p.id.toLowerCase() === id.toLowerCase()
  );

  // Find associated invoice
  const associatedInvoice = payment
    ? invoices.find(
        (inv) =>
          inv.invoiceNumber === payment.invoiceNumber ||
          inv.id === payment.invoiceNumber
      )
    : undefined;

  const handlePrint = () => {
    window.print();
  };

  const handleSimulateDownload = () => {
    showToast(`Generating certified PDF receipt for voucher ${payment?.paymentReference}... Ready.`);
  };

  const handleConfirmRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment) return;

    const amountNum = parseFloat(refundAmount);
    const result = requestRefund({
      paymentId: payment.id,
      amount: amountNum,
      reason: refundReason,
      notes: refundNotes,
    });

    if (result.success) {
      showToast(`Refund requested for ${payment.paymentReference} (${formatCurrency(amountNum)}).`);
      setIsRefundModalOpen(false);
    } else {
      alert(result.error || "Failed to submit refund request.");
    }
  };

  if (!payment) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center bg-zinc-950 rounded-2xl border border-zinc-800/80">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
          <Receipt className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Payment Record Not Found</h2>
        <p className="text-zinc-400 text-sm max-w-md mb-6">
          The payment transaction identifier &quot;{id}&quot; does not exist in the settlement ledger.
        </p>
        <button
          onClick={() => router.push("/admin/payments")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-sm font-semibold hover:bg-amber-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payments
        </button>
      </div>
    );
  }

  const getMethodIcon = () => {
    switch (payment.paymentMethod) {
      case "bank_transfer":
        return <Building className="w-4 h-4 text-blue-400" />;
      case "cash":
        return <Banknote className="w-4 h-4 text-emerald-400" />;
      case "online":
      default:
        return <Globe className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-300 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 backdrop-blur-md p-4 rounded-2xl border border-zinc-800">
        <Link
          href="/admin/payments"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Transactions
        </Link>

        <div className="flex items-center flex-wrap gap-2.5">
          {payment.invoiceNumber && (
            <Link
              href={`/admin/invoices/${payment.invoiceNumber}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              View Invoice
            </Link>
          )}

          {payment.status === "paid" && (
            <button
              onClick={() => {
                setRefundAmount(payment.amount.toString());
                setIsRefundModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/30 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Issue Refund
            </button>
          )}

          <button
            onClick={handleSimulateDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            PDF Voucher
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Receipt
          </button>
        </div>
      </div>

      {/* Luxury Printable Receipt Document */}
      <div
        id="printable-receipt"
        className="bg-zinc-950 text-zinc-100 rounded-3xl border border-zinc-800/80 p-8 md:p-12 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0 print:bg-white print:text-zinc-900"
      >
        {/* Subtle decorative gold glow background */}
        <div className="print:hidden absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Letterhead */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-8 border-b border-zinc-800/80 print:border-zinc-300">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl md:text-2xl font-black tracking-widest text-white uppercase print:text-black">
                YOU SCUFF WE BUFF
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-amber-700">
                Mobile Repair Service
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider print:text-zinc-600 mb-3">
              Official Payment Receipt &amp; Settlement Voucher
            </p>
            <div className="text-xs text-zinc-400 space-y-1 print:text-zinc-600">
              <p className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                Mobile Coverage: Birmingham &amp; West Midlands
              </p>
              <p>Telephone: 07448 661 691 &bull; info@youscuffwebuff.co.uk</p>
            </div>
          </div>

          <div className="text-left md:text-right space-y-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                payment.status === "paid"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : payment.status === "refunded"
                  ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                  : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {payment.statusLabel || "Settled in Full"}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight font-mono text-white print:text-black">
              {payment.paymentReference}
            </h1>
            <p className="text-xs text-zinc-400 print:text-zinc-600">
              Timestamp: <span className="font-semibold text-zinc-200 print:text-black">{payment.paymentDate} {payment.paymentTime}</span>
            </p>
          </div>
        </div>

        {/* Hero Amount Paid Callout */}
        <div className="my-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-900/40 border border-amber-500/20 text-center relative overflow-hidden print:bg-zinc-50 print:border-zinc-300">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
            Amount Received &amp; Reconciled
          </p>
          <div className="text-4xl md:text-5xl font-black text-amber-400 font-mono tracking-tight print:text-black">
            {formatCurrency(payment.amount, payment.currency)}
          </div>
          <p className="text-xs text-emerald-400 font-medium mt-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Verified Settlement via {payment.paymentMethodLabel || payment.paymentMethod.replace("_", " ")}
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y border-zinc-800/80 print:border-zinc-300 text-xs">
          {/* Payer Information */}
          <div className="space-y-3 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/60 print:bg-transparent print:p-0 print:border-none">
            <h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs">Payer Information</h3>
            <div>
              <p className="text-base font-bold text-white print:text-black">{payment.customerName}</p>
              <p className="text-zinc-400 print:text-zinc-600 mt-1">{payment.customerEmail}</p>
              {payment.customerPhone && (
                <p className="text-zinc-400 print:text-zinc-600">{payment.customerPhone}</p>
              )}
            </div>
            {payment.isDeposit && (
              <div className="mt-3 inline-block px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold text-[11px]">
                Type: Advance Booking Security Deposit
              </div>
            )}
          </div>

          {/* Transaction Metadata */}
          <div className="space-y-3 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/60 print:bg-transparent print:p-0 print:border-none">
            <h3 className="font-bold text-amber-400 uppercase tracking-wider text-xs">
              Transaction Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Settlement Method:</span>
                <span className="font-semibold text-zinc-200 print:text-black flex items-center gap-1.5">
                  {getMethodIcon()}
                  {payment.paymentMethodLabel || payment.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Transaction ID / BACS Ref:</span>
                <span className="font-mono font-semibold text-zinc-300 print:text-black">
                  {payment.transactionReference || "Direct Bank Clearing"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Allocated to Invoice:</span>
                <Link
                  href={`/admin/invoices/${payment.invoiceNumber}`}
                  className="font-mono font-bold text-amber-400 hover:underline inline-flex items-center gap-1 print:text-black"
                >
                  {payment.invoiceNumber}
                  <ExternalLink className="w-3 h-3 print:hidden" />
                </Link>
              </div>
              {payment.bookingReference && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">Service Booking Job:</span>
                  <span className="font-mono font-semibold text-zinc-300 print:text-black">
                    {payment.bookingReference}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Financial Reconciliation Summary */}
        {associatedInvoice && (
          <div className="mt-6 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 print:bg-zinc-50 print:border-zinc-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Invoice Balance Reconciliation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 block">Total Invoice Due:</span>
                <span className="font-mono font-bold text-zinc-200 print:text-black text-sm">
                  {formatCurrency(associatedInvoice.grandTotal, associatedInvoice.currency)}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">This Payment:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatCurrency(payment.amount, payment.currency)}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Total Paid to Date:</span>
                <span className="font-mono font-bold text-zinc-200 print:text-black text-sm">
                  {formatCurrency(associatedInvoice.amountPaid, associatedInvoice.currency)}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Remaining Balance:</span>
                <span
                  className={`font-mono font-extrabold text-sm ${
                    associatedInvoice.outstandingBalance > 0 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {formatCurrency(associatedInvoice.outstandingBalance, associatedInvoice.currency)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        {payment.notes && (
          <div className="mt-6 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 print:bg-zinc-50 print:border-zinc-200 text-xs">
            <span className="font-bold text-zinc-300 print:text-black block mb-1">Receipt Notes:</span>
            <p className="text-zinc-400 print:text-zinc-600 leading-relaxed">{payment.notes}</p>
          </div>
        )}

        {/* Legal Signoff */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 text-center text-[11px] text-zinc-500 print:text-zinc-600 space-y-1">
          <p>
            Official Electronic Settlement Voucher &bull; You Scuff We Buff &bull; Birmingham &amp; West Midlands
          </p>
          <p>
            This document confirms receipt of client funds for mobile alloy wheel refurbishment and SMART repair care.
          </p>
        </div>
      </div>

      {/* Refund Modal */}
      {isRefundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-rose-400" />
              Issue Customer Refund
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Authorize a client refund against payment voucher{" "}
              <span className="font-mono text-amber-400 font-semibold">{payment.paymentReference}</span>.
            </p>

            <form onSubmit={handleConfirmRefund} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Refund Amount (£) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={payment.amount}
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Reason *
                </label>
                <input
                  type="text"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Internal Management Notes
                </label>
                <textarea
                  rows={2}
                  value={refundNotes}
                  onChange={(e) => setRefundNotes(e.target.value)}
                  placeholder="Record explanation for finance audit..."
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsRefundModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
                >
                  Confirm Refund Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
