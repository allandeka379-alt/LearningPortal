/**
 * Pure text helpers for indexing and query parsing (no I/O). Used by documents.ts, query-understanding.ts, query.ts
 * and suggest.ts.
 */

const COMBINING_MARKS = /\p{M}+/gu;
const NON_WORD = /[^\p{L}\p{N}]+/gu;
const WORD = /[\p{L}\p{N}]+/gu;
// C0/C1 control characters except tab/newline/carriage return. Stripped at index time because ts_headline snippets use
// \u0002 / \u0003 as highlight delimiters (presentation.ts), and they have no business in indexed text anyway.
const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g;

/** Lower-case, accent-folded, punctuation-free, single-spaced form used to compare names and query words. */
export function normalizeForMatch(value: string): string {
  return value.normalize("NFKD").replace(COMBINING_MARKS, "").toLowerCase().replace(NON_WORD, " ").trim();
}

/** Word tokens of `value` after {@link normalizeForMatch}. */
export function matchTokens(value: string): string[] {
  const normalized = normalizeForMatch(value);
  return normalized === "" ? [] : normalized.split(" ");
}

export interface TokenSpan {
  /** Normalised token (see {@link normalizeForMatch}). */
  token: string;
  /** Start offset in the raw string (inclusive). */
  start: number;
  /** End offset in the raw string (exclusive). */
  end: number;
  /** Inside a "quoted phrase" (websearch syntax): never turned into a filter. */
  quoted: boolean;
  /** Directly preceded by "-" (websearch exclusion): never turned into a filter. */
  negated: boolean;
}

/**
 * Splits a raw query into word tokens, remembering where each one is in the raw string so detected phrases can be
 * cut out while the rest of the websearch syntax (quotes, `-word`, `or`) survives.
 */
export function tokenizeWithSpans(raw: string): TokenSpan[] {
  const spans: TokenSpan[] = [];
  const quoteOffsets: number[] = [];
  for (let i = 0; i < raw.length; i++) if (raw[i] === '"') quoteOffsets.push(i);

  for (const match of raw.matchAll(WORD)) {
    const start = match.index;
    const end = start + match[0].length;
    const token = normalizeForMatch(match[0]);
    if (token === "") continue;
    const quotesBefore = quoteOffsets.filter((offset) => offset < start).length;
    spans.push({
      token,
      start,
      end,
      quoted: quotesBefore % 2 === 1,
      negated: start > 0 && raw[start - 1] === "-" && (start === 1 || /\s/.test(raw[start - 2] ?? " ")),
    });
  }
  return spans;
}

/** True when the query uses websearch_to_tsquery operators (quotes, `-word`, `or`), which typo matching ignores. */
export function hasWebsearchOperators(raw: string): boolean {
  return /"/.test(raw) || /(^|\s)-[\p{L}\p{N}]/u.test(raw) || /(^|\s)or(\s|$)/i.test(raw);
}

/** Collapses runs of whitespace (incl. newlines) to single spaces and trims. */
export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/** Removes control characters (see CONTROL_CHARS) and collapses whitespace. */
export function cleanText(value: string): string {
  return collapseWhitespace(value.replace(CONTROL_CHARS, " "));
}

/**
 * Cuts `text` to at most `max` characters at a word boundary when one exists in the second half of the window.
 * With `ellipsis`, a trailing "…" is added (and counted) when the text was cut.
 */
export function truncateAtWord(text: string, max: number, ellipsis = false): string {
  if (!Number.isInteger(max) || max < 1) throw new RangeError("truncateAtWord: max must be a positive integer");
  if (text.length <= max) return text;
  const budget = ellipsis ? Math.max(1, max - 1) : max;
  const window = text.slice(0, budget);
  const lastSpace = window.lastIndexOf(" ");
  const cut = (lastSpace > budget / 2 ? window.slice(0, lastSpace) : window).replace(/[\s.,;:!?·-]+$/u, "");
  return ellipsis ? `${cut}…` : cut;
}

/**
 * De-duplicates keyword values case- and accent-insensitively (first spelling wins), drops blanks and joins them with
 * spaces, bounded to `max` characters.
 */
export function joinKeywords(values: Iterable<string | null | undefined>, max = 2_000): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    if (value === null || value === undefined) continue;
    const cleaned = cleanText(value);
    const key = normalizeForMatch(cleaned);
    if (key === "" || seen.has(key)) continue;
    seen.add(key);
    out.push(cleaned);
  }
  return truncateAtWord(out.join(" "), max);
}

const MAX_PREFIX_TOKENS = 8;

/**
 * Builds a `to_tsquery('simple', …)` expression for prefix matching from free text: every complete word must match
 * and the LAST word matches as a prefix (`quadratic equ` -> `quadratic:AB & equ:*AB`). Words are reduced to letters
 * and digits, so the result can never contain tsquery operators (no syntax errors, no operator injection); it is still
 * passed to SQL as a bound parameter. `weights` restricts matches to tsvector weights (A = title, B = keywords).
 * Returns null when there is nothing usable (or the last word is shorter than `minLastLength`).
 */
export function buildPrefixTsQuery(text: string, weights: "A" | "AB", minLastLength = 2): string | null {
  const tokens = matchTokens(text).slice(0, MAX_PREFIX_TOKENS);
  const last = tokens.at(-1);
  if (last === undefined || last.length < minLastLength) return null;
  const parts = tokens.slice(0, -1).map((token) => `${token}:${weights}`);
  parts.push(`${last}:*${weights}`);
  return parts.join(" & ");
}
