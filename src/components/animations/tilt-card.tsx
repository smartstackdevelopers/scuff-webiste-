"use client";

import * as React from "react";
import { useReducedMotion, useIsTouchDevice } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/** Soft hover lift only — 3D tilt was causing overflow/layout breaks on cards. */
export function TiltCard({ children, className }: TiltCardProps) {
  const reduced = useReducedMotion();
  const isTouch = useIsTouchDevice();

  if (reduced || isTouch) {
    return <div className={cn("h-full", className)}>{children}</div>;
  }

  return (
    <div
      className={cn(
        "h-full transition-transform duration-300 ease-out hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
