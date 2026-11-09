import * as React from "react";
import { AdminSupportView } from "@/features/admin/components/admin-support-view";

export const metadata = {
  title: "Support Tickets & Helpdesk | Admin Portal",
  description: "Manage client inquiries, technical paint questions, and customer communication threads.",
};

export default function AdminSupportPage() {
  return <AdminSupportView />;
}
