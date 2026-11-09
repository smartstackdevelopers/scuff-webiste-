"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BRAND_ASSETS } from "@/constants/theme";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MascotProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  float?: boolean;
  parallax?: boolean;
  glow?: boolean;
}

const sizeClasses = {
  sm: "w-28 h-36",
  md: "w-40 h-52",
  lg: "w-56 h-72",
  xl: "w-72 h-96",
};

export function BrandMascot({
  className,
  size = "lg",
  float = true,
  parallax = true,
  glow = true,
}: MascotProps) {
  const reduced = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 18 });
  const springY = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(springY, [-40, 40], [6, -6]);
  const rotateY = useTransform(springX, [-40, 40], [-6, 6]);

  React.useEffect(() => {
    if (!parallax || reduced) return;

    const handleMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      mx.set(Math.max(-40, Math.min(40, dx * 0.08)));
      my.set(Math.max(-40, Math.min(40, dy * 0.08)));
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [parallax, reduced, mx, my]);

  return (
    <motion.div
      ref={containerRef}
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={
        parallax && !reduced
          ? { rotateX, rotateY, transformPerspective: 900 }
          : undefined
      }
      className={cn("relative select-none pointer-events-none", className)}
    >
      {glow && (
        <div
          aria-hidden
          className="absolute inset-4 rounded-full bg-electric/25 blur-[50px] -z-10"
        />
      )}

      <motion.div
        animate={
          float && !reduced
            ? { y: [0, -10, 0] }
            : undefined
        }
        transition={
          float && !reduced
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        className={cn(
          "relative overflow-hidden rounded-[1.75rem]",
          sizeClasses[size]
        )}
      >
        <Image
          src={BRAND_ASSETS.mascot}
          alt="You Scuff We Buff mechanic mascot"
          fill
          sizes="(max-width: 768px) 40vw, 280px"
          className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(72,200,77,0.25)]"
        />
      </motion.div>
    </motion.div>
  );
}
