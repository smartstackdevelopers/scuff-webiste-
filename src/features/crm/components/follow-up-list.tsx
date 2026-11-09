"use client";

import * as React from "react";
import Link from "next/link";
import { FollowUpItem, FollowUpPriority, FollowUpType } from "../types/crm";
import { useCrm } from "../hooks/use-crm";
import { exportToCsv } from "../lib/crm-calculations";
import { FollowUpModal } from "./follow-up-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Car,
  CheckCircle2,
  Plus,
  Search,
  Download,
  Trash2,
  Pencil,
} from "lucide-react";

export function FollowUpList() {
  const {
    followUps,
    completeFollowUp,
    rescheduleFollowUp,
    deleteFollowUp,
    salespersons,
  } = useCrm();

  const [search, setSearch] = React.useState("");
  const [tabFilter, setTabFilter] = React.useState<"all" | "today" | "pending" | "overdue" | "completed">("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");
  const [salespersonFilter, setSalespersonFilter] = React.useState<string>("all");

  // Modal states
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<FollowUpItem | null>(null);

  // Reschedule state
  const [rescheduleItem, setRescheduleItem] = React.useState<FollowUpItem | null>(null);
  const [newDate, setNewDate] = React.useState("");
  const [newTime, setNewTime] = React.useState("11:00");

  const todayStr = new Date().toISOString().split("T")[0];

  // Helper to determine if an item is overdue or due today
  const isOverdue = (item: FollowUpItem) => {
    const itemDate = item.followUpDate || item.scheduledDate || "";
    return item.status === "pending" && itemDate < todayStr;
  };

  const isDueToday = (item: FollowUpItem) => {
    const itemDate = item.followUpDate || item.scheduledDate || "";
    return item.status === "pending" && itemDate === todayStr;
  };

  // Metrics
  const totalCount = followUps.length;
  const todayCount = followUps.filter(isDueToday).length;
  const pendingCount = followUps.filter((f) => f.status === "pending").length;
  const overdueCount = followUps.filter(isOverdue).length;
  const completedCount = followUps.filter((f) => f.status === "completed").length;

  // Filtered list
  const filteredList = followUps.filter((item) => {
    const client = item.customerName || item.clientName || "";
    const email = item.customerEmail || item.clientEmail || "";
    const repId = item.assignedSalespersonId || item.salespersonId || "";
    const desc = item.description || item.notes || "";
    const vehicle = item.vehicleSummary || "";

    // Search
    const matchSearch =
      client.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    // Tabs
    if (tabFilter === "today" && !isDueToday(item)) return false;
    if (tabFilter === "pending" && item.status !== "pending") return false;
    if (tabFilter === "overdue" && !isOverdue(item)) return false;
    if (tabFilter === "completed" && item.status !== "completed") return false;

    // Type filter
    if (typeFilter !== "all" && item.type !== typeFilter) return false;

    // Priority filter
    if (priorityFilter !== "all" && item.priority !== priorityFilter) return false;

    // Salesperson filter
    if (salespersonFilter !== "all" && repId !== salespersonFilter) return false;

    return true;
  });

  const handleExportCsv = () => {
    const csvData = filteredList.map((f) => ({
      ID: f.id,
      Client: f.customerName || f.clientName,
      Phone: f.customerPhone || f.clientPhone || "",
      Email: f.customerEmail || f.clientEmail || "",
      Vehicle: f.vehicleSummary || "",
      Channel: f.type,
      Priority: f.priority,
      Status: f.status,
      ScheduledDate: f.followUpDate || f.scheduledDate || "",
      ScheduledTime: f.followUpTime || f.scheduledTime || "",
      Salesperson: f.assignedSalespersonName || f.salespersonName || "",
      Topic: f.description || f.notes,
    }));
    exportToCsv(csvData, `you-scuff-we-buff-follow-ups-${todayStr}`);
  };

  const getChannelIcon = (type: FollowUpType) => {
    switch (type) {
      case "phone":
        return <Phone className="h-4 w-4 text-emerald-400" />;
      case "email":
        return <Mail className="h-4 w-4 text-cyan-400" />;
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-emerald-400" />;
      case "meeting":
        return <Video className="h-4 w-4 text-purple-400" />;
      case "vehicle_viewing":
        return <Car className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: FollowUpPriority) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive" className="text-[10px]">Urgent</Badge>;
      case "high":
        return <Badge variant="warning" className="text-[10px]">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-[10px]">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="text-[10px]">Low</Badge>;
    }
  };

  const handleOpenReschedule = (item: FollowUpItem) => {
    setRescheduleItem(item);
    setNewDate(item.followUpDate || item.scheduledDate || todayStr);
    setNewTime(item.followUpTime || item.scheduledTime || "11:00");
  };

  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (rescheduleItem && newDate && newTime) {
      rescheduleFollowUp(rescheduleItem.id, newDate, newTime);
      setRescheduleItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Follow-Up & Communications Hub
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage scheduled customer consultations, post-inquiry calls, and studio vehicle assessments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="mr-1.5 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditingItem(null);
              setModalOpen(true);
            }}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Schedule Follow-Up
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-border/40 bg-card p-3.5">
          <span className="text-xs text-muted-foreground">Total Scheduled</span>
          <p className="mt-1 text-2xl font-bold text-foreground font-mono">{totalCount}</p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-3.5">
          <span className="text-xs text-amber-400 font-semibold">Due Today</span>
          <p className="mt-1 text-2xl font-bold text-amber-400 font-mono">{todayCount}</p>
        </div>
        <div className="rounded-xl border border-red-500/30 bg-red-950/10 p-3.5">
          <span className="text-xs text-red-400 font-semibold">Overdue</span>
          <p className="mt-1 text-2xl font-bold text-red-400 font-mono">{overdueCount}</p>
        </div>
        <div className="rounded-xl border border-blue-500/30 bg-blue-950/10 p-3.5">
          <span className="text-xs text-blue-400">Upcoming Pending</span>
          <p className="mt-1 text-2xl font-bold text-blue-400 font-mono">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-3.5">
          <span className="text-xs text-muted-foreground">Completed</span>
          <p className="mt-1 text-2xl font-bold text-emerald-400 font-mono">{completedCount}</p>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setTabFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tabFilter === "all"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              All Tasks ({totalCount})
            </button>
            <button
              onClick={() => setTabFilter("today")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tabFilter === "today"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
              }`}
            >
              Due Today ({todayCount})
            </button>
            <button
              onClick={() => setTabFilter("pending")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tabFilter === "pending"
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              Upcoming ({pendingCount})
            </button>
            <button
              onClick={() => setTabFilter("overdue")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tabFilter === "overdue"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 font-semibold"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              Overdue ({overdueCount})
            </button>
            <button
              onClick={() => setTabFilter("completed")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                tabFilter === "completed"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search client, car, topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Channels</option>
              <option value="phone">Phone Calls</option>
              <option value="email">Emails</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="meeting">Video Consultations</option>
              <option value="vehicle_viewing">Studio Inspections</option>
            </select>
          </div>

          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <select
              value={salespersonFilter}
              onChange={(e) => setSalespersonFilter(e.target.value)}
              className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Advisors</option>
              {salespersons.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName || s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Follow-up Items Cards List */}
      <div className="space-y-3">
        {filteredList.length > 0 ? (
          filteredList.map((item) => {
            const overdue = isOverdue(item);
            const today = isDueToday(item);
            const isDone = item.status === "completed";
            const client = item.customerName || item.clientName || "Client";
            const phone = item.customerPhone || item.clientPhone;
            const rep = item.assignedSalespersonName || item.salespersonName || "Advisor";
            const dateStr = item.followUpDate || item.scheduledDate || "";
            const timeStr = item.followUpTime || item.scheduledTime || "";
            const desc = item.description || item.notes || "Follow-up Touchpoint";

            return (
              <div
                key={item.id}
                className={`group rounded-xl border p-4 transition-all bg-card/60 hover:bg-card ${
                  overdue
                    ? "border-red-500/40 bg-red-950/15 shadow-sm shadow-red-950/20"
                    : today
                    ? "border-amber-500/40 bg-amber-950/15 shadow-sm shadow-amber-950/20"
                    : isDone
                    ? "border-emerald-500/20 opacity-80"
                    : "border-border/40 hover:border-primary/40"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Left: Channel icon, Client & Description */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-background border border-border/40 shrink-0 mt-0.5">
                      {getChannelIcon(item.type)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-foreground text-sm">
                          {client}
                        </span>
                        {item.vehicleSummary && (
                          <span className="text-xs text-muted-foreground">
                            • {item.vehicleSummary}
                          </span>
                        )}
                        {item.leadReference && (
                          <Link
                            href={`/admin/crm/leads/${item.leadId || item.leadReference}`}
                            className="text-[11px] font-mono text-primary hover:underline"
                          >
                            ({item.leadReference})
                          </Link>
                        )}
                        {getPriorityBadge(item.priority)}
                        {overdue && (
                          <Badge variant="destructive" className="text-[10px] animate-pulse">
                            Overdue
                          </Badge>
                        )}
                        {today && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
                            Due Today
                          </span>
                        )}
                        {!overdue && !today && !isDone && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30">
                            Upcoming
                          </span>
                        )}
                        {isDone && (
                          <Badge variant="success" className="text-[10px]">
                            Completed
                          </Badge>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                        {desc}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3 text-primary" />
                          {dateStr} at {timeStr}
                        </span>
                        <span>•</span>
                        <span>Advisor: <strong className="text-foreground">{rep}</strong></span>
                        {phone && (
                          <>
                            <span>•</span>
                            <a
                              href={`tel:${phone}`}
                              className="hover:text-primary transition-colors flex items-center gap-1"
                            >
                              <Phone className="h-3 w-3" />
                              {phone}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {!isDone ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white h-8 text-xs"
                          onClick={() => completeFollowUp(item.id)}
                        >
                          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                          Mark Done
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                          onClick={() => handleOpenReschedule(item)}
                        >
                          <Calendar className="mr-1.5 h-3.5 w-3.5" />
                          Reschedule
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 mr-2">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Done
                      </span>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      onClick={() => {
                        setEditingItem(item);
                        setModalOpen(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => deleteFollowUp(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-border/40 bg-card p-12 text-center">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <h3 className="mt-3 text-base font-semibold text-foreground">No Follow-Up Tasks Found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search criteria or schedule a new client touchpoint.
            </p>
            <Button
              size="sm"
              className="mt-4"
              onClick={() => {
                setEditingItem(null);
                setModalOpen(true);
              }}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Schedule Follow-Up
            </Button>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      <FollowUpModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={editingItem}
      />

      {/* Quick Reschedule Dialog */}
      <Dialog open={!!rescheduleItem} onOpenChange={(open) => !open && setRescheduleItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Reschedule Follow-Up
            </DialogTitle>
            <DialogDescription>
              Select a new date and time for {rescheduleItem?.customerName || rescheduleItem?.clientName}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveReschedule} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  New Date
                </label>
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  New Time
                </label>
                <Input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRescheduleItem(null)}>
                Cancel
              </Button>
              <Button type="submit">
                Confirm Reschedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
