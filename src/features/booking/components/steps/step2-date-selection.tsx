"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar, AlertCircle, Info } from "lucide-react";
import {
  MONTH_NAMES,
  WEEKDAY_LABELS,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDateString,
  formatDisplayDate,
  isDateSelectable,
  isPastDate,
  isWorkingDay,
  isHoliday,
  getTodayString,
} from "../../lib/date-utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Step2DateSelectionProps {
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  errorMessage?: string;
}

export function Step2DateSelection({
  selectedDate,
  onSelectDate,
  errorMessage,
}: Step2DateSelectionProps) {
  // Calendar month state
  const todayStr = getTodayString();
  const today = new Date();
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);

  // Month navigation
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Prevent navigating further back than the current month
  const isPrevDisabled =
    currentYear === today.getFullYear() && currentMonth <= today.getMonth();

  // Generate calendar grid slots
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyPrefixSlots = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
          Step 2: Select Appointment Date
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Select an available business day (Monday – Saturday). Studio bay and mobile slots update dynamically.
        </p>

        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      <Card className="p-5 sm:p-7 bg-card/90 border-border/80 shadow-xl max-w-xl mx-auto space-y-6">
        {/* Month & Year Header Navigation */}
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-electric" />
            <span className="text-lg font-bold text-foreground uppercase tracking-wider">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              size="xs"
              variant="outline"
              disabled={isPrevDisabled}
              onClick={handlePrevMonth}
              className="w-8 h-8 p-0"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              type="button"
              size="xs"
              variant="outline"
              onClick={handleNextMonth}
              className="w-8 h-8 p-0"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {WEEKDAY_LABELS.map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {emptyPrefixSlots.map((slot) => (
            <div key={`empty-${slot}`} className="aspect-square" />
          ))}

          {daysArray.map((day) => {
            const dateStr = formatDateString(currentYear, currentMonth, day);
            const isSelected = selectedDate === dateStr;
            const isAvailable = isDateSelectable(dateStr);
            const isPast = isPastDate(dateStr);
            const isClosed = !isWorkingDay(dateStr) || isHoliday(dateStr);
            const isTodayDate = dateStr === todayStr;

            return (
              <button
                key={dateStr}
                type="button"
                disabled={!isAvailable}
                onClick={() => onSelectDate(dateStr)}
                className={cn(
                  "aspect-square rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center relative select-none",
                  isSelected &&
                    "bg-electric text-black shadow-glow-blue scale-105 z-10 font-black",
                  !isSelected &&
                    isAvailable &&
                    "bg-secondary/60 hover:bg-electric/20 hover:text-electric text-foreground border border-border/40",
                  !isSelected &&
                    !isAvailable &&
                    "opacity-30 cursor-not-allowed text-muted-foreground",
                  isTodayDate && !isSelected && "ring-2 ring-electric/60"
                )}
              >
                <span>{day}</span>
                {isClosed && !isPast && (
                  <span className="text-[8px] text-muted-foreground/60 block">Closed</span>
                )}
                {isTodayDate && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-electric mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Calendar Legend */}
        <div className="pt-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-electric" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary/80 border border-border" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-muted opacity-40" />
            <span>Sunday / Closed</span>
          </div>
        </div>

        {/* Selected Date Confirmation Pill */}
        {selectedDate && (
          <div className="p-3.5 rounded-xl bg-electric/10 border border-electric/30 text-xs text-foreground flex items-center gap-2.5">
            <Info className="w-4 h-4 text-electric shrink-0" />
            <span>
              Selected Date: <strong className="text-electric">{formatDisplayDate(selectedDate)}</strong>
            </span>
          </div>
        )}
      </Card>
    </div>
  );
}
