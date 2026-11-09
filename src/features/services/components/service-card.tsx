"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Check, Calendar } from "lucide-react";
import { DetailedService } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ServiceAvailabilityBadge,
  ServiceBookingAvailableBadge,
} from "./service-availability-badge";

interface ServiceCardProps {
  service: DetailedService;
  priority?: boolean;
}

export function ServiceCard({ service, priority = false }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full bg-surface-card border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-card-hover overflow-hidden group">
      {/* Service Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-tertiary">
        <Image
          src={service.heroImage.url}
          alt={service.heroImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-black/25 to-transparent" />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
          <Badge variant="outline" className="bg-card/90 backdrop-blur-md text-foreground border-border font-mono text-[11px] shadow-sm">
            {service.badge}
          </Badge>
          {service.popular && (
            <Badge variant="electric" className="shadow-md">
              Most Popular
            </Badge>
          )}
        </div>

        {/* Price & Duration overlay in bottom corners of image */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white gap-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-white/70 block">
              {service.priceOnAssessment ? "Pricing" : "Starting from"}
            </span>
            <span className="text-2xl font-black tracking-tight text-white">
              {service.priceOnAssessment
                ? "Quote on assessment"
                : `${service.currency}${service.startingPrice}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/80 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10 shrink-0">
            <Clock className="w-3.5 h-3.5 text-electric" />
            <span>{service.duration}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-electric transition-colors">
              <Link href={`/services/${service.slug}`}>
                {service.title}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {service.tagline}
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <ServiceAvailabilityBadge service={service} compact />
            <ServiceBookingAvailableBadge />
          </div>

          {/* Key Inclusions Preview */}
          <div className="space-y-2 pt-2 border-t border-border/50">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">
              Package Highlights:
            </span>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-electric mt-0.5 shrink-0" />
                  <span className="line-clamp-1">{benefit.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row items-center gap-2.5">
          <Link
            href={`/services/${service.slug}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-full sm:w-1/2 text-xs font-semibold hover:border-electric hover:text-electric"
            )}
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          <Link
            href={`/booking?service=${service.slug}`}
            className={cn(
              buttonVariants({ variant: "glow", size: "sm" }),
              "w-full sm:w-1/2 text-xs font-semibold"
            )}
          >
            <Calendar className="w-3.5 h-3.5 mr-1" />
            Book Service
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
