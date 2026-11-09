import * as React from "react";
import { CustomerTable } from "@/features/admin";

export const metadata = {
  title: "Customer Management | You Scuff We Buff",
  description:
    "Manage private vehicle owner records, concierge notes, spending history, and garage fleet profiles.",
};

export default function AdminCustomersPage() {
  return <CustomerTable />;
}
