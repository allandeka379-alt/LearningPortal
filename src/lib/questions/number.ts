/**
 * Parsing of numbers typed by students (NUMERICAL / CALCULATION answers, numeric blanks). Isomorphic so the answer box
 * can warn BEFORE submission ("use a decimal point") with exactly the rules the marker applies.
 *
 * Accepted forms (after the canonical-text clean-up of `text.ts`: NFKC, superscripts → `^n`, Unicode minus → `-`,
 * zero-width characters removed):
 *   - plain decimals: `42`, `-3.5`, `+7`, `.5`, `5.`;
 *   - thousands separators in British/Zimbabwean style: `1,234.5`, `1 234.5` (comma, space, thin or no-break space),
 *     groups of exactly three digits after a leading group of one to three;
 *   - scientific notation: `3.2e4`, `3.2E-4`, `3.2×10^4`, `3.2 x 10^4`, `3.2*10^-4`, `3.2·10⁴`, `3.2\times10^{4}`,
 *     and a bare power of ten `10^4`;
 *   - fractions and mixed numbers: `3/4`, `-3/4`, `2 1/2`.
 * Rejected:
 *   - a decimal comma (`1,5`, `0,25`, `1.234,5`): AMBIGUOUS — in our curricula `,` separates thousands, so we refuse to
 *     guess (the UI asks for a decimal point; the marker routes it to review rather than awarding or failing it);
 *   - anything else (`NaN`, `Infinity`, `0x10`, `1_000`, `1,23`, two decimal points…): INVALID;
 *   - values that overflow to ±Infinity (`1e999`): NON_FINITE.
 * `-0` is normalised to `0`.
 *
 * Precision as written (used for significant-figure and decimal-place requirements):
 *   - significant figures: leading zeros never count; after a decimal point every digit counts (`0.0450` → 3); trailing
 *     zeros of a number WITHOUT a decimal point are ambiguous, so a range is returned (`4500` → 2–4, `60` → 1–2);
 *     scientific notation counts the mantissa (`4.50e3` → 3); zero itself counts as at least 1;
 *   - decimal places: digits after the point (`3.20` → 2); scientific notation reports the implied places of the full
 *     value (`3.25e1` = 32.5 → 1); integers → 0;
 *   - fractions carry no precision (null) — they are exact.
 */
import { canonicalText } from "./text";
import { QUESTION_LIMITS } from "./constants";

export type NumberParseFailure = "EMPTY" | "TOO_LONG" | "AMBIGUOUS_DECIMAL_COMMA" | "INVALID" | "NON_FINITE";

export interface ParsedNumber {
  /** Finite value; never `-0`. */
  value: number;
  form: "decimal" | "scientific" | "fraction";
  /** Significant figures as written ([min, max]; equal unless trailing zeros are ambiguous); null for fractions. */
  sigFigs: { min: number; max: number } | null;
  /** Decimal places as written; null for fractions. */
  decimalPlaces: number | null;
}

export type NumberParseResult = { ok: true; number: ParsedNumber } | { ok: false; reason: NumberParseFailure };

/** Raw input beyond this length is rejected before any processing. */
const RAW_LIMIT = 256;
/** Digits beyond double precision are meaningless and only invite abuse. */
const MAX_DIGITS = 40;

/** LaTeX-ish noise students paste from worked solutions: `\times`, `\cdot`, braces, `$`, thin spaces. */
function stripLatex(s: string): string {
  return s
    .replace(/\\(?:times|cdot)/g, "×")
    .replace(/\\[,;:! ]/g, "")
    .replace(/[{}$]/g, "");
}

/** Cleans number input: canonical text, LaTeX noise removed, single spaces. Exported for unit splitting. */
export function cleanNumberInput(raw: string): string {
  return stripLatex(canonicalText(raw)).replace(/\s+/g, " ").trim();
}

const PLAIN = /^(\d+)(?:\.(\d*))?$|^\.(\d+)$/;
const GROUPED = /^(\d{1,3}(?:([, ])\d{3})(?:\2\d{3})*)(?:\.(\d*))?$/;
const DECIMAL_COMMA = /^\d+,\d+$|^\d{1,3}(?:\.\d{3})+,\d+$/;

interface Mantissa {
  /** Digits as written, separators removed. */
  intDigits: string;
  fracDigits: string;
  hasPoint: boolean;
}

/** Parses an unsigned mantissa; returns a failure reason when not a number. */
function parseMantissa(s: string): Mantissa | NumberParseFailure {
  const plain = PLAIN.exec(s);
  if (plain) {
    if (plain[3] !== undefined) return { intDigits: "", fracDigits: plain[3], hasPoint: true };
    return { intDigits: plain[1] ?? "", fracDigits: plain[2] ?? "", hasPoint: plain[2] !== undefined };
  }
  const grouped = GROUPED.exec(s);
  if (grouped) {
    const separator = grouped[2] ?? ",";
    return {
      intDigits: (grouped[1] ?? "").split(separator).join(""),
      fracDigits: grouped[3] ?? "",
      hasPoint: grouped[3] !== undefined,
    };
  }
  if (DECIMAL_COMMA.test(s)) return "AMBIGUOUS_DECIMAL_COMMA";
  return "INVALID";
}

function sigFigsOf(m: Mantissa): { min: number; max: number } {
  const digits = (m.intDigits + m.fracDigits).replace(/^0+/, "");
  if (digits === "") {
    const written = Math.max(1, m.fracDigits.length);
    return { min: 1, max: m.hasPoint ? written : 1 };
  }
  if (m.hasPoint) return { min: digits.length, max: digits.length };
  const trailing = /0*$/.exec(digits)?.[0].length ?? 0;
  return { min: digits.length - trailing, max: digits.length };
}

function finish(value: number, form: ParsedNumber["form"], sigFigs: ParsedNumber["sigFigs"], decimalPlaces: number | null): NumberParseResult {
  if (!Number.isFinite(value)) return { ok: false, reason: "NON_FINITE" };
  return { ok: true, number: { value: value === 0 ? 0 : value, form, sigFigs, decimalPlaces } };
}

const SCI_TIMES = /^(.*?)\s?[×xX*·]\s?10\s?\^\s?\(?([+-]?\d{1,4})\)?$/;
const SCI_E = /^(.*?)[eE]([+-]?\d{1,4})$/;
const POWER_OF_TEN = /^10\s?\^\s?\(?([+-]?\d{1,4})\)?$/;
const FRACTION = /^(\d{1,15})\s?\/\s?(\d{1,15})$/;
const MIXED = /^(\d{1,15}) (\d{1,15})\s?\/\s?(\d{1,15})$/;

/** Parses a student's number (rules in the module header). Never throws. */
export function parseNumberInput(raw: string): NumberParseResult {
  if (typeof raw !== "string") return { ok: false, reason: "INVALID" };
  if (raw.length > RAW_LIMIT) return { ok: false, reason: "TOO_LONG" };
  let s = cleanNumberInput(raw);
  if (s === "") return { ok: false, reason: "EMPTY" };
  if (s.length > QUESTION_LIMITS.numberInput) return { ok: false, reason: "TOO_LONG" };

  let negative = false;
  if (s.startsWith("-") || s.startsWith("+")) {
    negative = s.startsWith("-");
    s = s.slice(1).trimStart();
  }
  const sign = negative ? -1 : 1;
  if ((s.match(/\d/g)?.length ?? 0) > MAX_DIGITS) return { ok: false, reason: "INVALID" };

  const mixed = MIXED.exec(s);
  if (mixed) {
    const whole = Number(mixed[1]);
    const num = Number(mixed[2]);
    const den = Number(mixed[3]);
    if (den === 0 || num >= den) return { ok: false, reason: "INVALID" };
    return finish(sign * (whole + num / den), "fraction", null, null);
  }
  const fraction = FRACTION.exec(s);
  if (fraction) {
    const den = Number(fraction[2]);
    if (den === 0) return { ok: false, reason: "INVALID" };
    return finish((sign * Number(fraction[1])) / den, "fraction", null, null);
  }

  const power = POWER_OF_TEN.exec(s);
  if (power) {
    const exponent = Number(power[1]);
    return finish(sign * Number(`1e${exponent}`), "scientific", { min: 1, max: 1 }, Math.max(0, -exponent));
  }

  const sci = SCI_TIMES.exec(s) ?? SCI_E.exec(s);
  if (sci) {
    const mantissa = parseMantissa((sci[1] ?? "").trim());
    if (typeof mantissa === "string") return { ok: false, reason: mantissa };
    const exponent = Number(sci[2]);
    const text = `${mantissa.intDigits || "0"}.${mantissa.fracDigits || "0"}e${exponent}`;
    return finish(sign * Number(text), "scientific", sigFigsOf(mantissa), Math.max(0, mantissa.fracDigits.length - exponent));
  }

  const mantissa = parseMantissa(s);
  if (typeof mantissa === "string") return { ok: false, reason: mantissa };
  const text = `${mantissa.intDigits || "0"}.${mantissa.fracDigits || "0"}`;
  return finish(sign * Number(text), "decimal", sigFigsOf(mantissa), mantissa.hasPoint ? mantissa.fracDigits.length : 0);
}

/** Student-facing explanation of a parse failure (UI copy, safe to show before or after submission). */
export function numberParseMessage(reason: NumberParseFailure): string {
  switch (reason) {
    case "EMPTY":
      return "Enter a number.";
    case "TOO_LONG":
      return "That number is too long.";
    case "AMBIGUOUS_DECIMAL_COMMA":
      return "Use a decimal point, not a comma (for example 1.5, not 1,5).";
    case "NON_FINITE":
      return "That number is too large.";
    case "INVALID":
      return "We couldn't read that as a number. Try a form like 12.5, 1,250, 3.2e4 or 3/4.";
  }
}

/** Characters that count as the same when matching typed text against the text shown around an answer box. */
function affixChar(c: string): string {
  const lower = c.toLowerCase();
  return lower === "×" ? "x" : lower;
}

/** `text` with `affix` removed from one end (ignoring spaces, case and ×/x), or null when that end does not match. */
function withoutAffix(text: string, affix: string, end: "start" | "end"): string | null {
  const wanted = [...affix].filter((c) => !/\s/.test(c));
  const chars = [...text];
  if (end === "end") {
    wanted.reverse();
    chars.reverse();
  }
  let i = 0;
  for (const c of wanted) {
    while (i < chars.length && /\s/.test(chars[i] ?? "")) i++;
    const ch = chars[i];
    if (ch === undefined || affixChar(ch) !== affixChar(c)) return null;
    i++;
  }
  const rest = chars.slice(i);
  if (end === "end") rest.reverse();
  return rest.join("").trim();
}

/**
 * Removes what the answer box already shows when a student types it again: a leading copy of the prefix shown before
 * the box ("x =", "US$", "×", "pH") and a trailing copy of the suffix shown after it (": 1"). Matching ignores case and
 * spaces and treats "×" as "x". Input that does not match, or that would be left empty, is returned unchanged.
 */
export function stripAnswerAffixes(raw: string, affixes: { prefix?: string | null; suffix?: string | null }): string {
  let text = canonicalText(raw);
  let changed = false;
  for (const [affix, end] of [
    [affixes.prefix, "start"],
    [affixes.suffix, "end"],
  ] as const) {
    if (!affix || canonicalText(affix) === "") continue;
    const rest = withoutAffix(text, canonicalText(affix), end);
    if (rest !== null && rest !== "") {
      text = rest;
      changed = true;
    }
  }
  return changed ? text : raw;
}

// Number prefix of "value + unit" input such as "60km/h", "3.2 x 10^4 kg", "2 1/2 m".
const NUMBER_PREFIX =
  /^[-+]?\s?(?:\d+ \d+\s?\/\s?\d+|\d+\s?\/\s?\d+|\d{1,3}(?:[, ]\d{3})+(?:\.\d*)?|\d+(?:\.\d*)?|\.\d+)(?:\s?(?:[eE][-+]?\d+|[×xX*·]\s?10\s?\^\s?\(?[-+]?\d+\)?))?/;
/** A unit starts with a letter or one of the common unit symbols. */
const UNIT_START = /^[\p{L}%°'"(/]/u;

/**
 * Splits combined input like `"60 km/h"` into number and unit. When the remainder does not look like a unit (e.g. the
 * `,5` of a decimal comma) the whole input is returned as the number so that the parser can report it precisely.
 */
export function splitNumberAndUnit(raw: string): { number: string; unit: string } {
  const s = cleanNumberInput(raw);
  const match = NUMBER_PREFIX.exec(s);
  if (!match) return { number: s, unit: "" };
  const rest = s.slice(match[0].length).trim();
  if (rest === "") return { number: match[0].trim(), unit: "" };
  // "1,5 m": keep the decimal comma with the number so the parser reports it as ambiguous, not as a unit.
  const comma = /^,\d+/.exec(rest);
  if (comma) return { number: `${match[0].trim()}${comma[0]}`, unit: rest.slice(comma[0].length).trim() };
  if (!UNIT_START.test(rest)) return { number: s, unit: "" };
  // "3 x 10^4" where the regex stopped early would leave "x 10^4" as a unit: treat as part of the number.
  if (/^[xX×*·]\s?10\b/.test(rest)) return { number: s, unit: "" };
  return { number: match[0].trim(), unit: rest };
}
