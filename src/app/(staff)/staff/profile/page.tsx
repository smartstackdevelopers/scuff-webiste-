import * as React from "react";
import { StaffProfileView } from "@/features/staff/components/staff-profile-view";

export const metadata = {
  title: "Technician Accreditation Profile | Staff Portal",
  description: "View technician certifications, bay allocation, equipment status, and quality ratings.",
};

export default function StaffProfilePage() {
  return <StaffProfileView />;
}
