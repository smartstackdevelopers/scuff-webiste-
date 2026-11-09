import * as React from "react";
import { CustomerLoyaltyView } from "@/features/customer/components/loyalty-view";

export const metadata = {
  title: "Loyalty Points & Referral Perks | Customer Portal",
  description: "View your accrued detailing guild points, referral bonuses, and convert points into booking vouchers.",
};

export default function CustomerLoyaltyPage() {
  return <CustomerLoyaltyView />;
}
