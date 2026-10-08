import "server-only";
import type { MasteryBand } from "@/generated/prisma/client";
import { MASTERY_BANDS } from "@/lib/mastery-band";
import { meanOf, percent, roundOrNull } from "@/server/analytics/core";
import { getClassAnalytics, getClassStudentDetail, type ClassAnalytics, type ClassStudentDetail } from "@/server/analytics/teacher";
import { db } from "@/server/db";
import type { AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertActiveMember, auditClassStudentView, classSubjectScope, isUuid, loadClassForTeacher, type ClassContext, type TeachingActor } from "./access";
import { rosterName, selectWeakTopics, WEAK_BANDS, type ClassSubjectScope, type WeakTopic } from "./core";

/**
 * The §22 drill-down for teachers: class average → subject performance → topic performance → individual student,
 * with the weak-topics callout. Built on the analytics read models (src/server/analytics/teacher.ts) and the access
 * rules of ./access:
 *
 * - only ACTIVE members, only the class's subject scope. For a subject-less class the read model is asked for the
 *   subjects of the work set to the class only (`subjectIds` option; no work set yet → no subject data at all);
 * - the individual student view is audited (`student.view`, once per 30 minutes per viewer and student);
 * - AI conversations are never read (the read models do not touch AI tables).
 */

export interface ClassPerformance {
  class: ClassContext;
  scope: ClassSubjectScope;
  analytics: ClassAnalytics;
  /** Topics the class finds hard, weakest first, across the subjects in scope. */
  weakTopics: (WeakTopic & { subjectId: string; subjectName: string })[];
}

/** Levels 1-3 (and the student list of level 4) of the drill-down, plus weak topics (§22). */
export async function getClassPerformance(actor: TeachingActor, classId: string, options: { now?: Date } = {}): Promise<ClassPerformance> {
  const cls = await loadClassForTeacher(actor, classId);
  const scope = await classSubjectScope(cls);
  const analytics = await getClassAnalytics(cls.id, { ...(options.now ? { now: options.now } : {}), ...(scope.derived ? { subjectIds: scope.subjectIds } : {}) });
  const weakTopics = analytics.subjects
    .flatMap((subject) => selectWeakTopics(subject.topics, { limit: 10 }).map((topic) => ({ ...topic, subjectId: subject.subjectId, subjectName: subject.subjectName })))
    .sort((a, b) => a.averageMastery - b.averageMastery || b.weakSharePercent - a.weakSharePercent)
    .slice(0, 6);
  return { class: cls, scope, analytics, weakTopics };
}

export interface TopicStudentRow {
  userId: string;
  name: string;
  /** Null when the student has not practised the topic yet. */
  score: number | null;
  band: MasteryBand | null;
  questionsAttempted: number;
  correctRatePct: number | null;
  lastPracticedAt: Date | null;
}

export interface ClassTopicPerformance {
  class: ClassContext;
  topic: { id: string; name: string; code: string | null; subjectId: string; subjectName: string };
  summary: { students: number; started: number; averageMastery: number | null; weakStudents: number; bands: Record<MasteryBand, number> };
  /** Sub-topics with the class's average mastery (students who started them). */
  subtopics: { id: string; name: string; code: string | null; started: number; averageMastery: number | null; weakStudents: number }[];
  /** Weakest first; students who have not started the topic last. */
  students: TopicStudentRow[];
}

/** Level 3 of the drill-down: one topic across the class's ACTIVE members (their pinned syllabus versions). */
export async function getClassTopicPerformance(actor: TeachingActor, classId: string, topicId: string): Promise<ClassTopicPerformance> {
  const cls = await loadClassForTeacher(actor, classId);
  if (!isUuid(topicId)) throw AppError.notFound("Topic not found.");
  const topic = await db.topic.findUnique({
    where: { id: topicId },
    select: { id: true, name: true, code: true, syllabus: { select: { subjectId: true, subject: { select: { name: true } } } } },
  });
  const scope = await classSubjectScope(cls);
  if (!topic || !scope.subjectIds.includes(topic.syllabus.subjectId)) throw AppError.notFound("Topic not found.");
  const members = await db.classMember.findMany({
    where: { classId: cls.id, status: "ACTIVE" },
    select: { userId: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
    take: 500,
  });
  const memberIds = members.map((m) => m.userId);
  const children = await db.topic.findMany({ where: { parentId: topic.id }, select: { id: true, name: true, code: true, sortOrder: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
  const rows = memberIds.length
    ? await db.$queryRaw<{ userId: string; topicId: string; score: number; band: MasteryBand; attempted: number; correct: number; lastPracticedAt: Date | null }[]>`
        SELECT tm."userId"::text AS "userId", tm."topicId"::text AS "topicId", tm."score", tm."band"::text AS band,
          tm."questionsAttempted" AS attempted, tm."questionsCorrect" AS correct, tm."lastPracticedAt" AS "lastPracticedAt"
        FROM "TopicMastery" tm
        JOIN "SubjectEnrollment" e ON e."userId" = tm."userId" AND e."subjectId" = tm."subjectId" AND e."syllabusId" = tm."syllabusId"
        WHERE tm."userId" = ANY(${memberIds}::uuid[]) AND e."status" IN ('ACTIVE', 'PAUSED')
          AND tm."topicId" = ANY(${[topic.id, ...children.map((c) => c.id)]}::uuid[])`
    : [];
  const own = new Map(rows.filter((r) => r.topicId === topic.id).map((r) => [r.userId, r]));
  const students: TopicStudentRow[] = members
    .map((m) => {
      const r = own.get(m.userId);
      return {
        userId: m.userId,
        name: rosterName(m.user.profile),
        score: r ? roundOrNull(r.score) : null,
        band: r?.band ?? null,
        questionsAttempted: r?.attempted ?? 0,
        correctRatePct: r ? percent(r.correct, r.attempted) : null,
        lastPracticedAt: r?.lastPracticedAt ?? null,
      };
    })
    .sort((a, b) => (a.score ?? Number.POSITIVE_INFINITY) - (b.score ?? Number.POSITIVE_INFINITY) || a.name.localeCompare(b.name));
  const started = students.filter((s) => s.score !== null);
  const bands = Object.fromEntries(MASTERY_BANDS.map((band) => [band, started.filter((s) => s.band === band).length])) as Record<MasteryBand, number>;
  return {
    class: cls,
    topic: { id: topic.id, name: topic.name, code: topic.code, subjectId: topic.syllabus.subjectId, subjectName: topic.syllabus.subject.name },
    summary: {
      students: members.length,
      started: started.length,
      averageMastery: roundOrNull(meanOf(started.map((s) => s.score))),
      weakStudents: started.filter((s) => s.band !== null && WEAK_BANDS.includes(s.band)).length,
      bands,
    },
    subtopics: children.map((child) => {
      const childRows = rows.filter((r) => r.topicId === child.id);
      return {
        id: child.id,
        name: child.name,
        code: child.code,
        started: childRows.length,
        averageMastery: roundOrNull(meanOf(childRows.map((r) => r.score))),
        weakStudents: childRows.filter((r) => WEAK_BANDS.includes(r.band)).length,
      };
    }),
    students,
  };
}

export interface ClassStudentPerformance {
  class: ClassContext;
  scope: ClassSubjectScope;
  detail: ClassStudentDetail;
}

/**
 * Level 4: one ACTIVE member's performance in the class's subject scope (§22). Audited as a `student.view`.
 * NOT_FOUND for students who are not (or no longer) ACTIVE in the class.
 */
export async function getClassStudentPerformance(
  actor: TeachingActor,
  classId: string,
  studentUserId: string,
  options: { now?: Date; request?: AuditRequestInfo | null } = {},
): Promise<ClassStudentPerformance> {
  const cls = await loadClassForTeacher(actor, classId);
  await assertActiveMember(cls.id, studentUserId);
  const scope = await classSubjectScope(cls);
  await auditClassStudentView(
    actor,
    { classId: cls.id, schoolId: cls.schoolId, studentUserId, via: cls.via, surface: "teacher.class.student" },
    { ...(options.now ? { now: options.now } : {}), request: options.request ?? null },
  );
  const detail = await getClassStudentDetail(cls.id, studentUserId, { ...(options.now ? { now: options.now } : {}), subjectIds: scope.subjectIds });
  return { class: cls, scope, detail };
}
