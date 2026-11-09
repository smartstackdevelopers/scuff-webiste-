"use client";

import * as React from "react";
import Image from "next/image";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  beforeAlt: string;
  beforeLabel?: string;
  afterImage: string;
  afterAlt: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  beforeAlt,
  beforeLabel = "Before",
  afterImage,
  afterAlt,
  afterLabel = "After",
  className,
  aspectRatio = "aspect-[16/10] sm:aspect-[16/9]",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = React.useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(prev - 5, 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(prev + 5, 95));
    } else if (e.key === "Home") {
      setSliderPosition(5);
    } else if (e.key === "End") {
      setSliderPosition(95);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      tabIndex={0}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and After Detailing Comparison Slider"
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full rounded-2xl overflow-hidden border border-border shadow-2xl select-none cursor-ew-resize touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
        aspectRatio,
        className
      )}
    >
      {/* AFTER Image (Full Layer) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 rounded-md bg-electric text-black text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            {afterLabel}
          </span>
        </div>
      </div>

      {/* BEFORE Image (Clipped Left Layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20 shadow-lg">
            {beforeLabel}
          </span>
        </div>
      </div>

      {/* Draggable Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,102,255,0.8)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-electric text-black flex items-center justify-center shadow-xl border-2 border-white transition-transform",
            isDragging ? "scale-115" : "hover:scale-105"
          )}
        >
          <SlidersHorizontal className="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>
  );
}
