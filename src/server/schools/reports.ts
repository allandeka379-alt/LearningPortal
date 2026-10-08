import "server-only";
import { z } from "zod";
import { addDays, dateColumnFromLocalDate, daysBetween, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { instantWindow, SCORED_ASSESSMENT_MODES } from "@/server/analytics/core";
import { activeDayPredicate } from "@/server/analytics/queries";
import { isActiveSchoolAdmin } from "@/server/auth/rbac";
import { db } from "@/server/db";
import { auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { enqueue, type JobContext } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getStorage, type StorageDriver } from "@/server/lib/storage";
import { createMediaAsset, openMediaStream } from "@/server/lib/uploads";
import { assertSchoolAdmin, isUuid, parseInput, schoolAuditActor, type SchoolActor, type SchoolRequestMeta } from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import {
  MAX_REPORT_PERIOD_DAYS,
  personName,
  REPORT_RETENTION_DAYS,
  SCHOOL_REPORT_KINDS,
  SCHOOL_REPORT_LABELS,
  toCsv,
  type SchoolReportKind,
} from "./core";
import { assertSchoolLimit } from "./limits";
import { reportRefSchema, reportRequestSchema } from "./schemas";

/**
 * School reports (§23 "generate reports"; `SchoolReport`). A school admin requests a report for a period; a background
 * job (`schools.generateReport`) builds a CSV from the school's CURRENT roster (ACTIVE students, never AI data),
 * stores it through the storage driver as a PRIVATE `MediaAsset` (purpose REPORT_EXPORT) and marks the row READY.
 * Files are served only to ACTIVE school admins of that school (re-checked on every download, audited) and deleted after
 * {@link REPORT_RETENTION_DAYS} days by `schools.expireReports` (row kept, status EXPIRED).
 */

export const GENERATE_REPORT_JOB = "schools.generateReport";
export const EXPIRE_REPORTS_JOB = "schools.expireReports";
const DAY_MS = 86_400_000;

const parametersSchema = z.object({
  format: z.literal("CSV"),
  classIds: z.array(z.uuid()).max(100).optional(),
});

export const generateReportPayloadSchema = z.object({ reportId: z.uuid() });

export interface SchoolReportItem {
  id: string;
  kind: string;
  title: string;
  periodStart: LocalDate;
  periodEnd: LocalDate;
  status: "QUEUED" | "GENERATING" | "READY" | "FAILED" | "EXPIRED";
  requestedBy: string | null;
  createdAt: Date;
  generatedAt: Date | null;
  expiresAt: Date | null;
  error: string | null;
  byteSize: number | null;
}

function reportTitle(kind: string): string {
  return (SCHOOL_REPORT_LABELS as Record<string, { title: string }>)[kind]?.title ?? kind;
}

/** Queues a report (rate limited per school). */
export async function requestSchoolReport(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<{ reportId: string }> {
  const data = parseInput(reportRequestSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const now = options.now ?? new Date();
  const today = localDateString(now, school.timezone);
  if (data.periodEnd > today) throw AppError.validation({ periodEnd: ["The period can't end in the future."] });
  if (daysBetween(data.periodStart, data.periodEnd) >= MAX_REPORT_PERIOD_DAYS) {
    throw AppError.validation({ periodStart: [`A report can cover at most ${MAX_REPORT_PERIOD_DAYS} days.`] });
  }
  let classIds = data.classIds?.length ? [...new Set(data.classIds)] : undefined;
  if (classIds) {
    const owned = await db.class.count({ where: { id: { in: classIds }, schoolId: school.schoolId } });
    if (owned !== classIds.length) throw AppError.validation({ classIds: ["Choose classes of your school."] });
  } else {
    classIds = undefined;
  }
  await assertSchoolLimit("reportRequest", school.schoolId, "Your school has requested many reports in the last hour. Please try again later.");
  return db.$transaction(async (tx) => {
    const report = await tx.schoolReport.create({
      data: {
        schoolId: school.schoolId,
        kind: data.kind,
        periodStart: dateColumnFromLocalDate(data.periodStart),
        periodEnd: dateColumnFromLocalDate(data.periodEnd),
        parameters: { format: "CSV", ...(classIds ? { classIds } : {}) },
        status: "QUEUED",
        requestedById: actor.userId,
      },
      select: { id: true },
    });
    const job = await enqueue(GENERATE_REPORT_JOB, { reportId: report.id }, { client: tx, dedupeKey: `school-report:${report.id}`, queue: "default", maxAttempts: 3 });
    if (job.id) await tx.schoolReport.update({ where: { id: report.id }, data: { jobId: job.id }, select: { id: true } });
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.REPORT_REQUEST,
      entityType: "SchoolReport",
      entityId: report.id,
      schoolId: school.schoolId,
      after: { kind: data.kind, periodStart: data.periodStart, periodEnd: data.periodEnd, classes: classIds?.length ?? null },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.reportRequest },
      request: meta ?? null,
    });
    return { reportId: report.id };
  });
}

/** The school's reports, newest first (at most 50). */
export async function listSchoolReports(actor: SchoolActor, schoolId: string): Promise<SchoolReportItem[]> {
  const school = await assertSchoolAdmin(actor, schoolId);
  const rows = await db.schoolReport.findMany({
    where: { schoolId: school.schoolId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 50,
    select: {
      id: true,
      kind: true,
      periodStart: true,
      periodEnd: true,
      status: true,
      createdAt: true,
      generatedAt: true,
      expiresAt: true,
      error: true,
      requestedBy: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
      mediaAsset: { select: { byteSize: true } },
    },
  });
  return rows.map((row) => ({
    id: row.id,
    kind: row.kind,
    title: reportTitle(row.kind),
    periodStart: localDateFromDateColumn(row.periodStart),
    periodEnd: localDateFromDateColumn(row.periodEnd),
    status: row.status,
    requestedBy: row.requestedBy ? personName(row.requestedBy.profile, "School admin") : null,
    createdAt: row.createdAt,
    generatedAt: row.generatedAt,
    expiresAt: row.expiresAt,
    error: row.error,
    byteSize: row.mediaAsset?.byteSize ?? null,
  }));
}

export interface ReportDownload {
  filename: string;
  mimeType: string;
  size: number;
  stream: ReadableStream<Uint8Array>;
}

/**
 * Opens a READY report's file for an ACTIVE school admin of the report's school (NOT_FOUND for everyone else, so
 * report ids cannot be probed). Audited.
 */
export async function openSchoolReport(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta, deps: { storage?: StorageDriver } = {}): Promise<ReportDownload> {
  const data = parseInput(reportRefSchema, input);
  const report = await db.schoolReport.findFirst({
    where: { id: data.reportId, ...(data.schoolId ? { schoolId: data.schoolId } : {}) },
    select: {
      id: true,
      schoolId: true,
      kind: true,
      status: true,
      periodStart: true,
      periodEnd: true,
      mediaAsset: { select: { id: true, storageKey: true, mimeType: true, byteSize: true, checksumSha256: true, status: true, deletedAt: true, purpose: true } },
    },
  });
  // The report's own school decides who may read it: an ACTIVE admin of that (operating) school.
  if (!report || !(await isActiveSchoolAdmin(actor.userId, report.schoolId))) throw AppError.notFound("Report not found.");
  const asset = report.mediaAsset;
  if (report.status !== "READY" || !asset || asset.status !== "READY" || asset.deletedAt !== null || asset.purpose !== "REPORT_EXPORT") {
    throw AppError.notFound("Report not found.");
  }
  const opened = await openMediaStream(asset, deps.storage ?? getStorage());
  if (!opened) throw AppError.notFound("This report file is no longer available. Generate it again.");
  await auditInTx(db, {
    ...schoolAuditActor(actor),
    action: SCHOOL_AUDIT.REPORT_DOWNLOAD,
    entityType: "SchoolReport",
    entityId: report.id,
    schoolId: report.schoolId,
    metadata: { operation: SCHOOL_AUDIT_OPERATIONS.reportDownload, kind: report.kind },
    request: meta ?? null,
  });
  const from = localDateFromDateColumn(report.periodStart);
  const to = localDateFromDateColumn(report.periodEnd);
  return { filename: `${report.kind.replace(/_/g, "-")}-${from}-to-${to}.csv`, mimeType: "text/csv; charset=utf-8", size: opened.size, stream: opened.stream };
}

// =====================================================================================================================
// Generation (worker)
// =====================================================================================================================

interface ReportScope {
  schoolId: string;
  timezone: string;
  from: LocalDate;
  to: LocalDate;
  classIds: string[] | undefined;
}

function pct(value: number | null | undefined): string {
  return value === null || value === undefined || !Number.isFinite(value) ? "" : (Math.round(value * 10) / 10).toFixed(1);
}

async function rosterStudents(schoolId: string): Promise<Map<string, { name: string; number: string | null; form: string | null; lastActiveAt: Date | null }>> {
  const rows = await db.schoolMember.findMany({
    where: { schoolId, role: "STUDENT", status: "ACTIVE" },
    select: {
      userId: true,
      studentNumber: true,
      user: {
        select: {
          lastActiveAt: true,
          profile: { select: { displayName: true, firstName: true, lastName: true } },
          student: { select: { yearGroup: { select: { name: true } } } },
        },
      },
    },
    take: 20_000,
  });
  return new Map(
    rows.map((row) => [
      row.userId,
      { name: personName(row.user.profile, "Student"), number: row.studentNumber, form: row.user.student?.yearGroup?.name ?? null, lastActiveAt: row.user.lastActiveAt },
    ]),
  );
}

async function classResultsCsv(scope: ReportScope): Promise<string> {
  const { start, end } = instantWindow({ from: scope.from, to: scope.to }, scope.timezone);
  const roster = await rosterStudents(scope.schoolId);
  const classes = await db.class.findMany({
    where: { schoolId: scope.schoolId, archivedAt: null, ...(scope.classIds ? { id: { in: scope.classIds } } : {}) },
    select: { id: true, name: true, academicYear: true, subject: { select: { name: true } } },
    orderBy: [{ name: "asc" }, { id: "asc" }],
  });
  const classIds = classes.map((c) => c.id);
  const header = ["Class", "Subject", "Academic year", "Student", "Student number", "Marked tests", "Average score (%)", "Assignments completed", "Assignments set", "Last active"];
  if (classIds.length === 0) return toCsv(header, []);
  const [members, scores, assignments] = await Promise.all([
    db.classMember.findMany({ where: { classId: { in: classIds }, status: "ACTIVE" }, select: { classId: true, userId: true } }),
    db.$queryRaw<{ classId: string; userId: string; tests: number; avg: number | null }[]>`
      SELECT cm."classId"::text AS "classId", cm."userId"::text AS "userId", count(*)::int AS tests, avg(a."percentage")::float8 AS avg
      FROM "ClassMember" cm
      JOIN "Class" c ON c."id" = cm."classId"
      JOIN "AssessmentAttempt" a ON a."userId" = cm."userId" AND (c."subjectId" IS NULL OR a."subjectId" = c."subjectId")
      WHERE cm."classId" = ANY(${classIds}::uuid[]) AND cm."status" = 'ACTIVE'
        AND a."startedAt" < ${end} AND a."submittedAt" >= ${start} AND a."submittedAt" < ${end}
        AND a."mode" = ANY(${[...SCORED_ASSESSMENT_MODES]}::"AttemptMode"[])
        AND a."status" = 'MARKED' AND a."percentage" IS NOT NULL
      GROUP BY cm."classId", cm."userId"`,
    db.$queryRaw<{ classId: string; userId: string; assigned: number; completed: number }[]>`
      SELECT asg."classId"::text AS "classId", ap."userId"::text AS "userId", count(*)::int AS assigned,
        count(*) FILTER (WHERE ap."status" IN ('SUBMITTED', 'LATE'))::int AS completed
      FROM "Assignment" asg
      JOIN "AssignmentProgress" ap ON ap."assignmentId" = asg."id" AND ap."status" <> 'EXCUSED'
      WHERE asg."classId" = ANY(${classIds}::uuid[]) AND asg."status" <> 'DRAFT'
        AND asg."publishedAt" >= ${start} AND asg."publishedAt" < ${end}
      GROUP BY asg."classId", ap."userId"`,
  ]);
  const scoreMap = new Map(scores.map((row) => [`${row.classId}:${row.userId}`, row]));
  const assignmentMap = new Map(assignments.map((row) => [`${row.classId}:${row.userId}`, row]));
  const classById = new Map(classes.map((c) => [c.id, c]));
  const lines = members
    .filter((m) => roster.has(m.userId))
    .map((m) => {
      const cls = classById.get(m.classId)!;
      const student = roster.get(m.userId)!;
      const score = scoreMap.get(`${m.classId}:${m.userId}`);
      const work = assignmentMap.get(`${m.classId}:${m.userId}`);
      return [
        cls.name,
        cls.subject?.name ?? "",
        cls.academicYear,
        student.name,
        student.number ?? "",
        score?.tests ?? 0,
        pct(score?.avg ?? null),
        work?.completed ?? 0,
        work?.assigned ?? 0,
        student.lastActiveAt ? localDateString(student.lastActiveAt, scope.timezone) : "",
      ];
    })
    .sort((a, b) => String(a[0]).localeCompare(String(b[0])) || String(a[3]).localeCompare(String(b[3])));
  return toCsv(header, lines);
}

async function engagementCsv(scope: ReportScope): Promise<string> {
  const roster = await rosterStudents(scope.schoolId);
  const header = ["Student", "Student number", "Form", "Classes", "Active days", "Study minutes", "Questions answered", "Last active"];
  const ids = [...roster.keys()];
  if (ids.length === 0) return toCsv(header, []);
  const [activity, memberships] = await Promise.all([
    db.$queryRaw<{ userId: string; days: number; seconds: number; questions: number }[]>`
      SELECT d."userId"::text AS "userId", count(*) FILTER (WHERE ${activeDayPredicate()})::int AS days,
        coalesce(sum(d."studySeconds"), 0)::float8 AS seconds, coalesce(sum(d."questionsAttempted"), 0)::int AS questions
      FROM "DailyActivity" d
      WHERE d."userId" = ANY(${ids}::uuid[]) AND d."date" >= ${scope.from}::date AND d."date" <= ${scope.to}::date
      GROUP BY d."userId"`,
    db.classMember.findMany({
      where: {
        userId: { in: ids },
        status: "ACTIVE",
        class: { schoolId: scope.schoolId, archivedAt: null, ...(scope.classIds ? { id: { in: scope.classIds } } : {}) },
      },
      select: { userId: true, class: { select: { name: true } } },
    }),
  ]);
  const activityMap = new Map(activity.map((row) => [row.userId, row]));
  const classesByUser = new Map<string, string[]>();
  for (const m of memberships) classesByUser.set(m.userId, [...(classesByUser.get(m.userId) ?? []), m.class.name]);
  const lines = [...roster.entries()]
    .filter(([userId]) => !scope.classIds || classesByUser.has(userId))
    .map(([userId, student]) => {
      const row = activityMap.get(userId);
      return [
        student.name,
        student.number ?? "",
        student.form ?? "",
        (classesByUser.get(userId) ?? []).sort().join("; "),
        row?.days ?? 0,
        Math.round((row?.seconds ?? 0) / 60),
        row?.questions ?? 0,
        student.lastActiveAt ? localDateString(student.lastActiveAt, scope.timezone) : "",
      ];
    })
    .sort((a, b) => String(a[0]).localeCompare(String(b[0])));
  return toCsv(header, lines);
}

async function readinessCsv(scope: ReportScope): Promise<string> {
  const roster = await rosterStudents(scope.schoolId);
  const header = ["Student", "Student number", "Subject", "Target grade", "Syllabus progress (%)", "Readiness (%)", "Average mock (%)", "Latest mock (%)", "Target exam"];
  let ids = [...roster.keys()];
  if (scope.classIds) {
    const members = await db.classMember.findMany({ where: { classId: { in: scope.classIds }, status: "ACTIVE" }, select: { userId: true } });
    const inClasses = new Set(members.map((m) => m.userId));
    ids = ids.filter((id) => inClasses.has(id));
  }
  if (ids.length === 0) return toCsv(header, []);
  const enrolments = await db.subjectEnrollment.findMany({
    where: { userId: { in: ids }, status: { in: ["ACTIVE", "PAUSED"] } },
    select: {
      userId: true,
      targetGrade: true,
      subject: { select: { name: true } },
      targetExamSession: { select: { name: true } },
      progress: { select: { progressPercent: true, readinessPercent: true, averageMockPercent: true, lastMockPercent: true } },
    },
  });
  const lines = enrolments
    .map((e) => {
      const student = roster.get(e.userId)!;
      return [
        student.name,
        student.number ?? "",
        e.subject.name,
        e.targetGrade ?? "",
        pct(e.progress?.progressPercent ?? null),
        pct(e.progress?.readinessPercent ?? null),
        pct(e.progress?.averageMockPercent ?? null),
        pct(e.progress?.lastMockPercent ?? null),
        e.targetExamSession?.name ?? "",
      ];
    })
    .sort((a, b) => String(a[0]).localeCompare(String(b[0])) || String(a[2]).localeCompare(String(b[2])));
  return toCsv(header, lines);
}

const BUILDERS: Readonly<Record<SchoolReportKind, (scope: ReportScope) => Promise<string>>> = {
  class_results: classResultsCsv,
  engagement: engagementCsv,
  exam_readiness: readinessCsv,
};

/** Builds a report's CSV text (exported for tests). */
export async function buildReportCsv(kind: SchoolReportKind, scope: ReportScope): Promise<string> {
  return BUILDERS[kind](scope);
}

/**
 * Job handler: generates one report (idempotent: a READY / EXPIRED report is left alone). On the last failed attempt
 * the row becomes FAILED with a generic message; earlier failures go back to QUEUED for the retry.
 */
export async function runSchoolReport(reportId: string, context: Pick<JobContext, "attempt" | "maxAttempts"> = { attempt: 1, maxAttempts: 1 }, options: { now?: Date; storage?: StorageDriver } = {}): Promise<{ status: string; bytes?: number }> {
  const report = await db.schoolReport.findUnique({
    where: { id: reportId },
    select: { id: true, schoolId: true, kind: true, status: true, periodStart: true, periodEnd: true, parameters: true, school: { select: { timezone: true, status: true } } },
  });
  if (!report) return { status: "missing" };
  if (report.status === "READY" || report.status === "EXPIRED") return { status: report.status };
  const now = options.now ?? new Date();
  await db.schoolReport.update({ where: { id: report.id }, data: { status: "GENERATING", error: null }, select: { id: true } });
  try {
    if (!(SCHOOL_REPORT_KINDS as readonly string[]).includes(report.kind)) throw new Error(`unknown report kind ${report.kind}`);
    const parameters = parametersSchema.parse(report.parameters);
    const csv = await buildReportCsv(report.kind as SchoolReportKind, {
      schoolId: report.schoolId,
      timezone: report.school.timezone,
      from: localDateFromDateColumn(report.periodStart),
      to: localDateFromDateColumn(report.periodEnd),
      classIds: parameters.classIds,
    });
    const bytes = new TextEncoder().encode(csv);
    const asset = await createMediaAsset(
      { kind: "system", job: GENERATE_REPORT_JOB },
      { bytes, filename: `${report.kind}.csv` },
      { purpose: "REPORT_EXPORT", visibility: "PRIVATE" },
      options.storage ? { storage: options.storage } : {},
    );
    await db.schoolReport.update({
      where: { id: report.id },
      data: { status: "READY", mediaAssetId: asset.id, generatedAt: now, expiresAt: new Date(now.getTime() + REPORT_RETENTION_DAYS * DAY_MS), error: null },
      select: { id: true },
    });
    return { status: "READY", bytes: bytes.byteLength };
  } catch (error) {
    const final = context.attempt >= context.maxAttempts;
    logger.error("school report generation failed", { reportId, attempt: context.attempt, final, err: error });
    await db.schoolReport.update({
      where: { id: report.id },
      data: final ? { status: "FAILED", error: "The report could not be generated. Please try again." } : { status: "QUEUED" },
      select: { id: true },
    });
    if (final) return { status: "FAILED" };
    throw error;
  }
}

/**
 * Retention job: deletes the files of reports past `expiresAt` (row kept, EXPIRED; asset soft-deleted) and fails
 * reports stuck in QUEUED / GENERATING for over a day (their job died). Batched, idempotent.
 */
export async function expireSchoolReports(options: { now?: Date; storage?: StorageDriver; batch?: number } = {}): Promise<{ expired: number; failed: number }> {
  const now = options.now ?? new Date();
  const storage = options.storage ?? getStorage();
  const due = await db.schoolReport.findMany({
    where: { status: "READY", expiresAt: { lte: now } },
    select: { id: true, mediaAsset: { select: { id: true, storageKey: true } } },
    take: options.batch ?? 500,
  });
  let expired = 0;
  for (const report of due) {
    if (report.mediaAsset) {
      try {
        await storage.delete(report.mediaAsset.storageKey);
      } catch (error) {
        logger.error("report file could not be deleted", { reportId: report.id, err: error });
        continue;
      }
    }
    await db.$transaction(async (tx) => {
      await tx.schoolReport.update({ where: { id: report.id }, data: { status: "EXPIRED", mediaAssetId: null }, select: { id: true } });
      if (report.mediaAsset) {
        await tx.mediaAsset.update({ where: { id: report.mediaAsset.id }, data: { status: "DELETED", deletedAt: now }, select: { id: true } });
      }
    });
    expired += 1;
  }
  const stuck = await db.schoolReport.updateMany({
    where: { status: { in: ["QUEUED", "GENERATING"] }, createdAt: { lt: new Date(now.getTime() - DAY_MS) } },
    data: { status: "FAILED", error: "The report could not be generated. Please try again." },
  });
  return { expired, failed: stuck.count };
}

/** Default report period: the last 30 days ending yesterday, in the school's time zone. */
export function defaultReportPeriod(now: Date, timezone: string): { periodStart: LocalDate; periodEnd: LocalDate } {
  const end = addDays(localDateString(now, timezone), -1);
  return { periodStart: addDays(end, -29), periodEnd: end };
}

export function isReportId(value: string): boolean {
  return isUuid(value);
}
