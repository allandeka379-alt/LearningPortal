import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import {
  dateColumnFromLocalDate,
  daysUntil,
  isValidTimeZone,
  localDateFromDateColumn,
  localDateString,
  startOfLocalDay,
  type LocalDate,
} from "@/lib/dates";
import type { MasteryBand } from "@/lib/mastery-band";
import { childOverviewSections, dailySeries, percent, roundOrNull, SCORED_ASSESSMENT_MODES, trailingRange, type ChildOverviewSection } from "./core";
import type { ParentPermissions } from "./access";

export type { ChildOverviewSection } from "./core";

/**
 * Parent overview of one linked child (§21): subjects, study time, progress, test results, weak areas, examination
 * countdown and the study-activity calendar.
 *
 * AUTHORIZATION: callers MUST resolve the ACTIVE ParentStudentLink between the signed-in parent and this student first
 * (`getParentLinkPermissions(parentUserId, studentUserId)` in `./access`; refuse when it returns null) and pass that
 * link's flags as `permissions`. Sections the link does not allow are OMITTED from the result (the key is absent):
 * - always (ACTIVE link): subjects, examCountdown;
 * - canViewProgress: progress, weakAreas;
 * - canViewStudyActivity: studyTime, activityCalendar;
 * - canViewTestResults: testResults.
 *
 * Detailed reports (§31 `parentReports`, decided on the CHILD's entitlements by the caller and passed as
 * `includeReports`): without it, progress, weakAreas, activityCalendar and testResults are not computed either; the
 * ones the link shares are listed in `lockedSections` so the page can say "not in the plan" rather than "not shared".
 * Default `true` (school admins' student view is not a parent report).
 *
 * Privacy: AI tables (AiConversation, AiMessage, AiUsageDaily...) are NEVER read here, whatever the link says; study
 * time is reported per subject only (no activity-type breakdown), so AI tutor use is not singled out. Reads go
 * through per-user indexes: SubjectEnrollment(userId, subjectId), SubjectProgress PK, TopicMastery(userId, subjectId,
 * syllabusId, topicKind, band), AssessmentAttempt(userId, startedAt), DailyActivity PK, StudySession(userId, startedAt).
 */

export interface ChildOverviewOptions {
  permissions: ParentPermissions;
  /** Include the detailed-report sections (default true). Parents: the child's `parentReports` entitlement. */
  includeReports?: boolean;
  now?: Date;
  /** Recent test results to list (default 10, max 50). */
  recentResultsLimit?: number;
  /** Weak areas to list (default 10, max 50). */
  weakAreasLimit?: number;
}

export interface CountdownEntry {
  examSessionId: string;
  name: string;
  startsOn: LocalDate;
  /** Calendar days until the first exam day in the student's time zone (0 = today, negative = under way). */
  daysUntil: number;
  /** Dates not yet confirmed against the official timetable: show "provisional". */
  isProvisional: boolean;
  subjects: string[];
}

export interface ChildOverview {
  student: { userId: string; firstName: string | null; timezone: string };
  visibleSections: ChildOverviewSection[];
  /** Shared by the student but not included in their plan (detailed parent reports); never computed. */
  lockedSections: ChildOverviewSection[];
  /** The detailed-report sections were included (the child's plan has parent reports, or not a parent view). */
  reportsIncluded: boolean;
  subjects: {
    subjectId: string;
    subjectName: string;
    qualification: string;
    status: "ACTIVE" | "PAUSED";
    targetGrade: string | null;
  }[];
  examCountdown: { next: CountdownEntry | null; sessions: CountdownEntry[] };
  progress?: {
    subjectId: string;
    subjectName: string;
    progressPct: number | null;
    syllabusCoveragePct: number | null;
    topicsStarted: number;
    topicsCompleted: number;
    topicsTotal: number;
    lessonsCompleted: number;
    questionsAttempted: number;
    correctRatePct: number | null;
    readinessPct: number | null;
    /** Grade ESTIMATE from mastery and mocks (never an official grade); null until enough evidence. */
    predictedGradeEstimate: string | null;
    lastActivityAt: Date | null;
  }[];
  weakAreas?: {
    topicId: string;
    topicName: string;
    subjectId: string;
    subjectName: string;
    band: MasteryBand;
    score: number;
    lastPracticedAt: Date | null;
  }[];
  studyTime?: {
    last7Days: { minutes: number; activeDays: number };
    last30Days: { minutes: number; activeDays: number };
    /** Study sessions per subject over the last 30 days ("General" when not tied to a subject). */
    bySubjectLast30Days: { subjectId: string | null; subjectName: string | null; minutes: number }[];
    streak: { current: number; longest: number } | null;
  };
  activityCalendar?: {
    from: LocalDate;
    to: LocalDate;
    days: { date: LocalDate; active: boolean; studyMinutes: number; questionsAttempted: number; streakFreezeUsed: boolean }[];
  };
  testResults?: {
    recent: {
      attemptId: string;
      subjectId: string;
      subjectName: string;
      mode: string;
      title: string | null;
      percentage: number | null;
      /** Grade ESTIMATE from configured bands (never an official grade). */
      gradeEstimate: string | null;
      isProvisional: boolean;
      submittedAt: Date | null;
    }[];
    bySubject: {
      subjectId: string;
      subjectName: string;
      averageScorePct: number | null;
      averageMockPct: number | null;
      lastMockPct: number | null;
      bestMockPct: number | null;
      assessmentsCompleted: number;
      mockExamsCompleted: number;
    }[];
  };
}

const optionsSchema = z.object({
  permissions: z.object({ canViewProgress: z.boolean(), canViewStudyActivity: z.boolean(), canViewTestResults: z.boolean() }),
  includeReports: z.boolean().optional(),
});

/** §21 parent view of one child. See the module docs for the authorization contract. */
export async function getChildOverview(studentUserId: string, options: ChildOverviewOptions): Promise<ChildOverview> {
  if (!z.uuid().safeParse(studentUserId).success) throw AppError.validation({ studentUserId: ["Invalid student."] });
  const parsed = optionsSchema.safeParse(options);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid permissions.");
  const reportsIncluded = parsed.data.includeReports ?? true;
  const sections = childOverviewSections(parsed.data.permissions, reportsIncluded);
  const canViewProgress = sections.visible.includes("progress");
  const canViewStudyActivity = sections.visible.includes("studyTime");
  const canViewCalendar = sections.visible.includes("activityCalendar");
  const canViewTestResults = sections.visible.includes("testResults");
  const now = options.now ?? new Date();
  const recentLimit = Math.min(50, Math.max(1, Math.floor(options.recentResultsLimit ?? 10)));
  const weakLimit = Math.min(50, Math.max(1, Math.floor(options.weakAreasLimit ?? 10)));

  const student = await db.student.findUnique({
    where: { userId: studentUserId },
    select: {
      userId: true,
      targetExamSessionId: true,
      user: { select: { profile: { select: { firstName: true, timezone: true } } } },
    },
  });
  if (!student) throw AppError.notFound("Student not found.");
  const profileZone = student.user.profile?.timezone;
  const timezone = profileZone && isValidTimeZone(profileZone) ? profileZone : "Africa/Harare";
  const today = localDateString(now, timezone);

  const enrolments = await db.subjectEnrollment.findMany({
    where: { userId: studentUserId, status: { in: ["ACTIVE", "PAUSED"] } },
    select: {
      subjectId: true,
      syllabusId: true,
      status: true,
      targetGrade: true,
      targetExamSessionId: true,
      subject: { select: { name: true, qualification: { select: { shortName: true } } } },
    },
    orderBy: [{ subject: { name: "asc" } }, { subjectId: "asc" }],
  });
  const subjectName = new Map(enrolments.map((e) => [e.subjectId, e.subject.name]));

  const visibleSections: ChildOverviewSection[] = ["subjects", "examCountdown"];
  const overview: ChildOverview = {
    student: { userId: student.userId, firstName: student.user.profile?.firstName ?? null, timezone },
    visibleSections,
    lockedSections: sections.locked,
    reportsIncluded,
    subjects: enrolments.map((e) => ({
      subjectId: e.subjectId,
      subjectName: e.subject.name,
      qualification: e.subject.qualification.shortName,
      status: e.status as "ACTIVE" | "PAUSED",
      targetGrade: e.targetGrade,
    })),
    examCountdown: await examCountdown(enrolments, student.targetExamSessionId, now, timezone, today),
  };

  const needsProgressRollup = canViewProgress || canViewTestResults;
  const progressRows = needsProgressRollup && enrolments.length
    ? await db.subjectProgress.findMany({
        where: { userId: studentUserId, subjectId: { in: enrolments.map((e) => e.subjectId) } },
        select: {
          subjectId: true,
          progressPercent: true,
          syllabusCoveragePercent: true,
          topicsStarted: true,
          topicsCompleted: true,
          topicsTotal: true,
          lessonsCompleted: true,
          questionsAttempted: true,
          questionsCorrect: true,
          readinessPercent: true,
          predictedGrade: true,
          lastActivityAt: true,
          averageScorePercent: true,
          averageMockPercent: true,
          lastMockPercent: true,
          bestMockPercent: true,
          assessmentsCompleted: true,
          mockExamsCompleted: true,
        },
      })
    : [];
  const progressBySubject = new Map(progressRows.map((row) => [row.subjectId, row]));

  if (canViewProgress) {
    visibleSections.push("progress", "weakAreas");
    overview.progress = enrolments.map((e) => {
      const p = progressBySubject.get(e.subjectId);
      return {
        subjectId: e.subjectId,
        subjectName: e.subject.name,
        progressPct: p ? roundOrNull(p.progressPercent) : null,
        syllabusCoveragePct: p ? roundOrNull(p.syllabusCoveragePercent) : null,
        topicsStarted: p?.topicsStarted ?? 0,
        topicsCompleted: p?.topicsCompleted ?? 0,
        topicsTotal: p?.topicsTotal ?? 0,
        lessonsCompleted: p?.lessonsCompleted ?? 0,
        questionsAttempted: p?.questionsAttempted ?? 0,
        correctRatePct: p ? percent(p.questionsCorrect, p.questionsAttempted) : null,
        readinessPct: roundOrNull(p?.readinessPercent ?? null),
        predictedGradeEstimate: p?.predictedGrade ?? null,
        lastActivityAt: p?.lastActivityAt ?? null,
      };
    });
    const weak = enrolments.length
      ? await db.topicMastery.findMany({
          where: {
            userId: studentUserId,
            topicKind: "TOPIC",
            band: { in: ["WEAK", "DEVELOPING"] },
            OR: enrolments.map((e) => ({ subjectId: e.subjectId, syllabusId: e.syllabusId })),
            AND: [{ OR: [{ questionsAttempted: { gt: 0 } }, { seededByDiagnostic: true }] }],
          },
          select: { topicId: true, subjectId: true, score: true, band: true, lastPracticedAt: true, topic: { select: { name: true } } },
          orderBy: [{ score: "asc" }, { topicId: "asc" }],
          take: weakLimit,
        })
      : [];
    overview.weakAreas = weak.map((row) => ({
      topicId: row.topicId,
      topicName: row.topic.name,
      subjectId: row.subjectId,
      subjectName: subjectName.get(row.subjectId) ?? "",
      band: row.band,
      score: roundOrNull(row.score) ?? 0,
      lastPracticedAt: row.lastPracticedAt,
    }));
  }

  if (canViewStudyActivity) {
    visibleSections.push("studyTime");
    if (canViewCalendar) visibleSections.push("activityCalendar");
    const month = trailingRange(today, 30);
    const week = trailingRange(today, 7);
    const [days, sessions, stats] = await Promise.all([
      db.dailyActivity.findMany({
        where: { userId: studentUserId, date: { gte: dateColumnFromLocalDate(month.from), lte: dateColumnFromLocalDate(month.to) } },
        select: {
          date: true,
          studySeconds: true,
          questionsAttempted: true,
          flashcardsReviewed: true,
          lessonsCompleted: true,
          assessmentsCompleted: true,
          streakFreezeUsed: true,
        },
      }),
      db.$queryRaw<{ subjectId: string | null; seconds: number }[]>`
        SELECT s."subjectId"::text AS "subjectId", sum(s."durationSeconds")::float8 AS seconds
        FROM "StudySession" s
        WHERE s."userId" = ${studentUserId}::uuid
          AND s."startedAt" >= ${new Date(startOfLocalDay(month.from, timezone).getTime() - 86_400_000)}
          AND s."localDate" >= ${month.from}::date AND s."localDate" <= ${month.to}::date
          AND s."durationSeconds" > 0
        GROUP BY s."subjectId"`,
      db.learnerStats.findUnique({ where: { userId: studentUserId }, select: { currentStreak: true, longestStreak: true } }),
    ]);
    const byDate = new Map(
      days.map((row) => {
        const active =
          row.studySeconds > 0 || row.questionsAttempted > 0 || row.flashcardsReviewed > 0 || row.lessonsCompleted > 0 || row.assessmentsCompleted > 0;
        return [localDateFromDateColumn(row.date), { active, row }] as const;
      }),
    );
    const sumWindow = (from: LocalDate) => {
      let seconds = 0;
      let activeDays = 0;
      for (const [date, { active, row }] of byDate) {
        if (date < from) continue;
        seconds += row.studySeconds;
        if (active) activeDays += 1;
      }
      return { minutes: roundOrNull(seconds / 60) ?? 0, activeDays };
    };
    const sessionSubjectIds = sessions.map((s) => s.subjectId).filter((id): id is string => id !== null && !subjectName.has(id));
    if (sessionSubjectIds.length) {
      for (const row of await db.subject.findMany({ where: { id: { in: sessionSubjectIds } }, select: { id: true, name: true } })) {
        subjectName.set(row.id, row.name);
      }
    }
    overview.studyTime = {
      last7Days: sumWindow(week.from),
      last30Days: sumWindow(month.from),
      bySubjectLast30Days: sessions
        .map((s) => ({ subjectId: s.subjectId, subjectName: s.subjectId ? (subjectName.get(s.subjectId) ?? null) : null, minutes: roundOrNull(s.seconds / 60) ?? 0 }))
        .sort((a, b) => b.minutes - a.minutes || (a.subjectName ?? "").localeCompare(b.subjectName ?? "")),
      streak: stats ? { current: stats.currentStreak, longest: stats.longestStreak } : null,
    };
    if (canViewCalendar) {
      overview.activityCalendar = {
        from: month.from,
        to: month.to,
        // No row for a day means the student did not study that day: a real zero.
        days: dailySeries(month, byDate).map(({ date, value }) => ({
          date,
          active: value?.active ?? false,
          studyMinutes: value ? (roundOrNull(value.row.studySeconds / 60) ?? 0) : 0,
          questionsAttempted: value?.row.questionsAttempted ?? 0,
          streakFreezeUsed: value?.row.streakFreezeUsed ?? false,
        })),
      };
    }
  }

  if (canViewTestResults) {
    visibleSections.push("testResults");
    const attempts = await db.assessmentAttempt.findMany({
      where: {
        userId: studentUserId,
        mode: { in: [...SCORED_ASSESSMENT_MODES] },
        status: { in: ["MARKED", "AWAITING_MARKING"] },
      },
      select: {
        id: true,
        subjectId: true,
        mode: true,
        status: true,
        percentage: true,
        gradeEstimate: true,
        pendingReviewCount: true,
        submittedAt: true,
        subject: { select: { name: true } },
        assessment: { select: { title: true } },
      },
      orderBy: [{ startedAt: "desc" }, { id: "desc" }],
      take: recentLimit,
    });
    overview.testResults = {
      recent: attempts.map((a) => ({
        attemptId: a.id,
        subjectId: a.subjectId,
        subjectName: a.subject.name,
        mode: a.mode,
        title: a.assessment?.title ?? null,
        percentage: roundOrNull(a.percentage),
        gradeEstimate: a.gradeEstimate,
        isProvisional: a.status !== "MARKED" || a.pendingReviewCount > 0,
        submittedAt: a.submittedAt,
      })),
      bySubject: enrolments.map((e) => {
        const p = progressBySubject.get(e.subjectId);
        return {
          subjectId: e.subjectId,
          subjectName: e.subject.name,
          averageScorePct: roundOrNull(p?.averageScorePercent ?? null),
          averageMockPct: roundOrNull(p?.averageMockPercent ?? null),
          lastMockPct: roundOrNull(p?.lastMockPercent ?? null),
          bestMockPct: roundOrNull(p?.bestMockPercent ?? null),
          assessmentsCompleted: p?.assessmentsCompleted ?? 0,
          mockExamsCompleted: p?.mockExamsCompleted ?? 0,
        };
      }),
    };
  }

  return overview;
}

/** §17 countdown: every target session of the child's subjects (and the student-level target), soonest first. */
async function examCountdown(
  enrolments: readonly { subjectId: string; targetExamSessionId: string | null; subject: { name: string } }[],
  studentTargetSessionId: string | null,
  now: Date,
  timezone: string,
  today: LocalDate,
): Promise<{ next: CountdownEntry | null; sessions: CountdownEntry[] }> {
  const subjectsBySession = new Map<string, string[]>();
  for (const e of enrolments) {
    if (!e.targetExamSessionId) continue;
    const list = subjectsBySession.get(e.targetExamSessionId) ?? [];
    list.push(e.subject.name);
    subjectsBySession.set(e.targetExamSessionId, list);
  }
  if (studentTargetSessionId && !subjectsBySession.has(studentTargetSessionId)) subjectsBySession.set(studentTargetSessionId, []);
  if (subjectsBySession.size === 0) return { next: null, sessions: [] };
  // ExamSessionStatus is the session's visibility in countdowns (§17): only PUBLISHED sessions are shown. DRAFT
  // (unreviewed dates), CANCELLED and ARCHIVED sessions never reach a parent, even if an enrolment still targets one.
  const sessions = await db.examSession.findMany({
    where: { id: { in: [...subjectsBySession.keys()] }, status: "PUBLISHED", endsOn: { gte: dateColumnFromLocalDate(today) } },
    select: { id: true, name: true, startsOn: true, isProvisional: true },
  });
  const entries = sessions
    .map((s): CountdownEntry => {
      const startsOn = localDateFromDateColumn(s.startsOn);
      return {
        examSessionId: s.id,
        name: s.name,
        startsOn,
        daysUntil: daysUntil(startsOn, now, timezone),
        isProvisional: s.isProvisional,
        subjects: [...(subjectsBySession.get(s.id) ?? [])].sort(),
      };
    })
    .sort((a, b) => a.startsOn.localeCompare(b.startsOn) || a.examSessionId.localeCompare(b.examSessionId));
  return { next: entries[0] ?? null, sessions: entries };
}
