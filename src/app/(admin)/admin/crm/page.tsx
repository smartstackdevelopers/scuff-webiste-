import * as React from "react";
import { CRMOverview } from "@/features/crm";

export const metadata = {
  title: "CRM & Inquiries Overview | You Scuff We Buff",
  description:
    "Executive CRM dashboard with lead conversion funnel, inquiry sources, follow-up calendar, and sales performance.",
};

export default function AdminCRMOverviewPage() {
  return <CRMOverview />;
}
