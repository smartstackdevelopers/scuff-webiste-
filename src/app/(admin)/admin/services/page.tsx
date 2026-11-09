import * as React from "react";
import { ServiceManagement } from "@/features/admin";

export const metadata = {
  title: "Services Catalog Management | You Scuff We Buff",
  description:
    "Configure service tiers, base starting pricing, duration increments, and public website availability.",
};

export default function AdminServicesPage() {
  return <ServiceManagement />;
}
