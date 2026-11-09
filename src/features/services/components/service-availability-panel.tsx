"use client";

import * as React from "react";
import { AlertTriangle, CheckCircle2, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import type { DetailedService } from "../types";
import { AVAILABILITY_LABELS } from "../types";
import { ServiceAvailabilityBadge } from "./service-availability-badge";

interface ServiceAvailabilityPanelProps {
  service: DetailedService;
}

export function ServiceAvailabilityPanel({ service }: ServiceAvailabilityPanelProps) {
  const availability = service.availability ?? "assessment";
  const meta = AVAILABILITY_LABELS[availability];
  const problems = service.problemsAddressed ?? [];

  return (
    <section className="py-14 md:py-20 border-t border-border/40 bg-surface-secondary">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <Card className="p-6 sm:p-8 bg-surface-card border-white/[0.08] space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <ServiceAvailabilityBadge service={service} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-display">
                Mobile & Workshop Suitability
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.availabilityNote ||
                  `${meta.label}. Suitability depends on damage type, access and site conditions.`}
              </p>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  Home, office and workplace appointments are available for suitable mobile jobs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  Not every repair can be completed at every location. Some jobs need specialist equipment or workshop conditions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>
                  Booking requests are subject to availability and location suitability before confirmation.
                </span>
              </li>
            </ul>
          </Card>

          {problems.length > 0 && (
            <Card className="p-6 sm:p-8 bg-surface-card border-white/[0.08] space-y-5">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
                Common Problems Addressed
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {problems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-electric mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
