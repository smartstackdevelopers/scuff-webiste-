"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function Select({
  label,
  placeholder = "Select an option...",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  helperText,
  errorMessage,
  error = Boolean(errorMessage),
  disabled = false,
  required = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const generatedId = React.useId();

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(options.findIndex((opt) => opt.value === value));
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && !options[focusedIndex].disabled) {
          onChange?.(options[focusedIndex].value);
          setIsOpen(false);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label
          id={`${generatedId}-label`}
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${generatedId}-label` : undefined}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex h-11 w-full items-center justify-between rounded-xl border border-border/80 bg-card/60 px-4 py-2 text-sm text-foreground transition-all duration-200 text-left select-none",
            "hover:border-border",
            "focus-visible:outline-none focus-visible:border-electric focus-visible:ring-2 focus-visible:ring-electric/25",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/40",
            isOpen && "border-electric ring-2 ring-electric/20",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 text-destructive",
            !selectedOption && "text-muted-foreground/70"
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ml-2",
              isOpen && "rotate-180 text-foreground"
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 right-0 z-50 rounded-xl border border-border/80 bg-card/95 backdrop-blur-md p-1 shadow-luxury-dark max-h-60 overflow-y-auto"
              role="listbox"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value;
                const isFocused = index === focusedIndex;

                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      if (!option.disabled) {
                        if (!isControlled) {
                          setUncontrolledValue(option.value);
                        }
                        onChange?.(option.value);
                        setIsOpen(false);
                      }
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors duration-150 select-none",
                      option.disabled &&
                        "opacity-40 cursor-not-allowed pointer-events-none",
                      isFocused && "bg-secondary text-foreground",
                      isSelected && "text-electric font-semibold"
                    )}
                  >
                    <div className="flex flex-col truncate">
                      <span className="truncate">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-muted-foreground truncate">
                          {option.description}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-electric shrink-0 ml-2" />
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(errorMessage || helperText) && (
        <p
          className={cn(
            "text-xs leading-none transition-colors",
            error ? "text-destructive font-medium" : "text-muted-foreground"
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
}
