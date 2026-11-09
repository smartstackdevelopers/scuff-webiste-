"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { QuotationPreview } from "@/features/crm";

export default function AdminQuotationDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <QuotationPreview id={id} />;
}
