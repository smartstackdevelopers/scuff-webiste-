import * as React from "react";
import { SalespersonTable } from "@/features/crm";

export const metadata = {
  title: "Sales Representatives & Commission Tiers | You Scuff We Buff",
  description:
    "Manage sales advisors, lead dispatching capacity, monthly targets, and commission structures.",
};

export default function AdminSalespersonsPage() {
  return <SalespersonTable />;
}
