"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { DetailedService } from "../types";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ServiceBeforeAfterViewerProps {
  service: DetailedService;
}

export function ServiceBeforeAfterViewer({ service }: ServiceBeforeAfterViewerProps) {
  const { beforeAfter } = service;
  const [sliderPosition, setSliderPosition] = React.useState<number>(50);
  const [isInteracting, setIsInteracting] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  return (
    <section className="py-16 md:py-24 bg-surface-secondary border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <Badge variant="electric" dot>
            Real Visual Transformation
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-display">
            Before & After Results
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Drag the slider horizontally to reveal the optical surface difference achieved by our technicians.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto"
        >
          <Card className="overflow-hidden border-white/[0.08] shadow-sm bg-surface-card p-2 sm:p-3">
            {/* Interactive Image Splitter Container */}
            <div
              ref={containerRef}
              onPointerDown={() => setIsInteracting(true)}
              onPointerUp={() => setIsInteracting(false)}
              onPointerMove={handlePointerMove}
              className="relative aspect-[16/9] w-full rounded-xl overflow-hidden cursor-ew-resize select-none touch-none"
            >
              {/* After Image (Background) */}
              <div className="absolute inset-0">
                <Image
                  src={beforeAfter.afterUrl}
                  alt={beforeAfter.afterLabel}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-md bg-electric text-black text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    After: {beforeAfter.afterLabel}
                  </span>
                </div>
              </div>

              {/* Before Image (Clipped Left Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src={beforeAfter.beforeUrl}
                  alt={beforeAfter.beforeLabel}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20 shadow-lg">
                    Before: {beforeAfter.beforeLabel}
                  </span>
                </div>
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,102,255,0.8)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Handle Button */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-electric text-black flex items-center justify-center shadow-xl border-2 border-white transition-transform ${
                    isInteracting ? "scale-110" : ""
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Case Note Footer */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground border-t border-border/50 mt-2">
              <span className="font-medium text-foreground">
                Verified Studio Case Study:
              </span>
              <span>{beforeAfter.caseNote}</span>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
