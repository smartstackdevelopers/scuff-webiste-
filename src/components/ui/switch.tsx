"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: string;
  size?: "sm" | "default";
  className?: string;
}

export function Switch({
  id,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  description,
  size = "default",
  className,
}: SwitchProps) {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setUncontrolledChecked(next);
    }
    onChange?.(next);
  };

  const isSmall = size === "sm";

  return (
    <div className={cn("inline-flex items-start gap-3 select-none", className)}>
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer",
          isSmall ? "h-5 w-9" : "h-6 w-11",
          isChecked
            ? "bg-primary shadow-glow-sm"
            : "bg-muted/80 border border-border/80",
          disabled && "opacity-40 cursor-not-allowed pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-md",
            isSmall ? "h-3.5 w-3.5" : "h-4.5 w-4.5",
            isChecked
              ? isSmall
                ? "translate-x-4.5"
                : "translate-x-5.5"
              : "translate-x-1"
          )}
        />
      </button>

      {(label || description) && (
        <label
          htmlFor={switchId}
          onClick={handleToggle}
          className={cn(
            "flex flex-col cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {label && (
            <span className="text-sm font-medium text-foreground leading-tight">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground mt-0.5 leading-normal">
              {description}
            </span>
          )}
        </label>
      )}
    </div>
  );
}
