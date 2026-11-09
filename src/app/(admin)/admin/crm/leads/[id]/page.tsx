"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { LeadDetailsView } from "@/features/crm";

export default function AdminLeadDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <LeadDetailsView id={id} />;
}
