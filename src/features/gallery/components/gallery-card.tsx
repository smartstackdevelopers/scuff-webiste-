"use client";

import * as React from "react";
import Image from "next/image";
import { ZoomIn, Car, Wrench, Calendar } from "lucide-react";
import { GalleryItem } from "../types/gallery";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GalleryCardProps {
  item: GalleryItem;
  onOpenLightbox: (item: GalleryItem) => void;
  priority?: boolean;
}

export function GalleryCard({ item, onOpenLightbox, priority = false }: GalleryCardProps) {
  return (
    <Card
      onClick={() => onOpenLightbox(item)}
      className="cursor-pointer group relative overflow-hidden rounded-2xl bg-surface-card border border-white/[0.08] hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-card-hover flex flex-col h-full"
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={item.imageUrl}
          alt={item.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <Badge
            variant="outline"
            className="bg-background/80 backdrop-blur-md text-foreground border-border/70 text-[10px] font-mono uppercase"
          >
            {item.categoryLabel}
          </Badge>

          {item.featured && (
            <Badge variant="electric" className="text-[10px] shadow-md">
              Featured
            </Badge>
          )}
        </div>

        {/* Center Hover Zoom Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-electric text-black flex items-center justify-center shadow-glow-blue scale-75 group-hover:scale-100 transition-transform duration-300">
            <ZoomIn className="w-6 h-6" />
          </div>
        </div>

        {/* Bottom Content within Image */}
        <div className="absolute bottom-3 left-4 right-4 z-10 text-white space-y-1">
          {item.vehicleType && (
            <span className="text-[11px] font-semibold text-white/80 flex items-center gap-1.5 uppercase tracking-wider">
              <Car className="w-3.5 h-3.5 text-electric shrink-0" />
              {item.vehicleType}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-electric transition-colors line-clamp-1 leading-snug">
            {item.title}
          </h3>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="p-4 bg-card/90 space-y-2.5 flex-1 flex flex-col justify-between border-t border-border/40">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
          {item.serviceName ? (
            <span className="flex items-center gap-1 line-clamp-1">
              <Wrench className="w-3 h-3 text-electric shrink-0" />
              {item.serviceName}
            </span>
          ) : (
            <span className="capitalize">{item.categoryLabel}</span>
          )}

          {item.completionDate && (
            <span className="flex items-center gap-1 shrink-0 font-medium">
              <Calendar className="w-3 h-3 text-muted-foreground/60" />
              {item.completionDate}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
