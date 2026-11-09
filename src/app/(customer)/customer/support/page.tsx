import * as React from "react";
import { SupportList } from "@/features/customer";

export const metadata = {
  title: "Support & Helpdesk | You Scuff We Buff",
  description:
    "Direct communication channel with our master detailers, booking concierges, and service technicians.",
};

export default function CustomerSupportPage() {
  return <SupportList />;
}
