import * as React from "react";
import { StaffManagement } from "@/features/admin";

export const metadata = {
  title: "Specialists & Staff Management | You Scuff We Buff",
  description:
    "Manage master technician profiles, mobile van operators, studio bay assignments, and weekly working capacities.",
};

export default function AdminStaffPage() {
  return <StaffManagement />;
}
