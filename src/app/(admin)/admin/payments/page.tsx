import * as React from "react";
import { PaymentTable } from "@/features/finance";

export const metadata = {
  title: "Payments & Settlements | Finance Admin | You Scuff We Buff",
  description:
    "Reconciliation ledger of client deposits, card payments, BACS bank transfers, and settlements.",
};

export default function AdminPaymentsPage() {
  return <PaymentTable />;
}
