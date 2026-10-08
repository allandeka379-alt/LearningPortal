import type { ContentAccessTier } from "@/generated/prisma/client";
import type { SearchableEntityType } from "./types";

/**
 * Pure result-presentation rules: who may see a result's text (locked teasers, §44 "do not expose premium content")
 * and parsing of ts_headline snippets into safe segments (no HTML ever comes from the database).
 */

/** Curriculum scope of a result, for entitlement checks such as study-pack grants scoped to a subject (§24, §7.6). */
export interface PremiumScope {
  entityType: SearchableEntityType;
  subjectIds: readonly string[];
  qualificationIds: readonly string[];
  examBoardIds: readonly string[];
}

/** Who is searching. Built by the route from the session and resolved entitlements (never from client input). */
export interface SearchViewer {
  signedIn: boolean;
  /**
   * Whether the viewer may read PREMIUM content in this scope (resolved entitlements: plan `lessonAccess: "ALL"`,
   * `mockExams`, `flashcards`, scoped study-pack grants...). Must be synchronous: resolve entitlements once per
   * request, then answer from memory. Absent = no premium access.
   */
  canViewPremium?: (scope: PremiumScope) => boolean;
  /** The viewer's enrolled subjects: matching results get a small ranking boost (ARCHITECTURE §3.9). */
  boostSubjectIds?: readonly string[];
}

export const ANONYMOUS_VIEWER: SearchViewer = Object.freeze({ signedIn: false });

/** Why a result is shown as a locked teaser: sign in (FREE content) or upgrade (PREMIUM content). */
export type LockReason = "SIGN_IN" | "PREMIUM";

export interface LockState {
  locked: boolean;
  lockReason: LockReason | null;
}

/**
 * PUBLIC: open to everyone. FREE: open to signed-in users. PREMIUM: open only when `canViewPremium(scope)` says so.
 * Locked results carry title + context (subtitle, type, path) only; their body text never leaves the database.
 */
export function lockStateFor(accessTier: ContentAccessTier, scope: PremiumScope, viewer: SearchViewer): LockState {
  switch (accessTier) {
    case "PUBLIC":
      return { locked: false, lockReason: null };
    case "FREE":
      return viewer.signedIn ? { locked: false, lockReason: null } : { locked: true, lockReason: "SIGN_IN" };
    case "PREMIUM":
      return viewer.signedIn && viewer.canViewPremium?.(scope) === true
        ? { locked: false, lockReason: null }
        : { locked: true, lockReason: "PREMIUM" };
    default: {
      const exhaustive: never = accessTier;
      throw new Error(`Unknown access tier: ${String(exhaustive)}`);
    }
  }
}

/** A run of snippet text; `match` marks query terms (render as <mark>, as text, never as HTML). */
export interface SnippetSegment {
  text: string;
  match: boolean;
}

/** ts_headline delimiters: control characters the indexer strips from bodies, so they cannot occur in content. */
export const HEADLINE_START = "\u0002";
export const HEADLINE_STOP = "\u0003";
export const HEADLINE_FRAGMENT = "\u0004";
export const SNIPPET_MAX_CHARS = 320;

/** ts_headline options (bound as a parameter). */
export const HEADLINE_OPTIONS =
  `StartSel=${HEADLINE_START}, StopSel=${HEADLINE_STOP}, MaxWords=28, MinWords=12, ShortWord=2, ` +
  `MaxFragments=2, FragmentDelimiter=${HEADLINE_FRAGMENT}`;

/** Parses ts_headline output into segments, bounded to {@link SNIPPET_MAX_CHARS}. Returns null for empty text. */
export function parseHeadline(raw: string | null | undefined): SnippetSegment[] | null {
  if (!raw) return null;
  const segments: SnippetSegment[] = [];
  let match = false;
  let buffer = "";
  let budget = SNIPPET_MAX_CHARS;

  const flush = (): void => {
    if (buffer === "" || budget <= 0) {
      buffer = "";
      return;
    }
    const text = buffer.slice(0, budget);
    budget -= text.length;
    const previous = segments.at(-1);
    if (previous && previous.match === match) previous.text += text;
    else segments.push({ text, match });
    buffer = "";
  };

  for (const char of raw) {
    if (char === HEADLINE_START || char === HEADLINE_STOP) {
      flush();
      match = char === HEADLINE_START;
    } else if (char === HEADLINE_FRAGMENT) {
      flush();
      const wasMatch: boolean = match;
      match = false;
      buffer = " … ";
      flush();
      match = wasMatch;
    } else {
      buffer += /\s/.test(char) ? " " : char;
    }
  }
  flush();

  const cleaned = segments
    .map((segment) => ({ ...segment, text: segment.text.replace(/ {2,}/g, " ") }))
    .filter((segment) => segment.text !== "");
  const first = cleaned[0];
  if (first) first.text = first.text.trimStart();
  const last = cleaned.at(-1);
  if (last) last.text = last.text.trimEnd();
  const result = cleaned.filter((segment) => segment.text !== "");
  return result.length === 0 ? null : result;
}
