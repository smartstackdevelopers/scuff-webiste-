import * as React from "react";
import { VisitorAnalyticsView } from "@/features/analytics";

export const metadata = {
  title: "Visitor Analytics & Traffic Intelligence | Admin | You Scuff We Buff",
  description:
    "Real-time visitor telemetry, acquisition channels, device distribution, and booking engine conversion funnels.",
};

export default function AdminAnalyticsPage() {
  return <VisitorAnalyticsView />;
}
