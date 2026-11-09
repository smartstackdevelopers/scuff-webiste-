import { InvoiceLineItem, InvoiceStatus } from "../types/finance";

export interface InvoiceCalculationResult {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  grandTotal: number;
}

/**
 * Calculates subtotal, discount, taxable amount, VAT, and grand total.
 * Ensures no negative numbers and exact two-decimal precision.
 */
export function calculateInvoiceTotals(
  items: InvoiceLineItem[],
  discountType: "fixed" | "percentage" = "fixed",
  discountValue: number = 0,
  taxRate: number = 20 // Standard UK 20% VAT
): InvoiceCalculationResult {
  const subtotal = items.reduce((sum, item) => {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const unitPrice = Math.max(0, Number(item.unitPrice) || 0);
    return sum + qty * unitPrice;
  }, 0);

  let discountAmount = 0;
  if (discountType === "fixed") {
    discountAmount = Math.min(subtotal, Math.max(0, Number(discountValue) || 0));
  } else {
    const pct = Math.min(100, Math.max(0, Number(discountValue) || 0));
    discountAmount = (subtotal * pct) / 100;
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * Math.max(0, Number(taxRate) || 0)) / 100;
  const grandTotal = taxableAmount + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    taxableAmount: Math.round(taxableAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
  };
}

/**
 * Calculates remaining balance and clamps between 0 and grandTotal.
 */
export function calculatePaymentBalance(grandTotal: number, totalPaid: number) {
  const total = Math.max(0, Number(grandTotal) || 0);
  const paid = Math.max(0, Number(totalPaid) || 0);
  const outstanding = Math.max(0, Math.round((total - paid) * 100) / 100);

  return {
    total,
    paid,
    outstanding,
    isFullyPaid: outstanding === 0 && total > 0,
  };
}

/**
 * Determines invoice status automatically from balance and due date.
 */
export function getInvoiceStatusFromBalance(
  grandTotal: number,
  totalPaid: number,
  dueDate: string,
  currentStatus: InvoiceStatus
): { status: InvoiceStatus; statusLabel: string } {
  if (currentStatus === "draft" || currentStatus === "cancelled") {
    return {
      status: currentStatus,
      statusLabel: currentStatus === "draft" ? "Draft" : "Cancelled",
    };
  }

  const { isFullyPaid, paid, outstanding } = calculatePaymentBalance(grandTotal, totalPaid);

  if (isFullyPaid) {
    return { status: "paid", statusLabel: "Paid in Full" };
  }

  if (paid > 0 && outstanding > 0) {
    return { status: "partially_paid", statusLabel: "Partially Paid" };
  }

  const today = new Date().toISOString().split("T")[0];
  if (dueDate && dueDate < today && outstanding > 0) {
    return { status: "overdue", statusLabel: "Overdue" };
  }

  return { status: "sent", statusLabel: "Sent to Client" };
}

/**
 * Formats a number into a currency string without hardcoding throughout JSX.
 */
export function formatCurrency(amount: number, currency: string = "£"): string {
  const num = Number(amount) || 0;
  return `${currency}${num.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Polymorphic CSV export utility.
 */
export function exportToCsv(
  arg1: string | Record<string, unknown>[],
  arg2?: string[] | string,
  arg3?: (string | number)[][]
) {
  if (typeof window === "undefined") return;

  const escapeCsv = (val: unknown) => {
    const str = String(val ?? "");
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  let filename = "export";
  let headers: string[] = [];
  let rows: (string | number)[][] = [];

  if (Array.isArray(arg1)) {
    const data = arg1;
    filename = typeof arg2 === "string" ? arg2 : "export";
    if (data.length > 0) {
      headers = Object.keys(data[0]);
      rows = data.map((item) => headers.map((h) => item[h] as string | number));
    }
  } else {
    filename = arg1;
    headers = Array.isArray(arg2) ? arg2 : [];
    rows = arg3 || [];
  }

  const csvContent = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
