import { formatCount } from "@/lib/format";
import type { DeckCounts } from "./types";

/**
 * Wording and links of the flashcard pages (§18). Pure and isomorphic. Time differences are computed by the caller
 * with a server-supplied `now` (never the viewer's clock during a server render).
 */

/** `/app/flashcards/review` for a subject and/or topic deck (no scope = every due card). */
export function reviewHref(scope: { subjectId?: string | null; topicId?: string | null } = {}): string {
  const query = new URLSearchParams();
  if (scope.subjectId) query.set("subjectId", scope.subjectId);
  if (scope.topicId) query.set("topicId", scope.topicId);
  const qs = query.toString();
  return qs ? `/app/flashcards/review?${qs}` : "/app/flashcards/review";
}

/** `/app/flashcards/new`, pre-selecting a subject and topic. */
export function newCardHref(scope: { subjectId?: string | null; topicId?: string | null } = {}): string {
  const query = new URLSearchParams();
  if (scope.subjectId) query.set("subjectId", scope.subjectId);
  if (scope.topicId) query.set("topicId", scope.topicId);
  const qs = query.toString();
  return qs ? `/app/flashcards/new?${qs}` : "/app/flashcards/new";
}

/** Cards a deck's "Review" starts with now: everything due plus the new cards still allowed today. */
export function reviewableCount(counts: Pick<DeckCounts, "due" | "newAvailable">, newRemainingToday: number): number {
  return counts.due + Math.min(counts.newAvailable, Math.max(0, newRemainingToday));
}

/** "3 due · 5 new", "5 new", "3 due" or "Nothing to review". */
export function deckCountsText(counts: Pick<DeckCounts, "due" | "newAvailable">, newRemainingToday: number): string {
  const fresh = Math.min(counts.newAvailable, Math.max(0, newRemainingToday));
  const parts = [counts.due > 0 ? `${counts.due} due` : null, fresh > 0 ? `${fresh} new` : null].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : "Nothing to review";
}

/** "12 left", "1 left". */
export function cardsLeftLabel(remaining: number): string {
  return `${Math.max(0, remaining)} left`;
}

/** "in 8 minutes", "in 3 hours", "in 2 days" (rounded up, never "in 0 minutes"). */
export function dueInText(dueAt: string | Date, now: Date): string {
  const ms = new Date(dueAt).getTime() - now.getTime();
  if (!Number.isFinite(ms) || ms <= 60_000) return "in a minute";
  const minutes = Math.ceil(ms / 60_000);
  if (minutes < 60) return `in ${formatCount(minutes, "minute")}`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `in ${formatCount(hours, "hour")}`;
  return `in ${formatCount(Math.round(hours / 24), "day")}`;
}

/**
 * Screen-reader wording of a scheduler label (srs.ts `formatStepLabel` / `formatDaysLabel`): "<10m" → "under 10
 * minutes", "4d" → "4 days", "1.2mo" → "1.2 months", "1y" → "1 year". Unknown shapes are returned unchanged.
 */
export function spokenInterval(label: string): string {
  const match = /^(<)?(\d+(?:\.\d+)?)(m|h|d|mo|y)$/.exec(label.trim());
  if (!match) return label;
  const [, under, value, unit] = match;
  const n = Number(value);
  const nouns: Record<string, string> = { m: "minute", h: "hour", d: "day", mo: "month", y: "year" };
  const noun = nouns[unit ?? ""] ?? "";
  const text = `${value} ${n === 1 ? noun : `${noun}s`}`;
  return under ? `under ${text}` : text;
}

/** Study time of a session: "45 s", "4 min", "1 h 5 min". */
export function sessionTimeText(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds} s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest > 0 ? `${hours} h ${rest} min` : `${hours} h`;
}
