import * as React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingWizard } from "@/features/booking";

export const metadata: Metadata = {
  title: "Book a Mobile Repair | You Scuff We Buff",
  description:
    "Request a free quote or schedule a mobile alloy wheel repair, diamond cutting, or SMART bodywork repair across Birmingham and the West Midlands.",
  openGraph: {
    title: "Book a Mobile Repair | You Scuff We Buff",
    description:
      "Request a mobile alloy wheel refurbishment or dent & scratch repair quote across Birmingham and the West Midlands. We come to you.",
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
