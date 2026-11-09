import * as React from "react";
import { CommissionTable } from "@/features/crm";

export const metadata = {
  title: "Sales Commission & Incentives | You Scuff We Buff",
  description:
    "Track sales advisor commission accruals, approve payout milestones, and prevent duplicate commission claims.",
};

export default function AdminCommissionsPage() {
  return <CommissionTable />;
}
