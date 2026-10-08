import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from "@/lib/config";
import { EMPTY_VALUE, formatNumber } from "@/lib/format";

/**
 * Display formatters for the admin console (isomorphic). Times are shown in the platform time zone (Africa/Harare)
 * unless a zone is given, with the zone named, so two staff members in different places read the same clock.
 * Every formatter returns {@link EMPTY_VALUE} for missing input — never an invented value.
 */

type Maybe<T> = T | null | undefined;

const dateTimeFormats = new Map<string, Intl.DateTimeFormat>();

function dateTimeFormat(options: Intl.DateTimeFormatOptions, timeZone: string): Intl.DateTimeFormat {
  const key = `${timeZone}|${JSON.stringify(options)}`;
  let format = dateTimeFormats.get(key);
  if (!format) {
    format = new Intl.DateTimeFormat(DEFAULT_LOCALE, { ...options, timeZone });
    dateTimeFormats.set(key, format);
  }
  return format;
}

function toDate(value: Maybe<Date | string | number>): Date | null {
  if (value === null || value === undefined) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "5 Oct 2026, 14:32" in the platform time zone. */
export function formatDateTime(value: Maybe<Date | string | number>, timeZone: string = DEFAULT_TIMEZONE): string {
  const date = toDate(value);
  if (!date) return EMPTY_VALUE;
  return dateTimeFormat(
    { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" },
    timeZone,
  ).format(date);
}

/** "5 Oct 2026" in the platform time zone. */
export function formatDate(value: Maybe<Date | string | number>, timeZone: string = DEFAULT_TIMEZONE): string {
  const date = toDate(value);
  if (!date) return EMPTY_VALUE;
  return dateTimeFormat({ day: "numeric", month: "short", year: "numeric" }, timeZone).format(date);
}

/** A `YYYY-MM-DD` local date (DailyMetric / analytics) as "5 Oct 2026", without any time-zone shift. */
export function formatLocalDate(value: Maybe<string>): string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return EMPTY_VALUE;
  return dateTimeFormat({ day: "numeric", month: "short", year: "numeric" }, "UTC").format(new Date(`${value}T00:00:00Z`));
}

/** A `YYYY-MM-DD` local date as a short axis label ("5 Oct"). */
export function formatLocalDateShort(value: Maybe<string>): string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return EMPTY_VALUE;
  return dateTimeFormat({ day: "numeric", month: "short" }, "UTC").format(new Date(`${value}T00:00:00Z`));
}

/** Minor units + ISO currency → "USD 12.50" (never converted between currencies). */
export function formatMoneyMinor(amountMinor: Maybe<number>, currency: Maybe<string>): string {
  if (amountMinor === null || amountMinor === undefined || !Number.isFinite(amountMinor) || !currency) return EMPTY_VALUE;
  try {
    return new Intl.NumberFormat(DEFAULT_LOCALE, { style: "currency", currency, currencyDisplay: "code" }).format(amountMinor / 100);
  } catch {
    return `${currency} ${formatNumber(amountMinor / 100, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

/** AI spend in micro-dollars → "USD 1.234" (three decimals: AI costs are small per request). */
export function formatMicrosUsd(micros: Maybe<number>): string {
  if (micros === null || micros === undefined || !Number.isFinite(micros)) return EMPTY_VALUE;
  return `USD ${formatNumber(micros / 1_000_000, { minimumFractionDigits: 2, maximumFractionDigits: 3 })}`;
}

/** Enum-ish constant → sentence case: "PENDING_VERIFICATION" → "Pending verification". */
export function humanizeEnum(value: Maybe<string>): string {
  if (!value) return EMPTY_VALUE;
  const words = value.replace(/[_.]+/g, " ").trim().toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Name to show for a person, from the usual profile fields. */
export function personLabel(profile: Maybe<{ displayName?: string | null; firstName?: string | null; lastName?: string | null; username?: string | null }>): string {
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  if (full) return full;
  return profile.username?.trim() || "Unnamed user";
}
