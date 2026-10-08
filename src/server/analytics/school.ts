import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { daysUntil, localDateString, type LocalDate } from "@/lib/dates";
import {
  dailySeries,
  dateRangeSchema,
  instantWindow,
  passRate,
  passThresholdPercent,
  PASS_RATE_MODES,
  percent,
  ratio,
  roundOrNull,
  schoolPassMark,
  SCORED_ASSESSMENT_MODES,
  type DateRange,
  type GradeBandLike,
  type PassRateSummary,
  type ResultForPass,
} from "./core";
import { activeDayPredicate } from "./queries";

/**
 * School analytics (§23): average score by subject, pass rate (ESTIMATE), topic performance, student engagement,
 * teacher performance (as class outcomes) and examination readiness, for one school over an inclusive date range in the
 * school's time zone.
 *
 * AUTHORIZATION: this service takes an already-authorised `{ schoolId }` scope and performs no user check. Callers
 * MUST first verify the actor is an ACTIVE SCHOOL_ADMIN of that school (`assertSchoolAdmin(actor, schoolId)` in
 * `./access`, or the schools service's equivalent) — never pass a schoolId taken from the request without that check.
 *
 * Data scope: students = ACTIVE STUDENT members of the school now (the current roster). Queries are bounded by the
 * roster through the per-user indexes: AssessmentAttempt(userId, startedAt), DailyActivity PK (userId, date),
 * TopicMastery(userId, subjectId, syllabusId, topicKind, band), SubjectEnrollment(userId, subjectId),
 * SubjectProgress PK. AI tables are never read. Rates with no evidence are null (§50).
 */

export interface SchoolScope {
  schoolId: string;
}

export interface SchoolAnalyticsOptions {
  now?: Date;
  /** Minimum students with evidence before a topic is listed among the weakest (default 3). */
  minStudentsPerTopic?: number;
  /** Number of weakest topics (default 10, max 50). */
  topicLimit?: number;
}

export interface SubjectScore {
  subjectId: string;
  subjectName: string;
  /** Marked quizzes/tests/timed exams/mocks submitted in the range. */
  scoredAttempts: number;
  students: number;
  averageScorePct: number | null;
}

export interface SubjectPassRate extends PassRateSummary {
  subjectId: string;
  subjectName: string;
}

export interface TopicPerformance {
  topicId: string;
  topicName: string;
  subjectId: string;
  subjectName: string;
  /** Students with a mastery row (started the topic) in their pinned syllabus version. */
  students: number;
  averageMastery: number;
  /** Students in the WEAK or DEVELOPING band. */
  weakStudents: number;
  questionsAttempted: number;
  correctRatePct: number | null;
}

export interface ClassOutcome {
  classId: string;
  className: string;
  subjectId: string | null;
  subjectName: string | null;
  teacherRole: "LEAD" | "ASSISTANT";
  students: number;
  activeStudents: number;
  activeStudentsPct: number | null;
  scoredAttempts: number;
  averageScorePct: number | null;
  assignmentsSet: number;
  assignmentCompletionPct: number | null;
}

export interface TeacherClassOutcomes {
  teacherUserId: string;
  teacherName: string | null;
  classes: ClassOutcome[];
  /** Answers of this school's current students that this teacher marked or re-marked in the range. */
  answersMarked: number;
}

export interface SubjectReadiness {
  subjectId: string;
  subjectName: string;
  studentsEnrolled: number;
  averageReadinessPct: number | null;
  studentsWithReadiness: number;
  averageMockPct: number | null;
  studentsWithMock: number;
  /** Students with a target grade that maps to a band of their grade scheme. */
  studentsWithTarget: number;
  /** Of those, students whose latest mock percentage meets the target band's minimum. */
  onTrack: number;
  onTrackPct: number | null;
  nextExam: {
    examSessionId: string;
    name: string;
    startsOn: LocalDate;
    daysUntil: number;
    /** Dates not yet confirmed against the official timetable: show as provisional. */
    isProvisional: boolean;
    studentsTargeting: number;
  } | null;
}

export interface SchoolAnalytics {
  school: { schoolId: string; name: string; timezone: string };
  range: DateRange;
  roster: { students: number; teachers: number; classes: number };
  averageScoreBySubject: { overall: { scoredAttempts: number; averageScorePct: number | null }; subjects: SubjectScore[] };
  /** ESTIMATE from configured grade bands or the school pass mark; never official results. */
  passRate: {
    basisNote: string;
    passMarkPercent: number | null;
    overall: PassRateSummary;
    subjects: SubjectPassRate[];
  };
  /** Current mastery (not range-bound), weakest first. */
  topicPerformance: TopicPerformance[];
  engagement: {
    rosterSize: number;
    activeStudents: number;
    activeStudentsPct: number | null;
    studyMinutes: number;
    questionsAttempted: number;
    averageStudyMinutesPerActiveStudent: number | null;
    /** One entry per day of the range; days after today (school time zone) are null, not zero. */
    daily: { date: LocalDate; activeStudents: number | null; studyMinutes: number | null }[];
  };
  /** Class outcomes per teacher — descriptive, not a judgement of the teacher. */
  teacherPerformance: { framing: "CLASS_OUTCOMES"; teachers: TeacherClassOutcomes[] };
  examinationReadiness: SubjectReadiness[];
}

const scopeSchema = z.object({ schoolId: z.uuid() });

function personName(profile: { displayName: string | null; firstName: string | null; lastName: string | null } | null): string | null {
  if (!profile) return null;
  if (profile.displayName) return profile.displayName;
  const parts = [profile.firstName, profile.lastName].filter((p): p is string => Boolean(p && p.trim()));
  return parts.length ? parts.join(" ") : null;
}

/** §23 school analytics. See the module docs for the authorization contract. */
export async function getSchoolAnalytics(
  scope: SchoolScope,
  input: { from: LocalDate; to: LocalDate },
  options: SchoolAnalyticsOptions = {},
): Promise<SchoolAnalytics> {
  const scopeParsed = scopeSchema.safeParse(scope);
  if (!scopeParsed.success) throw AppError.fromZod(scopeParsed.error, "Invalid school.");
  const rangeParsed = dateRangeSchema.safeParse(input);
  if (!rangeParsed.success) throw AppError.fromZod(rangeParsed.error, "Invalid date range.");
  const range = rangeParsed.data;
  const { schoolId } = scopeParsed.data;
  const now = options.now ?? new Date();
  const minStudents = Math.max(1, Math.floor(options.minStudentsPerTopic ?? 3));
  const topicLimit = Math.min(50, Math.max(1, Math.floor(options.topicLimit ?? 10)));

  const school = await db.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true, timezone: true, settings: true } });
  if (!school) throw AppError.notFound("School not found.");
  const { start, end } = instantWindow(range, school.timezone);
  const schoolToday = localDateString(now, school.timezone);
  const passMarkPercent = schoolPassMark(school.settings);

  const [studentRows, teacherCount, classCount] = await Promise.all([
    db.schoolMember.findMany({ where: { schoolId, role: "STUDENT", status: "ACTIVE" }, select: { userId: true } }),
    db.schoolMember.count({ where: { schoolId, role: "TEACHER", status: "ACTIVE" } }),
    db.class.count({ where: { schoolId, archivedAt: null } }),
  ]);
  const roster = studentRows.map((row) => row.userId);

  // The roster is repeated on joined tables (e.g. sp."userId" = ANY(roster)) although the join implies it: Postgres does
  // not propagate an = ANY(array) filter across a join, and without it the planner hashes whole tables (100k
  // enrolments / progress rows for one school's dashboard; scripts/perf README "Findings").
  const [scores, latestResults, enrolmentSchemes, topics, engagementRows, readinessRows, targetRows, examRows] = await Promise.all([
    db.$queryRaw<{ subjectId: string | null; subjectName: string | null; attempts: number; students: number; avg: number | null }[]>`
      SELECT a."subjectId"::text AS "subjectId", min(su."name") AS "subjectName", count(*)::int AS attempts,
        count(DISTINCT a."userId")::int AS students, avg(a."percentage")::float8 AS avg
      FROM "AssessmentAttempt" a
      JOIN "Subject" su ON su."id" = a."subjectId"
      WHERE a."userId" = ANY(${roster}::uuid[]) AND a."startedAt" < ${end}
        AND a."submittedAt" >= ${start} AND a."submittedAt" < ${end}
        AND a."mode" = ANY(${[...SCORED_ASSESSMENT_MODES]}::"AttemptMode"[])
        AND a."status" = 'MARKED' AND a."percentage" IS NOT NULL
      GROUP BY GROUPING SETS ((a."subjectId"), ())`,
    db.$queryRaw<{ userId: string; subjectId: string; percentage: number; gradeIsPass: boolean | null }[]>`
      SELECT DISTINCT ON (a."userId", a."subjectId")
        a."userId"::text AS "userId", a."subjectId"::text AS "subjectId", a."percentage"::float8 AS percentage, a."gradeIsPass"
      FROM "AssessmentAttempt" a
      WHERE a."userId" = ANY(${roster}::uuid[]) AND a."startedAt" < ${end}
        AND a."submittedAt" >= ${start} AND a."submittedAt" < ${end}
        AND a."mode" = ANY(${[...PASS_RATE_MODES]}::"AttemptMode"[])
        AND a."status" = 'MARKED' AND a."percentage" IS NOT NULL
      ORDER BY a."userId", a."subjectId", a."submittedAt" DESC, a."id" DESC`,
    enrolmentGradeSchemes(roster),
    // Aggregate first, name the few result rows afterwards; the roster predicate inside EXISTS lets the enrolment check
    // use the (userId, subjectId) index instead of hashing every enrolment (scripts/perf: 87 ms -> 9.5 ms per school).
    db.$queryRaw<
      { topicId: string; topicName: string; subjectId: string; subjectName: string; students: number; avgScore: number; weak: number; attempted: number; correct: number }[]
    >`
      SELECT x."topicId"::text AS "topicId", t."name" AS "topicName", x."subjectId"::text AS "subjectId", su."name" AS "subjectName",
        x.students, x."avgScore", x.weak, x.attempted, x.correct
      FROM (
        SELECT tm."topicId", tm."subjectId", count(*)::int AS students, avg(tm."score")::float8 AS "avgScore",
          count(*) FILTER (WHERE tm."band" IN ('WEAK', 'DEVELOPING'))::int AS weak,
          sum(tm."questionsAttempted")::int AS attempted, sum(tm."questionsCorrect")::int AS correct
        FROM "TopicMastery" tm
        WHERE tm."userId" = ANY(${roster}::uuid[]) AND tm."topicKind" = 'TOPIC'
          AND EXISTS (
            SELECT 1 FROM "SubjectEnrollment" e
             WHERE e."userId" = tm."userId" AND e."userId" = ANY(${roster}::uuid[]) AND e."subjectId" = tm."subjectId"
               AND e."syllabusId" = tm."syllabusId" AND e."status" IN ('ACTIVE', 'PAUSED'))
        GROUP BY tm."topicId", tm."subjectId"
        HAVING count(*) >= ${minStudents}
        ORDER BY avg(tm."score") ASC, count(*) DESC, tm."topicId"
        LIMIT ${topicLimit}
      ) x
      JOIN "Topic" t ON t."id" = x."topicId"
      JOIN "Subject" su ON su."id" = x."subjectId"
      ORDER BY x."avgScore" ASC, x.students DESC, x."topicId"`,
    db.$queryRaw<{ date: string | null; active: number; seconds: number; questions: number }[]>`
      SELECT to_char(d."date", 'YYYY-MM-DD') AS date, count(DISTINCT d."userId")::int AS active,
        coalesce(sum(d."studySeconds"), 0)::float8 AS seconds, coalesce(sum(d."questionsAttempted"), 0)::int AS questions
      FROM "DailyActivity" d
      WHERE d."userId" = ANY(${roster}::uuid[]) AND d."date" >= ${range.from}::date AND d."date" <= ${range.to}::date
        AND ${activeDayPredicate()}
      GROUP BY GROUPING SETS ((d."date"), ())`,
    db.$queryRaw<
      { subjectId: string; subjectName: string; students: number; avgReadiness: number | null; readinessN: number; avgMock: number | null; mockN: number }[]
    >`
      SELECT e."subjectId"::text AS "subjectId", min(su."name") AS "subjectName", count(*)::int AS students,
        avg(sp."readinessPercent")::float8 AS "avgReadiness", count(sp."readinessPercent")::int AS "readinessN",
        avg(sp."averageMockPercent")::float8 AS "avgMock", count(sp."averageMockPercent")::int AS "mockN"
      FROM "SubjectEnrollment" e
      JOIN "Subject" su ON su."id" = e."subjectId"
      LEFT JOIN "SubjectProgress" sp
        ON sp."userId" = e."userId" AND sp."subjectId" = e."subjectId" AND sp."userId" = ANY(${roster}::uuid[])
      WHERE e."userId" = ANY(${roster}::uuid[]) AND e."status" IN ('ACTIVE', 'PAUSED')
      GROUP BY e."subjectId"
      ORDER BY min(su."name"), e."subjectId"`,
    db.$queryRaw<{ subjectId: string; withTarget: number; onTrack: number }[]>`
      WITH enr AS (
        SELECT e."userId", e."subjectId", e."targetGrade",
          COALESCE(r."gradeSchemeId", sy."gradeSchemeId",
            (SELECT gs."id" FROM "GradeScheme" gs WHERE gs."qualificationId" = su."qualificationId" AND gs."isDefault" LIMIT 1))
            AS "schemeId"
        FROM "SubjectEnrollment" e
        JOIN "Syllabus" sy ON sy."id" = e."syllabusId"
        JOIN "Subject" su ON su."id" = e."subjectId"
        LEFT JOIN "SyllabusRoute" r ON r."id" = e."routeId"
        WHERE e."userId" = ANY(${roster}::uuid[]) AND e."status" IN ('ACTIVE', 'PAUSED') AND e."targetGrade" IS NOT NULL
      )
      SELECT enr."subjectId"::text AS "subjectId",
        count(*) FILTER (WHERE gb."id" IS NOT NULL)::int AS "withTarget",
        count(*) FILTER (WHERE gb."id" IS NOT NULL AND sp."lastMockPercent" >= gb."minPercent")::int AS "onTrack"
      FROM enr
      LEFT JOIN "GradeBand" gb ON gb."gradeSchemeId" = enr."schemeId" AND gb."label" = btrim(enr."targetGrade")
      LEFT JOIN "SubjectProgress" sp
        ON sp."userId" = enr."userId" AND sp."subjectId" = enr."subjectId" AND sp."userId" = ANY(${roster}::uuid[])
      GROUP BY enr."subjectId"`,
    db.$queryRaw<{ subjectId: string; sessionId: string; name: string; startsOn: string; isProvisional: boolean; students: number }[]>`
      SELECT e."subjectId"::text AS "subjectId", es."id"::text AS "sessionId", es."name",
        to_char(es."startsOn", 'YYYY-MM-DD') AS "startsOn", es."isProvisional", count(*)::int AS students
      FROM "SubjectEnrollment" e
      JOIN "ExamSession" es ON es."id" = e."targetExamSessionId"
      WHERE e."userId" = ANY(${roster}::uuid[]) AND e."status" IN ('ACTIVE', 'PAUSED')
        AND es."status" = 'PUBLISHED' AND es."endsOn" >= ${schoolToday}::date
      GROUP BY e."subjectId", es."id"
      ORDER BY es."startsOn" ASC, count(*) DESC, es."id"`,
  ]);

  // --- Average score by subject -----------------------------------------------------------------------------------
  const overallScore = scores.find((row) => row.subjectId === null);
  const subjectScores: SubjectScore[] = scores
    .filter((row): row is typeof row & { subjectId: string } => row.subjectId !== null)
    .map((row) => ({
      subjectId: row.subjectId,
      subjectName: row.subjectName ?? "",
      scoredAttempts: row.attempts,
      students: row.students,
      averageScorePct: roundOrNull(row.avg),
    }))
    .sort((a, b) => a.subjectName.localeCompare(b.subjectName) || a.subjectId.localeCompare(b.subjectId));

  // --- Pass rate (estimate) -----------------------------------------------------------------------------------------
  const thresholds = enrolmentSchemes.thresholdByUserSubject;
  const resultsBySubject = new Map<string, ResultForPass[]>();
  const allResults: ResultForPass[] = [];
  for (const row of latestResults) {
    const result: ResultForPass = {
      percentage: row.percentage,
      gradeIsPass: row.gradeIsPass,
      schemeThresholdPercent: thresholds.get(`${row.userId}:${row.subjectId}`) ?? null,
    };
    allResults.push(result);
    const list = resultsBySubject.get(row.subjectId) ?? [];
    list.push(result);
    resultsBySubject.set(row.subjectId, list);
  }
  const subjectNameById = new Map<string, string>([
    ...readinessRows.map((row) => [row.subjectId, row.subjectName] as const),
    ...subjectScores.map((row) => [row.subjectId, row.subjectName] as const),
  ]);
  const missingNames = [...resultsBySubject.keys()].filter((id) => !subjectNameById.has(id));
  if (missingNames.length) {
    for (const row of await db.subject.findMany({ where: { id: { in: missingNames } }, select: { id: true, name: true } })) {
      subjectNameById.set(row.id, row.name);
    }
  }
  const policy = { passMarkPercent };
  const subjectPassRates: SubjectPassRate[] = [...resultsBySubject.entries()]
    .map(([subjectId, results]) => ({ subjectId, subjectName: subjectNameById.get(subjectId) ?? "", ...passRate(results, policy) }))
    .sort((a, b) => a.subjectName.localeCompare(b.subjectName) || a.subjectId.localeCompare(b.subjectId));

  // --- Engagement ---------------------------------------------------------------------------------------------------
  const engagementTotal = engagementRows.find((row) => row.date === null);
  const dailyMap = new Map(
    engagementRows
      .filter((row): row is typeof row & { date: string } => row.date !== null)
      .map((row) => [row.date, { activeStudents: row.active, studyMinutes: roundOrNull(row.seconds / 60) ?? 0 }]),
  );
  const activeStudents = engagementTotal?.active ?? 0;
  const studyMinutes = (engagementTotal?.seconds ?? 0) / 60;

  // --- Examination readiness ----------------------------------------------------------------------------------------
  const targets = new Map(targetRows.map((row) => [row.subjectId, row]));
  const nextExamBySubject = new Map<string, (typeof examRows)[number]>();
  for (const row of examRows) if (!nextExamBySubject.has(row.subjectId)) nextExamBySubject.set(row.subjectId, row);
  const examinationReadiness: SubjectReadiness[] = readinessRows.map((row) => {
    const target = targets.get(row.subjectId);
    const exam = nextExamBySubject.get(row.subjectId);
    const withTarget = target?.withTarget ?? 0;
    const onTrack = target?.onTrack ?? 0;
    return {
      subjectId: row.subjectId,
      subjectName: row.subjectName,
      studentsEnrolled: row.students,
      averageReadinessPct: roundOrNull(row.avgReadiness),
      studentsWithReadiness: row.readinessN,
      averageMockPct: roundOrNull(row.avgMock),
      studentsWithMock: row.mockN,
      studentsWithTarget: withTarget,
      onTrack,
      onTrackPct: percent(onTrack, withTarget),
      nextExam: exam
        ? {
            examSessionId: exam.sessionId,
            name: exam.name,
            startsOn: exam.startsOn,
            daysUntil: daysUntil(exam.startsOn, now, school.timezone),
            isProvisional: exam.isProvisional,
            studentsTargeting: exam.students,
          }
        : null,
    };
  });

  const teacherPerformance = await classOutcomesByTeacher(schoolId, roster, range, { start, end });

  return {
    school: { schoolId: school.id, name: school.name, timezone: school.timezone },
    range,
    roster: { students: roster.length, teachers: teacherCount, classes: classCount },
    averageScoreBySubject: {
      overall: { scoredAttempts: overallScore?.attempts ?? 0, averageScorePct: roundOrNull(overallScore?.avg ?? null) },
      subjects: subjectScores,
    },
    passRate: {
      basisNote:
        passMarkPercent !== null
          ? "Estimate: latest mock or subject test per student and subject, compared with the school pass mark."
          : "Estimate: latest mock or subject test per student and subject, compared with the pass grade of the configured grade scheme. Not official results.",
      passMarkPercent,
      overall: passRate(allResults, policy),
      subjects: subjectPassRates,
    },
    topicPerformance: topics.map((row) => ({
      topicId: row.topicId,
      topicName: row.topicName,
      subjectId: row.subjectId,
      subjectName: row.subjectName,
      students: row.students,
      averageMastery: roundOrNull(row.avgScore) ?? 0,
      weakStudents: row.weak,
      questionsAttempted: row.attempted,
      correctRatePct: percent(row.correct, row.attempted),
    })),
    engagement: {
      rosterSize: roster.length,
      activeStudents,
      activeStudentsPct: percent(activeStudents, roster.length),
      studyMinutes: roundOrNull(studyMinutes) ?? 0,
      questionsAttempted: engagementTotal?.questions ?? 0,
      averageStudyMinutesPerActiveStudent: roundOrNull(ratio(studyMinutes, activeStudents)),
      // No DailyActivity row for a roster member means no learning that day: a real zero, not a gap. A day that has not
      // happened yet (range ending in the future) has no data at all: null, never a fabricated zero (§50).
      daily: dailySeries(range, dailyMap).map(({ date, value }) =>
        date > schoolToday
          ? { date, activeStudents: null, studyMinutes: null }
          : { date, activeStudents: value?.activeStudents ?? 0, studyMinutes: value?.studyMinutes ?? 0 },
      ),
    },
    teacherPerformance: { framing: "CLASS_OUTCOMES", teachers: teacherPerformance },
    examinationReadiness,
  };
}

/**
 * Pass threshold of the grade scheme that applies to each (student, subject) enrolment of the roster now:
 * SyllabusRoute.gradeScheme → Syllabus.gradeScheme → the qualification's default scheme.
 */
async function enrolmentGradeSchemes(roster: readonly string[]): Promise<{ thresholdByUserSubject: Map<string, number> }> {
  const rows = await db.$queryRaw<{ userId: string; subjectId: string; minPercent: number; isPass: boolean; label: string; schemeId: string }[]>`
    WITH enr AS (
      SELECT e."userId", e."subjectId",
        COALESCE(r."gradeSchemeId", sy."gradeSchemeId",
          (SELECT gs."id" FROM "GradeScheme" gs WHERE gs."qualificationId" = su."qualificationId" AND gs."isDefault" LIMIT 1))
          AS "schemeId"
      FROM "SubjectEnrollment" e
      JOIN "Syllabus" sy ON sy."id" = e."syllabusId"
      JOIN "Subject" su ON su."id" = e."subjectId"
      LEFT JOIN "SyllabusRoute" r ON r."id" = e."routeId"
      WHERE e."userId" = ANY(${[...roster]}::uuid[])
    )
    SELECT enr."userId"::text AS "userId", enr."subjectId"::text AS "subjectId", enr."schemeId"::text AS "schemeId",
      gb."label", gb."minPercent"::float8 AS "minPercent", gb."isPass"
    FROM enr
    JOIN "GradeBand" gb ON gb."gradeSchemeId" = enr."schemeId"`;
  const bands = new Map<string, GradeBandLike[]>();
  for (const row of rows) {
    const key = `${row.userId}:${row.subjectId}`;
    const list = bands.get(key) ?? [];
    list.push({ label: row.label, minPercent: row.minPercent, isPass: row.isPass });
    bands.set(key, list);
  }
  const thresholdByUserSubject = new Map<string, number>();
  for (const [key, list] of bands) {
    const threshold = passThresholdPercent(list);
    if (threshold !== null) thresholdByUserSubject.set(key, threshold);
  }
  return { thresholdByUserSubject };
}

/** Class outcomes (score, engagement, assignments) of the school's current classes, grouped by current teacher. */
async function classOutcomesByTeacher(
  schoolId: string,
  roster: readonly string[],
  range: DateRange,
  window: { start: Date; end: Date },
): Promise<TeacherClassOutcomes[]> {
  const classes = await db.class.findMany({
    where: { schoolId, archivedAt: null },
    select: {
      id: true,
      name: true,
      subjectId: true,
      subject: { select: { name: true } },
      teachers: {
        where: { removedAt: null },
        select: { userId: true, role: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
      },
    },
    orderBy: [{ name: "asc" }, { id: "asc" }],
  });
  if (classes.length === 0) return [];
  const classIds = classes.map((c) => c.id);
  const { start, end } = window;

  const [memberCounts, scoreRows, activeRows, assignmentRows] = await Promise.all([
    db.$queryRaw<{ classId: string; students: number }[]>`
      SELECT cm."classId"::text AS "classId", count(*)::int AS students
      FROM "ClassMember" cm
      WHERE cm."classId" = ANY(${classIds}::uuid[]) AND cm."status" = 'ACTIVE'
      GROUP BY cm."classId"`,
    db.$queryRaw<{ classId: string; attempts: number; avg: number | null }[]>`
      SELECT c."id"::text AS "classId", count(*)::int AS attempts, avg(a."percentage")::float8 AS avg
      FROM "Class" c
      JOIN "ClassMember" cm ON cm."classId" = c."id" AND cm."classId" = ANY(${classIds}::uuid[]) AND cm."status" = 'ACTIVE'
      JOIN "AssessmentAttempt" a ON a."userId" = cm."userId" AND (c."subjectId" IS NULL OR a."subjectId" = c."subjectId")
      WHERE c."id" = ANY(${classIds}::uuid[]) AND a."startedAt" < ${end}
        AND a."submittedAt" >= ${start} AND a."submittedAt" < ${end}
        AND a."mode" = ANY(${[...SCORED_ASSESSMENT_MODES]}::"AttemptMode"[])
        AND a."status" = 'MARKED' AND a."percentage" IS NOT NULL
      GROUP BY c."id"`,
    db.$queryRaw<{ classId: string; active: number }[]>`
      SELECT cm."classId"::text AS "classId", count(DISTINCT cm."userId")::int AS active
      FROM "ClassMember" cm
      WHERE cm."classId" = ANY(${classIds}::uuid[]) AND cm."status" = 'ACTIVE'
        AND EXISTS (
          SELECT 1 FROM "DailyActivity" d
          WHERE d."userId" = cm."userId" AND d."date" >= ${range.from}::date AND d."date" <= ${range.to}::date
            AND ${activeDayPredicate()})
      GROUP BY cm."classId"`,
    db.$queryRaw<{ classId: string; assignments: number; assigned: number; completed: number }[]>`
      SELECT asg."classId"::text AS "classId", count(DISTINCT asg."id")::int AS assignments,
        count(ap."userId")::int AS assigned,
        count(ap."userId") FILTER (WHERE ap."status" IN ('SUBMITTED', 'LATE'))::int AS completed
      FROM "Assignment" asg
      LEFT JOIN "AssignmentProgress" ap ON ap."assignmentId" = asg."id" AND ap."status" <> 'EXCUSED'
        AND EXISTS (SELECT 1 FROM "ClassMember" cm WHERE cm."classId" = asg."classId" AND cm."userId" = ap."userId" AND cm."status" = 'ACTIVE')
      WHERE asg."classId" = ANY(${classIds}::uuid[]) AND asg."status" <> 'DRAFT'
        AND asg."publishedAt" >= ${start} AND asg."publishedAt" < ${end}
      GROUP BY asg."classId"`,
  ]);

  const memberMap = new Map(memberCounts.map((row) => [row.classId, row.students]));
  const scoreMap = new Map(scoreRows.map((row) => [row.classId, row]));
  const activeMap = new Map(activeRows.map((row) => [row.classId, row.active]));
  const assignmentMap = new Map(assignmentRows.map((row) => [row.classId, row]));

  const teachers = new Map<string, TeacherClassOutcomes>();
  for (const cls of classes) {
    const students = memberMap.get(cls.id) ?? 0;
    const active = activeMap.get(cls.id) ?? 0;
    const score = scoreMap.get(cls.id);
    const assignments = assignmentMap.get(cls.id);
    for (const teacher of cls.teachers) {
      let entry = teachers.get(teacher.userId);
      if (!entry) {
        entry = { teacherUserId: teacher.userId, teacherName: personName(teacher.user.profile), classes: [], answersMarked: 0 };
        teachers.set(teacher.userId, entry);
      }
      entry.classes.push({
        classId: cls.id,
        className: cls.name,
        subjectId: cls.subjectId,
        subjectName: cls.subject?.name ?? null,
        teacherRole: teacher.role,
        students,
        activeStudents: active,
        activeStudentsPct: percent(active, students),
        scoredAttempts: score?.attempts ?? 0,
        averageScorePct: roundOrNull(score?.avg ?? null),
        assignmentsSet: assignments?.assignments ?? 0,
        assignmentCompletionPct: percent(assignments?.completed ?? 0, assignments?.assigned ?? 0),
      });
    }
  }
  const teacherIds = [...teachers.keys()];
  if (teacherIds.length && roster.length) {
    // Only answers of THIS school's current students: a teacher who also teaches elsewhere (another school, private
    // tutoring) must not have that work counted in, or disclosed to, this school's report.
    const marking = await db.$queryRaw<{ userId: string; n: number }[]>`
      SELECT m."markedById"::text AS "userId", count(*)::int AS n
      FROM "QuestionAttemptMarking" m
      JOIN "QuestionAttempt" qa ON qa."attemptId" = m."attemptId" AND qa."position" = m."position"
      WHERE m."markedById" = ANY(${teacherIds}::uuid[]) AND m."createdAt" >= ${start} AND m."createdAt" < ${end}
        AND qa."userId" = ANY(${[...roster]}::uuid[])
      GROUP BY m."markedById"`;
    for (const row of marking) {
      const entry = teachers.get(row.userId);
      if (entry) entry.answersMarked = row.n;
    }
  }
  return [...teachers.values()].sort(
    (a, b) => (a.teacherName ?? "").localeCompare(b.teacherName ?? "") || a.teacherUserId.localeCompare(b.teacherUserId),
  );
}
