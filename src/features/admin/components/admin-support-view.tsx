"use client";

import * as React from "react";
import {
  CheckCircle2,
  Search,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface TicketMessage {
  id: string;
  sender: "customer" | "support";
  senderName: string;
  message: string;
  timestamp: string;
}

interface AdminTicket {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  vehicle: string;
  subject: string;
  category: string;
  status: "open" | "in_progress" | "resolved";
  priority: "urgent" | "high" | "medium" | "low";
  createdDate: string;
  lastUpdated: string;
  messages: TicketMessage[];
}

export function AdminSupportView() {
  const [tickets, setTickets] = React.useState<AdminTicket[]>([
    {
      id: "tck-1",
      reference: "TCK-1049",
      customerName: "Lord Alistair Vance",
      email: "alistair@vance-holdings.co.uk",
      vehicle: "Porsche 911 GT3 (992)",
      subject: "Additional PPF Stone Guard Inquiry for Upcoming Booking",
      category: "Service Add-on",
      status: "in_progress",
      priority: "high",
      createdDate: "04 Nov 2026, 11:20",
      lastUpdated: "04 Nov 2026, 14:15",
      messages: [
        {
          id: "m-1",
          sender: "customer",
          senderName: "Lord Alistair Vance",
          message:
            "Hi team, for my upcoming Ceramic Coating booking on the 18th of November, do you also install front-end Paint Protection Film (PPF) on the bonnet and mirrors prior to applying the 9H coating?",
          timestamp: "04 Nov 2026, 11:20",
        },
        {
          id: "m-2",
          sender: "support",
          senderName: "Marcus (Head of Studio Bay)",
          message:
            "Good afternoon Lord Vance! Yes, we have an accredited SunTek & XPEL film plotter directly in our Mayfair bay. We can apply self-healing film to your bonnet, front wings, and mirrors before locking in the remainder with 9H ceramic shield.",
          timestamp: "04 Nov 2026, 14:15",
        },
      ],
    },
    {
      id: "tck-2",
      reference: "TCK-1021",
      customerName: "Sophia Sterling",
      email: "sophia@sterling-realty.co.uk",
      vehicle: "Range Rover Autobiography",
      subject: "VAT Invoice Copy for Corporate Account",
      category: "Billing & Finance",
      status: "resolved",
      priority: "medium",
      createdDate: "02 Nov 2026, 09:30",
      lastUpdated: "02 Nov 2026, 10:05",
      messages: [
        {
          id: "m-3",
          sender: "customer",
          senderName: "Sophia Sterling",
          message: "Please could you forward the official VAT tax receipt for invoice INV-2026-081 to our accounts department?",
          timestamp: "02 Nov 2026, 09:30",
        },
      ],
    },
    {
      id: "tck-3",
      reference: "TCK-1055",
      customerName: "David Miller",
      email: "david@miller-racing.com",
      vehicle: "McLaren 720S",
      subject: "Mobile Van Bay Dimensions & Power Check",
      category: "Mobile Logistics",
      status: "open",
      priority: "urgent",
      createdDate: "05 Nov 2026, 08:15",
      lastUpdated: "05 Nov 2026, 08:15",
      messages: [
        {
          id: "m-4",
          sender: "customer",
          senderName: "David Miller",
          message: "Does your mobile van carry its own generator or will you require 240V hookup at my underground garaging facility?",
          timestamp: "05 Nov 2026, 08:15",
        },
      ],
    },
  ]);

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");

  // Selected Ticket Modal
  const [activeTicket, setActiveTicket] = React.useState<AdminTicket | null>(null);
  const [replyMessage, setReplyMessage] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyMessage.trim()) return;

    const newMsg: TicketMessage = {
      id: `m-${Date.now()}`,
      sender: "support",
      senderName: "Admin Concierge",
      message: replyMessage.trim(),
      timestamp: "Just now",
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === activeTicket.id
          ? {
              ...t,
              status: "in_progress",
              lastUpdated: "Just now",
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );

    setActiveTicket((prev) =>
      prev ? { ...prev, messages: [...prev.messages, newMsg], status: "in_progress" } : null
    );
    setReplyMessage("");
    showToast("Support response dispatched to client.");
  };

  const handleToggleResolved = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: t.status === "resolved" ? "in_progress" : "resolved" }
          : t
      )
    );
    if (activeTicket && activeTicket.id === ticketId) {
      setActiveTicket((prev) =>
        prev
          ? { ...prev, status: prev.status === "resolved" ? "in_progress" : "resolved" }
          : null
      );
    }
    showToast("Ticket status updated.");
  };

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.reference.toLowerCase().includes(search.toLowerCase()) ||
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Concierge Helpdesk
            </span>
            <span className="text-muted-foreground text-xs font-mono">• Client Support</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
            Support Ticket Queue & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Resolve technical inquiries, booking modifications, and post-service customer communications.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Open Tickets</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-rose-400">
            {tickets.filter((t) => t.status === "open").length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Awaiting first response</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">In Progress</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-amber-400">
            {tickets.filter((t) => t.status === "in_progress").length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Under technician review</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Resolved</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">
            {tickets.filter((t) => t.status === "resolved").length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Completed inquiries</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Average Response SLA</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-foreground">18m</p>
          <p className="text-[11px] text-muted-foreground mt-1">Target under 60 mins</p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-card border border-border/70 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ticket ref, client name, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-xs bg-background"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-background text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-background text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Tickets List */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border/50">
              <tr>
                <th className="py-3 px-4">Ticket Ref</th>
                <th className="py-3 px-4">Client & Vehicle</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4 text-center">Priority</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Last Activity</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((tck) => (
                <tr key={tck.id} className="hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-foreground">{tck.reference}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-foreground">{tck.customerName}</p>
                    <p className="text-[11px] text-muted-foreground">{tck.vehicle}</p>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-foreground font-medium">
                    {tck.subject}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={
                        tck.priority === "urgent"
                          ? "destructive"
                          : tck.priority === "high"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {tck.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge
                      variant={
                        tck.status === "resolved"
                          ? "success"
                          : tck.status === "in_progress"
                          ? "electric"
                          : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {tck.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-muted-foreground text-[11px]">
                    {tck.lastUpdated}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      onClick={() => setActiveTicket(tck)}
                      className="bg-card border border-border hover:bg-muted text-xs h-7"
                    >
                      Open Ticket
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Conversation Dialog */}
      {activeTicket && (
        <Dialog open={!!activeTicket} onOpenChange={(open) => !open && setActiveTicket(null)}>
          <DialogContent size="lg" className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between pr-6">
                <DialogTitle className="flex items-center gap-2">
                  <span className="font-mono text-amber-400">{activeTicket.reference}</span>
                  <span>— {activeTicket.subject}</span>
                </DialogTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleResolved(activeTicket.id)}
                  className="text-xs h-7 gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeTicket.status === "resolved" ? "Re-open Ticket" : "Mark as Resolved"}</span>
                </Button>
              </div>
              <DialogDescription>
                {activeTicket.customerName} ({activeTicket.email}) • {activeTicket.vehicle}
              </DialogDescription>
            </DialogHeader>

            {/* Conversation Stream */}
            <div className="space-y-3 max-h-72 overflow-y-auto p-3 rounded-2xl bg-secondary/30 border border-border/50 text-xs">
              {activeTicket.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.sender === "support"
                      ? "ml-auto bg-amber-500/15 border border-amber-500/30 text-foreground"
                      : "mr-auto bg-card border border-border/50 text-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-muted-foreground">
                    <span className="font-bold text-foreground">{msg.senderName}</span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-2">
              <textarea
                rows={3}
                placeholder="Type your official studio response..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full bg-card border border-border rounded-xl p-3 text-foreground text-xs resize-none focus:outline-none focus:border-amber-500"
              />

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setActiveTicket(null)}>
                  Close
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
