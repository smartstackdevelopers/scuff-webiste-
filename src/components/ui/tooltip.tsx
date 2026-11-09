"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  delayDuration = 150,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[side];

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-card border-x-transparent border-b-transparent border-t-4 border-x-4",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-card border-x-transparent border-t-transparent border-b-4 border-x-4",
    left: "left-full top-1/2 -translate-y-1/2 border-l-card border-y-transparent border-r-transparent border-l-4 border-y-4",
    right: "right-full top-1/2 -translate-y-1/2 border-r-card border-y-transparent border-l-transparent border-r-4 border-y-4",
  }[side];

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            role="tooltip"
            className={cn(
              "absolute z-50 whitespace-nowrap rounded-lg border border-border/80 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-luxury-dark pointer-events-none select-none",
              positionClasses,
              className
            )}
          >
            {content}
            <div className={cn("absolute w-0 h-0", arrowClasses)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
