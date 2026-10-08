/**
 * Time-zone-aware calendar helpers (isomorphic, `Intl` only, no date library).
 *
 * Satisfies §17 (exam countdown), and is the day-boundary primitive for §16 (study plan), §18 (flashcard due days)
 * and §19 (streaks, weekly goals). ARCHITECTURE §3.12: day boundaries use the user's time zone, default
 * `Africa/Harare` (CAT, UTC+2, no DST); the code is written generically so DST zones work too (§53 expansion).
 *
 * Model:
 * - An *instant* is a `Date` (or epoch milliseconds): a point on the global timeline.
 * - A *local date* ({@link LocalDate}) is a calendar day `YYYY-MM-DD` as seen on the wall clock in some time zone.
 *   It carries no zone of its own; callers convert an instant to a local date once, at the edge, with
 *   {@link localDateString}, and then do pure calendar arithmetic.
 * - Calendar arithmetic is done on "epoch days" (days since 1970-01-01 in the proleptic Gregorian calendar), which
 *   is exact and immune to DST because it never involves wall-clock hours.
 *
 * Postgres `DATE` columns arrive from the driver as `Date` objects at UTC midnight. Converting those with
 * {@link localDateString} would shift the day in negative-offset zones, so use {@link localDateFromDateColumn} /
 * {@link dateColumnFromLocalDate} for them.
 */
import { DEFAULT_TIMEZONE } from "@/lib/config";

/** A calendar date formatted `YYYY-MM-DD` (ISO 8601 extended). The time zone is implied by context. */
export type LocalDate = string;

/** ISO weekday: 1 = Monday … 7 = Sunday. */
export type IsoWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface LocalDateParts {
  year: number;
  /** 1–12 */
  month: number;
  /** 1–31 */
  day: number;
}

export { DEFAULT_TIMEZONE };

const MS_PER_DAY = 86_400_000;
const LOCAL_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

// ---------------------------------------------------------------------------------------------------------------
// Local date parsing / formatting
// ---------------------------------------------------------------------------------------------------------------

function daysInMonth(year: number, month: number): number {
  // Day 0 of the next month is the last day of `month`. setUTCFullYear avoids the 0–99 → 1900s quirk of Date.UTC.
  const date = new Date(0);
  date.setUTCFullYear(year, month, 0);
  return date.getUTCDate();
}

/** Returns true when `value` is a real calendar date in `YYYY-MM-DD` form (rejects e.g. `2026-02-30`). */
export function isLocalDate(value: unknown): value is LocalDate {
  if (typeof value !== "string") return false;
  const match = LOCAL_DATE_PATTERN.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);
}

/** Splits a {@link LocalDate} into numeric parts. Throws `RangeError` on malformed or impossible dates. */
export function parseLocalDate(date: LocalDate): LocalDateParts {
  if (!isLocalDate(date)) {
    throw new RangeError(`Expected a calendar date in YYYY-MM-DD form, received ${JSON.stringify(date)}`);
  }
  return { year: Number(date.slice(0, 4)), month: Number(date.slice(5, 7)), day: Number(date.slice(8, 10)) };
}

function pad(value: number, width: number): string {
  return String(value).padStart(width, "0");
}

/** Formats numeric parts as a {@link LocalDate}. Throws when the parts do not form a real date. */
export function formatLocalDate(parts: LocalDateParts): LocalDate {
  const value = `${pad(parts.year, 4)}-${pad(parts.month, 2)}-${pad(parts.day, 2)}`;
  if (!isLocalDate(value)) throw new RangeError(`Invalid calendar date ${value}`);
  return value;
}

function toEpochDay(date: LocalDate): number {
  const { year, month, day } = parseLocalDate(date);
  const utc = new Date(0);
  utc.setUTCFullYear(year, month - 1, day);
  return Math.round(utc.getTime() / MS_PER_DAY);
}

function fromEpochDay(epochDay: number): LocalDate {
  const date = new Date(epochDay * MS_PER_DAY);
  return `${pad(date.getUTCFullYear(), 4)}-${pad(date.getUTCMonth() + 1, 2)}-${pad(date.getUTCDate(), 2)}`;
}

// ---------------------------------------------------------------------------------------------------------------
// Instants ↔ local dates
// ---------------------------------------------------------------------------------------------------------------

const wallClockFormats = new Map<string, Intl.DateTimeFormat>();

/** Memoised formatter that renders the full wall-clock time in `timeZone` (construction is comparatively costly). */
function wallClockFormat(timeZone: string): Intl.DateTimeFormat {
  let format = wallClockFormats.get(timeZone);
  if (!format) {
    format = new Intl.DateTimeFormat("en-US", {
      timeZone,
      calendar: "gregory",
      numberingSystem: "latn",
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short",
    });
    wallClockFormats.set(timeZone, format);
  }
  return format;
}

function toEpochMs(instant: Date | number): number {
  const ms = typeof instant === "number" ? instant : instant.getTime();
  if (!Number.isFinite(ms)) throw new RangeError("Invalid instant (NaN date)");
  return ms;
}

interface WallClock extends LocalDateParts {
  hour: number;
  minute: number;
  second: number;
}

function wallClock(epochMs: number, timeZone: string): WallClock {
  const parts = wallClockFormat(timeZone).formatToParts(epochMs);
  const read = (type: Intl.DateTimeFormatPartTypes): number => {
    const part = parts.find((p) => p.type === type);
    if (!part) throw new RangeError(`Intl did not return a ${type} part for time zone ${timeZone}`);
    return Number(part.value);
  };
  const era = parts.find((p) => p.type === "era")?.value;
  const rawYear = read("year");
  // Years before 1 CE are rendered as "BC" eras; convert to astronomical numbering for completeness.
  const year = era === "BC" || era === "B" ? 1 - rawYear : rawYear;
  return { year, month: read("month"), day: read("day"), hour: read("hour") % 24, minute: read("minute"), second: read("second") };
}

/** True when `timeZone` is an IANA zone the runtime knows (e.g. `"Africa/Harare"`). */
export function isValidTimeZone(timeZone: string): boolean {
  try {
    wallClockFormat(timeZone);
    return true;
  } catch {
    return false;
  }
}

/**
 * The calendar date of `instant` on the wall clock in `timeZone`.
 *
 * Example: `2026-10-04T22:30:00Z` is already `2026-10-05` in Harare (UTC+2).
 * Throws `RangeError` for an invalid instant or an unknown time zone.
 */
export function localDateString(instant: Date | number, timeZone: string = DEFAULT_TIMEZONE): LocalDate {
  const { year, month, day } = wallClock(toEpochMs(instant), timeZone);
  return `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`;
}

/**
 * Offset of `timeZone` from UTC at `instant`, in minutes (Harare: `+120`, New York in winter: `-300`).
 * Seconds-level historical offsets are truncated to whole minutes.
 */
export function timeZoneOffsetMinutes(instant: Date | number, timeZone: string = DEFAULT_TIMEZONE): number {
  const epochMs = toEpochMs(instant);
  const wall = wallClock(epochMs, timeZone);
  const asUtc = new Date(0);
  asUtc.setUTCFullYear(wall.year, wall.month - 1, wall.day);
  asUtc.setUTCHours(wall.hour, wall.minute, wall.second, 0);
  const wholeSecondMs = Math.floor(epochMs / 1000) * 1000;
  return Math.trunc((asUtc.getTime() - wholeSecondMs) / 60_000);
}

/**
 * The first instant of local calendar day `date` in `timeZone` (normally local midnight).
 *
 * Generic over DST: the offset is resolved iteratively at the candidate instant. When midnight does not exist
 * because a DST gap starts at 00:00 (e.g. some years in America/Santiago), the first existing instant of that
 * day is returned.
 */
export function startOfLocalDay(date: LocalDate, timeZone: string = DEFAULT_TIMEZONE): Date {
  const utcMidnight = toEpochDay(date) * MS_PER_DAY;
  let candidate = utcMidnight - timeZoneOffsetMinutes(utcMidnight, timeZone) * 60_000;
  // Re-resolve with the offset in force at the candidate itself (differs across a DST transition).
  candidate = utcMidnight - timeZoneOffsetMinutes(candidate, timeZone) * 60_000;
  // If the result maps to the previous day (midnight skipped by a DST gap), step forward to the day's first hour.
  if (localDateString(candidate, timeZone) < date) {
    while (localDateString(candidate, timeZone) < date) candidate += 15 * 60_000;
  }
  return new Date(candidate);
}

/** Converts a `DATE` column value (a `Date` at UTC midnight from the driver) to a {@link LocalDate} without shifting. */
export function localDateFromDateColumn(value: Date): LocalDate {
  const ms = toEpochMs(value);
  return fromEpochDay(Math.floor(ms / MS_PER_DAY));
}

/** Converts a {@link LocalDate} to the UTC-midnight `Date` that Postgres `DATE` columns expect. */
export function dateColumnFromLocalDate(date: LocalDate): Date {
  return new Date(toEpochDay(date) * MS_PER_DAY);
}

// ---------------------------------------------------------------------------------------------------------------
// Calendar arithmetic
// ---------------------------------------------------------------------------------------------------------------

/** Signed number of calendar days from `from` to `to` (`daysBetween("2026-10-05", "2026-10-07") === 2`). */
export function daysBetween(from: LocalDate, to: LocalDate): number {
  return toEpochDay(to) - toEpochDay(from);
}

/** `date` shifted by a whole number of days (negative to go back). Throws on non-integer `days`. */
export function addDays(date: LocalDate, days: number): LocalDate {
  if (!Number.isInteger(days)) throw new RangeError(`addDays expects a whole number of days, received ${days}`);
  return fromEpochDay(toEpochDay(date) + days);
}

/** Lexical comparison is chronological for `YYYY-MM-DD`; this validates both sides and returns -1, 0 or 1. */
export function compareLocalDates(a: LocalDate, b: LocalDate): -1 | 0 | 1 {
  const diff = daysBetween(b, a);
  return diff < 0 ? -1 : diff > 0 ? 1 : 0;
}

/** ISO weekday of a local date: 1 = Monday … 7 = Sunday. */
export function isoWeekday(date: LocalDate): IsoWeekday {
  // 1970-01-01 was a Thursday (ISO 4).
  const index = (((toEpochDay(date) + 3) % 7) + 7) % 7; // 0 = Monday
  return (index + 1) as IsoWeekday;
}

/** The Monday on or before `date` (weeks start on Monday, ISO 8601 and Zimbabwean school convention). */
export function startOfWeek(date: LocalDate): LocalDate {
  return addDays(date, 1 - isoWeekday(date));
}

/**
 * ISO 8601 week key, e.g. `"2026-W41"` for 2026-10-05. The week-numbering year can differ from the calendar year
 * around New Year (`2021-01-03` → `"2020-W53"`, `2024-12-30` → `"2025-W01"`).
 */
export function isoWeekKey(date: LocalDate): string {
  // The ISO week belongs to the year that contains its Thursday.
  const thursday = addDays(date, 4 - isoWeekday(date));
  const weekYear = parseLocalDate(thursday).year;
  const jan1 = formatLocalDate({ year: weekYear, month: 1, day: 1 });
  const week = Math.floor(daysBetween(jan1, thursday) / 7) + 1;
  return `${pad(weekYear, 4)}-W${pad(week, 2)}`;
}

/** `count` consecutive local dates starting at `start` (inclusive). */
export function eachLocalDate(start: LocalDate, count: number): LocalDate[] {
  if (!Number.isInteger(count) || count < 0) throw new RangeError(`count must be a non-negative integer, received ${count}`);
  const first = toEpochDay(start);
  return Array.from({ length: count }, (_, i) => fromEpochDay(first + i));
}

/**
 * Whole calendar days until an exam, for the §17 countdown ("124 days until your examination").
 *
 * Semantics: the number of local midnights between "today" (the calendar date of `now` in `timeZone`) and the exam
 * date. Time of day is irrelevant, so the value only changes at local midnight:
 * - `1` the day before the exam, `0` on the exam day itself, negative once the exam day has passed;
 * - an exam on `2027-02-06` seen at 23:59 or 00:01 Harare time on `2026-10-05` is `124` either way.
 *
 * `examDate` is normally a {@link LocalDate} (exam sessions are calendar dates). A `Date` is treated as an instant
 * and converted in `timeZone`; for a Postgres `DATE` column use {@link localDateFromDateColumn} first.
 */
export function daysUntil(examDate: LocalDate | Date, now: Date, timeZone: string = DEFAULT_TIMEZONE): number {
  const exam = typeof examDate === "string" ? examDate : localDateString(examDate, timeZone);
  return daysBetween(localDateString(now, timeZone), exam);
}
