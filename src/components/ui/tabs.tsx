"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant?: "pill" | "underline";
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
}

export interface TabsProps {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  variant?: "pill" | "underline";
  className?: string;
  children: React.ReactNode;
}

export function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "pill",
  className,
  children,
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (val: string) => {
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onChange: handleChange,
        variant,
      }}
    >
      <div className={cn("w-full space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { variant } = useTabs();

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center justify-start overflow-x-auto",
        variant === "pill" &&
          "p-1.5 rounded-xl bg-card border border-border/80 shadow-sm",
        variant === "underline" &&
          "border-b border-border gap-6 w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function TabsTrigger({
  value,
  children,
  icon,
  disabled = false,
  className,
}: TabsTriggerProps) {
  const { value: activeValue, onChange, variant } = useTabs();
  const isActive = activeValue === value;
  const layoutId = React.useId();

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => onChange(value)}
      className={cn(
        "relative flex items-center gap-2 text-sm font-semibold transition-colors duration-200 select-none cursor-pointer",
        variant === "pill" && "px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground",
        variant === "pill" && isActive && "text-foreground font-bold",
        variant === "underline" && "pb-3 text-muted-foreground hover:text-foreground",
        variant === "underline" && isActive && "text-electric font-bold",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
        className
      )}
    >
      {isActive && variant === "pill" && (
        <motion.div
          layoutId={`tab-pill-${layoutId}`}
          className="absolute inset-0 rounded-lg bg-secondary border border-border shadow-sm -z-10"
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
        />
      )}

      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>

      {isActive && variant === "underline" && (
        <motion.div
          layoutId={`tab-underline-${layoutId}`}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric"
          transition={{ type: "spring", stiffness: 450, damping: 35 }}
        />
      )}
    </button>
  );
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: activeValue } = useTabs();
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={cn(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
