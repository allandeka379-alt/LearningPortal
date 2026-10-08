/**
 * Diagnostic rules (§46 free diagnostic, §52 steps 5-7). PURE: no I/O, unit tested in report.test.ts.
 *
 * - Size: a generated diagnostic asks about one question per leaf topic of the pinned syllabus version, between
 *   {@link DIAGNOSTIC_MIN_QUESTIONS} and {@link DIAGNOSTIC_MAX_QUESTIONS} questions (about ten minutes). The attempt engine
 *   spreads them over the top-level topics first, then their subtopics (mastery is ignored for a diagnostic), a third
 *   each just below, at and just above the student's self-reported ability, so the result can place them.
 * - Report by TOPIC: answers are grouped under the top-level topic of the question's topic, because a short
 *   diagnostic has too few questions per subtopic to say anything about one. Each topic shows its marks in the
 *   diagnostic and the mastery band the diagnostic seeded (TopicMastery rollup), which starts cautiously and grows with
 *   practice.
 * - Findings use the §11 band boundaries on the diagnostic percentage: STRENGTH at 75% or more (Strong / Mastered), GAP
 *   below 60% (Weak / Developing), MIXED in between (Competent). A topic whose answers are all still being marked is
 *   PENDING and is never called a strength or a gap.
 * - Starting topics (at most three): gaps first (lowest score, then syllabus order), then mixed topics, then topics the
 *   diagnostic did not cover yet (syllabus order).
 */
import type { MarkingStatus, MasteryBand } from "@/generated/prisma/enums";
import { roundHalfUp } from "@/lib/math";

export const DIAGNOSTIC_MIN_QUESTIONS = 8;
export const DIAGNOSTIC_MAX_QUESTIONS = 12;
/** What the hub promises per subject (UI copy uses it; the size rule above keeps it honest). */
export const DIAGNOSTIC_MINUTES_PER_SUBJECT = 10;
export const STRENGTH_MIN_PERCENT = 75;
export const GAP_BELOW_PERCENT = 60;
export const MAX_STARTING_TOPICS = 3;

/** Questions in a generated diagnostic for a syllabus version with `leafTopicCount` leaf topics. */
export function diagnosticQuestionCount(leafTopicCount: number): number {
  const leaves = Number.isFinite(leafTopicCount) ? Math.floor(leafTopicCount) : 0;
  return Math.min(DIAGNOSTIC_MAX_QUESTIONS, Math.max(DIAGNOSTIC_MIN_QUESTIONS, leaves));
}

/**
 * Estimated minutes for a diagnostic of `questions` questions, on the same scale as the promise on the hub
 * ({@link DIAGNOSTIC_MAX_QUESTIONS} questions ≈ {@link DIAGNOSTIC_MINUTES_PER_SUBJECT} minutes), at least 2.
 */
export function diagnosticMinutes(questions: number): number {
  if (!Number.isFinite(questions) || questions <= 0) return 0;
  return Math.max(2, Math.round((questions * DIAGNOSTIC_MINUTES_PER_SUBJECT) / DIAGNOSTIC_MAX_QUESTIONS));
}

/** Root topic id of a materialised path ("<rootId>/<childId>/<id>"). */
export function rootIdFromPath(path: string): string {
  const [root] = path.split("/");
  return root ?? path;
}

export type TopicFinding = "STRENGTH" | "GAP" | "MIXED" | "PENDING";

/** Finding for a diagnostic percentage (null = nothing marked yet). */
export function findingFor(percent: number | null): TopicFinding {
  if (percent === null) return "PENDING";
  if (percent >= STRENGTH_MIN_PERCENT) return "STRENGTH";
  if (percent < GAP_BELOW_PERCENT) return "GAP";
  return "MIXED";
}

/** One question slot of the diagnostic, as the report needs it. */
export interface DiagnosticSlot {
  /** QuestionAttempt.topicId (the question's topic in the pinned version, often a subtopic). */
  topicId: string;
  marksAvailable: number;
  /** Null while PENDING (AI marking). */
  marksAwarded: number | null;
  markingStatus: MarkingStatus;
}

export interface RootTopicRef {
  id: string;
  name: string;
  sortOrder: number;
}

export interface TopicMasteryRef {
  score: number;
  band: MasteryBand;
}

export interface DiagnosticTopicRow {
  topicId: string;
  name: string;
  questionCount: number;
  answeredCount: number;
  /** Answers still waiting for marking (excluded from the percentage). */
  pendingCount: number;
  /** Marks over the MARKED questions (unanswered questions count as 0, as in every test). */
  marksAwarded: number;
  marksAvailable: number;
  /** 0-100, one decimal; null when nothing in the topic is marked yet. */
  percent: number | null;
  finding: TopicFinding;
  /** Mastery after the diagnostic (seeded), null when no mastery row exists yet. */
  mastery: TopicMasteryRef | null;
}

export type StartingReason = "GAP" | "MIXED" | "NOT_COVERED";

export interface StartingTopic {
  topicId: string;
  name: string;
  reason: StartingReason;
  /** The diagnostic percentage (null for topics it did not cover). */
  percent: number | null;
}

export interface DiagnosticReportCore {
  /** Topics the diagnostic asked about, in syllabus order. */
  topics: DiagnosticTopicRow[];
  strengths: DiagnosticTopicRow[];
  gaps: DiagnosticTopicRow[];
  /** Top-level topics of the syllabus with no question in this diagnostic, in syllabus order. */
  notCovered: RootTopicRef[];
  startingTopics: StartingTopic[];
}

export interface BuildReportInput {
  slots: readonly DiagnosticSlot[];
  /** Path of every slot topic (to find its top-level topic). Slots whose topic is unknown are left out. */
  topicPaths: ReadonlyMap<string, string>;
  /** Top-level topics: every root of the pinned version, plus any root a slot belongs to. */
  roots: readonly RootTopicRef[];
  /** Mastery rows of the roots after the diagnostic. */
  mastery: ReadonlyMap<string, TopicMasteryRef>;
}

const bySyllabusOrder = (a: { sortOrder: number; name: string }, b: { sortOrder: number; name: string }) =>
  a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "en");

/** Builds the per-topic report, findings and starting topics (module header). */
export function buildDiagnosticReport(input: BuildReportInput): DiagnosticReportCore {
  const roots = new Map(input.roots.map((r) => [r.id, r]));
  interface Acc {
    root: RootTopicRef;
    questionCount: number;
    answeredCount: number;
    pendingCount: number;
    marksAwarded: number;
    marksAvailable: number;
  }
  const acc = new Map<string, Acc>();
  for (const slot of input.slots) {
    const path = input.topicPaths.get(slot.topicId);
    if (path === undefined) continue;
    const root = roots.get(rootIdFromPath(path));
    if (!root) continue;
    let entry = acc.get(root.id);
    if (!entry) {
      entry = { root, questionCount: 0, answeredCount: 0, pendingCount: 0, marksAwarded: 0, marksAvailable: 0 };
      acc.set(root.id, entry);
    }
    entry.questionCount += 1;
    if (slot.markingStatus !== "UNANSWERED") entry.answeredCount += 1;
    if (slot.markingStatus === "PENDING" || slot.marksAwarded === null) {
      entry.pendingCount += 1;
      continue;
    }
    entry.marksAwarded += Math.max(0, slot.marksAwarded);
    entry.marksAvailable += Math.max(0, slot.marksAvailable);
  }

  const syllabusOrder = (a: DiagnosticTopicRow, b: DiagnosticTopicRow) =>
    bySyllabusOrder({ sortOrder: roots.get(a.topicId)?.sortOrder ?? 0, name: a.name }, { sortOrder: roots.get(b.topicId)?.sortOrder ?? 0, name: b.name });
  const topics: DiagnosticTopicRow[] = [...acc.values()]
    .map((entry) => {
      const percent = entry.marksAvailable > 0 ? roundHalfUp((entry.marksAwarded * 100) / entry.marksAvailable, 1) : null;
      return {
        topicId: entry.root.id,
        name: entry.root.name,
        questionCount: entry.questionCount,
        answeredCount: entry.answeredCount,
        pendingCount: entry.pendingCount,
        marksAwarded: entry.marksAwarded,
        marksAvailable: entry.marksAvailable,
        percent,
        finding: findingFor(percent),
        mastery: input.mastery.get(entry.root.id) ?? null,
      };
    })
    .sort(syllabusOrder);

  const covered = new Set(topics.map((t) => t.topicId));
  const notCovered = [...input.roots].filter((r) => !covered.has(r.id)).sort(bySyllabusOrder);
  const lowestFirst = (a: DiagnosticTopicRow, b: DiagnosticTopicRow) => (a.percent ?? 0) - (b.percent ?? 0) || syllabusOrder(a, b);
  const gaps = topics.filter((t) => t.finding === "GAP").sort(lowestFirst);
  const mixed = topics.filter((t) => t.finding === "MIXED").sort(lowestFirst);
  const strengths = topics.filter((t) => t.finding === "STRENGTH").sort((a, b) => (b.percent ?? 0) - (a.percent ?? 0) || syllabusOrder(a, b));

  const startingTopics: StartingTopic[] = [
    ...gaps.map((t) => ({ topicId: t.topicId, name: t.name, reason: "GAP" as const, percent: t.percent })),
    ...mixed.map((t) => ({ topicId: t.topicId, name: t.name, reason: "MIXED" as const, percent: t.percent })),
    ...notCovered.map((t) => ({ topicId: t.id, name: t.name, reason: "NOT_COVERED" as const, percent: null })),
  ].slice(0, MAX_STARTING_TOPICS);

  return { topics, strengths, gaps, notCovered, startingTopics };
}

/**
 * "Create my study plan" link (§52 step 7): the study plan page with the diagnosed subjects pre-selected
 * (`?subjectIds=a,b`). Ids are de-duplicated and kept in order.
 */
export function planHrefFor(subjectIds: readonly string[]): string {
  const ids = [...new Set(subjectIds)];
  if (ids.length === 0) return "/app/plan";
  return `/app/plan?${new URLSearchParams({ subjectIds: ids.join(",") }).toString()}`;
}

/** The diagnostic room and report of an attempt. */
export function diagnosticRoomHref(attemptId: string): string {
  return `/app/diagnostic/${attemptId}`;
}

export function diagnosticReportHref(attemptId: string): string {
  return `/app/diagnostic/${attemptId}/report`;
}
