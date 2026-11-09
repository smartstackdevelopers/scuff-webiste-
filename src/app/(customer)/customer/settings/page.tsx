import * as React from "react";
import { SettingsView } from "@/features/customer";

export const metadata = {
  title: "Account Preferences & Settings | You Scuff We Buff",
  description:
    "Configure detailing alerts, communication channels, interface theme, and privacy preferences.",
};

export default function CustomerSettingsPage() {
  return <SettingsView />;
}
