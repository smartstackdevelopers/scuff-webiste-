import * as React from "react";
import { CustomerLayout } from "@/components/layout/customer-layout";

export default function AppCustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomerLayout>{children}</CustomerLayout>;
}
