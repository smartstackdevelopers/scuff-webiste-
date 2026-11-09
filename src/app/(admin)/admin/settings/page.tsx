import * as React from "react";
import { AdminSettingsView } from "@/features/admin";

export const metadata = {
  title: "Operations Settings | You Scuff We Buff",
  description:
    "Configure studio company registrations, operating hours, dispatch settings, and notification alerts.",
};

export default function AdminSettingsPage() {
  return <AdminSettingsView />;
}
