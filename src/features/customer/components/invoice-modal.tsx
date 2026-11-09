"use client";

import * as React from "react";
import { CustomerInvoice } from "../types/customer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Printer, Download, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MOCK_CUSTOMER_PROFILE } from "../data/customer-data";

interface InvoiceModalProps {
  invoice: CustomerInvoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceModal({ invoice, open, onOpenChange }: InvoiceModalProps) {
  const [downloading, setDownloading] = React.useState(false);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Simulate download trigger
      const element = document.createElement("a");
      const file = new Blob([
        `TAX INVOICE: ${invoice.invoiceNumber}\nClient: ${MOCK_CUSTOMER_PROFILE.fullName}\nService: ${invoice.serviceName}\nVehicle: ${invoice.vehicleName}\nTotal: £${invoice.totalAmount}\nStatus: ${invoice.status.toUpperCase()}\nIssued by You Scuff We Buff Ltd.`
      ], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `${invoice.invoiceNumber}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" className="max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none">
        <DialogHeader className="print:hidden">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <span>Invoice {invoice.invoiceNumber}</span>
              {invoice.status === "paid" ? (
                <Badge variant="success" className="text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                </Badge>
              ) : (
                <Badge variant="warning" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" /> {invoice.status.toUpperCase()}
                </Badge>
              )}
            </DialogTitle>

            <div className="flex items-center gap-2 mr-6">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="text-xs"
              >
                <Printer className="w-3.5 h-3.5 mr-1" />
                <span>Print</span>
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                disabled={downloading}
                onClick={handleDownload}
                className="text-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>{downloading ? "Preparing..." : "Download"}</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Invoice Printable Sheet */}
        <div className="p-4 sm:p-6 bg-card text-foreground space-y-6 text-xs">
          {/* Company & Client Info Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-border/70">
            <div>
              <div className="flex items-center gap-2 font-black uppercase tracking-wider text-base text-foreground mb-1">
                <Sparkles className="w-4 h-4 text-electric" />
                <span>{siteConfig.name} LTD</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Unit 4, Premier Automotive Works<br />
                London Road, High Wycombe, HP11 1BB<br />
                United Kingdom<br />
                VAT Reg: GB 982 4510 82 • Co: 14892011
              </p>
            </div>

            <div className="sm:text-right">
              <span className="font-mono text-sm font-black text-electric block">
                {invoice.invoiceNumber}
              </span>
              <p className="text-muted-foreground mt-1">
                <strong>Booking Ref:</strong> {invoice.bookingReference}<br />
                <strong>Issue Date:</strong> {invoice.issueDate}<br />
                <strong>Due Date:</strong> {invoice.dueDate}
              </p>
            </div>
          </div>

          {/* Billed To */}
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
              Billed To (Client):
            </span>
            <p className="font-bold text-foreground text-sm">
              {MOCK_CUSTOMER_PROFILE.fullName}
            </p>
            <p className="text-muted-foreground">
              {MOCK_CUSTOMER_PROFILE.email} • {MOCK_CUSTOMER_PROFILE.phone}<br />
              {MOCK_CUSTOMER_PROFILE.address}
            </p>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-2">Description</th>
                  <th className="py-2">Vehicle</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="py-3 font-semibold text-foreground">
                    {invoice.serviceName}
                  </td>
                  <td className="py-3 text-muted-foreground">{invoice.vehicleName}</td>
                  <td className="py-3 text-right">1</td>
                  <td className="py-3 text-right font-mono font-bold">
                    {invoice.currency}{invoice.subtotal.toFixed(2)}
                  </td>
                </tr>
                {invoice.discount > 0 && (
                  <tr>
                    <td className="py-2 text-emerald-500 font-medium">
                      Promotional VIP Discount
                    </td>
                    <td className="py-2 text-muted-foreground">-</td>
                    <td className="py-2 text-right">1</td>
                    <td className="py-2 text-right font-mono text-emerald-500">
                      -{invoice.currency}{invoice.discount.toFixed(2)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Calculations Totals */}
          <div className="pt-4 border-t border-border flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal (Net):</span>
                <span className="font-mono">
                  {invoice.currency}{(invoice.subtotal * 0.833).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (20%):</span>
                <span className="font-mono">
                  {invoice.currency}{(invoice.subtotal * 0.167).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                <span>Total Amount:</span>
                <span className="font-mono text-electric">
                  {invoice.currency}{invoice.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-emerald-500 font-semibold">
                <span>Amount Paid:</span>
                <span className="font-mono">
                  {invoice.currency}{invoice.paidAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="pt-6 border-t border-border/60 text-[11px] text-muted-foreground text-center space-y-1">
            <p className="font-semibold text-foreground">
              Thank you for trusting You Scuff We Buff with your vehicle.
            </p>
            <p>
              Payment received electronically via Stripe Protected Checkout. All detailing work includes a satisfaction guarantee.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
