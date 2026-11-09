import * as React from "react";
import { NotificationsView } from "@/features/customer";

export const metadata = {
  title: "Notifications | You Scuff We Buff",
  description:
    "Real-time alerts, appointment updates, dispatch tracking, and invoice receipts.",
};

export default function CustomerNotificationsPage() {
  return <NotificationsView />;
}
