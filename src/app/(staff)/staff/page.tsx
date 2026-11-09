import * as React from "react";
import { StaffJobsView } from "@/features/staff/components/staff-jobs-view";

export const metadata = {
  title: "Technician Bay Dashboard | You Scuff We Buff",
  description: "Mobile-first workshop jobs, vehicle detailing step-by-step checklists, and photo logs.",
};

export default function StaffDefaultPage() {
  return <StaffJobsView />;
}
