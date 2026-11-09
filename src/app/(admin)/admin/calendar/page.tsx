import * as React from "react";
import { AdminCalendar } from "@/features/admin";

export const metadata = {
  title: "Master Detailing Calendar | You Scuff We Buff",
  description:
    "Coordinate appointment slots, track technician capacity, and balance studio bay allocations.",
};

export default function AdminCalendarPage() {
  return <AdminCalendar />;
}
