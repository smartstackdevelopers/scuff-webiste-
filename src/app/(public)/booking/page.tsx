import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWizard } from "@/features/booking";

export const metadata: Metadata = {
  title: "Online Booking | You Scuff We Buff - Studio Bay & Mobile Detailing",
  description:
    "Schedule your automotive detailing appointment online. Select services, dates, arrival windows, and customize treatment add-ons across the UK.",
  openGraph: {
    title: "Online Booking | You Scuff We Buff",
    description:
      "Schedule your master vehicle detailing, paint correction, or ceramic coating appointment online.",
    url: "/booking",
  },
};

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-electric border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Initializing Booking Engine...
            </p>
          </div>
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
