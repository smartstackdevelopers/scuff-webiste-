"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCrm } from "../hooks/use-crm";
import { LeadPriority, LeadStatus } from "../types/crm";
import { Button } from "@/components/ui/button";
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
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Car,
  Clock,
  UserCheck,
  CheckCircle2,
  Plus,
  MessageSquare,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface LeadDetailsViewProps {
  id: string;
}

export function LeadDetailsView({ id }: LeadDetailsViewProps) {
  const router = useRouter();
  const {
    leads,
    salespersons,
    followUps,
    changeLeadStatus,
    assignSalespersonToLead,
    addLeadNote,
    convertLeadToCustomer,
    addFollowUp,
  } = useCrm();

  const lead = leads.find((l) => l.id === id || l.leadReference === id);

  // Note state
  const [noteContent, setNoteContent] = React.useState("");

  // Convert to Customer Modal
  const [convertModalOpen, setConvertModalOpen] = React.useState(false);

  // Schedule Follow-up Modal
  const [followUpModalOpen, setFollowUpModalOpen] = React.useState(false);
  const [followUpForm, setFollowUpForm] = React.useState({
    scheduledDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    scheduledTime: "11:00",
    type: "phone" as "phone" | "email" | "whatsapp" | "meeting" | "vehicle_viewing",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    description: "",
    salespersonId: lead?.assignedSalespersonId || "",
  });

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (!lead) {
    return (
      <div className="min-h-[450px] flex flex-col items-center justify-center p-8 text-center bg-card rounded-2xl border border-border">
        <h2 className="text-xl font-bold text-foreground mb-2">Lead Record Not Found</h2>
        <p className="text-muted-foreground text-xs max-w-sm mb-4">
          The requested sales opportunity &quot;{id}&quot; does not exist in the active CRM registry.
        </p>
        <Button size="sm" onClick={() => router.push("/admin/crm/leads")}>
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Return to Pipeline</span>
        </Button>
      </div>
    );
  }

  // Related follow-ups for this lead
  const leadFollowUps = followUps.filter(
    (f) => f.leadId === lead.id || f.leadReference === lead.leadReference
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    addLeadNote(lead.id, noteContent.trim());
    setNoteContent("");
    showToast("Directive note logged to client timeline.");
  };

  const handleScheduleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    const rep = salespersons.find((s) => s.id === followUpForm.salespersonId) || salespersons[0];

    addFollowUp({
      leadId: lead.id,
      leadReference: lead.leadReference,
      customerName: lead.customerName,
      customerPhone: lead.phone,
      customerEmail: lead.email,
      followUpDate: followUpForm.scheduledDate,
      scheduledDate: followUpForm.scheduledDate,
      followUpTime: followUpForm.scheduledTime,
      type: followUpForm.type,
      priority: followUpForm.priority,
      status: "pending",
      notes: followUpForm.description || `Follow-up regarding ${lead.interestedService}`,
      assignedSalespersonId: rep.id,
      assignedSalespersonName: rep.fullName,
    });

    setFollowUpModalOpen(false);
    showToast(`Follow-up scheduled for ${followUpForm.scheduledDate} at ${followUpForm.scheduledTime}`);
  };

  const handleConvertLead = () => {
    const custId = convertLeadToCustomer(lead.id);
    if (custId) {
      showToast(`Lead converted into active customer #${custId}`);
    }
  };

  const cleanPhoneForWhatsApp = (raw: string) => {
    return raw.replace(/[^0-9]/g, "");
  };

  const getPriorityBadge = (priority?: LeadPriority) => {
    switch (priority) {
      case "urgent":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/15 text-rose-400 border border-rose-500/30">Urgent</span>;
      case "high":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">High</span>;
      case "low":
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-zinc-700/40 text-zinc-400 border border-zinc-700">Low</span>;
      case "medium":
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30">Medium</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-amber-500/40 text-amber-400 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400" />
          <p className="text-xs font-semibold text-foreground">{toastMessage}</p>
        </div>
      )}

      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/60 backdrop-blur-md p-4 rounded-2xl border border-border">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/crm/leads"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Leads</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="font-mono text-xs font-bold text-amber-400">{lead.leadReference}</span>
          <span className="text-muted-foreground text-xs font-mono">&bull; {lead.createdDate}</span>
        </div>

        {/* Quick Communications & Conversion */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Call shortcut */}
          <a
            href={`tel:${lead.phone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-colors"
            title="Call Customer"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call</span>
          </a>

          {/* Email shortcut */}
          <a
            href={`mailto:${lead.email}?subject=You%20Scuff%20We%20Buff%20-%20${encodeURIComponent(lead.interestedService)}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-colors"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>Email</span>
          </a>

          {/* WhatsApp shortcut */}
          <a
            href={`https://wa.me/${cleanPhoneForWhatsApp(lead.phone)}?text=Hello%20${encodeURIComponent(lead.customerName)},%20regarding%20your%20detailing%20inquiry%20at%20You%20Scuff%20We%20Buff:`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 transition-colors"
            title="Open WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Schedule Follow-up modal trigger */}
          <button
            onClick={() => setFollowUpModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Schedule Follow-up</span>
          </button>

          {/* Convert Lead into Customer Button */}
          {lead.status !== "converted" ? (
            <button
              onClick={() => setConvertModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Convert to Customer</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Converted Client
            </span>
          )}
        </div>
      </div>

      {/* Hero Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Client & Vehicle Dossier */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Card */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-foreground">{lead.customerName}</h2>
                  {getPriorityBadge(lead.priority)}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span>Type: <strong className="text-foreground uppercase">{lead.customerType || "Individual"}</strong></span>
                  <span>&bull;</span>
                  <span>Channel: <strong className="text-foreground capitalize">{lead.leadSource.replace("_", " ")}</strong></span>
                </div>
              </div>

              {/* Stage Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Stage:</span>
                <select
                  value={lead.status}
                  onChange={(e) => changeLeadStatus(lead.id, e.target.value as LeadStatus)}
                  className="bg-secondary text-foreground border border-border rounded-xl text-xs font-bold px-3 py-1.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="new">New Inquiry</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="negotiation">In Negotiation</option>
                  <option value="converted">Converted Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
            </div>

            {/* Contact details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/80 text-xs">
              <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                <span className="text-muted-foreground text-[10px] uppercase font-bold block mb-1">
                  Telephone
                </span>
                <a href={`tel:${lead.phone}`} className="font-semibold text-foreground hover:text-amber-400">
                  {lead.phone}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                <span className="text-muted-foreground text-[10px] uppercase font-bold block mb-1">
                  Email
                </span>
                <a href={`mailto:${lead.email}`} className="font-semibold text-foreground hover:text-amber-400 truncate block">
                  {lead.email}
                </a>
              </div>

              <div className="p-3 rounded-xl bg-secondary/40 border border-border/60">
                <span className="text-muted-foreground text-[10px] uppercase font-bold block mb-1">
                  Last Contacted
                </span>
                <span className="font-semibold font-mono text-foreground">
                  {lead.lastContactedDate || "Pending call"}
                </span>
              </div>
            </div>
          </div>

          {/* Vehicle & Treatment Card */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Car className="w-4 h-4" />
              Vehicle Specifications &amp; Desired Treatment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-secondary/40 border border-border/70 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Vehicle:</span>
                <p className="text-base font-bold text-foreground">
                  {lead.vehicleYear ? `${lead.vehicleYear} ` : ""}
                  {lead.vehicleMake} {lead.vehicleModel}
                </p>
                <div className="flex items-center gap-3 pt-1 font-mono text-[11px] text-muted-foreground">
                  <span>Type: <strong className="text-foreground">{lead.vehicleType}</strong></span>
                  {lead.vehicleRegistration && (
                    <span className="bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-400/20">
                      {lead.vehicleRegistration}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/40 border border-border/70 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Interested Treatment:</span>
                <p className="text-base font-bold text-foreground">{lead.interestedService}</p>
                <div className="flex items-center justify-between pt-1 font-mono text-xs">
                  <span className="text-muted-foreground">Estimated Deal:</span>
                  <strong className="text-amber-400 text-sm font-extrabold">
                    {lead.currency}{lead.estimatedValue.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            {lead.notes && (
              <div className="p-3.5 rounded-xl bg-secondary/30 border border-border/60 text-xs">
                <span className="font-bold text-foreground block mb-1">Client Special Directives:</span>
                <p className="text-muted-foreground leading-relaxed">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Activity Timeline Section */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Chronological Activity &amp; Audit Timeline
            </h3>

            {/* Timeline Stream */}
            <div className="space-y-3 pt-2">
              {(!lead.activities || lead.activities.length === 0) ? (
                <p className="text-xs text-muted-foreground py-4 text-center">No recorded activity events.</p>
              ) : (
                lead.activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-secondary/40 border border-border/60 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-foreground">{act.title}</p>
                      <p className="text-muted-foreground text-[11px] mt-0.5">{act.description}</p>
                      <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">
                        Logged by: {act.actorName}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground whitespace-nowrap">
                      {act.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="pt-4 border-t border-border space-y-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                Add Internal Directive / Note
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Record customer paint thickness observations, timeline requirements..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500"
                />
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Post Note</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Rep Assignment, Follow-ups, Quotations */}
        <div className="space-y-6">
          {/* Salesperson Assignment Card */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Sales Representative
            </h3>
            <div className="p-3.5 rounded-xl bg-secondary/40 border border-border text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Assigned Rep:</span>
                <strong className="text-foreground">{lead.assignedSalespersonName}</strong>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-muted-foreground mb-1">
                  Reassign Deal:
                </label>
                <select
                  value={lead.assignedSalespersonId}
                  onChange={(e) => {
                    const sp = salespersons.find((s) => s.id === e.target.value);
                    if (sp) {
                      assignSalespersonToLead(lead.id, sp.id, sp.fullName);
                      showToast(`Opportunity reassigned to ${sp.fullName}`);
                    }
                  }}
                  className="w-full bg-card border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-amber-500"
                >
                  {salespersons.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.fullName} ({sp.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Follow-ups Card */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Scheduled Follow-ups
              </h3>
              <button
                onClick={() => setFollowUpModalOpen(true)}
                className="text-[11px] text-amber-400 hover:underline font-bold"
              >
                + Schedule
              </button>
            </div>

            <div className="space-y-2 pt-1 text-xs">
              {leadFollowUps.length === 0 ? (
                <p className="text-muted-foreground text-[11px] text-center py-4">No follow-ups logged for this lead.</p>
              ) : (
                leadFollowUps.map((fup) => (
                  <div
                    key={fup.id}
                    className="p-3 rounded-xl bg-secondary/40 border border-border/70 space-y-1"
                  >
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold text-foreground capitalize flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        {fup.type}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-bold uppercase ${
                          fup.status === "completed" ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {fup.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">{fup.notes}</p>
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-border/50">
                      <span>{fup.followUpDate || fup.scheduledDate}</span>
                      <span>{fup.followUpTime || "11:00"}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Linked Customer Card (if converted) */}
          {lead.convertedCustomerId && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Customer Profile</span>
              </div>
              <p className="text-muted-foreground">
                This lead was converted into client record{" "}
                <strong className="text-foreground font-mono">{lead.convertedCustomerId}</strong>.
              </p>
              <Link
                href="/admin/customers"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline font-bold pt-1"
              >
                <span>View Customer Account</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Convert Lead to Customer Modal */}
      {convertModalOpen && (
        <Dialog open={convertModalOpen} onOpenChange={setConvertModalOpen}>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-amber-400">
                <Sparkles className="w-5 h-5" />
                Convert Lead to Client Account
              </DialogTitle>
              <DialogDescription>
                Convert <strong className="text-foreground">{lead.customerName}</strong> into a verified
                studio customer. This creates a customer record and links their vehicle dossier while preserving full CRM history.
              </DialogDescription>
            </DialogHeader>

            <div className="p-3.5 rounded-xl bg-secondary/40 border border-border space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client Name:</span>
                <strong className="text-foreground">{lead.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-mono text-foreground">{lead.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vehicle:</span>
                <span className="text-foreground">{lead.vehicleMake} {lead.vehicleModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Treatment:</span>
                <span className="text-foreground">{lead.interestedService}</span>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button variant="outline" size="sm" onClick={() => setConvertModalOpen(false)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  handleConvertLead();
                  setConvertModalOpen(false);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold"
              >
                Confirm Conversion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Schedule Follow-up Modal */}
      {followUpModalOpen && (
        <Dialog open={followUpModalOpen} onOpenChange={setFollowUpModalOpen}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                Schedule Follow-up with {lead.customerName}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleScheduleFollowUp} className="space-y-4 pt-2 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Date *</label>
                  <Input
                    type="date"
                    required
                    value={followUpForm.scheduledDate}
                    onChange={(e) =>
                      setFollowUpForm((prev) => ({ ...prev, scheduledDate: e.target.value }))
                    }
                    className="bg-card text-xs"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Time *</label>
                  <Input
                    type="time"
                    required
                    value={followUpForm.scheduledTime}
                    onChange={(e) =>
                      setFollowUpForm((prev) => ({ ...prev, scheduledTime: e.target.value }))
                    }
                    className="bg-card text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Contact Method</label>
                  <select
                    value={followUpForm.type}
                    onChange={(e) =>
                      setFollowUpForm((prev) => ({
                        ...prev,
                        type: e.target.value as any,
                      }))
                    }
                    className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="phone">Telephone Consultation</option>
                    <option value="email">Email Follow-Up</option>
                    <option value="whatsapp">WhatsApp Direct Message</option>
                    <option value="meeting">In-Studio Vehicle Inspection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted-foreground font-semibold mb-1">Priority</label>
                  <select
                    value={followUpForm.priority}
                    onChange={(e) =>
                      setFollowUpForm((prev) => ({
                        ...prev,
                        priority: e.target.value as any,
                      }))
                    }
                    className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">Follow-up Directive</label>
                <textarea
                  rows={3}
                  value={followUpForm.description}
                  onChange={(e) =>
                    setFollowUpForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="e.g. Call to discuss quote QUO-2026-081 and confirm paint protection bay availability..."
                  className="w-full bg-card border border-border rounded-xl p-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 text-xs resize-none"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setFollowUpModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold">
                  Schedule Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
