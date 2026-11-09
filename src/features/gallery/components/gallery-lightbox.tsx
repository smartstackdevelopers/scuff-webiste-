"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Car, Wrench, Calendar, Tag } from "lucide-react";
import { GalleryItem } from "../types/gallery";
import { Badge } from "@/components/ui/badge";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  // Background scroll locking
  React.useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen || currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentItem || currentIndex === null) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl select-none"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
          {/* Item Counter */}
          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20">
            {currentIndex + 1} / {items.length}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20 hover:scale-105 active:scale-95"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-electric text-white hover:text-black flex items-center justify-center transition-all border border-white/20 shadow-2xl z-20 active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-electric text-white hover:text-black flex items-center justify-center transition-all border border-white/20 shadow-2xl z-20 active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Lightbox Content Card */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-card border border-border/80 shadow-2xl"
        >
          {/* Main Large Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[65vh] bg-black">
            <Image
              src={currentItem.imageUrl}
              alt={currentItem.alt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain object-center"
            />
          </div>

          {/* Caption & Metadata Footer */}
          <div className="p-5 sm:p-6 bg-card border-t border-border/50 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="electric" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {currentItem.categoryLabel}
                </Badge>
                {currentItem.vehicleType && (
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-electric" />
                    {currentItem.vehicleType}
                  </span>
                )}
              </div>

              {currentItem.completionDate && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentItem.completionDate}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground">
                {currentItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                {currentItem.description}
              </p>
            </div>

            {currentItem.serviceName && (
              <div className="pt-2 border-t border-border/40 text-xs text-electric font-medium flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Service: {currentItem.serviceName}</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
