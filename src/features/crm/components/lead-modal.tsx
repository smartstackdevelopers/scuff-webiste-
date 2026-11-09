"use client";

import * as React from "react";
import { CRMLead, CustomerType, LeadPriority, LeadSource, LeadStatus } from "../types/crm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";
import { useCrm } from "../hooks/use-crm";

interface LeadModalProps {
  leadToEdit: CRMLead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    data: Omit<
      CRMLead,
      "id" | "leadReference" | "createdDate" | "statusLabel" | "activities" | "notesList"
    >
  ) => void;
}

export function LeadModal({
  leadToEdit,
  open,
  onOpenChange,
  onSave,
}: LeadModalProps) {
  const { salespersons } = useCrm();
  const isEditing = !!leadToEdit;

  const [customerName, setCustomerName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [customerType, setCustomerType] = React.useState<CustomerType>("individual");
  const [priority, setPriority] = React.useState<LeadPriority>("medium");
  const [interestedService, setInterestedService] = React.useState("Ceramic & Graphene Shield");
  const [vehicleMake, setVehicleMake] = React.useState("");
  const [vehicleModel, setVehicleModel] = React.useState("");
  const [vehicleType, setVehicleType] = React.useState("Sports Coupé");
  const [vehicleRegistration, setVehicleRegistration] = React.useState("");
  const [leadSource, setLeadSource] = React.useState<LeadSource>("website");
  const [assignedSalespersonId, setAssignedSalespersonId] = React.useState("sp-001");
  const [status, setStatus] = React.useState<LeadStatus>("new");
  const [estimatedValue, setEstimatedValue] = React.useState(500);
  const [lastContactedDate, setLastContactedDate] = React.useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = React.useState("");
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (leadToEdit) {
      setCustomerName(leadToEdit.customerName);
      setEmail(leadToEdit.email);
      setPhone(leadToEdit.phone);
      setCustomerType(leadToEdit.customerType || "individual");
      setPriority(leadToEdit.priority || "medium");
      setInterestedService(leadToEdit.interestedService);
      setVehicleMake(leadToEdit.vehicleMake);
      setVehicleModel(leadToEdit.vehicleModel);
      setVehicleType(leadToEdit.vehicleType);
      setVehicleRegistration(leadToEdit.vehicleRegistration || "");
      setLeadSource(leadToEdit.leadSource);
      setAssignedSalespersonId(leadToEdit.assignedSalespersonId);
      setStatus(leadToEdit.status);
      setEstimatedValue(leadToEdit.estimatedValue);
      setLastContactedDate(leadToEdit.lastContactedDate || "");
      setNextFollowUpDate(leadToEdit.nextFollowUpDate || "");
      setNotes(leadToEdit.notes || "");
    } else {
      setCustomerName("");
      setEmail("");
      setPhone("");
      setCustomerType("individual");
      setPriority("medium");
      setInterestedService("Ceramic & Graphene Shield");
      setVehicleMake("");
      setVehicleModel("");
      setVehicleType("Sports Coupé");
      setVehicleRegistration("");
      setLeadSource("website");
      setAssignedSalespersonId(salespersons[0]?.id || "sp-001");
      setStatus("new");
      setEstimatedValue(550);
      setLastContactedDate(new Date().toISOString().split("T")[0]);
      setNextFollowUpDate(new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0]);
      setNotes("");
    }
  }, [leadToEdit, open, salespersons]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !email.trim()) return;

    const matchedSalesperson = salespersons.find(
      (sp) => sp.id === assignedSalespersonId
    );

    onSave({
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      customerType,
      priority,
      interestedService,
      vehicleMake: vehicleMake.trim() || "Vehicle Pending",
      vehicleModel: vehicleModel.trim() || "Model TBD",
      vehicleType,
      vehicleRegistration: vehicleRegistration.trim() || undefined,
      leadSource,
      assignedSalespersonId,
      assignedSalespersonName: matchedSalesperson?.fullName || "Unassigned",
      status,
      estimatedValue: Number(estimatedValue) || 0,
      currency: "£",
      lastContactedDate: lastContactedDate || undefined,
      nextFollowUpDate: nextFollowUpDate || undefined,
      notes: notes.trim() || undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="default" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Target className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              {isEditing ? "Update Lead Record" : "Register Sales Opportunity"}
            </span>
          </div>
          <DialogTitle>
            {isEditing ? `Edit ${leadToEdit.leadReference}` : "Create Customer Lead"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-xs">
          {/* Section: Client Details */}
          <div className="space-y-3 p-3.5 rounded-xl bg-secondary/40 border border-border">
            <h4 className="font-bold text-foreground text-xs uppercase tracking-wider text-amber-400">
              Client &amp; Profile Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Full Customer Name *
                </label>
                <Input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sir Charles Montgomery"
                  className="bg-card text-xs"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Email Address *
                </label>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@domain.co.uk"
                  className="bg-card text-xs"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Telephone / Mobile *
                </label>
                <Input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +44 7700 900601"
                  className="bg-card text-xs"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Customer Type
                </label>
                <select
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value as CustomerType)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500"
                >
                  <option value="individual">Individual Private Owner</option>
                  <option value="collector">Supercar / Classic Collector</option>
                  <option value="vip">VIP / High-Net-Worth Concierge</option>
                  <option value="corporate">Corporate Fleet Account</option>
                  <option value="dealership">Prestige Motor Dealership</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Vehicle & Service Interest */}
          <div className="space-y-3 p-3.5 rounded-xl bg-secondary/40 border border-border">
            <h4 className="font-bold text-foreground text-xs uppercase tracking-wider text-amber-400">
              Vehicle &amp; Detailing Treatment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Vehicle Make &amp; Model *
                </label>
                <div className="flex gap-2">
                  <Input
                    required
                    value={vehicleMake}
                    onChange={(e) => setVehicleMake(e.target.value)}
                    placeholder="Make (e.g. Ferrari)"
                    className="bg-card text-xs"
                  />
                  <Input
                    required
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="Model (e.g. F8)"
                    className="bg-card text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  UK Registration Plate
                </label>
                <Input
                  value={vehicleRegistration}
                  onChange={(e) => setVehicleRegistration(e.target.value.toUpperCase())}
                  placeholder="e.g. RH22 FER"
                  className="bg-card font-mono uppercase text-xs"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Interested Detailing Package
                </label>
                <select
                  value={interestedService}
                  onChange={(e) => setInterestedService(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500"
                >
                  <option value="Ceramic & Graphene Shield">5-Year Graphene Ceramic Shield</option>
                  <option value="Multi-Stage Paint Correction">Multi-Stage Paint Correction</option>
                  <option value="Signature Studio Detail">Signature Executive Detail</option>
                  <option value="SMART Scuff & Scratch Repair">SMART Scuff & Scratch Repair</option>
                  <option value="Interior Deep Extraction & Leather Care">Interior Deep Extraction & Leather Care</option>
                  <option value="Exterior Safe Wash & Seal">Exterior Safe Wash & Hydrophobic Seal</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Body Style / Vehicle Category
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500"
                >
                  <option value="Supercar">Supercar / Hypercar</option>
                  <option value="Sports Coupé">Sports Coupé</option>
                  <option value="Grand Tourer">Grand Tourer</option>
                  <option value="Performance SUV">Performance SUV</option>
                  <option value="Luxury Saloon">Luxury Saloon</option>
                  <option value="Vintage / Classic">Vintage / Historic</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Deal Logistics, Attribution & Priority */}
          <div className="space-y-3 p-3.5 rounded-xl bg-secondary/40 border border-border">
            <h4 className="font-bold text-foreground text-xs uppercase tracking-wider text-amber-400">
              Pipeline Parameters &amp; Assignment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Pipeline Stage
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as LeadStatus)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500"
                >
                  <option value="new">New Inquiry</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="converted">Converted Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Deal Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as LeadPriority)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500"
                >
                  <option value="urgent">Urgent Priority</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Estimated Deal Value (£)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="10"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(Number(e.target.value))}
                  className="bg-card font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Acquisition Channel / Source
                </label>
                <select
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value as LeadSource)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500"
                >
                  <option value="website">Website Online Calculator</option>
                  <option value="google">Google Organic / Search</option>
                  <option value="instagram">Instagram Showcase</option>
                  <option value="whatsapp">WhatsApp Direct Inbound</option>
                  <option value="phone_call">Telephone Call</option>
                  <option value="referral">Private Client Referral</option>
                  <option value="walk_in">Direct Inbound / Local Referral</option>
                  <option value="facebook">Facebook Ads</option>
                  <option value="other">Other Channel</option>
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Assigned Sales Representative
                </label>
                <select
                  value={assignedSalespersonId}
                  onChange={(e) => setAssignedSalespersonId(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500"
                >
                  {salespersons.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.fullName} ({sp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-semibold mb-1">
                  Next Follow-Up Date
                </label>
                <Input
                  type="date"
                  value={nextFollowUpDate}
                  onChange={(e) => setNextFollowUpDate(e.target.value)}
                  className="bg-card text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section: Notes */}
          <div>
            <label className="block text-muted-foreground font-semibold mb-1">
              Internal Directives &amp; Vehicle Observations
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record special paint directives, timeline sensitivity, budget constraints, or VIP preferences..."
              className="w-full bg-secondary/40 border border-border rounded-xl p-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 resize-none text-xs"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
            >
              {isEditing ? "Save Changes" : "Create Opportunity"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
