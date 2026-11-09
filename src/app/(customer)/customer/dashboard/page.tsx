import * as React from "react";
import { DashboardOverview } from "@/features/customer";

export const metadata = {
  title: "Client Portal & Dashboard | You Scuff We Buff",
  description:
    "Manage your detailing appointments, view vehicle transformation progress, inspect invoices, and configure concierge care.",
};

export default function CustomerDashboardPage() {
  return <DashboardOverview />;
}
