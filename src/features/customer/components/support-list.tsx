"use client";

import * as React from "react";
import Link from "next/link";
import { SupportTicket, TicketCategory, TicketPriority } from "../types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LifeBuoy,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useCustomer } from "../hooks/use-customer";
import { TicketModal } from "./ticket-modal";

interface SupportListProps {
  tickets?: SupportTicket[];
  onCreateTicket?: (data: {
    subject: string;
    category: TicketCategory;
    categoryLabel: string;
    message: string;
    priority: TicketPriority;
  }) => void;
}

export function SupportList({
  tickets: propTickets,
  onCreateTicket: propCreateTicket,
}: SupportListProps = {}) {
  const customer = useCustomer();
  const tickets = propTickets || customer.tickets;
  const onCreateTicket = propCreateTicket || customer.createTicket;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter === "all") return true;
    return t.status === statusFilter;
  });

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge variant="warning">High Priority</Badge>;
      case "medium":
        return <Badge variant="electric">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="electric" className="text-xs">
            <Clock className="w-3 h-3 mr-1" /> Open
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="warning" className="text-xs">
            <AlertCircle className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        );
      case "waiting_response":
        return (
          <Badge variant="secondary" className="text-xs">
            Waiting on You
          </Badge>
        );
      case "resolved":
      case "closed":
        return (
          <Badge variant="success" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Resolved
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-foreground">
            Customer Support & Concierge
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Connect directly with our master detailers and customer support team.
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New Support Ticket</span>
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {["all", "open", "in_progress", "resolved"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setStatusFilter(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              statusFilter === tab
                ? "bg-electric text-black font-bold shadow-glow-sm"
                : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="py-12 text-center rounded-2xl bg-card border border-border/80 space-y-3">
          <LifeBuoy className="w-10 h-10 text-muted-foreground mx-auto" />
          <h4 className="text-sm font-bold text-foreground">No Support Tickets</h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You currently have no active or archived support requests in this category.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="text-xs"
          >
            Create Ticket
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTickets.map((t) => (
            <Link
              key={t.id}
              href={`/customer/support/${t.id}`}
              className="block p-5 rounded-2xl bg-card border border-border/80 hover:border-electric/50 hover:shadow-card-hover transition-all duration-200 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-electric bg-electric/10 px-2 py-0.5 rounded border border-electric/30">
                      {t.ticketReference}
                    </span>
                    {getStatusBadge(t.status)}
                    {getPriorityBadge(t.priority)}
                    <span className="text-[11px] text-muted-foreground">
                      • {t.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-electric transition-colors">
                    {t.subject}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {t.messages[t.messages.length - 1]?.message}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                  <div className="text-left sm:text-right text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-electric" />
                      <span>{t.messages.length} messages</span>
                    </span>
                    <span>Updated {t.lastUpdated}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-secondary group-hover:bg-electric group-hover:text-black transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Ticket Modal */}
      <TicketModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={onCreateTicket}
      />
    </div>
  );
}
