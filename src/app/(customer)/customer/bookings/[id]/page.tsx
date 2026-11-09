"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { BookingDetailsView } from "@/features/customer";

export default function BookingDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <BookingDetailsView bookingId={id} />;
}
