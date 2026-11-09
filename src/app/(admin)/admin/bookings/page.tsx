import * as React from "react";
import { BookingTable } from "@/features/admin";

export const metadata = {
  title: "Booking Management | You Scuff We Buff",
  description:
    "Review detailing requests, approve dates, assign specialists, and update job status.",
};

export default function AdminBookingsPage() {
  return <BookingTable />;
}
