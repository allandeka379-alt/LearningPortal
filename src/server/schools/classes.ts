import "server-only";
import { randomInt } from "node:crypto";
import { Prisma } from "@/generated/prisma/client";
import { resolveCurrentSyllabus } from "@/server/curriculum/syllabus";
import { db, type DbClient } from "@/server/db";
import { ensureEnrollmentTx } from "@/server/enrollment/service";
import { auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { createNotification } from "@/server/notifications";
import { generateJoinCode } from "@/server/teaching/core";
import { upsertMembership } from "@/server/teaching/membership";
import { activeStudentIds, assertSchoolAdmin, isSchoolTeacher, loadSchoolClass, parseInput, schoolAuditActor, type SchoolActor, type SchoolRequestMeta } from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import { personName } from "./core";
import {
  classRefSchema,
  classStudentSchema,
  classStudentsSchema,
  classTeacherRefSchema,
  classTeacherSchema,
  createClassSchema,
  updateClassSchema,
} from "./schemas";

/**
 * Classes of a school managed by its admin (§23 "create classes", "assign subjects"; §22 classes are taught by the
 * school's teachers). Classes are never moved between schools (database trigger) and never deleted (archived), so
 * assignments and results keep their context. A class's teachers must hold an ACTIVE TEACHER / SCHOOL_ADMIN
 * membership of the school (database guard, re-checked here for a clear message); at most one current LEAD.
 * Students are placed with the teacher area's membership rules (`upsertMembership`: reactivation, and the class's
 * live work is handed to them) and enrolled in the class subject (source SCHOOL) when it has a published syllabus.
 */

const TX_OPTIONS = { maxWait: 10_000, timeout: 30_000 } as const;

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

async function uniqueJoinCode(client: DbClient = db): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = generateJoinCode((max) => randomInt(0, max));
    if (!(await client.class.findUnique({ where: { joinCode: code }, select: { id: true } }))) return code;
  }
  throw new AppError("INTERNAL", "Could not create a join code. Please try again.");
}

/** The school's offered (active) subject ids; a class subject must be one of them. */
async function assertOfferedSubject(schoolId: string, subjectId: string, client: DbClient = db): Promise<{ qualificationId: string }> {
  const offered = await client.schoolSubject.findFirst({
    where: { schoolId, subjectId, isActive: true },
    select: { subject: { select: { qualificationId: true } } },
  });
  if (!offered) throw AppError.validation({ subjectId: ["Choose one of the subjects your school offers (add it on the Subjects page first)."] });
  return { qualificationId: offered.subject.qualificationId };
}

async function assertYearGroup(countryId: string, yearGroupId: string): Promise<void> {
  const row = await db.yearGroup.findFirst({ where: { id: yearGroupId, countryId, isActive: true }, select: { id: true } });
  if (!row) throw AppError.validation({ yearGroupId: ["Choose a form or year from the list."] });
}

// =====================================================================================================================
// Reads
// =====================================================================================================================

export interface SchoolClassItem {
  id: string;
  name: string;
  academicYear: string;
  subject: { id: string; name: string } | null;
  form: string | null;
  archivedAt: Date | null;
  teachers: { userId: string; name: string; role: "LEAD" | "ASSISTANT" }[];
  students: number;
}

/** The school's classes (current first, archived on request), with teachers and student counts. */
export async function listSchoolClasses(
  actor: SchoolActor,
  input: { schoolId: string; includeArchived?: boolean; academicYear?: string },
): Promise<SchoolClassItem[]> {
  const school = await assertSchoolAdmin(actor, input.schoolId);
  const classes = await db.class.findMany({
    where: {
      schoolId: school.schoolId,
      ...(input.includeArchived ? {} : { archivedAt: null }),
      ...(input.academicYear ? { academicYear: input.academicYear } : {}),
    },
    orderBy: [{ archivedAt: { sort: "asc", nulls: "first" } }, { academicYear: "desc" }, { name: "asc" }, { id: "asc" }],
    take: 500,
    select: {
      id: true,
      name: true,
      academicYear: true,
      archivedAt: true,
      subject: { select: { id: true, name: true } },
      yearGroup: { select: { name: true } },
      teachers: {
        where: { removedAt: null },
        select: { userId: true, role: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
      },
    },
  });
  const counts = classes.length
    ? await db.classMember.groupBy({ by: ["classId"], where: { classId: { in: classes.map((c) => c.id) }, status: "ACTIVE" }, _count: { _all: true } })
    : [];
  const countMap = new Map(counts.map((row) => [row.classId, row._count._all]));
  return classes.map((cls) => ({
    id: cls.id,
    name: cls.name,
    academicYear: cls.academicYear,
    subject: cls.subject,
    form: cls.yearGroup?.name ?? null,
    archivedAt: cls.archivedAt,
    teachers: cls.teachers
      .map((t) => ({ userId: t.userId, name: personName(t.user.profile, "Unnamed teacher"), role: t.role }))
      .sort((a, b) => (a.role === b.role ? a.name.localeCompare(b.name) : a.role === "LEAD" ? -1 : 1)),
    students: countMap.get(cls.id) ?? 0,
  }));
}

export interface SchoolClassDetail extends SchoolClassItem {
  joinCode: string | null;
  yearGroupId: string | null;
  roster: { userId: string; name: string; studentNumber: string | null; joinedAt: Date; provisioned: boolean }[];
  pendingRequests: number;
  hasAssignments: boolean;
}

/** One class with its roster (names and admission numbers only; no contact details). */
export async function getSchoolClass(actor: SchoolActor, input: unknown): Promise<SchoolClassDetail> {
  const data = parseInput(classRefSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  await loadSchoolClass(school.schoolId, data.classId);
  const [cls, members, pending, assignments] = await Promise.all([
    db.class.findUniqueOrThrow({
      where: { id: data.classId },
      select: {
        id: true,
        name: true,
        academicYear: true,
        archivedAt: true,
        joinCode: true,
        yearGroupId: true,
        subject: { select: { id: true, name: true } },
        yearGroup: { select: { name: true } },
        teachers: {
          where: { removedAt: null },
          select: { userId: true, role: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
        },
      },
    }),
    db.classMember.findMany({
      where: { classId: data.classId, status: "ACTIVE" },
      select: {
        userId: true,
        joinedAt: true,
        user: { select: { provisionedBySchoolId: true, profile: { select: { displayName: true, firstName: true, lastName: true } } } },
      },
      take: 1_000,
    }),
    db.classMember.count({ where: { classId: data.classId, status: "PENDING" } }),
    db.assignment.count({ where: { classId: data.classId } }),
  ]);
  const numbers = members.length
    ? await db.schoolMember.findMany({
        where: { schoolId: school.schoolId, role: "STUDENT", userId: { in: members.map((m) => m.userId) } },
        select: { userId: true, studentNumber: true },
      })
    : [];
  const numberMap = new Map(numbers.map((row) => [row.userId, row.studentNumber]));
  return {
    id: cls.id,
    name: cls.name,
    academicYear: cls.academicYear,
    subject: cls.subject,
    form: cls.yearGroup?.name ?? null,
    yearGroupId: cls.yearGroupId,
    archivedAt: cls.archivedAt,
    joinCode: cls.joinCode,
    teachers: cls.teachers
      .map((t) => ({ userId: t.userId, name: personName(t.user.profile, "Unnamed teacher"), role: t.role }))
      .sort((a, b) => (a.role === b.role ? a.name.localeCompare(b.name) : a.role === "LEAD" ? -1 : 1)),
    students: members.length,
    roster: members
      .map((m) => ({
        userId: m.userId,
        name: personName(m.user.profile, "Unnamed student"),
        studentNumber: numberMap.get(m.userId) ?? null,
        joinedAt: m.joinedAt,
        provisioned: m.user.provisionedBySchoolId === school.schoolId,
      }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    pendingRequests: pending,
    hasAssignments: assignments > 0,
  };
}

export interface ClassFormOptions {
  subjects: { id: string; name: string; qualificationLabel: string }[];
  yearGroups: { id: string; name: string }[];
  teachers: { userId: string; name: string }[];
}

/** Choices for the class forms: the school's offered subjects, its country's forms / years and its active teachers. */
export async function getClassFormOptions(actor: SchoolActor, schoolId: string): Promise<ClassFormOptions> {
  const school = await assertSchoolAdmin(actor, schoolId);
  const [subjects, yearGroups, teachers] = await Promise.all([
    db.schoolSubject.findMany({
      where: { schoolId: school.schoolId, isActive: true },
      select: { subject: { select: { id: true, name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } } },
    }),
    db.yearGroup.findMany({ where: { countryId: school.countryId, isActive: true }, orderBy: [{ ordinal: "asc" }, { name: "asc" }], select: { id: true, name: true }, take: 50 }),
    db.schoolMember.findMany({
      where: { schoolId: school.schoolId, role: { in: ["TEACHER", "SCHOOL_ADMIN"] }, status: "ACTIVE" },
      select: { userId: true, user: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } } },
      take: 500,
    }),
  ]);
  const teacherMap = new Map<string, string>();
  for (const row of teachers) teacherMap.set(row.userId, personName(row.user.profile, "Unnamed teacher"));
  return {
    subjects: subjects
      .map(({ subject }) => ({ id: subject.id, name: subject.name, qualificationLabel: `${subject.qualification.examBoard.shortName} ${subject.qualification.shortName}` }))
      .sort((a, b) => a.qualificationLabel.localeCompare(b.qualificationLabel) || a.name.localeCompare(b.name)),
    yearGroups,
    teachers: [...teacherMap].map(([userId, name]) => ({ userId, name })).sort((a, b) => a.name.localeCompare(b.name)),
  };
}

// =====================================================================================================================
// Create / update / archive
// =====================================================================================================================

/** Creates a class of the school, optionally with its LEAD teacher. */
export async function createSchoolClass(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<{ id: string }> {
  const data = parseInput(createClassSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const qualificationId = data.subjectId ? (await assertOfferedSubject(school.schoolId, data.subjectId)).qualificationId : null;
  if (data.yearGroupId) await assertYearGroup(school.countryId, data.yearGroupId);
  if (data.teacherUserId && !(await isSchoolTeacher(school.schoolId, data.teacherUserId))) {
    throw AppError.validation({ teacherUserId: ["Choose one of your school's active teachers."] });
  }
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const joinCode = await uniqueJoinCode();
    try {
      return await db.$transaction(async (tx) => {
        const created = await tx.class.create({
          data: {
            schoolId: school.schoolId,
            name: data.name,
            subjectId: data.subjectId ?? null,
            qualificationId,
            yearGroupId: data.yearGroupId ?? null,
            academicYear: data.academicYear,
            joinCode,
            createdById: actor.userId,
          },
          select: { id: true },
        });
        if (data.teacherUserId) {
          await tx.classTeacher.create({ data: { classId: created.id, userId: data.teacherUserId, role: "LEAD" } });
        }
        await auditInTx(tx, {
          ...schoolAuditActor(actor),
          action: SCHOOL_AUDIT.CLASS_CREATE,
          entityType: "Class",
          entityId: created.id,
          schoolId: school.schoolId,
          after: { name: data.name, subjectId: data.subjectId ?? null, academicYear: data.academicYear, teacherUserId: data.teacherUserId ?? null },
          metadata: { operation: SCHOOL_AUDIT_OPERATIONS.classCreate },
          request: meta ?? null,
        });
        if (data.teacherUserId && data.teacherUserId !== actor.userId) {
          await createNotification(
            data.teacherUserId,
            {
              type: "class.teacher_assigned",
              category: "ACCOUNT",
              title: `You now teach ${data.name}`.slice(0, 200),
              body: `${school.name} made you the lead teacher of ${data.name}.`.slice(0, 2_000),
              data: { href: `/teacher/classes/${created.id}`, entityType: "Class", entityId: created.id },
              dedupeKey: `class-teacher:${created.id}:${data.teacherUserId}`,
            },
            { client: tx },
          );
        }
        return created;
      });
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
    }
  }
  throw new AppError("INTERNAL", "Could not create the class. Please try again.");
}

/**
 * Renames a class and sets its form and subject. The subject can only change while the class has no work set:
 * teachers' access to students' data follows the class subject (ARCHITECTURE §5.3), so changing it under existing
 * assignments would silently widen or narrow what they see.
 */
export async function updateSchoolClass(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(updateClassSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const cls = await loadSchoolClass(school.schoolId, data.classId, { active: true });
  const subjectId = data.subjectId ?? null;
  let qualificationId: string | null | undefined;
  if (subjectId !== cls.subjectId) {
    if ((await db.assignment.count({ where: { classId: cls.id } })) > 0) {
      throw AppError.validation({ subjectId: ["This class already has work set, so its subject can't change. Create a new class instead."] });
    }
    qualificationId = subjectId ? (await assertOfferedSubject(school.schoolId, subjectId)).qualificationId : null;
  }
  if (data.yearGroupId) await assertYearGroup(school.countryId, data.yearGroupId);
  await db.$transaction(async (tx) => {
    await tx.class.update({
      where: { id: cls.id },
      data: {
        name: data.name,
        yearGroupId: data.yearGroupId ?? null,
        ...(qualificationId !== undefined ? { subjectId, qualificationId } : {}),
      },
      select: { id: true },
    });
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.CLASS_UPDATE,
      entityType: "Class",
      entityId: cls.id,
      schoolId: school.schoolId,
      before: { name: cls.name, subjectId: cls.subjectId, yearGroupId: cls.yearGroupId },
      after: { name: data.name, subjectId, yearGroupId: data.yearGroupId ?? null },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.classUpdate },
      request: meta ?? null,
    });
  });
}

/** Archives (`archived: true`) or restores a class. Archived classes are read-only and cannot be joined. */
export async function setSchoolClassArchived(actor: SchoolActor, input: unknown, archived: boolean, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(classRefSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const cls = await loadSchoolClass(school.schoolId, data.classId);
  if ((cls.archivedAt !== null) === archived) return;
  await db.$transaction(async (tx) => {
    await tx.class.update({
      where: { id: cls.id },
      data: archived ? { archivedAt: new Date(), joinCode: null } : { archivedAt: null },
      select: { id: true },
    });
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: archived ? SCHOOL_AUDIT.CLASS_ARCHIVE : SCHOOL_AUDIT.CLASS_RESTORE,
      entityType: "Class",
      entityId: cls.id,
      schoolId: school.schoolId,
      metadata: { operation: archived ? SCHOOL_AUDIT_OPERATIONS.classArchive : SCHOOL_AUDIT_OPERATIONS.classRestore },
      request: meta ?? null,
    });
  });
}

// =====================================================================================================================
// Teachers of a class
// =====================================================================================================================

/**
 * Assigns a teacher to a class as LEAD (the current lead becomes an assistant) or ASSISTANT. The teacher must be an
 * ACTIVE teacher (or teaching admin) of the school.
 */
export async function assignClassTeacher(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(classTeacherSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const cls = await loadSchoolClass(school.schoolId, data.classId, { active: true });
  if (!(await isSchoolTeacher(school.schoolId, data.teacherUserId))) {
    throw AppError.validation({ teacherUserId: ["Choose one of your school's active teachers."] });
  }
  const now = new Date();
  await db.$transaction(async (tx) => {
    const existing = await tx.classTeacher.findUnique({
      where: { classId_userId: { classId: cls.id, userId: data.teacherUserId } },
      select: { role: true, removedAt: true },
    });
    if (existing && existing.removedAt === null && existing.role === data.role) {
      throw AppError.conflict(`This teacher is already the class's ${data.role === "LEAD" ? "lead" : "assistant"} teacher.`);
    }
    if (data.role === "LEAD") {
      await tx.classTeacher.updateMany({
        where: { classId: cls.id, role: "LEAD", removedAt: null, userId: { not: data.teacherUserId } },
        data: { role: "ASSISTANT" },
      });
    }
    if (existing) {
      await tx.classTeacher.update({
        where: { classId_userId: { classId: cls.id, userId: data.teacherUserId } },
        data: { role: data.role, ...(existing.removedAt !== null ? { removedAt: null, addedAt: now } : {}) },
      });
    } else {
      await tx.classTeacher.create({ data: { classId: cls.id, userId: data.teacherUserId, role: data.role, addedAt: now } });
    }
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.CLASS_TEACHER_ADD,
      entityType: "ClassTeacher",
      entityId: cls.id,
      schoolId: school.schoolId,
      targetUserId: data.teacherUserId,
      before: existing ? { role: existing.role, removed: existing.removedAt !== null } : undefined,
      after: { role: data.role },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.classTeacherAdd, classId: cls.id },
      request: meta ?? null,
    });
    if (data.teacherUserId !== actor.userId && (!existing || existing.removedAt !== null)) {
      await createNotification(
        data.teacherUserId,
        {
          type: "class.teacher_assigned",
          category: "ACCOUNT",
          title: `You now teach ${cls.name}`.slice(0, 200),
          body: `${school.name} added you as ${data.role === "LEAD" ? "the lead" : "an assistant"} teacher of ${cls.name}.`.slice(0, 2_000),
          data: { href: `/teacher/classes/${cls.id}`, entityType: "Class", entityId: cls.id },
          dedupeKey: `class-teacher:${cls.id}:${data.teacherUserId}:${now.getTime()}`,
        },
        { client: tx },
      );
    }
  });
}

/** Takes a teacher off a class (their ClassTeacher row ends; history kept). */
export async function removeClassTeacher(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(classTeacherRefSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const cls = await loadSchoolClass(school.schoolId, data.classId);
  await db.$transaction(async (tx) => {
    const updated = await tx.classTeacher.updateMany({
      where: { classId: cls.id, userId: data.teacherUserId, removedAt: null },
      data: { removedAt: new Date() },
    });
    if (updated.count === 0) throw AppError.notFound("This teacher doesn't teach the class.");
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.CLASS_TEACHER_REMOVE,
      entityType: "ClassTeacher",
      entityId: cls.id,
      schoolId: school.schoolId,
      targetUserId: data.teacherUserId,
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.classTeacherRemove, classId: cls.id },
      request: meta ?? null,
    });
  });
}

// =====================================================================================================================
// Students of a class
// =====================================================================================================================

/**
 * Places ACTIVE students of the school into a class (others are skipped and counted). With a class subject that has a
 * published syllabus, each student is also enrolled in it (source SCHOOL; an existing enrolment is kept).
 */
export async function addStudentsToSchoolClass(
  actor: SchoolActor,
  input: unknown,
  meta?: SchoolRequestMeta,
): Promise<{ added: number; alreadyMembers: number; skipped: number; enrolled: number }> {
  const data = parseInput(classStudentsSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const cls = await loadSchoolClass(school.schoolId, data.classId, { active: true });
  const eligible = await activeStudentIds(school.schoolId, data.userIds);
  const skipped = new Set(data.userIds).size - eligible.length;
  const syllabus = cls.subjectId ? await resolveCurrentSyllabus(cls.subjectId, null) : null;
  const now = new Date();
  let added = 0;
  let alreadyMembers = 0;
  let enrolled = 0;
  await db.$transaction(async (tx) => {
    for (const userId of eligible) {
      const change = await upsertMembership(tx, { classId: cls.id, userId, status: "ACTIVE", source: "ADDED_BY_STAFF", now });
      if (change.previous === "ACTIVE") alreadyMembers += 1;
      else added += 1;
      if (cls.subjectId && syllabus) {
        const before = await tx.subjectEnrollment.findUnique({ where: { userId_subjectId: { userId, subjectId: cls.subjectId } }, select: { status: true } });
        await ensureEnrollmentTx(tx, userId, cls.subjectId, { source: "SCHOOL", now });
        if (before?.status !== "ACTIVE") enrolled += 1;
      }
    }
    if (added > 0) {
      await auditInTx(tx, {
        ...schoolAuditActor(actor),
        action: SCHOOL_AUDIT.CLASS_MEMBER_ADD,
        entityType: "ClassMember",
        entityId: cls.id,
        schoolId: school.schoolId,
        after: { added, enrolled },
        metadata: { operation: SCHOOL_AUDIT_OPERATIONS.classMemberAdd, classId: cls.id, count: added },
        request: meta ?? null,
      });
    }
  }, TX_OPTIONS);
  return { added, alreadyMembers, skipped, enrolled };
}

/** Takes a student out of a class (ClassMember REMOVED; they stay on the school roster). */
export async function removeStudentFromSchoolClass(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const data = parseInput(classStudentSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const cls = await loadSchoolClass(school.schoolId, data.classId);
  await db.$transaction(async (tx) => {
    const updated = await tx.classMember.updateMany({
      where: { classId: cls.id, userId: data.userId, status: { not: "REMOVED" } },
      data: { status: "REMOVED", removedAt: new Date(), removedById: actor.userId },
    });
    if (updated.count === 0) throw AppError.notFound("This student is not in the class.");
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.CLASS_MEMBER_REMOVE,
      entityType: "ClassMember",
      entityId: cls.id,
      schoolId: school.schoolId,
      targetUserId: data.userId,
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.classMemberRemove, classId: cls.id },
      request: meta ?? null,
    });
  });
}
