import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { resolveCurrentSyllabus } from "@/server/curriculum/syllabus";
import { db } from "@/server/db";
import { ensureEnrollmentTx } from "@/server/enrollment/service";
import { auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import {
  activeStudentIds,
  assertSchoolAdmin,
  loadSchoolClass,
  parseInput,
  schoolAuditActor,
  type SchoolActor,
  type SchoolContext,
  type SchoolRequestMeta,
} from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import { catalogueQuerySchema, changeSubjectsSchema, enrolSubjectSchema, setSubjectsSchema, type CatalogueQueryInput } from "./schemas";

/**
 * Subjects a school offers (§23 "assign subjects"; `SchoolSubject`). The choices come from the curriculum catalogue
 * (data, rule 5): AVAILABLE subjects of the exam boards offered in the school's country. Offered subjects drive class
 * creation, roster-import enrolment and school analytics filters. Removing a subject deactivates the row (history and
 * existing classes and enrolments stay). Bulk enrolment pins each student's syllabus version like any enrolment
 * (source SCHOOL, rule 8).
 */

export interface SubjectChoice {
  id: string;
  name: string;
  /** e.g. "ZIMSEC O-Level". */
  qualificationLabel: string;
  officialCode: string | null;
}

function label(subject: { qualification: { shortName: string; examBoard: { shortName: string } } }): string {
  return `${subject.qualification.examBoard.shortName} ${subject.qualification.shortName}`;
}

const SUBJECT_SELECT = {
  id: true,
  name: true,
  officialCode: true,
  qualification: { select: { shortName: true, sortOrder: true, examBoard: { select: { shortName: true } } } },
} as const;

export interface OfferedSubject extends SubjectChoice {
  classes: number;
  /** Students of the school currently enrolled (ACTIVE or PAUSED) in the subject. */
  studentsEnrolled: number;
}

/** The school's offered subjects with how many classes and enrolled students each has. */
export async function listSchoolSubjects(actor: SchoolActor, schoolId: string): Promise<OfferedSubject[]> {
  const school = await assertSchoolAdmin(actor, schoolId);
  const rows = await db.schoolSubject.findMany({
    where: { schoolId: school.schoolId, isActive: true },
    select: { subject: { select: SUBJECT_SELECT } },
  });
  const subjectIds = rows.map((row) => row.subject.id);
  if (subjectIds.length === 0) return [];
  const [classCounts, enrolled] = await Promise.all([
    db.class.groupBy({ by: ["subjectId"], where: { schoolId: school.schoolId, archivedAt: null, subjectId: { in: subjectIds } }, _count: { _all: true } }),
    db.$queryRaw<{ subjectId: string; students: number }[]>`
      SELECT e."subjectId"::text AS "subjectId", count(*)::int AS students
      FROM "SubjectEnrollment" e
      JOIN "SchoolMember" m ON m."userId" = e."userId" AND m."schoolId" = ${school.schoolId}::uuid
        AND m."role" = 'STUDENT' AND m."status" = 'ACTIVE'
      WHERE e."subjectId" = ANY(${subjectIds}::uuid[]) AND e."status" IN ('ACTIVE', 'PAUSED')
      GROUP BY e."subjectId"`,
  ]);
  const classMap = new Map(classCounts.map((row) => [row.subjectId, row._count._all]));
  const enrolledMap = new Map(enrolled.map((row) => [row.subjectId, row.students]));
  return rows
    .map((row) => ({
      id: row.subject.id,
      name: row.subject.name,
      qualificationLabel: label(row.subject),
      officialCode: row.subject.officialCode,
      classes: classMap.get(row.subject.id) ?? 0,
      studentsEnrolled: enrolledMap.get(row.subject.id) ?? 0,
    }))
    .sort((a, b) => a.qualificationLabel.localeCompare(b.qualificationLabel) || a.name.localeCompare(b.name));
}

export interface SubjectCatalogue {
  /** Qualifications with subjects available in the school's country (filter choices). */
  qualifications: { id: string; label: string }[];
  items: (SubjectChoice & { offered: boolean })[];
  /** More subjects match than were returned: narrow the search. */
  truncated: boolean;
}

function catalogueWhere(countryId: string): Prisma.SubjectWhereInput {
  return {
    catalogueStatus: "AVAILABLE",
    qualification: { catalogueStatus: "AVAILABLE", examBoard: { countryLinks: { some: { countryId, isActive: true } } } },
  };
}

/**
 * Subjects the school may offer (AVAILABLE subjects of boards offered in its country), searchable by name or official
 * code and filterable by qualification, with `offered` flags. Paginated by search (at most `limit` results).
 */
export async function listSubjectCatalogue(actor: SchoolActor, input: CatalogueQueryInput): Promise<SubjectCatalogue> {
  const data = parseInput(catalogueQuerySchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const where: Prisma.SubjectWhereInput[] = [catalogueWhere(school.countryId)];
  if (data.qualificationId) where.push({ qualificationId: data.qualificationId });
  if (data.q) {
    where.push({
      OR: [
        { name: { contains: data.q, mode: "insensitive" } },
        { shortName: { contains: data.q, mode: "insensitive" } },
        { officialCode: { equals: data.q, mode: "insensitive" } },
      ],
    });
  }
  const [subjects, offered, qualifications] = await Promise.all([
    db.subject.findMany({
      where: { AND: where },
      select: SUBJECT_SELECT,
      orderBy: [{ qualification: { sortOrder: "asc" } }, { sortOrder: "asc" }, { name: "asc" }, { id: "asc" }],
      take: data.limit + 1,
    }),
    db.schoolSubject.findMany({ where: { schoolId: school.schoolId, isActive: true }, select: { subjectId: true } }),
    db.qualification.findMany({
      where: { catalogueStatus: "AVAILABLE", examBoard: { countryLinks: { some: { countryId: school.countryId, isActive: true } } }, subjects: { some: { catalogueStatus: "AVAILABLE" } } },
      select: { id: true, shortName: true, sortOrder: true, examBoard: { select: { shortName: true } } },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      take: 50,
    }),
  ]);
  const offeredSet = new Set(offered.map((row) => row.subjectId));
  return {
    qualifications: qualifications.map((q) => ({ id: q.id, label: `${q.examBoard.shortName} ${q.shortName}` })),
    truncated: subjects.length > data.limit,
    items: subjects.slice(0, data.limit).map((subject) => ({
      id: subject.id,
      name: subject.name,
      qualificationLabel: label(subject),
      officialCode: subject.officialCode,
      offered: offeredSet.has(subject.id),
    })),
  };
}

/** Adds subjects (from the catalogue) to the school's offer. */
export async function addSchoolSubjects(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<{ added: number; removed: number }> {
  const data = parseInput(changeSubjectsSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  return applySubjectChanges(actor, school, data.subjectIds, [], meta);
}

/** Stops offering subjects (rows deactivated; classes and enrolments stay). */
export async function removeSchoolSubjects(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<{ added: number; removed: number }> {
  const data = parseInput(changeSubjectsSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  return applySubjectChanges(actor, school, [], data.subjectIds, meta);
}

/**
 * Replaces the school's offered subjects with `subjectIds` (adds new ones, re-activates old ones, deactivates the
 * rest). New subjects must be in the catalogue for the school's country. Audited with the ids added and removed.
 */
export async function setSchoolSubjects(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<{ added: number; removed: number }> {
  const data = parseInput(setSubjectsSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const wanted = [...new Set(data.subjectIds)];
  const current = await db.schoolSubject.findMany({ where: { schoolId: school.schoolId, isActive: true }, select: { subjectId: true } });
  const activeNow = current.map((row) => row.subjectId);
  return applySubjectChanges(actor, school, wanted, activeNow.filter((id) => !wanted.includes(id)), meta);
}

async function applySubjectChanges(
  actor: SchoolActor,
  school: SchoolContext,
  addIds: readonly string[],
  removeIds: readonly string[],
  meta: SchoolRequestMeta,
): Promise<{ added: number; removed: number }> {
  const current = await db.schoolSubject.findMany({ where: { schoolId: school.schoolId }, select: { subjectId: true, isActive: true } });
  const activeNow = new Set(current.filter((row) => row.isActive).map((row) => row.subjectId));
  const toAdd = [...new Set(addIds)].filter((id) => !activeNow.has(id));
  const toRemove = [...new Set(removeIds)].filter((id) => activeNow.has(id));
  if (toAdd.length > 0) {
    const allowed = await db.subject.count({ where: { AND: [{ id: { in: toAdd } }, catalogueWhere(school.countryId)] } });
    if (allowed !== toAdd.length) throw AppError.validation({ subjectIds: ["Choose subjects from the list."] });
  }
  if (toAdd.length === 0 && toRemove.length === 0) return { added: 0, removed: 0 };
  await db.$transaction(async (tx) => {
    for (const subjectId of toAdd) {
      await tx.schoolSubject.upsert({
        where: { schoolId_subjectId: { schoolId: school.schoolId, subjectId } },
        create: { schoolId: school.schoolId, subjectId, isActive: true },
        update: { isActive: true },
        select: { id: true },
      });
    }
    if (toRemove.length > 0) {
      await tx.schoolSubject.updateMany({ where: { schoolId: school.schoolId, subjectId: { in: toRemove } }, data: { isActive: false } });
    }
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.SUBJECTS_UPDATE,
      entityType: "SchoolSubject",
      entityId: school.schoolId,
      schoolId: school.schoolId,
      after: { added: toAdd, removed: toRemove },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.subjectsSet, added: toAdd.length, removed: toRemove.length },
      request: meta ?? null,
    });
  }, { maxWait: 10_000, timeout: 30_000 });
  return { added: toAdd.length, removed: toRemove.length };
}

/**
 * Enrols ACTIVE students of the school (a class's members, or chosen students) in an offered subject (source SCHOOL).
 * Students already enrolled keep their enrolment (and pinned syllabus version); paused or dropped ones are
 * re-activated. Needs a published syllabus version.
 */
export async function enrolStudentsInSubject(
  actor: SchoolActor,
  input: unknown,
  meta?: SchoolRequestMeta,
): Promise<{ enrolled: number; alreadyEnrolled: number; skipped: number }> {
  const data = parseInput(enrolSubjectSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const offered = await db.schoolSubject.findFirst({ where: { schoolId: school.schoolId, subjectId: data.subjectId, isActive: true }, select: { id: true } });
  if (!offered) throw AppError.validation({ subjectId: ["Choose one of the subjects your school offers."] });
  if (!(await resolveCurrentSyllabus(data.subjectId, null))) {
    throw AppError.validation({ subjectId: ["This subject has no published syllabus yet, so students can't be enrolled."] });
  }
  let candidates = data.userIds ?? [];
  if (data.classId) {
    const cls = await loadSchoolClass(school.schoolId, data.classId);
    const members = await db.classMember.findMany({ where: { classId: cls.id, status: "ACTIVE" }, select: { userId: true }, take: 2_000 });
    candidates = [...candidates, ...members.map((m) => m.userId)];
  }
  const requested = new Set(candidates).size;
  const eligible = await activeStudentIds(school.schoolId, candidates);
  const existing = await db.subjectEnrollment.findMany({
    where: { subjectId: data.subjectId, userId: { in: eligible }, status: "ACTIVE" },
    select: { userId: true },
  });
  const already = new Set(existing.map((row) => row.userId));
  const toEnrol = eligible.filter((id) => !already.has(id));
  const now = new Date();
  for (let start = 0; start < toEnrol.length; start += 100) {
    const chunk = toEnrol.slice(start, start + 100);
    await db.$transaction(
      async (tx) => {
        for (const userId of chunk) await ensureEnrollmentTx(tx, userId, data.subjectId, { source: "SCHOOL", now });
        await auditInTx(tx, {
          ...schoolAuditActor(actor),
          action: SCHOOL_AUDIT.SCHOOL_UPDATE,
          entityType: "SubjectEnrollment",
          entityId: data.subjectId,
          schoolId: school.schoolId,
          metadata: { operation: SCHOOL_AUDIT_OPERATIONS.subjectEnrol, subjectId: data.subjectId, count: chunk.length, classId: data.classId ?? null },
          request: meta ?? null,
        });
      },
      { maxWait: 10_000, timeout: 60_000 },
    );
  }
  return { enrolled: toEnrol.length, alreadyEnrolled: already.size, skipped: requested - eligible.length };
}
