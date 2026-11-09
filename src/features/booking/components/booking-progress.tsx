"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { BookingStep } from "../types/booking";
import { cn } from "@/lib/utils";

interface BookingProgressProps {
  currentStep: BookingStep;
  onStepClick?: (step: BookingStep) => void;
}

const STEPS_DATA = [
  { step: 1 as BookingStep, title: "Service" },
  { step: 2 as BookingStep, title: "Date" },
  { step: 3 as BookingStep, title: "Time" },
  { step: 4 as BookingStep, title: "Details" },
  { step: 5 as BookingStep, title: "Confirm" },
];

export function BookingProgress({ currentStep, onStepClick }: BookingProgressProps) {
  // Calculate percentage for progress line
  const progressPercent = ((currentStep - 1) / (STEPS_DATA.length - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-2 select-none">
      <div className="relative">
        {/* Background Connecting Line */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-border/60 -z-10" />

        {/* Animated Active Progress Line */}
        <motion.div
          className="absolute top-5 left-6 h-0.5 bg-electric -z-10 shadow-[0_0_8px_rgba(0,102,255,0.8)]"
          initial={false}
          animate={{
            width: `calc(${progressPercent}% * (1 - 48px / 100%))`,
          }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />

        {/* Step Nodes */}
        <div className="flex items-center justify-between">
          {STEPS_DATA.map(({ step, title }) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            const isClickable = Boolean(onStepClick && step < currentStep);

            return (
              <div
                key={step}
                className={cn(
                  "flex flex-col items-center text-center cursor-default",
                  isClickable && "cursor-pointer group"
                )}
                onClick={() => {
                  if (isClickable && onStepClick) {
                    onStepClick(step);
                  }
                }}
              >
                {/* Step Circle */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all duration-300 border-2 bg-background",
                    isCurrent &&
                      "bg-electric text-black border-electric shadow-glow-blue scale-110",
                    isCompleted &&
                      "bg-emerald-500 text-black border-emerald-500",
                    !isCurrent &&
                      !isCompleted &&
                      "border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>0{step}</span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    "mt-2 text-[11px] font-bold uppercase tracking-wider transition-colors",
                    isCurrent && "text-electric",
                    isCompleted && "text-foreground",
                    !isCurrent && !isCompleted && "text-muted-foreground",
                    isClickable && "group-hover:text-electric"
                  )}
                >
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
