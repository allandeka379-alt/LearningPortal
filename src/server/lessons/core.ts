import type { ContentAccessTier, ContentSourceType, CopyrightStatus, LessonProgressStatus } from "@/generated/prisma/enums";
import type { Entitlements } from "@/lib/billing/entitlements";
import { localDateFromDateColumn, type LocalDate } from "@/lib/dates";

/**
 * Pure rules of the lesson experience (§8 lessons, §26 pinned versions, §27 licensing, §31 free vs paid lessons). No
 * I/O: unit tested in core.test.ts; the services in this folder load rows and call these.
 */

// =====================================================================================================================
// Access (§31)
// =====================================================================================================================

/**
 * A lesson flagged as a free preview (`isFreePreview == accessTier != PREMIUM`, schema doc of ContentAccessTier). Since
 * 2026-10-12 this is only a CLASSIFICATION (public marketing samples and SEO excerpts use it); it opens nothing in the
 * app (no free tier, see {@link isLessonOpen}).
 */
export function isFreePreview(tier: ContentAccessTier): boolean {
  return tier !== "PREMIUM";
}

/**
 * Whether a student may open a lesson: only with full lesson access (`lessonAccess: "ALL"` from a paid plan, a school
 * seat or a study pack covering the subject) or when the lesson is assigned by a class whose tenant SPONSORS
 * assignment work (`assignmentWorkSponsored`; like attempts, an unsponsored assignment needs the student's own
 * entitlement). The access tier no longer matters (owner decision 2026-10-12: no free tier, free-preview lessons are
 * locked too); the parameter stays so call sites keep passing the row's tier.
 */
export function isLessonOpen(tier: ContentAccessTier, lessonAccess: Entitlements["lessonAccess"], sponsoredAssignment = false): boolean {
  return lessonAccess === "ALL" || sponsoredAssignment;
}

// =====================================================================================================================
// Topic context (§2, §26)
// =====================================================================================================================

/** A lesson's tag on a topic node of some syllabus version. */
export interface TopicTagCandidate {
  topicId: string;
  isPrimary: boolean;
  sortOrder: number;
}

/**
 * The topic a lesson is read in, among its tags in the student's pinned version(s): the requested topic when the
 * lesson is tagged there, else the primary tag, else the first by position. Null when there is no candidate.
 */
export function pickContextTag<T extends TopicTagCandidate>(tags: readonly T[], preferredTopicId?: string | null): T | null {
  if (preferredTopicId) {
    const preferred = tags.find((tag) => tag.topicId === preferredTopicId);
    if (preferred) return preferred;
  }
  const ordered = [...tags].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder || (a.topicId < b.topicId ? -1 : a.topicId > b.topicId ? 1 : 0),
  );
  return ordered[0] ?? null;
}

/** Position of a lesson within its topic's ordered list, with its neighbours (§8 previous / next lesson). */
export interface LessonNeighbours<T> {
  /** 1-based; null when the lesson is not in the list. */
  position: number | null;
  total: number;
  previous: T | null;
  next: T | null;
}

export function lessonNeighbours<T extends { id: string }>(ordered: readonly T[], lessonId: string): LessonNeighbours<T> {
  const index = ordered.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return { position: null, total: ordered.length, previous: null, next: null };
  return {
    position: index + 1,
    total: ordered.length,
    previous: ordered[index - 1] ?? null,
    next: ordered[index + 1] ?? null,
  };
}

// =====================================================================================================================
// Progress and time tracking
// =====================================================================================================================

export type LessonState = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

/** The student-facing state of a lesson from its LessonProgress row (no row = not started). */
export function lessonState(row: { status: LessonProgressStatus } | null | undefined): LessonState {
  if (!row) return "NOT_STARTED";
  return row.status === "COMPLETED" ? "COMPLETED" : "IN_PROGRESS";
}

/** Largest number of seconds one heartbeat may credit (the client beats every 30 s while the student is active). */
export const MAX_CREDIT_PER_BEAT_SECONDS = 120;
/** Clock skew / network delay allowed on top of the time elapsed since the previous write. */
export const CREDIT_TOLERANCE_SECONDS = 5;
/** A lesson study session ends after this long without a heartbeat (a later visit starts a new StudySession). */
export const STUDY_SESSION_IDLE_MINUTES = 30;

export interface CreditInput {
  /** Active seconds the client says it measured since its last report. */
  claimedSeconds: number;
  /** Server time of the previous write for this lesson (LessonProgress.lastViewedAt); null for the first write. */
  previousActivityAt: Date | null;
  now: Date;
  maxPerBeat?: number;
  toleranceSeconds?: number;
}

/**
 * Seconds of study time to credit for one heartbeat. The client's claim is never trusted beyond what the server clock
 * allows: at most {@link MAX_CREDIT_PER_BEAT_SECONDS}, and at most the time since the previous write (+ tolerance). So
 * replayed or duplicated heartbeats, and two open tabs of the same lesson, add nothing extra.
 */
export function creditableSeconds(input: CreditInput): number {
  const max = input.maxPerBeat ?? MAX_CREDIT_PER_BEAT_SECONDS;
  const tolerance = input.toleranceSeconds ?? CREDIT_TOLERANCE_SECONDS;
  const claimed = Number.isFinite(input.claimedSeconds) ? Math.max(0, Math.floor(input.claimedSeconds)) : 0;
  let allowed = Math.min(claimed, max);
  if (input.previousActivityAt) {
    const elapsed = Math.floor((input.now.getTime() - input.previousActivityAt.getTime()) / 1000);
    allowed = Math.min(allowed, Math.max(0, elapsed + tolerance));
  }
  return allowed;
}

/** The time-zone-free cut-off before which an open study session counts as idle. */
export function sessionIdleCutoff(now: Date, idleMinutes: number = STUDY_SESSION_IDLE_MINUTES): Date {
  return new Date(now.getTime() - idleMinutes * 60_000);
}

// =====================================================================================================================
// Licensing and attribution (§27)
// =====================================================================================================================

export interface AttributionSource {
  name: string;
  type: ContentSourceType;
  publisher: string | null;
  url: string | null;
  licenceCode: string | null;
  licenceUrl: string | null;
  attributionText: string | null;
  requiresAttribution: boolean;
}

export interface AttributionInput {
  copyrightStatus: CopyrightStatus;
  author: string | null;
  attribution: string | null;
  licenceCode: string | null;
  sourceUrl: string | null;
  /** DATE column. */
  publicationDate: Date | null;
  source: AttributionSource | null;
}

/** What the lesson's licensing footer shows. Every field comes from the content row or its ContentSource. */
export interface LessonAttribution {
  /** One sentence on whose content this is and under which terms. */
  statement: string;
  author: string | null;
  /** Attribution text the licence requires (item text first, then the source's). */
  attribution: string | null;
  source: { name: string; publisher: string | null; url: string | null } | null;
  licence: { code: string; url: string | null } | null;
  /** Link to the original item, when recorded. */
  originalUrl: string | null;
  publicationDate: LocalDate | null;
}

const SAFE_URL = /^https?:\/\//i;

function safeUrl(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed && SAFE_URL.test(trimmed) ? trimmed : null;
}

function text(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Builds the licensing / attribution footer of a lesson (§27 "source, author, copyright status, licence, publication
 * date"). Only http(s) links are kept (no `javascript:` URLs reach an href). Original platform content says so with
 * the configured brand name.
 */
export function buildAttribution(input: AttributionInput, appName: string): LessonAttribution {
  const licenceCode = text(input.licenceCode) ?? text(input.source?.licenceCode);
  const proprietary = licenceCode !== null && licenceCode.toUpperCase() === "PROPRIETARY";
  const licence = licenceCode && !proprietary ? { code: licenceCode, url: safeUrl(input.source?.licenceUrl) } : null;
  const sourceName = text(input.source?.name);
  const statement = (() => {
    switch (input.copyrightStatus) {
      case "OWNED":
        return `Original content by ${appName}.`;
      case "LICENSED":
        return sourceName ? `Used under licence from ${sourceName}.` : "Used under licence.";
      case "PUBLIC_DOMAIN":
        return "This content is in the public domain.";
      case "OPEN_LICENSE":
        return licence ? `Shared under the ${licence.code} licence.` : "Shared under an open licence.";
      case "UNVERIFIED":
        return "Source details are being confirmed.";
    }
  })();
  const showSource = input.source !== null && input.source.type !== "ORIGINAL" && sourceName !== null;
  return {
    statement,
    author: text(input.author),
    attribution: text(input.attribution) ?? (input.source?.requiresAttribution ? text(input.source.attributionText) : null),
    source: showSource && sourceName ? { name: sourceName, publisher: text(input.source?.publisher), url: safeUrl(input.source?.url) } : null,
    licence,
    originalUrl: safeUrl(input.sourceUrl),
    publicationDate: input.publicationDate ? localDateFromDateColumn(input.publicationDate) : null,
  };
}

// =====================================================================================================================
// Topic lesson lists
// =====================================================================================================================

/** Completed / locked / total counts of a topic's lessons (topic page header). */
export function lessonListCounts(lessons: readonly { state: LessonState; locked: boolean }[]): { total: number; completed: number; locked: number } {
  return {
    total: lessons.length,
    completed: lessons.filter((lesson) => lesson.state === "COMPLETED").length,
    locked: lessons.filter((lesson) => lesson.locked).length,
  };
}
