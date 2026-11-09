"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 0.28, radius = 80 } = options;
  const ref = React.useRef<T | null>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        el.style.transform = "translate(0px, 0px)";
      }
    };

    const handleLeave = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.style.transform = "";
    };
  }, [reduced, radius, strength]);

  return ref;
}
