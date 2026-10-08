import "server-only";
import type { ContentAccessTier, MasteryBand, Prisma, Role, StudyPlanItemReason, TopicKind } from "@/generated/prisma/client";
import { recommendationHref } from "@/components/dashboard/links";
import {
  DEFAULT_TIMEZONE,
  dateColumnFromLocalDate,
  isValidTimeZone,
  localDateFromDateColumn,
  localDateString,
  type LocalDate,
} from "@/lib/dates";
import { masteryBandFromScore, MASTERY_BAND_MIN_SCORE } from "@/lib/mastery-band";
import { clamp, roundHalfUp } from "@/lib/math";
import { recommendationsFor, type LessonRef, type Recommendation } from "@/server/adaptive/core";
import { hasPermission } from "@/server/auth/permissions";
import { ancestorIdsFromPath, buildTopicTree, flattenTopicTree } from "@/server/curriculum/core";
import { getGradeScheme, getGradeSchemeById, resolveGradeSchemeId } from "@/server/curriculum/grades";
import { db, type DbClient } from "@/server/db";
import { estimateGrade } from "@/server/exams/scoring";
import { displayedStreak } from "@/server/gamification/service";
import { streakStatus } from "@/server/gamification/streaks";
import { memoizeAsync } from "@/server/lib/cache";
import { AppError } from "@/server/lib/errors";
import { getStudyDefaults } from "@/server/lib/settings";
import {
  DEFAULT_MASTERY_CONFIG,
  isTopicCompleted,
  toDifficulty,
  updateTopicMastery,
  type AttemptOutcome,
  type Difficulty,
  type TopicMasteryState,
} from "./core";
import { countdownForSession, pickExamCountdown } from "./student-overview";

/**
 * Progress persistence and read models (§6 student dashboard, §7 subject dashboard, §11 mastery, §17 countdown,
 * §50 honest empty states). Wires the pure core (./core) to TopicMastery / SubjectProgress and serves the dashboard
 * queries, each a handful of indexed reads (no N+1).
 *
 * Version scoping (§26): every per-topic read filters the enrolment's PINNED syllabus version. Topics "in scope" for
 * progress denominators are the leaf topics of that version ∩ the route's papers ∩ (not optional OR chosen) ∩ the
 * target exam year window (SubjectEnrollment doc).
 *
 * TopicMastery rows:
 * - leaf rows (`isLeaf`) take direct evidence synchronously on every final mark ({@link applyMasteryOutcomes});
 * - rows of topics with children are ROLLUPS ({@link refreshSubjectProgress}): an evidence-weighted mean of the
 *   descendant leaf rows that have evidence (weight = attempts, capped at the core's evidence window), so a §7 topic
 *   bar shows mastery of what has been assessed and coverage is reported separately. A question tagged directly to a
 *   non-leaf node updates that node's row until a descendant leaf has evidence (primary tags should be leaves).
 * - Scores are stored "snapped" ({@link storableMasteryScore}) so the stored band satisfies the raw-threshold CHECK
 *   (TopicMastery_band_chk) AND equals the band the UI derives by rounding (`masteryBandFromScore`).
 *
 * Time: timestamps are JS Dates written through the ORM or raw parameters (never SQL `now()`).
 */

/** The reading user. Structurally satisfied by the auth `Actor`. */
export interface ProgressActor {
  userId: string;
  roles: readonly Role[];
  timeZone?: string;
}

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

function assertOwnProgress(actor: ProgressActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) throw AppError.forbidden("Only students have a progress dashboard.");
}

const round1 = (value: number) => roundHalfUp(value, 1);
const percent = (part: number, whole: number) => (whole > 0 ? round1((part * 100) / whole) : null);

// =====================================================================================================================
// Pure helpers (unit tested in service.test.ts)
// =====================================================================================================================

const BAND_THRESHOLDS = [
  MASTERY_BAND_MIN_SCORE.DEVELOPING,
  MASTERY_BAND_MIN_SCORE.COMPETENT,
  MASTERY_BAND_MIN_SCORE.STRONG,
  MASTERY_BAND_MIN_SCORE.MASTERED,
] as const;

/**
 * A mastery score as stored: clamped to 0–100 and, when the score displays as a band boundary (e.g. 39.5 shows as
 * "40%"), raised to that boundary. The database CHECK derives the band from the RAW score while the UI rounds half up
 * first; snapping (< 0.5 points) makes both agree, so the stored band is always the band the student sees.
 */
export function storableMasteryScore(score: number): number {
  const value = roundHalfUp(clamp(score, 0, 100), 2);
  const whole = roundHalfUp(value);
  for (const threshold of BAND_THRESHOLDS) {
    if (value < threshold && whole >= threshold) return threshold;
  }
  return value;
}

/** The fields of a TopicMastery row the mastery maths reads. */
export interface MasteryRowFields {
  score: number;
  questionsAttempted: number;
  questionsCorrect: number;
  recentAccuracy: number | null;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  currentDifficulty: number;
  lastPracticedAt: Date | null;
  nextReviewAt: Date | null;
}

/** Pure-core state of a row; null when the row has no evidence yet ("topic not started"). */
export function masteryStateFromRow(row: MasteryRowFields, now: Date): TopicMasteryState | null {
  if (row.questionsAttempted <= 0) return null;
  const lastPracticedAt = row.lastPracticedAt ?? now;
  return {
    score: row.score,
    evidenceCount: row.questionsAttempted,
    recentAccuracy: row.recentAccuracy ?? row.questionsCorrect / row.questionsAttempted,
    consecutiveCorrect: row.consecutiveCorrect,
    consecutiveIncorrect: row.consecutiveIncorrect,
    currentDifficulty: toDifficulty(row.currentDifficulty),
    lastPracticedAt,
    nextReviewAt: row.nextReviewAt ?? lastPracticedAt,
  };
}

/**
 * When a topic enters / leaves remediation (§11 "repeatedly wrong: reduce difficulty, explain, recommend a lesson"):
 * starts after `difficultyDownStreak` consecutive misses, or while WEAK with 3+ answers; clears once the topic reaches
 * COMPETENT or after `difficultyUpStreak` consecutive correct answers.
 */
export function remediationStartedAt(previous: Date | null, state: TopicMasteryState, at: Date): Date | null {
  const band = masteryBandFromScore(state.score);
  const recovered = state.score >= MASTERY_BAND_MIN_SCORE.COMPETENT || state.consecutiveCorrect >= DEFAULT_MASTERY_CONFIG.difficultyUpStreak;
  if (recovered) return null;
  const struggling = state.consecutiveIncorrect >= DEFAULT_MASTERY_CONFIG.difficultyDownStreak || (band === "WEAK" && state.evidenceCount >= 3);
  if (struggling) return previous ?? at;
  return previous;
}

/** A topic node of one syllabus version, as scope and rollup computations need it. */
export interface ScopeTopic {
  id: string;
  parentId: string | null;
  kind: TopicKind;
  depth: number;
  path: string;
  sortOrder: number;
  code: string | null;
  name: string;
  isOptional: boolean;
  examYearFrom: number | null;
  examYearTo: number | null;
}

/** Enrolment-specific scope rules (route papers, optional-topic choices, exam year). */
export interface ScopeRules {
  /** Components of the enrolment's route; null = no route restriction. */
  routeComponentIds: ReadonlySet<string> | null;
  /** TopicComponent links (topicId → componentIds); a topic without links inherits its nearest linked ancestor's. */
  topicComponents: ReadonlyMap<string, readonly string[]>;
  /** EnrollmentTopicChoice topic ids. */
  chosenTopicIds: ReadonlySet<string>;
  /** Target ExamSession.year; null = no exam-year filter. */
  examYear: number | null;
}

/** Leaf topics (no children) in tree order. */
export function leafTopicIds(topics: readonly ScopeTopic[]): string[] {
  const parents = new Set(topics.map((t) => t.parentId).filter((id): id is string => id !== null));
  return topics.filter((t) => !parents.has(t.id)).map((t) => t.id);
}

/** In-scope leaf topics (module header) in tree order. */
export function inScopeLeafTopicIds(topics: readonly ScopeTopic[], rules: ScopeRules): string[] {
  const byId = new Map(topics.map((t) => [t.id, t]));
  return leafTopicIds(topics).filter((leafId) => {
    const leaf = byId.get(leafId);
    if (!leaf) return false;
    const chain = [leaf, ...ancestorIdsFromPath(leaf.path).reverse().flatMap((id) => (byId.get(id) ? [byId.get(id) as ScopeTopic] : []))];
    for (const node of chain) {
      if (node.isOptional && !rules.chosenTopicIds.has(node.id)) return false;
      if (rules.examYear !== null) {
        if (node.examYearFrom !== null && rules.examYear < node.examYearFrom) return false;
        if (node.examYearTo !== null && rules.examYear > node.examYearTo) return false;
      }
    }
    if (rules.routeComponentIds !== null) {
      const linked = chain.find((node) => (rules.topicComponents.get(node.id)?.length ?? 0) > 0);
      if (linked) {
        const components = rules.topicComponents.get(linked.id) ?? [];
        if (!components.some((id) => rules.routeComponentIds?.has(id))) return false;
      }
    }
    return true;
  });
}

/** Mastery row facts used by rollups and subject progress. */
export interface MasteryRollupRow extends MasteryRowFields {
  topicId: string;
  isLeaf: boolean;
  marksAwarded: number;
  marksAvailable: number;
  firstPracticedAt: Date | null;
  remediationStartedAt: Date | null;
  seededByDiagnostic: boolean;
}

/** Computed values of an ancestor (rollup) row. */
export interface AncestorRollup {
  topicId: string;
  score: number;
  band: MasteryBand;
  questionsAttempted: number;
  questionsCorrect: number;
  marksAwarded: number;
  marksAvailable: number;
  recentAccuracy: number | null;
  currentDifficulty: number;
  firstPracticedAt: Date | null;
  lastPracticedAt: Date | null;
  nextReviewAt: Date | null;
  remediationStartedAt: Date | null;
  seededByDiagnostic: boolean;
  /** Descendant leaves with evidence. */
  leavesWithEvidence: number;
}

const minDate = (a: Date | null, b: Date | null) => (a === null ? b : b === null ? a : a.getTime() <= b.getTime() ? a : b);
const maxDate = (a: Date | null, b: Date | null) => (a === null ? b : b === null ? a : a.getTime() >= b.getTime() ? a : b);

/**
 * Rollup rows for every non-leaf topic with at least one descendant leaf row that has evidence (module header).
 * Pure; `leafRows` holds only rows with `isLeaf = true`.
 */
export function rollupAncestorMastery(topics: readonly ScopeTopic[], leafRows: ReadonlyMap<string, MasteryRollupRow>): Map<string, AncestorRollup> {
  const byId = new Map(topics.map((t) => [t.id, t]));
  interface Acc {
    weight: number;
    scoreSum: number;
    difficultySum: number;
    accuracyWeight: number;
    accuracySum: number;
    row: Omit<AncestorRollup, "score" | "band" | "recentAccuracy" | "currentDifficulty">;
  }
  const accs = new Map<string, Acc>();
  const window = DEFAULT_MASTERY_CONFIG.evidenceWindow;
  for (const leaf of leafRows.values()) {
    if (!leaf.isLeaf || leaf.questionsAttempted <= 0) continue;
    const topic = byId.get(leaf.topicId);
    if (!topic) continue;
    const weight = Math.min(leaf.questionsAttempted, window);
    for (const ancestorId of ancestorIdsFromPath(topic.path)) {
      if (!byId.has(ancestorId)) continue;
      const acc =
        accs.get(ancestorId) ??
        ({
          weight: 0,
          scoreSum: 0,
          difficultySum: 0,
          accuracyWeight: 0,
          accuracySum: 0,
          row: {
            topicId: ancestorId,
            questionsAttempted: 0,
            questionsCorrect: 0,
            marksAwarded: 0,
            marksAvailable: 0,
            firstPracticedAt: null,
            lastPracticedAt: null,
            nextReviewAt: null,
            remediationStartedAt: null,
            seededByDiagnostic: false,
            leavesWithEvidence: 0,
          },
        } satisfies Acc);
      acc.weight += weight;
      acc.scoreSum += weight * leaf.score;
      acc.difficultySum += weight * leaf.currentDifficulty;
      if (leaf.recentAccuracy !== null) {
        acc.accuracyWeight += weight;
        acc.accuracySum += weight * leaf.recentAccuracy;
      }
      acc.row.questionsAttempted += leaf.questionsAttempted;
      acc.row.questionsCorrect += leaf.questionsCorrect;
      acc.row.marksAwarded += leaf.marksAwarded;
      acc.row.marksAvailable += leaf.marksAvailable;
      acc.row.firstPracticedAt = minDate(acc.row.firstPracticedAt, leaf.firstPracticedAt);
      acc.row.lastPracticedAt = maxDate(acc.row.lastPracticedAt, leaf.lastPracticedAt);
      acc.row.nextReviewAt = minDate(acc.row.nextReviewAt, leaf.nextReviewAt);
      acc.row.remediationStartedAt = minDate(acc.row.remediationStartedAt, leaf.remediationStartedAt);
      acc.row.seededByDiagnostic ||= leaf.seededByDiagnostic;
      acc.row.leavesWithEvidence += 1;
      accs.set(ancestorId, acc);
    }
  }
  const out = new Map<string, AncestorRollup>();
  for (const [topicId, acc] of accs) {
    const score = storableMasteryScore(acc.scoreSum / acc.weight);
    out.set(topicId, {
      ...acc.row,
      score,
      band: masteryBandFromScore(score),
      recentAccuracy: acc.accuracyWeight > 0 ? roundHalfUp(clamp(acc.accuracySum / acc.accuracyWeight, 0, 1), 3) : null,
      currentDifficulty: toDifficulty(acc.difficultySum / acc.weight),
    });
  }
  return out;
}

/** Facts about marked tests / mocks in a subject (AssessmentAttempt aggregates). */
export interface AssessmentFacts {
  completed: number;
  averagePercent: number | null;
  mocksCompleted: number;
  lastMockPercent: number | null;
  bestMockPercent: number | null;
  averageMockPercent: number | null;
  lastMockAt: Date | null;
}

export interface SubjectRollupInput {
  inScopeLeafIds: readonly string[];
  /** Every leaf of the pinned version (evidence totals count all of them). */
  allLeafIds: readonly string[];
  /** Leaf rows of the pinned version by topic id. */
  leafRows: ReadonlyMap<string, MasteryRollupRow>;
  /** Effective lessons per in-scope leaf (own tags, else the nearest tagged ancestor's) with completion. */
  lessonsByLeaf: ReadonlyMap<string, readonly LessonRef[]>;
  assessments: AssessmentFacts;
  studySeconds: number;
  /** Bands of the grade scheme used for the predicted grade (null = no scheme configured). */
  gradeBands: readonly { grade: string; minPercent: number; isPass: boolean }[] | null;
}

/** SubjectProgress values (formula version "progress@1"). */
export interface SubjectRollup {
  progressPercent: number;
  syllabusCoveragePercent: number;
  averageScorePercent: number | null;
  lastMockPercent: number | null;
  bestMockPercent: number | null;
  averageMockPercent: number | null;
  readinessPercent: number | null;
  topicsTotal: number;
  topicsStarted: number;
  topicsCompleted: number;
  topicsMastered: number;
  weakTopicsCount: number;
  lessonsTotal: number;
  lessonsCompleted: number;
  questionsAttempted: number;
  questionsCorrect: number;
  marksAwarded: number;
  marksAvailable: number;
  assessmentsCompleted: number;
  mockExamsCompleted: number;
  studySeconds: number;
  predictedGrade: string | null;
  predictedPass: boolean | null;
  lastMockAt: Date | null;
}

/**
 * SubjectProgress from the facts (pure). Every value is computed from evidence; anything without evidence is null or
 * 0 (§50): readiness needs 3 assessed topics or a mock; the predicted grade needs a marked mock and a grade scheme.
 */
export function computeSubjectRollup(input: SubjectRollupInput): SubjectRollup {
  const hasEvidence = (id: string) => (input.leafRows.get(id)?.questionsAttempted ?? 0) > 0;
  let started = 0;
  let completed = 0;
  let mastered = 0;
  let weak = 0;
  let scoreSum = 0;
  let assessed = 0;
  let assessedScoreSum = 0;
  const lessonIds = new Set<string>();
  const completedLessonIds = new Set<string>();
  for (const id of input.inScopeLeafIds) {
    const row = input.leafRows.get(id);
    const evidence = hasEvidence(id);
    const lessons = input.lessonsByLeaf.get(id) ?? [];
    for (const lesson of lessons) {
      lessonIds.add(lesson.lessonId);
      if (lesson.completed) completedLessonIds.add(lesson.lessonId);
    }
    const lessonsCompleted = lessons.filter((l) => l.completed).length;
    if (evidence || lessonsCompleted > 0) started += 1;
    if (evidence && row) {
      scoreSum += row.score;
      assessed += 1;
      assessedScoreSum += row.score;
      const band = masteryBandFromScore(row.score);
      if (band === "MASTERED") mastered += 1;
      if (band === "WEAK" || band === "DEVELOPING") weak += 1;
    }
    if (isTopicCompleted({ id, mastery: evidence && row ? row.score : null, lessonsCompleted, lessonsTotal: lessons.length })) completed += 1;
  }
  let questionsAttempted = 0;
  let questionsCorrect = 0;
  let marksAwarded = 0;
  let marksAvailable = 0;
  for (const id of input.allLeafIds) {
    const row = input.leafRows.get(id);
    if (!row) continue;
    questionsAttempted += row.questionsAttempted;
    questionsCorrect += Math.min(row.questionsCorrect, row.questionsAttempted);
    marksAvailable += row.marksAvailable;
    marksAwarded += Math.min(row.marksAwarded, row.marksAvailable);
  }
  const total = input.inScopeLeafIds.length;
  const progressPercent = total > 0 ? round1(scoreSum / total) : 0;
  const syllabusCoveragePercent = total > 0 ? round1((started * 100) / total) : 0;
  const a = input.assessments;
  const assessmentsCompleted = Math.max(a.completed, a.mocksCompleted);

  let readinessPercent: number | null = null;
  if (started > 0 && (assessed >= 3 || a.mocksCompleted > 0)) {
    readinessPercent = round1(clamp(0.3 * syllabusCoveragePercent + 0.4 * progressPercent + 0.3 * (a.averageMockPercent ?? progressPercent), 0, 100));
  }
  let predictedGrade: string | null = null;
  let predictedPass: boolean | null = null;
  if (input.gradeBands && input.gradeBands.length > 0 && a.mocksCompleted > 0 && a.averageMockPercent !== null) {
    const masteryMean = assessed > 0 ? assessedScoreSum / assessed : a.averageMockPercent;
    const blend = round1(0.7 * a.averageMockPercent + 0.3 * masteryMean);
    const grade = estimateGrade(blend, input.gradeBands);
    if (grade !== null) {
      predictedGrade = grade;
      predictedPass = input.gradeBands.find((b) => b.grade === grade)?.isPass ?? null;
      if (predictedPass === null) predictedGrade = null;
    }
  }
  return {
    progressPercent: clamp(progressPercent, 0, 100),
    syllabusCoveragePercent: clamp(syllabusCoveragePercent, 0, 100),
    averageScorePercent: a.averagePercent === null ? null : clamp(round1(a.averagePercent), 0, 100),
    lastMockPercent: a.lastMockPercent,
    bestMockPercent: a.bestMockPercent,
    averageMockPercent: a.averageMockPercent === null ? null : clamp(round1(a.averageMockPercent), 0, 100),
    readinessPercent,
    topicsTotal: total,
    topicsStarted: started,
    topicsCompleted: completed,
    topicsMastered: mastered,
    weakTopicsCount: weak,
    lessonsTotal: lessonIds.size,
    lessonsCompleted: completedLessonIds.size,
    questionsAttempted,
    questionsCorrect,
    marksAwarded,
    marksAvailable,
    assessmentsCompleted,
    mockExamsCompleted: a.mocksCompleted,
    studySeconds: Math.max(0, Math.floor(input.studySeconds)),
    predictedGrade,
    predictedPass,
    lastMockAt: a.lastMockAt,
  };
}

/** SubjectProgress.recommendations item (schema doc shape). */
export interface ProgressRecommendation {
  kind: "LESSON" | "PRACTICE" | "TOPIC_TEST" | "FLASHCARDS" | "REVIEW";
  topicId: string;
  lessonId?: string;
  assessmentId?: string;
  questionCount?: number;
  minutes?: number;
  reason: StudyPlanItemReason;
}

const REASON_MAP: Readonly<Record<Recommendation["reason"], StudyPlanItemReason>> = {
  NOT_STARTED: "NEW_TOPIC",
  CONCEPT_GAP: "WEAK_TOPIC",
  REPEATED_ERRORS: "WEAK_TOPIC",
  WEAK_TOPIC: "WEAK_TOPIC",
  BUILD_MASTERY: "MAINTENANCE",
  COMPLETE_LESSONS: "MAINTENANCE",
  RETEST_DUE: "SPACED_REVIEW",
  RETEST_SCHEDULED: "SPACED_REVIEW",
  STRETCH: "EXAM_PREPARATION",
  EXAM_LEVEL_READY: "EXAM_PREPARATION",
};

/** Maps adaptive recommendations onto the cached SubjectProgress.recommendations shape. */
export function toProgressRecommendations(recommendations: readonly Recommendation[]): ProgressRecommendation[] {
  return recommendations.flatMap((rec): ProgressRecommendation[] => {
    const reason = REASON_MAP[rec.reason];
    switch (rec.kind) {
      case "STUDY_LESSON":
        return [{ kind: "LESSON", topicId: rec.topicId, lessonId: rec.lessonId, reason }];
      case "PRACTICE":
        return [{ kind: "PRACTICE", topicId: rec.topicId, questionCount: rec.count, reason }];
      case "RETEST":
        return [{ kind: "REVIEW", topicId: rec.topicId, questionCount: 10, reason }];
      case "EXAM_PRACTICE":
        return rec.topicIds[0] ? [{ kind: "TOPIC_TEST", topicId: rec.topicIds[0], reason }] : [];
    }
  });
}

// =====================================================================================================================
// Syllabus structure (published versions are structurally frozen by trigger, so a short per-instance cache is safe)
// =====================================================================================================================

interface SyllabusStructure {
  syllabusId: string;
  /** Tree order. */
  topics: ScopeTopic[];
  byId: Map<string, ScopeTopic>;
  leafIds: string[];
  /** TopicComponent links. */
  topicComponents: Map<string, string[]>;
  defaultRouteId: string | null;
  /** SyllabusRouteComponent per route. */
  routeComponents: Map<string, Set<string>>;
}

const loadSyllabusStructure = memoizeAsync(
  async (syllabusId: string): Promise<SyllabusStructure> => {
    const [rows, links, routes] = await Promise.all([
      db.topic.findMany({
        where: { syllabusId },
        select: {
          id: true,
          parentId: true,
          kind: true,
          depth: true,
          path: true,
          sortOrder: true,
          code: true,
          name: true,
          isOptional: true,
          examYearFrom: true,
          examYearTo: true,
        },
      }),
      db.topicComponent.findMany({ where: { topic: { syllabusId } }, select: { topicId: true, componentId: true } }),
      db.syllabusRoute.findMany({ where: { syllabusId }, select: { id: true, isDefault: true, componentLinks: { select: { componentId: true } } } }),
    ]);
    const order = new Map(flattenTopicTree(buildTopicTree(rows)).map((node, index) => [node.id, index]));
    const topics = rows.filter((row) => order.has(row.id)).sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    const topicComponents = new Map<string, string[]>();
    for (const link of links) topicComponents.set(link.topicId, [...(topicComponents.get(link.topicId) ?? []), link.componentId]);
    return {
      syllabusId,
      topics,
      byId: new Map(topics.map((t) => [t.id, t])),
      leafIds: leafTopicIds(topics),
      topicComponents,
      defaultRouteId: routes.find((r) => r.isDefault)?.id ?? null,
      routeComponents: new Map(routes.map((r) => [r.id, new Set(r.componentLinks.map((l) => l.componentId))])),
    };
  },
  { ttlMs: 5 * 60_000, maxEntries: 200 },
);

/** Drops cached syllabus structures on this instance (tests, version publishing tools). */
export function invalidateSyllabusStructureCache(): void {
  loadSyllabusStructure.clear();
}

function scopeRulesFor(
  structure: SyllabusStructure,
  enrollment: { routeId: string | null; examYear: number | null },
  chosenTopicIds: readonly string[],
): ScopeRules {
  const routeId = enrollment.routeId ?? structure.defaultRouteId;
  const routeComponents = routeId ? structure.routeComponents.get(routeId) : undefined;
  return {
    routeComponentIds: routeComponents && routeComponents.size > 0 ? routeComponents : null,
    topicComponents: structure.topicComponents,
    chosenTopicIds: new Set(chosenTopicIds),
    examYear: enrollment.examYear,
  };
}

interface LessonLink {
  topicId: string;
  lessonId: string;
  title: string;
  sortOrder: number;
}

async function loadLessonLinks(client: DbClient, syllabusId: string): Promise<LessonLink[]> {
  const rows = await client.lessonTopic.findMany({
    where: { topic: { syllabusId }, lesson: { status: "PUBLISHED", draftOfId: null } },
    select: { topicId: true, sortOrder: true, lesson: { select: { id: true, title: true } } },
    orderBy: [{ sortOrder: "asc" }, { lessonId: "asc" }],
  });
  return rows.map((r) => ({ topicId: r.topicId, lessonId: r.lesson.id, title: r.lesson.title, sortOrder: r.sortOrder }));
}

/** Lessons of a topic: its own tags, else the nearest ancestor's (lessons are often tagged at TOPIC level). */
function effectiveLessons(structure: SyllabusStructure, byTopic: ReadonlyMap<string, LessonLink[]>, topicId: string): LessonLink[] {
  const own = byTopic.get(topicId);
  if (own && own.length > 0) return own;
  const topic = structure.byId.get(topicId);
  if (!topic) return [];
  for (const ancestorId of ancestorIdsFromPath(topic.path).reverse()) {
    const links = byTopic.get(ancestorId);
    if (links && links.length > 0) return links;
  }
  return [];
}

function groupLessons(links: readonly LessonLink[]): Map<string, LessonLink[]> {
  const out = new Map<string, LessonLink[]>();
  for (const link of links) out.set(link.topicId, [...(out.get(link.topicId) ?? []), link]);
  return out;
}

// =====================================================================================================================
// Mastery writes (per answer, in the caller's transaction)
// =====================================================================================================================

const MASTERY_ROW_SELECT = {
  topicId: true,
  isLeaf: true,
  score: true,
  questionsAttempted: true,
  questionsCorrect: true,
  marksAwarded: true,
  marksAvailable: true,
  recentAccuracy: true,
  consecutiveCorrect: true,
  consecutiveIncorrect: true,
  currentDifficulty: true,
  firstPracticedAt: true,
  lastPracticedAt: true,
  nextReviewAt: true,
  remediationStartedAt: true,
  seededByDiagnostic: true,
  band: true,
  topicKind: true,
  topicDepth: true,
} as const satisfies Prisma.TopicMasterySelect;

type MasteryRow = Prisma.TopicMasteryGetPayload<{ select: typeof MASTERY_ROW_SELECT }>;

/** One final mark to fold into a topic's mastery. */
export interface MasteryOutcome extends AttemptOutcome {
  topicId: string;
}

export interface ApplyMasteryInput {
  userId: string;
  subjectId: string;
  /** The enrolment's pinned version: outcomes for topics of another version are ignored. */
  syllabusId: string;
  outcomes: readonly MasteryOutcome[];
  timeZone?: string;
  /** Starting difficulty for topics without evidence (enrolment ability). */
  initialDifficulty?: Difficulty;
  /** Evidence comes from a diagnostic (§52): rows are flagged `seededByDiagnostic`. */
  diagnostic?: boolean;
  now?: Date;
}

/** Mastery of one topic after an update. */
export interface MasteryChange {
  topicId: string;
  before: { score: number; band: MasteryBand } | null;
  score: number;
  band: MasteryBand;
  currentDifficulty: number;
  nextReviewAt: Date;
}

/** Answers after which a diagnostic-seeded score is treated as practice-backed (the core's top confidence cap). */
const DIAGNOSTIC_CONFIDENCE_EVIDENCE = 8;

/**
 * Folds final marks into the student's TopicMastery rows (§11) inside the caller's transaction: rows are created when
 * missing (ON CONFLICT DO NOTHING), locked in id order (no deadlocks between concurrent sessions), updated with the
 * pure `updateTopicMastery` in answer order, and written once per topic. Returns the change per topic.
 */
export async function applyMasteryOutcomes(tx: DbClient, input: ApplyMasteryInput): Promise<Map<string, MasteryChange>> {
  const changes = new Map<string, MasteryChange>();
  if (input.outcomes.length === 0) return changes;
  const now = input.now ?? new Date();
  const timeZone = safeZone(input.timeZone);
  const initialDifficulty = input.initialDifficulty ?? DEFAULT_MASTERY_CONFIG.initialDifficulty;
  const config = { timeZone, initialDifficulty };
  const topicIds = [...new Set(input.outcomes.map((o) => o.topicId))];

  const topics = await tx.topic.findMany({
    where: { id: { in: topicIds }, syllabusId: input.syllabusId },
    select: { id: true, kind: true, depth: true, _count: { select: { children: true } } },
  });
  if (topics.length === 0) return changes;
  const ids = topics.map((t) => t.id).sort();
  await tx.topicMastery.createMany({
    data: topics.map((t) => ({
      userId: input.userId,
      topicId: t.id,
      subjectId: input.subjectId,
      syllabusId: input.syllabusId,
      topicKind: t.kind,
      topicDepth: t.depth,
      isLeaf: t._count.children === 0,
      currentDifficulty: initialDifficulty,
      createdAt: now,
    })),
    skipDuplicates: true,
  });
  await tx.$queryRaw`SELECT 1 FROM "TopicMastery" WHERE "userId" = ${input.userId}::uuid AND "topicId" = ANY(${ids}::uuid[]) ORDER BY "topicId" FOR UPDATE`;
  const rows = await tx.topicMastery.findMany({ where: { userId: input.userId, topicId: { in: ids } }, select: MASTERY_ROW_SELECT });
  const byTopic = new Map<string, MasteryRow>(rows.map((r) => [r.topicId, r]));

  const ordered = [...input.outcomes].filter((o) => byTopic.has(o.topicId)).sort((a, b) => a.answeredAt.getTime() - b.answeredAt.getTime());
  const touched = new Map<string, { row: MasteryRow; before: MasteryChange["before"] }>();
  for (const outcome of ordered) {
    const row = byTopic.get(outcome.topicId) as MasteryRow;
    if (!touched.has(row.topicId)) {
      touched.set(row.topicId, { row, before: row.questionsAttempted > 0 ? { score: row.score, band: row.band } : null });
    }
    const prev = masteryStateFromRow(row, now);
    const next = updateTopicMastery(prev, outcome, config);
    const score = storableMasteryScore(next.score);
    const fullMarks = outcome.marksAwarded >= outcome.marksAvailable ? 1 : 0;
    const attempted = row.questionsAttempted + 1;
    const updated: MasteryRow = {
      ...row,
      score,
      band: masteryBandFromScore(score),
      questionsAttempted: attempted,
      questionsCorrect: row.questionsCorrect + fullMarks,
      marksAwarded: row.marksAwarded + Math.max(0, Math.min(outcome.marksAvailable, Math.floor(outcome.marksAwarded))),
      marksAvailable: row.marksAvailable + outcome.marksAvailable,
      recentAccuracy: next.recentAccuracy,
      consecutiveCorrect: next.consecutiveCorrect,
      consecutiveIncorrect: next.consecutiveIncorrect,
      currentDifficulty: next.currentDifficulty,
      firstPracticedAt: minDate(row.firstPracticedAt, outcome.answeredAt),
      lastPracticedAt: next.lastPracticedAt,
      nextReviewAt: next.nextReviewAt,
      remediationStartedAt: remediationStartedAt(row.remediationStartedAt, { ...next, score }, outcome.answeredAt),
      seededByDiagnostic: input.diagnostic === true ? true : row.seededByDiagnostic && attempted < DIAGNOSTIC_CONFIDENCE_EVIDENCE,
    };
    byTopic.set(row.topicId, updated);
    const entry = touched.get(row.topicId);
    if (entry) entry.row = updated;
  }

  for (const [topicId, { row, before }] of touched) {
    await tx.topicMastery.update({
      where: { userId_topicId: { userId: input.userId, topicId } },
      data: {
        score: row.score,
        band: row.band,
        questionsAttempted: row.questionsAttempted,
        questionsCorrect: row.questionsCorrect,
        marksAwarded: row.marksAwarded,
        marksAvailable: row.marksAvailable,
        recentAccuracy: row.recentAccuracy,
        consecutiveCorrect: Math.min(32_767, row.consecutiveCorrect),
        consecutiveIncorrect: Math.min(32_767, row.consecutiveIncorrect),
        currentDifficulty: row.currentDifficulty,
        firstPracticedAt: row.firstPracticedAt,
        lastPracticedAt: row.lastPracticedAt,
        nextReviewAt: row.nextReviewAt,
        remediationStartedAt: row.remediationStartedAt,
        seededByDiagnostic: row.seededByDiagnostic,
      },
    });
    changes.set(topicId, {
      topicId,
      before,
      score: row.score,
      band: row.band,
      currentDifficulty: row.currentDifficulty,
      nextReviewAt: row.nextReviewAt ?? now,
    });
  }
  return changes;
}

/** Mastery states (rows with evidence) of a student's topics, for adaptive selection and recommendations. */
export async function loadMasteryStates(client: DbClient, userId: string, topicIds: readonly string[], now: Date = new Date()): Promise<Map<string, TopicMasteryState>> {
  if (topicIds.length === 0) return new Map();
  const rows = await client.topicMastery.findMany({
    where: { userId, topicId: { in: [...new Set(topicIds)] }, questionsAttempted: { gt: 0 } },
    select: MASTERY_ROW_SELECT,
  });
  const out = new Map<string, TopicMasteryState>();
  for (const row of rows) {
    const state = masteryStateFromRow(row, now);
    if (state) out.set(row.topicId, state);
  }
  return out;
}

// =====================================================================================================================
// Subject rollup (SubjectProgress + ancestor TopicMastery rows)
// =====================================================================================================================

const GRADED_MODES = ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM", "MOCK_EXAM", "DIAGNOSTIC"] as const;
const CLOSED_SCORED_STATUSES = ["MARKED", "AWAITING_MARKING"] as const;

async function loadAssessmentFacts(client: DbClient, userId: string, subjectId: string): Promise<AssessmentFacts> {
  // Sequential: the client may be a transaction (one connection).
  const graded = await client.assessmentAttempt.aggregate({
    where: { userId, subjectId, mode: { in: [...GRADED_MODES] }, status: { in: [...CLOSED_SCORED_STATUSES] }, percentage: { not: null } },
    _count: { _all: true },
    _avg: { percentage: true },
  });
  const mocks = await client.assessmentAttempt.aggregate({
    where: { userId, subjectId, mode: "MOCK_EXAM", status: { in: [...CLOSED_SCORED_STATUSES] }, percentage: { not: null } },
    _count: { _all: true },
    _avg: { percentage: true },
    _max: { percentage: true },
  });
  const lastMock = await client.assessmentAttempt.findFirst({
    where: { userId, subjectId, mode: "MOCK_EXAM", status: { in: [...CLOSED_SCORED_STATUSES] }, percentage: { not: null } },
    orderBy: [{ startedAt: "desc" }],
    select: { percentage: true, submittedAt: true, startedAt: true },
  });
  return {
    completed: graded._count._all,
    averagePercent: graded._avg.percentage,
    mocksCompleted: mocks._count._all,
    averageMockPercent: mocks._avg.percentage,
    bestMockPercent: mocks._max.percentage,
    lastMockPercent: lastMock?.percentage ?? null,
    lastMockAt: lastMock ? (lastMock.submittedAt ?? lastMock.startedAt) : null,
  };
}

async function gradeBandsFor(enrollment: {
  subject: { qualificationId: string };
  syllabus: { gradeSchemeId: string | null };
  route: { gradeSchemeId: string | null } | null;
}): Promise<{ grade: string; minPercent: number; isPass: boolean }[] | null> {
  const fallback = await getGradeScheme(enrollment.subject.qualificationId);
  const schemeId = resolveGradeSchemeId({
    routeGradeSchemeId: enrollment.route?.gradeSchemeId ?? null,
    syllabusGradeSchemeId: enrollment.syllabus.gradeSchemeId,
    qualificationDefaultId: fallback?.id ?? null,
  });
  if (!schemeId) return null;
  const scheme = schemeId === fallback?.id ? fallback : await getGradeSchemeById(schemeId);
  return scheme ? scheme.bands.map((b) => ({ grade: b.grade, minPercent: b.minPercent, isPass: b.isPass })) : null;
}

/** What {@link refreshSubjectProgress} wrote. */
export interface SubjectProgressSnapshot extends SubjectRollup {
  userId: string;
  subjectId: string;
  syllabusId: string;
  recommendations: ProgressRecommendation[];
  computedAt: Date;
}

/**
 * Recomputes the student's SubjectProgress row and the ancestor (rollup) TopicMastery rows of the pinned syllabus
 * version from the facts (§6, §7; ARCHITECTURE §4.7 `progress.rollupSubject`). Called in the same transaction as the
 * answer / submit that changed them (and safe to call from a job). Returns null when the student is not enrolled.
 */
export async function refreshSubjectProgress(
  tx: DbClient,
  userId: string,
  subjectId: string,
  options: { now?: Date; activityAt?: Date | null } = {},
): Promise<SubjectProgressSnapshot | null> {
  const now = options.now ?? new Date();
  const enrollment = await tx.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId, subjectId } },
    select: {
      id: true,
      syllabusId: true,
      routeId: true,
      subject: { select: { qualificationId: true } },
      syllabus: { select: { gradeSchemeId: true } },
      route: { select: { gradeSchemeId: true } },
      targetExamSession: { select: { year: true } },
      topicChoices: { select: { topicId: true } },
    },
  });
  if (!enrollment) return null;
  const structure = await loadSyllabusStructure(enrollment.syllabusId);
  const rules = scopeRulesFor(
    structure,
    { routeId: enrollment.routeId, examYear: enrollment.targetExamSession?.year ?? null },
    enrollment.topicChoices.map((c) => c.topicId),
  );
  const inScope = inScopeLeafTopicIds(structure.topics, rules);

  const masteryRows = await tx.topicMastery.findMany({ where: { userId, subjectId, syllabusId: enrollment.syllabusId }, select: MASTERY_ROW_SELECT });
  const links = await loadLessonLinks(tx, enrollment.syllabusId);
  const facts = await loadAssessmentFacts(tx, userId, subjectId);
  const study = await tx.studySession.aggregate({ where: { userId, subjectId }, _sum: { durationSeconds: true } });
  const gradeBands = await gradeBandsFor(enrollment);

  const leafRows = new Map<string, MasteryRollupRow>();
  const existing = new Map<string, MasteryRow>();
  for (const row of masteryRows) {
    existing.set(row.topicId, row);
    if (row.isLeaf) leafRows.set(row.topicId, row);
  }

  // Ancestor rollup rows (TOPIC / SECTION bars, §7).
  const ancestors = rollupAncestorMastery(structure.topics, leafRows);
  const missing = [...ancestors.keys()].filter((id) => !existing.has(id));
  if (missing.length > 0) {
    await tx.topicMastery.createMany({
      data: missing.flatMap((id) => {
        const topic = structure.byId.get(id);
        return topic
          ? [{ userId, topicId: id, subjectId, syllabusId: enrollment.syllabusId, topicKind: topic.kind, topicDepth: topic.depth, isLeaf: false, createdAt: now }]
          : [];
      }),
      skipDuplicates: true,
    });
  }
  for (const [topicId, rollup] of ancestors) {
    const current = existing.get(topicId);
    if (current && current.isLeaf) continue; // a leaf in this tree keeps its direct evidence
    const changed =
      !current ||
      current.score !== rollup.score ||
      current.questionsAttempted !== rollup.questionsAttempted ||
      current.marksAwarded !== rollup.marksAwarded ||
      current.currentDifficulty !== rollup.currentDifficulty ||
      (current.nextReviewAt?.getTime() ?? null) !== (rollup.nextReviewAt?.getTime() ?? null) ||
      (current.remediationStartedAt?.getTime() ?? null) !== (rollup.remediationStartedAt?.getTime() ?? null) ||
      current.seededByDiagnostic !== rollup.seededByDiagnostic;
    if (!changed) continue;
    await tx.topicMastery.update({
      where: { userId_topicId: { userId, topicId } },
      data: {
        score: rollup.score,
        band: rollup.band,
        questionsAttempted: rollup.questionsAttempted,
        questionsCorrect: Math.min(rollup.questionsCorrect, rollup.questionsAttempted),
        marksAwarded: Math.min(rollup.marksAwarded, rollup.marksAvailable),
        marksAvailable: rollup.marksAvailable,
        recentAccuracy: rollup.recentAccuracy,
        currentDifficulty: rollup.currentDifficulty,
        consecutiveCorrect: 0,
        consecutiveIncorrect: 0,
        firstPracticedAt: rollup.firstPracticedAt,
        lastPracticedAt: rollup.lastPracticedAt,
        nextReviewAt: rollup.nextReviewAt,
        remediationStartedAt: rollup.remediationStartedAt,
        seededByDiagnostic: rollup.seededByDiagnostic,
        isLeaf: false,
      },
    });
  }

  // Lessons (effective per leaf) with completion.
  const byTopic = groupLessons(links);
  const lessonIdsInScope = [...new Set(inScope.flatMap((id) => effectiveLessons(structure, byTopic, id).map((l) => l.lessonId)))];
  const completedRows =
    lessonIdsInScope.length > 0
      ? await tx.lessonProgress.findMany({ where: { userId, lessonId: { in: lessonIdsInScope }, status: "COMPLETED" }, select: { lessonId: true } })
      : [];
  const completedLessons = new Set(completedRows.map((r) => r.lessonId));
  const lessonsByLeaf = new Map<string, LessonRef[]>(
    inScope.map((id) => [id, effectiveLessons(structure, byTopic, id).map((l) => ({ lessonId: l.lessonId, completed: completedLessons.has(l.lessonId) }))]),
  );

  const rollup = computeSubjectRollup({
    inScopeLeafIds: inScope,
    allLeafIds: structure.leafIds,
    leafRows,
    lessonsByLeaf,
    assessments: facts,
    studySeconds: study._sum.durationSeconds ?? 0,
    gradeBands,
  });

  const states = new Map<string, TopicMasteryState>();
  for (const id of inScope) {
    const row = leafRows.get(id);
    const state = row ? masteryStateFromRow(row, now) : null;
    if (state) states.set(id, state);
  }
  const recommendations = toProgressRecommendations(recommendationsFor(states, lessonsByLeaf, now, { limit: 5 }));

  const lastPracticed = [...leafRows.values()].reduce<Date | null>((acc, row) => maxDate(acc, row.lastPracticedAt), null);
  const lastActivityAt = maxDate(lastPracticed, options.activityAt ?? null);
  const data = {
    lastActivityAt,
    lastMockAt: rollup.lastMockAt,
    computedAt: now,
    progressPercent: rollup.progressPercent,
    syllabusCoveragePercent: rollup.syllabusCoveragePercent,
    averageScorePercent: rollup.averageScorePercent,
    lastMockPercent: rollup.lastMockPercent,
    bestMockPercent: rollup.bestMockPercent,
    averageMockPercent: rollup.averageMockPercent,
    readinessPercent: rollup.readinessPercent,
    topicsTotal: rollup.topicsTotal,
    topicsStarted: rollup.topicsStarted,
    topicsCompleted: rollup.topicsCompleted,
    topicsMastered: rollup.topicsMastered,
    weakTopicsCount: rollup.weakTopicsCount,
    lessonsTotal: rollup.lessonsTotal,
    lessonsCompleted: rollup.lessonsCompleted,
    questionsAttempted: rollup.questionsAttempted,
    questionsCorrect: rollup.questionsCorrect,
    marksAwarded: rollup.marksAwarded,
    marksAvailable: rollup.marksAvailable,
    assessmentsCompleted: rollup.assessmentsCompleted,
    mockExamsCompleted: rollup.mockExamsCompleted,
    studySeconds: rollup.studySeconds,
    predictedGrade: rollup.predictedGrade,
    predictedPass: rollup.predictedPass,
    recommendations: recommendations as unknown as Prisma.InputJsonArray,
  };
  await tx.subjectProgress.createMany({ data: [{ userId, subjectId, createdAt: now, ...data }], skipDuplicates: true });
  await tx.subjectProgress.update({ where: { userId_subjectId: { userId, subjectId } }, data });
  return { ...rollup, userId, subjectId, syllabusId: enrollment.syllabusId, recommendations, computedAt: now };
}

// =====================================================================================================================
// Read models
// =====================================================================================================================

/** A topic with its mastery, for weak / strong lists (§6, §7). */
export interface TopicMasteryItem {
  topicId: string;
  name: string;
  subjectId: string;
  subjectName: string;
  score: number;
  band: MasteryBand;
}

/** A cached recommendation with names and an in-app link (§6 "Recommended: Mathematics / Quadratic Equations / 20 questions"). */
export interface RecommendedItem extends ProgressRecommendation {
  subjectId: string;
  subjectName: string;
  topicName: string | null;
  lessonTitle: string | null;
  href: string;
}

/** Exam countdown (§17): calendar days to the first exam day of the target session (Africa/Harare day boundaries). */
export interface ExamCountdown {
  examSessionId: string;
  name: string;
  startsOn: LocalDate;
  /** Last day of the session (student-local calendar date). */
  endsOn: LocalDate;
  /** Negative once the session has started (the dashboard then shows it as under way). */
  daysUntil: number;
  /** Dates not yet confirmed against the official timetable: label them "provisional". */
  isProvisional: boolean;
  /** Dev-seed session: never a real countdown (§50). */
  isDemo: boolean;
  subjectIds: string[];
}

export interface DashboardSubject {
  subjectId: string;
  name: string;
  slug: string;
  qualificationName: string;
  syllabusVersion: string;
  /** Null when SubjectProgress has not been computed yet. */
  progressPercent: number | null;
  syllabusCoveragePercent: number | null;
  topicsTotal: number;
  topicsCompleted: number;
  topicsRemaining: number;
  weakTopicsCount: number;
  questionsAttempted: number;
  accuracyPercent: number | null;
  averageScorePercent: number | null;
  lastMockPercent: number | null;
  /** Grade ESTIMATE from mocks + mastery (label it as an estimate). */
  predictedGrade: string | null;
  countdown: ExamCountdown | null;
}

export interface StudentDashboard {
  greeting: { name: string | null; partOfDay: "MORNING" | "AFTERNOON" | "EVENING" };
  today: LocalDate;
  timeZone: string;
  /** Nearest target exam across enrolments (else the student's onboarding target). */
  examCountdown: ExamCountdown | null;
  /**
   * The free diagnostic (§46, §52) until the first one is finished: OFFER (never taken), SKIPPED (skipped in
   * onboarding: a softer reminder). Null once a diagnostic is done, or without subjects to diagnose.
   */
  diagnosticOffer: "OFFER" | "SKIPPED" | null;
  overall: {
    /** Topic-weighted mean of subject progress; null without enrolments. */
    progressPercent: number | null;
    coveragePercent: number | null;
    topicsTotal: number;
    topicsCompleted: number;
    topicsRemaining: number;
  };
  subjects: DashboardSubject[];
  weakTopics: TopicMasteryItem[];
  strongTopics: TopicMasteryItem[];
  streak: { current: number; longest: number; status: "INACTIVE" | "AT_RISK" | "DONE_TODAY" };
  questionsAttempted: number;
  questionsCorrect: number;
  accuracyPercent: number | null;
  /** Mean of marked test / mock percentages; null when none. */
  averageScorePercent: number | null;
  recentMocks: { attemptId: string; subjectId: string; subjectName: string; title: string | null; percentage: number | null; gradeEstimate: string | null; isProvisional: boolean; submittedAt: Date | null }[];
  dailyTarget: { minutes: number; source: "PLAN" | "GOAL" | "DEFAULT"; minutesStudiedToday: number; goalMet: boolean };
  studyPlan: {
    planId: string;
    items: {
      id: string;
      subjectId: string;
      subjectName: string;
      topicId: string | null;
      topicName: string | null;
      lessonId: string | null;
      lessonTitle: string | null;
      assessmentId: string | null;
      assessmentTitle: string | null;
      activityType: string;
      reason: StudyPlanItemReason;
      targetMinutes: number;
      targetQuestions: number | null;
      status: string;
    }[];
  } | null;
  recommended: RecommendedItem[];
  xp: { total: number };
}

function partOfDay(now: Date, timeZone: string): "MORNING" | "AFTERNOON" | "EVENING" {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone }).format(now));
  if (hour < 12) return "MORNING";
  if (hour < 17) return "AFTERNOON";
  return "EVENING";
}

/** In-app link of a recommendation (adaptive practice with `origin=RECOMMENDATION`: `recommendationHref`). */
function hrefFor(rec: ProgressRecommendation, subjectId: string): string {
  return recommendationHref({ kind: rec.kind, topicId: rec.topicId, lessonId: rec.lessonId ?? null, questionCount: rec.questionCount ?? null }, subjectId);
}

function readRecommendations(raw: unknown): ProgressRecommendation[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (item): item is ProgressRecommendation =>
      typeof item === "object" && item !== null && typeof (item as { topicId?: unknown }).topicId === "string" && typeof (item as { kind?: unknown }).kind === "string",
  );
}

async function resolveRecommendationNames(
  client: DbClient,
  items: { rec: ProgressRecommendation; subjectId: string; subjectName: string }[],
): Promise<RecommendedItem[]> {
  const topicIds = [...new Set(items.map((i) => i.rec.topicId))];
  const lessonIds = [...new Set(items.flatMap((i) => (i.rec.lessonId ? [i.rec.lessonId] : [])))];
  const [topics, lessons] = await Promise.all([
    topicIds.length ? client.topic.findMany({ where: { id: { in: topicIds } }, select: { id: true, name: true } }) : Promise.resolve([]),
    lessonIds.length ? client.lesson.findMany({ where: { id: { in: lessonIds } }, select: { id: true, title: true } }) : Promise.resolve([]),
  ]);
  const topicName = new Map(topics.map((t) => [t.id, t.name]));
  const lessonTitle = new Map(lessons.map((l) => [l.id, l.title]));
  return items.map(({ rec, subjectId, subjectName }) => ({
    ...rec,
    subjectId,
    subjectName,
    topicName: topicName.get(rec.topicId) ?? null,
    lessonTitle: rec.lessonId ? (lessonTitle.get(rec.lessonId) ?? null) : null,
    href: hrefFor(rec, subjectId),
  }));
}

const SESSION_SELECT = { id: true, name: true, startsOn: true, endsOn: true, isProvisional: true, isDemo: true } as const;

/**
 * "Today's target" on the dashboard (§6, §16). With an active study plan it is the minutes planned for TODAY (the
 * day's items, which the planner sized to that weekday's availability); `StudyPlan.dailyTargetMinutes` is the weekly
 * average and is not today's target. A rest day, or a plan with nothing scheduled today, falls back to the student's own
 * daily goal, then the platform default. Pure.
 */
export function resolveDailyTarget(input: {
  /** Sum of today's plan items' minutes; null without an active plan. */
  plannedTodayMinutes: number | null;
  /** LearnerStats.dailyGoalMinutes (null = not set). */
  goalMinutes: number | null;
  /** The `study.defaults` daily goal. */
  defaultMinutes: number;
}): { minutes: number; source: "PLAN" | "GOAL" | "DEFAULT" } {
  if (input.plannedTodayMinutes !== null && input.plannedTodayMinutes > 0) return { minutes: input.plannedTodayMinutes, source: "PLAN" };
  if (input.goalMinutes !== null && input.goalMinutes > 0) return { minutes: input.goalMinutes, source: "GOAL" };
  return { minutes: input.defaultMinutes, source: "DEFAULT" };
}

async function profileOf(userId: string, actorZone: string | undefined) {
  const profile = await db.profile.findUnique({ where: { userId }, select: { displayName: true, firstName: true, timezone: true } });
  return { name: profile?.displayName?.trim() || profile?.firstName?.trim() || null, timeZone: safeZone(actorZone ?? profile?.timezone) };
}

/**
 * The student dashboard (§6): greeting, exam countdown (§17), overall and per-subject progress, topics completed /
 * remaining, weak and strong topics, streak, questions attempted, accuracy, average score, recent mock scores, today's
 * target and plan items, and recommended sessions. Values come from the rollup tables; nothing is invented (§50).
 *
 * @throws AppError FORBIDDEN for non-students.
 */
export async function getStudentDashboard(actor: ProgressActor, now: Date = new Date()): Promise<StudentDashboard> {
  assertOwnProgress(actor);
  const userId = actor.userId;
  const { name, timeZone } = await profileOf(userId, actor.timeZone);
  const today = localDateString(now, timeZone);

  const [enrollments, student, stats, todayActivity, plan] = await Promise.all([
    db.subjectEnrollment.findMany({
      where: { userId, status: "ACTIVE" },
      select: {
        subjectId: true,
        syllabusId: true,
        subject: { select: { name: true, slug: true, sortOrder: true, qualification: { select: { name: true } } } },
        syllabus: { select: { versionLabel: true } },
        targetExamSession: { select: SESSION_SELECT },
      },
      orderBy: [{ createdAt: "asc" }],
    }),
    db.student.findUnique({
      where: { userId },
      select: { targetExamSession: { select: SESSION_SELECT }, diagnosticCompletedAt: true, diagnosticSkippedAt: true },
    }),
    db.learnerStats.findUnique({ where: { userId } }),
    db.dailyActivity.findUnique({ where: { userId_date: { userId, date: dateColumnFromLocalDate(today) } }, select: { studySeconds: true, dailyGoalMet: true } }),
    db.studyPlan.findFirst({ where: { userId, status: "ACTIVE" }, select: { id: true } }),
  ]);
  const subjectIds = enrollments.map((e) => e.subjectId);
  const subjectName = new Map(enrollments.map((e) => [e.subjectId, e.subject.name]));

  const [progressRows, masteryRows, mocks, planItems] = await Promise.all([
    subjectIds.length ? db.subjectProgress.findMany({ where: { userId, subjectId: { in: subjectIds } } }) : Promise.resolve([]),
    enrollments.length
      ? db.topicMastery.findMany({
          where: {
            userId,
            topicKind: "TOPIC",
            questionsAttempted: { gt: 0 },
            OR: enrollments.map((e) => ({ subjectId: e.subjectId, syllabusId: e.syllabusId })),
          },
          select: { topicId: true, subjectId: true, score: true, band: true, topic: { select: { name: true } } },
        })
      : Promise.resolve([]),
    subjectIds.length
      ? db.assessmentAttempt.findMany({
          where: { userId, subjectId: { in: subjectIds }, mode: "MOCK_EXAM", status: { in: [...CLOSED_SCORED_STATUSES] } },
          orderBy: [{ startedAt: "desc" }],
          take: 5,
          select: { id: true, subjectId: true, percentage: true, gradeEstimate: true, pendingReviewCount: true, status: true, submittedAt: true, assessment: { select: { title: true } } },
        })
      : Promise.resolve([]),
    plan
      ? db.studyPlanItem.findMany({
          where: { planId: plan.id, date: dateColumnFromLocalDate(today) },
          orderBy: [{ sortOrder: "asc" }],
          select: {
            id: true,
            subjectId: true,
            topicId: true,
            lessonId: true,
            assessmentId: true,
            activityType: true,
            reason: true,
            targetMinutes: true,
            targetQuestions: true,
            status: true,
            subject: { select: { name: true } },
            topic: { select: { name: true } },
            lesson: { select: { title: true } },
            assessment: { select: { title: true } },
          },
        })
      : Promise.resolve([]),
  ]);
  const progressBySubject = new Map(progressRows.map((p) => [p.subjectId, p]));

  // Countdown (the header's rule, ./student-overview): nearest upcoming target session across enrolments, else the
  // onboarding target; when neither is upcoming, a target session that is under way (started, not yet ended) so the
  // card can say so instead of "no exam date".
  const examCountdown = pickExamCountdown(
    enrollments.map((e) => ({ subjectId: e.subjectId, session: e.targetExamSession })),
    student?.targetExamSession ?? null,
    now,
    timeZone,
    { includeUnderWay: true },
  );
  const subjectsBySession = new Map<string, string[]>();
  for (const e of enrollments) {
    if (e.targetExamSession) subjectsBySession.set(e.targetExamSession.id, [...(subjectsBySession.get(e.targetExamSession.id) ?? []), e.subjectId]);
  }

  const subjects: DashboardSubject[] = enrollments.map((e) => {
    const p = progressBySubject.get(e.subjectId);
    return {
      subjectId: e.subjectId,
      name: e.subject.name,
      slug: e.subject.slug,
      qualificationName: e.subject.qualification.name,
      syllabusVersion: e.syllabus.versionLabel,
      progressPercent: p ? p.progressPercent : null,
      syllabusCoveragePercent: p ? p.syllabusCoveragePercent : null,
      topicsTotal: p?.topicsTotal ?? 0,
      topicsCompleted: p?.topicsCompleted ?? 0,
      topicsRemaining: (p?.topicsTotal ?? 0) - (p?.topicsCompleted ?? 0),
      weakTopicsCount: p?.weakTopicsCount ?? 0,
      questionsAttempted: p?.questionsAttempted ?? 0,
      accuracyPercent: p ? percent(p.questionsCorrect, p.questionsAttempted) : null,
      averageScorePercent: p?.averageScorePercent ?? null,
      lastMockPercent: p?.lastMockPercent ?? null,
      predictedGrade: p?.predictedGrade ?? null,
      countdown: e.targetExamSession ? countdownForSession(e.targetExamSession, subjectsBySession.get(e.targetExamSession.id) ?? [e.subjectId], now, timeZone) : null,
    };
  });

  let topicsTotal = 0;
  let topicsCompleted = 0;
  let weightedProgress = 0;
  let questionsAttempted = 0;
  let questionsCorrect = 0;
  let scoreWeight = 0;
  let scoreSum = 0;
  for (const p of progressRows) {
    topicsTotal += p.topicsTotal;
    topicsCompleted += p.topicsCompleted;
    weightedProgress += p.progressPercent * p.topicsTotal;
    questionsAttempted += p.questionsAttempted;
    questionsCorrect += p.questionsCorrect;
    if (p.averageScorePercent !== null && p.assessmentsCompleted > 0) {
      scoreWeight += p.assessmentsCompleted;
      scoreSum += p.averageScorePercent * p.assessmentsCompleted;
    }
  }

  const items: TopicMasteryItem[] = masteryRows.map((r) => ({
    topicId: r.topicId,
    name: r.topic.name,
    subjectId: r.subjectId,
    subjectName: subjectName.get(r.subjectId) ?? "",
    score: r.score,
    band: r.band,
  }));
  const weakTopics = items
    .filter((t) => t.band === "WEAK" || t.band === "DEVELOPING")
    .sort((a, b) => a.score - b.score || (a.topicId < b.topicId ? -1 : 1))
    .slice(0, 5);
  const strongTopics = items
    .filter((t) => t.band === "STRONG" || t.band === "MASTERED")
    .sort((a, b) => b.score - a.score || (a.topicId < b.topicId ? -1 : 1))
    .slice(0, 5);

  const recommendedInput = enrollments.flatMap((e) => {
    const first = readRecommendations(progressBySubject.get(e.subjectId)?.recommendations)[0];
    return first ? [{ rec: first, subjectId: e.subjectId, subjectName: e.subject.name }] : [];
  });
  const recommended = (await resolveRecommendationNames(db, recommendedInput)).slice(0, 3);

  const plannedTodayMinutes = plan ? planItems.reduce((sum, item) => sum + item.targetMinutes, 0) : null;
  const goalMinutes = stats?.dailyGoalMinutes ?? null;
  const target = resolveDailyTarget({
    plannedTodayMinutes,
    goalMinutes,
    defaultMinutes: (plannedTodayMinutes ?? 0) > 0 || (goalMinutes ?? 0) > 0 ? 0 : (await getStudyDefaults()).dailyGoalMinutes,
  });

  return {
    greeting: { name, partOfDay: partOfDay(now, timeZone) },
    today,
    timeZone,
    examCountdown,
    diagnosticOffer:
      enrollments.length === 0 || !student || student.diagnosticCompletedAt !== null ? null : student.diagnosticSkippedAt !== null ? "SKIPPED" : "OFFER",
    overall: {
      progressPercent: topicsTotal > 0 ? round1(weightedProgress / topicsTotal) : enrollments.length > 0 ? 0 : null,
      coveragePercent: percent(topicsCompleted, topicsTotal),
      topicsTotal,
      topicsCompleted,
      topicsRemaining: topicsTotal - topicsCompleted,
    },
    subjects,
    weakTopics,
    strongTopics,
    streak: {
      current: displayedStreak(stats, today),
      longest: stats?.longestStreak ?? 0,
      status: stats
        ? streakStatus(
            {
              currentStreak: stats.currentStreak,
              longestStreak: stats.longestStreak,
              lastActiveDate: stats.lastStreakDate ? localDateFromDateColumn(stats.lastStreakDate) : null,
              freezesAvailable: stats.streakFreezesAvailable,
              freezeUsedOn: null,
              weekKey: null,
              weekDaysMet: 0,
              lastFreezeEarnedWeek: null,
            },
            today,
          )
        : "INACTIVE",
    },
    questionsAttempted,
    questionsCorrect,
    accuracyPercent: percent(questionsCorrect, questionsAttempted),
    averageScorePercent: scoreWeight > 0 ? round1(scoreSum / scoreWeight) : null,
    recentMocks: mocks.map((m) => ({
      attemptId: m.id,
      subjectId: m.subjectId,
      subjectName: subjectName.get(m.subjectId) ?? "",
      title: m.assessment?.title ?? null,
      percentage: m.percentage,
      gradeEstimate: m.gradeEstimate,
      isProvisional: m.pendingReviewCount > 0 || m.status === "AWAITING_MARKING",
      submittedAt: m.submittedAt,
    })),
    dailyTarget: {
      minutes: target.minutes,
      source: target.source,
      minutesStudiedToday: Math.floor((todayActivity?.studySeconds ?? 0) / 60),
      goalMet: todayActivity?.dailyGoalMet ?? false,
    },
    studyPlan: plan
      ? {
          planId: plan.id,
          items: planItems.map((i) => ({
            id: i.id,
            subjectId: i.subjectId,
            subjectName: i.subject.name,
            topicId: i.topicId,
            topicName: i.topic?.name ?? null,
            lessonId: i.lessonId,
            lessonTitle: i.lesson?.title ?? null,
            assessmentId: i.assessmentId,
            assessmentTitle: i.assessment?.title ?? null,
            activityType: i.activityType,
            reason: i.reason,
            targetMinutes: i.targetMinutes,
            targetQuestions: i.targetQuestions,
            status: i.status,
          })),
        }
      : null,
    recommended,
    xp: { total: stats?.totalXp ?? 0 },
  };
}

/** One TOPIC-kind node on the subject dashboard (§7 "Algebra 82%"). */
export interface TopicProgressItem {
  topicId: string;
  name: string;
  code: string | null;
  slug?: string;
  /** Null = not started (no evidence). */
  score: number | null;
  band: MasteryBand | null;
  questionsAttempted: number;
  /** In-scope leaf topics under this node with evidence / total, 0–100. */
  coveragePercent: number | null;
  leavesTotal: number;
  leavesStarted: number;
  nextReviewAt: Date | null;
  inRemediation: boolean;
}

export interface SubjectDashboard {
  subject: { id: string; name: string; slug: string; qualification: { id: string; name: string } };
  enrollment: {
    id: string;
    status: string;
    syllabus: { id: string; title: string; versionLabel: string; status: string };
    targetGrade: string | null;
    abilityLevel: string | null;
    diagnosticCompletedAt: Date | null;
  };
  examCountdown: ExamCountdown | null;
  progress: {
    progressPercent: number;
    syllabusCoveragePercent: number;
    topicsTotal: number;
    topicsStarted: number;
    topicsCompleted: number;
    topicsRemaining: number;
    topicsMastered: number;
    weakTopicsCount: number;
    lessonsTotal: number;
    lessonsCompleted: number;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracyPercent: number | null;
    averageScorePercent: number | null;
    assessmentsCompleted: number;
    mockExamsCompleted: number;
    lastMockPercent: number | null;
    bestMockPercent: number | null;
    readinessPercent: number | null;
    /** Grade ESTIMATE (label it as such). */
    predictedGrade: string | null;
    computedAt: Date | null;
  } | null;
  topics: TopicProgressItem[];
  weakest: TopicProgressItem | null;
  strongest: TopicProgressItem | null;
  /** "Your weakest area is Calculus." — null when nothing has been assessed or the weakest topic is already strong. */
  weakestMessage: string | null;
  weakTopics: TopicProgressItem[];
  strongTopics: TopicProgressItem[];
  recentTests: { attemptId: string; mode: string; title: string | null; percentage: number | null; gradeEstimate: string | null; status: string; submittedAt: Date | null }[];
  recommended: RecommendedItem[];
}

/**
 * The subject dashboard (§7): syllabus coverage, topic progress with mastery bands, average score, questions
 * completed, weakest / strongest topics ("Your weakest area is X"), recent tests and recommended topics — all for the
 * enrolment's pinned syllabus version.
 *
 * @throws AppError FORBIDDEN (non-student) | NOT_FOUND (not enrolled in the subject)
 */
export async function getSubjectDashboard(actor: ProgressActor, subjectId: string, now: Date = new Date()): Promise<SubjectDashboard> {
  assertOwnProgress(actor);
  const userId = actor.userId;
  const { timeZone } = await profileOf(userId, actor.timeZone);
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId, subjectId } },
    select: {
      id: true,
      status: true,
      syllabusId: true,
      routeId: true,
      targetGrade: true,
      abilityLevel: true,
      diagnosticCompletedAt: true,
      subject: { select: { id: true, name: true, slug: true, qualification: { select: { id: true, name: true } } } },
      syllabus: { select: { id: true, title: true, versionLabel: true, status: true } },
      targetExamSession: { select: { ...SESSION_SELECT, year: true } },
      topicChoices: { select: { topicId: true } },
    },
  });
  if (!enrollment) throw AppError.notFound("You're not enrolled in this subject.");

  const structure = await loadSyllabusStructure(enrollment.syllabusId);
  const rules = scopeRulesFor(
    structure,
    { routeId: enrollment.routeId, examYear: enrollment.targetExamSession?.year ?? null },
    enrollment.topicChoices.map((c) => c.topicId),
  );
  const inScope = new Set(inScopeLeafTopicIds(structure.topics, rules));

  const [progress, rows, tests] = await Promise.all([
    db.subjectProgress.findUnique({ where: { userId_subjectId: { userId, subjectId } } }),
    db.topicMastery.findMany({
      where: { userId, subjectId, syllabusId: enrollment.syllabusId },
      select: { topicId: true, isLeaf: true, score: true, band: true, questionsAttempted: true, nextReviewAt: true, remediationStartedAt: true },
    }),
    db.assessmentAttempt.findMany({
      where: { userId, subjectId, mode: { in: [...GRADED_MODES] }, status: { in: ["MARKED", "AWAITING_MARKING", "SUBMITTED"] } },
      orderBy: [{ startedAt: "desc" }],
      take: 5,
      select: { id: true, mode: true, percentage: true, gradeEstimate: true, status: true, submittedAt: true, assessment: { select: { title: true } } },
    }),
  ]);
  const rowByTopic = new Map(rows.map((r) => [r.topicId, r]));

  // §7 bars: TOPIC-kind nodes (selected by kind, never depth); fall back to roots for TOPIC-less trees.
  let barTopics = structure.topics.filter((t) => t.kind === "TOPIC");
  if (barTopics.length === 0) barTopics = structure.topics.filter((t) => t.parentId === null);
  const topics: TopicProgressItem[] = barTopics.map((t) => {
    const row = rowByTopic.get(t.id);
    const evidence = row !== undefined && row.questionsAttempted > 0;
    const leaves = [...inScope].filter((leafId) => leafId === t.id || (structure.byId.get(leafId)?.path ?? "").startsWith(`${t.path}/`));
    const started = leaves.filter((leafId) => (rowByTopic.get(leafId)?.questionsAttempted ?? 0) > 0).length;
    return {
      topicId: t.id,
      name: t.name,
      code: t.code,
      score: evidence ? row.score : null,
      band: evidence ? row.band : null,
      questionsAttempted: row?.questionsAttempted ?? 0,
      coveragePercent: percent(started, leaves.length),
      leavesTotal: leaves.length,
      leavesStarted: started,
      nextReviewAt: evidence ? row.nextReviewAt : null,
      inRemediation: evidence ? row.remediationStartedAt !== null : false,
    };
  });
  const assessed = topics.filter((t): t is TopicProgressItem & { score: number } => t.score !== null);
  const ascending = [...assessed].sort((a, b) => a.score - b.score || (a.topicId < b.topicId ? -1 : 1));
  const weakest = ascending[0] ?? null;
  const strongest = ascending.length > 0 ? (ascending[ascending.length - 1] ?? null) : null;

  const recommended = await resolveRecommendationNames(
    db,
    readRecommendations(progress?.recommendations).map((rec) => ({ rec, subjectId, subjectName: enrollment.subject.name })),
  );

  return {
    subject: enrollment.subject,
    enrollment: {
      id: enrollment.id,
      status: enrollment.status,
      syllabus: enrollment.syllabus,
      targetGrade: enrollment.targetGrade,
      abilityLevel: enrollment.abilityLevel,
      diagnosticCompletedAt: enrollment.diagnosticCompletedAt,
    },
    examCountdown: countdownForSession(enrollment.targetExamSession, [subjectId], now, timeZone),
    progress: progress
      ? {
          progressPercent: progress.progressPercent,
          syllabusCoveragePercent: progress.syllabusCoveragePercent,
          topicsTotal: progress.topicsTotal,
          topicsStarted: progress.topicsStarted,
          topicsCompleted: progress.topicsCompleted,
          topicsRemaining: progress.topicsTotal - progress.topicsCompleted,
          topicsMastered: progress.topicsMastered,
          weakTopicsCount: progress.weakTopicsCount,
          lessonsTotal: progress.lessonsTotal,
          lessonsCompleted: progress.lessonsCompleted,
          questionsAttempted: progress.questionsAttempted,
          questionsCorrect: progress.questionsCorrect,
          accuracyPercent: percent(progress.questionsCorrect, progress.questionsAttempted),
          averageScorePercent: progress.averageScorePercent,
          assessmentsCompleted: progress.assessmentsCompleted,
          mockExamsCompleted: progress.mockExamsCompleted,
          lastMockPercent: progress.lastMockPercent,
          bestMockPercent: progress.bestMockPercent,
          readinessPercent: progress.readinessPercent,
          predictedGrade: progress.predictedGrade,
          computedAt: progress.computedAt,
        }
      : null,
    topics,
    weakest,
    strongest,
    weakestMessage: weakest && weakest.score < MASTERY_BAND_MIN_SCORE.STRONG ? `Your weakest area is ${weakest.name}.` : null,
    weakTopics: ascending.filter((t) => t.band === "WEAK" || t.band === "DEVELOPING").slice(0, 3),
    strongTopics: [...ascending].reverse().filter((t) => t.band === "STRONG" || t.band === "MASTERED").slice(0, 3),
    recentTests: tests.map((t) => ({
      attemptId: t.id,
      mode: t.mode,
      title: t.assessment?.title ?? null,
      percentage: t.percentage,
      gradeEstimate: t.gradeEstimate,
      status: t.status,
      submittedAt: t.submittedAt,
    })),
    recommended,
  };
}

export interface TopicProgressView {
  topic: { id: string; name: string; code: string | null; kind: TopicKind; subjectId: string; syllabusId: string };
  mastery: {
    score: number;
    band: MasteryBand;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracyPercent: number | null;
    currentDifficulty: number;
    nextReviewAt: Date | null;
    retestDue: boolean;
    inRemediation: boolean;
    seededByDiagnostic: boolean;
    lastPracticedAt: Date | null;
  } | null;
  children: { topicId: string; name: string; kind: TopicKind; score: number | null; band: MasteryBand | null; questionsAttempted: number }[];
  lessons: { lessonId: string; title: string; completed: boolean }[];
  /** Last answers in this topic (and its subtopics), newest first (recent accuracy, §11). */
  recentAnswers: { attemptId: string; position: number; isCorrect: boolean | null; marksAwarded: number | null; marksAvailable: number; answeredAt: Date | null }[];
  recentAccuracyPercent: number | null;
}

/**
 * Progress in one topic of the student's pinned syllabus version (§11 mastery band, re-test date, remediation;
 * subtopics; lessons with completion; recent answers).
 *
 * @throws AppError FORBIDDEN | NOT_FOUND (unknown topic, or not in a version the student is enrolled on)
 */
export async function getTopicProgress(actor: ProgressActor, topicId: string, now: Date = new Date()): Promise<TopicProgressView> {
  assertOwnProgress(actor);
  const userId = actor.userId;
  const topic = await db.topic.findUnique({
    where: { id: topicId },
    select: { id: true, name: true, code: true, kind: true, path: true, syllabusId: true, syllabus: { select: { subjectId: true } } },
  });
  if (!topic) throw AppError.notFound("Topic not found.");
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId, subjectId: topic.syllabus.subjectId } },
    select: { syllabusId: true },
  });
  if (!enrollment || enrollment.syllabusId !== topic.syllabusId) throw AppError.notFound("This topic is not part of your syllabus.");

  const structure = await loadSyllabusStructure(topic.syllabusId);
  const subtree = structure.topics.filter((t) => t.id === topic.id || t.path.startsWith(`${topic.path}/`)).map((t) => t.id);
  const childNodes = structure.topics.filter((t) => t.parentId === topic.id);
  const [rows, links, answers] = await Promise.all([
    db.topicMastery.findMany({ where: { userId, topicId: { in: [topic.id, ...childNodes.map((c) => c.id)] } } }),
    loadLessonLinks(db, topic.syllabusId),
    db.questionAttempt.findMany({
      where: { userId, topicId: { in: subtree }, markingStatus: { notIn: ["PENDING", "UNANSWERED"] } },
      orderBy: [{ createdAt: "desc" }],
      take: 20,
      select: { attemptId: true, position: true, isCorrect: true, marksAwarded: true, marksAvailable: true, answeredAt: true },
    }),
  ]);
  const rowByTopic = new Map(rows.map((r) => [r.topicId, r]));
  const own = rowByTopic.get(topic.id);
  const lessons = effectiveLessons(structure, groupLessons(links), topic.id);
  const completed = lessons.length
    ? new Set(
        (await db.lessonProgress.findMany({ where: { userId, lessonId: { in: lessons.map((l) => l.lessonId) }, status: "COMPLETED" }, select: { lessonId: true } })).map(
          (r) => r.lessonId,
        ),
      )
    : new Set<string>();
  const correct = answers.filter((a) => a.isCorrect === true).length;
  return {
    topic: { id: topic.id, name: topic.name, code: topic.code, kind: topic.kind, subjectId: topic.syllabus.subjectId, syllabusId: topic.syllabusId },
    mastery:
      own && own.questionsAttempted > 0
        ? {
            score: own.score,
            band: own.band,
            questionsAttempted: own.questionsAttempted,
            questionsCorrect: own.questionsCorrect,
            accuracyPercent: percent(own.questionsCorrect, own.questionsAttempted),
            currentDifficulty: own.currentDifficulty,
            nextReviewAt: own.nextReviewAt,
            retestDue: own.nextReviewAt !== null && own.nextReviewAt.getTime() <= now.getTime(),
            inRemediation: own.remediationStartedAt !== null,
            seededByDiagnostic: own.seededByDiagnostic,
            lastPracticedAt: own.lastPracticedAt,
          }
        : null,
    children: childNodes.map((c) => {
      const row = rowByTopic.get(c.id);
      const evidence = row !== undefined && row.questionsAttempted > 0;
      return { topicId: c.id, name: c.name, kind: c.kind, score: evidence ? row.score : null, band: evidence ? row.band : null, questionsAttempted: row?.questionsAttempted ?? 0 };
    }),
    lessons: lessons.map((l) => ({ lessonId: l.lessonId, title: l.title, completed: completed.has(l.lessonId) })),
    recentAnswers: answers,
    recentAccuracyPercent: percent(correct, answers.length),
  };
}

/**
 * Effective lessons (own tags, else the nearest tagged ancestor's) of topics in a syllabus version, with the
 * student's completion — the `lessonsByTopic` input of the adaptive `recommendationsFor` (§11 "recommend a lesson",
 * §12 "Probability → Lesson 4"). Three queries whatever the number of topics.
 */
export async function lessonRefsForTopics(
  client: DbClient,
  userId: string,
  syllabusId: string,
  topicIds: readonly string[],
): Promise<Map<string, LessonRef[]>> {
  const out = new Map<string, LessonRef[]>();
  if (topicIds.length === 0) return out;
  const structure = await loadSyllabusStructure(syllabusId);
  const byTopic = groupLessons(await loadLessonLinks(client, syllabusId));
  const effective = new Map(topicIds.map((id) => [id, effectiveLessons(structure, byTopic, id)]));
  const lessonIds = [...new Set([...effective.values()].flatMap((links) => links.map((l) => l.lessonId)))];
  const completed = lessonIds.length
    ? new Set(
        (await client.lessonProgress.findMany({ where: { userId, lessonId: { in: lessonIds }, status: "COMPLETED" }, select: { lessonId: true } })).map(
          (r) => r.lessonId,
        ),
      )
    : new Set<string>();
  for (const [topicId, links] of effective) out.set(topicId, links.map((l) => ({ lessonId: l.lessonId, completed: completed.has(l.lessonId) })));
  return out;
}

/** Lesson suggested for "Study this topic" (§10): the topic's first published lesson (own tag, else an ancestor's). */
export async function firstLessonForTopic(
  client: DbClient,
  topicId: string,
): Promise<{ lessonId: string; title: string; accessTier: ContentAccessTier } | null> {
  const topic = await client.topic.findUnique({ where: { id: topicId }, select: { id: true, path: true, syllabusId: true } });
  if (!topic) return null;
  const chain = [topic.id, ...ancestorIdsFromPath(topic.path).reverse()];
  const links = await client.lessonTopic.findMany({
    where: { topicId: { in: chain }, lesson: { status: "PUBLISHED", draftOfId: null } },
    select: { topicId: true, sortOrder: true, lesson: { select: { id: true, title: true, accessTier: true } } },
    orderBy: [{ sortOrder: "asc" }, { lessonId: "asc" }],
  });
  for (const id of chain) {
    const link = links.find((l) => l.topicId === id);
    if (link) return { lessonId: link.lesson.id, title: link.lesson.title, accessTier: link.lesson.accessTier };
  }
  return null;
}
