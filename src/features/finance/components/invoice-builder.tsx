"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/features/admin";
import { useFinance } from "../hooks/use-finance";
import { InvoiceLineItem } from "../types/finance";
import { calculateInvoiceTotals } from "../lib/financial-calculations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, Send } from "lucide-react";

export function InvoiceBuilder() {
  const router = useRouter();
  const { customers, bookings } = useAdmin();
  const { addInvoice } = useFinance();

  // Selection states
  const [selectedCustomerId, setSelectedCustomerId] = React.useState<string>("");
  const [selectedBookingId, setSelectedBookingId] = React.useState<string>("");

  // Customer fields
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("Birmingham, West Midlands, UK");

  // Booking & Vehicle fields
  const [bookingReference, setBookingReference] = React.useState(`YSWB-${Math.floor(1000 + Math.random() * 9000)}`);
  const [vehicleMake, setVehicleMake] = React.useState("Porsche");
  const [vehicleModel, setVehicleModel] = React.useState("911 GT3");
  const [vehicleYear, setVehicleYear] = React.useState("2024");
  const [vehicleRegistration, setVehicleRegistration] = React.useState("YS24 BUF");

  // Dates
  const [issueDate, setIssueDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = React.useState(
    new Date(Date.now() + 86400000 * 14).toISOString().split("T")[0]
  );

  // Line items
  const [items, setItems] = React.useState<InvoiceLineItem[]>([
    {
      id: "item-1",
      description: "Signature Stage 2 Precision Paint Correction & Decontamination",
      category: "Paint Correction",
      quantity: 1,
      unitPrice: 850,
      totalPrice: 850,
    },
    {
      id: "item-2",
      description: "Ceramic Coating 5-Year Graphene Matrix",
      category: "Ceramic",
      quantity: 1,
      unitPrice: 650,
      totalPrice: 650,
    },
  ]);

  // Discounts and Tax
  const [discountType, setDiscountType] = React.useState<"fixed" | "percentage">("fixed");
  const [discountValue, setDiscountValue] = React.useState<number>(0);
  const [taxRate, setTaxRate] = React.useState<number>(20); // 20% UK VAT

  // Terms and Notes
  const [paymentTerms, setPaymentTerms] = React.useState(
    "Net 14 days from date of invoice. Bank transfer payments must quote invoice reference."
  );
  const [notes, setNotes] = React.useState(
    "Thank you for entrusting You Scuff We Buff with your vehicle care."
  );

  // Auto-calculated totals
  const totals = calculateInvoiceTotals(items, discountType, discountValue, taxRate);

  // Handle customer dropdown selection
  const handleCustomerSelect = (id: string) => {
    setSelectedCustomerId(id);
    const cust = customers.find((c) => c.id === id);
    if (cust) {
      setCustomerName(cust.fullName);
      setCustomerEmail(cust.email);
      setCustomerPhone(cust.phone);
      setCustomerAddress(`${cust.address}, ${cust.city}, ${cust.postcode}`);

      // Auto-check if customer has an existing booking
      const custBooking = bookings.find((b) => b.customerEmail.toLowerCase() === cust.email.toLowerCase());
      if (custBooking) {
        setSelectedBookingId(custBooking.id);
        setBookingReference(custBooking.reference);
        setVehicleMake(custBooking.vehicleMake);
        setVehicleModel(custBooking.vehicleModel);
        setVehicleYear(custBooking.vehicleYear);
        setVehicleRegistration(custBooking.vehicleRegistration);
      }
    }
  };

  // Handle booking dropdown selection
  const handleBookingSelect = (id: string) => {
    setSelectedBookingId(id);
    const b = bookings.find((item) => item.id === id);
    if (b) {
      setBookingReference(b.reference);
      setCustomerName(b.customerName);
      setCustomerEmail(b.customerEmail);
      setCustomerPhone(b.customerPhone);
      setVehicleMake(b.vehicleMake);
      setVehicleModel(b.vehicleModel);
      setVehicleYear(b.vehicleYear);
      setVehicleRegistration(b.vehicleRegistration);

      // Pre-populate service line item from booking
      if (items.length <= 1) {
        setItems([
          {
            id: `item-${Date.now()}`,
            description: `${b.serviceName} (${b.packageName || "Standard"})`,
            category: "Detailing",
            quantity: 1,
            unitPrice: b.amount,
            totalPrice: b.amount,
          },
        ]);
      }
    }
  };

  const handleAddLineItem = (presetDesc?: string, presetPrice?: number) => {
    const newItem: InvoiceLineItem = {
      id: `item-${Date.now()}`,
      description: presetDesc || "Custom Automotive Detailing Treatment",
      quantity: 1,
      unitPrice: presetPrice || 250,
      totalPrice: presetPrice || 250,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveLineItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateLineItem = (
    id: string,
    field: keyof InvoiceLineItem,
    val: string | number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: val };
          if (field === "quantity" || field === "unitPrice") {
            const qty = field === "quantity" ? Math.max(1, Number(val) || 1) : item.quantity;
            const price = field === "unitPrice" ? Math.max(0, Number(val) || 0) : item.unitPrice;
            updated.totalPrice = Math.round(qty * price * 100) / 100;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleSaveInvoice = (initialStatus: "draft" | "sent") => {
    if (!customerName || !customerEmail) {
      alert("Please enter customer name and email address.");
      return;
    }

    const createdId = addInvoice({
      bookingReference,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vehicleRegistration,
      issueDate,
      dueDate,
      items,
      subtotal: totals.subtotal,
      discountType,
      discountValue: Number(discountValue) || 0,
      discountAmount: totals.discountAmount,
      taxableAmount: totals.taxableAmount,
      taxRate: Number(taxRate) || 20,
      taxAmount: totals.taxAmount,
      grandTotal: totals.grandTotal,
      currency: "£",
      paymentTerms,
      notes,
      initialStatus,
      status: initialStatus,
    });

    router.push(`/admin/invoices/${createdId}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/invoices"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Invoices
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Create Commercial Detailing Invoice
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Build an itemized customer invoice with automated UK VAT (20%) calculation and vehicle specifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSaveInvoice("draft")}
          >
            Save as Draft
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => handleSaveInvoice("sent")}
          >
            <Send className="mr-1.5 h-4 w-4" />
            Generate & Send (Demo)
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Link Existing Customer / Booking */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Client or Booking Reference
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Existing Customer Profile
                </label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleCustomerSelect(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">-- Choose Existing Customer or Enter Below --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Existing Workshop Booking
                </label>
                <select
                  value={selectedBookingId}
                  onChange={(e) => handleBookingSelect(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">-- Select Completed or Scheduled Job --</option>
                  {bookings.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.reference} • {b.customerName} ({b.vehicleMake} {b.vehicleModel})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/20">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Customer Name <span className="text-red-400">*</span>
                </label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Lord Alexander Hamilton"
                  className="text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="alexander@hamilton.co.uk"
                  className="text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Telephone
                </label>
                <Input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+44 7700 900881"
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Billing Address
              </label>
              <Input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Street address, city, postcode"
                className="text-xs"
              />
            </div>
          </div>

          {/* Vehicle Specification & Booking Reference */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Vehicle Specification & Job Reference
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-foreground block mb-1">
                  Job Reference
                </label>
                <Input
                  value={bookingReference}
                  onChange={(e) => setBookingReference(e.target.value)}
                  className="text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Make
                </label>
                <Input
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  placeholder="Porsche"
                  className="text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Model
                </label>
                <Input
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="911 GT3 RS"
                  className="text-xs"
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
                  className="text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground block mb-1">
                  Registration
                </label>
                <Input
                  value={vehicleRegistration}
                  onChange={(e) => setVehicleRegistration(e.target.value)}
                  placeholder="YS24 BUF"
                  className="text-xs font-mono uppercase"
                />
              </div>
            </div>
          </div>

          {/* Itemized Services Builder */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Itemized Services & Materials
              </h3>

              {/* Quick service presets */}
              <div className="flex flex-wrap gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleAddLineItem("Front End High-Impact PPF Package", 1450)}
                  className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground"
                >
                  + Front PPF (£1.45k)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddLineItem("Stage 2 Paint Correction (Multi-Stage)", 850)}
                  className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground"
                >
                  + Stage 2 Correction (£850)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddLineItem("Graphene Matrix Ceramic Coating (5-Year)", 650)}
                  className="px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-foreground"
                >
                  + Ceramic 5-Yr (£650)
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center p-3 rounded-lg border border-border/40 bg-background/50"
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
                      className="text-xs h-8 px-1 text-center font-mono"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-2">
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Unit Price (£)
                    </label>
                    <Input
                      type="number"
                      step="25"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleUpdateLineItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)
                      }
                      className="text-xs h-8 font-mono"
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
                      disabled={items.length <= 1}
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
        </div>

        {/* Right Column (1 Col): Financial Breakdown & Terms */}
        <div className="space-y-6">
          {/* Dates & Validity */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Invoice Dates
            </h3>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Issue Date
              </label>
              <Input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="text-xs"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Payment Due Date
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="text-xs"
                required
              />
            </div>
          </div>

          {/* Calculations Summary */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Invoice Summary & Tax
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 text-muted-foreground">
                <span>Net Subtotal (Ex. VAT)</span>
                <span className="font-mono font-medium text-foreground">
                  £{totals.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Discount Controls */}
              <div className="pt-2 border-t border-border/20 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Discount Allowance</span>
                  <div className="flex items-center gap-1">
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as "fixed" | "percentage")}
                      className="text-[10px] rounded border border-border/40 bg-background px-1.5 py-1"
                    >
                      <option value="fixed">Fixed (£)</option>
                      <option value="percentage">Percent (%)</option>
                    </select>
                    <Input
                      type="number"
                      min="0"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                      className="text-xs h-6 w-20 text-right font-mono"
                    />
                  </div>
                </div>

                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-mono text-xs">
                    <span>Discount Deducted:</span>
                    <span>-£{totals.discountAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
              </div>

              {/* VAT Controls */}
              <div className="flex justify-between items-center pt-2 border-t border-border/20">
                <span className="text-muted-foreground">UK Standard VAT</span>
                <div className="flex items-center gap-1 font-mono">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="text-xs h-6 w-14 text-right"
                  />
                  <span>%</span>
                </div>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Calculated VAT Amount:</span>
                <span className="font-mono font-medium text-foreground">
                  £{totals.taxAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center pt-3 border-t-2 border-primary/40 text-sm font-bold text-foreground">
                <span>Grand Total (GBP)</span>
                <span className="font-mono text-lg text-primary">
                  £{totals.grandTotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Notes & Payment Terms */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Payment Terms
              </label>
              <textarea
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full min-h-[60px] rounded-lg border border-border/40 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Customer Care Notice / Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full min-h-[60px] rounded-lg border border-border/40 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
