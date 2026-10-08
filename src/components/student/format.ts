import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from "@/lib/config";
import { isValidTimeZone } from "@/lib/dates";
import { formatCount } from "@/lib/format";

/**
 * Display helpers shared by the student area (header, dashboard, subjects, progress). Pure and isomorphic. Day
 * counts are always computed on the server in the student's time zone (§17); these functions only word them.
 */

const localDateFormats = new Map<string, Intl.DateTimeFormat>();

function dateFormat(key: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  let format = localDateFormats.get(key);
  if (!format) {
    format = new Intl.DateTimeFormat(DEFAULT_LOCALE, options);
    localDateFormats.set(key, format);
  }
  return format;
}

export type DateStyle = "long" | "medium" | "short" | "weekday";

const LOCAL_DATE_OPTIONS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  long: { day: "numeric", month: "long", year: "numeric" },
  medium: { day: "numeric", month: "short", year: "numeric" },
  short: { day: "numeric", month: "short" },
  weekday: { weekday: "long", day: "numeric", month: "long" },
};

/** A calendar date (`YYYY-MM-DD`, no time zone) such as an exam day: "6 February 2027". */
export function formatLocalDate(date: string, style: DateStyle = "long"): string {
  const instant = new Date(`${date}T12:00:00.000Z`);
  if (Number.isNaN(instant.getTime())) return date;
  return dateFormat(`local:${style}`, { ...LOCAL_DATE_OPTIONS[style], timeZone: "UTC" }).format(instant);
}

/** An instant shown as a date in the student's time zone: "5 Oct 2026". An unknown zone falls back to Harare. */
export function formatInstantDate(instant: Date, timeZone: string, style: DateStyle = "medium"): string {
  const zone = isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
  return dateFormat(`instant:${style}:${zone}`, { ...LOCAL_DATE_OPTIONS[style], timeZone: zone }).format(instant);
}

/**
 * §17 wording: "124 days until your examination" (singular for 1 day, "starts today" on the day). A negative value
 * means the examination session has already begun (it can span weeks), so it is "under way", never "starts today".
 */
export function countdownSentence(days: number): string {
  if (days < 0) return "Your examinations are under way";
  if (days === 0) return "Your examination starts today";
  return `${formatCount(days, "day")} until your examination`;
}

/** Visible streak value plus screen-reader wording that matches the status (§19, no exclamation spam). */
export function streakDescription(current: number, status: "INACTIVE" | "AT_RISK" | "DONE_TODAY"): string {
  if (current <= 0) return "No study streak yet";
  const base = `${formatCount(current, "day")} study streak`;
  if (status === "DONE_TODAY") return `${base}. Today's goal is done.`;
  if (status === "AT_RISK") return `${base}. Study today to keep it going.`;
  return base;
}
