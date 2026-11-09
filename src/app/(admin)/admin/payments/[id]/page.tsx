"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { PaymentDetailsView } from "@/features/finance";

export default function AdminPaymentDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <PaymentDetailsView id={id} />;
}
