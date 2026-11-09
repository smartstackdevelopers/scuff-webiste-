import * as React from "react";
import { AdminGiftCardsView } from "@/features/admin/components/admin-gift-cards-view";

export const metadata = {
  title: "Gift Cards & Vouchers Ledger | Admin Portal",
  description: "Issue corporate vouchers, audit customer card balances, and track redemption utilization.",
};

export default function AdminGiftCardsPage() {
  return <AdminGiftCardsView />;
}
