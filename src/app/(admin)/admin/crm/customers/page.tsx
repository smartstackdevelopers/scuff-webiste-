import * as React from "react";
import { CustomerCRMView } from "@/features/crm";

export const metadata = {
  title: "Customer CRM & Fleet Records | You Scuff We Buff",
  description:
    "Customer relationship management, lifetime value tracking, vehicle fleet registry, and concierge notes.",
};

export default function AdminCustomerCRMPage() {
  return <CustomerCRMView />;
}
