"use client";

import * as React from "react";
import { AdminInvoice, PaymentMethod } from "../types/finance";
import { useFinance } from "../hooks/use-finance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";

interface RecordPaymentModalProps {
  open?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  invoice: AdminInvoice | null;
}

export function RecordPaymentModal({
  open,
  isOpen,
  onOpenChange,
  onClose,
  invoice,
}: RecordPaymentModalProps) {
  const isModalOpen = open ?? isOpen ?? false;
  const handleOpenChange = (newVal: boolean) => {
    onOpenChange?.(newVal);
    if (!newVal) {
      onClose?.();
    }
  };

  const { recordPayment } = useFinance();

  const [amount, setAmount] = React.useState<number>(0);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("online");
  const [date, setDate] = React.useState<string>(new Date().toISOString().split("T")[0]);
  const [isDeposit, setIsDeposit] = React.useState<boolean>(false);
  const [notes, setNotes] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (invoice) {
      setAmount(invoice.outstandingBalance);
      setDate(new Date().toISOString().split("T")[0]);
      setIsDeposit(invoice.amountPaid === 0);
      setNotes(
        invoice.amountPaid === 0
          ? "Initial Booking Deposit"
          : `Settlement payment towards balance of £${invoice.outstandingBalance.toFixed(2)}`
      );
      setError(null);
      setSuccess(false);
    }
  }, [invoice, isModalOpen]);

  if (!invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = recordPayment({
      invoiceId: invoice.id,
      amount,
      paymentMethod,
      notes,
      isDeposit,
      date,
    });

    if (!res.success) {
      setError(res.error || "Failed to record payment.");
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleOpenChange(false);
      }, 1200);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Record Payment / Deposit
          </DialogTitle>
          <DialogDescription>
            Record a simulated client payment against invoice{" "}
            <strong className="text-foreground font-mono">{invoice.invoiceNumber}</strong>.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 animate-bounce" />
            <h3 className="font-semibold text-foreground text-base">Payment Recorded Successfully</h3>
            <p className="text-xs text-muted-foreground">
              Invoice balance and payment ledger have been updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Balance Overview */}
            <div className="rounded-lg border border-border/40 bg-muted/20 p-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Invoice Total:</span>
                <span className="font-mono font-medium text-foreground">
                  £{invoice.grandTotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Already Paid:</span>
                <span className="font-mono font-medium text-emerald-400">
                  £{invoice.amountPaid.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-border/30">
                <span className="font-semibold text-foreground">Remaining Balance:</span>
                <span className="font-mono font-bold text-sm text-primary">
                  £{invoice.outstandingBalance.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Payment Amount (£) <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                max={invoice.outstandingBalance}
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="font-mono text-sm"
                required
              />
              <div className="flex gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={() => setAmount(Math.round((invoice.grandTotal * 0.2) * 100) / 100)}
                  className="text-[10px] text-muted-foreground hover:text-primary underline"
                >
                  20% Deposit (£{(invoice.grandTotal * 0.2).toFixed(2)})
                </button>
                <span className="text-[10px] text-muted-foreground">•</span>
                <button
                  type="button"
                  onClick={() => setAmount(Math.round((invoice.grandTotal * 0.5) * 100) / 100)}
                  className="text-[10px] text-muted-foreground hover:text-primary underline"
                >
                  50% Advance (£{(invoice.grandTotal * 0.5).toFixed(2)})
                </button>
                <span className="text-[10px] text-muted-foreground">•</span>
                <button
                  type="button"
                  onClick={() => setAmount(invoice.outstandingBalance)}
                  className="text-[10px] text-muted-foreground hover:text-primary underline"
                >
                  Pay Full Balance (£{invoice.outstandingBalance.toFixed(2)})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="online">Online Payment (Demo)</option>
                  <option value="bank_transfer">Direct Bank Transfer (BACS)</option>
                  <option value="cash">Cash Settlement</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Payment Date
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-xs"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isDepositCheck"
                checked={isDeposit}
                onChange={(e) => setIsDeposit(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="isDepositCheck" className="text-xs text-foreground cursor-pointer">
                Flag as Initial Booking / Studio Bay Deposit
              </label>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Internal Transaction Notes
              </label>
              <Input
                placeholder="e.g. Cleared via client mobile banking"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="text-xs"
              />
            </div>

            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-300">
              Note: This is a simulated frontend transaction. No real credit cards or bank accounts are debited.
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={amount <= 0 || amount > invoice.outstandingBalance}>
                Confirm Payment
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
