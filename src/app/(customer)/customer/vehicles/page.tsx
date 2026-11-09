import * as React from "react";
import { VehiclesList } from "@/features/customer";

export const metadata = {
  title: "My Garage & Vehicles | You Scuff We Buff",
  description:
    "Manage your registered automobiles for instant one-click booking and tailored paint correction specifications.",
};

export default function CustomerVehiclesPage() {
  return <VehiclesList />;
}
