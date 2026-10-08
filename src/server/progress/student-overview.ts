import "server-only";
import type { AchievementCategory, EnrollmentStatus, MasteryBand, SyllabusStatus, TopicKind } from "@/generated/prisma/client";
import {
  DEFAULT_TIMEZONE,
  addDays,
  dateColumnFromLocalDate,
  daysUntil,
  eachLocalDate,
  isValidTimeZone,
  localDateFromDateColumn,
  localDateString,
  startOfWeek,
  type LocalDate,
} from "@/lib/dates";
import { MASTERY_BANDS } from "@/lib/mastery-band";
import { roundHalfUp } from "@/lib/math";
import { readAttemptAnalysis } from "@/server/attempts/policy";
import { hasPermission } from "@/server/auth/permissions";
import { getSyllabusForEnrollment } from "@/server/curriculum/syllabus";
import { getTopicTree, type TopicNode } from "@/server/curriculum/topics";
import { db } from "@/server/db";
import { streakStateFromStats } from "@/server/gamification/service";
import { currentStreakAsOf, streakStatus, type StreakStatus } from "@/server/gamification/streaks";
import { levelForXp, type LevelProgress } from "@/server/gamification/xp";
import { AppError } from "@/server/lib/errors";
import type { ExamCountdown, ProgressActor } from "./service";

/**
 * Student-area read models that complement ./service (§6 dashboard extras, §7 topic tree, §17 countdown in the header,
 * §19 XP / level / achievements, §52 "performance report" after the diagnostic). Every function reads the acting
 * student's OWN rows only (permission `progress.viewOwn`), a fixed small number of indexed queries (no N+1), and
 * returns real values or honest nulls / zeros (§50).
 *
 * - {@link getStudentHeaderSummary}: streak + countdown for the shell header on every /app page (3 light queries, so
 *   the layout does not have to compute the full dashboard).
 * - {@link getRecentDiagnostics}: the latest diagnostic result per subject (first visit after onboarding).
 * - {@link listStudentSubjects}: enrolled subjects with their pinned syllabus version and cached progress.
 * - {@link getSubjectTopicTree}: the pinned version's topic tree with the student's mastery on every node.
 * - {@link getProgressOverview}: mastery distribution per subject, last-30-days activity, XP + level, achievements.
 */

function assertOwnProgress(actor: ProgressActor): void {
  if (!hasPermission({ roles: [...actor.roles] }, "progress.viewOwn")) throw AppError.forbidden("Only students have a progress dashboard.");
}

function safeZone(timeZone: string | null | undefined): string {
  return timeZone && isValidTimeZone(timeZone) ? timeZone : DEFAULT_TIMEZONE;
}

/** The actor's time zone (the auth Actor carries it); falls back to the stored profile, then Africa/Harare. */
async function zoneOf(actor: ProgressActor): Promise<string> {
  if (actor.timeZone) return safeZone(actor.timeZone);
  const profile = await db.profile.findUnique({ where: { userId: actor.userId }, select: { timezone: true } });
  return safeZone(profile?.timezone);
}

const percent1 = (part: number, whole: number): number | null => (whole > 0 ? roundHalfUp((part * 100) / whole, 1) : null);

// =====================================================================================================================
// Exam countdown (§17) — pure
// =====================================================================================================================

/** The exam-session columns a countdown needs. */
export interface CountdownSessionRow {
  id: string;
  name: string;
  startsOn: Date;
  endsOn: Date;
  isProvisional: boolean;
  isDemo: boolean;
}

/** Countdown to one session's first exam day in the student's time zone (pure). */
export function countdownForSession(session: CountdownSessionRow | null, subjectIds: string[], now: Date, timeZone: string): ExamCountdown | null {
  if (!session) return null;
  const startsOn = localDateFromDateColumn(session.startsOn);
  return {
    examSessionId: session.id,
    name: session.name,
    startsOn,
    endsOn: localDateFromDateColumn(session.endsOn),
    daysUntil: daysUntil(startsOn, now, timeZone),
    isProvisional: session.isProvisional,
    isDemo: session.isDemo,
    subjectIds,
  };
}

/**
 * Chooses among computed countdowns (pure). The nearest UPCOMING enrolment session wins (ties by id), else the
 * student's own (onboarding) target when upcoming. With `includeUnderWay` (the dashboard card), when nothing is
 * upcoming a session that is under way (first day passed, last day not; `daysUntil < 0`) is returned so the card can
 * say "under way" rather than inviting the student to choose an examination they already chose. Sessions that have
 * ended are never returned.
 */
export function chooseExamCountdown(
  enrolmentCountdowns: readonly (ExamCountdown | null)[],
  fallback: ExamCountdown | null,
  today: LocalDate,
  options: { includeUnderWay?: boolean } = { includeUnderWay: true },
): ExamCountdown | null {
  const present = enrolmentCountdowns.filter((c): c is ExamCountdown => c !== null);
  const upcoming = present
    .filter((c) => c.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil || (a.examSessionId < b.examSessionId ? -1 : a.examSessionId > b.examSessionId ? 1 : 0));
  if (upcoming[0]) return upcoming[0];
  if (fallback && fallback.daysUntil >= 0) return fallback;
  if (!options.includeUnderWay) return null;
  const underWay = [...present, ...(fallback ? [fallback] : [])]
    .filter((c) => c.daysUntil < 0 && c.endsOn >= today)
    .sort((a, b) => (a.endsOn < b.endsOn ? -1 : a.endsOn > b.endsOn ? 1 : 0));
  return underWay[0] ?? null;
}

/**
 * The countdown the student sees (pure; ONE rule for the header pill and the dashboard card): the NEAREST upcoming
 * target session across ACTIVE enrolments (sessions shared by several subjects are grouped), else the onboarding
 * target when it is still upcoming, else `null` — or, with `includeUnderWay` (the dashboard), a session under way
 * ({@link chooseExamCountdown}). Sessions whose first day has passed never count down (negative days).
 */
export function pickExamCountdown(
  enrolments: readonly { subjectId: string; session: CountdownSessionRow | null }[],
  fallback: CountdownSessionRow | null,
  now: Date,
  timeZone: string,
  options: { includeUnderWay?: boolean } = {},
): ExamCountdown | null {
  const groups = new Map<string, { session: CountdownSessionRow; subjectIds: string[] }>();
  for (const enrolment of enrolments) {
    if (!enrolment.session) continue;
    const group = groups.get(enrolment.session.id) ?? { session: enrolment.session, subjectIds: [] };
    group.subjectIds.push(enrolment.subjectId);
    groups.set(enrolment.session.id, group);
  }
  return chooseExamCountdown(
    [...groups.values()].map((group) => countdownForSession(group.session, group.subjectIds, now, timeZone)),
    countdownForSession(fallback, [], now, timeZone),
    localDateString(now, timeZone),
    { includeUnderWay: options.includeUnderWay ?? false },
  );
}

const SESSION_SELECT = { id: true, name: true, startsOn: true, endsOn: true, isProvisional: true, isDemo: true } as const;

// =====================================================================================================================
// Header summary (every /app page)
// =====================================================================================================================

export interface StudentHeaderSummary {
  timeZone: string;
  today: LocalDate;
  streak: { current: number; status: StreakStatus };
  countdown: ExamCountdown | null;
}

/** Streak and exam countdown for the student shell header (§17, §19). Three indexed reads. */
export async function getStudentHeaderSummary(actor: ProgressActor, now: Date = new Date()): Promise<StudentHeaderSummary> {
  assertOwnProgress(actor);
  const timeZone = await zoneOf(actor);
  const today = localDateString(now, timeZone);
  const [enrolments, student, stats] = await Promise.all([
    db.subjectEnrollment.findMany({
      where: { userId: actor.userId, status: "ACTIVE", targetExamSessionId: { not: null } },
      select: { subjectId: true, targetExamSession: { select: SESSION_SELECT } },
    }),
    db.student.findUnique({ where: { userId: actor.userId }, select: { targetExamSession: { select: SESSION_SELECT } } }),
    db.learnerStats.findUnique({
      where: { userId: actor.userId },
      select: { currentStreak: true, longestStreak: true, lastStreakDate: true, streakFreezesAvailable: true, weekStartDate: true, weekGoalMet: true },
    }),
  ]);
  const state = stats ? streakStateFromStats(stats, { freezeUsedOn: null, weekKey: null, weekDaysMet: 0 }) : null;
  return {
    timeZone,
    today,
    streak: state ? { current: currentStreakAsOf(state, today), status: streakStatus(state, today) } : { current: 0, status: "INACTIVE" },
    countdown: pickExamCountdown(
      enrolments.map((e) => ({ subjectId: e.subjectId, session: e.targetExamSession })),
      student?.targetExamSession ?? null,
      now,
      timeZone,
    ),
  };
}

// =====================================================================================================================
// Diagnostic results (§46, §52 "receive a performance report")
// =====================================================================================================================

export interface DiagnosticTopicResult {
  topicId: string;
  name: string;
  /** Percentage of marks in this topic on the diagnostic; null when the analysis has no row for it. */
  percent: number | null;
}

export interface DiagnosticSummary {
  subjectId: string;
  subjectName: string;
  attemptId: string;
  completedAt: Date;
  percentage: number | null;
  /** Grade ESTIMATE written at marking (label it as an estimate). */
  gradeEstimate: string | null;
  /** Some answers still await marking: the score may change. */
  isProvisional: boolean;
  strongTopics: DiagnosticTopicResult[];
  weakTopics: DiagnosticTopicResult[];
}

export interface RecentDiagnosticsOptions {
  /** Only diagnostics completed within this many days (default 14): later, live mastery says more. */
  withinDays?: number;
  now?: Date;
  /** Topics listed per side (default 3). */
  topicsPerSide?: number;
}

/** The latest diagnostic result per enrolled subject (§52), newest first. Two queries. */
export async function getRecentDiagnostics(actor: ProgressActor, options: RecentDiagnosticsOptions = {}): Promise<DiagnosticSummary[]> {
  assertOwnProgress(actor);
  const now = options.now ?? new Date();
  const perSide = options.topicsPerSide ?? 3;
  const cutoff = new Date(now.getTime() - (options.withinDays ?? 14) * 24 * 3600 * 1000);
  const rows = await db.subjectEnrollment.findMany({
    where: { userId: actor.userId, status: "ACTIVE", diagnosticAttemptId: { not: null }, diagnosticCompletedAt: { gte: cutoff } },
    orderBy: [{ diagnosticCompletedAt: "desc" }],
    take: 12,
    select: {
      subjectId: true,
      diagnosticCompletedAt: true,
      subject: { select: { name: true } },
      diagnosticAttempt: {
        select: { id: true, userId: true, percentage: true, gradeEstimate: true, status: true, pendingReviewCount: true, analysis: true },
      },
    },
  });
  const parsed = rows.flatMap((row) => {
    const attempt = row.diagnosticAttempt;
    // Defence in depth: the attempt must be the student's own.
    if (!attempt || attempt.userId !== actor.userId || !row.diagnosticCompletedAt) return [];
    const analysis = readAttemptAnalysis(attempt.analysis);
    const byTopic = new Map((analysis?.byTopic ?? []).map((t) => [t.topicId, t.percent]));
    return [
      {
        row,
        attempt,
        byTopic,
        strongIds: (analysis?.strongTopicIds ?? []).slice(0, perSide),
        weakIds: (analysis?.weakTopicIds ?? []).slice(0, perSide),
      },
    ];
  });
  const topicIds = [...new Set(parsed.flatMap((p) => [...p.strongIds, ...p.weakIds]))];
  const topics = topicIds.length ? await db.topic.findMany({ where: { id: { in: topicIds } }, select: { id: true, name: true } }) : [];
  const nameOf = new Map(topics.map((t) => [t.id, t.name]));
  const toRefs = (ids: string[], byTopic: Map<string, number>): DiagnosticTopicResult[] =>
    ids.flatMap((id) => {
      const name = nameOf.get(id);
      return name ? [{ topicId: id, name, percent: byTopic.get(id) ?? null }] : [];
    });
  return parsed.map(({ row, attempt, byTopic, strongIds, weakIds }) => ({
    subjectId: row.subjectId,
    subjectName: row.subject.name,
    attemptId: attempt.id,
    completedAt: row.diagnosticCompletedAt as Date,
    percentage: attempt.percentage,
    gradeEstimate: attempt.gradeEstimate,
    isProvisional: attempt.pendingReviewCount > 0 || attempt.status === "AWAITING_MARKING",
    strongTopics: toRefs(strongIds, byTopic),
    weakTopics: toRefs(weakIds, byTopic),
  }));
}

// =====================================================================================================================
// Enrolled subjects (§7 list, §26 pinned version)
// =====================================================================================================================

export interface StudentSubjectCard {
  enrollmentId: string;
  subjectId: string;
  name: string;
  slug: string;
  qualificationName: string;
  status: EnrollmentStatus;
  /** The PINNED syllabus version (§26). */
  syllabus: { id: string; title: string; versionLabel: string; status: SyllabusStatus };
  targetGrade: string | null;
  countdown: ExamCountdown | null;
  /** Null until SubjectProgress has been computed (shown as "not started", never as 0 % invented). */
  progress: {
    progressPercent: number;
    syllabusCoveragePercent: number;
    topicsTotal: number;
    topicsStarted: number;
    topicsCompleted: number;
    questionsAttempted: number;
    accuracyPercent: number | null;
    averageScorePercent: number | null;
    /** Grade ESTIMATE (label it as such). */
    predictedGrade: string | null;
  } | null;
}

/** The student's ACTIVE and PAUSED subjects with their pinned version and cached progress. One query. */
export async function listStudentSubjects(actor: ProgressActor, now: Date = new Date()): Promise<StudentSubjectCard[]> {
  assertOwnProgress(actor);
  const timeZone = await zoneOf(actor);
  const rows = await db.subjectEnrollment.findMany({
    where: { userId: actor.userId, status: { in: ["ACTIVE", "PAUSED"] } },
    orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
    select: {
      id: true,
      subjectId: true,
      status: true,
      targetGrade: true,
      subject: { select: { name: true, slug: true, qualification: { select: { name: true } } } },
      syllabus: { select: { id: true, title: true, versionLabel: true, status: true } },
      targetExamSession: { select: SESSION_SELECT },
      progress: {
        select: {
          progressPercent: true,
          syllabusCoveragePercent: true,
          topicsTotal: true,
          topicsStarted: true,
          topicsCompleted: true,
          questionsAttempted: true,
          questionsCorrect: true,
          averageScorePercent: true,
          predictedGrade: true,
        },
      },
    },
  });
  return rows.map((row) => {
    const countdown = countdownForSession(row.targetExamSession, [row.subjectId], now, timeZone);
    const p = row.progress;
    return {
      enrollmentId: row.id,
      subjectId: row.subjectId,
      name: row.subject.name,
      slug: row.subject.slug,
      qualificationName: row.subject.qualification.name,
      status: row.status,
      syllabus: row.syllabus,
      targetGrade: row.targetGrade,
      countdown: countdown && countdown.daysUntil >= 0 ? countdown : null,
      progress: p
        ? {
            progressPercent: p.progressPercent,
            syllabusCoveragePercent: p.syllabusCoveragePercent,
            topicsTotal: p.topicsTotal,
            topicsStarted: p.topicsStarted,
            topicsCompleted: p.topicsCompleted,
            questionsAttempted: p.questionsAttempted,
            accuracyPercent: percent1(Math.min(p.questionsCorrect, p.questionsAttempted), p.questionsAttempted),
            averageScorePercent: p.averageScorePercent,
            predictedGrade: p.predictedGrade,
          }
        : null,
    };
  });
}

// =====================================================================================================================
// Topic tree with mastery (§7 "topic progress", §11 bands)
// =====================================================================================================================

export interface TopicTreeMasteryNode {
  topicId: string;
  name: string;
  code: string | null;
  kind: TopicKind;
  isOptional: boolean;
  /** Null = not started (no marked evidence yet). */
  score: number | null;
  band: MasteryBand | null;
  questionsAttempted: number;
  children: TopicTreeMasteryNode[];
}

export interface MasteryRowLite {
  topicId: string;
  score: number;
  band: MasteryBand;
  questionsAttempted: number;
}

/** Attaches mastery rows to a topic tree (pure). A node without evidence (no row, or 0 answers) is "not started". */
export function attachMastery(tree: readonly TopicNode[], rows: readonly MasteryRowLite[]): TopicTreeMasteryNode[] {
  const byTopic = new Map(rows.map((row) => [row.topicId, row]));
  const map = (node: TopicNode): TopicTreeMasteryNode => {
    const row = byTopic.get(node.id);
    const evidence = row !== undefined && row.questionsAttempted > 0;
    return {
      topicId: node.id,
      name: node.name,
      code: node.code,
      kind: node.kind,
      isOptional: node.isOptional,
      score: evidence ? row.score : null,
      band: evidence ? row.band : null,
      questionsAttempted: row?.questionsAttempted ?? 0,
      children: node.children.map(map),
    };
  };
  return tree.map(map);
}

/**
 * The topic tree of the student's PINNED syllabus version (§26) with mastery on every node (leaf rows take direct
 * evidence; parent rows are roll-ups, see ./service). Three queries.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND (not enrolled in the subject)
 */
export async function getSubjectTopicTree(actor: ProgressActor, subjectId: string): Promise<TopicTreeMasteryNode[]> {
  assertOwnProgress(actor);
  const pinned = await getSyllabusForEnrollment(actor.userId, subjectId);
  if (!pinned) throw AppError.notFound("You're not enrolled in this subject.");
  const syllabusId = pinned.syllabus.id;
  const [tree, rows] = await Promise.all([
    getTopicTree(syllabusId),
    db.topicMastery.findMany({
      where: { userId: actor.userId, subjectId, syllabusId },
      select: { topicId: true, score: true, band: true, questionsAttempted: true },
    }),
  ]);
  return attachMastery(tree ?? [], rows);
}

// =====================================================================================================================
// Progress overview (§6, §11, §19)
// =====================================================================================================================

/** Days of activity shown on /app/progress. */
export const ACTIVITY_WINDOW_DAYS = 30;

export interface ActivityDay {
  date: LocalDate;
  studyMinutes: number;
  questionsAttempted: number;
  questionsCorrect: number;
  xpEarned: number;
  goalMet: boolean;
  /** Counted toward the streak (includes days bridged by a streak freeze). */
  streakCredited: boolean;
  streakFreezeUsed: boolean;
}

export interface ActivityRowLite {
  date: LocalDate;
  studySeconds: number;
  questionsAttempted: number;
  questionsCorrect: number;
  xpEarned: number;
  dailyGoalMet: boolean;
  streakCredited: boolean;
  streakFreezeUsed: boolean;
}

/**
 * One entry per local day for the `days` days ending on `endDate` (inclusive, oldest first). Days without a
 * DailyActivity row are real zeros: no activity was recorded (pure).
 */
export function buildActivitySeries(rows: readonly ActivityRowLite[], endDate: LocalDate, days: number = ACTIVITY_WINDOW_DAYS): ActivityDay[] {
  const byDate = new Map(rows.map((row) => [row.date, row]));
  return eachLocalDate(addDays(endDate, -(days - 1)), days).map((date) => {
    const row = byDate.get(date);
    return {
      date,
      studyMinutes: row ? Math.floor(Math.max(0, row.studySeconds) / 60) : 0,
      questionsAttempted: row?.questionsAttempted ?? 0,
      questionsCorrect: row?.questionsCorrect ?? 0,
      xpEarned: row?.xpEarned ?? 0,
      goalMet: row?.dailyGoalMet ?? false,
      streakCredited: row?.streakCredited ?? false,
      streakFreezeUsed: row?.streakFreezeUsed ?? false,
    };
  });
}

/** "Not started" plus the five §11 bands. */
export const DISTRIBUTION_KEYS = ["NOT_STARTED", ...MASTERY_BANDS] as const;
export type DistributionKey = (typeof DISTRIBUTION_KEYS)[number];

/**
 * Topic counts per band, with "not started" = topics − assessed topics (pure). Counts are clamped so a stale
 * mastery row can never make "not started" negative.
 */
export function masteryDistribution(bandCounts: Partial<Record<MasteryBand, number>>, topicsTotal: number): Record<DistributionKey, number> {
  const counts = Object.fromEntries(MASTERY_BANDS.map((band) => [band, Math.max(0, Math.floor(bandCounts[band] ?? 0))])) as Record<MasteryBand, number>;
  const assessed = MASTERY_BANDS.reduce((sum, band) => sum + counts[band], 0);
  return { NOT_STARTED: Math.max(0, Math.floor(topicsTotal) - assessed), ...counts };
}

export interface SubjectMasteryDistribution {
  subjectId: string;
  name: string;
  qualificationName: string;
  /** TOPIC-level nodes of the pinned version (the §7 bars), or the assessed count when larger. */
  topicsTotal: number;
  assessed: number;
  counts: Record<DistributionKey, number>;
}

export interface EarnedAchievement {
  achievementId: string;
  code: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: number;
  iconKey: string;
  unlockedAt: Date;
}

export interface ProgressOverview {
  today: LocalDate;
  timeZone: string;
  xp: { total: number; thisWeek: number; level: LevelProgress };
  streak: { current: number; longest: number; status: StreakStatus; freezesAvailable: number };
  activity: {
    days: ActivityDay[];
    activeDays: number;
    goalDays: number;
    studyMinutes: number;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracyPercent: number | null;
  };
  subjects: SubjectMasteryDistribution[];
  achievements: { earned: EarnedAchievement[]; totalAvailable: number };
}

/**
 * Cross-subject progress (§6, §11, §19): mastery distribution per subject, the last 30 days of activity, XP and
 * level, streak, and achievements earned. Seven indexed queries, all run in parallel after the enrolments.
 */
export async function getProgressOverview(actor: ProgressActor, now: Date = new Date()): Promise<ProgressOverview> {
  assertOwnProgress(actor);
  const userId = actor.userId;
  const timeZone = await zoneOf(actor);
  const today = localDateString(now, timeZone);
  const firstDay = addDays(today, -(ACTIVITY_WINDOW_DAYS - 1));

  const enrolments = await db.subjectEnrollment.findMany({
    where: { userId, status: "ACTIVE" },
    orderBy: [{ subject: { sortOrder: "asc" } }, { createdAt: "asc" }],
    select: { subjectId: true, syllabusId: true, subject: { select: { name: true, qualification: { select: { name: true } } } } },
  });
  const syllabusIds = [...new Set(enrolments.map((e) => e.syllabusId))];

  const [stats, activityRows, bandGroups, topicGroups, earned, availableCount] = await Promise.all([
    db.learnerStats.findUnique({ where: { userId } }),
    db.dailyActivity.findMany({
      where: { userId, date: { gte: dateColumnFromLocalDate(firstDay), lte: dateColumnFromLocalDate(today) } },
      select: {
        date: true,
        studySeconds: true,
        questionsAttempted: true,
        questionsCorrect: true,
        xpEarned: true,
        dailyGoalMet: true,
        streakCredited: true,
        streakFreezeUsed: true,
      },
    }),
    enrolments.length
      ? db.topicMastery.groupBy({
          by: ["subjectId", "band"],
          where: {
            userId,
            topicKind: "TOPIC",
            questionsAttempted: { gt: 0 },
            OR: enrolments.map((e) => ({ subjectId: e.subjectId, syllabusId: e.syllabusId })),
          },
          _count: { _all: true },
        })
      : Promise.resolve([]),
    syllabusIds.length
      ? db.topic.groupBy({ by: ["syllabusId"], where: { syllabusId: { in: syllabusIds }, kind: "TOPIC" }, _count: { _all: true } })
      : Promise.resolve([]),
    db.userAchievement.findMany({
      where: { userId },
      orderBy: [{ unlockedAt: "desc" }],
      take: 100,
      select: {
        unlockedAt: true,
        achievement: { select: { id: true, code: true, name: true, description: true, category: true, tier: true, iconKey: true, isSecret: true } },
      },
    }),
    db.achievement.count({ where: { isActive: true, isSecret: false } }),
  ]);

  // Activity
  const days = buildActivitySeries(
    activityRows.map((row) => ({ ...row, date: localDateFromDateColumn(row.date) })),
    today,
    ACTIVITY_WINDOW_DAYS,
  );
  const activeDays = days.filter((d) => d.studyMinutes > 0 || d.questionsAttempted > 0 || d.xpEarned > 0).length;
  const questionsAttempted = days.reduce((sum, d) => sum + d.questionsAttempted, 0);
  const questionsCorrect = days.reduce((sum, d) => sum + Math.min(d.questionsCorrect, d.questionsAttempted), 0);

  // Mastery distribution per subject
  const topicsBySyllabus = new Map(topicGroups.map((g) => [g.syllabusId, g._count._all]));
  const bandsBySubject = new Map<string, Partial<Record<MasteryBand, number>>>();
  for (const group of bandGroups) {
    const entry = bandsBySubject.get(group.subjectId) ?? {};
    entry[group.band] = (entry[group.band] ?? 0) + group._count._all;
    bandsBySubject.set(group.subjectId, entry);
  }
  const subjects: SubjectMasteryDistribution[] = enrolments.map((e) => {
    const bands = bandsBySubject.get(e.subjectId) ?? {};
    const assessed = MASTERY_BANDS.reduce((sum, band) => sum + (bands[band] ?? 0), 0);
    const topicsTotal = Math.max(topicsBySyllabus.get(e.syllabusId) ?? 0, assessed);
    return {
      subjectId: e.subjectId,
      name: e.subject.name,
      qualificationName: e.subject.qualification.name,
      topicsTotal,
      assessed,
      counts: masteryDistribution(bands, topicsTotal),
    };
  });

  // XP, level, streak
  const totalXp = stats?.totalXp ?? 0;
  const sameWeek = stats?.weekStartDate ? localDateFromDateColumn(stats.weekStartDate) === startOfWeek(today) : false;
  const state = stats ? streakStateFromStats(stats, { freezeUsedOn: null, weekKey: null, weekDaysMet: 0 }) : null;
  const earnedSecret = earned.filter((e) => e.achievement.isSecret).length;

  return {
    today,
    timeZone,
    xp: { total: totalXp, thisWeek: sameWeek ? (stats?.weekXp ?? 0) : 0, level: levelForXp(totalXp) },
    streak: {
      current: state ? currentStreakAsOf(state, today) : 0,
      longest: stats?.longestStreak ?? 0,
      status: state ? streakStatus(state, today) : "INACTIVE",
      freezesAvailable: stats?.streakFreezesAvailable ?? 0,
    },
    activity: {
      days,
      activeDays,
      goalDays: days.filter((d) => d.goalMet).length,
      studyMinutes: days.reduce((sum, d) => sum + d.studyMinutes, 0),
      questionsAttempted,
      questionsCorrect,
      accuracyPercent: percent1(questionsCorrect, questionsAttempted),
    },
    subjects,
    achievements: {
      earned: earned.map((e) => ({
        achievementId: e.achievement.id,
        code: e.achievement.code,
        name: e.achievement.name,
        description: e.achievement.description,
        category: e.achievement.category,
        tier: e.achievement.tier,
        iconKey: e.achievement.iconKey,
        unlockedAt: e.unlockedAt,
      })),
      totalAvailable: availableCount + earnedSecret,
    },
  };
}

