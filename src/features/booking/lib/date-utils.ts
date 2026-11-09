import { WORKING_DAYS, DEMO_HOLIDAYS } from "../data/availability";

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  // Return day of week: 0 = Sun, 1 = Mon, ..., 6 = Sat
  return new Date(year, month, 1).getDay();
}

export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

export function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
}

export function parseDateString(dateStr: string): { year: number; month: number; day: number } | null {
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return null;
  }
  return { year: parts[0], month: parts[1] - 1, day: parts[2] };
}

export function formatDisplayDate(dateStr: string): string {
  const parsed = parseDateString(dateStr);
  if (!parsed) return dateStr;
  const date = new Date(parsed.year, parsed.month, parsed.day);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): string {
  const parsed = parseDateString(dateStr);
  if (!parsed) return dateStr;
  const date = new Date(parsed.year, parsed.month, parsed.day);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getTodayString(): string {
  const now = new Date();
  return formatDateString(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isPastDate(dateStr: string): boolean {
  const today = getTodayString();
  return dateStr < today;
}

export function isWorkingDay(dateStr: string): boolean {
  const parsed = parseDateString(dateStr);
  if (!parsed) return false;
  const dayOfWeek = new Date(parsed.year, parsed.month, parsed.day).getDay();
  return WORKING_DAYS.includes(dayOfWeek);
}

export function isHoliday(dateStr: string): boolean {
  return DEMO_HOLIDAYS.includes(dateStr);
}

export function isDateSelectable(dateStr: string): boolean {
  if (isPastDate(dateStr)) return false;
  if (!isWorkingDay(dateStr)) return false;
  if (isHoliday(dateStr)) return false;
  return true;
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
