"use client";

import * as React from "react";
import { useParams } from "react-router-dom";
import { TicketConversation } from "@/features/customer";

export default function SupportTicketDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  return <TicketConversation ticketId={id} />;
}
