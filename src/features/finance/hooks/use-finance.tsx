"use client";

import * as React from "react";
import {
  AdminInvoice,
  AdminPayment,
  AdminRefund,
  FinancialSummaryData,
  InvoiceStatus,
  PaymentMethod,
  RefundStatus,
} from "../types/finance";
import { MOCK_ADMIN_INVOICES } from "../data/invoices";
import { MOCK_ADMIN_PAYMENTS } from "../data/payments";
import { MOCK_ADMIN_REFUNDS } from "../data/refunds";
import {
  calculatePaymentBalance,
  getInvoiceStatusFromBalance,
} from "../lib/financial-calculations";

export interface FinanceContextType {
  invoices: AdminInvoice[];
  payments: AdminPayment[];
  refunds: AdminRefund[];
  summary: FinancialSummaryData;

  // Invoices
  addInvoice: (
    data: Omit<
      AdminInvoice,
      "id" | "invoiceNumber" | "amountPaid" | "outstandingBalance" | "statusLabel" | "paymentHistory" | "status"
    > & { initialStatus?: InvoiceStatus; status?: InvoiceStatus }
  ) => string;
  updateInvoice: (id: string, data: Partial<AdminInvoice>) => void;
  deleteInvoice: (id: string) => void;
  changeInvoiceStatus: (id: string, newStatus: InvoiceStatus) => void;

  // Payments
  recordPayment: (params: {
    invoiceId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    notes?: string;
    isDeposit?: boolean;
    date?: string;
  }) => { success: boolean; error?: string; paymentId?: string };

  // Refunds
  requestRefund: (params: {
    paymentId: string;
    amount: number;
    reason: string;
    notes?: string;
  }) => { success: boolean; error?: string; refundId?: string };
  approveRefund: (refundId: string, approvedBy?: string) => void;
  rejectRefund: (refundId: string, reason?: string) => void;
  processRefund: (refundId: string) => void;
}

const FinanceContext = React.createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = React.useState<AdminInvoice[]>(MOCK_ADMIN_INVOICES);
  const [payments, setPayments] = React.useState<AdminPayment[]>(MOCK_ADMIN_PAYMENTS);
  const [refunds, setRefunds] = React.useState<AdminRefund[]>(MOCK_ADMIN_REFUNDS);

  // Compute live financial summary
  const summary = React.useMemo<FinancialSummaryData>(() => {
    const totalRevenue = invoices
      .filter((inv) => inv.status !== "cancelled" && inv.status !== "draft")
      .reduce((sum, inv) => sum + inv.grandTotal, 0);

    const totalPaymentsCollected = payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);

    const outstandingBalance = invoices
      .filter((inv) => inv.status !== "cancelled" && inv.status !== "draft")
      .reduce((sum, inv) => sum + inv.outstandingBalance, 0);

    const pendingPayments = payments
      .filter((p) => p.status === "pending" || p.status === "partially_paid")
      .reduce((sum, p) => sum + p.amount, 0);

    const totalRefunds = refunds
      .filter((r) => r.status === "processed" || r.status === "approved")
      .reduce((sum, r) => sum + r.refundAmount, 0);

    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter((inv) => inv.status === "paid").length;
    const partiallyPaidInvoices = invoices.filter((inv) => inv.status === "partially_paid").length;
    const overdueInvoices = invoices.filter((inv) => inv.status === "overdue").length;
    const draftInvoices = invoices.filter((inv) => inv.status === "draft").length;

    return {
      totalRevenue,
      totalPaymentsCollected,
      outstandingBalance,
      pendingPayments,
      totalRefunds,
      totalInvoices,
      paidInvoices,
      partiallyPaidInvoices,
      overdueInvoices,
      draftInvoices,
    };
  }, [invoices, payments, refunds]);

  // Invoice Management
  const addInvoice = (
    data: Omit<
      AdminInvoice,
      "id" | "invoiceNumber" | "amountPaid" | "outstandingBalance" | "statusLabel" | "paymentHistory" | "status"
    > & { initialStatus?: InvoiceStatus; status?: InvoiceStatus }
  ): string => {
    const newCount = invoices.length + 1;
    const invoiceNumber = `INV-2026-${String(newCount).padStart(3, "0")}`;
    const id = `inv-${Date.now()}`;
    const initialStatus = data.initialStatus || data.status || "draft";

    const { status, statusLabel } = getInvoiceStatusFromBalance(
      data.grandTotal,
      0,
      data.dueDate,
      initialStatus
    );

    const newInvoice: AdminInvoice = {
      ...data,
      id,
      invoiceNumber,
      amountPaid: 0,
      outstandingBalance: data.grandTotal,
      status,
      statusLabel,
      paymentHistory: [],
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    return id;
  };

  const updateInvoice = (id: string, updated: Partial<AdminInvoice>) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;

        const merged = { ...inv, ...updated };
        const { status, statusLabel } = getInvoiceStatusFromBalance(
          merged.grandTotal,
          merged.amountPaid,
          merged.dueDate,
          updated.status || inv.status
        );

        const { outstanding } = calculatePaymentBalance(merged.grandTotal, merged.amountPaid);

        return {
          ...merged,
          outstandingBalance: outstanding,
          status,
          statusLabel,
        };
      })
    );
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const changeInvoiceStatus = (id: string, newStatus: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        const { status, statusLabel } = getInvoiceStatusFromBalance(
          inv.grandTotal,
          inv.amountPaid,
          inv.dueDate,
          newStatus
        );
        return { ...inv, status, statusLabel };
      })
    );
  };

  // Payment Recording with Balance Recalculation
  const recordPayment = ({
    invoiceId,
    amount,
    paymentMethod,
    notes,
    isDeposit = false,
    date,
  }: {
    invoiceId: string;
    amount: number;
    paymentMethod: PaymentMethod;
    notes?: string;
    isDeposit?: boolean;
    date?: string;
  }) => {
    const targetInvoice = invoices.find((inv) => inv.id === invoiceId || inv.invoiceNumber === invoiceId);
    if (!targetInvoice) {
      return { success: false, error: "Invoice not found." };
    }

    const payAmount = Number(amount);
    if (isNaN(payAmount) || payAmount <= 0) {
      return { success: false, error: "Payment amount must be greater than zero." };
    }

    if (payAmount > targetInvoice.outstandingBalance) {
      return {
        success: false,
        error: `Payment amount (£${payAmount.toFixed(2)}) exceeds remaining balance (£${targetInvoice.outstandingBalance.toFixed(2)}).`,
      };
    }

    const paymentId = `pay-${Date.now()}`;
    const paymentReference = `PAY-2026-${String(payments.length + 1).padStart(3, "0")}`;
    const paymentDate = date || new Date().toISOString().split("T")[0];
    const paymentTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const methodLabels: Record<PaymentMethod, string> = {
      cash: "Cash Settlement",
      bank_transfer: "Direct Bank Transfer (BACS)",
      online: "Online Payment (Simulated)",
    };

    // Create payment entry
    const newPayment: AdminPayment = {
      id: paymentId,
      paymentReference,
      customerName: targetInvoice.customerName,
      customerEmail: targetInvoice.customerEmail,
      customerPhone: targetInvoice.customerPhone,
      bookingReference: targetInvoice.bookingReference,
      invoiceNumber: targetInvoice.invoiceNumber,
      paymentDate,
      paymentTime,
      paymentMethod,
      paymentMethodLabel: methodLabels[paymentMethod],
      amount: payAmount,
      currency: targetInvoice.currency || "£",
      status: "paid",
      statusLabel: "Paid in Full",
      transactionReference: `TXN-${paymentMethod.toUpperCase()}-${Date.now().toString().slice(-6)}`,
      isDeposit,
      notes: notes || (isDeposit ? "Advance booking deposit" : "Invoice payment"),
    };

    // Update target invoice
    const newAmountPaid = Math.round((targetInvoice.amountPaid + payAmount) * 100) / 100;
    const { outstanding, isFullyPaid } = calculatePaymentBalance(targetInvoice.grandTotal, newAmountPaid);
    const newStatus: InvoiceStatus = isFullyPaid ? "paid" : "partially_paid";
    const newStatusLabel = isFullyPaid ? "Paid in Full" : "Partially Paid";

    const historyRecord = {
      paymentId,
      reference: paymentReference,
      date: paymentDate,
      amount: payAmount,
      method: paymentMethod,
      notes: notes || (isDeposit ? "Advance Booking Deposit" : "Partial Payment"),
    };

    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id !== targetInvoice.id) return inv;
        return {
          ...inv,
          amountPaid: newAmountPaid,
          outstandingBalance: outstanding,
          status: newStatus,
          statusLabel: newStatusLabel,
          paymentHistory: [historyRecord, ...inv.paymentHistory],
        };
      })
    );

    setPayments((prev) => [newPayment, ...prev]);

    return { success: true, paymentId };
  };

  // Refund Management
  const requestRefund = ({
    paymentId,
    amount,
    reason,
    notes,
  }: {
    paymentId: string;
    amount: number;
    reason: string;
    notes?: string;
  }) => {
    const targetPayment = payments.find((p) => p.id === paymentId || p.paymentReference === paymentId);
    if (!targetPayment) {
      return { success: false, error: "Payment reference not found." };
    }

    const refundAmount = Number(amount);
    if (isNaN(refundAmount) || refundAmount <= 0) {
      return { success: false, error: "Refund amount must be greater than zero." };
    }

    if (refundAmount > targetPayment.amount) {
      return {
        success: false,
        error: `Refund amount (£${refundAmount.toFixed(2)}) cannot exceed original payment (£${targetPayment.amount.toFixed(2)}).`,
      };
    }

    const refundId = `ref-${Date.now()}`;
    const refundReference = `REF-2026-${String(refunds.length + 1).padStart(3, "0")}`;
    const refundDate = new Date().toISOString().split("T")[0];

    const newRefund: AdminRefund = {
      id: refundId,
      refundReference,
      paymentReference: targetPayment.paymentReference,
      paymentId: targetPayment.id,
      customerName: targetPayment.customerName,
      customerEmail: targetPayment.customerEmail,
      invoiceNumber: targetPayment.invoiceNumber,
      refundAmount,
      originalAmount: targetPayment.amount,
      refundDate,
      refundReason: reason,
      status: "requested",
      statusLabel: "Requested",
      currency: targetPayment.currency || "£",
      notes: notes || "Client refund requested by concierge administrator.",
    };

    setRefunds((prev) => [newRefund, ...prev]);
    return { success: true, refundId };
  };

  const approveRefund = (refundId: string, approvedBy?: string) => {
    const approver = approvedBy || "Alexander Vance (Managing Director)";
    const today = new Date().toISOString().split("T")[0];

    setRefunds((prev) =>
      prev.map((r) => {
        if (r.id !== refundId && r.refundReference !== refundId) return r;
        return {
          ...r,
          status: "approved" as RefundStatus,
          statusLabel: "Approved",
          approvedBy: approver,
          approvedDate: today,
        };
      })
    );
  };

  const rejectRefund = (refundId: string, reason?: string) => {
    setRefunds((prev) =>
      prev.map((r) => {
        if (r.id !== refundId && r.refundReference !== refundId) return r;
        return {
          ...r,
          status: "rejected" as RefundStatus,
          statusLabel: "Rejected",
          notes: reason ? `${r.notes || ""}\nRejection Reason: ${reason}` : r.notes,
        };
      })
    );
  };

  const processRefund = (refundId: string) => {
    const today = new Date().toISOString().split("T")[0];

    setRefunds((prev) =>
      prev.map((r) => {
        if (r.id !== refundId && r.refundReference !== refundId) return r;

        // Also update original payment status to refunded
        setPayments((pList) =>
          pList.map((p) => {
            if (p.id === r.paymentId || p.paymentReference === r.paymentReference) {
              return {
                ...p,
                status: "refunded",
                statusLabel: "Refunded",
                refundReference: r.refundReference,
              };
            }
            return p;
          })
        );

        return {
          ...r,
          status: "processed" as RefundStatus,
          statusLabel: "Processed (Demo)",
          approvedDate: r.approvedDate || today,
        };
      })
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        invoices,
        payments,
        refunds,
        summary,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        changeInvoiceStatus,
        recordPayment,
        requestRefund,
        approveRefund,
        rejectRefund,
        processRefund,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = React.useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
