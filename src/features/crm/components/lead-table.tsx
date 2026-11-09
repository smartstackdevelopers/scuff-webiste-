"use client";

import * as React from "react";
import Link from "next/link";
import { CRMLead, LeadPriority, LeadStatus } from "../types/crm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Download,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Target,
  ArrowUpDown,
  CheckSquare,
  Square,
  Sparkles,
} from "lucide-react";
import { useCrm } from "../hooks/use-crm";
import { LeadModal } from "./lead-modal";
import { LeadPipeline } from "./lead-pipeline";
import { exportToCsv } from "../lib/crm-calculations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function LeadTable() {
  const {
    leads,
    addLead,
    updateLead,
    deleteLead,
    bulkUpdateLeadStatus,
    bulkAssignSalesperson,
    salespersons,
  } = useCrm();

  const [viewMode, setViewMode] = React.useState<"table" | "pipeline">("table");
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [sourceFilter, setSourceFilter] = React.useState<string>("all");
  const [salespersonFilter, setSalespersonFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");

  const [sortBy, setSortBy] = React.useState<"createdDate" | "estimatedValue" | "nextFollowUpDate" | "customerName">("createdDate");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  // Selection & Bulk Actions
  const [selectedLeadIds, setSelectedLeadIds] = React.useState<string[]>([]);
  const [bulkSalespersonId, setBulkSalespersonId] = React.useState("");

  // Modals
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingLead, setEditingLead] = React.useState<CRMLead | null>(null);
  const [deletingLead, setDeletingLead] = React.useState<CRMLead | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const [page, setPage] = React.useState(1);
  const itemsPerPage = 8;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filter & Sort leads
  const filteredLeads = React.useMemo(() => {
    return leads
      .filter((l) => {
        const matchSearch =
          l.leadReference.toLowerCase().includes(search.toLowerCase()) ||
          l.customerName.toLowerCase().includes(search.toLowerCase()) ||
          l.email.toLowerCase().includes(search.toLowerCase()) ||
          l.phone.toLowerCase().includes(search.toLowerCase()) ||
          l.vehicleMake.toLowerCase().includes(search.toLowerCase()) ||
          l.vehicleModel.toLowerCase().includes(search.toLowerCase()) ||
          l.interestedService.toLowerCase().includes(search.toLowerCase());

        const matchStatus = statusFilter === "all" || l.status === statusFilter;
        const matchSource = sourceFilter === "all" || l.leadSource === sourceFilter;
        const matchSalesperson =
          salespersonFilter === "all" || l.assignedSalespersonId === salespersonFilter;
        const matchPriority = priorityFilter === "all" || l.priority === priorityFilter;
        const matchType = typeFilter === "all" || l.customerType === typeFilter;

        return matchSearch && matchStatus && matchSource && matchSalesperson && matchPriority && matchType;
      })
      .sort((a, b) => {
        if (sortBy === "estimatedValue") {
          return sortOrder === "asc"
            ? a.estimatedValue - b.estimatedValue
            : b.estimatedValue - a.estimatedValue;
        } else if (sortBy === "customerName") {
          return sortOrder === "asc"
            ? a.customerName.localeCompare(b.customerName)
            : b.customerName.localeCompare(a.customerName);
        } else if (sortBy === "nextFollowUpDate") {
          const dateA = a.nextFollowUpDate || "9999-99-99";
          const dateB = b.nextFollowUpDate || "9999-99-99";
          return sortOrder === "asc" ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
        } else {
          return sortOrder === "asc"
            ? a.createdDate.localeCompare(b.createdDate)
            : b.createdDate.localeCompare(a.createdDate);
        }
      });
  }, [leads, search, statusFilter, sourceFilter, salespersonFilter, priorityFilter, typeFilter, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / itemsPerPage));
  const paginated = filteredLeads.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Bulk Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleToggleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (newStatus: LeadStatus) => {
    if (selectedLeadIds.length === 0) return;
    bulkUpdateLeadStatus(selectedLeadIds, newStatus);
    showToast(`Updated ${selectedLeadIds.length} leads to status: ${newStatus}`);
    setSelectedLeadIds([]);
  };

  const handleBulkAssign = () => {
    if (selectedLeadIds.length === 0 || !bulkSalespersonId) return;
    const targetSp = salespersons.find((s) => s.id === bulkSalespersonId);
    if (!targetSp) return;

    bulkAssignSalesperson(selectedLeadIds, targetSp.id, targetSp.fullName);
    showToast(`Reassigned ${selectedLeadIds.length} leads to ${targetSp.fullName}`);
    setSelectedLeadIds([]);
    setBulkSalespersonId("");
  };

  const handleExportCsv = () => {
    const headers = [
      "Lead Ref",
      "Customer Name",
      "Email",
      "Phone",
      "Customer Type",
      "Priority",
      "Vehicle",
      "Interested Service",
      "Source",
      "Assigned Salesperson",
      "Status",
      "Estimated Value (£)",
      "Created Date",
      "Next Follow-up",
    ];

    const rows = filteredLeads.map((l) => [
      l.leadReference,
      l.customerName,
      l.email,
      l.phone,
      l.customerType || "Individual",
      l.priority || "Medium",
      `${l.vehicleMake} ${l.vehicleModel}`,
      l.interestedService,
      l.leadSource,
      l.assignedSalespersonName,
      l.statusLabel,
      l.estimatedValue.toString(),
      l.createdDate,
      l.nextFollowUpDate || "N/A",
    ]);

    exportToCsv("you-scuff-we-buff-leads.csv", headers, rows);
    showToast(`Exported ${filteredLeads.length} leads to CSV`);
  };

  const handleDeleteConfirm = () => {
    if (deletingLead) {
      deleteLead(deletingLead.id);
      showToast(`Lead ${deletingLead.leadReference} deleted.`);
      setDeletingLead(null);
    }
  };

  const getPriorityBadge = (priority?: LeadPriority) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-400 border border-rose-500/30">
            Urgent
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
            High
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-700/40 text-zinc-400 border border-zinc-700">
            Low
          </span>
        );
      case "medium":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
            Medium
          </span>
        );
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "converted":
        return (
          <Badge variant="success" className="text-[11px] font-semibold">
            Converted
          </Badge>
        );
      case "qualified":
        return (
          <Badge variant="secondary" className="text-[11px] font-semibold bg-purple-500/15 text-purple-400 border-purple-500/30">
            Qualified
          </Badge>
        );
      case "proposal_sent":
        return (
          <Badge variant="warning" className="text-[11px] font-semibold">
            Proposal Sent
          </Badge>
        );
      case "negotiation":
        return (
          <Badge variant="electric" className="text-[11px] font-semibold">
            Negotiation
          </Badge>
        );
      case "contacted":
        return (
          <Badge variant="secondary" className="text-[11px] font-semibold bg-cyan-500/15 text-cyan-400 border-cyan-500/30">
            Contacted
          </Badge>
        );
      case "interested":
        return (
          <Badge variant="secondary" className="text-[11px] font-semibold bg-indigo-500/15 text-indigo-400 border-indigo-500/30">
            Interested
          </Badge>
        );
      case "lost":
        return (
          <Badge variant="destructive" className="text-[11px] font-semibold">
            Lost
          </Badge>
        );
      case "new":
      default:
        return (
          <Badge variant="outline" className="text-[11px] font-semibold text-blue-400 border-blue-500/30">
            New
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-amber-500/40 text-amber-400 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <p className="text-xs font-semibold text-foreground">{toastMessage}</p>
        </div>
      )}

      {/* Header and Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Leads &amp; Opportunity Pipeline
            </h1>
            <Badge variant="electric" className="text-xs">
              {filteredLeads.length} Inquiries
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Capture, qualify, assign, and track client inquiries through the detailing sales lifecycle.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          {/* View Switcher: Table vs Pipeline Kanban */}
          <div className="flex items-center bg-secondary/80 p-1 rounded-xl border border-border">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "table"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("pipeline")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "pipeline"
                  ? "bg-amber-500 text-zinc-950 font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Kanban Pipeline"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export CSV</span>
          </Button>

          <Button
            size="sm"
            onClick={() => {
              setEditingLead(null);
              setModalOpen(true);
            }}
            className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add New Lead</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads by client name, email, phone, reference, or vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 text-xs bg-secondary/40"
            />
          </div>

          {/* Filters Grid */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-secondary/70 text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Stages</option>
              <option value="new">New Inquiry</option>
              <option value="contacted">Contacted</option>
              <option value="interested">Interested</option>
              <option value="qualified">Qualified</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="negotiation">Negotiation</option>
              <option value="converted">Converted Won</option>
              <option value="lost">Lost</option>
            </select>

            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-secondary/70 text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Sources</option>
              <option value="website">Website</option>
              <option value="google">Google</option>
              <option value="instagram">Instagram</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="phone_call">Phone Call</option>
              <option value="referral">Client Referral</option>
              <option value="walk_in">Studio Walk-In</option>
              <option value="facebook">Facebook</option>
            </select>

            {/* Customer Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-secondary/70 text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Customer Types</option>
              <option value="individual">Private Owner</option>
              <option value="collector">Collector</option>
              <option value="vip">VIP</option>
              <option value="dealership">Dealership</option>
              <option value="corporate">Corporate</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-secondary/70 text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Salesperson Filter */}
            <select
              value={salespersonFilter}
              onChange={(e) => setSalespersonFilter(e.target.value)}
              className="bg-secondary/70 text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Sales Reps</option>
              {salespersons.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.fullName}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <button
              onClick={() => {
                if (sortBy === "estimatedValue") {
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                } else {
                  setSortBy("estimatedValue");
                  setSortOrder("desc");
                }
              }}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                sortBy === "estimatedValue"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-secondary/70 text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Deal Value {sortBy === "estimatedValue" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</span>
            </button>
          </div>
        </div>

        {/* Bulk Action Toolbar (Appears when 1+ selected) */}
        {selectedLeadIds.length > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-foreground">
                {selectedLeadIds.length} lead{selectedLeadIds.length > 1 ? "s" : ""} selected
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => handleBulkStatusChange("contacted")}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-[11px] font-semibold hover:bg-cyan-500/25 transition-colors"
              >
                Mark Contacted
              </button>
              <button
                onClick={() => handleBulkStatusChange("interested")}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-[11px] font-semibold hover:bg-indigo-500/25 transition-colors"
              >
                Mark Interested
              </button>
              <button
                onClick={() => handleBulkStatusChange("qualified")}
                className="px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30 text-[11px] font-semibold hover:bg-purple-500/25 transition-colors"
              >
                Mark Qualified
              </button>
              <button
                onClick={() => handleBulkStatusChange("lost")}
                className="px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[11px] font-semibold hover:bg-rose-500/25 transition-colors"
              >
                Mark Lost
              </button>

              <div className="flex items-center gap-1.5 ml-2 border-l border-border/80 pl-2">
                <select
                  value={bulkSalespersonId}
                  onChange={(e) => setBulkSalespersonId(e.target.value)}
                  className="bg-card text-foreground border border-border rounded-lg text-[11px] px-2 py-1"
                >
                  <option value="">Select Rep...</option>
                  {salespersons.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleBulkAssign}
                  disabled={!bulkSalespersonId}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-zinc-950 font-bold text-[11px] disabled:opacity-40 hover:bg-amber-400 transition-colors"
                >
                  Assign
                </button>
              </div>

              <button
                onClick={() => setSelectedLeadIds([])}
                className="text-[11px] text-muted-foreground hover:text-foreground ml-1"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content: Table or Kanban Pipeline */}
      {viewMode === "pipeline" ? (
        <LeadPipeline leads={filteredLeads} />
      ) : (
        <div className="rounded-2xl bg-card border border-border/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-secondary/50 font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4 w-10 text-center">
                    <button
                      onClick={() =>
                        handleSelectAll(selectedLeadIds.length !== filteredLeads.length)
                      }
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">Lead Ref</th>
                  <th className="py-3 px-4">Customer &amp; Type</th>
                  <th className="py-3 px-4">Vehicle &amp; Service</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Sales Rep</th>
                  <th className="py-3 px-4 text-center">Priority</th>
                  <th className="py-3 px-4 text-center">Stage</th>
                  <th className="py-3 px-4 text-right">Estimated Deal</th>
                  <th className="py-3 px-4 text-center">Next Follow-Up</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-12 text-center text-muted-foreground">
                      <Target className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="font-semibold text-foreground">No leads match the active filters</p>
                      <p className="text-[11px] mt-0.5">Try adjusting your search query or reset filters.</p>
                    </td>
                  </tr>
                ) : (
                  paginated.map((lead) => {
                    const isSelected = selectedLeadIds.includes(lead.id);

                    return (
                      <tr
                        key={lead.id}
                        className={`hover:bg-secondary/40 transition-colors ${
                          isSelected ? "bg-amber-500/5" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggleSelectLead(lead.id)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>

                        {/* Reference */}
                        <td className="py-3.5 px-4">
                          <Link
                            href={`/admin/crm/leads/${lead.id}`}
                            className="font-mono font-bold text-amber-400 hover:underline block"
                          >
                            {lead.leadReference}
                          </Link>
                          <span className="text-[10px] text-muted-foreground font-mono">
                            {lead.createdDate}
                          </span>
                        </td>

                        {/* Customer & Type */}
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-foreground">{lead.customerName}</p>
                          <p className="text-[11px] text-muted-foreground">{lead.phone}</p>
                          {lead.customerType && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-secondary text-muted-foreground border border-border">
                              {lead.customerType}
                            </span>
                          )}
                        </td>

                        {/* Vehicle & Service */}
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-foreground">
                            {lead.vehicleMake} {lead.vehicleModel}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                            {lead.interestedService}
                          </p>
                        </td>

                        {/* Source */}
                        <td className="py-3.5 px-4 capitalize font-medium text-muted-foreground">
                          {lead.leadSource.replace("_", " ")}
                        </td>

                        {/* Sales Rep */}
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-foreground">
                            {lead.assignedSalespersonName}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="py-3.5 px-4 text-center">
                          {getPriorityBadge(lead.priority)}
                        </td>

                        {/* Stage */}
                        <td className="py-3.5 px-4 text-center">
                          {getStatusBadge(lead.status)}
                        </td>

                        {/* Deal Value */}
                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono font-bold text-foreground text-sm">
                            {lead.currency}{lead.estimatedValue.toLocaleString()}
                          </span>
                        </td>

                        {/* Next Follow-up */}
                        <td className="py-3.5 px-4 text-center font-mono text-[11px]">
                          {lead.nextFollowUpDate ? (
                            <span className="text-amber-400 font-semibold">
                              {lead.nextFollowUpDate}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">None</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/admin/crm/leads/${lead.id}`}
                              className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                              title="View Full Profile"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={() => {
                                setEditingLead(lead);
                                setModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                              title="Edit Lead"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setDeletingLead(lead)}
                              className="p-1.5 rounded-lg bg-secondary hover:bg-rose-500/20 text-muted-foreground hover:text-rose-400 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Toolbar */}
          <div className="p-3.5 border-t border-border bg-secondary/30 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing page <strong className="text-foreground">{page}</strong> of{" "}
              <strong className="text-foreground">{totalPages}</strong> ({filteredLeads.length} total)
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-7 px-2.5 text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="h-7 px-2.5 text-xs"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Create / Edit Modal */}
      <LeadModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        leadToEdit={editingLead}
        onSave={(data) => {
          if (editingLead) {
            updateLead(editingLead.id, data);
            showToast(`Updated lead ${editingLead.leadReference}`);
          } else {
            const newId = addLead(data);
            showToast(`Registered new lead #${newId}`);
          }
        }}
      />

      {/* Delete Confirmation Modal */}
      {deletingLead && (
        <Dialog open={!!deletingLead} onOpenChange={() => setDeletingLead(null)}>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-rose-500">
                <Trash2 className="w-5 h-5" />
                Confirm Lead Deletion
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to permanently delete lead{" "}
                <strong className="text-foreground font-mono">{deletingLead.leadReference}</strong> ({deletingLead.customerName})? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setDeletingLead(null)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteConfirm}>
                Confirm Deletion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
