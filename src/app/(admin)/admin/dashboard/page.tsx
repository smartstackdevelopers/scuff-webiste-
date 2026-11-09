import * as React from "react";
import { AdminDashboardView } from "@/features/admin";

export const metadata = {
  title: "Business Overview & Operations | You Scuff We Buff",
  description:
    "Monitor business performance, daily studio operations, and customer appointments.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
