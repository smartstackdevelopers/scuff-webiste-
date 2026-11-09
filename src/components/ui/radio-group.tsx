"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function RadioGroup({
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  className,
  children,
}: RadioGroupProps) {
  const generatedName = React.useId();
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onChange?.(val);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name: name || generatedName,
        value: currentValue,
        onChange: handleChange,
        disabled,
      }}
    >
      <div role="radiogroup" className={cn("space-y-2", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps {
  value: string;
  id?: string;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  variant?: "default" | "card";
  className?: string;
  icon?: React.ReactNode;
}

export function RadioGroupItem({
  value,
  id,
  label,
  description,
  disabled: itemDisabled = false,
  variant = "default",
  className,
  icon,
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup");
  }

  const generatedId = React.useId();
  const radioId = id || generatedId;
  const isChecked = context.value === value;
  const isDisabled = context.disabled || itemDisabled;

  const handleClick = () => {
    if (!isDisabled) {
      context.onChange?.(value);
    }
  };

  if (variant === "card") {
    return (
      <div
        role="radio"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handleClick();
          }
        }}
        className={cn(
          "relative flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none",
          isChecked
            ? "border-electric bg-primary/5 shadow-glow-sm"
            : "border-border/80 bg-card/60 hover:border-border hover:bg-card",
          isDisabled && "opacity-40 cursor-not-allowed pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
          className
        )}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div
              className={cn(
                "p-2 rounded-lg border",
                isChecked
                  ? "bg-primary/10 border-primary/30 text-electric"
                  : "bg-secondary border-border/80 text-muted-foreground"
              )}
            >
              {icon}
            </div>
          )}
          <div className="flex flex-col">
            <span
              className={cn(
                "text-sm font-semibold",
                isChecked ? "text-foreground" : "text-foreground/90"
              )}
            >
              {label}
            </span>
            {description && (
              <span className="text-xs text-muted-foreground mt-0.5">
                {description}
              </span>
            )}
          </div>
        </div>

        {/* Custom Radio Circle */}
        <div
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 ml-3",
            isChecked
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/80 bg-card"
          )}
        >
          {isChecked && (
            <motion.div
              layoutId="radio-inner"
              className="w-2 h-2 rounded-full bg-white"
              transition={{ duration: 0.15 }}
            />
          )}
        </div>
      </div>
    );
  }

  // Default Radio option
  return (
    <label
      htmlFor={radioId}
      className={cn(
        "inline-flex items-start gap-3 select-none cursor-pointer",
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          type="radio"
          id={radioId}
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => handleClick()}
          className="sr-only"
        />
        <div
          className={cn(
            "w-5 h-5 rounded-full border transition-all duration-200 flex items-center justify-center",
            isChecked
              ? "border-primary bg-primary text-primary-foreground shadow-glow-sm"
              : "border-border/80 bg-card/70 hover:border-border",
            "focus-within:ring-2 focus-within:ring-electric focus-within:ring-offset-2"
          )}
        >
          {isChecked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
              className="w-2 h-2 rounded-full bg-white"
            />
          )}
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
  );
}
