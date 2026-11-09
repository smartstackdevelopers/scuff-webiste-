import * as React from "react";
import { ProfileView } from "@/features/customer";

export const metadata = {
  title: "Client Profile & Contact Details | You Scuff We Buff",
  description:
    "Manage your personal contact details, mobile detailing address, and notification preferences.",
};

export default function CustomerProfilePage() {
  return <ProfileView />;
}
