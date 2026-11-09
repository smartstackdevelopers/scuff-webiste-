import * as React from "react";
import { InvoiceTable } from "@/features/finance";

export const metadata = {
  title: "Invoices & Billing | Finance Admin | You Scuff We Buff",
  description:
    "Client invoice management, overdue receivables tracking, VAT calculations, and settlement logs.",
};

export default function AdminInvoicesPage() {
  return <InvoiceTable />;
}
