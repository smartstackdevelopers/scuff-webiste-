"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, SlidersHorizontal, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { HOME_CONTENT } from "@/features/home/data/home-content";
import { GALLERY_ITEMS } from "@/features/gallery/data/gallery-data";
import { BRAND_ASSETS } from "@/constants/theme";

export function BeforeAfterSection() {
  const { beforeAfter } = HOME_CONTENT;
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const featuredGalleryItems = React.useMemo(
    () => GALLERY_ITEMS.filter((item) => item.featured).slice(0, 4),
    []
  );

  const handleMove = React.useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(prev - 5, 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(prev + 5, 95));
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-surface-primary border-t border-border/40">
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image
          src={BRAND_ASSETS.wheels}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-surface-primary/95" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/5 blur-[120px] pointer-events-none -z-10" />

      <Container>
        <ScrollReveal className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="electric" dot>
              Visual Evidence
            </Badge>
            <Badge variant="neutral" size="sm">
              {beforeAfter.demoBadge}
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            {beforeAfter.heading}
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {beforeAfter.subheading}
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 28, clipPath: "inset(4% 4% 4% 4%)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchStart={(e) => handleMove(e.touches[0].clientX)}
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and After Detailing Comparison Slider"
            onKeyDown={handleKeyDown}
            data-cursor-label="Drag"
            className="relative h-[340px] sm:h-[480px] md:h-[540px] w-full rounded-3xl overflow-hidden border border-electric/25 shadow-luxury-dark select-none cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric neon-glow"
          >
            <div className="absolute inset-0">
              <Image
                src={beforeAfter.afterImage}
                alt="After Paint Correction: High-gloss mirror reflection and ceramic protection"
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-center pointer-events-none"
              />
              <div className="absolute bottom-6 right-6 z-10">
                <span className="px-3.5 py-1.5 rounded-xl bg-electric/90 text-white text-xs font-bold uppercase tracking-wider shadow-glow-sm">
                  {beforeAfter.afterLabel}
                </span>
              </div>
            </div>

            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative h-full w-[100vw] max-w-[896px]">
                <Image
                  src={beforeAfter.beforeImage}
                  alt="Before Detailing: Clearcoat swirl marks and oxidation haze"
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover object-center pointer-events-none"
                />
              </div>
              <div className="absolute bottom-6 left-6 z-10">
                <span className="px-3.5 py-1.5 rounded-xl bg-charcoal-950/90 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  {beforeAfter.beforeLabel}
                </span>
              </div>
            </div>

            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_16px_rgba(72,200,77,0.9)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-electric text-electric shadow-glow-neon flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm space-y-1 metallic-surface">
              <span className="font-bold uppercase tracking-wider text-muted-foreground block">
                {beforeAfter.beforeLabel}
              </span>
              <p className="text-foreground/90">{beforeAfter.beforeDescription}</p>
            </div>
            <div className="p-4 rounded-xl border border-electric/30 bg-card/60 backdrop-blur-sm space-y-1">
              <span className="font-bold uppercase tracking-wider text-electric block">
                {beforeAfter.afterLabel}
              </span>
              <p className="text-foreground/90">{beforeAfter.afterDescription}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-border/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-electric" />
                Featured Portfolio Highlights
              </span>
              <Link
                href="/gallery"
                className="text-electric font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full Gallery ({GALLERY_ITEMS.length} Photos)</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {featuredGalleryItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href="/gallery"
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-border/70 hover:border-electric transition-all shadow-md bg-muted block"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90" />
                    <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] leading-tight">
                      <p className="font-bold truncate text-white">
                        {item.vehicleType || item.title}
                      </p>
                      <p className="text-white/70 text-[9px] truncate">
                        {item.categoryLabel}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/gallery">
              <Button variant="glow" size="lg" className="gap-2 shadow-glow-neon">
                <Sparkles className="w-4 h-4" />
                <span>Explore Full Transformation Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <span className="text-xs text-muted-foreground">
              Tip: Drag the slider horizontally or use keyboard arrow keys.
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
