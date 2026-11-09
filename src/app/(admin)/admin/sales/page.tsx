import * as React from "react";
import { SalesOverview } from "@/features/crm";

export const metadata = {
  title: "Sales Analytics & Performance | You Scuff We Buff",
  description:
    "Sales velocity, revenue growth trends, service line breakdown, quota attainment, and leaderboards.",
};

export default function AdminSalesPage() {
  return <SalesOverview />;
}
