"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useIsTouchDevice,
  useReducedMotion,
} from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Soft neon follower ring. Does NOT hide the system cursor,
 * so buttons/links stay usable and layouts stay intact.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotion();
  const [visible, setVisible] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.35 });

  React.useEffect(() => {
    if (isTouch || reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], [data-cursor]"
      );
      setHovering(!!target);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch, reduced, x, y]);

  if (isTouch || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className={cn(
        "fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block mix-blend-difference",
        visible ? "opacity-70" : "opacity-0"
      )}
      style={{ translateX: sx, translateY: sy }}
    >
      <div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 rounded-full border border-electric transition-all duration-200",
          hovering ? "w-10 h-10 bg-electric/20" : "w-3 h-3 bg-electric/80"
        )}
      />
    </motion.div>
  );
}
