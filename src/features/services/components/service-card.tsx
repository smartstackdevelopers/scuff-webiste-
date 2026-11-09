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
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
          {service.badge && service.badge.toLowerCase() !== "most popular" ? (
            <Badge variant="outline" className="bg-card/95 backdrop-blur-md text-foreground border-border font-mono text-[10px] sm:text-[11px] shadow-sm truncate max-w-[65%]">
              {service.badge}
            </Badge>
          ) : (
            <div />
          )}
          {service.popular && (
            <Badge variant="electric" className="shadow-md shrink-0 text-[10px] sm:text-xs">
              Most Popular
            </Badge>
          )}
        </div>

        {/* Price & Duration overlay in bottom corners of image */}
        <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 flex items-end justify-between text-white gap-2">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/75 block font-medium">
              {service.priceOnAssessment ? "Pricing" : "Starting from"}
            </span>
            <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white whitespace-nowrap block truncate">
              {service.priceOnAssessment
                ? "Free Quote"
                : `${service.currency}${service.startingPrice}`}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] xs:text-[11px] sm:text-xs text-white/90 bg-black/60 backdrop-blur-md px-2 sm:px-2.5 py-1 rounded-lg border border-white/15 shrink-0">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
            <span className="whitespace-nowrap">{service.duration}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <CardContent className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3.5">
          <div>
            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors break-words leading-snug">
              <Link href={`/services/${service.slug}`}>
                {service.title}
              </Link>
            </h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium leading-relaxed">
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
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <span className="text-xs text-foreground/80 leading-snug break-words">
                    {benefit.title}
                  </span>
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
