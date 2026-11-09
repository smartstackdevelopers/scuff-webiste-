import * as React from "react";
import { RefundTable } from "@/features/finance";

export const metadata = {
  title: "Refunds & Adjustments | Finance Admin | You Scuff We Buff",
  description:
    "Authorizations, client deposit refunds, goodwill adjustments, and accounting audit log.",
};

export default function AdminRefundsPage() {
  return <RefundTable />;
}
