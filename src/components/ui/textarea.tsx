"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  success?: boolean;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      error = Boolean(errorMessage),
      success = false,
      showCount = false,
      maxLength,
      value,
      id,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const helperId = `${textareaId}-helper`;

    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex justify-between items-center">
            <label
              htmlFor={textareaId}
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none"
            >
              {label}
              {props.required && <span className="text-destructive ml-1">*</span>}
            </label>
            {showCount && maxLength && (
              <span className="text-xs text-muted-foreground">
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={error}
          aria-describedby={helperText || errorMessage ? helperId : undefined}
          className={cn(
            "flex w-full rounded-xl border border-border/80 bg-card/60 px-4 py-3 text-sm text-foreground transition-all duration-200 resize-y",
            "placeholder:text-muted-foreground/60",
            "hover:border-border",
            "focus-visible:outline-none focus-visible:border-electric focus-visible:ring-2 focus-visible:ring-electric/25",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/40",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 text-destructive",
            success &&
              !error &&
              "border-success focus-visible:border-success focus-visible:ring-success/20",
            className
          )}
          {...props}
        />

        {(errorMessage || helperText) && (
          <p
            id={helperId}
            className={cn(
              "text-xs leading-none transition-colors",
              error
                ? "text-destructive font-medium"
                : "text-muted-foreground"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
