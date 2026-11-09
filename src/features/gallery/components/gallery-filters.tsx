"use client";

import * as React from "react";
import { GalleryCategory } from "../types/gallery";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../data/gallery-data";
import { cn } from "@/lib/utils";

interface GalleryFiltersProps {
  activeCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
  filteredCount: number;
}

export function GalleryFilters({
  activeCategory,
  onSelectCategory,
  filteredCount,
}: GalleryFiltersProps) {
  // Count items per category
  const getCategoryCount = (catId: GalleryCategory) => {
    if (catId === "all") return GALLERY_ITEMS.length;
    return GALLERY_ITEMS.filter((item) => item.category === catId).length;
  };

  return (
    <div className="space-y-4">
      {/* Category Pills Bar (Horizontal scroll on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none justify-start md:justify-center">
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition-all duration-200 flex items-center gap-2 border select-none",
                isActive
                  ? "bg-electric text-black border-electric shadow-glow-blue scale-105"
                  : "bg-card border-border/70 text-muted-foreground hover:text-foreground hover:border-electric/50"
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black",
                  isActive
                    ? "bg-black/20 text-black"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Showing Result Count Summary */}
      <div className="text-center text-xs text-muted-foreground">
        Showing <span className="font-bold text-foreground">{filteredCount}</span> of{" "}
        <span className="font-bold text-foreground">{GALLERY_ITEMS.length}</span> portfolio captures
      </div>
    </div>
  );
}
