import * as React from "react";
import { FinancialReportsView } from "@/features/finance";

export const metadata = {
  title: "Financial Reports & Revenue Analytics | You Scuff We Buff",
  description:
    "Executive intelligence on gross turnover, VAT liabilities, payment channels, and debtor aging.",
};

export default function AdminFinancialReportsPage() {
  return <FinancialReportsView />;
}
