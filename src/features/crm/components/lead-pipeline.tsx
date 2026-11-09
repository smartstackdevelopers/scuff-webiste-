"use client";

import * as React from "react";
import Link from "next/link";
import { CRMLead, LeadPriority, LeadStatus } from "../types/crm";
import {
  ArrowRight,
  ExternalLink,
  Eye,
  Phone,
  Mail,
  GripVertical,
} from "lucide-react";
import { useCrm } from "../hooks/use-crm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LeadPipelineProps {
  leads: CRMLead[];
}

export function LeadPipeline({ leads }: LeadPipelineProps) {
  const { changeLeadStatus } = useCrm();

  const [draggingLeadId, setDraggingLeadId] = React.useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = React.useState<LeadStatus | null>(null);
  const [quickViewLead, setQuickViewLead] = React.useState<CRMLead | null>(null);

  // 7 Stages requested in Prompt 14
  const stages: { status: LeadStatus; label: string; accentColor: string; bgHighlight: string }[] = [
    { status: "new", label: "1. New Inquiry", accentColor: "border-t-blue-500", bgHighlight: "bg-blue-500/5" },
    { status: "contacted", label: "2. Contacted", accentColor: "border-t-cyan-500", bgHighlight: "bg-cyan-500/5" },
    { status: "interested", label: "3. Interested", accentColor: "border-t-indigo-500", bgHighlight: "bg-indigo-500/5" },
    { status: "qualified", label: "4. Qualified", accentColor: "border-t-purple-500", bgHighlight: "bg-purple-500/5" },
    { status: "proposal_sent", label: "5. Proposal Sent", accentColor: "border-t-amber-500", bgHighlight: "bg-amber-500/5" },
    { status: "converted", label: "6. Converted", accentColor: "border-t-emerald-500", bgHighlight: "bg-emerald-500/5" },
    { status: "lost", label: "7. Lost", accentColor: "border-t-rose-500", bgHighlight: "bg-rose-500/5" },
  ];

  const getPriorityBadge = (priority?: LeadPriority) => {
    switch (priority) {
      case "urgent":
        return <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-rose-500/15 text-rose-400 border border-rose-500/30">Urgent</span>;
      case "high":
        return <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">High</span>;
      case "low":
        return <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-zinc-700/40 text-zinc-400 border border-zinc-700">Low</span>;
      case "medium":
      default:
        return <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30">Medium</span>;
    }
  };

  const getNextStage = (current: LeadStatus): LeadStatus | null => {
    switch (current) {
      case "new":
        return "contacted";
      case "contacted":
        return "interested";
      case "interested":
        return "qualified";
      case "qualified":
        return "proposal_sent";
      case "proposal_sent":
        return "converted";
      default:
        return null;
    }
  };

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
    e.dataTransfer.effectAllowed = "move";
    setDraggingLeadId(leadId);
  };

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== status) {
      setDragOverColumn(status);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("text/plain") || draggingLeadId;
    if (droppedId) {
      changeLeadStatus(droppedId, targetStatus);
    }
    setDraggingLeadId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="space-y-4">
      {/* Visual Instruction Banner */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span className="flex items-center gap-1.5">
          <GripVertical className="w-4 h-4 text-amber-400" />
          Drag and drop lead cards across pipeline stages to advance opportunities.
        </span>
        <span className="font-mono text-[11px] text-amber-400">
          7 Stages &bull; Live Telemetry
        </span>
      </div>

      {/* Horizontal Kanban Scroll Container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3.5 min-w-[1400px]">
          {stages.map((stage) => {
            const stageLeads = leads.filter((l) => l.status === stage.status);
            const stageValue = stageLeads.reduce(
              (sum, l) => sum + (Number(l.estimatedValue) || 0),
              0
            );
            const isColumnOver = dragOverColumn === stage.status;

            return (
              <div
                key={stage.status}
                onDragOver={(e) => handleDragOver(e, stage.status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, stage.status)}
                className={`flex-1 rounded-2xl bg-card border border-border/80 border-t-4 ${
                  stage.accentColor
                } p-3 flex flex-col justify-between space-y-3 min-w-[195px] shadow-sm transition-all duration-200 ${
                  isColumnOver
                    ? "ring-2 ring-amber-500/80 bg-amber-500/5 scale-[1.01]"
                    : ""
                }`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-border/60 text-xs">
                  <div>
                    <h4 className="font-bold text-foreground truncate">{stage.label}</h4>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {stageLeads.length} deals &bull; £{stageValue.toLocaleString()}
                    </span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-secondary text-foreground flex items-center justify-center text-[10px] font-mono font-bold">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[620px] pr-0.5">
                  {stageLeads.length === 0 ? (
                    <div
                      className={`py-12 text-center text-[11px] text-muted-foreground border border-dashed rounded-xl ${
                        isColumnOver ? "border-amber-500 bg-amber-500/10 text-amber-300" : "border-border/60"
                      }`}
                    >
                      {isColumnOver ? "Drop deal here" : "Empty Stage"}
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const nextStage = getNextStage(lead.status);
                      const isBeingDragged = draggingLeadId === lead.id;

                      return (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead.id)}
                          onDragEnd={() => {
                            setDraggingLeadId(null);
                            setDragOverColumn(null);
                          }}
                          className={`p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/70 hover:border-amber-500/50 transition-all space-y-2 text-xs cursor-grab active:cursor-grabbing group shadow-sm ${
                            isBeingDragged ? "opacity-40 scale-95 border-amber-500" : "opacity-100"
                          }`}
                        >
                          {/* Card Top: Ref & Deal Value */}
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-amber-400">
                              {lead.leadReference}
                            </span>
                            <span className="font-mono font-bold text-foreground">
                              {lead.currency}{lead.estimatedValue.toLocaleString()}
                            </span>
                          </div>

                          {/* Customer & Vehicle */}
                          <div>
                            <Link
                              href={`/admin/crm/leads/${lead.id}`}
                              className="font-bold text-foreground hover:text-amber-400 transition-colors block truncate"
                            >
                              {lead.customerName}
                            </Link>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {lead.vehicleMake} {lead.vehicleModel}
                            </p>
                            <p className="text-[10px] text-muted-foreground/80 truncate mt-0.5">
                              {lead.interestedService}
                            </p>
                          </div>

                          {/* Badges: Source & Priority */}
                          <div className="flex items-center justify-between pt-1 text-[10px]">
                            <span className="capitalize font-mono text-muted-foreground">
                              {lead.leadSource.replace("_", " ")}
                            </span>
                            {getPriorityBadge(lead.priority)}
                          </div>

                          {/* Card Footer: Sales Rep & Quick Controls */}
                          <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
                            <span className="text-muted-foreground font-medium truncate max-w-[85px]">
                              {lead.assignedSalespersonName.split(" ")[0]}
                            </span>

                            <div className="flex items-center gap-1">
                              {/* Quick View Button */}
                              <button
                                type="button"
                                onClick={() => setQuickViewLead(lead)}
                                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                title="Quick View Summary"
                              >
                                <Eye className="w-3 h-3" />
                              </button>

                              {/* Advance stage button */}
                              {nextStage && (
                                <button
                                  type="button"
                                  onClick={() => changeLeadStatus(lead.id, nextStage)}
                                  className="p-1 rounded-md bg-card hover:bg-amber-500 hover:text-zinc-950 border border-border/70 text-foreground transition-colors"
                                  title={`Advance to ${nextStage}`}
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}

                              <Link
                                href={`/admin/crm/leads/${lead.id}`}
                                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                                title="Open Full Profile"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Dialog */}
      {quickViewLead && (
        <Dialog open={!!quickViewLead} onOpenChange={() => setQuickViewLead(null)}>
          <DialogContent size="default" className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {quickViewLead.leadReference}
                  </span>
                  <DialogTitle className="text-lg font-bold text-foreground mt-0.5">
                    {quickViewLead.customerName}
                  </DialogTitle>
                </div>
                {getPriorityBadge(quickViewLead.priority)}
              </div>
            </DialogHeader>

            <div className="space-y-4 text-xs pt-2">
              {/* Contact info grid */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                <a
                  href={`tel:${quickViewLead.phone}`}
                  className="flex items-center gap-2 text-foreground hover:text-amber-400 font-medium truncate"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{quickViewLead.phone}</span>
                </a>
                <a
                  href={`mailto:${quickViewLead.email}`}
                  className="flex items-center gap-2 text-foreground hover:text-amber-400 font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{quickViewLead.email}</span>
                </a>
              </div>

              {/* Deal & Vehicle Specifications */}
              <div className="space-y-2">
                <div className="flex justify-between p-2.5 rounded-lg bg-secondary/30 border border-border/60">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <strong className="text-foreground">
                    {quickViewLead.vehicleMake} {quickViewLead.vehicleModel} ({quickViewLead.vehicleRegistration || "Reg Pending"})
                  </strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-secondary/30 border border-border/60">
                  <span className="text-muted-foreground">Interested Service:</span>
                  <strong className="text-foreground">{quickViewLead.interestedService}</strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-secondary/30 border border-border/60">
                  <span className="text-muted-foreground">Estimated Deal Value:</span>
                  <strong className="font-mono text-amber-400 text-sm">
                    {quickViewLead.currency}{quickViewLead.estimatedValue.toLocaleString()}
                  </strong>
                </div>
                <div className="flex justify-between p-2.5 rounded-lg bg-secondary/30 border border-border/60">
                  <span className="text-muted-foreground">Assigned Sales Rep:</span>
                  <strong className="text-foreground">{quickViewLead.assignedSalespersonName}</strong>
                </div>
              </div>

              {/* Notes */}
              {quickViewLead.notes && (
                <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                    Notes &amp; Directives:
                  </span>
                  <p className="text-foreground leading-relaxed">{quickViewLead.notes}</p>
                </div>
              )}

              {/* Quick Jump Action */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setQuickViewLead(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>

                <Link
                  href={`/admin/crm/leads/${quickViewLead.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
                >
                  <span>Open Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
