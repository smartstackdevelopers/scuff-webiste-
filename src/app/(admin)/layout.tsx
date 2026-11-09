import * as React from "react";
import { AdminLayout } from "@/components/layout/admin-layout";

export default function AppAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
