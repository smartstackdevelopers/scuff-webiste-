"use client";

import * as React from "react";
import { Clock, Sun, Moon, Check, AlertCircle, Calendar } from "lucide-react";
import { getSlotsForDate } from "../../data/availability";
import { formatDisplayDate } from "../../lib/date-utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Step3TimeSelectionProps {
  selectedDate: string | null;
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (slotId: string) => void;
  errorMessage?: string;
}

export function Step3TimeSelection({
  selectedDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  errorMessage,
}: Step3TimeSelectionProps) {
  // Compute time slots for selected date (deterministic mock availability)
  const slots = React.useMemo(() => {
    if (!selectedDate) return [];
    return getSlotsForDate(selectedDate);
  }, [selectedDate]);

  const morningSlots = slots.filter((s) => s.period === "morning");
  const afternoonSlots = slots.filter((s) => s.period === "afternoon");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
          Step 3: Select Arrival Time Slot
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Choose an available arrival window for our mobile unit or studio bay drop-off.
        </p>

        {selectedDate && (
          <div className="mt-2 text-xs font-semibold text-electric flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Appointment Date: {formatDisplayDate(selectedDate)}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        {/* Morning Window */}
        <Card className="p-5 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Morning Arrival Window (09:00 AM – 12:00 PM)</span>
            </div>
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              {morningSlots.filter((s) => s.available).length} slots left
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {morningSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.id;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectTimeSlot(slot.id)}
                  className={cn(
                    "p-3 rounded-xl text-center border transition-all text-xs font-bold flex flex-col items-center justify-center gap-1 select-none",
                    isSelected &&
                      "bg-electric text-black border-electric shadow-glow-blue scale-105 z-10",
                    !isSelected &&
                      slot.available &&
                      "bg-secondary/60 hover:border-electric/50 hover:bg-secondary text-foreground",
                    !slot.available &&
                      "opacity-35 cursor-not-allowed bg-muted/40 border-border/40 text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{slot.time}</span>
                  </div>

                  <span className="text-[9px] uppercase tracking-wider font-medium">
                    {isSelected ? (
                      <span className="flex items-center gap-0.5 text-black">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        Selected
                      </span>
                    ) : slot.available ? (
                      "Available"
                    ) : (
                      "Booked"
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Afternoon Window */}
        <Card className="p-5 bg-card/90 border-border/80 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
              <Moon className="w-4 h-4 text-electric" />
              <span>Afternoon Arrival Window (01:00 PM – 04:00 PM)</span>
            </div>
            <Badge variant="outline" className="text-[10px] text-muted-foreground">
              {afternoonSlots.filter((s) => s.available).length} slots left
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {afternoonSlots.map((slot) => {
              const isSelected = selectedTimeSlot === slot.id;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => onSelectTimeSlot(slot.id)}
                  className={cn(
                    "p-3 rounded-xl text-center border transition-all text-xs font-bold flex flex-col items-center justify-center gap-1 select-none",
                    isSelected &&
                      "bg-electric text-black border-electric shadow-glow-blue scale-105 z-10",
                    !isSelected &&
                      slot.available &&
                      "bg-secondary/60 hover:border-electric/50 hover:bg-secondary text-foreground",
                    !slot.available &&
                      "opacity-35 cursor-not-allowed bg-muted/40 border-border/40 text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{slot.time}</span>
                  </div>

                  <span className="text-[9px] uppercase tracking-wider font-medium">
                    {isSelected ? (
                      <span className="flex items-center gap-0.5 text-black">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        Selected
                      </span>
                    ) : slot.available ? (
                      "Available"
                    ) : (
                      "Booked"
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
