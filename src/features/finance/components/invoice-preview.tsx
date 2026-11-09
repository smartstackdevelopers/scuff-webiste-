"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  Download,
  Send,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Car,
  Building2,
  Calendar,
  FileText,
  Mail,
  Phone,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { useFinance } from "../hooks/use-finance";
import { InvoiceStatus } from "../types/finance";
import { formatCurrency } from "../lib/financial-calculations";
import { RecordPaymentModal } from "./record-payment-modal";

interface InvoicePreviewProps {
  id: string;
}

export function InvoicePreview({ id }: InvoicePreviewProps) {
  const router = useRouter();
  const { invoices, changeInvoiceStatus } = useFinance();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Find invoice
  const invoice = invoices.find(
    (inv) => inv.id === id || inv.invoiceNumber === id || inv.id.toLowerCase() === id.toLowerCase()
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSimulateDownloadPdf = () => {
    showToast(`Generating high-resolution PDF for ${invoice?.invoiceNumber}... Download ready.`);
  };

  const handleSimulateEmail = () => {
    showToast(`Invoice ${invoice?.invoiceNumber} successfully dispatched to ${invoice?.customerEmail}.`);
  };

  if (!invoice) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-8 text-center bg-zinc-950 rounded-2xl border border-zinc-800/80">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-4">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Invoice Not Found</h2>
        <p className="text-zinc-400 text-sm max-w-md mb-6">
          The requested invoice identifier &quot;{id}&quot; does not correspond to an active billing document.
        </p>
        <button
          onClick={() => router.push("/admin/invoices")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-sm font-semibold hover:bg-amber-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Invoices
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Paid in Full
          </span>
        );
      case "partially_paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            Partially Paid
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <AlertCircle className="w-3.5 h-3.5" />
            Overdue
          </span>
        );
      case "sent":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Send className="w-3.5 h-3.5" />
            Sent to Client
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
            Cancelled
          </span>
        );
      case "draft":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-700/50 text-zinc-300 border border-zinc-600">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900 border border-amber-500/40 text-amber-300 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="print:hidden flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900/60 backdrop-blur-md p-4 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/invoices"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Invoices
          </Link>
          <div className="h-4 w-px bg-zinc-700" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Status:</span>
            <select
              value={invoice.status}
              onChange={(e) => changeInvoiceStatus(invoice.id, e.target.value as InvoiceStatus)}
              className="bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-semibold px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="paid">Paid in Full</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {invoice.outstandingBalance > 0 && (
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              Record Payment
            </button>
          )}

          <button
            onClick={handleSimulateEmail}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            Dispatch Email
          </button>

          <button
            onClick={handleSimulateDownloadPdf}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            PDF
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-400" />
            Print
          </button>
        </div>
      </div>

      {/* Main Luxury Invoice Document */}
      <div
        id="printable-invoice"
        className="bg-zinc-950 text-zinc-100 rounded-3xl border border-zinc-800/80 p-8 md:p-12 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0 print:bg-white print:text-zinc-900"
      >
        {/* Subtle decorative gold glow background */}
        <div className="print:hidden absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Studio Letterhead & Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-8 border-b border-zinc-800/80 print:border-zinc-300">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl md:text-2xl font-black tracking-widest text-white uppercase print:text-black">
                YOU SCUFF WE BUFF
              </span>
              <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 print:text-amber-700">
                Studio London
              </span>
            </div>
            <p className="text-xs text-zinc-400 uppercase tracking-widest print:text-zinc-600 mb-4 font-mono">
              Automotive Detailing &amp; Bespoke Protection Studio
            </p>

            <div className="text-xs text-zinc-400 space-y-1 print:text-zinc-600">
              <p className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                14 Berkeley Square, Mayfair, London W1J 6BD
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                +44 20 7946 0912
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                concierge@youscuffwebuff.co.uk
              </p>
            </div>
          </div>

          {/* Invoice Document Reference */}
          <div className="text-left md:text-right space-y-2">
            <div className="inline-block">{getStatusBadge(invoice.status)}</div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-mono print:text-black">
              {invoice.invoiceNumber}
            </h1>
            <div className="text-xs text-zinc-400 space-y-1 print:text-zinc-600">
              <p>
                <span className="text-zinc-500 print:text-zinc-400">Issue Date:</span>{" "}
                <span className="font-semibold text-zinc-200 print:text-zinc-800">{invoice.issueDate}</span>
              </p>
              <p>
                <span className="text-zinc-500 print:text-zinc-400">Payment Due:</span>{" "}
                <span className="font-semibold text-zinc-200 print:text-zinc-800">{invoice.dueDate}</span>
              </p>
              <p>
                <span className="text-zinc-500 print:text-zinc-400">Booking Ref:</span>{" "}
                <span className="font-mono font-semibold text-amber-400 print:text-zinc-800">
                  {invoice.bookingReference}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Client & Vehicle Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-zinc-800/80 print:border-zinc-300">
          {/* Client Details */}
          <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60 print:bg-transparent print:p-0 print:border-none">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 print:text-zinc-900">
              Billed To
            </h3>
            <p className="text-base font-bold text-white print:text-black">{invoice.customerName}</p>
            <div className="mt-2 space-y-1 text-xs text-zinc-400 print:text-zinc-600">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                {invoice.customerEmail}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-500" />
                {invoice.customerPhone}
              </p>
              {(invoice.billingAddress || invoice.customerAddress) && (
                <p className="mt-2 text-zinc-300 leading-relaxed print:text-zinc-700">
                  {invoice.billingAddress || invoice.customerAddress}
                </p>
              )}
            </div>
          </div>

          {/* Vehicle Specifications */}
          <div className="bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60 print:bg-transparent print:p-0 print:border-none">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-zinc-900 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5" />
                Vehicle Under Care
              </h3>
              {(invoice.vehicleReg || invoice.vehicleRegistration) && (
                <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-amber-400/10 text-amber-400 border border-amber-400/30 print:bg-zinc-100 print:text-black">
                  {invoice.vehicleReg || invoice.vehicleRegistration}
                </span>
              )}
            </div>

            <p className="text-base font-bold text-white print:text-black">
              {invoice.vehicleYear ? `${invoice.vehicleYear} ` : ""}
              {invoice.vehicleMake} {invoice.vehicleModel}
            </p>

            <div className="mt-2 space-y-1 text-xs text-zinc-400 print:text-zinc-600">
              {invoice.vehicleColor && (
                <p>
                  Finish: <span className="text-zinc-200 print:text-zinc-800">{invoice.vehicleColor}</span>
                </p>
              )}
              {invoice.bookingReference && (
                <p className="flex items-center gap-1.5 mt-2">
                  <Link
                    href={`/admin/bookings`}
                    className="text-amber-400 hover:underline inline-flex items-center gap-1 text-xs print:text-zinc-700"
                  >
                    View Detailing Job File ({invoice.bookingReference})
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 print:border-zinc-300 text-xs font-bold text-zinc-400 uppercase tracking-wider print:text-zinc-700">
                  <th className="py-3 px-2">Description &amp; Scope of Works</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 print:divide-zinc-200">
                {invoice.items.map((item, index) => (
                  <tr key={item.id || index} className="group">
                    <td className="py-4 px-2">
                      <p className="font-bold text-zinc-100 print:text-black text-sm">{item.description}</p>
                      {item.category && (
                        <span className="inline-block text-[11px] uppercase tracking-wider text-zinc-500 font-mono mt-0.5">
                          Category: {item.category}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center text-zinc-300 font-medium print:text-zinc-800">
                      {item.quantity}
                    </td>
                    <td className="py-4 px-4 text-right text-zinc-300 font-medium font-mono print:text-zinc-800">
                      {formatCurrency(item.unitPrice, invoice.currency)}
                    </td>
                    <td className="py-4 px-4 text-right text-zinc-100 font-bold font-mono print:text-black">
                      {formatCurrency(item.totalPrice, invoice.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculation Totals & Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-800/80 print:border-zinc-300">
          {/* Notes & Client Terms */}
          <div className="space-y-4 text-xs text-zinc-400 print:text-zinc-600">
            {invoice.notes && (
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 print:bg-zinc-50 print:border-zinc-200">
                <p className="font-bold text-zinc-200 print:text-zinc-800 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Special Instructions / Notes:
                </p>
                <p className="leading-relaxed">{invoice.notes}</p>
              </div>
            )}

            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 print:bg-zinc-50 print:border-zinc-200 space-y-2">
              <p className="font-bold text-zinc-200 print:text-zinc-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Bank Remittance &amp; Settlement Instructions
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                <span className="text-zinc-500">Bank Name:</span>
                <span className="font-semibold text-zinc-300 print:text-zinc-800">Coutts &amp; Co</span>
                <span className="text-zinc-500">Account Name:</span>
                <span className="font-semibold text-zinc-300 print:text-zinc-800">You Scuff We Buff Ltd</span>
                <span className="text-zinc-500">Sort Code:</span>
                <span className="font-mono font-semibold text-zinc-300 print:text-zinc-800">18-00-02</span>
                <span className="text-zinc-500">Account No:</span>
                <span className="font-mono font-semibold text-zinc-300 print:text-zinc-800">82910384</span>
                <span className="text-zinc-500">Reference:</span>
                <span className="font-mono font-bold text-amber-400 print:text-black">{invoice.invoiceNumber}</span>
              </div>
            </div>
          </div>

          {/* Breakdown Summary */}
          <div className="space-y-3 bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 print:bg-zinc-50 print:border-zinc-200">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Subtotal:</span>
              <span className="font-mono font-semibold text-zinc-200 print:text-zinc-800">
                {formatCurrency(invoice.subtotal, invoice.currency)}
              </span>
            </div>

            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400">
                <span>Discount / Privilege Privilege:</span>
                <span className="font-mono font-semibold">
                  -{formatCurrency(invoice.discountAmount, invoice.currency)}
                </span>
              </div>
            )}

            <div className="flex justify-between text-xs text-zinc-400">
              <span>Net Taxable Base:</span>
              <span className="font-mono font-semibold text-zinc-200 print:text-zinc-800">
                {formatCurrency(invoice.taxableAmount, invoice.currency)}
              </span>
            </div>

            <div className="flex justify-between text-xs text-zinc-400">
              <span>UK Value Added Tax (VAT 20%):</span>
              <span className="font-mono font-semibold text-zinc-200 print:text-zinc-800">
                {formatCurrency(invoice.taxAmount, invoice.currency)}
              </span>
            </div>

            <div className="pt-3 border-t border-zinc-800 print:border-zinc-300 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white uppercase tracking-wider print:text-black">
                Grand Total:
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono print:text-black">
                {formatCurrency(invoice.grandTotal, invoice.currency)}
              </span>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex justify-between text-xs">
              <span className="text-zinc-400">Amount Paid:</span>
              <span className="font-mono font-bold text-emerald-400">
                {formatCurrency(invoice.amountPaid, invoice.currency)}
              </span>
            </div>

            <div className="pt-2 flex justify-between text-xs items-center bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
              <span className="font-bold uppercase tracking-wider text-zinc-300">
                Outstanding Balance:
              </span>
              <span
                className={`font-mono text-base font-extrabold ${
                  invoice.outstandingBalance > 0 ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {formatCurrency(invoice.outstandingBalance, invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment History Log (if any payments exist) */}
        {invoice.paymentHistory && invoice.paymentHistory.length > 0 && (
          <div className="mt-8 pt-8 border-t border-zinc-800/80 print:border-zinc-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Recorded Payments &amp; Deposits
            </h3>
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden text-xs">
              <div className="grid grid-cols-4 p-3 font-semibold text-zinc-400 border-b border-zinc-800/80 bg-zinc-900">
                <span>Date</span>
                <span>Payment Reference</span>
                <span>Settlement Method</span>
                <span className="text-right">Amount Credited</span>
              </div>
              {invoice.paymentHistory.map((p, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 p-3 border-b border-zinc-800/40 last:border-none items-center"
                >
                  <span className="text-zinc-300">{p.date}</span>
                  <span className="font-mono text-amber-400 font-semibold">{p.reference}</span>
                  <span className="capitalize text-zinc-400">{p.method.replace("_", " ")}</span>
                  <span className="text-right font-mono font-bold text-emerald-400">
                    +{formatCurrency(p.amount, invoice.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Corporate Legal Footer */}
        <div className="mt-12 pt-6 border-t border-zinc-800/60 text-center text-[11px] text-zinc-400 print:text-zinc-500 space-y-1">
          <p>
            You Scuff We Buff Ltd &bull; Registered in England &amp; Wales No. 14829103 &bull; Registered Office: 14
            Berkeley Square, Mayfair, London W1J 6BD
          </p>
          <p>
            HM Revenue &amp; Customs VAT Registration Number:{" "}
            <span className="font-mono font-semibold text-zinc-300 print:text-zinc-700">GB 492 819 320</span>
          </p>
          <p className="text-[10px] text-zinc-400 mt-2">
            This document is a certified VAT invoice issued under the UK Value Added Tax Act 1994.
          </p>
        </div>
      </div>

      {/* Record Payment Modal */}
      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        invoice={invoice}
      />
    </div>
  );
}
