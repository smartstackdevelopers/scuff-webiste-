import * as React from "react";
import { QuotationTable } from "@/features/crm";

export const metadata = {
  title: "Bespoke Quotations & Proposals | You Scuff We Buff",
  description:
    "Generate luxury automotive detailing proposals, manage VAT itemization, and track client approvals.",
};

export default function AdminQuotationsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading Quotation Manager...</div>}>
      <QuotationTable />
    </React.Suspense>
  );
}
