import * as React from "react";
import { StaffJobsView } from "@/features/staff/components/staff-jobs-view";

export const metadata = {
  title: "Today's & Upcoming Bay Jobs | Staff Portal",
  description: "View scheduled workshop bay and mobile jobs, vehicle specs, and start detailing tasks.",
};

export default function StaffJobsPage() {
  return <StaffJobsView />;
}
