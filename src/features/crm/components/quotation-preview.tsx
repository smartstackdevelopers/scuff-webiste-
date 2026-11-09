"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCrm } from "../hooks/use-crm";
import { QuotationStatus } from "../types/crm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Printer,
  Send,
  Copy,
  CheckCircle2,
  Car,
  AlertCircle,
} from "lucide-react";

interface QuotationPreviewProps {
  id: string;
}

export function QuotationPreview({ id }: QuotationPreviewProps) {
  const router = useRouter();
  const {
    quotations,
    changeQuotationStatus,
    duplicateQuotation,
  } = useCrm();

  const quotation = quotations.find((q) => q.id === id || q.quotationNumber === id);

  const [sendSuccess, setSendSuccess] = React.useState(false);

  if (!quotation) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/quotations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quotations
        </Link>
        <div className="rounded-xl border border-border/40 bg-card p-12 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-bold text-foreground">Quotation Not Found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The quotation with reference &quot;{id}&quot; does not exist.
          </p>
          <Button className="mt-6" onClick={() => router.push("/admin/quotations")}>
            Return to Quotations
          </Button>
        </div>
      </div>
    );
  }

  const clientName = quotation.customerName || quotation.clientName || "Client";
  const clientEmail = quotation.customerEmail || quotation.clientEmail || "";
  const clientPhone = quotation.customerPhone || quotation.clientPhone || "";
  const clientAddress = quotation.customerAddress || quotation.clientAddress || "London, United Kingdom";
  const items = quotation.items || quotation.lineItems || [];
  const vatAmount = quotation.taxAmount ?? quotation.vatAmount ?? 0;
  const totalAmount = quotation.grandTotal ?? quotation.totalAmount ?? 0;
  const notesText = quotation.terms || quotation.notes || "Includes complete multi-stage pre-wash, iron contamination removal, multi-stage paint thickness digital gauge readings, and 5-year warranty certification.";

  const handlePrint = () => {
    window.print();
  };

  const handleSendToClient = () => {
    changeQuotationStatus(quotation.id, "sent");
    setSendSuccess(true);
    setTimeout(() => setSendSuccess(false), 5000);
  };

  const handleDuplicate = () => {
    const newId = duplicateQuotation(quotation.id);
    router.push(`/admin/quotations/${newId}`);
  };

  const getStatusBadge = (status: QuotationStatus) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft Estimate</Badge>;
      case "sent":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Sent to Client</Badge>;
      case "viewed":
        return <Badge variant="warning">Viewed by Client</Badge>;
      case "accepted":
        return <Badge variant="success">Accepted & Approved</Badge>;
      case "declined":
      case "rejected":
        return <Badge variant="destructive">Declined</Badge>;
      case "expired":
        return <Badge variant="outline">Expired</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <Link
            href="/admin/quotations"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quotations
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
              {quotation.quotationNumber}
            </h1>
            {getStatusBadge(quotation.status)}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick status selector */}
          <select
            value={quotation.status}
            onChange={(e) => changeQuotationStatus(quotation.id, e.target.value as QuotationStatus)}
            className="text-xs rounded-lg border border-border/40 bg-card px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="draft">Mark as Draft</option>
            <option value="sent">Mark as Sent</option>
            <option value="viewed">Mark as Viewed</option>
            <option value="accepted">Mark as Accepted</option>
            <option value="declined">Mark as Declined</option>
          </select>

          <Button variant="outline" size="sm" onClick={handleDuplicate}>
            <Copy className="mr-1.5 h-4 w-4" />
            Duplicate
          </Button>

          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-1.5 h-4 w-4" />
            Print Proposal
          </Button>

          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSendToClient}
          >
            <Send className="mr-1.5 h-4 w-4" />
            Send to Client
          </Button>
        </div>
      </div>

      {/* Notification banner on simulated send */}
      {sendSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <span>
              Official quotation delivered to <strong>{clientEmail}</strong>. Status updated to <strong>Sent</strong>.
            </span>
          </div>
        </div>
      )}

      {/* Luxury Printable Document Container */}
      <div className="rounded-2xl border border-border/50 bg-card p-8 sm:p-12 shadow-xl print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-border/40 pb-8 print:border-neutral-300">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary text-xl font-serif">
                YS
              </div>
              <div>
                <h2 className="text-xl font-bold font-serif tracking-wider text-foreground print:text-black uppercase">
                  You Scuff We Buff
                </h2>
                <p className="text-xs text-muted-foreground print:text-neutral-600 tracking-widest uppercase">
                  Automotive Studio & Bespoke Detailing
                </p>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground print:text-neutral-600 space-y-0.5 leading-relaxed">
              <p>14 Berkeley Square, Mayfair</p>
              <p>London, W1J 6BL, United Kingdom</p>
              <p>Telephone: +44 (0) 20 7946 0991</p>
              <p>VAT Registration: GB 492 819 320</p>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              Bespoke Detailing Proposal
            </span>
            <p className="font-mono text-2xl font-bold text-foreground print:text-black">
              {quotation.quotationNumber}
            </p>
            <div className="text-xs text-muted-foreground print:text-neutral-600 pt-2 space-y-0.5">
              <p>Issue Date: <strong className="text-foreground print:text-black font-mono">{quotation.createdDate}</strong></p>
              <p>Valid Until: <strong className="text-foreground print:text-black font-mono">{quotation.validUntil}</strong></p>
              <p>Advisor: <strong className="text-foreground print:text-black">{quotation.salespersonName}</strong></p>
            </div>
          </div>
        </div>

        {/* Client & Vehicle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-border/40 print:border-neutral-300 text-xs">
          {/* Client Details */}
          <div className="rounded-xl border border-border/40 p-4 bg-muted/20 print:border-neutral-300 print:bg-neutral-50 space-y-2">
            <span className="font-bold uppercase tracking-wider text-muted-foreground print:text-neutral-700 block text-[11px]">
              Prepared For:
            </span>
            <p className="text-base font-bold text-foreground print:text-black font-serif">
              {clientName}
            </p>
            <div className="text-muted-foreground print:text-neutral-600 space-y-0.5">
              <p>{clientEmail}</p>
              <p>{clientPhone}</p>
              <p>{clientAddress}</p>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="rounded-xl border border-border/40 p-4 bg-muted/20 print:border-neutral-300 print:bg-neutral-50 space-y-2">
            <span className="font-bold uppercase tracking-wider text-muted-foreground print:text-neutral-700 block text-[11px] flex items-center gap-1.5">
              <Car className="h-3.5 w-3.5 text-primary" />
              Vehicle Specification:
            </span>
            <p className="text-base font-bold text-foreground print:text-black font-serif">
              {quotation.vehicleYear} {quotation.vehicleMake} {quotation.vehicleModel}
            </p>
            <div className="text-muted-foreground print:text-neutral-600 space-y-0.5">
              <p>Registration: <strong className="text-foreground print:text-black font-mono">{quotation.vehicleRegistration || "NOT PROVIDED"}</strong></p>
              <p>Inspection: Mayfair Private Detailing Bay</p>
              <p>Service Standard: Luxury Bespoke Guarantee</p>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-8">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground print:text-neutral-700 font-semibold uppercase tracking-wider text-[11px] pb-3 text-left">
                <th className="pb-3 pl-2">#</th>
                <th className="pb-3">Description & Detailing Scope</th>
                <th className="pb-3 text-center">Qty</th>
                <th className="pb-3 text-right">Unit Price</th>
                <th className="pb-3 text-right pr-2">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 print:divide-neutral-200">
              {items.map((item, idx) => (
                <tr key={item.id} className="text-sm">
                  <td className="py-4 pl-2 font-mono text-muted-foreground print:text-neutral-500 w-8">
                    0{idx + 1}
                  </td>
                  <td className="py-4 font-medium text-foreground print:text-black">
                    {item.description}
                  </td>
                  <td className="py-4 text-center font-mono text-foreground print:text-black">
                    {item.quantity}
                  </td>
                  <td className="py-4 text-right font-mono text-muted-foreground print:text-neutral-700">
                    £{item.unitPrice.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 text-right pr-2 font-mono font-bold text-foreground print:text-black">
                    £{item.totalPrice.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Breakdown */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-6 border-t border-border/40 print:border-neutral-300">
          <div className="sm:max-w-md space-y-2 text-xs text-muted-foreground print:text-neutral-600">
            <h4 className="font-bold text-foreground print:text-black uppercase tracking-wider text-[11px]">
              Notes & Inclusions:
            </h4>
            <p className="whitespace-pre-line leading-relaxed">
              {notesText}
            </p>
          </div>

          <div className="w-full sm:w-80 space-y-2 text-xs">
            <div className="flex justify-between py-1 text-muted-foreground print:text-neutral-700">
              <span>Subtotal (Ex. VAT)</span>
              <span className="font-mono text-foreground print:text-black font-medium">
                £{quotation.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </span>
            </div>

            {quotation.discountAmount && quotation.discountAmount > 0 ? (
              <div className="flex justify-between py-1 text-emerald-400 print:text-emerald-700">
                <span>Client Privilege Allowance</span>
                <span className="font-mono font-medium">
                  -£{quotation.discountAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </span>
              </div>
            ) : null}

            <div className="flex justify-between py-1 text-muted-foreground print:text-neutral-700">
              <span>United Kingdom VAT (20.0%)</span>
              <span className="font-mono text-foreground print:text-black font-medium">
                £{vatAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between py-3 border-t-2 border-primary/40 print:border-black text-base font-bold text-foreground print:text-black">
              <span>Total Payable (GBP)</span>
              <span className="font-mono text-xl text-primary print:text-black">
                £{totalAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Acceptance & Sign-off Block */}
        <div className="mt-12 pt-8 border-t border-border/40 print:border-neutral-300 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-muted-foreground print:text-neutral-600">
          <div>
            <h5 className="font-bold text-foreground print:text-black uppercase tracking-wider text-[11px] mb-1">
              Terms & Acceptance
            </h5>
            <p className="leading-relaxed">
              To approve this proposal and schedule vehicle drop-off, please sign below or confirm via email. A 20% booking deposit secures your allocated studio bay.
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <div className="border-b border-border/60 print:border-black pb-1 mb-2">
              <span className="text-[10px] text-muted-foreground print:text-neutral-500">Authorized Signature:</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span>Client / Designee</span>
              <span>Date: ____ / ____ / 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
