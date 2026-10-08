/**
 * Answer-text normalisation shared by authoring (accepted answers, keywords) and marking (student answers). Both sides
 * go through the SAME function, so comparisons are symmetric.
 *
 * Always applied (robustness and security, not configurable):
 *   1. superscript digits/signs become `^n` (`x²` → `x^2`, `s⁻¹` → `s^-1`), so they survive step 3 unambiguously;
 *   2. invisible format characters (zero-width spaces/joiners, BOM, soft hyphen: Unicode category Cf) are removed and
 *      control characters become spaces;
 *   3. Unicode NFKC (full-width letters/digits, ligatures, subscripts `O₂` → `O2`, compatibility spaces);
 *   4. typographic quotes → ASCII quotes, dashes and the minus sign → `-`;
 *   5. whitespace is trimmed and runs are collapsed to one space.
 * Optional (answer-spec `normalise` flags; case folding is controlled by `caseSensitive`, default insensitive):
 *   `remove_whitespace` (`x^2 + 3x` ≡ `x^2+3x`), `strip_punctuation` (apostrophes, periods and dashes removed —
 *   `D.N.A.` ≡ `DNA`, `co-operation` ≡ `cooperation` — other punctuation becomes a space), `strip_diacritics`
 *   (`café` ≡ `cafe`), `strip_articles` (English a/an/the as whole words). `trim`, `lowercase` and
 *   `collapse_whitespace` are accepted for compatibility (ARCHITECTURE §4.5 example) and are always on.
 *
 * Unicode look-alikes from other scripts (Cyrillic `о` for Latin `o`) are deliberately NOT folded: they cannot be
 * typed by accident on the keyboards our students use, and folding them could only create false positives.
 */

export const NORMALISE_FLAGS = [
  "trim",
  "lowercase",
  "collapse_whitespace",
  "remove_whitespace",
  "strip_punctuation",
  "strip_diacritics",
  "strip_articles",
] as const;

export type NormaliseFlag = (typeof NORMALISE_FLAGS)[number];

export interface TextNormaliseOptions {
  /** Default false: answers are compared case-insensitively. */
  caseSensitive?: boolean;
  flags?: readonly NormaliseFlag[];
}

const SUPERSCRIPTS: Readonly<Record<string, string>> = {
  "⁰": "0",
  "¹": "1",
  "²": "2",
  "³": "3",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9",
  "⁺": "+",
  "⁻": "-",
};
const SUPERSCRIPT_RUN = /[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g;

/** `10⁴` → `10^4`, `s⁻¹` → `s^-1`. Runs before NFKC (which would turn `10⁴` into the misleading `104`). */
export function mapSuperscripts(text: string): string {
  return text.replace(SUPERSCRIPT_RUN, (run) => `^${Array.from(run, (ch) => SUPERSCRIPTS[ch] ?? ch).join("")}`);
}

const FORMAT_CHARS = /\p{Cf}/gu;
const CONTROL_CHARS = /[\p{Cc}\u2028\u2029]/gu;
const SINGLE_QUOTES = /[\u2018\u2019\u201A\u201B\u2032\u00B4`]/g;
const DOUBLE_QUOTES = /[\u201C\u201D\u201E\u201F\u2033]/g;
const DASHES = /[\u2010\u2011\u2012\u2013\u2014\u2015\u2212\uFE58\uFE63\uFF0D]/g;
const WHITESPACE_RUN = /\s+/gu;

/**
 * Steps 1–5 of the module header: the canonical form every answer comparison starts from. Case and the optional
 * flags are NOT applied here.
 */
export function canonicalText(text: string): string {
  return mapSuperscripts(text)
    .replace(FORMAT_CHARS, "")
    .normalize("NFKC")
    .replace(CONTROL_CHARS, " ")
    .replace(SINGLE_QUOTES, "'")
    .replace(DOUBLE_QUOTES, '"')
    .replace(DASHES, "-")
    .replace(WHITESPACE_RUN, " ")
    .trim();
}

const ARTICLES = /(^|\s)(?:a|an|the)(?=\s|$)/giu;

/** Full normalisation (module header). Idempotent: `normaliseAnswerText(normaliseAnswerText(x)) === normaliseAnswerText(x)`. */
export function normaliseAnswerText(text: string, options: TextNormaliseOptions = {}): string {
  const flags = new Set(options.flags ?? []);
  let s = canonicalText(text);
  if (flags.has("strip_diacritics")) s = s.normalize("NFD").replace(/\p{M}/gu, "").normalize("NFC");
  if (!options.caseSensitive) s = s.toLowerCase();
  if (flags.has("strip_punctuation")) s = s.replace(/[.'\-]/g, "").replace(/\p{P}/gu, " ");
  if (flags.has("strip_articles")) s = s.replace(ARTICLES, "$1");
  s = flags.has("remove_whitespace") ? s.replace(WHITESPACE_RUN, "") : s.replace(WHITESPACE_RUN, " ");
  return s.trim();
}

/** True when the text has no visible content (empty, whitespace or invisible format characters only). */
export function isBlankText(text: string | null | undefined): boolean {
  return text === null || text === undefined || canonicalText(text) === "";
}

/** Words in a prose answer (for essay word limits): whitespace-separated runs containing a letter or digit. */
export function wordCount(text: string): number {
  const canonical = canonicalText(text);
  if (canonical === "") return 0;
  let count = 0;
  for (const token of canonical.split(" ")) if (/[\p{L}\p{N}]/u.test(token)) count += 1;
  return count;
}

const EDGE_PUNCTUATION = /^\p{P}+|\p{P}+$/gu;

/** Tokens of NORMALISED text for keyword matching: split on spaces, punctuation trimmed from token edges. */
export function tokenize(normalised: string): string[] {
  const tokens: string[] = [];
  for (const raw of normalised.split(" ")) {
    const token = raw.replace(EDGE_PUNCTUATION, "");
    if (token !== "") tokens.push(token);
  }
  return tokens;
}

/** A keyword prepared for matching: normalised tokens; a trailing `*` in the authored keyword makes the LAST token a prefix. */
export interface KeywordMatcher {
  tokens: readonly string[];
  prefix: boolean;
}

/** Prepares an authored keyword / phrase (e.g. `"evaporat*"`, `"light energy"`). Returns null for blank keywords. */
export function prepareKeyword(keyword: string, options: TextNormaliseOptions = {}): KeywordMatcher | null {
  const trimmed = keyword.trim();
  const prefix = trimmed.endsWith("*");
  const tokens = tokenize(normaliseAnswerText(prefix ? trimmed.slice(0, -1) : trimmed, { ...options, flags: (options.flags ?? []).filter((f) => f !== "remove_whitespace") }));
  return tokens.length === 0 ? null : { tokens, prefix };
}

/** True when `tokens` contains the keyword's tokens as a contiguous run (whole words; prefix match on the last token). */
export function containsKeyword(tokens: readonly string[], keyword: KeywordMatcher): boolean {
  const k = keyword.tokens.length;
  outer: for (let i = 0; i + k <= tokens.length; i++) {
    for (let j = 0; j < k; j++) {
      const token = tokens[i + j] as string;
      const want = keyword.tokens[j] as string;
      const isLast = j === k - 1;
      if (isLast && keyword.prefix ? !token.startsWith(want) : token !== want) continue outer;
    }
    return true;
  }
  return false;
}
