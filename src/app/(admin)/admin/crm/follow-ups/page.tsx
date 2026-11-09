import * as React from "react";
import { FollowUpList } from "@/features/crm";

export const metadata = {
  title: "Follow-Ups & Communications Hub | You Scuff We Buff",
  description:
    "Task management for client follow-ups, studio consultations, vehicle inspections, and phone calls.",
};

export default function AdminFollowUpsPage() {
  return <FollowUpList />;
}
