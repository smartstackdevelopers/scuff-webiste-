"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  description?: string;
  errorMessage?: string;
  error?: boolean;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked,
      indeterminate = false,
      disabled = false,
      onChange,
      label,
      description,
      errorMessage,
      error = Boolean(errorMessage),
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    const isControlled = controlledChecked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked ?? false);
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (!isControlled) {
        setUncontrolledChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <div className={cn("flex flex-col space-y-1", className)}>
        <label
          htmlFor={checkboxId}
          className={cn(
            "inline-flex items-start gap-3 select-none",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              checked={isChecked}
              disabled={disabled}
              onChange={handleChange}
              className="sr-only"
              {...props}
            />
            <div
              className={cn(
                "w-5 h-5 rounded-md border transition-all duration-200 flex items-center justify-center",
                isChecked || indeterminate
                  ? "bg-primary border-primary text-primary-foreground shadow-glow-sm"
                  : "bg-card/70 border-border/80 hover:border-border",
                error && "border-destructive",
                "focus-within:ring-2 focus-within:ring-electric focus-within:ring-offset-2"
              )}
            >
              <AnimatePresence>
                {isChecked && !indeterminate && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                )}
                {indeterminate && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {(label || description) && (
            <div className="flex flex-col">
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
            </div>
          )}
        </label>

        {errorMessage && (
          <p className="text-xs text-destructive font-medium pl-8">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
