"use client";

import * as React from "react";
import { Quotation, QuotationLineItem } from "../types/crm";
import { useCrm } from "../hooks/use-crm";
import { calculateQuotationTotals } from "../lib/crm-calculations";
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
import { Plus, Trash2, FileText } from "lucide-react";

interface QuotationBuilderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Quotation | null;
  prefillLeadId?: string | null;
  prefillEmail?: string | null;
}

export function QuotationBuilderModal({
  open,
  onOpenChange,
  initialData,
  prefillLeadId,
  prefillEmail,
}: QuotationBuilderModalProps) {
  const { salespersons, leads, addQuotation, updateQuotation } = useCrm();

  const [leadId, setLeadId] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");
  const [clientPhone, setClientPhone] = React.useState("");
  const [clientAddress, setClientAddress] = React.useState("");

  const [vehicleMake, setVehicleMake] = React.useState("");
  const [vehicleModel, setVehicleModel] = React.useState("");
  const [vehicleYear, setVehicleYear] = React.useState("2024");
  const [vehicleRegistration, setVehicleRegistration] = React.useState("");

  const [salespersonId, setSalespersonId] = React.useState("");
  const [validUntil, setValidUntil] = React.useState(
    new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0]
  );
  const [notes, setNotes] = React.useState(
    "Quotation valid for 14 calendar days from date of issue. Complimentary multi-stage decontamination wash included."
  );

  const [lineItems, setLineItems] = React.useState<QuotationLineItem[]>([
    {
      id: "item-1",
      description: "Full Body Self-Healing Paint Protection Film (PPF)",
      quantity: 1,
      unitPrice: 2800,
      totalPrice: 2800,
    },
  ]);

  const [discountAmount, setDiscountAmount] = React.useState(0);

  // Sync state on open/edit
  React.useEffect(() => {
    if (initialData) {
      setLeadId(initialData.leadId || "");
      setClientName(initialData.customerName || initialData.clientName || "");
      setClientEmail(initialData.customerEmail || initialData.clientEmail || "");
      setClientPhone(initialData.customerPhone || initialData.clientPhone || "");
      setClientAddress(initialData.customerAddress || initialData.clientAddress || "");
      setVehicleMake(initialData.vehicleMake || "");
      setVehicleModel(initialData.vehicleModel || "");
      setVehicleYear(initialData.vehicleYear || "2024");
      setVehicleRegistration(initialData.vehicleRegistration || "");
      setSalespersonId(initialData.salespersonId || "");
      setValidUntil(initialData.validUntil || "");
      setNotes(initialData.terms || initialData.notes || "");
      setLineItems(initialData.items || initialData.lineItems || []);
      setDiscountAmount(initialData.discountAmount || 0);
    } else {
      // Prefill from lead if requested
      if (prefillLeadId) {
        const lead = leads.find((l) => l.id === prefillLeadId || l.leadReference === prefillLeadId);
        if (lead) {
          setLeadId(lead.id);
          setClientName(lead.customerName);
          setClientEmail(lead.email);
          setClientPhone(lead.phone);
          setVehicleMake(lead.vehicleMake);
          setVehicleModel(lead.vehicleModel);
          setVehicleYear(lead.vehicleYear || "2024");
          setVehicleRegistration(lead.vehicleRegistration || "");
          if (lead.assignedSalespersonId) {
            setSalespersonId(lead.assignedSalespersonId);
          }
        }
      } else if (prefillEmail) {
        setClientEmail(prefillEmail);
      } else {
        setLeadId("");
        setClientName("");
        setClientEmail("");
        setClientPhone("");
        setClientAddress("London, United Kingdom");
        setVehicleMake("Porsche");
        setVehicleModel("911 GT3");
        setVehicleYear("2024");
        setVehicleRegistration("");
        setSalespersonId(salespersons[0]?.id || "");
        setValidUntil(new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0]);
        setNotes("Quotation valid for 14 calendar days from date of issue.");
        setLineItems([
          {
            id: "item-1",
            description: "Full Body Self-Healing Paint Protection Film (PPF)",
            quantity: 1,
            unitPrice: 2800,
            totalPrice: 2800,
          },
        ]);
        setDiscountAmount(0);
      }
    }
  }, [initialData, prefillLeadId, prefillEmail, open, leads, salespersons]);

  // Compute live totals
  const totals = calculateQuotationTotals(lineItems, discountAmount, 0.2);

  const handleLeadSelect = (id: string) => {
    setLeadId(id);
    const selected = leads.find((l) => l.id === id);
    if (selected) {
      setClientName(selected.customerName);
      setClientEmail(selected.email);
      setClientPhone(selected.phone);
      setVehicleMake(selected.vehicleMake);
      setVehicleModel(selected.vehicleModel);
      setVehicleYear(selected.vehicleYear || "2024");
      setVehicleRegistration(selected.vehicleRegistration || "");
      if (selected.assignedSalespersonId) {
        setSalespersonId(selected.assignedSalespersonId);
      }
    }
  };

  const handleAddLineItem = (presetDesc?: string, presetPrice?: number) => {
    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      description: presetDesc || "Custom Automotive Detailing Service",
      quantity: 1,
      unitPrice: presetPrice || 450,
      totalPrice: (presetPrice || 450) * 1,
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length <= 1) return;
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const handleUpdateLineItem = (
    id: string,
    field: keyof QuotationLineItem,
    val: string | number
  ) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: val };
          if (field === "quantity" || field === "unitPrice") {
            const qty = field === "quantity" ? Number(val) : item.quantity;
            const price = field === "unitPrice" ? Number(val) : item.unitPrice;
            updated.totalPrice = Math.max(0, qty * price);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assignedRep = salespersons.find((s) => s.id === salespersonId);
    const repName = assignedRep ? (assignedRep.fullName || assignedRep.name || "Sales Team") : "Sales Team";

    if (initialData) {
      updateQuotation(initialData.id, {
        customerName: clientName,
        clientName,
        customerEmail: clientEmail,
        clientEmail,
        customerPhone: clientPhone,
        clientPhone,
        customerAddress: clientAddress,
        clientAddress,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleRegistration,
        salespersonId,
        salespersonName: repName,
        validUntil,
        notes,
        terms: notes,
        items: lineItems,
        lineItems,
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        taxAmount: totals.taxAmount,
        vatAmount: totals.taxAmount,
        grandTotal: totals.grandTotal,
        totalAmount: totals.grandTotal,
      });
    } else {
      addQuotation({
        leadId: leadId || undefined,
        customerName: clientName,
        clientName,
        customerEmail: clientEmail,
        clientEmail,
        customerPhone: clientPhone,
        clientPhone,
        customerAddress: clientAddress,
        clientAddress,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        vehicleRegistration,
        salespersonId: salespersonId || salespersons[0]?.id || "sp-1",
        salespersonName: repName,
        status: "draft",
        validUntil,
        items: lineItems,
        lineItems,
        subtotal: totals.subtotal,
        discountAmount: totals.discountAmount,
        taxRate: 0.2,
        taxAmount: totals.taxAmount,
        vatRate: 0.2,
        vatAmount: totals.taxAmount,
        grandTotal: totals.grandTotal,
        totalAmount: totals.grandTotal,
        terms: notes,
        notes,
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {initialData ? "Edit Bespoke Quotation" : "Generate Bespoke Quotation"}
          </DialogTitle>
          <DialogDescription>
            Build an itemized quotation with automated 20% UK VAT calculation and client vehicle specifications.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          {/* Client Selection / Linking */}
          {!initialData && (
            <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
              <label className="text-xs font-semibold text-foreground block mb-1">
                Link Existing Inquiry (Auto-populates Details)
              </label>
              <select
                value={leadId}
                onChange={(e) => handleLeadSelect(e.target.value)}
                className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">-- Choose Lead Inquiry or Fill Details Below --</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.leadReference} • {l.customerName} ({l.vehicleYear} {l.vehicleMake} {l.vehicleModel})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Client & Advisor Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Client & Advisor Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Client Name <span className="text-red-400">*</span>
                </label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Lord Harrington"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="client@luxury.co.uk"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Telephone <span className="text-red-400">*</span>
                </label>
                <Input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+44 7700 900555"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Assigned Sales Advisor
                </label>
                <select
                  value={salespersonId}
                  onChange={(e) => setSalespersonId(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {salespersons.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName || s.name} ({s.department || s.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Quotation Valid Until
                </label>
                <Input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Specifications */}
          <div className="space-y-3 pt-2 border-t border-border/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Vehicle Specification
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Make <span className="text-red-400">*</span>
                </label>
                <Input
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  placeholder="e.g. Porsche"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Model <span className="text-red-400">*</span>
                </label>
                <Input
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. 911 GT3 RS"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Year
                </label>
                <Input
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Registration
                </label>
                <Input
                  value={vehicleRegistration}
                  onChange={(e) => setVehicleRegistration(e.target.value)}
                  placeholder="e.g. GT24 BUF"
                />
              </div>
            </div>
          </div>

          {/* Itemized Services Builder */}
          <div className="space-y-3 pt-2 border-t border-border/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Itemized Services & Pricing
              </h4>
              {/* Quick service presets */}
              <div className="flex flex-wrap gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleAddLineItem("Self-Healing Front PPF Package", 1450)}
                  className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground"
                >
                  + Front PPF (£1.45k)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddLineItem("Stage 2 Paint Correction & Ceramic 5-Year", 1100)}
                  className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground"
                >
                  + Stage 2 + Ceramic (£1.1k)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddLineItem("Wheel Off Ceramic Coating & Calipers", 380)}
                  className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground"
                >
                  + Wheel Coating (£380)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center p-2.5 rounded-lg border border-border/40 bg-card"
                >
                  <div className="col-span-6 sm:col-span-7">
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Service Description
                    </label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        handleUpdateLineItem(item.id, "description", e.target.value)
                      }
                      className="text-xs h-8"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Qty
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateLineItem(item.id, "quantity", parseInt(e.target.value) || 1)
                      }
                      className="text-xs h-8 px-1 text-center"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Unit (£)
                    </label>
                    <Input
                      type="number"
                      step="50"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleUpdateLineItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)
                      }
                      className="text-xs h-8"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2 flex items-center justify-between pt-3">
                    <span className="font-mono font-bold text-xs text-foreground">
                      £{item.totalPrice.toLocaleString()}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-400 hover:text-red-300"
                      disabled={lineItems.length <= 1}
                      onClick={() => handleRemoveLineItem(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleAddLineItem()}
              className="text-xs"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Custom Line Item
            </Button>
          </div>

          {/* Financial Calculation Breakdown */}
          <div className="rounded-xl border border-border/40 bg-muted/20 p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Net Subtotal (Ex. VAT)</span>
              <span className="font-mono font-medium text-foreground">
                £{totals.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Discount / Promotional Allowance (£)</span>
              <div className="w-32">
                <Input
                  type="number"
                  step="25"
                  min="0"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                  className="text-xs h-7 text-right font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">UK Standard VAT (20.0%)</span>
              <span className="font-mono font-medium text-foreground">
                £{totals.vatAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t border-border/40">
              <span className="font-bold text-foreground">Total Proposal Amount (Inc. VAT)</span>
              <span className="font-mono font-bold text-lg text-emerald-400">
                £{totals.totalAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Client Terms & Notes */}
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">
              Quotation Terms & Concierge Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[60px] rounded-lg border border-border/40 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Save Quotation" : "Generate Proposal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
