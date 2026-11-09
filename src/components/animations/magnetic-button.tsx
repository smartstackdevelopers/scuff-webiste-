"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/** Simple hover affordance — no mouse-tracking transforms (those broke layouts). */
export function MagneticWrapper({
  children,
  className,
}: MagneticButtonProps) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full transition-transform duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
