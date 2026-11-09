import * as React from "react";
import { AdminCouponsView } from "@/features/admin/components/admin-coupons-view";

export const metadata = {
  title: "Coupons & Promotional Offers | Admin Portal",
  description: "Configure discount vouchers, promotional codes, and booking redemption limits.",
};

export default function AdminCouponsPage() {
  return <AdminCouponsView />;
}
