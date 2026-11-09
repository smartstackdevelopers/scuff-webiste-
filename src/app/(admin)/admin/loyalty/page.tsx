import * as React from "react";
import { AdminLoyaltyView } from "@/features/admin/components/admin-loyalty-view";

export const metadata = {
  title: "Loyalty Guild & Referral Management | Admin Portal",
  description: "Monitor customer points ledger, manage VIP tier rules, and adjust member rewards.",
};

export default function AdminLoyaltyPage() {
  return <AdminLoyaltyView />;
}
