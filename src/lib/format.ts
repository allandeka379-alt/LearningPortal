/**
 * Isomorphic display formatters (safe in Server Components, Client Components, the API and the worker).
 *
 * Conventions:
 * - Default locale is `en-ZW` (Zimbabwean English: `1,234.5`, en spelling). Pass `locale` to override.
 * - Every formatter accepts `null`/`undefined`/non-finite input and returns {@link EMPTY_VALUE} instead of
 *   inventing a number ("No fake numbers", CLAUDE.md rule 6). Pair it with screen-reader text such as
 *   "No data yet" where the dash is shown on its own (see `StatTile`).
 * - Intl formatter construction is comparatively expensive, so instances are memoised per locale + options.
 */

import { DEFAULT_LOCALE } from "@/lib/config";

export { DEFAULT_LOCALE };

/** Placeholder rendered when a value is unknown. An em dash, never `0`. */
export const EMPTY_VALUE = "—";

type Maybe<T> = T | null | undefined;

interface LocaleOption {
  /** BCP 47 locale. Defaults to {@link DEFAULT_LOCALE}. */
  locale?: string;
}

function isFiniteNumber(value: Maybe<number>): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

const numberFormats = new Map<string, Intl.NumberFormat>();
function numberFormat(locale: string, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `${locale}|${JSON.stringify(options)}`;
  let format = numberFormats.get(key);
  if (!format) {
    format = new Intl.NumberFormat(locale, options);
    numberFormats.set(key, format);
  }
  return format;
}

const pluralRulesCache = new Map<string, Intl.PluralRules>();
function pluralRules(locale: string): Intl.PluralRules {
  let rules = pluralRulesCache.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRulesCache.set(locale, rules);
  }
  return rules;
}

const relativeFormats = new Map<string, Intl.RelativeTimeFormat>();
function relativeFormat(locale: string): Intl.RelativeTimeFormat {
  let format = relativeFormats.get(locale);
  if (!format) {
    format = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    relativeFormats.set(locale, format);
  }
  return format;
}

export interface FormatNumberOptions extends LocaleOption {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  /** Compact notation ("12K"). Use for large counts in tight UI, never for scores. */
  compact?: boolean;
}

/** Formats a number with grouping separators, e.g. `12345.6` → `"12,345.6"`. */
export function formatNumber(value: Maybe<number>, options: FormatNumberOptions = {}): string {
  if (!isFiniteNumber(value)) return EMPTY_VALUE;
  const { locale = DEFAULT_LOCALE, compact = false, maximumFractionDigits, minimumFractionDigits } = options;
  return numberFormat(locale, {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: maximumFractionDigits ?? (compact ? 1 : 2),
    ...(minimumFractionDigits === undefined ? {} : { minimumFractionDigits }),
  }).format(value);
}

export interface FormatPercentOptions extends LocaleOption {
  /**
   * How to interpret `value`:
   * - `"percent"` (default): `82` → `"82%"`. Matches how scores/mastery are stored (0–100, §11).
   * - `"ratio"`: `0.82` → `"82%"`. Use for accuracy computed as correct / attempted.
   */
  input?: "percent" | "ratio";
  /** Defaults to 0: whole percentages read faster and avoid false precision. */
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

/** Formats a percentage. See {@link FormatPercentOptions.input} for the accepted scale. */
export function formatPercent(value: Maybe<number>, options: FormatPercentOptions = {}): string {
  if (!isFiniteNumber(value)) return EMPTY_VALUE;
  const { locale = DEFAULT_LOCALE, input = "percent", maximumFractionDigits = 0, minimumFractionDigits } = options;
  const ratio = input === "ratio" ? value : value / 100;
  return numberFormat(locale, {
    style: "percent",
    maximumFractionDigits,
    ...(minimumFractionDigits === undefined ? {} : { minimumFractionDigits }),
  }).format(ratio);
}

export interface FormatDurationOptions extends LocaleOption {
  /** `"short"` (default): `"1 h 20 min"`. `"long"`: `"1 hour 20 minutes"` (good for screen-reader text). */
  style?: "short" | "long";
}

/**
 * Formats a duration given in MINUTES: `80` → `"1 h 20 min"`, `45` → `"45 min"`, `120` → `"2 h"`.
 *
 * Rounds to the nearest whole minute. A positive duration that rounds to zero renders as `"< 1 min"` so a short
 * study session is never displayed as nothing. Negative input is treated as invalid data → {@link EMPTY_VALUE}.
 */
export function formatDuration(minutes: Maybe<number>, options: FormatDurationOptions = {}): string {
  if (!isFiniteNumber(minutes) || minutes < 0) return EMPTY_VALUE;
  const { style = "short", locale = DEFAULT_LOCALE } = options;
  const total = Math.round(minutes);
  if (total === 0) {
    if (minutes > 0) return style === "long" ? "less than 1 minute" : "< 1 min";
    return style === "long" ? "0 minutes" : "0 min";
  }
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  const parts: string[] = [];
  if (hours > 0) {
    const n = formatNumber(hours, { locale, maximumFractionDigits: 0 });
    parts.push(style === "long" ? `${n} ${pluralize(hours, "hour", "hours", { locale })}` : `${n} h`);
  }
  if (mins > 0) {
    parts.push(style === "long" ? `${mins} ${pluralize(mins, "minute", "minutes", { locale })}` : `${mins} min`);
  }
  return parts.join(" ");
}

/**
 * Formats a whole-day offset relative to today: `0` → `"today"`, `1` → `"tomorrow"`, `-1` → `"yesterday"`,
 * `126` → `"in 126 days"`, `-3` → `"3 days ago"`.
 *
 * Takes a precomputed day count on purpose: "how many days until X" depends on the student's time zone
 * (Africa/Harare) and must be computed in server code, not with the viewer's clock during render.
 */
export function formatRelativeDays(days: Maybe<number>, options: LocaleOption = {}): string {
  if (!isFiniteNumber(days)) return EMPTY_VALUE;
  const rounded = Math.round(days);
  // Math.round(-0.4) is -0, which Intl renders as "today" anyway; normalise for predictable output.
  return relativeFormat(options.locale ?? DEFAULT_LOCALE).format(rounded === 0 ? 0 : rounded, "day");
}

/**
 * Picks the singular or plural form of a word for `count` using CLDR plural rules
 * (`pluralize(1, "day")` → `"day"`, `pluralize(3, "day")` → `"days"`). Returns the word only; use
 * {@link formatCount} for `"3 days"`. `plural` defaults to `singular + "s"`.
 */
export function pluralize(count: number, singular: string, plural: string = `${singular}s`, options: LocaleOption = {}): string {
  return pluralRules(options.locale ?? DEFAULT_LOCALE).select(count) === "one" ? singular : plural;
}

/** Formats a count with its noun: `formatCount(1250, "question")` → `"1,250 questions"`. */
export function formatCount(
  count: Maybe<number>,
  singular: string,
  plural?: string,
  options: FormatNumberOptions = {},
): string {
  if (!isFiniteNumber(count)) return EMPTY_VALUE;
  return `${formatNumber(count, options)} ${pluralize(count, singular, plural, options)}`;
}

/**
 * Derives up to two initials for avatar fallbacks: first letter of the first and last name parts
 * (`"Rumbidzai Chipo Ncube"` → `"RN"`, `"tendai"` → `"T"`). Handles astral characters via `Array.from`.
 * Returns `""` for blank input; callers should then show a generic icon.
 */
export function getInitials(name: string | null | undefined, options: LocaleOption = {}): string {
  const parts = (name ?? "").trim().split(/\s+/u).filter(Boolean);
  const first = parts[0];
  if (!first) return "";
  const last = parts.length > 1 ? parts[parts.length - 1] : undefined;
  const initial = (word: string) => Array.from(word)[0] ?? "";
  return (initial(first) + (last ? initial(last) : "")).toLocaleUpperCase(options.locale ?? DEFAULT_LOCALE);
}
