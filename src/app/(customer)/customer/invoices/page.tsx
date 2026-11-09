import * as React from "react";
import { InvoiceTable } from "@/features/customer";

export const metadata = {
  title: "Invoices & Receipts | You Scuff We Buff",
  description:
    "View, download, and print your detailing service invoices and VAT receipts.",
};

export default function CustomerInvoicesPage() {
  return <InvoiceTable />;
}
