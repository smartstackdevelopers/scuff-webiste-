import * as React from "react";
import { BookingsList } from "@/features/customer";

export const metadata = {
  title: "My Bookings | You Scuff We Buff",
  description:
    "View and manage your upcoming, active, and past automotive detailing appointments.",
};

export default function CustomerBookingsPage() {
  return <BookingsList />;
}
