import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { addDays, localDateString, type LocalDate } from "@/lib/dates";
import { MASTERY_BANDS, type MasteryBand } from "@/lib/mastery-band";
import { meanOf, percent, roundOrNull, SCORED_ASSESSMENT_MODES, trailingRange } from "./core";
import { activeDayPredicate } from "./queries";

/**
 * Teacher class analytics (§22 drill-down: class average → subject performance → topic performance → individual
 * students) and the per-student detail page.
 *
 * AUTHORIZATION: callers MUST first check that the actor currently teaches the class (ClassTeacher.removedAt IS NULL)
 * or is an ACTIVE SCHOOL_ADMIN of its school — `assertClassAccess(actor, classId)` in `./access`. This service takes an
 * already-authorised classId.
 *
 * Data rules: only ACTIVE ClassMembers are included (pending and removed students never appear); per-topic data reads
 * the student's PINNED syllabus version (TopicMastery.syllabusId = SubjectEnrollment.syllabusId), and every subject row
 * names the version each student is on (§26: students on an older version can move to the current one); dashboards read the
 * rollups (SubjectProgress, TopicMastery, AssignmentProgress, DailyActivity) through their per-user indexes; AI
 * conversations and AI tables are never read (§21/§22 privacy).
 */

export interface ClassAnalyticsOptions {
  now?: Date;
  /**
   * Subjects the read model may include (the teacher's resource scope). Default: the class subject, or every subject
   * the members study for a subject-less class. Pass a subject-less class's derived scope (the subjects of the work set
   * to it, `classSubjectScope` in src/server/teaching/access.ts) so nothing else is read; an empty list reads no
   * subject data. For a class WITH a subject the list can only narrow it.
   */
  subjectIds?: readonly string[];
}

/** The subject filter for a class read: `null` = every subject (subject-less class without an explicit scope). */
function subjectFilter(classSubjectId: string | null, scope: readonly string[] | undefined): string[] | null {
  if (scope === undefined) return classSubjectId ? [classSubjectId] : null;
  const ids = [...new Set(scope)];
  return classSubjectId ? ids.filter((id) => id === classSubjectId) : ids;
}

const WEAK_BANDS: readonly MasteryBand[] = ["WEAK", "DEVELOPING"];

/** Students per §11 mastery band. */
export type BandCounts = Record<MasteryBand, number>;

function emptyBands(): BandCounts {
  return Object.fromEntries(MASTERY_BANDS.map((band) => [band, 0])) as BandCounts;
}

interface TopicAccumulator {
  topicId: string;
  topicName: string;
  students: number;
  scoreSum: number;
  weak: number;
  bands: BandCounts;
  attempted: number;
  correct: number;
}

function newTopicAccumulator(topicId: string, topicName: string): TopicAccumulator {
  return { topicId, topicName, students: 0, scoreSum: 0, weak: 0, bands: emptyBands(), attempted: 0, correct: 0 };
}

export interface ClassTopicPerformance {
  topicId: string;
  topicName: string;
  studentsStarted: number;
  averageMastery: number;
  weakStudents: number;
  bands: BandCounts;
  questionsAttempted: number;
  correctRatePct: number | null;
}

export interface ClassSubjectPerformance {
  subjectId: string;
  subjectName: string;
  studentsEnrolled: number;
  averageScorePct: number | null;
  studentsWithScores: number;
  averageProgressPct: number | null;
  averageMockPct: number | null;
  averageReadinessPct: number | null;
  questionsAttempted: number;
  correctRatePct: number | null;
  /** Syllabus versions the enrolled students are pinned to (§26), current version first, then newest. */
  syllabusVersions: { syllabusId: string; versionLabel: string; isCurrent: boolean; students: number }[];
  /** Weakest first. */
  topics: ClassTopicPerformance[];
}

/** The syllabus version a student is pinned to in one subject (§26). */
export interface StudentSyllabusVersion {
  subjectId: string;
  subjectName: string;
  syllabusId: string;
  versionLabel: string;
  /** False when the student is still on an older (superseded or archived) version. */
  isCurrent: boolean;
}

export interface ClassStudentRow {
  userId: string;
  name: string | null;
  averageScorePct: number | null;
  progressPct: number | null;
  weakTopics: number;
  assignments: { assigned: number; completed: number; completionPct: number | null };
  lastActiveDate: LocalDate | null;
  /** Pinned syllabus version per subject in scope, by subject name. */
  syllabusVersions: StudentSyllabusVersion[];
}

export interface ClassAnalytics {
  class: { classId: string; name: string; schoolId: string | null; subjectId: string | null; subjectName: string | null; archived: boolean };
  /** Level 1: class average across members' subject results in scope. */
  classAverage: {
    students: number;
    averageScorePct: number | null;
    studentsWithScores: number;
    averageProgressPct: number | null;
    activeLast7Days: number;
    activeLast30Days: number;
  };
  /** Levels 2 and 3. */
  subjects: ClassSubjectPerformance[];
  /** Level 4, sorted by name. */
  students: ClassStudentRow[];
}

const idSchema = z.uuid();

function personName(profile: { displayName: string | null; firstName: string | null; lastName: string | null } | null | undefined): string | null {
  if (!profile) return null;
  if (profile.displayName) return profile.displayName;
  const parts = [profile.firstName, profile.lastName].filter((p): p is string => Boolean(p && p.trim()));
  return parts.length ? parts.join(" ") : null;
}

async function loadClass(classId: string) {
  if (!idSchema.safeParse(classId).success) throw AppError.validation({ classId: ["Invalid class."] });
  const cls = await db.class.findUnique({
    where: { id: classId },
    select: { id: true, name: true, schoolId: true, subjectId: true, archivedAt: true, subject: { select: { name: true } } },
  });
  if (!cls) throw AppError.notFound("Class not found.");
  return cls;
}

interface EnrolmentRow {
  userId: string;
  subjectId: string;
  subjectName: string;
  syllabusId: string;
  versionLabel: string;
  isCurrentVersion: boolean;
  /** For ordering versions: newest first. */
  effectiveFrom: Date;
}

/** Members' ACTIVE/PAUSED enrolments in the subjects in scope (`null` = every subject; see {@link subjectFilter}). */
async function scopedEnrolments(userIds: readonly string[], subjectIds: readonly string[] | null): Promise<EnrolmentRow[]> {
  if (userIds.length === 0 || (subjectIds !== null && subjectIds.length === 0)) return [];
  const rows = await db.subjectEnrollment.findMany({
    where: { userId: { in: [...userIds] }, status: { in: ["ACTIVE", "PAUSED"] }, ...(subjectIds ? { subjectId: { in: [...subjectIds] } } : {}) },
    select: {
      userId: true,
      subjectId: true,
      syllabusId: true,
      subject: { select: { name: true } },
      syllabus: { select: { versionLabel: true, status: true, effectiveFrom: true } },
    },
  });
  return rows.map((row) => ({
    userId: row.userId,
    subjectId: row.subjectId,
    subjectName: row.subject.name,
    syllabusId: row.syllabusId,
    versionLabel: row.syllabus.versionLabel,
    isCurrentVersion: row.syllabus.status === "CURRENT",
    effectiveFrom: row.syllabus.effectiveFrom,
  }));
}

/** Students per pinned version of one subject: the current version first, then newest first. */
function versionCounts(rows: readonly EnrolmentRow[]): ClassSubjectPerformance["syllabusVersions"] {
  const byVersion = new Map<string, { row: EnrolmentRow; students: number }>();
  for (const row of rows) {
    const entry = byVersion.get(row.syllabusId);
    if (entry) entry.students += 1;
    else byVersion.set(row.syllabusId, { row, students: 1 });
  }
  return [...byVersion.values()]
    .sort(
      (a, b) =>
        Number(b.row.isCurrentVersion) - Number(a.row.isCurrentVersion) ||
        b.row.effectiveFrom.getTime() - a.row.effectiveFrom.getTime() ||
        a.row.versionLabel.localeCompare(b.row.versionLabel),
    )
    .map(({ row, students }) => ({ syllabusId: row.syllabusId, versionLabel: row.versionLabel, isCurrent: row.isCurrentVersion, students }));
}

/** Most recent day with learning activity per user (DailyActivity PK (userId, date), newest first). */
async function lastActiveDates(userIds: readonly string[]): Promise<Map<string, LocalDate>> {
  if (userIds.length === 0) return new Map();
  const rows = await db.$queryRaw<{ userId: string; date: string }[]>`
    SELECT DISTINCT ON (d."userId") d."userId"::text AS "userId", to_char(d."date", 'YYYY-MM-DD') AS date
    FROM "DailyActivity" d
    WHERE d."userId" = ANY(${[...userIds]}::uuid[]) AND ${activeDayPredicate()}
    ORDER BY d."userId", d."date" DESC`;
  return new Map(rows.map((row) => [row.userId, row.date]));
}

/** §22 class drill-down. */
export async function getClassAnalytics(classId: string, options: ClassAnalyticsOptions = {}): Promise<ClassAnalytics> {
  const cls = await loadClass(classId);
  const now = options.now ?? new Date();
  const today = localDateString(now);

  const members = await db.classMember.findMany({
    where: { classId, status: "ACTIVE" },
    select: { userId: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
  });
  const memberIds = members.map((m) => m.userId);
  const enrolments = await scopedEnrolments(memberIds, subjectFilter(cls.subjectId, options.subjectIds));
  const subjectIds = [...new Set(enrolments.map((e) => e.subjectId))];
  const subjectNames = new Map(enrolments.map((e) => [e.subjectId, e.subjectName]));
  const enrolledPairs = new Set(enrolments.map((e) => `${e.userId}:${e.subjectId}`));

  const [progress, topicRows, weakByStudent, assignmentRows, lastActive] = await Promise.all([
    memberIds.length && subjectIds.length
      ? db.subjectProgress.findMany({
          where: { userId: { in: memberIds }, subjectId: { in: subjectIds } },
          select: {
            userId: true,
            subjectId: true,
            averageScorePercent: true,
            progressPercent: true,
            averageMockPercent: true,
            readinessPercent: true,
            questionsAttempted: true,
            questionsCorrect: true,
          },
        })
      : Promise.resolve([]),
    db.$queryRaw<
      { subjectId: string; topicId: string; topicName: string; band: MasteryBand; students: number; scoreSum: number; attempted: number; correct: number }[]
    >`
      SELECT tm."subjectId"::text AS "subjectId", tm."topicId"::text AS "topicId", min(t."name") AS "topicName",
        tm."band"::text AS band, count(*)::int AS students, sum(tm."score")::float8 AS "scoreSum",
        sum(tm."questionsAttempted")::int AS attempted, sum(tm."questionsCorrect")::int AS correct
      FROM "TopicMastery" tm
      JOIN "SubjectEnrollment" e
        ON e."userId" = tm."userId" AND e."subjectId" = tm."subjectId" AND e."syllabusId" = tm."syllabusId"
      JOIN "Topic" t ON t."id" = tm."topicId"
      WHERE tm."userId" = ANY(${memberIds}::uuid[]) AND tm."subjectId" = ANY(${subjectIds}::uuid[])
        AND tm."topicKind" = 'TOPIC' AND e."status" IN ('ACTIVE', 'PAUSED')
      GROUP BY tm."subjectId", tm."topicId", tm."band"`,
    db.$queryRaw<{ userId: string; weak: number }[]>`
      SELECT tm."userId"::text AS "userId", count(*)::int AS weak
      FROM "TopicMastery" tm
      JOIN "SubjectEnrollment" e
        ON e."userId" = tm."userId" AND e."subjectId" = tm."subjectId" AND e."syllabusId" = tm."syllabusId"
      WHERE tm."userId" = ANY(${memberIds}::uuid[]) AND tm."subjectId" = ANY(${subjectIds}::uuid[])
        AND tm."topicKind" = 'TOPIC' AND tm."band" IN ('WEAK', 'DEVELOPING') AND e."status" IN ('ACTIVE', 'PAUSED')
      GROUP BY tm."userId"`,
    db.$queryRaw<{ userId: string; assigned: number; completed: number }[]>`
      SELECT ap."userId"::text AS "userId",
        count(*) FILTER (WHERE ap."status" <> 'EXCUSED')::int AS assigned,
        count(*) FILTER (WHERE ap."status" IN ('SUBMITTED', 'LATE'))::int AS completed
      FROM "Assignment" a
      JOIN "AssignmentProgress" ap ON ap."assignmentId" = a."id"
      WHERE a."classId" = ${classId}::uuid AND a."status" <> 'DRAFT' AND ap."userId" = ANY(${memberIds}::uuid[])
      GROUP BY ap."userId"`,
    lastActiveDates(memberIds),
  ]);

  // Only rollups of subjects the student is (still) enrolled in count.
  const scopedProgress = progress.filter((row) => enrolledPairs.has(`${row.userId}:${row.subjectId}`));

  const subjects: ClassSubjectPerformance[] = subjectIds
    .map((subjectId) => {
      const rows = scopedProgress.filter((row) => row.subjectId === subjectId);
      const scores = rows.map((row) => row.averageScorePercent);
      const attempted = rows.reduce((sum, row) => sum + row.questionsAttempted, 0);
      const correct = rows.reduce((sum, row) => sum + row.questionsCorrect, 0);
      const topics = new Map<string, TopicAccumulator>();
      for (const row of topicRows) {
        if (row.subjectId !== subjectId) continue;
        const entry = topics.get(row.topicId) ?? newTopicAccumulator(row.topicId, row.topicName);
        entry.students += row.students;
        entry.scoreSum += row.scoreSum;
        entry.bands[row.band] += row.students;
        if (WEAK_BANDS.includes(row.band)) entry.weak += row.students;
        entry.attempted += row.attempted;
        entry.correct += row.correct;
        topics.set(row.topicId, entry);
      }
      const topicList: ClassTopicPerformance[] = [...topics.values()]
        .map((topic) => ({
          topicId: topic.topicId,
          topicName: topic.topicName,
          studentsStarted: topic.students,
          averageMastery: roundOrNull(topic.scoreSum / topic.students) ?? 0,
          weakStudents: topic.weak,
          bands: topic.bands,
          questionsAttempted: topic.attempted,
          correctRatePct: percent(topic.correct, topic.attempted),
        }))
        .sort((a, b) => a.averageMastery - b.averageMastery || b.studentsStarted - a.studentsStarted || a.topicId.localeCompare(b.topicId));
      const withScores = scores.filter((s): s is number => s !== null);
      return {
        subjectId,
        subjectName: subjectNames.get(subjectId) ?? "",
        studentsEnrolled: enrolments.filter((e) => e.subjectId === subjectId).length,
        averageScorePct: roundOrNull(meanOf(scores)),
        studentsWithScores: withScores.length,
        averageProgressPct: roundOrNull(meanOf(rows.map((row) => row.progressPercent))),
        averageMockPct: roundOrNull(meanOf(rows.map((row) => row.averageMockPercent))),
        averageReadinessPct: roundOrNull(meanOf(rows.map((row) => row.readinessPercent))),
        questionsAttempted: attempted,
        correctRatePct: percent(correct, attempted),
        syllabusVersions: versionCounts(enrolments.filter((e) => e.subjectId === subjectId)),
        topics: topicList,
      };
    })
    .sort((a, b) => a.subjectName.localeCompare(b.subjectName) || a.subjectId.localeCompare(b.subjectId));

  const weakMap = new Map(weakByStudent.map((row) => [row.userId, row.weak]));
  const assignmentMap = new Map(assignmentRows.map((row) => [row.userId, row]));
  const students: ClassStudentRow[] = members
    .map((member) => {
      const rows = scopedProgress.filter((row) => row.userId === member.userId);
      const assignments = assignmentMap.get(member.userId);
      return {
        userId: member.userId,
        name: personName(member.user.profile),
        averageScorePct: roundOrNull(meanOf(rows.map((row) => row.averageScorePercent))),
        progressPct: roundOrNull(meanOf(rows.map((row) => row.progressPercent))),
        weakTopics: weakMap.get(member.userId) ?? 0,
        assignments: {
          assigned: assignments?.assigned ?? 0,
          completed: assignments?.completed ?? 0,
          completionPct: percent(assignments?.completed ?? 0, assignments?.assigned ?? 0),
        },
        lastActiveDate: lastActive.get(member.userId) ?? null,
        syllabusVersions: enrolments
          .filter((e) => e.userId === member.userId)
          .sort((x, y) => x.subjectName.localeCompare(y.subjectName) || x.subjectId.localeCompare(y.subjectId))
          .map((e) => ({ subjectId: e.subjectId, subjectName: e.subjectName, syllabusId: e.syllabusId, versionLabel: e.versionLabel, isCurrent: e.isCurrentVersion })),
      };
    })
    .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "") || a.userId.localeCompare(b.userId));

  const week = trailingRange(today, 7).from;
  const month = trailingRange(today, 30).from;
  const lastDates = [...lastActive.values()];
  const allScores = scopedProgress.map((row) => row.averageScorePercent);

  return {
    class: {
      classId: cls.id,
      name: cls.name,
      schoolId: cls.schoolId,
      subjectId: cls.subjectId,
      subjectName: cls.subject?.name ?? null,
      archived: cls.archivedAt !== null,
    },
    classAverage: {
      students: members.length,
      averageScorePct: roundOrNull(meanOf(allScores)),
      studentsWithScores: new Set(scopedProgress.filter((row) => row.averageScorePercent !== null).map((row) => row.userId)).size,
      averageProgressPct: roundOrNull(meanOf(scopedProgress.map((row) => row.progressPercent))),
      activeLast7Days: lastDates.filter((date) => date >= week).length,
      activeLast30Days: lastDates.filter((date) => date >= month).length,
    },
    subjects,
    students,
  };
}

export interface ClassStudentDetail {
  classId: string;
  student: { userId: string; name: string | null; joinedClassAt: Date };
  subjects: {
    subjectId: string;
    subjectName: string;
    /** The syllabus version the student is pinned to (§26). */
    syllabus: { id: string; title: string; versionLabel: string; isCurrent: boolean };
    progressPct: number | null;
    syllabusCoveragePct: number | null;
    averageScorePct: number | null;
    averageMockPct: number | null;
    readinessPct: number | null;
    topicsStarted: number;
    topicsCompleted: number;
    topicsTotal: number;
    questionsAttempted: number;
    correctRatePct: number | null;
    /** Mastery per TOPIC of the pinned syllabus version, in syllabus order. */
    mastery: {
      topicId: string;
      topicName: string;
      score: number;
      band: MasteryBand;
      questionsAttempted: number;
      correctRatePct: number | null;
      lastPracticedAt: Date | null;
    }[];
  }[];
  /** Most recent marked (or provisionally marked) quizzes, tests, timed exams and mocks in the class subject(s). */
  recentScores: {
    attemptId: string;
    subjectId: string;
    mode: string;
    title: string | null;
    percentage: number | null;
    /** Grade ESTIMATE from configured bands (never an official grade). */
    gradeEstimate: string | null;
    isProvisional: boolean;
    submittedAt: Date | null;
  }[];
  assignments: {
    summary: { assigned: number; completed: number; late: number; missed: number; completionPct: number | null; averageScorePct: number | null };
    items: { assignmentId: string; title: string; dueAt: Date | null; status: string; scorePercent: number | null; submittedAt: Date | null }[];
  };
  activity: { lastActiveDate: LocalDate | null; activeDaysLast30: number; studyMinutesLast30: number };
}

/** §22 individual student performance within a class. Throws NOT_FOUND unless the student is an ACTIVE member. */
export async function getClassStudentDetail(
  classId: string,
  studentUserId: string,
  options: ClassAnalyticsOptions & { recentScoresLimit?: number } = {},
): Promise<ClassStudentDetail> {
  const cls = await loadClass(classId);
  if (!idSchema.safeParse(studentUserId).success) throw AppError.validation({ studentUserId: ["Invalid student."] });
  const membership = await db.classMember.findUnique({
    where: { classId_userId: { classId, userId: studentUserId } },
    select: { status: true, joinedAt: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
  });
  if (!membership || membership.status !== "ACTIVE") throw AppError.notFound("This student is not in the class.");
  const now = options.now ?? new Date();
  const today = localDateString(now);
  const limit = Math.min(50, Math.max(1, Math.floor(options.recentScoresLimit ?? 20)));

  const filter = subjectFilter(cls.subjectId, options.subjectIds);
  const enrolments = await db.subjectEnrollment.findMany({
    where: { userId: studentUserId, status: { in: ["ACTIVE", "PAUSED"] }, ...(filter ? { subjectId: { in: filter } } : {}) },
    select: {
      subjectId: true,
      syllabusId: true,
      subject: { select: { name: true } },
      syllabus: { select: { title: true, versionLabel: true, status: true } },
      progress: {
        select: {
          progressPercent: true,
          syllabusCoveragePercent: true,
          averageScorePercent: true,
          averageMockPercent: true,
          readinessPercent: true,
          topicsStarted: true,
          topicsCompleted: true,
          topicsTotal: true,
          questionsAttempted: true,
          questionsCorrect: true,
        },
      },
    },
    orderBy: { subject: { name: "asc" } },
  });
  const subjectIds = enrolments.map((e) => e.subjectId);
  const monthStart = addDays(today, -29);

  const [mastery, attempts, assignments, activity, lastActive] = await Promise.all([
    db.topicMastery.findMany({
      where: {
        userId: studentUserId,
        topicKind: "TOPIC",
        OR: enrolments.map((e) => ({ subjectId: e.subjectId, syllabusId: e.syllabusId })),
      },
      select: {
        subjectId: true,
        topicId: true,
        score: true,
        band: true,
        questionsAttempted: true,
        questionsCorrect: true,
        lastPracticedAt: true,
        topic: { select: { name: true, sortOrder: true, path: true } },
      },
    }),
    subjectIds.length
      ? db.assessmentAttempt.findMany({
          where: {
            userId: studentUserId,
            subjectId: { in: subjectIds },
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
            assessment: { select: { title: true } },
          },
          orderBy: [{ submittedAt: "desc" }, { id: "desc" }],
          take: limit,
        })
      : Promise.resolve([]),
    db.assignment.findMany({
      where: { classId, status: { not: "DRAFT" } },
      select: {
        id: true,
        title: true,
        dueAt: true,
        progress: { where: { userId: studentUserId }, select: { status: true, scorePercent: true, submittedAt: true } },
      },
      orderBy: [{ dueAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
      take: 100,
    }),
    db.$queryRaw<{ days: number; seconds: number }[]>`
      SELECT count(*)::int AS days, coalesce(sum(d."studySeconds"), 0)::float8 AS seconds
      FROM "DailyActivity" d
      WHERE d."userId" = ${studentUserId}::uuid AND d."date" >= ${monthStart}::date AND d."date" <= ${today}::date
        AND ${activeDayPredicate()}`,
    lastActiveDates([studentUserId]),
  ]);

  const assigned = assignments.filter((a) => a.progress[0] && a.progress[0].status !== "EXCUSED");
  const completedItems = assigned.filter((a) => a.progress[0]?.status === "SUBMITTED" || a.progress[0]?.status === "LATE");
  const scored = assigned.map((a) => a.progress[0]?.scorePercent ?? null);

  return {
    classId,
    student: { userId: studentUserId, name: personName(membership.user.profile), joinedClassAt: membership.joinedAt },
    subjects: enrolments.map((enrolment) => {
      const p = enrolment.progress;
      return {
        subjectId: enrolment.subjectId,
        subjectName: enrolment.subject.name,
        syllabus: {
          id: enrolment.syllabusId,
          title: enrolment.syllabus.title,
          versionLabel: enrolment.syllabus.versionLabel,
          isCurrent: enrolment.syllabus.status === "CURRENT",
        },
        progressPct: p ? roundOrNull(p.progressPercent) : null,
        syllabusCoveragePct: p ? roundOrNull(p.syllabusCoveragePercent) : null,
        averageScorePct: roundOrNull(p?.averageScorePercent ?? null),
        averageMockPct: roundOrNull(p?.averageMockPercent ?? null),
        readinessPct: roundOrNull(p?.readinessPercent ?? null),
        topicsStarted: p?.topicsStarted ?? 0,
        topicsCompleted: p?.topicsCompleted ?? 0,
        topicsTotal: p?.topicsTotal ?? 0,
        questionsAttempted: p?.questionsAttempted ?? 0,
        correctRatePct: p ? percent(p.questionsCorrect, p.questionsAttempted) : null,
        mastery: mastery
          .filter((m) => m.subjectId === enrolment.subjectId)
          .sort((a, b) => a.topic.sortOrder - b.topic.sortOrder || a.topic.path.localeCompare(b.topic.path))
          .map((m) => ({
            topicId: m.topicId,
            topicName: m.topic.name,
            score: roundOrNull(m.score) ?? 0,
            band: m.band,
            questionsAttempted: m.questionsAttempted,
            correctRatePct: percent(m.questionsCorrect, m.questionsAttempted),
            lastPracticedAt: m.lastPracticedAt,
          })),
      };
    }),
    recentScores: attempts.map((a) => ({
      attemptId: a.id,
      subjectId: a.subjectId,
      mode: a.mode,
      title: a.assessment?.title ?? null,
      percentage: roundOrNull(a.percentage),
      gradeEstimate: a.gradeEstimate,
      isProvisional: a.status !== "MARKED" || a.pendingReviewCount > 0,
      submittedAt: a.submittedAt,
    })),
    assignments: {
      summary: {
        assigned: assigned.length,
        completed: completedItems.length,
        late: assigned.filter((a) => a.progress[0]?.status === "LATE").length,
        missed: assigned.filter((a) => a.progress[0]?.status === "MISSED").length,
        completionPct: percent(completedItems.length, assigned.length),
        averageScorePct: roundOrNull(meanOf(scored)),
      },
      items: assignments.map((a) => ({
        assignmentId: a.id,
        title: a.title,
        dueAt: a.dueAt,
        status: a.progress[0]?.status ?? "NOT_ASSIGNED",
        scorePercent: a.progress[0]?.scorePercent ?? null,
        submittedAt: a.progress[0]?.submittedAt ?? null,
      })),
    },
    activity: {
      lastActiveDate: lastActive.get(studentUserId) ?? null,
      activeDaysLast30: activity[0]?.days ?? 0,
      studyMinutesLast30: roundOrNull((activity[0]?.seconds ?? 0) / 60) ?? 0,
    },
  };
}
