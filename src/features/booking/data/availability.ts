import { TimeSlot } from "../types/booking";

export const BASE_TIME_SLOTS: Omit<TimeSlot, "available">[] = [
  { id: "09:00", time: "09:00 AM", period: "morning" },
  { id: "10:00", time: "10:00 AM", period: "morning" },
  { id: "11:00", time: "11:00 AM", period: "morning" },
  { id: "12:00", time: "12:00 PM", period: "morning" },
  { id: "13:00", time: "01:00 PM", period: "afternoon" },
  { id: "14:00", time: "02:00 PM", period: "afternoon" },
  { id: "15:00", time: "03:00 PM", period: "afternoon" },
  { id: "16:00", time: "04:00 PM", period: "afternoon" },
];

/**
 * Standard business working days (1 = Monday, 6 = Saturday; 0 = Sunday closed)
 */
export const WORKING_DAYS = [1, 2, 3, 4, 5, 6];

/**
 * Demo holiday dates when the studio is closed (YYYY-MM-DD)
 */
export const DEMO_HOLIDAYS = [
  "2026-12-25", // Christmas Day
  "2026-12-26", // Boxing Day
  "2027-01-01", // New Year's Day
];

/**
 * Returns available time slots for a given date.
 * Uses a deterministic hash based on date string to simulate realistic booking availability.
 */
export function getSlotsForDate(dateStr: string): TimeSlot[] {
  // Simple deterministic hash based on date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }

  return BASE_TIME_SLOTS.map((slot, idx) => {
    // Determine pseudo-availability: ~75% slots available, with some booked
    const slotHash = Math.abs(hash + idx * 17);
    const isAvailable = slotHash % 4 !== 0; // 3 out of 4 available

    return {
      ...slot,
      available: isAvailable,
    };
  });
}
