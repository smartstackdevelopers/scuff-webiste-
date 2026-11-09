"use client";

import * as React from "react";
import { MapPin, Wrench, ClipboardCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AVAILABILITY_LABELS,
  type DetailedService,
  type ServiceAvailability,
} from "../types";

function resolveAvailability(service: DetailedService): ServiceAvailability {
  return service.availability ?? "assessment";
}

const TONE_STYLES: Record<
  "mobile" | "workshop" | "assessment",
  string
> = {
  mobile:
    "border-electric/40 bg-electric/10 text-electric",
  workshop:
    "border-metallic/40 bg-secondary/80 text-metallic",
  assessment:
    "border-amber-500/40 bg-amber-500/10 text-amber-300",
};

const TONE_ICONS = {
  mobile: Truck,
  workshop: Wrench,
  assessment: ClipboardCheck,
} as const;

interface ServiceAvailabilityBadgeProps {
  service: DetailedService;
  compact?: boolean;
  className?: string;
}

export function ServiceAvailabilityBadge({
  service,
  compact = false,
  className,
}: ServiceAvailabilityBadgeProps) {
  const availability = resolveAvailability(service);
  const meta = AVAILABILITY_LABELS[availability];
  const Icon = TONE_ICONS[meta.tone];

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 font-semibold backdrop-blur-md",
        TONE_STYLES[meta.tone],
        compact ? "text-[10px]" : "text-[11px]",
        className
      )}
      title={service.availabilityNote || meta.label}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{compact ? meta.short : meta.label}</span>
    </Badge>
  );
}

interface ServiceBookingAvailableBadgeProps {
  className?: string;
}

export function ServiceBookingAvailableBadge({
  className,
}: ServiceBookingAvailableBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 text-[10px] font-semibold border-border/70 bg-background/70 text-foreground",
        className
      )}
    >
      <MapPin className="w-3 h-3 text-electric" />
      Booking Available
    </Badge>
  );
}
