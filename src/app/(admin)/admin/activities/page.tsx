import * as React from "react";
import { ActivityTimeline } from "@/features/admin";

export const metadata = {
  title: "Operations Activity Log | You Scuff We Buff",
  description:
    "Chronological record of bookings, customer registrations, staff dispatches, and catalog updates.",
};

export default function AdminActivitiesPage() {
  return <ActivityTimeline />;
}
