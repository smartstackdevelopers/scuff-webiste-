"use client";

import * as React from "react";
import { FollowUpItem, FollowUpPriority, FollowUpType } from "../types/crm";
import { useCrm } from "../hooks/use-crm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FollowUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: FollowUpItem | null;
}

export function FollowUpModal({ open, onOpenChange, initialData }: FollowUpModalProps) {
  const { salespersons, leads, addFollowUp, updateFollowUp } = useCrm();

  const [leadId, setLeadId] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [clientPhone, setClientPhone] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");
  const [vehicleSummary, setVehicleSummary] = React.useState("");
  const [salespersonId, setSalespersonId] = React.useState("");
  const [scheduledDate, setScheduledDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [scheduledTime, setScheduledTime] = React.useState("10:00");
  const [type, setType] = React.useState<FollowUpType>("phone");
  const [priority, setPriority] = React.useState<FollowUpPriority>("medium");
  const [description, setDescription] = React.useState("");
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (initialData) {
      setLeadId(initialData.leadId || "");
      setClientName(initialData.customerName || initialData.clientName || "");
      setClientPhone(initialData.customerPhone || initialData.clientPhone || "");
      setClientEmail(initialData.customerEmail || initialData.clientEmail || "");
      setVehicleSummary(initialData.vehicleSummary || "");
      setSalespersonId(initialData.assignedSalespersonId || initialData.salespersonId || "");
      setScheduledDate(initialData.followUpDate || initialData.scheduledDate || new Date().toISOString().split("T")[0]);
      setScheduledTime(initialData.followUpTime || initialData.scheduledTime || "10:00");
      setType(initialData.type);
      setPriority(initialData.priority);
      setDescription(initialData.description || initialData.notes || "");
      setNotes(initialData.notes || "");
    } else {
      setLeadId("");
      setClientName("");
      setClientPhone("");
      setClientEmail("");
      setVehicleSummary("");
      setSalespersonId(salespersons[0]?.id || "");
      setScheduledDate(new Date().toISOString().split("T")[0]);
      setScheduledTime("10:00");
      setType("phone");
      setPriority("medium");
      setDescription("");
      setNotes("");
    }
  }, [initialData, salespersons, open]);

  // When a lead is selected from dropdown, autofill contact details
  const handleLeadSelect = (id: string) => {
    setLeadId(id);
    const selected = leads.find((l) => l.id === id);
    if (selected) {
      setClientName(selected.customerName);
      setClientPhone(selected.phone);
      setClientEmail(selected.email);
      setVehicleSummary(`${selected.vehicleYear} ${selected.vehicleMake} ${selected.vehicleModel}`);
      if (selected.assignedSalespersonId) {
        setSalespersonId(selected.assignedSalespersonId);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedRep = salespersons.find((s) => s.id === salespersonId);
    const repName = assignedRep ? (assignedRep.fullName || assignedRep.name || "Sales Staff") : "Sales Staff";

    if (initialData) {
      updateFollowUp(initialData.id, {
        leadId: leadId || undefined,
        customerName: clientName,
        clientName,
        customerPhone: clientPhone,
        clientPhone,
        customerEmail: clientEmail,
        clientEmail,
        vehicleSummary,
        assignedSalespersonId: salespersonId,
        salespersonId,
        assignedSalespersonName: repName,
        salespersonName: repName,
        followUpDate: scheduledDate,
        scheduledDate,
        followUpTime: scheduledTime,
        scheduledTime,
        type,
        priority,
        description,
        notes: notes || description,
      });
    } else {
      addFollowUp({
        leadId: leadId || undefined,
        customerName: clientName,
        clientName,
        customerPhone: clientPhone,
        clientPhone,
        customerEmail: clientEmail,
        clientEmail,
        vehicleSummary,
        assignedSalespersonId: salespersonId,
        salespersonId,
        assignedSalespersonName: repName,
        salespersonName: repName,
        followUpDate: scheduledDate,
        scheduledDate,
        followUpTime: scheduledTime,
        scheduledTime,
        type,
        priority,
        status: "pending",
        description,
        notes: notes || description,
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Scheduled Follow-Up" : "Schedule Client Follow-Up"}
          </DialogTitle>
          <DialogDescription>
            Record an upcoming touchpoint, consultation call, or workshop inspection.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Quick Select Existing Lead */}
          {!initialData && (
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Link Existing Lead Inquiry (Optional)
              </label>
              <select
                value={leadId}
                onChange={(e) => handleLeadSelect(e.target.value)}
                className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">-- Choose Lead or Enter Manually Below --</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.leadReference} • {l.customerName} ({l.vehicleMake} {l.vehicleModel})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Client Name <span className="text-red-400">*</span>
              </label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Marcus Sterling"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Vehicle Summary <span className="text-red-400">*</span>
              </label>
              <Input
                value={vehicleSummary}
                onChange={(e) => setVehicleSummary(e.target.value)}
                placeholder="e.g. 2024 Porsche 911 GT3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+44 7700 900888"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@luxurycars.co.uk"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Scheduled Date <span className="text-red-400">*</span>
              </label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Scheduled Time <span className="text-red-400">*</span>
              </label>
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Channel
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as FollowUpType)}
                className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="phone">Phone Call</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="meeting">Video Call</option>
                <option value="vehicle_viewing">Studio Inspection</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as FollowUpPriority)}
                className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Assigned Rep
              </label>
              <select
                value={salespersonId}
                onChange={(e) => setSalespersonId(e.target.value)}
                className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {salespersons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName || s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground block mb-1">
              Discussion Topic / Action Goal <span className="text-red-400">*</span>
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Review Paint Protection Film proposal and quote acceptance"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground block mb-1">
              Internal Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special customer preferences, gate access codes, detailing package adjustments..."
              className="w-full min-h-[70px] rounded-lg border border-border/40 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Save Changes" : "Create Follow-Up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
