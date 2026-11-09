"use client";

import * as React from "react";
import { Eye, EyeOff, Search, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  inputSize?: "sm" | "default" | "lg";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      errorMessage,
      error = Boolean(errorMessage),
      success = false,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      id,
      disabled,
      value,
      inputSize = "default",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const isSearch = type === "search";
    const actualType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none"
          >
            {label}
            {props.required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Left Icon or Search icon */}
          {isSearch && !leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
          )}
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            disabled={disabled}
            value={value}
            aria-invalid={error}
            aria-describedby={helperText || errorMessage ? helperId : undefined}
            className={cn(
              "flex w-full rounded-xl border border-border/80 bg-card/60 text-foreground transition-all duration-200",
              "placeholder:text-muted-foreground/60",
              "hover:border-border",
              "focus-visible:outline-none focus-visible:border-electric focus-visible:ring-2 focus-visible:ring-electric/25",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/40",
              // Size options
              inputSize === "sm" && "h-9 px-3 text-xs",
              inputSize === "default" && "h-11 px-4 text-sm",
              inputSize === "lg" && "h-13 px-5 text-base",
              // Icon paddings
              (leftIcon || isSearch) && "pl-10",
              (rightIcon || isPassword || clearable || success) && "pr-10",
              // States
              error &&
                "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 text-destructive",
              success &&
                !error &&
                "border-success focus-visible:border-success focus-visible:ring-success/20",
              className
            )}
            {...props}
          />

          {/* Right Icon / Password Toggle / Clear / Success */}
          <div className="absolute right-3 flex items-center gap-1.5">
            {clearable && value && !disabled && (
              <button
                type="button"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground p-0.5 rounded-md focus:outline-none"
                tabIndex={-1}
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {isPassword && !disabled && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground p-0.5 rounded-md focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}

            {success && !error && (
              <Check className="w-4 h-4 text-success shrink-0" />
            )}

            {!isPassword && !clearable && !success && rightIcon && (
              <span className="text-muted-foreground">{rightIcon}</span>
            )}
          </div>
        </div>

        {/* Helper or Error Message */}
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

Input.displayName = "Input";
