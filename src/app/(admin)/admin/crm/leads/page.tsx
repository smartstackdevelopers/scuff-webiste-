import * as React from "react";
import { LeadTable } from "@/features/crm";

export const metadata = {
  title: "Leads & Deal Pipeline | You Scuff We Buff",
  description:
    "Interactive Kanban pipeline and data table for managing high-value automotive detailing inquiries.",
};

export default function AdminLeadsPage() {
  return <LeadTable />;
}
