import * as React from "react";
import { CRMReportsView } from "@/features/crm";

export const metadata = {
  title: "CRM Performance Reports | You Scuff We Buff",
  description:
    "Executive CRM analytics, lead conversion metrics, marketing channel attribution, and advisor performance reports.",
};

export default function AdminCRMReportsPage() {
  return <CRMReportsView />;
}
