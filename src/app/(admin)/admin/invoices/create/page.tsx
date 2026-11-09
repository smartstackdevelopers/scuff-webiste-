import * as React from "react";
import { InvoiceBuilder } from "@/features/finance";

export const metadata = {
  title: "Create Studio Invoice | Finance Admin | You Scuff We Buff",
  description:
    "Generate a certified VAT invoice for vehicle detailing, paint correction, ceramic coatings, or repair.",
};

export default function AdminCreateInvoicePage() {
  return <InvoiceBuilder />;
}
