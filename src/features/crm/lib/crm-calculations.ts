import { QuotationLineItem } from "../types/crm";

export interface CalculationResult {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  vatAmount: number;
  grandTotal: number;
  totalAmount: number;
}

export function calculateQuotationTotals(
  items: QuotationLineItem[],
  discountType: "fixed" | "percentage" | number = "fixed",
  discountValue: number = 0,
  taxRate: number = 0.2 // UK 20% VAT
): CalculationResult {
  const subtotal = items.reduce((sum, item) => {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const unitPrice = Math.max(0, Number(item.unitPrice) || 0);
    return sum + qty * unitPrice;
  }, 0);

  let discountAmount = 0;
  if (typeof discountType === "number") {
    discountAmount = Math.min(subtotal, Math.max(0, Number(discountType) || 0));
  } else if (discountType === "fixed") {
    discountAmount = Math.min(subtotal, Math.max(0, Number(discountValue) || 0));
  } else {
    const pct = Math.min(100, Math.max(0, Number(discountValue) || 0));
    discountAmount = (subtotal * pct) / 100;
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = taxableAmount * Math.max(0, Number(taxRate) || 0);
  const grandTotal = taxableAmount + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    taxableAmount: Math.round(taxableAmount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    vatAmount: Math.round(taxAmount * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
    totalAmount: Math.round(grandTotal * 100) / 100,
  };
}

export function calculateCommission(saleAmount: number, commissionRate: number): number {
  const sale = Math.max(0, Number(saleAmount) || 0);
  const rate = Math.max(0, Number(commissionRate) || 0);
  return Math.round(((sale * rate) / 100) * 100) / 100;
}

/**
 * Flexible CSV export supporting both (dataObjects, filename) and (filename, headers, rows)
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
