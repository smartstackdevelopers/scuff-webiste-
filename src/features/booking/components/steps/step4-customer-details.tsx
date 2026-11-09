"use client";

import * as React from "react";
import {
  User,
  Mail,
  Phone,
  Car,
  FileText,
  CheckCircle2,
  MapPin,
  Home,
  Building2,
  Wrench,
  AlertCircle,
} from "lucide-react";
import {
  CustomerDetails,
  VehicleCategory,
  PreferredContactMethod,
  ServiceLocation,
} from "../../types/booking";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { VEHICLE_CATEGORIES } from "@/features/pricing/data/packages";
import { cn } from "@/lib/utils";

interface Step4CustomerDetailsProps {
  customer: CustomerDetails;
  onUpdateField: <K extends keyof CustomerDetails>(field: K, value: CustomerDetails[K]) => void;
  errors: Record<string, string>;
}

const LOCATION_OPTIONS: {
  id: ServiceLocation;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "home",
    label: "At My Home",
    description: "Mobile team visits your driveway / home address",
    icon: Home,
  },
  {
    id: "workplace",
    label: "At My Office / Workplace",
    description: "Suitable repairs while parked at work",
    icon: Building2,
  },
  {
    id: "other",
    label: "Other Suitable Location",
    description: "Another agreed location with safe access",
    icon: MapPin,
  },
  {
    id: "workshop",
    label: "Workshop Appointment",
    description: "If workshop attendance is required / preferred",
    icon: Wrench,
  },
];

export function Step4CustomerDetails({
  customer,
  onUpdateField,
  errors,
}: Step4CustomerDetailsProps) {
  const needsMobileAddress = customer.serviceLocation !== "workshop";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
          Step 4: Customer, Vehicle & Location
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Tell us how to reach you, your vehicle details, and where you prefer the appointment.
          Requests are subject to availability and location suitability.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="p-5 sm:p-6 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-3">
            <User className="w-4 h-4 text-electric" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Full Name"
                placeholder="e.g. Alexander Hamilton"
                value={customer.fullName}
                onChange={(e) => onUpdateField("fullName", e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                required
                errorMessage={errors.fullName}
              />
            </div>

            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="alexander@example.co.uk"
                value={customer.email}
                onChange={(e) => onUpdateField("email", e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                required
                errorMessage={errors.email}
              />
            </div>

            <div>
              <Input
                label="Contact Number"
                type="tel"
                placeholder="+44 7911 123456"
                value={customer.phone}
                onChange={(e) => onUpdateField("phone", e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
                required
                errorMessage={errors.phone}
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Preferred Contact Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "phone", label: "Phone Call" },
                  { id: "whatsapp", label: "WhatsApp" },
                  { id: "email", label: "Email" },
                ] as { id: PreferredContactMethod; label: string }[]
              ).map((method) => {
                const isSelected = customer.preferredContact === method.id;

                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => onUpdateField("preferredContact", method.id)}
                    className={cn(
                      "py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center select-none",
                      isSelected
                        ? "bg-electric text-black border-electric shadow-sm"
                        : "bg-secondary/60 border-border/70 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {method.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-3">
            <Car className="w-4 h-4 text-electric" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Vehicle Specifications
            </h3>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Vehicle Category <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VEHICLE_CATEGORIES.map((cat) => {
                const isSelected = customer.vehicleCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onUpdateField("vehicleCategory", cat.id as VehicleCategory)}
                    className={cn(
                      "p-2.5 rounded-xl text-center border transition-all text-xs font-bold flex flex-col items-center justify-center gap-1 select-none",
                      isSelected
                        ? "bg-electric text-black border-electric shadow-glow-blue scale-102"
                        : "bg-secondary/60 border-border/70 text-muted-foreground hover:text-foreground hover:border-electric/40"
                    )}
                  >
                    <span>{cat.label.split("/")[0].trim()}</span>
                    <span className="text-[10px] opacity-75 font-normal">
                      {cat.multiplier === 1 ? "1.0x (Standard)" : `${cat.multiplier}x Rate`}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.vehicleCategory && (
              <p className="text-xs text-destructive font-medium">{errors.vehicleCategory}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <Input
                label="Make"
                placeholder="e.g. BMW, Porsche"
                value={customer.vehicleMake}
                onChange={(e) => onUpdateField("vehicleMake", e.target.value)}
                required
                errorMessage={errors.vehicleMake}
              />
            </div>

            <div>
              <Input
                label="Model"
                placeholder="e.g. M3, 911 GT3"
                value={customer.vehicleModel}
                onChange={(e) => onUpdateField("vehicleModel", e.target.value)}
                required
                errorMessage={errors.vehicleModel}
              />
            </div>

            <div>
              <Input
                label="Year"
                placeholder="e.g. 2024"
                value={customer.vehicleYear}
                onChange={(e) => onUpdateField("vehicleYear", e.target.value)}
                required
                errorMessage={errors.vehicleYear}
              />
            </div>
          </div>

          <div>
            <Input
              label="Vehicle Registration (Optional)"
              placeholder="e.g. LK24 WMB"
              value={customer.vehicleReg || ""}
              onChange={(e) => onUpdateField("vehicleReg", e.target.value.toUpperCase())}
              helperText="Helps our mobile unit locate your vehicle on arrival"
            />
          </div>
        </Card>

        <Card className="p-5 sm:p-6 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-3">
            <MapPin className="w-4 h-4 text-electric" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Preferred Service Location
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {LOCATION_OPTIONS.map((option) => {
              const isSelected = customer.serviceLocation === option.id;
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onUpdateField("serviceLocation", option.id)}
                  className={cn(
                    "p-3.5 rounded-xl text-left border transition-all select-none space-y-1",
                    isSelected
                      ? "bg-electric/15 border-electric text-foreground shadow-sm"
                      : "bg-secondary/60 border-border/70 text-muted-foreground hover:text-foreground hover:border-electric/40"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-4 h-4", isSelected ? "text-electric" : "")} />
                    <span className="text-xs font-bold uppercase tracking-wide">
                      {option.label}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{option.description}</p>
                </button>
              );
            })}
          </div>
          {errors.serviceLocation && (
            <p className="text-xs text-destructive font-medium">{errors.serviceLocation}</p>
          )}

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>
              Not every repair can be completed at every location. Suitable mobile jobs can be
              attended on-site; some work may need workshop assessment. Your request is not an
              automatic confirmation.
            </span>
          </div>

          {needsMobileAddress && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="sm:col-span-2">
                <Input
                  label="Full Address"
                  placeholder="Street address / building name"
                  value={customer.addressLine1}
                  onChange={(e) => onUpdateField("addressLine1", e.target.value)}
                  leftIcon={<MapPin className="w-4 h-4" />}
                  required
                  errorMessage={errors.addressLine1}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label="Address Line 2 (Optional)"
                  placeholder="Flat, suite, parking notes"
                  value={customer.addressLine2 || ""}
                  onChange={(e) => onUpdateField("addressLine2", e.target.value)}
                />
              </div>
              <div>
                <Input
                  label="Town / City"
                  placeholder="e.g. Manchester"
                  value={customer.city}
                  onChange={(e) => onUpdateField("city", e.target.value)}
                  required
                  errorMessage={errors.city}
                />
              </div>
              <div>
                <Input
                  label="Postcode"
                  placeholder="e.g. M1 1AE"
                  value={customer.postcode}
                  onChange={(e) => onUpdateField("postcode", e.target.value.toUpperCase())}
                  required
                  errorMessage={errors.postcode}
                />
              </div>
            </div>
          )}
        </Card>

        <Card className="p-5 sm:p-6 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center gap-2 border-b border-border/50 pb-3">
            <FileText className="w-4 h-4 text-electric" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Damage Details & Instructions
            </h3>
          </div>

          <Textarea
            label="Damage Description (Optional)"
            placeholder="Describe the scuff, scratch, kerb damage or cosmetic issue..."
            value={customer.damageDescription || ""}
            onChange={(e) => onUpdateField("damageDescription", e.target.value)}
            rows={3}
            maxLength={800}
            showCount
            errorMessage={errors.damageDescription}
          />

          <Textarea
            label="Additional Instructions (Optional)"
            placeholder="e.g. Gate code, parking permit, preferred arrival notes..."
            value={customer.specialInstructions || ""}
            onChange={(e) => onUpdateField("specialInstructions", e.target.value)}
            rows={3}
            maxLength={500}
            showCount
          />

          <Input
            label="Damage Photos (Optional)"
            placeholder="e.g. Happy to share photos by WhatsApp / email"
            value={customer.photoNotes || ""}
            onChange={(e) => onUpdateField("photoNotes", e.target.value)}
            helperText="Photos help us assess mobile suitability before attending. Upload is not required for this request form."
            errorMessage={errors.photoNotes}
          />

          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>We never share your personal contact or vehicle information.</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
