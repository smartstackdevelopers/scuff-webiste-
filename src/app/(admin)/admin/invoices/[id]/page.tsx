"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { InvoicePreview } from "@/features/finance";

export default function AdminInvoiceDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <InvoicePreview id={id} />;
}
