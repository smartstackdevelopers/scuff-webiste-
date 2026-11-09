"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { StaffJobDetailView } from "@/features/staff/components/staff-job-detail-view";

export default function StaffJobDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <StaffJobDetailView id={id} />;
}
